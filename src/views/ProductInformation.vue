<template>
  <div class="product-information" id="productInfo">
    <div class="product-information__header container mx-auto">
      <h2>Lorem ipsum dolor sit</h2>
      <p>Sed et magna vitae nisi tincidunt posuere. Nulla convallis ac magna et tristique.</p>
      <div>
        <div class="product-information__mrsp">
          $56
        </div>
        <div class="product-information__cost">
          ${{ mainProduct.price.raw }}
        </div>
      </div>
    </div>
    <div class="product-information__listing grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 container mx-auto ">
      <div :class="{'md:col-span-1 lg:col-span-1': index === 2}" v-for="(product, index) in filteredItems" :key="index">
        <img :class="{'md:mx-auto md:my-0 lg:m-auto': index === 2}" :src="product.assets.length ? product.assets[0].url : ''" :alt="product.name">
        <h3>{{product.name}}</h3>
        <div class="lg:px-16" v-html="product.description"></div>
      </div>
    </div>
    <div class="product-information__cta">
      <button
        class="btn-primary"
        v-if="$stripe"
        href="#productCheckout"
        v-smooth-scroll="{ duration: 1000, updateHistory: false }"
      >
       Checkout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInformation',
  props: ['products', 'filteredItems'],
  computed: {
    mainProduct() {
      return this.products.find((product) => product.id === process.env.VUE_APP_PRODUCT_ID);
    },
  },
};
</script>

<style lang="scss">
  .product-information{
    @apply p-20;

    background-image: linear-gradient(80deg, rgb(241, 246, 252), rgb(248, 250, 253));
    @media (max-width: 640px) {
      @apply p-10;
    }
    &__header{
      @apply text-center;
    }
    &__listing{
      @apply text-center;
      li{
        @apply text-lg pb-3;
        @media (max-width: 768px) {
          @apply text-base;
        }
      }
      img{
        @apply mb-5
      }
    }
    &__mrsp{
      @apply line-through;
    }
    &__cost{
      @apply text-4xl pb-10;
    }
    &__cta{
      @apply text-center pt-10;
    }
    img{
      @apply border-4 border-black
    }
  }
</style>
