<template>
  <div class="auth-page">
    <div class="auth-container glass-effect">
      <div class="auth-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <h2>登录</h2>
        <p class="subtitle">欢迎回来</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label>手机号</label>
          <div class="phone-input glass-effect-light">
            <span class="prefix">+86</span>
            <input 
              type="tel" 
              v-model="phone"
              placeholder="请输入手机号"
              @input="validatePhone"
              maxlength="11"
            />
          </div>
          <span class="error" v-if="phoneError">{{ phoneError }}</span>
        </div>
        
        <div class="form-group">
          <label>密码</label>
          <div class="password-input glass-effect-light">
            <input 
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="请输入密码"
            />
            <span class="toggle-password" @click="showPassword = !showPassword">
              <Icon :name="showPassword ? 'eye-off' : 'eye'" />
            </span>
          </div>
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        
        <RoundedButton type="submit" :disabled="!isValid" class="submit-btn">
          登录
        </RoundedButton>
        
        <p class="auth-switch">
          还没有账号？
          <router-link to="/register">立即注册</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Icon from '../components/common/Icon.vue'
import RoundedButton from '../components/common/RoundedButton.vue'

export default {
  name: 'Login',
  components: {
    Icon,
    RoundedButton
  },
  
  setup() {
    const phone = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const showPassword = ref(false)
    const phoneError = ref('')
    
    const validatePhone = () => {
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phone.value) {
        phoneError.value = '请输入手机号'
      } else if (!phoneRegex.test(phone.value)) {
        phoneError.value = '请输入正确的手机号'
      } else {
        phoneError.value = ''
      }
    }
    
    const isValid = computed(() => {
      return phone.value && password.value && !phoneError.value
    })
    
    const handleLogin = () => {
      // TODO: 实现登录逻辑
      console.log('登录', {
        phone: phone.value,
        password: password.value,
        rememberMe: rememberMe.value
      })
    }
    
    return {
      phone,
      password,
      rememberMe,
      showPassword,
      phoneError,
      isValid,
      validatePhone,
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/auth.scss';

.auth-page {
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 24px;
    font-size: 14px;
    
    .remember-me {
      display: flex;
      align-items: center;
      gap: 6px;
      
      input[type="checkbox"] {
        width: 16px;
        height: 16px;
      }
    }
    
    .forgot-password {
      color: var(--primary-color);
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style> 