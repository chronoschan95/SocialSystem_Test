<template>
  <div class="content-card">
    <!-- 卡片头部 -->
    <div class="card-header">
      <div class="user-info">
        <img :src="post.userAvatar" :alt="post.username" class="avatar" />
        <span class="username">{{ post.username }}</span>
      </div>
      <div class="post-meta">
        <span class="time">{{ post.time }}</span>
        <span v-if="post.version" class="version">v{{ post.version }}</span>
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="card-content">
      <h3 v-if="post.title" class="title">{{ post.title }}</h3>
      <p class="content">{{ post.content }}</p>
      
      <!-- 图片区域 -->
      <div v-if="post.images && post.images.length" class="image-grid">
        <img 
          v-for="(img, index) in post.images" 
          :key="index"
          :src="img"
          @click="previewImage(img)"
          class="content-image"
        />
      </div>

      <!-- 标签 -->
      <div v-if="post.tags && post.tags.length" class="tags">
        <span 
          v-for="tag in post.tags" 
          :key="tag"
          class="tag"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- 卡片底部 -->
    <div class="card-footer">
      <div class="action-buttons">
        <button v-if="post.isPrivate" class="action-btn history" @click="showHistory">
          <i class="icon-history"></i>
          历史版本
        </button>
        <button v-if="post.isPrivate" class="action-btn edit" @click="editPost">
          <i class="icon-edit"></i>
          编辑
        </button>
      </div>
      <div class="interaction-buttons">
        <button class="interaction-btn">
          <i class="icon-like"></i>
          <span>{{ post.likes || 0 }}</span>
        </button>
        <button class="interaction-btn">
          <i class="icon-comment"></i>
          <span>{{ post.comments || 0 }}</span>
        </button>
        <button class="interaction-btn">
          <i class="icon-share"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    previewImage(img) {
      // 图片预览逻辑
    },
    showHistory() {
      this.$emit('show-history', this.post.id)
    },
    editPost() {
      this.$emit('edit-post', this.post.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-card {
  background: var(--card-bg-dark);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-sm);

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .username {
        color: var(--text-light);
        font-weight: 500;
      }
    }

    .post-meta {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--text-secondary);

      .version {
        background: var(--primary-color);
        color: white;
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
      }
    }
  }

  .card-content {
    .title {
      color: var(--text-light);
      margin-bottom: var(--space-sm);
    }

    .content {
      color: var(--text-light);
      margin-bottom: var(--space-md);
      line-height: 1.6;
    }

    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--space-sm);
      margin-bottom: var(--space-md);

      .content-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: transform var(--transition-fast);

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);

      .tag {
        color: var(--primary-color);
        font-size: 0.9rem;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-md);
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .action-buttons {
      display: flex;
      gap: var(--space-sm);

      .action-btn {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-sm) var(--space-md);
        border: none;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-light);
        cursor: pointer;
        transition: all var(--transition-fast);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .interaction-buttons {
      display: flex;
      gap: var(--space-md);

      .interaction-btn {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        transition: color var(--transition-fast);

        &:hover {
          color: var(--text-light);
        }
      }
    }
  }
}
</style> 