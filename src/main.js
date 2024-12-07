import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Button, 
  Form, 
  Field, 
  CellGroup,
  Tab,
  Tabs,
  Circle,
  Toast,
  Empty
} from 'vant'
import 'vant/lib/index.css'
import '@/assets/styles/common.scss'

// 在开发环境下引入 mock
if (process.env.NODE_ENV === 'development') {
  const mock = import.meta.glob('./mock/*.js')
  Object.values(mock).forEach(item => item())
}

const app = createApp(App)

app.use(router)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Tab)
app.use(Tabs)
app.use(Circle)
app.use(Toast)
app.use(Empty)

app.mount('#app') 