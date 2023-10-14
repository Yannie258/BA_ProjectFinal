<template>
  <div class="product-tabs">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a id="navDes" class="nav-link active" data-toggle="tab" href="#description" onclick="return tag.click.send({elem:this, name:'description', chapter1:'banner-middle', chapter2:'description', type:'action'});"
          >Description</a
        >
      </li>
      <li class="nav-item">
        <a id="navRew" class="nav-link" data-toggle="tab" href="#reviews" onclick="return tag.click.send({elem:this, name:'reviews', chapter1:'banner-middle', chapter2:'review', type:'action'});">Reviews</a>
      </li>
      <li class="nav-item" >
        <a id="navWRew" class="nav-link" data-toggle="tab" href="#make-review" onclick="return tag.click.send({elem:this, name:'write-a-review', chapter1:'banner-middle', chapter2:'write-review', type:'action'});"
          >Write a Review</a
        >
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div id="description" class="container tab-pane active">
        <h3>Description</h3>
        <p>{{ product.description }}</p>
      </div>
      <div id="reviews" class="container tab-pane fade">
        <h3>Reviews</h3>
        <div v-for="(review, index) in product.reviews" :key="index">
          <p>
            <b>Autor:</b>
            {{ review.author }}
          </p>
          <p>Rating: {{ review.rating }}</p>
          <p>Bewertung: {{ review.review }}</p>
          <hr />
        </div>
      </div>
      <div id="make-review" class="container tab-pane fade">
        <h3>Write A Review</h3>
        <MakeReview />
      </div>
    </div>
  </div>
</template>

<script>
import MakeReview from "@/components/MakeReview.vue";

export default {
  name: "ProductTabs",
  props: {
    product: Object
  },
  components: {
    MakeReview
  }
};
</script>

<style scoped>
p {
  margin-top: 30px;
  text-align: justify;
}

a,
h3 {
  margin-top: 10px;
  color: var(--cyan);
}
</style>
