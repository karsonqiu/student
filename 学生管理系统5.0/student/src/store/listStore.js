import api from '../api'
import showToast from '../utils/toast/index.js'

export default {
    state: {
        list: [],
        activeStu: null,
        size: 10,
        totalPage: null,
        count: 0,
        nowPage: 1,
        checkmodule: false,
        check: null,
    },
    mutations: {
        setState(state, list) {
            state.list = list
        },
        setTotalPage(state, count) {
            state.count = count;
            state.totalPage = count
        },
        setActiveStu(state, stu) {
            state.activeStu = stu
        },
        setSize(state, size) {
            state.size = size
        },
        setNowpage(state, page) {
            state.nowPage = page
        },
        setCheckmodule(state, b) {
            state.checkmodule = b
        },
        setCheck(state, check) {
            state.check = check
        }
    },
    actions: {
        async getList({ state, commit }, page) {
            if (page.size) {
                commit('setSize', page.size)
            }
            const { data: { cont: count, findByPage: list } } = await api.findByPage(page.page, state.size)
            commit('setNowpage', page.page)
            commit('setState', list)
            commit('setTotalPage', Math.ceil(count / state.size));
        },
        async delStu({ state, dispatch }, sNo) {
            const value = await api.delStu(sNo);
            showToast({ msg: value.msg, type: value.status })
            let page = Math.ceil((state.count - 1) / state.size)
            if (page < state.totalPage) {
                page = state.nowPage - 1
            } else {
                page = state.nowPage
            }
            dispatch('getList', { page })
        },
        async checkList({ state, commit }, check) {
            try {
                commit('setCheck', check)
                const { data: { cont: count, searchList: list } } = await api.checkStu(check)
                commit('setCheckmodule', true)
                commit('setSize', check.size)
                commit('setNowpage', check.page)
                commit('setState', list)
                commit('setTotalPage', Math.ceil(count / state.size));
            } catch (error) {
                showToast({ msg: error, type: 'fail' })
            }
        },
    },
    namespaced: true
}