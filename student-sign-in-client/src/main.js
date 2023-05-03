import { createApp } from 'vue'
import App from './App.vue'
import StudentService from '@/services/StudentService'

let app = createApp(App)

app.config.globalProperties.$student_api = StudentService

app.mount('#app')
