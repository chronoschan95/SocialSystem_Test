<template>
  <button class="theme-switch" @click="toggleTheme">
    <div class="switch-track" :class="{ 'dark': isDark }">
      <div class="switch-thumb">
        <svg v-if="!isDark" class="icon" viewBox="0 0 24 24">
          <!-- Sun icon -->
          <path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
        </svg>
        <svg v-else class="icon" viewBox="0 0 24 24">
          <!-- Moon icon -->
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ThemeSwitch',
  data() {
    return {
      isDark: false
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.setAttribute('data-theme', 
        this.isDark ? 'dark' : 'light');
    }
  },
  mounted() {
    // 检查系统主题偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
}
</script>

<style scoped lang="scss">
.theme-switch {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  .switch-track {
    width: 48px;
    height: 24px;
    background-color: var(--primary-color);
    border-radius: 12px;
    position: relative;
    transition: background-color var(--transition-speed);
    
    &.dark {
      background-color: var(--secondary-color);
    }
  }
  
  .switch-thumb {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform var(--transition-speed);
    display: flex;
    align-items: center;
    justify-content: center;
    
    .dark & {
      transform: translateX(24px);
    }
  }
  
  .icon {
    width: 14px;
    height: 14px;
    fill: var(--primary-color);
  }
}
</style> 