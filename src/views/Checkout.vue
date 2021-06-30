<template>
    <section id="productCheckout" class="checkout" style="background-image: url(/images/checkout_bg.png);">
        <div class="container mx-auto">
            <transition name="fade">
                <div class="alert alert--danger" v-if="message.copy !== ''">
                    <strong>Whoops!</strong> an error occured:
                    <p v-html="message.copy">Loading...</p>
                </div>
            </transition>
            <div class="checkout__header">
                <h2>Secured Checkout</h2>
                <p>Lorem ipsum dolor sit amet,!</p>
            </div>
            <div class="grid grid-cols-1">
                <form class="checkout__form">
                    <div class=" mb-10">
                        <h5><b>Customer:</b> Who are we sending this to?</h5>
                        <div class="grid grid-cols-2 gap-5">
                            <ValidationProvider mode="lazy" name="firstname" rules="required" v-slot="{ classes, errors }">
                                <label for="first_name" class="sr-only">First name</label>
                                <input class="form-input" v-model="fields.customer.firstname" placeholder="First Name" :class="classes" type="text" id="first_name">
                                <span v-if="errors[0]" class="error">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <ValidationProvider mode="lazy" name="lastname" rules="required" v-slot="{ classes, errors }">
                                <label for="last_name" class="sr-only">Last name</label>
                                <input class="form-input" v-model="fields.customer.lastname" placeholder="Last Name" :class="classes" type="text" id="last_name">
                                <span v-if="errors[0]" class="error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <ValidationProvider mode="lazy" name="email" rules="required|email" v-slot="{ classes, errors }">
                            <label for="email_address" class="sr-only">Email address</label>
                            <input class="form-input" v-model="fields.customer.email" placeholder="Email Address" :class="classes" type="text" id="email_address">
                            <span v-if="errors[0]" class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <ValidationProvider mode="lazy" name="phone" :rules="{ regex: /^\+[1-9]\d{10,14}$/ }" v-slot="{ classes, errors }">
                            <label for="phone_number" class="sr-only">First name</label>
                            <the-mask mask="+1 (###) ###-####" class="form-input" v-model="fields.customer.phone" placeholder="Phone Number (Optional)" :class="classes" type="text" id="phone_number" />
                            <span v-if="errors[0]" class="error">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <div>
                            <label class="form-checkbox" for="newsletter">
                            <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            v-model="fields.acceptsMarketing"
                            class="checkbox-marketing"
                          >
                          Keep me up to date on news and exclusive offers
                          </label>
                        </div>
                    </div>
                    <div class=" mb-10">
                        <h5><b>Shipping:</b> Where are we sending this to?</h5>
                        <div class="grid grid-cols-6 gap-5 ">
                            <div class="col-span-6">
                                <ValidationProvider mode="lazy" name="addressInput" rules="required" v-slot="{ classes, errors }">
                                    <label for="map" class="sr-only">Shipping address</label>
                                    <GoogleAutocomplete
                                      id="map"
                                      classname="form-input mb-0 shipping google-autocomplete"
                                      :class="classes"
                                      ref="addressInput"
                                      placeholder="Shipping Address"
                                      name="shipping_address"
                                      autocomplete="new-password"
                                      :enable-geolocation="true"
                                      :country="['ca', 'us']"
                                      v-model="fields.shipping.street"
                                      v-on:blur="manuallyEnteredAddress"
                                      v-on:input="getAddressData"
                                      v-on:placechanged="getAddressData"
                                    ></GoogleAutocomplete>
                                    <span v-if="errors[0]" class="error address-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>

                            <div class="col-span-6">
                                <label for="apartment" class="sr-only">Apartment, Suite, etc. (Optional)</label>
                                <input class="form-input mb-0" v-model="fields.shipping.street_2" placeholder="Apartment, Suite, etc. (Optional)" type="text" id="apartment">
                            </div>
                            <div class="col-span-3">
                                <ValidationProvider mode="lazy" name="town_city" rules="required" v-slot="{ classes, errors }">
                                    <label for="town_city" class="sr-only">Town/City</label>
                                    <input class="form-input mb-0" v-model="fields.shipping.town_city" placeholder="Town/City" :class="classes" type="text" id="town_city">
                                    <span v-if="errors[0]" class="error address-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="col-span-3">
                                <label for="province" class="sr-only">Province</label>
                                <select class="form-input mb-0" v-model="fields.shipping.county_state" v-if="fields.shipping.country === 'CA'" id="province">
                                    <option value="" disabled selected>Province</option>
                                    <option v-for="(name, code) in subdivisions.CA"
                                            :value="code"
                                            :key="code">
                                      {{name}}
                                    </option>
                                  </select>
                                <label for="state" class="sr-only">State</label>
                                <select class="form-input mb-0" v-model="fields.shipping.county_state" v-if="fields.shipping.country === 'US'" id="state">
                                    <option value="" disabled selected>State</option>
                                    <option v-for="(name, code) in subdivisions.US"
                                            :value="code"
                                            :key="code">
                                      {{name}}
                                    </option>
                                  </select>
                            </div>
                            <div class="md:col-span-2 col-span-3">
                                <ValidationProvider mode="lazy" name="zipcode" rules="required" v-slot="{ classes, errors }">
                                    <label for="post_zip_code" class="sr-only">Post/Zip Code</label>
                                    <input class="form-input mb-0" autocorrect="off" v-model="fields.shipping.postal_zip_code" :class="classes" placeholder="Post/Zip Code" type="text" id="post_zip_code">

                                    <span v-if="errors[0]" class="error address-error">{{ errors[0] }}</span>
                                </ValidationProvider>

                            </div>
                            <div class="md:col-span-4 col-span-3">
                                <label for="country" class="sr-only">Country</label>
                                <select class="form-input mb-0" v-model="fields.shipping.country"  id="country">
                                    <option value="" disabled>Country</option>
                                    <option selected value="US">United States</option>
                                    <option value="CA">Canada</option>
                                  </select>
                            </div>
                        </div>
                    </div>
                    <div class="mb-10">
                        <h5 class="relative"><b>Payment</b> details <img src="/images/powered_by_stripe.png" width="119" class="right-0 absolute align-right powered_by_stripe" alt="Powered by Stripe"></h5>
                        <div class="stripe-container">
                            <div ref="card"></div>
                        </div>
                    </div>
                    <div class="mb-10" v-if="!liveObject || !liveObject.discount.code">
                        <h5 class="relative"><b>Discount</b> code</h5>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 md:gap-5">
                            <label for="discount_code" class="sr-only">Discount code</label>
                            <div class="md:col-span-3">
                                <input class="form-input" :class="{ 'is-invalid': discount.error }" v-model="discount.code" placeholder="Discount code" type="text" id="discount_code">
                                <span v-if="discount.error" class="error">{{ discount.error }}</span>
                            </div>
                            <button type="button" class="btn-primary apply-discount" :disabled="!discount.code.length || discount.applying" @click="applyDiscount">
                              Apply
                            </button>
                        </div>
                    </div>
                    <div v-if="liveObject !== null" class="checkout__cart " :class="{'checkout__cart--loading': cartLoading}">
                        <CartItem @remove-from-cart="$emit('remove-from-cart', $event)" v-for="(item, index) in liveObject.line_items" :key="index" :item="item" />
                        <div class="checkout__cart--footer">
                            <transition name="fade">
                                <div v-if="liveObject.discount.code" class="checkout__cart--shipping">
                                  <div>Discount: {{ liveObject.discount.code }}</div>
                                  <div class="text-right">
                                    -{{ liveObject.discount.amount_saved.formatted_with_symbol }}
                                  </div>
                                </div>
                            </transition>
                            <transition name="fade">
                                <div v-if="shippingOptions.length" class="checkout__cart--shipping">
                                    <div>Shipping</div>
                                    <div v-if="shippingOptions[0].price.raw === 0" class="text-right">
                                        Free!
                                    </div>
                                    <div v-else class="text-right">
                                        {{shippingOptions[0].price.formatted_with_symbol}}
                                    </div>
                                </div>
                            </transition>
                            <transition name="fade">
                                <div v-if="liveObject.tax.amount.raw !== 0" class="checkout__cart--shipping">
                                    <div>Tax</div>
                                    <div v-if="liveObject.tax.amount.raw === 0" class="text-right">
                                        Free!
                                    </div>
                                    <div v-else class="text-right">
                                        {{liveObject.tax.amount.formatted_with_symbol}}
                                    </div>
                                </div>
                            </transition>
                            <div class="checkout__cart--subtotal">
                                <div>Total</div>
                                <div class="text-right">{{liveObject.total_due.formatted_with_symbol}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <button
                          type="button"
                          class="btn-primary"
                          :class="{'btn-primary--loading': checkoutSendingLoader, 'btn-primary--disabled' : formFilled}"
                          :disabled="formFilled || rateCheckoutLimit "
                          @click="createStripeToken()"
                        >
                        <!-- eslint-disable-next-line max-len -->
                        <span class="btn-icon"><svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8333 18.6084C12.8333 17.8746 12.6055 17.248 12.1497 16.7288C11.694 16.2096 11.1441 15.95 10.5 15.95C9.8559 15.95 9.30599 16.2096 8.85026 16.7288C8.39453 17.248 8.16667 17.8746 8.16667 18.6084C8.16667 19.1207 8.28212 19.5845 8.51302 19.9999C8.74392 20.4153 9.05382 20.7407 9.44271 20.9761L8.1849 25.7322C8.12413 25.9399 8.15451 26.1337 8.27604 26.3137C8.39757 26.4937 8.55556 26.5837 8.75 26.5837H12.25C12.4444 26.5837 12.6024 26.4937 12.724 26.3137C12.8455 26.1337 12.8759 25.9399 12.8151 25.7322L11.5573 20.9761C11.9462 20.7407 12.2561 20.4153 12.487 19.9999C12.7179 19.5845 12.8333 19.1207 12.8333 18.6084ZM5.83333 13.2915H15.1667V9.30383C15.1667 7.83615 14.7109 6.58308 13.7995 5.54462C12.888 4.50617 11.7882 3.98694 10.5 3.98694C9.21181 3.98694 8.11198 4.50617 7.20052 5.54462C6.28906 6.58308 5.83333 7.83615 5.83333 9.30383V13.2915ZM21 15.2853V27.2484C21 27.8022 20.8299 28.273 20.4896 28.6607C20.1493 29.0483 19.7361 29.2422 19.25 29.2422H1.75C1.26389 29.2422 0.850694 29.0483 0.510417 28.6607C0.170139 28.273 0 27.8022 0 27.2484V15.2853C0 14.7315 0.170139 14.2607 0.510417 13.873C0.850694 13.4853 1.26389 13.2915 1.75 13.2915H2.33333V9.30383C2.33333 6.75616 3.13542 4.56847 4.73958 2.74079C6.34375 0.913109 8.26389 -0.000732422 10.5 -0.000732422C12.7361 -0.000732422 14.6562 0.913109 16.2604 2.74079C17.8646 4.56847 18.6667 6.75616 18.6667 9.30383V13.2915H19.25C19.7361 13.2915 20.1493 13.4853 20.4896 13.873C20.8299 14.2607 21 14.7315 21 15.2853Z" fill="white"/></svg></span>
                        Complete Purchase
                        </button>
                        <p class="text-center">
                            All transactions are safe & secured by 2048 bit SSL encryption.
                        </p>
                    </div>
                </form>
            </div>
            <div class="grid lg:grid-cols-3 md:grid-cols-2 md:px-10 px-10 sm:grid-cols-1 mt-10 lg:mt-40 gap-5 md:gap-20">
                <div class="text-center md:col-span-2 lg:col-span-1">
                    <div class="checkout__recommendation-image">
                        <img src="/images/fastco.png" alt="Fast Company logo" width="228">
                    </div>
                    <h4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</h4>
                </div>
                <div class="text-center">
                    <div class="checkout__recommendation-image">
                        <img src="/images/todayshow.png" alt="Today logo" width="84">
                    </div>
                    <h4>"Donec at convallis velit, ut ultrices tellus."</h4>
                </div>
                <div class="text-center">
                    <div class="checkout__recommendation-image">
                        <img src="/images/popsugar.png" alt="POPSUGAR. logo" width="239">
                    </div>
                    <h4>"Ut fringilla felis massa, vitae scelerisque lorem malesuada at. "</h4>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import GoogleAutocomplete from './GoogleAutocomplete';
import CartItem from './CartItem.vue';
import { ValidationProvider, extend, configure } from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';
import { TheMask } from 'vue-the-mask'


configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        // ...
    }
})
extend('email', {
    ...email,
    message: 'Please enter a valid email address'
});

