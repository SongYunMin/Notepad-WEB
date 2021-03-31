import {NOTEPAD} from '@/mutation-types';

const state = {
    tabList: [],
    tabCount: 0
}

const mutations = {
    [NOTEPAD.INIT](state) {
        state.tabCount++;
        state.tabList.push({hi: 'hi'});
        console.log(state.tabList);
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}