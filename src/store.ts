import {inject, provide, reactive, readonly} from 'vue'
import {Post, User, Author} from "./types";
import axios from 'axios'
import {thisMonth, thisWeek, todayPost} from "./mocks";

interface PostsState {
    ids: string[],
    all: Record<string, Post>,
    loaded: boolean,
}
interface AuthorsState {
    ids: string[],
    all: Record<string, Author>,
    loaded: boolean,
    currentUserId?: string
}

interface State {
    authors: AuthorsState,
    posts: PostsState
}

const initialPostState = (): PostsState => ({
    ids: [],
    all: {},
    loaded: false,
})

const initialAuthorsState = (): AuthorsState => ({
    ids: [],
    all: {},
    loaded: false,
    currentUserId: undefined
})

const initialState = (): State => ({
    posts: initialPostState(),
    authors: initialAuthorsState()
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

    async createUser(user: User) {
        const {data} = await axios.post<Author>('/users', user)
        this.state.authors.all[data.id] = data
        this.state.authors.ids.push(data.id.toString())
        this.state.authors.currentUserId = data.id.toString()
    }
}

const store = new Store(initialState())
store.getState()

export const provideStore = ():void => provide('store', store)

export const createStore = ():Store => new Store(initialState())

export const useStore = ():Store => inject<Store>('store')
