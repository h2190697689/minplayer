import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Top from '../pages/top/Top'
import TopDetail from '../pages/top-detail/TopDetail'
import Singer from '../pages/singer/Singer'
import SingerDetail from '../pages/singer-detail/SingerDetail'
import PlayList from '../pages/play-list/PlayList'
import PlayDetail from '../pages/play-detail/PlayDetail'
import Album from '../pages/album/Album'
import AlbumDetail from '../pages/album-detail/AlbumDetail'
import Person from '../pages/person/Person'
import Recommend from '../pages/recommend/Recommend'
import Search from '../pages/search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/top',
      name: 'Top',
      component: Top
    },
    {
      path: '/top/:id',
      name: 'TopDetail',
      component: TopDetail
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singer/:id',
      name: 'SingerDetail',
      component: SingerDetail
    },
    {
      path: '/playList',
      name: 'PlayList',
      component: PlayList
    },
    {
      path: '/playList/:id',
      name: 'PlayDetail',
      component: PlayDetail
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/album/:id',
      name: 'AlbumDetail',
      component: AlbumDetail
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
