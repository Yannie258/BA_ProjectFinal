<template>
  <div class="product-detail">
    <div class="single-product container">
      <div class="row">
        <div class="col-md-5">
          <SmallCarouselSlider />
        </div>
        <div class="col-md-7">
          <p class="new-arrival text-center">New</p>
          <h2 id="title-product">{{ product.title }}</h2>
          <p>Bestell-Nr.: 72098</p>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"> </i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <p id="prod_price" class="price">€ {{ outputPrice }}</p>
          <p><b>Verfügbarkeit:</b>verfügbar</p>
          <p><b>Zustand:</b>neu</p>
          <label for="productQuantity">Quantity:</label>
          <input
            id="productQuantity"
            type="number"
            min="1"
            max="99"
            v-model="qty"
          />
          <button class="btn btn-primary" id="addToCart" @click="addProduct">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallCarouselSlider from "@/components/SmallCarouselSlider.vue";
export default {
name: "ProductDetails",
  data() {
    return {
      qty: 1
    };
  },
  props: {
    product: Object
  },
  components: {
    SmallCarouselSlider
  },
  computed: {
    qtyNumber() {
      return Number(this.qty);
    },
    outputPrice(){
      return String(this.product.price).replace(".", ",");
    }
  },
  methods: {
    addProduct() {
      if (
        !this.$store.state.cartProducts.some(
          element => element.id === this.product.id
        )
      ) {
        this.$store.commit("add", {
          ...this.product,
          qty: this.qtyNumber
        });
      } else {
        this.$store.commit("changeQty", {
          id: this.product.id,
          qty: this.qtyNumber
        });
      }
    }
  }
};
</script>

<style scoped>
.product-detail {
  margin-top: 70px;
  margin-bottom: 50px;
}
.product-detail .single-product p.new-arrival {
  background: var(--cyan);
  width: 50px;
  color: var(--white);
  font: 12px bold;
  margin-top: 20px;
}

.product-detail .single-product .col-md-7 h2,
p {
  color: var(--darkgrey);
}
.product-detail .single-product i.fa {
  color: var(--cyan);
}
.product-detail .single-product p.price {
  color: var(--cyan);
  font: 30px bold;
  padding-top: 20px;
}
.product-detail .single-product input[type="number"] {
  border: 1px solid var(--lightgrey);
  font-weight: bold;
  height: 33px;
  text-align: center;
  width: 40px;
}
.product-detail .single-product button.btn-primary {
  background: var(--cyan) !important;
  color: var(--white);
  font-size: 15px;
  margin-left: 10px;
  border: none;
  box-shadow: none !important;
}
</style>
