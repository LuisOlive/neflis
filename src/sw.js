/**
 * @param {Navigator} navigator
 */
export default navigator => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.error('SW registration failed: ', registrationError)
      })
  }
}
