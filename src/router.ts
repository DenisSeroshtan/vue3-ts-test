import {createRouter, createWebHistory} from "vue-router";
import Home from './Home.vue'
import NewPost from './NewPost.vue'
import {store} from './store'
import ShowPost from "./ShowPost.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: Home,
            name: 'Home',
            path: '/'
        },
        {
            component: ShowPost,
            name: 'ShowPost',
            path: '/posts/:id'
        },
        {
            component: NewPost,
            name: 'NewPost',
            path: '/posts/new',
            meta: {
                requiredAuth: true,
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth && !store.getState().authors.currentUserId) {
        next({name: 'Home'})
    } else {
        next()
    }
})
