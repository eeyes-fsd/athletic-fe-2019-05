<template>
  <div class="home">
    <v-flex xs12 sm6 d-flex>
      <v-select
        :items="units"
        label="选择单元"
        @input="chooseUnit"
      />
    </v-flex>

    <v-data-table
      :headers="headers"
      :items="games"
      class="elevation-1"
      hide-actions
      disable-initial-sort
    >
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{ props.item.id }}
        </td>
        <td class="text-xs-right">
          {{ props.item.name }}
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
        <td class="text-xs-right">
          <v-btn color="info" @click="handleEdit(props.item)">
            编辑
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '@/api'
import swal from 'sweetalert'
import { units } from '@/config'
import { mapMutations } from 'vuex'

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
        { text: '组数', value: 'groups' },
        { text: '操作', value: 'operate' }
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
    ...mapMutations({
      setAdminEditGame: 'setAdminEditGame'
    }),
    async fetchGames(unitId = null) {
      try {
        this.games = await api.getGameIndex(unitId)
      } catch (error) {
        this.$handleError(error)
      }
      if (unitId === null) {
        this.$router.push({ name: 'admin_index' })
      } else {
        this.$router.push({ name: 'admin_index', query: { unit: unitId.toString() }})
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
    },
    handleEdit(item) {
      this.setAdminEditGame(item)
      const query = {
        game: item.id.toString()
      }
      this.$router.push({ name: 'admin', query })
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
