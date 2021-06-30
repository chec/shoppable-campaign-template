<template>
  <div id="app">
    <transition name="fade">
        <div class="main-loader" v-if="isLoading"></div>
    </transition>
    <router-view
      :products="products"
      :merchant="merchant"
      :cart="cart"
      :location="location"
      :checkout-token="checkoutToken"
      :orderRef="orderRef"
    />
    <GlobalFooter/>
  </div>
</template>
<script>
import axios from 'axios';
import GlobalFooter from './views/GlobalFooter.vue';

export default {
  name: 'app',
  components: {
    GlobalFooter,
  },
  data() {
    return {
      isLoading: true,
      merchant: {
        business_name: 'Loading...',
      },
      products: [],
      cart: [],
      orderRef: null,
      location: {
        country: null,
        county_state: null,
      },
      checkoutToken: null,
    };
  },
  created() {
    document.body.classList.add("isLoading");
    this.getProducts();
    this.getMerchantInformation();
    this.getCart();
    this.findLocation();

    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    prepopulateCart() {
      if (this.cart.total_items === 0) {
        this.$commerce.cart.add(
          process.env.VUE_APP_PRODUCT_ID,
          1,
          null,
        ).then((result) => {
          this.cart = result.cart;
        }).catch((error) => {
          console.error(`Add to Cart Error: ${error.message}`);
        });
      }
    },
    generateToken() {
      this.$commerce.checkout.generateToken(
        this.cart.id,
        { type: 'cart' },
      ).then((result) => {
        this.checkoutToken = result.id;
      }).catch((error) => {
        this.message.copy = 'An error occurred with your cart';
        console.log(error);
      });
    },
    getProducts() {
      this.$commerce.products.list().then((result) => {
        this.products = result.data.map((product) => product);
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    findLocation() {
        axios.get('https://api.ipstack.com/check?access_key=98d300c4a16de9a520b8c17197d0893e&format=1').then((response) => {
            if (response.data.country_code === 'US' || response.data.country_code === 'CA') {
                this.location.country = response.data.country_code
                this.location.county_state = response.data.region_code
            } else {
                this.location.country = 'US';
            }
        });
    },
    getMerchantInformation() {
      this.$commerce.merchants.about().then((result) => {
        this.merchant = result;
        document.title = `Shoppable campaign - ${this.merchant.business_name}`;
      }).catch((error) => {
        console.error(`Merchant Error: ${error.message}`);
      });
    },
    getCart() {
      this.$commerce.cart.retrieve().then((result) => {
        this.cart = result;
        this.prepopulateCart();
        this.generateToken();
        this.isLoading = false;
        document.body.classList.remove("isLoading");
      }).catch((error) => {
        console.error(`Cart Error: ${error.message}`);
      });
    },
  },
};
</script>

<style lang="scss">
  .main-loader{
    @apply absolute inset-0 w-screen h-screen z-10;

    background-image: linear-gradient(80deg, rgb(241, 246, 252), rgb(248, 250, 253));
    &:after {
        @apply z-10 w-10 h-10 absolute inset-0 opacity-50 m-auto;
        content: "";
        border: .2em solid #000;
        border-bottom-color: transparent;
        border-radius: 50%;
        animation: 1s loader linear infinite;
    }
    &:before {
        @apply z-10 h-40 absolute inset-0 opacity-50 m-auto;
        top: -200px;
        content: "";
        background:transparent url('/images/logo.svg') center bottom 0px no-repeat;
    }
  }
  .isLoading{
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>
