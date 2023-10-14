<template>
  <div
    id="product-slider"
    class="carousel slide carousel-fade"
    data-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/img/flowers1.jpg" class="img-one d-block w-100" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/flowers2.jpg" class="d-block w-100" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/flowers3.jpg" class="d-block w-100" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallCarouselSlider"
};
</script>

<style scoped></style>
