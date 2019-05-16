<template>
  <div class="game">
    Game
    {{ gameId }}
  </div>
</template>

<script>
export default {
  name: 'Game',
  computed: {
    gameId() {
      const paramsGameId = this.$route.params.id
      return paramsGameId ? (parseInt(paramsGameId) || null) : null
    }
  }
}
</script>

<style>

</style>
