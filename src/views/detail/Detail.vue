<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
<!--      <ul style="width: 100%; z-index: 10">-->
<!--        <li v-for="item in $store.state.cartList">-->
<!--          {{item}}-->
<!--        </li>-->
<!--      </ul>-->
      <detail-swiper :top-image="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @loadImgEvent="imageLoad"/>
      <detail-params-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comments-info="commentsInfo" ref="comments"/>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
<!--    <toast :message="message" :show="show"/>-->
<!--    <back-top @click.native="backClick" v-show="isShowBackTop"/>-->
  </div>

</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";
import BackTop from "components/content/backTop/BackTop";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {debounce} from "common/utils";
import {itemListenerMixin,backTopMixin} from "common/mixin";

import {mapActions} from 'vuex'


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentsInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex:0,
      // message:'',
      // show:false
    }
  },
  created() {
    //保存传入的id
    this.iid = this.$route.params.iid

    //根据id请求数据
    getDetail(this.iid).then(res => {
      //获取图片轮播数据
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //创建店铺消息
      this.shop = new Shop(data.shopInfo);

      //保存商品详细数据
      this.detailInfo = data.detailInfo

      //获取商品的参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //获取评论
      if (data.rate.cRate != 0) {
        this.commentsInfo = data.rate.list[0];
      }

      //获取值不对
      // this.$nextTick(() => {
      //   //根据最新的效据,对应的DOM是已经被渲染出来
      //   //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片).
      //   // offsetTop值不对的时候,都是因为图片的问题
      //
      //   this.themeTopYs = []
      //
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
    })

    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })


  },
  mixin: [itemListenerMixin,backTopMixin],
  mounted() {
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    }, 100)
    // console.log(this.getThemeTopYs())
  },
  updated() {
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // console.log('------')
      this.newRefresh()
      this.getThemeTopYs()

    },
    titleClick(index) {
      // console.log(this.themeTopYs[index])
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      // console.log(position);
      //获取y值
      const positionY = -position.y

      // this.listenBackTop(position)
    },
    addToCart(){
      // console.log('-----')
      //获取购物车展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

      //把商品添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      this.addCart(product).then(res=>{
        // this.show =true;
        // this.message = res;
        // setTimeout(()=>{
        //   this.show =false;
        //   this.message = '';
        // },1500)

        this.$toast.show(res)
      })
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res)
      // })

      //添加购物车成功
    }

  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 93px);
}
</style>
