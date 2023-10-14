<template>
  <section class="title title-plantshop container">
    <div class="title-box-plantshop">
      <div class="title-style text-center">
        <h1>Welcome to our Plant-Shop</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Title"
};
</script>

<style scoped>
/* Title */
.title-plantshop {
  padding: 100px 0;
}
.title-box-plantshop {
  margin: 20px 0;
}
.title-style h1 {
  padding: 40px 0;
  color: var(--darkgrey);
}
.title-style {
  margin: 0 auto 40px;
  height: 120px;
  width: 80%;
  max-width: 700px;
  background: var(--white);
  position: relative;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 50, 0.5);
}
.title-style::after {
  content: "";
  height: 100px;
  width: 200px;
  background-color: var(--cyan);
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: -1;
}
.title-style::before {
  content: "";
  height: 100px;
  width: 200px;
  background-color: var(--cyan);
  position: absolute;
  bottom: -10px;
  right: -10px;
  z-index: -1;
}

@media only screen and (max-width: 770px) {
  .title-style h1 {
    font-size: 28px;
  }
}
</style>
