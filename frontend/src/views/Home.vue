<template>
  <div class="home" :class="{ 'dark-mode': isDarkMode }">
    <!-- 顶部搜索栏 -->
    <div class="search-header">
      <div class="header-content">
        <!-- 左侧 Logo -->
        <div class="logo-section">
          <img src="@/assets/logo.svg" alt="Logo" class="logo" />
          <h1>Social Platform</h1>
        </div>

        <!-- 中间搜索框 -->
        <div class="search-container">
          <Icon name="search" class="search-icon" />
          <input type="text" placeholder="搜索" class="search-input" />
          <button class="search-btn">搜索</button>
        </div>

        <!-- 右侧功能区 -->
        <div class="header-actions">
          <!-- 主题切换 -->
          <button class="theme-toggle" @click="toggleTheme">
            <Icon :name="isDarkMode ? 'moon' : 'sun'" />
          </button>

          <!-- 未登录状态 -->
          <template v-if="!isAuthenticated">
            <button class="auth-btn" @click="$router.push('/login')">登录</button>
            <button class="auth-btn primary" @click="$router.push('/register')">注册</button>
          </template>

          <!-- 已登录状态 -->
          <template v-else>
            <div class="user-menu" @click="toggleUserDropdown">
              <img :src="userAvatar" :alt="username" class="avatar" />
              <div class="dropdown-menu" v-if="showUserDropdown">
                <div class="dropdown-item">
                  <Icon name="user" />
                  <span>个人主页</span>
                </div>
                <div class="dropdown-item">
                  <Icon name="settings" />
                  <span>设置</span>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item" @click="handleLogout">
                  <Icon name="logout" />
                  <span>退出登录</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-container">
      <!-- 左侧导航 -->
      <nav class="left-nav">
        <div class="nav-section">
          <div class="nav-item active">
            <Icon name="fire" />
            <span>热门推荐</span>
          </div>
          <div class="nav-item">
            <Icon name="chart" />
            <span>热门榜单</span>
          </div>
          <div class="nav-item">
            <Icon name="search" />
            <span>搜索发现</span>
          </div>
        </div>

        <div class="nav-divider"></div>

        <div class="nav-section">
          <div class="nav-item">
            <Icon name="user" />
            <span>我的</span>
          </div>
          <div class="nav-item">
            <Icon name="hot" />
            <span>热搜</span>
          </div>
          <div class="nav-item">
            <Icon name="chat" />
            <span>交流</span>
          </div>
          <div class="nav-item">
            <Icon name="more" />
            <span>更多</span>
          </div>
        </div>
      </nav>

      <!-- 中间内容区 -->
      <main class="content-area">
        <!-- 顶部导航栏 -->
        <div class="content-nav">
          <div class="nav-tabs">
            <div class="tab-item active">热门</div>
            <div class="tab-item">实时</div>
            <div class="tab-item">同校</div>
            <div class="tab-item">榜单</div>
            <div class="tab-item">隐私记录</div>
            <div class="tab-item">校园新闻</div>
          </div>
        </div>

        <!-- 内容卡片 -->
        <div class="content-cards">
          <div class="card privacy-record">
            <div class="card-header">
              <div class="user-info">
                <img :src="userAvatar" class="avatar" />
                <div class="info">
                  <span class="username">{{ username }}</span>
                  <span class="time">15分钟前</span>
                </div>
              </div>
              <span class="version-tag">v1.2</span>
            </div>

            <div class="card-content">
              <h3>咖啡配方记录</h3>
              <p>今天尝试了新的咖啡豆配比：巴西Santos 60% + 耶加雪菲 40%</p>
              
              <div class="tags">
                <span class="tag">#咖啡</span>
                <span class="tag">#配方</span>
                <span class="tag">#记录</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="action-btn">
                <Icon name="history" />
                <span>历史版本</span>
              </button>
              <button class="action-btn">
                <Icon name="edit" />
                <span>编辑</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧热门话题 -->
      <aside class="right-sidebar">
        <div class="trending-section">
          <div class="section-header">
            <h3>热搜榜</h3>
            <button class="refresh-btn">
              <Icon name="refresh" />
              <span>点击刷新</span>
            </button>
          </div>

          <div class="trending-list">
            <div class="trending-item">
              <span class="rank">1</span>
              <div class="topic-info">
                <span class="topic-name"># 校园生活</span>
                <span class="topic-count">1234条讨论</span>
              </div>
            </div>
            <!-- 更多热搜项... -->
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Icon from '@/components/common/Icon.vue'

