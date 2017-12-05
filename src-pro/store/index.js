/**
 * Created by Administrator on 2017/11/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
Vue.use(Vuex)
//
const state = {
    count: 0
}
const getters = {
    val(state) {
       return state.count%2 == 0 ? 'oshu' : 'jishu'
    }
}
import mutations from './mutations.js'

export default new Vuex.Store({
    state,
    mutations,
    getters,
    plugins: [logger()],
    strict:true
})