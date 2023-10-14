<template>
  <div class="slider">
    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/flowers3.jpg" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/flowers2.jpg" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/flowers1.jpg" class="d-block w-100" />
        </div>
      </div>
      <a
        id="prevPic"
        class="carousel-control-prev"
        href="#carouselExampleFade"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        id="nextPic"
        class="carousel-control-next"
        href="#carouselExampleFade"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
      <ol class="carousel-indicators">
        <li data-target="#slider" data-slide-to="0" class="active"></li>
        <li data-target="#slider" data-slide-to="1"></li>
        <li data-target="#slider" data-slide-to="2"></li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselSlider"
};
</script>

<style scoped>
.slider {
  width: 80%;
  margin: 5% 10% 0 10%;
  padding: 0 10px;
}
.carousel {
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
}
.carousel-indicators {
  z-index: 1 !important;
}
@media only screen and (max-width: 980px) {
  .slider {
    width: 100%;
    margin-left: 0;
  }
}
</style>
