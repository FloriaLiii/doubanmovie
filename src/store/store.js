import { createStore } from 'vuex'

export default createStore({
    state: {
        userInfo: {},
        detailTitle: '',
        commentList: []
    },
    mutations: {
        setUser(state, obj){
            state.userInfo = obj
        },
        setTitle(state, str) {
            state.detailTitle = str
        },
        setCommentList(state, obj) {
            state.commentList.push(obj)
        }

    }
})