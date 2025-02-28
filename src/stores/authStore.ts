import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: (() => {
      const user = localStorage.getItem('user')
      try {
        return user ? JSON.parse(user) : null
      } catch (error) {
        console.error('Ошибка парсинга user из localStorage:', error)
        return null
      }
    })(),
  }),
  actions: {
    authenticate(data: { access_token: string }) {
      localStorage.setItem('token', data.access_token)
      this.token = data.access_token
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
    },
    setUser(user: object) {
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
    },
  },
})
