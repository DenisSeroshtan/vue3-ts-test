import {reactive, readonly} from 'vue'
import {Post} from "./types";
import axios from 'axios'

interface PostsState {
    ids: string[],
    all: Record<string, Post>,
    loaded: boolean,
}

interface State {
    posts: PostsState
}

import {todayPost, thisMonth, thisWeek } from "./mocks";

const initialPostState = (): PostsState => ({
    ids: [
        todayPost.id.toString(),
        thisMonth.id.toString(),
        thisWeek.id.toString(),
    ],
    all: {
        [todayPost.id]: todayPost,
        [thisMonth.id]: thisMonth,
        [thisWeek.id]: thisWeek,
    },
    loaded: false,
})

const initialState = (): State => ({
    posts: initialPostState()
})

class Store {
    protected state: State

    constructor(initialState: State) {
        this.state = reactive(initialState)
    }

    public getState(): State {
        //@ts-ignore
        return readonly(this.state)
    }

    async createPost(post: Post) {
        const {data} = await axios.post<Post>('/posts', post)
        this.state.posts.all[data.id] = data
        this.state.posts.ids.push(data.id.toString())
    }

    async fetchPosts() {
        const {data} = await axios.get<Post[]>('/posts')

        data.forEach(post => {
            if (!this.state.posts.ids.includes(post.id.toString())) {
                this.state.posts.ids.push(post.id.toString())
            }
            this.state.posts.all[post.id] = post
        })

        this.state.posts.loaded = true
    }

}

const store = new Store(initialState())
store.getState()

export const useStore = () => store
