<template>
  <section class="footer">
    <a class="footer__logo" href="">
        <a href="https://commercejs.com" target="_blank" rel="noopener"><img src="/images/logo-white.svg" alt="Chec"></a>
    </a>
    <div class="footer__link">
        <a href="https://commercejs.com/">Privacy Policy</a>
    </div>
    <div class="footer__link">
        <a href="https://commercejs.com">Terms & Conditions</a>
    </div>
    <div class="footer__contact">
        <a href="mailto:hello@chec.io">hello@chec.io</a>
        | <a href="tel:1234">1-999-999-9999</a>
    </div>
    <div class="footer__disclaimer">
        Lorem ipsum dolor sit.
    </div>
  </section>
</template>

<style lang="scss">
.footer{
  @apply text-center py-40 text-white bg-grey-dark;
  &__logo{
    @apply mx-auto block w-24 mb-5;
    img{
        @apply w-full;
    }
  }
  &__link{
    @apply mb-5 text-sm;
  }
  &__contact{
    @apply mb-5 text-sm;
  }
  &__disclaimer{
    @apply mb-5 text-sm opacity-50;
  }
}
</style>
