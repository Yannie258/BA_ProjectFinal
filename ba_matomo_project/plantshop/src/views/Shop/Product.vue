<template>
  <div class="product">
    <ProductDetails :product="product" />
    <ProductDescription :product="product" />
    <ShowcaseProducts :products="products" :titleBox="translateTitleBox" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductDetails from "@/components/ProductDetails.vue";
import ProductDescription from "@/components/ProductDescription.vue";
import ShowcaseProducts from "@/components/ShowcaseProducts.vue";

export default {
  components: {
    ProductDetails,
    ProductDescription,
    ShowcaseProducts
  },
  data: function() {
    return {
      product: {}
    };
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    translateTitleBox: function() {
      return this.$t("product.titleBox");
    }
  },
  created() {
    this.updateProduct();
  },
  watch: {
    $route: "updateProduct"
  },
  methods: {
    updateProduct() {
      this.product = this.products.find(
        element => element.id == this.$route.params.id
      );
    }
  },
  mounted() {
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    };
  }
};
</script>
