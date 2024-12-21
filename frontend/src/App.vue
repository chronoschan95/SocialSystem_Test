<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
    <div class="app-background" :style="backgroundStyle">
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const isDarkMode = computed(() => store.state.theme.isDarkMode)
    const customBackground = computed(() => store.state.theme.customBackground)
    
    const backgroundStyle = computed(() => ({
      backgroundImage: customBackground.value 
        ? `url(${customBackground.value})`
        : 'var(--background)'
    }))

    return {
      isDarkMode,
      backgroundStyle
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#app {
  min-height: 100vh;
  
  .app-background {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image var(--transition-speed);
  }
}

// 全局过渡效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-speed);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 