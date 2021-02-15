import { createApp } from 'vue'
import {router} from "./router";
import axios from "axios";
import * as dataMock from './mocks'

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
import App from './App.vue'

const app = createApp(App)
app.use(router)

app.mount('#app')

