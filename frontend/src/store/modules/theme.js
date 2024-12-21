export default {
  namespaced: true,
  
  state: () => ({
    isDarkMode: true // 默认使用深色模式
  }),
  
  mutations: {
    SET_DARK_MODE(state, value) {
      state.isDarkMode = value
    }
  },
  
  actions: {
    toggleTheme({ commit, state }) {
      commit('SET_DARK_MODE', !state.isDarkMode)
      // 可以选择将主题偏好保存到 localStorage
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
    },
    
    initTheme({ commit }) {
      try {
        // 检查 localStorage 是否可用
        if (typeof localStorage !== 'undefined') {
          const savedTheme = localStorage.getItem('theme')
          if (savedTheme) {
            commit('SET_DARK_MODE', savedTheme === 'dark')
          }
        }
      } catch (error) {
        console.warn('Unable to access localStorage:', error)
        // 使用默认主题
        commit('SET_DARK_MODE', true)
      }
    }
  }
} 