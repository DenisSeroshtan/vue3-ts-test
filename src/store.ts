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

    public getState(): State  {
        return this.state
    }

    async fetchPosts() {
        const {data} = await axios.get<Post[]>('/posts')
        const ids: string[] = []
        const all: Record<string, Post> = {}

        data.forEach(post => {
            ids.push(post.id.toString())
            all[post.id] = post
        })

        this.state.posts = {
            ids,
            all,
            loaded: true,
        }
    }

}

const store = new Store(initialState())
store.getState()

export const useStore = () => store
