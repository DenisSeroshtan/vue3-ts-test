import {createRouter, createWebHistory} from "vue-router";
import Home from './Home.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: Home,
            name: 'Home',
            path: '/'
        }
    ]
})
