<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{ height: wh + 'px' }">
        <view
          class="left-scroll-view-item"
          :class="{ active: isActive === item.cat_id }"
          v-for="item in categoryList"
          :key="item.cat_id"
          @click="isActive = item.cat_id"
          >{{ item.cat_name }}</view
        >
      </scroll-view>

      <!-- 右侧的滚动区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{ height: wh + 'px' }">
        <view class="cate-lv2" v-for="item in twoList" :key="item.cat_id">
          <view class="cate-lv2-title">{{ item.cat_name }}</view>
          <view
            class="cate-lv3-item"
            v-for="(lv3, index3) in item.children"
            :key="index3"
            @click="gotoProductList(lv3)"
          >
            <image :src="lv3.cat_icon"></image>
            <text>{{ lv3.cat_name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Category',
  components: {},
  data() {
    return {
      wh: 0,
      isActive: 1,
      categoryList: [],
    }
  },

  created() {
    // 动态获取窗口可用高度，以便让页面中的左右两块滚动区域的高度撑满屏幕
    // 1. 获取当前系统信息
    const sysInfo = uni.getSystemInfoSync()
    console.log('系统信息', sysInfo)

    uni.setStorageSync('name', 'xiaowang')

    console.log(uni.getStorageSync('name'))

    // 2. 从系统信息中获取窗口可用高度并赋值给 wh
    // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度
    this.wh = sysInfo.windowHeight

    this.findCategoryList()
  },
  computed: {
    twoList() {
      return this.categoryList.filter((item) => item.cat_id === this.isActive)[0].children
    },
  },

  methods: {
    async findCategoryList() {
      const { message } = await this.$http.get('/categories')

      this.categoryList = message
      console.log(message)
    },

    gotoProductList(category) {
      uni.navigateTo({
        url: `/pages_sub1/product-list/product-list?cid=${category.cat_id}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 240rpx;

    .left-scroll-view-item {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 24rpx;
  font-weight: bold;
  text-align: center;
  padding: 30rpx 0;
}

.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 120rpx;
      height: 120rpx;
    }

    text {
      font-size: 24rpx;
    }
  }
}
</style>
