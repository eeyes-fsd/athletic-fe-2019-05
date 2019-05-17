<template>
  <div class="home">
    <v-flex xs12 sm6 d-flex>
      <v-select
        :items="units"
        label="Standard"
        @input="chooseUnit"
      />
    </v-flex>

    <v-data-table
      :headers="headers"
      :items="games"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{ props.item.id }}
        </td>
        <td class="text-xs-right">
          <router-link :to="{ name: 'game', params: { id: props.item.id }, query: { groups: props.item.groups }}">
            {{ props.item.name }}
          </router-link>
        </td>
        <td class="text-xs-right column-begin-at">
          {{ props.item.begin_at }}
        </td>
        <td class="text-xs-right">
          {{ props.item.participants }}
        </td>
        <td class="text-xs-right">
          {{ props.item.groups }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '@/api'
import swal from 'sweetalert'

const units = [
  '全部',
  '第一单元',
  '第二单元',
  '第三单元'
]

export default {
  name: 'Home',
  data() {
    return {
      units,
      headers: [
        {
          text: '序号',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: '项目名称', value: 'name' },
        { text: '比赛时间', class: 'column-begin-at', value: 'begin_at' },
        { text: '人数', value: 'participants' },
        { text: '组数', value: 'groups' }
      ],
      games: []
    }
  },
  computed: {
    unitId() {
      const queryUnitId = this.$route.query.unit
      return queryUnitId ? (parseInt(queryUnitId) || null) : null
    }
  },
  mounted() {
    this.fetchGames(this.unitId)
  },
  methods: {
    async fetchGames(unitId = null) {
      this.games = await api.getGameIndex(unitId)
      if (unitId === null) {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'home', query: { unit: unitId.toString() }})
      }
    },
    chooseUnit(evt) {
      const unitId = units.indexOf(evt)
      if (unitId > 0) {
        this.fetchGames(unitId)
      } else if (unitId === 0) {
        this.fetchGames(null)
      } else {
        swal('错误', '页面错误，请刷新重试', 'error')
      }
    }
  }
}
</script>

<style>
.column-begin-at {
  width: 200px;
  white-space: nowrap;
}
</style>
