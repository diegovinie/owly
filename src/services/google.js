import config from '@/config'

let gapi

const listeners = {
  __onStatusChanged__: listFiles,
  get onStatusChanged() { return this.__onStatusChanged__ },
  set onStatusChanged(fn) {
    if (fn instanceof Function) this.__onStatusChanged__ = fn
  }
}

function init() {
  const id = 'google-drive-script'

  if (document.getElementById(id)) return true

  const script = document.createElement('script')

  script.id = id
  script.src = 'https://apis.google.com/js/api.js'
  script.onload = handleClientLoad

  document.body.append(script)
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  if (!gapi) gapi = window.gapi
  gapi.load('client:auth2', initClient)
}

function handleSuccessfulInit() {
  gapi.auth2.getAuthInstance().isSignedIn.listen(listeners.onStatusChanged)

  listeners.onStatusChanged(gapi.auth2.getAuthInstance().isSignedIn.get())
}

function handleErrorInit(error) {
  console.log(error);
  // appendPre(JSON.stringify(error, null, 2))
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init(config.drive)
    .then(handleSuccessfulInit, handleErrorInit)
}

function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}

function listFiles() {
  return gapi.client.drive.files
    .list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    })
    .then(e => console.log(e) || e)
    .then(res => res.result.files)
}

export default {
  init,
  gapi,
  listeners,
  signIn,
  signOut,
  drive: {
    listFiles
  }
}
