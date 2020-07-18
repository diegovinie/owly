<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ParseImages />
    <HelloWorld msg="" />
    <section>
      <div class="">
        is connected: {{ connected }}
      </div>
      <button @click="connect" type="button">
        connect
      </button>
      <button v-if="connected" @click="getFiles" type="button">
        get files
      </button>
    </section>
  </div>
</template>

<script>
import ParseImages from './components/ParseImages.vue'
import HelloWorld from './components/HelloWorld.vue'
import google from '@/services/google'

export default {
  name: 'App',

  components: {
    ParseImages,
    HelloWorld
  },

  data: () => ({
    connected: false
  }),

  methods: {
    onStatusChanged(status) {
      this.connected = !!status
    },

    getFiles() {
      google.drive.listFiles()
    },

    connect() {
      google.init()
    }
  },

  mounted() {
    google.listeners.onStatusChanged = this.onStatusChanged
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
