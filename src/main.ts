import { createApp } from 'vue'
import {router} from "./router";
import axios from "axios";
import * as dataMock from './mocks'
import random from 'lodash/random'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

//@ts-ignore
axios.get = async (url: string) => {
    if (url === '/posts') {
        await delay(1000)

        return Promise.resolve({
            data: [
                dataMock.todayPost, dataMock.thisWeek, dataMock.thisMonth
            ]
        })
    }
}
//@ts-ignore
axios.post = async (url: string, payload: Post) => {
    if (url === '/posts') {
        await delay(1000)
        const id = random(10, 10000)

        return Promise.resolve({
            data: {...payload, id}
        })
    }
    if (url === '/users') {
        await delay(1000)
        const id = random(10, 10000)
        const {id: oldId, password, ...rest} = payload
        return Promise.resolve({
            data: {...rest, id}
        })
    }
}
//@ts-ignore
axios.put = async (url: string, payload: Post) => {
    if (url === '/posts') {
        await delay(1000)

        return Promise.resolve({
            data: payload
        })
    }
}

import App from './App.vue'

const app = createApp(App)
app.use(router)

app.mount('#app')

