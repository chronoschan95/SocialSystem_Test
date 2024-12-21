import { createStore } from 'vuex'
import theme from './modules/theme'
import auth from './modules/auth'

export default createStore({
  modules: {
    theme,
    auth
  }
}) 