<template>
  <div class="product-landing"
    v-if="products.length > 0"
  >
    <ProductHeader
      :products="products"
    />
    <ProductInformation
      :products="products"
      :filtered-items="filteredItems"
    />
    <ProductTestimonials/>
    <Checkout
      v-if="cart.total_items !== 0 && $stripe"
      :cart="cart"
      :location="location"
      :checkout-token="checkoutToken"
      :merchant="merchant"
    />
    <ShopNow v-else />
  </div>
</template>

<script>
import axios from 'axios';
import Checkout from './Checkout.vue';
import ProductHeader from './ProductHeader.vue';
import ProductInformation from './ProductInformation.vue';
import ProductTestimonials from './ProductTestimonials.vue';
import ShopNow from './ShopNow.vue';

export default {
  name: 'ProductLanding',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    merchant: {
      type: Object,
      default: () => [],
    },
    location: {
      type: Object,
      default: () => [],
    },
    cart: {
      default: () => [],
    },
    checkoutToken: {
      type: String,
    },
  },
  data() {
    return {
      selectedCategory: '',
    };
  },
  components: {
    Checkout,
    ProductHeader,
    ProductInformation,
    ProductTestimonials,
    ShopNow,
  },
  computed: {
    filteredItems() {
      return this.products.filter((product) => product.id !== process.env.VUE_APP_PRODUCT_ID);
    },
  },
};
</script>

<style lang="scss">
  .product-landing{
    min-height:100vh;
  }
</style>
