<template>
  <ul class="breadcrumb">
    <li><a class="breadCrumbLink" id="reload" href="index.html" onclick="return tag.click.send({elem:this, name:'home', chapter1:'bread-crumb', chapter2:'reload-link', type:'navigation'});">Home</a></li>
    <li><a class="breadCrumbLink" id="onSale" href="en/product/1" onclick="return tag.click.send({elem:this, name:'on-sale', chapter1:'bread-crumb', chapter2:'link', type:'navigation'});">On Sale</a></li>
    <li><a class="breadCrumbLink" id="product_l" href="#lillies" onmousedown="return tag.click.send({elem:this, name:'lilien', chapter1:'bread-crumb', chapter2:'product-link', type:'navigation'});">Lilien</a></li><!-- router links should be here -->
    <li>Radebeul</li>
  </ul>
</template>

<script>
export default {
  name: "BreadCrump",

  mounted(){
  }
};
</script>

<style scoped>
ul.breadcrumb {
  padding: 10px 16px;
  margin-top: 20px;
  list-style: none;
  background-color: var(--superlightgrey);
}
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}
ul.breadcrumb li + li:before {
  padding: 8px;
  color: var(--darkgrey);
  content: "/\00a0";
}
ul.breadcrumb li {
  color: var(--darkgrey);
}
ul.breadcrumb li a {
  color: var(--orange);
  text-decoration: none;
}
ul.breadcrumb li a:hover {
  color: var(--cyan);
  text-decoration: underline;
}
@media only screen and (max-width: 1030px) {
  ul.breadcrumb {
    margin-top: 40px;
  }
}
@media only screen and (max-width: 536px) {
  ul.breadcrumb {
    margin-top: 60px;
  }
}
</style>
