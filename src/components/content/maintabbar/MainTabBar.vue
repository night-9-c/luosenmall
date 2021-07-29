<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <i slot="item-icon" class="iconfont">&#xe604;</i>
      <i slot="item-icon-active" class="iconfont" style="color: blue">&#xe606;</i>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <i slot="item-icon" class="iconfont">&#xe605;</i>
      <i slot="item-icon-active" class="iconfont" style="color: blue">&#xe607;</i>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="blue">
      <i slot="item-icon" class="iconfont">&#xe600;</i>
      <i slot="item-icon-active" class="iconfont" style="color: blue">&#xe603;</i>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <i slot="item-icon" class="iconfont">&#xe870;</i>
      <i slot="item-icon-active" class="iconfont" style="color: blue">&#xe602;</i>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
