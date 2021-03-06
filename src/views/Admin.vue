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
            {{ props.item.group }}
          </td>
          <td class="text-xs-right">
            {{ props.item.group_rank }}
          </td>
          <td class="text-xs-right">
            {{ props.item.no }}
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
            {{ props.item.remarks }}
          </td>
        </template>
      </v-data-table>

      <hr class="more-margin">
      <p class="admin-warning">
        您正在编辑 <b style="color: red;">{{ gameName }}</b> 当您确定无误以后，点击确定即可开始上传。请注意上传将会覆盖原单元的内容。
      </p>
      <v-layout>
        <v-flex xs12 sm6 d-flex>
          <v-btn color="success" :loading="uploading" @click="handleUpload">
            确定
          </v-btn>
        </v-flex>
      </v-layout>

      <h2>高级</h2>
      <v-text-field
        v-model="shortCode"
        label="映射表短码"
        required
      />
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
        <pre>{{ excelData }}</pre>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from '@/api'
import xlsx from 'xlsx'
import swal from 'sweetalert'
import { mapMutations } from 'vuex'
import { units } from '@/config'

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
      units,
      args: [
        {
          key: 'group',
          description: '小组'
        },
        {
          key: 'group_rank',
          description: '小组排名'
        },
        {
          key: 'no',
          description: '号码'
        },
        {
          key: 'name',
          description: '姓名'
        },
        {
          key: 'team',
          description: '单位'
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
          key: 'remarks',
          description: '备注'
        }
      ],
      headers: [
        {
          text: '小组',
          value: 'group'
        },
        {
          text: '小组排名',
          value: 'group_rank'
        },
        {
          text: '号码',
          value: 'no'
        },
        {
          text: '姓名',
          value: 'name'
        },
        {
          text: '单位',
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
          text: '备注',
          value: 'remarks'
        }
      ],
      header: [],
      rawData: [],
      openAdvanced: false,
      uploading: false,
      shortCode: '01234569'
    }
  },
  computed: {
    gameName() {
      const game = this.$store.state.admin_edit_game
      return game ? game.name : '<未知赛事，程序错误请返回重试>'
    },
    gameId() {
      const queryGameId = this.$route.query.game
      return queryGameId ? (parseInt(queryGameId) || null) : null
    },
    excelData() {
      return this.parseData(this.rawData)
    },
    vector() {
      return this.covertShortCode(this.shortCode)
    }
  },
  mounted() {
    if (this.gameId === null) {
      this.$router.push({ name: 'admin_index' })
      swal('提示', '发生错误，未知的上传赛事，请重新选择赛事', 'error')
    }
  },
  methods: {
    ...mapMutations({
      savePassword: 'savePassword'
    }),
    // 点击Excel上传区
    uploadClick() {
      this.$refs.upload.click()
    },
    // 通过点击的方式选择文件
    uploadSubmit() {
      const file = this.$refs.upload.files[0]
      if (file) {
        this.uploadHandle(file)
      }
    },
    // 通过拖拽的方式选择文件
    uploadDrop(evt) {
      const file = evt.dataTransfer.files[0]
      if (file) {
        this.uploadHandle(file)
      }
    },
    // 选择并读取Excel文件
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
        this.rawData = data.slice(1)
      } catch (error) {
        this.$handleError(error)
      }
    },
    // 解析Excel表格
    parseData(data) {
      const result = []
      for (let i = 0; i < data.length; i++) {
        const line = data[i]
        const item = { ...this.vector }
        for (const k in this.vector) {
          const index = this.vector[k]
          item[k] = line[index] || ''
        }
        result.push(item)
      }
      return result
    },
    // 将短码转换成映射表
    covertShortCode(code) {
      if (code.length < 8) return null
      return {
        group: parseInt(code.charAt(0)),
        group_rank: parseInt(code.charAt(1)),
        no: parseInt(code.charAt(2)),
        name: parseInt(code.charAt(3)),
        team: parseInt(code.charAt(4)),
        track: parseInt(code.charAt(5)),
        performance: parseInt(code.charAt(6)),
        remarks: parseInt(code.charAt(7))
      }
    },
    // 显示列名详细信息
    getColumn(index) {
      const text = this.header[index] || `(${this.headers[index].text})`
      const columnName = String.fromCharCode(65 + index)
      return `列${columnName} ${text}`
    },
    // 上传Excel数据到服务器
    async handleUpload() {
      this.uploading = true
      if (this.gameId <= 0) {
        return swal('错误', '选择的赛事不存在', 'error')
      }
      try {
        await api.clearGameDetails(this.gameId)
        await api.uploadGameDetails(this.gameId, this.excelData)
        this.excelData = []
        await swal('成功', '上传成功', 'success')
        this.$router.push({ name: 'admin_index' })
      } catch (error) {
        this.$handleError(error)
      }
      this.uploading = false
    },
    // 登出
    logout() {
      this.savePassword(null)
      this.$router.push({ name: 'admin_login' })
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
