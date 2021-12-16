const routes=[
    {path:'/',component:home},
    {path:'/home',component:home},
    {path:'/calendario',component:calendario},
    {path:'/account',component:account},
    {path:'/ricerca',component:ricerca},
    {path:'/impostazioni',component:impostazioni}
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')
