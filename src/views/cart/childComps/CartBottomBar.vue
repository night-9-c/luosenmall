<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectorAll"
        class="check-button"
        @click.native="checkClickAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{ totalPrice }}
    </div>

    <div class="calculate" @click="calcClick">
      去结算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        let newPrice = item.price.substring(1)
        return preValue + newPrice * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isSelectorAll() {
      if (this.cartList.length === 0) {
        return false
      } else {
        return this.cartList.every(item => item.checked)
      }
    }
  },
  methods: {
    checkClickAll() {
      if (this.isSelectorAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }

      // this.cartList.forEach(item => item.checked = !this.isSelectorAll)
    },
    calcClick() {
      if (!this.isSelectorAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #aaa;
  font-size: 0.7rem;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  width: 80px;
}

.check-button {
  line-height: 1rem;
  margin-right: 0.25rem;
}

.price {
  margin-left: 1rem;
  flex: 1;
}

.calculate {
  width: 4.5rem;
  text-align: center;
  background-color: red;
  color: white;
}
</style>
