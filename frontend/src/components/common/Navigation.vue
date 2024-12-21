<template>
  <nav class="nav-container">
    <!-- 顶部导航 -->
    <div class="top-nav">
      <div class="logo-section">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <h1>Social Platform</h1>
      </div>
      
      <div class="search-section">
        <input 
          type="text" 
          placeholder="搜索" 
          class="search-input"
        />
        <button class="search-btn">搜索</button>
      </div>
      
      <div class="auth-section">
        <button class="auth-btn login">登录</button>
        <button class="auth-btn register">注册</button>
      </div>
    </div>

    <!-- 主导航 -->
    <div class="main-nav">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: currentPath === item.path }"
      >
        {{ item.name }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      navItems: [
        { name: '热门', path: '/hot' },
        { name: '实时', path: '/realtime' },
        { name: '同校', path: '/school' },
        { name: '榜单', path: '/ranking' },
        { name: '隐私记录', path: '/privacy' },
        { name: '校园新闻', path: '/news' }
      ],
      currentPath: '/hot'
    }
  },
  mounted() {
    this.currentPath = this.$route.path
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  background: var(--card-bg-dark);
  
  .top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      
      .logo {
        width: 40px;
        height: 40px;
      }
      
      h1 {
        color: var(--text-light);
        font-size: 1.5rem;
      }
    }
    
    .search-section {
      display: flex;
      gap: var(--space-sm);
      
      .search-input {
        width: 300px;
        padding: var(--space-sm) var(--space-md);
        border: none;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-light);
        
        &::placeholder {
          color: var(--text-secondary);
        }
      }
      
      .search-btn {
        padding: var(--space-sm) var(--space-md);
        border: none;
        border-radius: var(--radius-full);
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        transition: all var(--transition-fast);
        
        &:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
      }
    }
    
    .auth-section {
      display: flex;
      gap: var(--space-md);
      
      .auth-btn {
        padding: var(--space-sm) var(--space-lg);
        border: none;
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: all var(--transition-fast);
        
        &.login {
          background: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
        }
        
        &.register {
          background: var(--primary-color);
          color: white;
        }
        
        &:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
      }
    }
  }
  
  .main-nav {
    display: flex;
    gap: var(--space-lg);
    padding: var(--space-md);
    
    .nav-item {
      color: var(--text-secondary);
      text-decoration: none;
      padding: var(--space-sm) 0;
      position: relative;
      transition: color var(--transition-fast);
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
        transform: scaleX(0);
        transition: transform var(--transition-fast);
      }
      
      &:hover,
      &.active {
        color: var(--text-light);
        
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style> 