let webStorage;
try {
  webStorage = localStorage
} catch (e) {
  console.log('localStorage not available, fallback to sessionStorage')
  webStorage = sessionStorage
}

//暴露webStorage
window.webStorage = webStorage

export default webStorage
