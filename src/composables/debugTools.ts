type TCallback = string | ((data: any) => boolean) | boolean
const urlParams = new URLSearchParams(window.location.search)
const activeDebugger = localStorage.getItem('debuggerContentScreen')

const debugEcho = (key: string, message: any = '') => {
  if (urlParams.has('debugContentScreen') || activeDebugger) {
    console.log(key, message)
  }
}

export {
  debugEcho
}
