<template>
  <div class="title-box">
    <h2>{{ titleBox }}</h2>
  </div>
</template>

<script>
export default {
  name: "TitleBox",
  props: {
    titleBox: String
  }
};
</script>

<style scoped>
.title-box {
  background: var(--cyan);
  color: var(--white);
  width: 180px;
  padding: 4px 10px;
  height: 40px;
  margin-bottom: 30px;
  display: flex;
}

.title-box::after {
  content: "";
  border-top: 40px solid var(--cyan);
  border-right: 50px solid transparent;
  position: absolute;
  display: flex;
  margin: -4px 0 0 170px;
}
</style>
