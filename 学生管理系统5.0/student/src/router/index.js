import VueRouter from 'vue-router'
import routes from './routes'
import Vue from 'vue'
import cookie from '../utils/cookie'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        const user = cookie.getCookie("username")
        if (user) {
            next('/main/stulist')
        } else {
            next('/login')
        }
        return
    }
    if (to.matched[0].path === '/main') {
        const user = cookie.getCookie("username")
        if (user) {
            next()
        } else {
            next('/login')
        }
        return
    }
    if (to.matched.length === 0) {
        next('/notFound');
        return;
    }
    next()
})


window.router = router
export default router