import { createWebHistory, createRouter } from 'vue-router';
import Login from "@/components/Login"
import NewAccount from "@/components/NewAccount";
import Monitor from "@/components/Monitor"

const routes= [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
      path:'/idCheck',
      name: 'idCheck'
    },
    {
        path: '/new-account',
        name: 'NewAccount',
        component: NewAccount
    },
    {
        path: '/notepad',
        name: 'notepad',
        component: Monitor
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;