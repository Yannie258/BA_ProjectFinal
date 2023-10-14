<template>
  <section class="on-sale">
    <div class="container">
      <TitleBox :titleBox="titleBox" />
      <div class="row">
        <ShowcaseProduct
          v-for="(product, index) in products"
          :key="index"
          :id="product.id"
          :image="product.image"
          :name="product.title"
          :price="product.price"
          class="col-md-3"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TitleBox from "@/components/TitleBox.vue";
import ShowcaseProduct from "@/components/ShowcaseProduct.vue";

export default {
  name: "ShowcaseProducts",
  components: {
    TitleBox,
    ShowcaseProduct
  },
  props: {
    titleBox: String,
    products: Array
  }
};
</script>

<style scoped>
.on-sale {
  margin-bottom: 30px;
}
</style>
