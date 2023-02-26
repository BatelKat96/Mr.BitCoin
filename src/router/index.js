import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/home-page.vue'
import LoginSignUp from '../pages/login-signup.vue'
import ContactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'
import Statistics from '../pages/statistics.vue'

const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: LoginSignUp,
        },
        {
            path: '/home',
            component: HomePage,
        },
        {
            path: '/contact',
            component: ContactIndex,
        },
        {
            path: '/contact/:_id',
            component: ContactDetails,
        },
        {
            path: '/contact/edit/:_id?',
            component: ContactEdit,
        },
        {
            path: '/statistics',
            component: Statistics,
        },

        {
            path: '/about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../pages/about-page.vue'),
        },
    ],
}
const router = createRouter(routerOptions)

export default router
