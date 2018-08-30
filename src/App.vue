<template>
  <div id="app">
    <router-view/>
    <Player></Player>
  </div>
</template>

<script>
import Player from './pages/player/Player'
export default {
  name: 'App',
  components: {
    Player
  }
}
</script>

<style>
#app {
}
</style>
