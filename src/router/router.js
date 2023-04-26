import {createRouter, createWebHashHistory} from "vue-router";
import MyLogin from "@/components/Login/MyLogin.vue";
import MyHome from "@/components/Home/MyHome.vue";
import MenuMain from "@/components/Menu/MenuMain.vue";
import MenuUser from "@/components/Menu/MenuUser.vue";
import MenuSinger from "@/components/Menu/MenuSinger.vue";
import MenuSong from "@/components/Menu/MenuSong.vue";
import MyEmpty from "@/components/Common/MyEmpty.vue";

const routes = [
    {path: '/', redirect: '/MyLogin'},
    {path: '/MyLogin', component: MyLogin},
    {
        path: '/MyHome', component: MyHome, redirect: '/MyHome/MenuMain', children: [
            {path: 'MenuMain', component: MenuMain},
            {path: 'MenuUser', component: MenuUser},
            {path: 'MenuSinger', component: MenuSinger},
            {path: 'MenuSong', component: MenuSong},
        ]
    },
    {path:'/MyEmpty',component:MyEmpty},


]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
