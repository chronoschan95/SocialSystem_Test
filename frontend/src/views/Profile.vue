<template>
  <div class="profile">
    <Header />
    <main class="profile-content">
      <div class="profile-header glass-effect">
        <div class="profile-avatar">
          <img :src="user.avatar || '/images/default-avatar.jpg'" :alt="user.username">
        </div>
        <div class="profile-info">
          <h1>{{ user.username }}</h1>
          <p>{{ user.bio || '这个人很懒，还没有写简介' }}</p>
        </div>
      </div>
      
      <div class="profile-tabs glass-effect">
        <div 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </div>
      </div>
      
      <div class="profile-content glass-effect">
        <!-- 根据当前选中的标签显示不同内容 -->
        <component :is="currentComponent"></component>
      </div>
    </main>
  </div>
</template>

<script>
import Header from '../components/common/Header.vue'

export default {
  name: 'Profile',
  components: {
    Header
  },
  data() {
    return {
      currentTab: 'posts',
      user: {
        username: '用户名',
        avatar: null,
        bio: ''
      },
      tabs: [
        { id: 'posts', name: '动态' },
        { id: 'friends', name: '好友' },
        { id: 'settings', name: '设置' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  padding-top: 80px;
  
  .profile-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    padding: 30px;
    margin-bottom: 20px;
    
    .profile-avatar {
      width: 120px;
      height: 120px;
      margin-right: 30px;
      
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    
    .profile-info {
      h1 {
        margin-bottom: 10px;
        color: var(--text-color);
      }
      
      p {
        color: var(--text-color);
        opacity: 0.8;
      }
    }
  }
  
  .profile-tabs {
    display: flex;
    margin-bottom: 20px;
    padding: 10px;
    
    .tab {
      padding: 10px 20px;
      cursor: pointer;
      color: var(--text-color);
      opacity: 0.7;
      transition: opacity 0.3s;
      
      &.active {
        opacity: 1;
        border-bottom: 2px solid var(--primary-color);
      }
    }
  }
}
</style> 