export default {
  namespaced: true,
  
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null
  }),
  
  mutations: {
    SET_AUTH(state, { user, token }) {
      state.isAuthenticated = true
      state.user = user
      state.token = token
    },
    
    CLEAR_AUTH(state) {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    }
  },
  
  actions: {
    login({ commit }, { user, token }) {
      // 保存到 localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      // 更新状态
      commit('SET_AUTH', { user, token })
    },
    
    logout({ commit }) {
      // 清除 localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // 清除状态
      commit('CLEAR_AUTH')
    },
    
    // 初始化认证状态
    initAuth({ commit }) {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      
      if (token && user) {
        commit('SET_AUTH', { user, token })
      }
    }
  }
} 