// App styles
import 'normalize.css/normalize.css'
import './index.styl'

import carousels from './carousels'
import sw from './sw'

// starting carousels
carousels()

document
  .getElementById('menu-collapser')
  .addEventListener('click', () =>
    document.getElementById('menu-collapsable').classList.toggle('is-active')
  )

sw(navigator)
