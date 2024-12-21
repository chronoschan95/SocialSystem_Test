<template>
  <div class="version-control">
    <!-- 版本历史列表 -->
    <div class="version-list">
      <div class="list-header">
        <h3>版本历史</h3>
        <div class="header-actions">
          <button class="compare-btn" @click="startCompare" v-if="!comparing">
            <i class="icon-compare"></i>
            对比版本
          </button>
          <button class="cancel-btn" @click="cancelCompare" v-else>
            取消对比
          </button>
        </div>
      </div>

      <div class="versions">
        <div 
          v-for="version in versions" 
          :key="version.id"
          class="version-item"
          :class="{ 
            'active': selectedVersion === version.id,
            'selected': selectedVersions.includes(version.id)
          }"
          @click="handleVersionClick(version)"
        >
          <div class="version-info">
            <span class="version-number">v{{ version.number }}</span>
            <span class="version-time">{{ version.time }}</span>
          </div>
          <div class="version-meta">
            <span class="version-author">{{ version.author }}</span>
            <span class="version-desc">{{ version.description }}</span>
          </div>
          <div class="version-actions">
            <button 
              class="restore-btn"
              @click.stop="restoreVersion(version.id)"
              v-if="!comparing"
            >
              还原此版本
            </button>
            <input 
              type="checkbox"
              v-else
              :checked="selectedVersions.includes(version.id)"
              @click.stop
              @change="toggleVersionSelect(version.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 版本对比视图 -->
    <div class="version-compare" v-if="comparing && selectedVersions.length === 2">
      <div class="compare-header">
        <div class="version-a">
          版本 {{ getVersionNumber(selectedVersions[0]) }}
        </div>
        <div class="version-b">
          版本 {{ getVersionNumber(selectedVersions[1]) }}
        </div>
      </div>
      <div class="compare-content">
        <div class="diff-view">
          <!-- 使用diff库来显示内容差异 -->
          <pre v-html="diffResult"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { diff } from 'diff' // 假设使用diff库进行文本对比

export default {
  name: 'VersionControl',
  data() {
    return {
      versions: [
        {
          id: 1,
          number: '1.2',
          time: '2024-03-20 15:30',
          author: '张三',
          description: '更新配方比例',
          content: '巴西Santos 60% + 耶加雪菲 40%'
        },
        // ... 更多版本
      ],
      selectedVersion: null,
      comparing: false,
      selectedVersions: [],
      diffResult: ''
    }
  },
  methods: {
    handleVersionClick(version) {
      if (this.comparing) {
        this.toggleVersionSelect(version.id)
      } else {
        this.selectedVersion = version.id
        this.$emit('version-selected', version)
      }
    },
    startCompare() {
      this.comparing = true
      this.selectedVersions = []
    },
    cancelCompare() {
      this.comparing = false
      this.selectedVersions = []
      this.diffResult = ''
    },
    toggleVersionSelect(versionId) {
      const index = this.selectedVersions.indexOf(versionId)
      if (index === -1) {
        if (this.selectedVersions.length < 2) {
          this.selectedVersions.push(versionId)
          if (this.selectedVersions.length === 2) {
            this.compareVersions()
          }
        }
      } else {
        this.selectedVersions.splice(index, 1)
      }
    },
    compareVersions() {
      const version1 = this.versions.find(v => v.id === this.selectedVersions[0])
      const version2 = this.versions.find(v => v.id === this.selectedVersions[1])
      
      if (version1 && version2) {
        const differences = diff.diffWords(version1.content, version2.content)
        this.diffResult = differences.map(part => {
          const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
          return `<span style="color: ${color}">${part.value}</span>`
        }).join('')
      }
    },
    restoreVersion(versionId) {
      if (confirm('确定要还原到此版本吗？')) {
        this.$emit('restore-version', versionId)
      }
    },
    getVersionNumber(versionId) {
      const version = this.versions.find(v => v.id === versionId)
      return version ? version.number : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.version-control {
  background: var(--card-bg-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;

  .version-list {
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-lg);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      h3 {
        color: var(--text-light);
      }

      .header-actions {
        .compare-btn,
        .cancel-btn {
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .compare-btn {
          background: var(--primary-color);
          color: white;

          &:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
          }
        }

        .cancel-btn {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }

    .versions {
      max-height: 400px;
      overflow-y: auto;

      .version-item {
        padding: var(--space-md);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: all var(--transition-fast);

        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        &.active {
          background: rgba(255, 182, 182, 0.1);
        }

        &.selected {
          background: rgba(255, 182, 182, 0.2);
        }

        .version-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-sm);

          .version-number {
            color: var(--primary-color);
            font-weight: 500;
          }

          .version-time {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
        }

        .version-meta {
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);

          .version-author {
            color: var(--text-light);
          }

          .version-desc {
            color: var(--text-secondary);
          }
        }

        .version-actions {
          display: flex;
          justify-content: flex-end;

          .restore-btn {
            padding: var(--space-xs) var(--space-sm);
            border: none;
            border-radius: var(--radius-sm);
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-light);
            cursor: pointer;

            &:hover {
              background: rgba(255, 255, 255, 0.2);
            }
          }
        }
      }
    }
  }

  .version-compare {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--space-lg);

    .compare-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-md);
      color: var(--text-light);
    }

    .compare-content {
      background: rgba(0, 0, 0, 0.2);
      border-radius: var(--radius-md);
      padding: var(--space-md);

      .diff-view {
        font-family: monospace;
        white-space: pre-wrap;
        line-height: 1.5;

        ::v-deep(span) {
          &[style*="color: green"] {
            background: rgba(0, 255, 0, 0.1);
          }
          &[style*="color: red"] {
            background: rgba(255, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style> 