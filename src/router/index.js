import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        component: require("@/views/Home").default
    },
    {
        path: '/about',
        component: require("@/views/About").default
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;