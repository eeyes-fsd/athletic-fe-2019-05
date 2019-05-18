<template>
  <div class="game">
    <v-flex xs12 sm6 d-flex>
      <v-select
        :items="groupList"
        label="选择小组"
        @input="chooseGroup"
      />
    </v-flex>

    <v-data-table
      :headers="headers"
      :items="parsedDetails"
      class="elevation-1"
      hide-actions
      disable-initial-sort
    >
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{ props.item.group }}
        </td>
        <td class="text-xs-right">
          {{ props.item.no }}
        </td>
        <td class="text-xs-right column-begin-at">
          {{ props.item.re_rank }}
        </td>
        <td class="text-xs-right">
          {{ props.item.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item.team }}
        </td>
        <td class="text-xs-right">
          {{ props.item.performance }}
        </td>
        <td class="text-xs-right">
          {{ props.item.remarks }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '@/api'
import swal from 'sweetalert'

export default {
  name: 'Game',
  data() {
    return {
      headers: [
        {
          text: '组别',
          sortable: false,
          value: 'group'
        },
        { text: '编号', value: 'no' },
        { text: '小组名次', value: 'group_rank' },
        { text: '姓名', value: 'name' },
        { text: '学校', value: 'team' },
        { text: '成绩', value: 'performance' },
        { text: '备注', value: 'remarks' }
      ],
      details: []
    }
  },
  computed: {
    groupList() {
      const result = ['全部']
      const n = this.groups || 0
      for (let i = 1; i <= n; i++) {
        result.push(i.toString())
      }
      return result
    },
    gameId() {
      const paramsGameId = this.$route.params.id
      return paramsGameId ? (parseInt(paramsGameId) || null) : null
    },
    groupId() {
      const queryGroupId = this.$route.query.group
      return queryGroupId ? (parseInt(queryGroupId) || null) : null
    },
    groups() {
      const queryGroups = this.$route.query.groups
      return queryGroups ? (parseInt(queryGroups) || null) : null
    },
    parsedDetails() {
      const result = []
      for (let i = 0; i < this.details.length; i++) {
        const item = this.details[i]
        const detail = { ...item }
        detail.re_rank = i + 1
        result.push(detail)
      }
      return result
    }
  },
  mounted() {
    this.fetchDetails(this.gameId, this.groupId)
  },
  methods: {
    async fetchDetails(gameId, groupId = null) {
      try {
        this.details = await api.getGameDetails(gameId, groupId)
      } catch (error) {
        this.$handleError(error)
      }
      const params = {
        id: gameId.toString()
      }
      const query = {}
      if (this.groups) {
        query.groups = this.groups.toString()
      }
      if (groupId !== null) {
        query.group = groupId.toString()
      }
      this.$router.push({ name: 'game', params, query })
    },
    chooseGroup(evt) {
      const groupId = this.groupList.indexOf(evt)
      if (groupId > 0) {
        this.fetchDetails(this.gameId, groupId)
      } else if (groupId === 0) {
        this.fetchDetails(this.gameId, null)
      } else {
        swal('错误', '页面错误，请刷新重试', 'error')
      }
    }
  }
}
</script>
