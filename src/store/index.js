import {createStore} from 'vuex'

export default createStore({
    state: {
        admin:null,
    },
    mutations: {
        updateAdmin(state,admin){
            state.admin=admin
        }
    },
    actions: {
        // 定义actions，用于修改状态(异步)
        // 2秒后更新状态
        updateInfo(context, payload) {
            setTimeout(() => {
                context.commit('updateInfo', payload)
            }, 2000)
        }
    },
    getters: {},
    modules: {}
})
