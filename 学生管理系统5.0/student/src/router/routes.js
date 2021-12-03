import NotFound from '../views/NotFound'
import stulist from '@/views/main/stulist'
import statistics from '../views/main/statistics'

export default [
    {
        name: "Main",
        path: "/main",
        component: () => import("@/views/main"),
        children: [
            {
                name: "stulist",
                path: 'stulist',
                component: stulist,
            },
            {
                name: "statistics",
                path: 'statistics',
                component: statistics,
            },
        ]
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/login")
    },
    {
        name: "Logon",
        path: "/logon",
        component: () => import("@/views/logon")
    },
    {
        name: "NotFound",
        path: "/notFound",
        component: NotFound
    }
]