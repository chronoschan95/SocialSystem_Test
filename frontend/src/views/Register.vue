<template>
  <div class="auth-page">
    <div class="auth-container glass-effect">
      <div class="auth-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <h2>注册账号</h2>
        <p class="subtitle">加入我们的校园社交圈</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <!-- 手机号输入 -->
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
        
        <!-- 验证码 -->
        <div class="form-group">
          <label>验证码</label>
          <div class="verify-input glass-effect-light">
            <input 
              type="text" 
              v-model="verifyCode"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button 
              type="button" 
              class="verify-btn"
              :disabled="!canSendCode || countdown > 0"
              @click="sendVerifyCode"
            >
              {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
            </button>
          </div>
          <span class="error" v-if="verifyError">{{ verifyError }}</span>
        </div>
        
        <!-- 用户名 -->
        <div class="form-group">
          <label>用户名</label>
          <div class="input-wrapper glass-effect-light">
            <input 
              type="text" 
              v-model="username"
              placeholder="请输入用户名"
              @input="validateUsername"
            />
          </div>
          <span class="error" v-if="usernameError">{{ usernameError }}</span>
        </div>
        
        <!-- 密码 -->
        <div class="form-group">
          <label>密码</label>
          <div class="password-input glass-effect-light">
            <input 
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="请设置密码"
              @input="validatePassword"
            />
            <span class="toggle-password" @click="showPassword = !showPassword">
              <Icon :name="showPassword ? 'eye-off' : 'eye'" />
            </span>
          </div>
          <span class="error" v-if="passwordError">{{ passwordError }}</span>
          <span class="password-strength" v-if="password">
            密码强度：{{ passwordStrength }}
          </span>
        </div>
        
        <!-- 确认密码 -->
        <div class="form-group">
          <label>确认密码</label>
          <div class="password-input glass-effect-light">
            <input 
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="请再次输入密码"
              @input="validateConfirmPassword"
            />
            <span class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <Icon :name="showConfirmPassword ? 'eye-off' : 'eye'" />
            </span>
          </div>
          <span class="error" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
        </div>
        
        <!-- 用户协议 -->
        <div class="form-group agreement">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="agreeToTerms"
            />
            <span>我已阅读并同意</span>
          </label>
          <a href="#" @click.prevent="showTerms">用户协议</a>
          <span>和</span>
          <a href="#" @click.prevent="showPrivacy">隐私政策</a>
        </div>
        
        <RoundedButton 
          type="submit" 
          :disabled="!isValid"
          class="submit-btn"
        >
          注册
        </RoundedButton>
        
        <p class="auth-switch">
          已有账号？
          <router-link to="/login">立即登录</router-link>
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
  name: 'Register',
  components: {
    Icon,
    RoundedButton
  },
  
  setup() {
    const phone = ref('')
    const verifyCode = ref('')
    const username = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const agreeToTerms = ref(false)
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const countdown = ref(0)
    
    // 错误状态
    const phoneError = ref('')
    const verifyError = ref('')
    const usernameError = ref('')
    const passwordError = ref('')
    const confirmPasswordError = ref('')
    
    // 验证手机号
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
    
    // 验证用户名
    const validateUsername = () => {
      if (!username.value) {
        usernameError.value = '请输入用户名'
      } else if (username.value.length < 2) {
        usernameError.value = '用户名至少2个字符'
      } else {
        usernameError.value = ''
      }
    }
    
    // 验证密码强度
    const passwordStrength = computed(() => {
      if (!password.value) return ''
      const hasLetter = /[a-zA-Z]/.test(password.value)
      const hasNumber = /\d/.test(password.value)
      const hasSpecial = /[!@#$%^&*]/.test(password.value)
      const length = password.value.length
      
      if (length < 8) return '弱'
      if (hasLetter && hasNumber && hasSpecial) return '强'
      if ((hasLetter && hasNumber) || (hasLetter && hasSpecial) || (hasNumber && hasSpecial)) return '中'
      return '弱'
    })
    
    // ���证密码
    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = '请输入密码'
      } else if (password.value.length < 8) {
        passwordError.value = '密码至少8个字符'
      } else {
        passwordError.value = ''
      }
    }
    
    // 验证确认密码
    const validateConfirmPassword = () => {
      if (!confirmPassword.value) {
        confirmPasswordError.value = '请确认密码'
      } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = '两次输入的密码不一致'
      } else {
        confirmPasswordError.value = ''
      }
    }
    
    // 发送验证码
    const sendVerifyCode = async () => {
      if (countdown.value > 0) return
      // TODO: 调用发送验证码API
      countdown.value = 60
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
    
    // 表单验证
    const isValid = computed(() => {
      return !phoneError.value &&
        !verifyError.value &&
        !usernameError.value &&
        !passwordError.value &&
        !confirmPasswordError.value &&
        phone.value &&
        verifyCode.value &&
        username.value &&
        password.value &&
        confirmPassword.value &&
        agreeToTerms.value
    })
    
    // 是否可以发送验证码
    const canSendCode = computed(() => {
      return !phoneError.value && phone.value
    })
    
    return {
      phone,
      verifyCode,
      username,
      password,
      confirmPassword,
      agreeToTerms,
      showPassword,
      showConfirmPassword,
      countdown,
      phoneError,
      verifyError,
      usernameError,
      passwordError,
      confirmPasswordError,
      passwordStrength,
      isValid,
      canSendCode,
      validatePhone,
      validateUsername,
      validatePassword,
      validateConfirmPassword,
      sendVerifyCode
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/auth.scss';

.auth-page {
  .password-strength {
    font-size: 14px;
    margin-top: 4px;
    color: var(--text-color);
  }
  
  .agreement {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    
    input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    a {
      color: var(--primary-color);
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style> 