import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

const parseDate = weirdDate => dayjs(weirdDate, 'YYYY:MM:DD HH:mm:ss')
  .utc()
  .local()
  .format()

const getDate = file => {
  const meta = file && file.imageMediaMetadata
  const weirdDate = meta && meta.time

  return parseDate(weirdDate)
}

const getValue = file => {
  const str = file.name.split('.')
    .slice(0, -1)
    .join('.')

  return isNaN(str) ? null : parseFloat(str)
}

export default {
  methods: {
    parseImagesMapFiles(files) {
      return files.map(file => ({
        id: file.id,
        value: getValue(file),
        createdAt: getDate(file)
      }))
    }
  }
}
