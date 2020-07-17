<template lang="html">
  <section>
    <input type="file" name="image" @change="handleChange" >
  </section>
</template>

<script>
import Exif from 'exif-js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

const getMetainfo = file => new Promise((resolve, ) => {
  Exif.getData(file, function () {
    const predate = Exif.getTag(this, 'DateTimeOriginal')

    resolve(predate)
  })
})

const parseDate = weirdDate => dayjs(weirdDate, 'YYYY:MM:DD HH:mm:ss')
  .utc()
  .local()
  .format()

const inspect = r => console.log(r) || r

export default {
  name: 'ParseImages',

  props: {

  },

  data: () => ({
    records: []
  }),

  methods: {
    handleChange (e) {
      const file = e.target.files[0]

      getMetainfo(file)
        .then(parseDate)
        .then(inspect)
        .then(records => {
          this.records = records
        })
    }
  },

  mounted () {

  }

}
</script>

<style lang="css" scoped>
</style>
