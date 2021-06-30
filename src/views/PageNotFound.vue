<template>
    <section class="page-not-found" style="background-image: url(/images/checkout_bg.png);">
        <div class="w-1/2">
            <h1 class="page-not-found__code">404</h1>
            <h3>holy guacamole!</h3>
            <p>Looks like this page doesnt exist.</p>
            <br><br>
            <p>
                Contact us by email at
                <a class="page-not-found__contact" :href="'mailto:' + merchant.support_email">
                    {{merchant.support_email}}
                </a>
            </p>
            <a href="/" class="btn-primary page-not-found__home">
                <span>Go Back</span>
            </a>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Error',
  props: ['merchant'],
};
</script>

<style lang="scss">
.page-not-found{
  @apply text-white h-screen text-center flex content-center
    justify-center items-center bg-local bg-center bg-no-repeat
    bg-cover;
    &__code{
        font-size: 10rem;
        line-height: 10rem;
    }
    &__home{
      @apply inline-block mt-8;
    }
    &__contact{
      @apply underline;
    }
}
</style>
