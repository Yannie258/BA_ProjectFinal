<template>
  <div class="catalogue">
    <ShowcaseProducts :products="products" :titleBox="translateTitleBox" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShowcaseProducts from "@/components/ShowcaseProducts.vue";

export default {
  name: "Catalogue",
  metaInfo() {
    return {
      title: "Catalogue"
    };
  },
  components: {
    ShowcaseProducts
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    translateTitleBox() {
      return this.$t("home.titleBox");
    }
  }
};
</script>
