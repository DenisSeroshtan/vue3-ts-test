import {createRouter, createWebHistory} from "vue-router";
import Home from './Home.vue'
import NewPost from './NewPost.vue'
import EditPost from './EditPost.vue'
import {store} from './store'
import ShowPost from "./ShowPost.vue";

const routes = [
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
    {
        component: EditPost,
        name: 'EditPost',
        path: '/posts/:id/edit',
        meta: {
            requiredAuth: true,
        }
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})

export const makeRouter = () => createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth && !store.getState().authors.currentUserId) {
        next({name: 'Home'})
    } else {
        next()
    }
})
