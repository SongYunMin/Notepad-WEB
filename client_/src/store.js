import {createApp} from 'vue'
import {createStore} from 'vuex'
import NOTEPAD from '@/modules/notepad'
import 'es6-promise/auto'
import App from './App'

export const store = createStore({
    modules:{notepad : NOTEPAD},
    // state() {
    //     return{
    //         tabList: [],
    //     }
    // },
    // mutations: {
    //     init(state){
    //         console.log(state);
    //         state.tabList.push({hi:'hi'});
    //     }
    // }
})


const app = createApp({module : App})
app.use(store);
