import { RouteRecordRaw } from 'vue-router'
import { Layout, ParentLayout } from '@/router/constant'
import { WalletOutlined } from '@vicons/antd'
import { renderIcon, renderNew } from '@/utils'

const routeName = 'comp'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/comp',
    name: routeName,
    component: Layout,
    redirect: '/comp/table',
    meta: {
      title: '组件示例',
      icon: renderIcon(WalletOutlined),
      sort: 8
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        redirect: '/comp/table/basic',
        component: ParentLayout,
        meta: {
          title: '表格'
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_table_basic`,
            meta: {
              title: '基础表格'
            },
            component: () => import('@/views/comp/table/basic.vue')
          },
          {
            path: 'editCell',
            name: `${routeName}_table_editCell`,
            meta: {
              title: '单元格编辑'
            },
            component: () => import('@/views/comp/table/editCell.vue')
          },
          {
            path: 'editRow',
            name: `${routeName}_table_editRow`,
            meta: {
              title: '整行编辑'
            },
            component: () => import('@/views/comp/table/editRow.vue')
          }
        ]
      },
      {
        path: 'form',
        name: `${routeName}_form`,
        redirect: '/comp/form/basic',
        component: ParentLayout,
        meta: {
          title: '表单'
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_form_basic`,
            meta: {
              title: '基础使用'
            },
            component: () => import('@/views/comp/form/basic.vue')
          },
          {
            path: 'useForm',
            name: `useForm`,
            meta: {
              title: 'useForm'
            },
            component: () => import('@/views/comp/form/useForm.vue')
          }
        ]
      },
      {
        path: 'upload',
        name: `${routeName}_upload`,
        meta: {
          title: '上传图片'
        },
        component: () => import('@/views/comp/upload/index.vue')
      },
      {
        path: 'modal',
        name: `${routeName}_modal`,
        meta: {
          title: '弹窗扩展'
        },
        component: () => import('@/views/comp/modal/index.vue')
      },
      {
        path: 'richtext',
        name: `richtext`,
        meta: {
          title: '富文本',
          extra: renderNew()
        },
        component: () => import('@/views/comp/richtext/vue-quill.vue')
      },
      {
        path: 'drag',
        name: `Drag`,
        meta: {
          title: '拖拽',
          extra: renderNew()
        },
        component: () => import('@/views/comp/drag/index.vue')
      },
      {
        path: 'basic-list',
        name: 'basic-list',
        meta: {
          title: '基础列表'
        },
        component: () => import('@/views/comp/basicList/index.vue')
      },
      {
        path: 'basic-info/:id?',
        name: 'basic-info',
        meta: {
          title: '基础详情',
          hidden: true,
          activeMenu: 'basic-list'
        },
        component: () => import('@/views/comp/basicList/info.vue')
      },
      {
        path: 'basic-form',
        name: 'form-basic-form',
        meta: {
          title: '基础表单'
        },
        component: () => import('@/views/comp/basicForm/index.vue')
      },
      {
        path: 'step-form',
        name: 'form-step-form',
        meta: {
          title: '分步表单'
        },
        component: () => import('@/views/comp/stepForm/stepForm.vue')
      },
      {
        path: 'detail',
        name: 'form-detail',
        meta: {
          title: '表单详情'
        },
        component: () => import('@/views/comp/detail/index.vue')
      }
    ]
  }
]

export default routes
