export default {
  drive: {
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  }
}
