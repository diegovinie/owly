<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ParseImages />
  </div>
</template>

<script>
import ParseImages from './components/ParseImages.vue'

export default {
  name: 'App',

  components: {
    ParseImages
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
