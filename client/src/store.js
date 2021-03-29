import {createStore} from 'vuex'
import notepad from './modules/notepad'
// TODO : 뷰 버전 불일치(문법)


export default createStore({
    modules:{notepad},
})

// const store = createStore({
//     state(){
//         return {
//             tabList: [],
//         }
//     },
//     mutations:{
//         addTab(state){
//             console.log("Mutations");
//             state.tabList.push({memo:123});
//             console.log(state.tabList);
//         },
//     }
// });
//
// const app = createApp({module : {App}});
// app.use(store);