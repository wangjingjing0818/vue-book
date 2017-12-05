/**
 * Created by Administrator on 2017/11/26.
 */
import * as Types from './mutations-types'
const mutations = {
    [Types.INCREMENT] (state, n) {
        state.count += n
    },
    [Types.DECREMENT] (state, n) {
        state.count -= n
    }
}
export  default mutations