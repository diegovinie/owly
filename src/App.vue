<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
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
      <div class="">
        <h3>Results:</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td>{{ file.value }}</td>
              <td>{{ file.createdAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import google from '@/services/google'
import parseImagesMixin from '@/mixins/parseImages'

export default {
  name: 'App',

  mixins: [parseImagesMixin],

  data: () => ({
    connected: false,
    files: []
  }),

  methods: {
    onStatusChanged(status) {
      this.connected = !!status
    },

    getFiles() {
      google.drive.listFiles()
        .then(this.parseImagesMapFiles)
        .then(files => {
          this.files = files || []
        })
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
