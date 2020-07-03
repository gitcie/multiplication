export default [
    {
        path: '/',
        redirect: '/multi'
    },

    {
        path: '/multi',
        component: () => import('@p/calc/multiplication.vue')
    }
]