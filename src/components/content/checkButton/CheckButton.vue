<template>
  <div class="check-button">
    <div class="check-box"
         :class="{check: isChecked}"
         >
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    width: 1.2rem;
  }
  .check-box{
    position: relative;
    border-radius: 50%;
    width: 1.1rem;
    height: 1.1rem;
    margin: 0 auto;
    text-align: center;
    top: calc(50% - 0.55rem);
    border: 0.1rem solid #aaa;
  }

  .check{
    background-color: red;
    border: 0.1rem solid red;
  }
</style>
