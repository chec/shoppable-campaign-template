<template>
  <div class="shop-now" style="background-image: url(/images/checkout_bg.png);">
    <div>
      <h3>Visit the Shop</h3>
      <a href="https://commercejs.com" class="btn-primary">
        Learn more about Commerce.js
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  props: [],
};
</script>

<style lang="scss">
.shop-now{
  @apply pt-20 pb-24 text-white text-center flex content-center justify-center items-center
    bg-local bg-center bg-no-repeat bg-cover;
    .btn-primary{
        @apply mt-5 block;
    }
}
</style>
