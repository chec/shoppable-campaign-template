<template>
  <div class="cart-item grid grid-cols-2">
    <div class="cart-item__product-name">{{item.product_name}}</div>
    <div class="cart-item__product-price">
      {{item.line_total.formatted_with_symbol}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['item'],
  data() {
    return {
      cartVisible: false,
    };
  },
};
</script>

<style lang="scss">
  .cart-item{
    @apply mb-3;
    &__product-name{

    }
    &__product-price{
      @apply text-right;
    }
  }
</style>
