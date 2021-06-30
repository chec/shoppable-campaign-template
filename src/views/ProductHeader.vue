<template>
  <div
    class="page-header">
    <div class="content-wrapper"
    :style="{ backgroundImage: `url('${mainProduct.assets[0].url}')` }">
      <div class="page-header_logo mx-auto">
        <a href="https://commercejs.com" target="_blank" rel="noopener"><img src="/images/logo.svg" alt="logo" border="0"></a>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-2 container mx-auto">
        <div class="page-header__copy">
          <h1>Shoppable campaign</h1>
          <p class="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at convallis velit, ut ultrices tellus. Fusce ut purus quam.</p>
          <button
            class="btn-secondary"
            href="#productInfo"
            v-smooth-scroll="{ duration: 1000, updateHistory: false }"
          >
            Shop Bundle
          </button>
        </div>
        <div class="page-header__image">
          <img :src="mainProduct.assets[0].url" alt="Image alt text">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductHeader',
  props: ['products'],
  computed: {
    mainProduct() {
      return this.products.find((product) => product.id === process.env.VUE_APP_PRODUCT_ID);
    },
  },
};
</script>

<style lang="scss">
  .page-header{
    @apply w-full bg-grey-dark px-10 bg-no-repeat	bg-center bg-cover;

    background-image: url('/images/header_bg.png');
    height:870px;
    @media (max-width: 1080px) {
    @apply h-auto pb-20;
  }

    .content-wrapper{
      height: 100%;
      background-size: 450px auto;
      background-position: right -40px center;
      background-repeat:no-repeat;
    }
    &_logo{
      @apply pt-8 pb-10 flex justify-center;
      @media (max-width: 1080px) {
        @apply pt-8 pb-8;
      }
    }
    &__copy{
      padding-top: 6.8rem;
      max-width: 550px;
      @media (max-width: 1080px) {
        @apply p-0;
        max-width: 9999px;
        padding-top: 24rem;
        text-align: center;
      }
      @media (max-width: 640px) {
        padding-top: 14rem;
      }
      .btn-secondary{
        @apply mt-12;
      }
    }
    &__image{
      //Will be used for mobile
      @apply hidden;
    }
  }
</style>
