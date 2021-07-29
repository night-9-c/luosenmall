<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  box-shadow: 0 0.05rem 0.05rem rgba(100, 100, 100, .1);
}

.left, .right {
  width: 3rem;
  /*background-color: red;*/
}

.center {
  flex: 1;
  /*background-color: blue;*/
}
</style>
