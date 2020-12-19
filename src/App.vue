<template>
  <div id="app">
    <section class="mx-5">
      <div class="">
        is connected:
        <span :class="`has-text-${connected ? 'success' : 'danger'}`">
          {{ connected }}
        </span>
      </div>
      <div class="field is-grouped">
        <button @click="graph" type="button" class="control button is-info">
          graph
        </button>
        <button @click="connect" type="button" class="button control">
          connect
        </button>
        <button v-if="connected" @click="getFiles" type="button" class="button is-info control">
          get files
        </button>
        <button v-if="files.length" type="button" @click="calcDeltas" class="button is-primary control">
          Deltas
        </button>
      </div>

      <div class="">
        <h3>Results:</h3>
        <table>
          <thead>
            <tr>
              <th v-for="key in Object.keys(files.length ? files[0] : [])"
                v-if="key !== 'id'"
                :key="key">
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td v-for="[key, val] in Object.entries(file)"
                v-if="key !== 'id'"
                :key="`${key}-${val}`">
                {{ val }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section v-show="files.length">
      <div id="chart1" style="height: 400px" />
      <div id="chart2" style="height: 400px" />
    </section>
  </div>
</template>

<script>
// import CanvasJS from 'canvasjs';
import google from '@/services/google'
import parseImagesMixin from '@/mixins/parseImages'
import { mapDeltas } from '@/analytics'
import { inspect } from '@/functions'

// var CanvasJS = require('canvasjss')

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
    },

    calcDeltas() {
      const fs = mapDeltas(this.files)
      console.log(fs)

      this.files = fs
    },

    graph() {
      var chart1 = new CanvasJS.Chart('chart1', {
        animationEnabled: true,
        title:{
          text: "Promedio consumo electricidad"
        },
        axisX: {
          valueFormatString: "HH - DD"
        },
        axisY: {
          title: "kwats x h",
          includeZero: false,
          suffix: " kwh"
        },
        legend:{
          cursor: "pointer",
          fontSize: 16,
          // itemclick: toggleDataSeries
        },
        toolTip:{
          shared: true
        },
        data: [
          {
            name: "Sumatoria",
            type: "spline",
            yValueFormatString: "#0.## kw",
            showInLegend: true,
            dataPoints: this.files.map(point => ({
              x: new Date(point.createdAt),
              y: point.value
            }))
          }
        ]
      });
      chart1.render();

      var chart2 = new CanvasJS.Chart('chart2', {
        animationEnabled: true,
        title:{
          text: "Consumo electricidad"
        },
        axisX: {
          valueFormatString: "DD - HH:mm"
        },
        axisY: {
          title: "kwats",
          includeZero: false,
          suffix: " kw"
        },
        legend:{
          cursor: "pointer",
          fontSize: 16,
          // itemclick: toggleDataSeries
        },
        toolTip:{
          shared: true
        },
        data: [
          {
            name: "rates",
            type: "stepArea",
            color: "#B36491",
            yValueFormatString: "#0.##",
            xValueFormatString: "DD - HH:mm",
            showInLegend: true,
            dataPoints: this.files.map(point => ({
              x: new Date(point.createdAt),
              y: point.rate
            }))
          }
        ]
      });
      chart2.render();
    }
  },

  mounted() {
    google.listeners.onStatusChanged = this.onStatusChanged
  }
}
</script>

<style lang="scss">
  // @import 'variables';
  @import url('https://use.fontawesome.com/releases/v5.12.0/css/all.css');
  @import 'bulma/bulma.sass';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
