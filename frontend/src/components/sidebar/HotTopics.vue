<template>
  <div class="hot-topics">
    <div class="header">
      <h2>热搜榜</h2>
      <button class="refresh-btn" @click="refreshTopics">
        <i class="icon-refresh"></i>
      </button>
    </div>

    <div class="topics-list">
      <div 
        v-for="(topic, index) in topics" 
        :key="topic.id"
        class="topic-item"
      >
        <span class="rank" :class="{ 'top-3': index < 3 }">{{ index + 1 }}</span>
        <div class="topic-info">
          <h3 class="topic-title">{{ topic.title }}</h3>
          <span class="topic-stats">{{ topic.discussions }}条讨论</span>
        </div>
      </div>
    </div>

    <button class="more-btn" @click="showMore">
      点击刷新
    </button>
  </div>
</template>

<script>
export default {
  name: 'HotTopics',
  data() {
    return {
      topics: [
        { id: 1, title: '#校园生活', discussions: 1234 },
        { id: 2, title: '#学习交流', discussions: 890 },
        { id: 3, title: '#社团活动', discussions: 567 },
        // ... 更多话题
      ]
    }
  },
  methods: {
    refreshTopics() {
      // 刷新话题列表
    },
    showMore() {
      // 显示更多话题
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-topics {
  background: var(--card-bg-dark);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);

    h2 {
      color: var(--text-light);
      font-size: 1.2rem;
    }

    .refresh-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        color: var(--text-light);
        transform: rotate(180deg);
      }
    }
  }

  .topics-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    .topic-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm);
      border-radius: var(--radius-md);
      transition: background var(--transition-fast);
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .rank {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);
        font-size: 0.9rem;

        &.top-3 {
          background: var(--primary-color);
          color: white;
        }
      }

      .topic-info {
        flex: 1;

        .topic-title {
          color: var(--text-light);
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .topic-stats {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }
      }
    }
  }

  .more-btn {
    width: 100%;
    padding: var(--space-sm);
    margin-top: var(--space-lg);
    border: none;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: var(--text-light);
    }
  }
}
</style> 