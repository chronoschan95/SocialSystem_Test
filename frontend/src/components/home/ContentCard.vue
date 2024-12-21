<template>
  <div class="content-card glass-effect" @click="$emit('click', post)">
    <div class="card-image" v-if="post.image">
      <img :src="post.image" :alt="post.title" />
    </div>
    
    <div class="card-content">
      <div class="author-info">
        <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar" />
        <span class="author-name">{{ post.author.name }}</span>
      </div>
      
      <h3 class="card-title">{{ post.title }}</h3>
      <p class="card-text">{{ post.content }}</p>
      
      <div class="card-actions">
        <button class="action-button">
          <i class="icon-heart"></i>
          <span>喜欢</span>
        </button>
        <button class="action-button">
          <i class="icon-comment"></i>
          <span>评论</span>
        </button>
        <button class="action-button">
          <i class="icon-share"></i>
          <span>分享</span>
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
  }
}
</script>

<style scoped lang="scss">
.content-card {
  cursor: pointer;
  overflow: hidden;
  transition: transform var(--transition-speed);
  
  &:hover {
    transform: translateY(-4px);
  }
  
  .card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .card-content {
    padding: 16px;
    
    .author-info {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      
      .author-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 8px;
      }
      
      .author-name {
        font-weight: 500;
        color: var(--text-color);
      }
    }
    
    .card-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
    
    .card-text {
      color: var(--text-color);
      opacity: 0.8;
      margin-bottom: 16px;
    }
  }
  
  .card-actions {
    display: flex;
    gap: 16px;
    
    .action-button {
      background: none;
      border: none;
      color: var(--text-color);
      opacity: 0.6;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style> 