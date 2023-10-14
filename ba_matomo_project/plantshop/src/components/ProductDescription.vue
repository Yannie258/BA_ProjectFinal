<template>
  <div class="product-description">
    <ProductTabs :product="product" />
  </div>
</template>

<script>
import ProductTabs from "@/components/layout/ProductTabs.vue";

export default {
  name: "ProductDescription",
  props: {
    product: Object
  },
  components: {
    ProductTabs
  }
};
</script>

<style scoped>
.product-description {
  width: 60%;
  margin: 50px auto;
}

@media only screen and (max-width: 760px) {
  .product-description {
    width: 90%;
    margin: 20px 5%;
  }
}
</style>
