<template>
  <section class="featured-categories">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <a id="lillies" onclick="return tag.click.send({elem:this, name:'lilien', chapter1:'content', chapter2:'text', type:'action'});"><h2>Lilien</h2></a>
          <img src="@/assets/img/flowers5.jpg" />
        </div>
        <div class="col-md-4">
          <h2>Rosen</h2>
          <img src="@/assets/img/flowers6.jpg" alt="" />
        </div>
        <div class="col-md-4">
          <h2>Gerbera</h2>
          <img src="@/assets/img/flowers7.jpg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturedCategories"
};
</script>

<style scoped>
.featured-categories {
  padding: 50px 0;
  margin: 50px 0;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
}
.featured-categories img {
  width: 100%;
  padding: 20px 0;
  transition: 1s;
  cursor: pointer;
  border-radius: 5%;
}
.featured-categories img:hover {
  transform: scale(1.1);
}

.featured-categories h2 {
  text-align: center;
  margin-top: 5px;
  color: var(--darkgrey);
  text-decoration: underline var(--cyan);
}
</style>
