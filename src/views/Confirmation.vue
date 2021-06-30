<template>
  <div class="confirmation" style="background-image: url(/images/checkout_bg.png);">
    <div>
      <h1>Thank you!</h1>
      <h3>Your order has been received</h3>
      <br>
      <p>
        Contact us by email at
        <a
          class="confirmation__contact"
          :href="'mailto:' + merchant.support_email"
        >{{merchant.support_email}}</a>
      </p>
      <a href="https://https://commercejs.com/" class="btn-primary confirmation__home">
        Leran more about Chec.
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirmation',
  props: ['orderRef', 'merchant'],
};
</script>

<style lang="scss">
.confirmation{
  @apply text-white h-screen text-center flex content-center justify-center items-center
    bg-local bg-center bg-no-repeat bg-cover;
    &__home{
      @apply inline-block mt-8;
    }
    &__contact{
      @apply underline;
    }
}
</style>
