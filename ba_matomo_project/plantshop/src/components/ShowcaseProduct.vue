<template>
  <div class="showcase-product">
    <div class="product-top" >
      <router-link :to="'/' + $i18n.locale + '/product' + '/' + id" @click="reloadd"  class="product" 
        ><img :src="image" :alt="name" id="bottomP" 
      /></router-link>
      <div class="overlay-right">
        <router-link
          :to="'/' + $i18n.locale + '/product' + '/' + id"
          class="btn btn-secondary"
          title="Quick Shop"
          id="quickShop" 
          ><i class="fa fa-eye" onclick="return tag.click.send({elem:this, name:'quick-shop', chapter1:'bottom-product', chapter2:'product-page-btn', type:'action'});"></i
        ></router-link>
        <button type="button" id="wish_btn" class="btn btn-secondary" title="Add to Wishlist" onclick="return tag.click.send({elem:this, name:'add-to-wishlist', chapter1:'bottom-product', chapter2:'hover-wish-btn', type:'action'});">
          <i class="fa fa-heart"></i>
        </button>
        <button type="button" id="cart_btn" class="btn btn-secondary" title="Add to Cart" onclick="return tag.click.send({elem:this, name:'add-to-cart', chapter1:'bottom-product', chapter2:'hover-cart-btn', type:'action'});">
          <i class="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <div class="product-bottom text-center">
      <i class="fa fa-star"></i>
      <i class="fa fa-star-o"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star-half"></i>
      <i class="fa fa-star"></i>
      <h3 id="prodName">{{ name }}</h3>
      <h5 id="prodPrice">€ {{ outputPricee }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowcaseProduct",
  props: {
    product: Object,
    id: Number,
    image: String,
    name: String,
    price: Number
  },
  computed: {
    outputPricee() {
      return String(this.price).replace(".", ",");
    }
  },
  methods: {
    reloadd(){
      location.reload();
    },
    // mounted(){
    //   function sendTrackingEvent(){
        
    //   }
    // }
  }
};
</script>

<style scoped>
.product-top img {
  width: 100%;
}
.overlay-right {
  width: 100%;
  display: block;
  opacity: 0;
  position: absolute;
  top: 10%;
  margin-left: 0;
  width: 70px;
}
.overlay-right .fa {
  cursor: pointer;
  background-color: var(--white);
  color: var(--darkgrey);
  height: 35px;
  width: 35px;
  font-size: 20px;
  padding: 7px;
  margin-top: 5%;
  margin-bottom: 5%;
}
.overlay-right .btn-secondary {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}
.product-top:hover .overlay-right {
  opacity: 1;
  margin-left: 5%;
  transition: 0.5s;
}
.product-bottom .fa {
  color: var(--cyan);
  font-size: 10px;
}
.product-bottom h3 {
  font-size: 20px;
  font-weight: bold;
}
.product-bottom h5 {
  font-size: 15px;
}
</style>