//Assume this is for a phone number
extend('regex', {
    ...regex,
    message: 'Please enter a valid phone number'
});

extend('required', {
    ...required,
    message: 'This field is required'
});

export default {
    name: 'Checkout',
    props: ['cart', 'merchant', 'checkoutToken', 'location'],
    components: {
        CartItem,
        GoogleAutocomplete,
        ValidationProvider,
        TheMask
    },
    data() {
        return {
            rateLimit: false,
            rateCheckoutLimit: false,
            masked: false,
            cartLoading: false,
            checkoutSendingLoader: false,
            card: null,
            fields: {
                acceptsMarketing: true,
                line_items_foo: null,
                line_items: this.cart.line_items,
                customer: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                },
                shipping: {
                    name: '',
                    street: '',
                    street_2: '',
                    town_city: '',
                    county_state: '',
                    postal_zip_code: '',
                    country: 'US',
                },
                fulfillment: {
                    shipping_method: '',
                },
                payment: {
                    gateway: 'stripe',
                    card: {
                        token: null,
                    },
                },
            },
            liveObject: null,
            discount: {
              code: '',
              error: null,
              applying: false,
            },
            shippingOptions: [],
            message: {
                status: 'alert-danger',
                copy: '',
            },
            subdivisions: {
                CA: {
                    "AB": "Alberta",
                    "BC": "British Columbia",
                    "MB": "Manitoba",
                    "NB": "New Brunswick ",
                    "NF": "Newfoundland",
                    "NT": "Northwest Territories ",
                    "NS": "Nova Scotia",
                    "NU": "Nunavut",
                    "ON": "Ontario",
                    "PE": "Printe Edward Island",
                    "QC": "Quebec",
                    "SK": "Saskatchewan",
                    "YT": "Yukon Territory"
                },
                US: {
                    "AL": "Alabama",
                    "AK": "Alaska",
                    "AS": "American Samoa",
                    "AZ": "Arizona",
                    "AR": "Arkansas",
                    "CA": "California",
                    "CO": "Colorado",
                    "CT": "Connecticut",
                    "DE": "Delaware",
                    "DC": "District of Columbia",
                    "FL": "Florida",
                    "GA": "Georgia",
                    "GU": "Guam",
                    "HI": "Hawaii",
                    "ID": "Idaho",
                    "IL": "Illinois",
                    "IN": "Indiana",
                    "IA": "Iowa",
                    "KS": "Kansas",
                    "KY": "Kentucky",
                    "LA": "Louisiana",
                    "ME": "Maine",
                    "MD": "Maryland",
                    "MA": "Massachusetts",
                    "MI": "Michigan",
                    "MN": "Minnesota",
                    "MS": "Mississippi",
                    "MO": "Missouri",
                    "MT": "Montana",
                    "NE": "Nebraska",
                    "NV": "Nevada",
                    "NH": "New Hampshire",
                    "NJ": "New Jersey",
                    "NM": "New Mexico",
                    "NY": "New York",
                    "NC": "North Carolina",
                    "ND": "North Dakota",
                    "MP": "Northern Mariana Islands",
                    "OH": "Ohio",
                    "OK": "Oklahoma",
                    "OR": "Oregon",
                    "PA": "Pennsylvania",
                    "PR": "Puerto Rico",
                    "RI": "Rhode Island",
                    "SC": "South Carolina",
                    "SD": "South Dakota",
                    "TN": "Tennessee",
                    "TX": "Texas",
                    "UM": "United States Minor Outlying Islands",
                    "UT": "Utah",
                    "VT": "Vermont",
                    "VI": "Virgin Islands, U.S.",
                    "VA": "Virginia",
                    "WA": "Washington",
                    "WV": "West Virginia",
                    "WI": "Wisconsin",
                    "WY": "Wyoming"
                }
            },
            stripeStyles: {
                base: {
                    color: '#000',
                    fontSmoothing: 'antialiased',
                    fontSize: '18px',
                    fontWeight: "Normal",
                    letterSpacing: "1px",
                    '::placeholder': {
                        color: 'rgba(0,0,0, .8)'
                    }
                },
                invalid: {
                    color: '#E61E38',
                    iconColor: '#E61E38'
                },
            }
        };
    },
    computed: {
        formFilled() {
            return this.fields.fulfillment.shipping_method === '' ||
                this.fields.customer.firstname === '' ||
                this.fields.customer.lastname === '' ||
                this.fields.customer.email === '';
        },
        selectedCountry() {
            return this.fields.shipping.country;
        },
        selectedPostal() {
            return this.fields.shipping.postal_zip_code;
        },
        selectedCounty() {
            return this.fields.shipping.county_state;
        },
    },
    watch: {
        shippingOptions() {
            this.fields.fulfillment.shipping_method = this.shippingOptions[0].id;
            this.checkShippingMethods(this.shippingOptions[0].id, this.fields.shipping);
            this.calculateTax(this.fields.shipping);
        },
        checkoutToken() {
          if (this.checkoutToken !== null) {
            this.generateLiveObject();
          }
          this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
        },
        selectedCountry() {
          if (this.selectedCountry !== '' && this.selectedCounty !==  '') {
            this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
          }
        },
        selectedPostal() {
          this.calculateTax(this.fields.shipping);
        },
        selectedCounty() {
          this.calculateTax(this.fields.shipping);
        },
        message: {
            handler() {
                setTimeout(() => {
                    this.message.copy = '';
                }, 5000);
            },
            deep: true,
        },
        fields: {
            handler(newVal, oldVal) {
                if (newVal.customer.firstname !== '') {
                    this.fields.shipping.name = `${newVal.customer.firstname} ${newVal.customer.lastname}`;
                }
            },
            deep: true,
        },
    },
    mounted() {
        if (this.card === null) {
          this.card = this.$elements.create('card', { style: this.stripeStyles });
        }
        this.card.mount(this.$refs.card);
        this.setLocation();
    },
    methods: {
        manuallyEnteredAddress(data) {
            this.fields.shipping.name = `${this.fields.customer.firstname} ${this.fields.customer.lastname}`;
            this.fields.shipping.street = data;
        },
        getAddressData(data) {
            let countryCode = null;
            if (data.country === 'United States') {
                countryCode = 'US';
            }
            if (data.country === 'Canada') {
                countryCode = 'CA';
            }
            this.fields.shipping.name = `${this.fields.customer.firstname} ${this.fields.customer.lastname}`;
            this.fields.shipping.street = `${(typeof data.street_number === 'undefined') ? '' : data.street_number } ${data.route}`;
            this.fields.shipping.town_city = data.locality;
            this.fields.shipping.county_state = data.administrative_area_level_1;
            this.fields.shipping.country = (countryCode === null) ? this.fields.shipping.country : countryCode;
            this.fields.shipping.postal_zip_code = data.postal_code;
            this.$refs.addressInput.$el.value = this.fields.shipping.street;
        },
        generateLiveObject() {
            this.cartLoading = true;
            this.$axios.get(`${process.env.VUE_APP_CHEC_API_URL}/v1/checkouts/${this.checkoutToken}/live`)
                .then((response) => {
                    this.liveObject = response.data;
                    this.cartLoading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getShippingMethods(orderKey, country) {
          if (this.rateLimit) {
            return;
          }
          if (this.checkoutToken === null) {
            this.$parent.$parent.generateToken();
            return;
          }
          this.rateLimit = true;
            this.cartLoading = true;
            this.$commerce.checkout.getShippingOptions(orderKey, { country }).then((result) => {
                this.shippingOptions = result;
                this.checkShippingMethods(result[0].id, this.fields.shipping);
                setTimeout(() => this.rateLimit = false, 500);
            }).catch((error) => {
                this.message.copy = error.data.error.message;
            });
        },
        setLocation() {
            this.fields.shipping.country = this.location.country;
            this.fields.shipping.county_state = this.location.county_state;
        },
        createStripeToken() {
          if (this.rateCheckoutLimit) {
            return;
          }
          this.rateCheckoutLimit = true;

          this.checkoutSendingLoader = true;
          this.$stripe.createToken(this.card).then((result) => {
            if (result.error) {
              this.checkoutSendingLoader = false;
              this.message.copy = result.error.message;
              setTimeout(() => this.rateCheckoutLimit = false, 500);
              this.$forceUpdate();
              return;
            }
            this.fields.payment.card.token = result.token.id;
            this.captureCheckout();
          });
        },
        applyDiscount(e) {
            e.preventDefault();
            this.discount.applying = true;
            this.$commerce.checkout.checkDiscount(this.checkoutToken, { code: this.discount.code })
                .then((response) => {
                    if (response.valid) {
                      this.discount.error = null;
                      this.liveObject = response.live;
                      return;
                    }
                    this.discount.error = 'Invalid code';
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.discount.applying = false;
                });
        },
        captureCheckout() {
            this.$commerce.checkout.capture(
                this.checkoutToken, {
                    line_items: this.lineItemsSanitized(this.cart.line_items),
                    customer: this.fields.customer,
                    shipping: this.fields.shipping,
                    fulfillment: this.fields.fulfillment,
                    payment: this.fields.payment,
                    extrafields: {
                        'extr_ANwROJb8z1qovY': this.fields.customer.phone,
                        'extr_ANwROJbdxWpovY': this.fields.acceptsMarketing,
                    },
                },
            ).then((result) => {
                this.$parent.orderRef = result.customer_reference;
                this.card.unmount(this.$refs.card);
                this.$router.push('/order-confirmation');
            }).catch((error) => {
              this.checkoutSendingLoader = false;
              setTimeout(() => this.rateCheckoutLimit = false, 1000);
              if (error.data.error.message instanceof Array) {
                this.message.copy = `<ul>
                  ${error.data.error.message.map((message) => `<li>- ${message.error}</li>`).join('')}
                </ul>`;
                return;
              }
              this.message.copy = error.data.error.message;
            });
        },
        lineItemsSanitized(lineItems) {
            return lineItems.reduce((data, lineItem) => {
                const item = data;
                let variantData = null;
                if (lineItem.variants.length) {
                    variantData = {
                        [lineItem.variants[0].variant_id]: lineItem.variants[0].option_id,
                    };
                }
                item[lineItem.id] = {
                    quantity: lineItem.quantity,
                    variants: variantData,
                };
                return item;
            }, {});
        },
        checkShippingMethods(shippingId, shippingData) {
            this.$axios.get(`${process.env.VUE_APP_CHEC_API_URL}/v1/checkouts/${this.checkoutToken}/check/shipping`, {
                    params: {
                        shipping_option_id: shippingId,
                        country: shippingData.country,
                        region: shippingData.county_state,
                    },
                })
                .then((response) => {
                    this.generateLiveObject();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        calculateTax(shippingData) {
        this.$axios.get(`${process.env.VUE_APP_CHEC_API_URL}/v1/checkouts/${this.checkoutToken}/helper/set_tax_zone`, {
            params: {
                country: shippingData.country,
                region: shippingData.county_state,
                postal_zip_code: shippingData.postal_zip_code,
            },
        })
        .then((response) => {
            this.generateLiveObject();
        })
        .catch((error) => {
            console.log(error);
        });
        },
    },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(135deg, black 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 0px 0px;
    background-repeat: no-repeat;
    background-color:white;
}

select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
}

.checkout {
    @apply pt-10 pb-40 text-grey-dark bg-local bg-left bg-no-repeat bg-cover;
    @media (max-width: 640px) {
      @apply pb-10;
    }
    h5 {
        font-size: 1.5rem;
        font-weight: normal;
        padding-bottom: 5px;
        b {
            font-weight: bold;
        }
        @media (max-width: 640px) {
            font-size: 1.15rem;
        }
    }
    .form-input {
        &.mb-0 {
            margin-bottom: 0px !important;
        }
        &.shipping {
            @media (min-width: 640px) {
              height: 4.2rem;
              font-size: 1.6rem;
            }
            &::placeholder {
                color: rgba(#000, .9);
                @media (min-width: 640px) {
                  font-size: 1.6rem;
                }
            }
        }
    }
    &__header {
        @apply text-center m-20;
        @media (max-width: 640px) {
            @apply mx-10 mb-10 mt-0;
        }
    }
    &__form {
        @apply my-0 mx-auto;
        max-width: 510px;
        @media (max-width: 640px) {
            @apply px-5;
        }
        .checkbox-marketing {
            @apply mr-1;
            transform: scale(1.2);
            position: relative;
            bottom: -1px;
            &:focus {
                outline: none;
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
            }
        }
        input,
        select {
            position: relative;
            z-index: 2;

        }
        input.is-invalid {
            background: #E92632;
            color: white;
            font-weight: bold;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            &::placeholder {
                color: white !important;
            }
        }
        .error {
            display: block;
            position: relative;
            top: -20px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            font-size: 14px;
            text-align: left;
            padding: 7px 10px;
            background: #BA1D27;
            z-index: 2;
            opacity: 1;
            &.address-error {
                top: 0px;
            }
        }
    }
    &__cart {
        @apply bg-grey-dark text-white p-5 rounded text-lg mb-8 -mx-8 relative;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        @media (max-width: 640px) {
            @apply mx-0;
        }
        &--loading {
            &:before {
                @apply z-10 bg-grey-dark absolute inset-0;
                content: "";
            }
            &:after {
                @apply z-10 w-8 h-8 absolute inset-0 opacity-50 m-auto;
                content: "";
                border: .2em solid currentcolor;
                border-bottom-color: transparent;
                border-radius: 50%;
                animation: 1s loader linear infinite;
            }
        }
    }
    &__cart--footer {
        @apply pt-3;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
    &__cart--shipping {
        @apply grid grid-cols-2 opacity-50 pb-3;
    }
    &__cart--subtotal {
        @apply grid grid-cols-2;
    }
    .btn-primary {
        @apply mb-8 w-full;

        &.apply-discount {
          @apply w-full;
            font-size: 1rem;
            padding: 15px;
        }

      &:disabled {
        cursor: not-allowed;
      }
    }
    &__recommendation-image {
        @apply flex items-center justify-center h-32;
        @media (max-width: 640px) {
            img {
                max-width: 40%;
            }
        }
    }
    .btn-primary {
        @apply text-xl relative;
        @media (max-width: 640px) {
            @apply text-lg;
            svg {
                @apply relative;
                top: 2px;
                height: 24px;
            }
        }
        &--disabled{
          background: #4c536d;
          opacity: 0.5;

        }
        &--loading {
            &:before {
                @apply z-10 bg-grey-dark absolute inset-0;
                content: "";
            }
            &:after {
                @apply z-10 w-8 h-8 absolute inset-0 opacity-50 m-auto;
                content: "";
                border: .2em solid currentcolor;
                border-bottom-color: transparent;
                border-radius: 50%;
                animation: 1s loader linear infinite;
            }
        }
    }
    .stripe-container {
        @apply bg-white text-primary-grey rounded w-full;
        height: 3.3125rem;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        .StripeElement {
            @apply px-4;
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        }
    }
    .powered_by_stripe {
        top: 3px;
        @media (max-width: 640px) {
            top:2px;
        }
    }
    .StripeElement, .CardField-child{
      height: 3.3125rem;
      padding: 16px 14px;
    }
    .stripe-element-container {
        padding-top: .55rem;
        padding-bottom: .50rem;
    }
}

@keyframes loader {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
