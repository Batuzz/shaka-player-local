import Vue from 'vue'
import VueRouter from 'vue-router'
import VideoPlayer from "@/views/VideoPlayer";

Vue.use(VueRouter);

const routes = [
  {
    path: '/play',
    name: 'play',
    component: VideoPlayer,
  },
  {
    path: '*',
    redirect: {
      name: 'play'
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


export default router
