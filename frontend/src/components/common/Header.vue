<template>
  <header class="header glass-effect">
    <div class="container header-content">
      <router-link to="/" class="logo">
        Social Platform
      </router-link>
      
      <div class="header-right">
        <ThemeSwitch />
        <div class="auth-buttons" v-if="!isLoggedIn">
          <RoundedButton @click="$router.push('/login')" variant="secondary">
            登录
          </RoundedButton>
          <RoundedButton @click="$router.push('/register')" variant="primary">
            注册
          </RoundedButton>
        </div>
        <div class="user-info" v-else>
          <img :src="userAvatar" class="avatar" @click="$router.push('/profile')" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ThemeSwitch from './ThemeSwitch.vue'
import RoundedButton from './RoundedButton.vue'

export default {
  name: 'Header',
  components: {
    ThemeSwitch,
    RoundedButton
  },
  data() {
    return {
      isLoggedIn: false,
      userAvatar: '/default-avatar.png'
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 0;
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
    text-decoration: none;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style> 