export default {
  name: 'Home',
  components: { Icon },
  
  setup() {
    const store = useStore()
    const router = useRouter()
    const showUserDropdown = ref(false)

    // 主题相关
    const isDarkMode = computed(() => store.state.theme.isDarkMode)
    const toggleTheme = () => {
      store.dispatch('theme/toggleTheme')
    }

    // 用户认证相关
    const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
    const userAvatar = computed(() => store.state.auth.user?.avatar || '/default-avatar.png')
    const username = computed(() => store.state.auth.user?.username || '')

    const toggleUserDropdown = () => {
      showUserDropdown.value = !showUserDropdown.value
    }

    const handleLogout = async () => {
      await store.dispatch('auth/logout')
      router.push('/login')
    }

    return {
      isDarkMode,
      toggleTheme,
      isAuthenticated,
      userAvatar,
      username,
      showUserDropdown,
      toggleUserDropdown,
      handleLogout
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: var(--background-color);
  
  .search-header {
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;

        .logo {
          width: 40px;
          height: 40px;
        }

        h1 {
          font-size: 20px;
          color: white;
        }
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 16px;

        .theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        .auth-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: white;
          cursor: pointer;
          font-size: 14px;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          &.primary {
            background: var(--primary-color);
            border: none;

            &:hover {
              opacity: 0.9;
            }
          }
        }

        .user-menu {
          position: relative;
          cursor: pointer;

          .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            background: var(--background-color);
            border-radius: 12px;
            padding: 8px;
            min-width: 180px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

            .dropdown-item {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 12px;
              border-radius: 8px;
              cursor: pointer;

              &:hover {
                background: rgba(255, 255, 255, 0.1);
              }
            }

            .dropdown-divider {
              height: 1px;
              background: rgba(255, 255, 255, 0.1);
              margin: 8px 0;
            }
          }
        }
      }
    }
  }

  .main-container {
    display: grid;
    grid-template-columns: 240px 1fr 300px;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .left-nav {
    position: sticky;
    top: 80px;
    
    .nav-section {
      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        &.active {
          color: var(--primary-color);
        }
      }
    }
    
    .nav-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 12px 0;
    }
  }

  .content-area {
    .content-nav {
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      .nav-tabs {
        display: flex;
        gap: 32px;
        
        .tab-item {
          padding: 12px 0;
          cursor: pointer;
          position: relative;
          
          &.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--primary-color);
          }
        }
      }
    }
    
    .privacy-record {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          
          .info {
            display: flex;
            flex-direction: column;
            
            .time {
              font-size: 14px;
              opacity: 0.7;
            }
          }
        }
        
        .version-tag {
          padding: 4px 8px;
          background: var(--primary-color);
          border-radius: 12px;
          font-size: 14px;
        }
      }
    }
  }

  .right-sidebar {
    position: sticky;
    top: 80px;
    
    .trending-section {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 16px;
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .trending-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        
        .rank {
          font-size: 20px;
          font-weight: bold;
          opacity: 0.5;
        }
        
        .topic-info {
          display: flex;
          flex-direction: column;
          
          .topic-count {
            font-size: 14px;
            opacity: 0.7;
          }
        }
      }
    }
  }
}

// 主题相关样式
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --primary-color: #ff6b6b;
}

.dark-mode {
  --background-color: #1a1a1a;
  --text-color: #ffffff;
}
</style> 