<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper
      class="top-swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator
          class="swiper-content"
          :url="`/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`"
        >
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类 -->
    <view class="nav-list">
      <view
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="navClickHandler(item)"
      >
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层 -->

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧 1 个大图 -->
          <view class="left-img-box">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
              @click="pushProductList(item.product_list[0])"
            ></image>
          </view>

          <!-- 右侧 4 个小图 -->
          <view class="right-img-box">
            <block v-for="(product, idx) in item.product_list" :key="idx">
              <view class="right-img-item" v-if="idx !== 0">
                <image
                  :src="product.image_src"
                  :style="{ width: product.image_width + 'rpx' }"
                  mode="widthFix"
                  @click="pushProductList(product)"
                ></image>
              </view>
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: [],
    }
  },
  async created() {
    // 2. 在页面刚加载的时候，调用获取轮播图数据的方法
    this.getSwiperList()
    this.getNavList()
    this.findFloorList()
  },

  methods: {
    // 3. 获取轮播图数据的方法
    async getSwiperList() {
      // 发送请求
      const { meta, message } = await this.$http.get('/home/swiperdata')

      // 请求成功后将数据更新到 data 中
      this.swiperList = message
    },

    // 3. 获取分类导航数据的方法
    async getNavList() {
      const { meta, message } = await this.$http.get('/home/catitems')

      this.navList = message
    },
    //
    navClickHandler(item) {
      console.log('uni', uni)
      if (item.name === '分类') {
        // 跳转到一个tab页需要使用switchTab方法
        uni.switchTab({
          url: '/pages/cart/cart',
        })
      }
    },

    // 获取楼层数据
    async findFloorList() {
      const { meta, message } = await this.$http.get('/home/floorData')
      this.floorList = message
    },

    //
    pushProductList(val) {
      console.log(val)
      uni.navigateTo({
        url: val.navigator_url.replace(
          '/pages/goods_list',
          '/pages_sub1/product-list/product-list',
        ),
      })
    },
  },
}
</script>

<style lang="scss">
.top-swiper {
  height: 330rpx;

  .swiper-content,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  display: flex;
  width: 100%;
  height: 60rpx;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>
