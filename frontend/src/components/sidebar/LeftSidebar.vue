<template>
  <aside class="left-sidebar">
    <div class="menu-items">
      <router-link 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="menu-item"
        :class="{ active: currentPath === item.path }"
      >
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'LeftSidebar',
  data() {
    return {
      menuItems: [
        { name: '热门推荐', path: '/recommend', icon: 'icon-fire' },
        { name: '热门榜单', path: '/ranking', icon: 'icon-chart' },
        { name: '搜索发现', path: '/discover', icon: 'icon-search' },
        { name: '我的', path: '/profile', icon: 'icon-user' },
        { name: '热搜', path: '/hot-search', icon: 'icon-trending' },
        { name: '交流', path: '/chat', icon: 'icon-message' },
        { name: '更多', path: '/more', icon: 'icon-more' }
      ],
      currentPath: '/recommend'
    }
  },
  mounted() {
    this.currentPath = this.$route.path
  }
}
</script>

<style lang="scss" scoped>
.left-sidebar {
  width: 240px;
  height: 100%;
  padding: var(--space-md);
  background: var(--card-bg-dark);
  border-radius: var(--radius-lg);
  
  .menu-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    
    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md);
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      
      i {
        font-size: 1.2rem;
      }
      
      &:hover,
      &.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-light);
      }
    }
  }
}
</style> 