<template>
  <div class="logo" :class="{ 'logo-center': collapsed }">
    <img src="~@/assets/images/logo.png" alt="" :class="{ 'mr-2': !collapsed }" />
    <h3 v-show="!collapsed" class="title">{{ project_title }}</h3>
  </div>
</template>

<script>
import { useGlobSetting } from '@/hooks/setting'
export default {
  name: 'Index',
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup() {
    const { project_title } = useGlobSetting()
    return {
      project_title
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 48px;
  line-height: 48px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.5s;

  &.logo-center {
    justify-content: center;
    padding-left: 0;
    transition: all 0.5s;
  }

  img {
    width: 32px;
    height: 32px;
  }

  .title {
    margin-bottom: 0;
  }

  h2 {
    font-weight: 700;
    font-size: 16px;
    transition: all 0.5s;
    line-height: normal;
  }
}
</style>
