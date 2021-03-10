import {createRouter, createWebHistory} from "vue-router";
import Home from './Home.vue'
import NewPost from './NewPost.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: Home,
            name: 'Home',
            path: '/'
        },
        {
            component: NewPost,
            name: 'NewPost',
            path: '/posts/new'
        },
    ]
})
