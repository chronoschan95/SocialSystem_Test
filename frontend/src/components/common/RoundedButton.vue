<template>
  <button 
    class="rounded-button" 
    :class="[variant, { disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'RoundedButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.rounded-button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: transform var(--transition-speed);
  
  &.primary {
    background: var(--primary-color);
    color: white;
  }
  
  &.secondary {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
  }
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style> 