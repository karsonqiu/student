import Vuex from "vuex";
import Vue from "vue";
import listStore from './listStore'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: { listStore }
})

export default store