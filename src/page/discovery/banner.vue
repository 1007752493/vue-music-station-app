<template>
  <!-- <el-carousel :interval="4000"
               class="banner-carousel"
               type="card">
    <el-carousel-item :key="banner.scm"
                      v-for="banner in banners">
      <img :src="$utils.genImgUrl(banner.imageUrl, 1000, 400)"
           class="banner-img" />
    </el-carousel-item>
  </el-carousel> -->
  <swiper :interval="3000"
          class="banner-carousel"
          type="card">
    <swiper-item :key="banner.scm"
                 v-for="banner in banners">
      <img :src="$utils.genImgUrl(banner.imageUrl, 1500, 600)"
           class="banner-img" />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'
import { getBanner } from "../../api"
export default {
  components: { Swiper, SwiperItem },
  async created () {
    const { banners } = await getBanner()
    this.banners = banners
  },
  data () {
    return {
      banners: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.banner-carousel {
  padding-top: 5px;
  /deep/.el-carousel__container {
    height: 200px;
  }

  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
