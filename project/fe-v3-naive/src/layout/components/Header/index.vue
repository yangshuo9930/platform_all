<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <div class="layout-header-left" v-if="isShow">
      <div class="logo" v-if="navMode === 'horizontal'">
        <img src="~@/assets/images/logo.png" alt="" />
        <h2 class="title hidden sm:block" v-show="!collapsed">{{ project_title }}</h2>
      </div>
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
        :inverted="getInverted"
        mode="horizontal"
        class="menu-fixed-width"
      />
    </div>

    <!--左侧菜单-->
    <div class="layout-header-left" v-else>
      <!-- 菜单收起 -->
      <div class="ml-1 layout-header-trigger layout-header-trigger-min" @click="changeCollapsed">
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        v-if="headerSetting.isReload"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                  :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>

    <!-- 右侧 -->
    <div class="layout-header-right">
      <div
        class="layout-header-trigger layout-header-trigger-min"
        v-for="item in iconList"
        :key="item.icon.name"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round>
              {{ account }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <div
        class="layout-header-trigger layout-header-trigger-min !hidden sm:!block"
        @click="openSetting"
      >
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <!-- 锁定屏幕弹窗 -->
  <BasicModal @register="modalRegister" ref="modalRef" @on-ok="okModal">
    <template #default>
      <BasicForm @register="formRegister" class="layout_header-basicForm">
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </BasicForm>
    </template>
  </BasicModal>
  <!--项目配置-->
  <ProjectSetting ref="drawerSetting" />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  computed,
  unref,
  onMounted,
  onUnmounted,
  nextTick
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import components from './components'
import { NDialogProvider, useDialog, useMessage } from 'naive-ui'
import { TABS_ROUTES } from '@monorepo/config/fe-v3-naive/cacheSetting'
import { useUserStore } from '@/store/modules/user'
import { useLockscreenStore } from '@/store/modules/lockscreen'
import ProjectSetting from './ProjectSetting.vue'
import { AsideMenu } from '@/layout/components/Menu'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { useGlobSetting } from '@/hooks/setting/index'
import BasicModal, { TypeBasicModal, useModal } from '@/components/Modal'
import BasicForm, { TypeBasicForm, FormSchema, useForm } from '@/components/Form/index'

export default defineComponent({
  name: 'PageHeader',
  components: { ...components, NDialogProvider, ProjectSetting, AsideMenu, BasicModal, BasicForm },
  props: {
    collapsed: {
      type: Boolean
    },
    inverted: {
      type: Boolean
    }
  },
  emits: ['update:collapsed'],
  setup(props, { emit }) {
    const { project_title } = useGlobSetting()
    const userStore = useUserStore()
    const useLockscreen = useLockscreenStore()
    const message = useMessage()
    const dialog = useDialog()
    const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
      useProjectSetting()

    const {
      username,
      info: { account }
    } = userStore || {}

    const drawerSetting = ref()

    const state = reactive({
      username: username || '',
      account: account,
      fullscreenIcon: 'FullscreenOutlined',
      navMode: getNavMode,
      navTheme: getNavTheme,
      headerSetting: getHeaderSetting,
      crumbsSetting: getCrumbsSetting
    })

    const getInverted = computed(() => {
      const navTheme = unref(getNavTheme)
      return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted
    })

    const mixMenu = computed(() => {
      return unref(getMenuSetting).mixMenu
    })

    const getChangeStyle = computed(() => {
      const { collapsed } = props
      const { minMenuWidth, menuWidth }: any = unref(getMenuSetting)
      return {
        left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
        width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`
      }
    })

    const getMenuLocation = computed(() => {
      return 'header'
    })

    const router = useRouter()
    const route = useRoute()

    const generator: any = (routerMap) => {
      return routerMap.map((item) => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name,
          disabled: item.path === '/'
        }
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
          // Recursion
          currentMenu.children = generator(item.children, currentMenu)
        }
        return currentMenu
      })
    }

    const breadcrumbList = computed(() => {
      return generator(route.matched)
    })

    const dropdownSelect = (key) => {
      router.push({ name: key })
    }

    // 刷新页面
    const reloadPage = () => {
      router.push({
        path: '/redirect' + unref(route).fullPath
      })
    }

    // 退出登录
    const doLogout = () => {
      dialog.info({
        title: '提示',
        content: '您确定要退出登录吗',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          userStore.logout().then(() => {
            message.success('成功退出登录')
            // 移除标签页
            localStorage.removeItem(TABS_ROUTES)
            router
              .replace({
                name: 'Login',
                query: {
                  redirect: route.fullPath
                }
              })
              .finally(() => location.reload())
          })
        },
        onNegativeClick: () => {}
      })
    }

    // 切换全屏图标
    const toggleFullscreenIcon = () =>
      (state.fullscreenIcon =
        document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined')

    // 监听全屏切换事件
    document.addEventListener('fullscreenchange', toggleFullscreenIcon)

    // 全屏切换
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }

    // 图标列表
    const iconList = [
      // {
      //   icon: 'SearchOutlined',
      //   tips: '搜索'
      // },
      // {
      //   icon: 'GithubOutlined',
      //   tips: 'github',
      //   eventObject: {
      //     click: () => window.open('https://github.com/jekip/naive-ui-admin')
      //   }
      // },
      {
        icon: 'LockOutlined',
        tips: '锁屏',
        eventObject: {
          click: () => openModal() //useLockscreen.setLock(true)
        }
      }
    ]
    const avatarOptions = [
      {
        label: '个人设置',
        key: 1
      },
      {
        label: '退出登录',
        key: 2
      }
    ]

    //头像下拉菜单
    const avatarSelect = (key) => {
      switch (key) {
        case 1:
          router.push({ name: 'Setting' })
          break
        case 2:
          doLogout()
          break
      }
    }

    function openSetting() {
      const { openDrawer } = drawerSetting.value
      openDrawer()
    }

    // fix-emit写在模板中, 模板结构显示问题
    const changeCollapsed = () => emit('update:collapsed', !props.collapsed)

    // 显示上部logo菜单
    const isShow = computed(() => {
      return state.navMode === 'horizontal' || (state.navMode === 'horizontal-mix' && mixMenu)
    })

    // 动态计算菜单宽度

    let menuWidth = ref('1000px')

    const computedWidth = () => {
      if (isShow.value) {
        const fw = document.body.clientWidth
        const lw = document.querySelector('.layout-header-left .logo')?.clientWidth || 0
        const rw = document.querySelector('.layout-header-right')?.clientWidth || 0
        menuWidth.value = fw - rw - lw + 'px'
      }
    }

    onMounted(() => {
      computedWidth()
      window.addEventListener('resize', computedWidth)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', computedWidth)
    })

    // 锁屏功能
    const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
      title: '锁定屏幕'
    })

    const schemas: FormSchema[] = [
      {
        field: 'lockPassword',
        component: 'NInput',
        label: '锁屏密码',
        giProps: {
          span: 1,
          offset: 0
        },
        componentProps: {
          placeholder: '请输入锁屏密码',
          size: 'small',
          onInput: () => {
            // console.log(e)
          },
          autofocus: true
        },
        rules: [{ required: true, message: '请输入锁屏密码', trigger: ['blur'] }]
      }
    ]

    const [formRegister, { validate, getFieldsValue }] = useForm({
      gridProps: { cols: 1 },
      labelWidth: 80,
      layout: 'horizontal',
      size: 'small',
      showActionButtonGroup: false,
      schemas
    })

    const modalRef = ref<null | TypeBasicModal>(null)

    const okModal = async () => {
      validate()
        .then(() => {
          const pwd = getFieldsValue().lockPassword
          useLockscreen.setLockPassword(pwd)
          closeModal()
          document.documentElement.requestFullscreen()
          useLockscreen.setLock(true)
        })
        .finally(() => {
          setSubLoading(false)
        })
    }

    return {
      ...toRefs(state),
      iconList,
      toggleFullScreen,
      doLogout,
      route,
      dropdownSelect,
      avatarOptions,
      getChangeStyle,
      avatarSelect,
      breadcrumbList,
      reloadPage,
      drawerSetting,
      openSetting,
      getInverted,
      getMenuLocation,
      mixMenu,
      changeCollapsed,
      project_title,
      isShow,
      menuWidth,
      modalRegister,
      formRegister,
      modalRef,
      okModal,
      openModal
    }
  }
})
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 0;
  height: @header-height;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 48px;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;
    width: 100%;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      // width: 100%;
      line-height: 48px;
      // overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 48px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 48px;
    height: 48px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}
:deep(.n-menu-item-content-header) {
  overflow: visible !important;
}

.menu-fixed-width {
  width: v-bind(menuWidth);
  // overflow-x: scroll;
}
</style>
