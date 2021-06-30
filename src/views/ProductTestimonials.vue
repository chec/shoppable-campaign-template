<template>
  <div class="product-testimonials">
    <div class="container mx-auto">
      <div class="product-testimonials__header">
        <h2>Testimonials</h2>
        <div class="product-testimonials__navigation hidden lg:block">
          <div
            @click="previous"
            class="btn-arrow btn-arrow-left "
            style="background-image: url(images/arrow-left.svg);"
            ></div>
          <div
            @click="next"
            class="btn-arrow btn-arrow-right "
            style="background-image: url(images/arrow-right.svg);"
            ></div>
        </div>
      </div>
      <div class="product-testimonials__details-container">
        <div class="product-testimonials__details grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="mr-0 lg:mr-10 hidden lg:block">
            <p class="product-testimonials__quote">{{testimonials[0].testimonial}}</p>
            <div class="product-testimonials__breaker">
              <img src="images/breaker.png" alt="Line break">
            </div>
            <p class="product-testimonials__author">{{testimonials[0].author}}</p>
          </div>
          <div
            class="product-testimonials__image product-testimonials__image--active"
            :style="{ backgroundImage: `url('${testimonials[0].image}')` }"
          >
            <img :src="testimonials[0].image" :alt="testimonials[0].alt">
            <div class="product-testimonials__navigation block lg:hidden">
              <div
                @click="previous"
                class="btn-arrow btn-arrow-left "
                style="background-image: url(images/arrow-left.svg);"
                ></div>
              <div
                @click="next"
                class="btn-arrow btn-arrow-right "
                style="background-image: url(images/arrow-right.svg);"
                ></div>
            </div>
          </div>
          <div class="mr-0 lg:mr-10 block lg:hidden">
            <p class="product-testimonials__quote">{{testimonials[0].testimonial}}</p>
            <div class="product-testimonials__breaker">
              <img src="images/breaker.png" alt="Line break">
            </div>
            <p class="product-testimonials__author">{{testimonials[0].author}}</p>
          </div>
          <div
            @click="next"
            class="product-testimonials__image product-testimonials__image--next hidden lg:block"
            :style="{ backgroundImage: `url('${testimonials[1].image}')` }"
          >
            <img :src="testimonials[1].image" :alt="`${testimonials[1].author}'s image`">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTestimonials',
  data() {
    return {
      testimonials: [
        {
          image: '/images/testimonial1.jpg',
          alt: 'Alt image text.',
          testimonial: "orem ipsum dolor sit amet, consectetur adipiscing elit. Donec at convallis velit, ut ultrices tellus. Fusce ut purus quam. Ut fringilla felis massa, vitae scelerisque lorem malesuada at.  😇",
          author: 'John Smith',
        },
        {
          image: '/images/testimonial2.jpg',
          alt: 'Alt image text.',
          testimonial: 'Fusce dictum vehicula orci sit amet rutrum. Proin tincidunt lorem a mi tincidunt iaculis. Curabitur id ex eget sapien euismod imperdiet et.',
          author: 'Danielle',
        },
        {
          image: '/images/testimonial3.jpg',
          alt: 'Alt image text.',
          testimonial: 'Etiam ex enim, rutrum a velit quis, vulputate pretium turpis. Phasellus malesuada, dui in consectetur suscipit, nulla nisl dapibus nulla. 💯',
          author: 'Frevi Jan',
        },
      ],
    };
  },
  methods: {
    next() {
      const first = this.testimonials.shift();
      this.testimonials = this.testimonials.concat(first);
    },
    previous() {
      const last = this.testimonials.pop();
      this.testimonials = [last].concat(this.testimonials);
    },
  },
};
</script>

<style lang="scss">
  .product-testimonials{
    @apply bg-grey text-white p-20;
    @media (max-width: 768px) {
      @apply text-center relative  p-10;
    }
    @media (max-width: 640px) {
      min-height: 737px
    }
    &__header{
      @apply mt-4 mb-10 flex justify-between;
      @media (max-width: 768px) {
        @apply block;
      }
    }
    &__navigation{
      .btn-arrow{
        @apply my-6 mx-2 cursor-pointer bg-no-repeat bg-center bg-auto inline-block;
        width:  21px;
        height:  33px;
        @media (max-width: 768px) {
          @apply absolute;
          bottom:0px;
          top:0px;
          height: 100%;
          &.btn-arrow-left{
            left:-35px;
            @apply m-0;
          }
          &.btn-arrow-right{
            right: -35px;
            @apply m-0;
          }
        }
      }
    }
    &__details-container{
      @apply relative;
    }
    &__quote{
      @apply text-xl;
      @media (max-width: 768px) {
        @apply text-lg;
      }
    }
    &__breaker{
      @apply mb-1 mt-8;
      @media (max-width: 768px) {
        @apply mb-4 mt-4;
        img{
          margin: 0 auto;
        }
      }
    }
    &__author{
      @apply text-lg uppercase font-bold;
    }
    &__image{
      @apply border-4 border-black max-h-portrait bg-cover;
      @media (max-width: 640px) {
        height: 295px !important;
        width: auto !important;
      }
      @media (max-width: 768px) {
        height: 400px;
        width: 400px;
        margin:: 0 auto;
      }
      img{
        @apply opacity-0;
        margin-top:-5px;
      }
      &.product-testimonials__image--active{
        @apply relative;
      }
      &.product-testimonials__image--next{
        opacity: 0.4;
      }
    }
  }
</style>
