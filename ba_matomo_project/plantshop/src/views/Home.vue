<template>
  <div class="home">
    <BreadCrump />
    <Title />
    <VideoModals />
    <FeaturedCategories />
    <ShowcaseProducts :products="products" :titleBox="translateTitleBox" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BreadCrump } from "@/components/layout/BreadCrump.vue";

import Title from "@/components/Title.vue";
import VideoModals from "@/components/VideoModals.vue";
import FeaturedCategories from "@/components/FeaturedCategories.vue";
import ShowcaseProducts from "@/components/ShowcaseProducts.vue";

export default {
  name: "Home",
  metaInfo() {
    return { 
      title: "Home",
    }
  },
  components: {
    BreadCrump,
    Title,
    VideoModals,
    FeaturedCategories,
    ShowcaseProducts
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    translateTitleBox() {
      return this.$t("home.titleBox");
    },
  },
  mounted(){
  },
  
};
</script>
