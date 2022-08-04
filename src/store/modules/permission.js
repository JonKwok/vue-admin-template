import { asyncRoutes, constantRoutes } from '@/router'
import { getMenus } from '@/api/user'
import Layout from '@/layout'

/**
 * 静态路由懒加载
 * @param view  格式必须为 xxx/xxx 开头不要加斜杠
 * @returns
 */
export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}.vue`], resolve)
}

/**
 * 把从后端查询的菜单数据拼装成路由格式的数据
 * @param routes
 * @param data 后端返回的菜单数据
 */
export function generateMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: item.url,
      component: item.component === '#' ? Layout : loadView(item.component),
      hidden: item.status === 0, // 状态为0的隐藏
      redirect: item.redirect,
      children: [],
      name: item.name,
      meta: item.meta
    }
    if (item.children) {
      generateMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
  return routes
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  currentRoutes: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_CURRENT_ROUTES: (state, routes) => {
    state.currentRoutes = routes
  }
}

const actions = {
  generateRoutes({ commit }, token) {
    return new Promise(resolve => {
      // 通过token从后端获取用户菜单，并加入全局状态
      getMenus().then(res => {
        console.log(res.data)
        const menuData = Object.assign([], res.data)
        const tempAsyncRoutes = Object.assign([], asyncRoutes)
        const accessedRoutes = generateMenu(tempAsyncRoutes, menuData)
        console.log('routes', accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
