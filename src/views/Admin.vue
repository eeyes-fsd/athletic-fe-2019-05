<template>
  <div class="admin">
    <v-container>
      <h2>管理端</h2>

      <v-btn color="error" @click="logout">
        退出
      </v-btn>

      <p class="admin-warning">
        该页面请使用电脑打开
      </p>
      <div
        ref="uploadContainer"
        class="admin-upload"

        @click="uploadClick"
        @drop.prevent="uploadDrop"
        @dragover.prevent
        @dragleave.prevent
      >
        <img src="@/assets/excel.png" alt="" class="admin-upload-img">
        <span class="admin-upload-text admin-warning">请将EXCEL文件拖动到这里，或点击这里</span>
        <input ref="upload" class="admin-upload-file" type="file" name="file" @change="uploadSubmit">
      </div>

      <hr class="more-margin">
      <p class="admin-warning">
        以下为即将上传的数据：
      </p>
      <v-data-table
        :headers="headers"
        :items="excelData"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <td class="text-xs-right">
            {{ props.item.group_rank }}
          </td>
          <td class="text-xs-right">
            {{ props.item.group }}
          </td>
          <td class="text-xs-right">
            {{ props.item.name }}
          </td>
          <td class="text-xs-right">
            {{ props.item.team }}
          </td>
          <td class="text-xs-right">
            {{ props.item.track }}
          </td>
          <td class="text-xs-right">
            {{ props.item.performance }}
          </td>
          <td class="text-xs-right">
            {{ props.item.no }}
          </td>
          <td class="text-xs-right">
            {{ props.item.remarks }}
          </td>
        </template>
      </v-data-table>

      <hr class="more-margin">
      <p class="admin-warning">
        当您确定无误以后，点击确定即可开始上传
      </p>
      <v-btn color="success" :loading="uploading" @click="handleUpload">
        确定
      </v-btn>

      <h2>高级</h2>
      <v-switch
        v-model="openAdvanced"
        :label="openAdvanced ? '启用高级设置' : '关闭高级设置'"
      />
      <div v-if="openAdvanced">
        <p>参数映射表</p>
        <p class="admin-warning">
          请确认您知道该配置的具体含义再进行修改
        </p>
        <v-layout v-for="arg in args" :key="arg.key">
          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model.number="vector[arg.key]"
              :label="arg.description"
              required
            />
          </v-flex>
          <v-flex
            xs12
            md6
          >
            对应Excel列：{{ getColumn(vector[arg.key]) }}
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from '@/api'
import xlsx from 'xlsx'
import swal from 'sweetalert'
import { mapMutations } from 'vuex'

function asyncReadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      resolve(data)
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.readAsArrayBuffer(file)
  })
}

export default {
  name: 'Admin',
  data() {
    return {
      args: [
        {
          key: 'group_rank',
          description: '小组排名'
        },
        {
          key: 'group',
          description: '组号'
        },
        {
          key: 'name',
          description: '选手姓名'
        },
        {
          key: 'team',
          description: '选手单位'
        },
        {
          key: 'track',
          description: '道次'
        },
        {
          key: 'performance',
          description: '成绩'
        },
        {
          key: 'no',
          description: '参赛选手号'
        },
        {
          key: 'remarks',
          description: '备注'
        }
      ],
      headers: [
        {
          text: '小组排名',
          value: 'group_rank'
        },
        {
          text: '组号',
          value: 'group'
        },
        {
          text: '选手姓名',
          value: 'name'
        },
        {
          text: '选手单位',
          value: 'team'
        },
        {
          text: '道次',
          value: 'track'
        },
        {
          text: '成绩',
          value: 'performance'
        },
        {
          text: '参赛选手号',
          value: 'no'
        },
        {
          text: '备注',
          value: 'remarks'
        }
      ],
      vector: {
        group_rank: 0,
        group: 1,
        name: 2,
        team: 3,
        track: 4,
        performance: 5,
        no: 6,
        remarks: 7
      },
      header: [],
      excelData: [],
      openAdvanced: false,
      uploading: false
    }
  },
  methods: {
    ...mapMutations({
      savePassword: 'savePassword'
    }),
    uploadClick() {
      this.$refs.upload.click()
    },
    uploadSubmit() {
      const file = this.$refs.upload.files[0]
      if (file) {
        this.uploadHandle(file)
      }
    },
    uploadDrop(evt) {
      const file = evt.dataTransfer.files[0]
      if (file) {
        this.uploadHandle(file)
      }
    },
    async uploadHandle(file) {
      if (!file.name.endsWith('xlsx')) {
        swal('不支持的文件类型，请使用新版本Excel文件（xlsx）格式')
        return
      }
      try {
        const fileData = await asyncReadFile(file)
        const workbook = xlsx.read(fileData, { type: 'array' })
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]]
        const data = xlsx.utils.sheet_to_json(firstWorksheet, { header: 1 })
        this.header = data[0]
        this.excelData = this.parseData(data)
      } catch (error) {
        swal('发生错误：' + error.message)
      }
    },
    parseData(data) {
      const result = []
      for (let i = 1; i < data.length; i++) {
        const line = data[i]
        const item = { ...this.vector }
        for (const k in this.vector) {
          const index = this.vector[k]
          item[k] = line[index]
        }
        result.push(item)
      }
      return result
    },
    getColumn(index) {
      const text = this.header[index]
      const columnName = String.fromCharCode(65 + index)
      return `列${columnName} ${text}`
    },
    async handleUpload() {
      this.uploading = true
      try {
        await api.uploadGameDetails(this.excelData)
        this.excelData = []
        swal('成功', '上传成功', 'success')
      } catch (error) {
        swal('发生错误：' + error.message)
      }
      this.uploading = false
    },
    logout() {
      this.savePassword(null)
    }
  }
}
</script>

<style>
.admin-warning {
  color: red;
}
.admin-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  border: 5px dashed #aaa;
  user-select: none;
  cursor: pointer;
}
.admin-upload-img {
  display: block;
  width: 100px;
  height: 100px;
}
.admin-upload-text {
  margin-top: 10px;
}
.admin-upload-file {
  display: none;
}
hr.more-margin {
  margin-top: 30px;
}
</style>
