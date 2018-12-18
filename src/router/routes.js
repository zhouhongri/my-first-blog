import blogRoutes from './blog-routes'

/**
 * 路由表配置
 */
export default [
  {
    name: 'BlogViews',
    path: '/',
    component: resolve => require.ensure([], () => resolve(require('@/components/BlogViews.vue')), 'BlogViews'),
    redirect: '/Blog',
    children: [
      {
        name: 'AboutMe',
        path: '/AboutMe',
        component: resolve => require.ensure([], () => resolve(require('@/views/AboutMe.vue')), 'AboutMe')
      },
      {
        name: 'WebNav',
        path: '/WebNav',
        component: resolve => require.ensure([], () => resolve(require('@/views/WebNav.vue')), 'WebNav')
      },
      {
        path: '/Blog',
        component: resolve => require.ensure([], () => resolve(require('@/views/Blog.vue')), 'Blog'),
        children: blogRoutes
      },
    ]
  },
  {
    name: 'Login',
    path: '/Login',
    component: resolve => require.ensure([], () => resolve(require('@/views/Login.vue')), 'Login'),
  },
  {
    name: 'Home',
    path: '/Home',
    component: resolve => require.ensure([], () => resolve(require('@/components/common/Home.vue')), 'Home'),
    redirect: '/baseForm',
    children: [
      {
        name: 'baseForm',
        path: '/baseForm',
        component: resolve => require.ensure([], () => resolve(require('@/views/BaseForm.vue')), 'baseForm'),
      }
    ]
  }
]
