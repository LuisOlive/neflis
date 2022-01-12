const useTimeOut = (callback, ms) => {
  let timeOut
  return [
    () => {
      clearInterval(timeOut)
      timeOut = setTimeout(callback, ms)
    },
    () => clearInterval(timeOut)
  ]
}

export default () =>
  document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel__image')
    const container = carousel.querySelector('.carousel__container')
    const row = carousel.querySelector('.carousel__row')
    const rightArow = carousel.querySelector('.carousel__button--right')
    const leftArow = carousel.querySelector('.carousel__button--left')

    let x = 0
    const X = row.clientWidth

    // const translate = newI => {

    //   if (newI < 0 || newI > 6) return

    //   i = newI
    //

    //   if (!i) leftArow.style.opacity = 0
    //   if (i) leftArow.style.opacity = '100%'

    //   if (i === 6) rightArow.style.opacity = 0
    //   if (i !== 6) rightArow.style.opacity = '100%'

    //   console.log(row.clientWidth, container.clientWidth)

    //   // restart()
    // }

    /**
     * @param {-1 | 1} sgn
     */
    const translate = (sgn = 1) => {
      const dx = container.clientWidth * sgn

      if (x + dx < 0 || X - x <= dx) return

      x += dx

      row.style.transform = `translateX(-${x}px)`

      restart()

      if (x < container.clientWidth) leftArow.style.opacity = 0
      else if (!(X - x - dx)) rightArow.style.opacity = 0
      else rightArow.style.opacity = leftArow.style.opacity = 1
    }

    let [restart, stop] = useTimeOut(translate, 3000)

    rightArow.addEventListener('click', () => translate())
    leftArow.addEventListener('click', () => translate(-1))

    leftArow.style.opacity = 0
    restart()

    container.addEventListener('mouseenter', stop)
    container.addEventListener('mouseleave', restart)
  })
