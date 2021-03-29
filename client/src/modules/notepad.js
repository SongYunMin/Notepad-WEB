import NOTEPAD from '../mutation-types';

const state = {
    tabList: [],
}

const mutations = {
    [NOTEPAD.INIT](state){
        console.log(state);
    }
}

export default {
    namespaced: true,
    state,
    mutations
}