import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHistory} from "vue-router"
import routes from "./route" //index.js nao precisae especificar por ser index

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
