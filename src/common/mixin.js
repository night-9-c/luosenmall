import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

    //对监听事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入其中的内容')
  }
}

export const backTopMixin ={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{

    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
