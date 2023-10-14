<template>
  <div class="make-review">
    <form>
      <div>
        <label for="name">Name:</label>
        <input id="name" />
      </div>

      <div>
        <label for="review">Review:</label>
        <textarea id="review"></textarea>
      </div>

      <label for="rating">Rating:</label>
      <select id="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <p>Would you recommend this product?</p>

      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="Radios"
          id="Radios1"
          value="option1"
          checked
        />
        <label class="form-check-label" for="Radios1">
          Yes
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="Radios"
          id="Radios2"
          value="option2"
        />
        <label class="form-check-label" for="Radios2">
          No
        </label>
      </div>

      <input type="submit" value="Submit" onclick="return tag.click.send({elem:this, name:'submit', chapter1:'banner-middle', chapter2:'write-review', type:'action'});" />
    </form>
  </div>
</template>

<script>
export default {
  name: "MakeReview"
};
</script>

<style scoped>
input[type="submit"] {
  margin-top: 30px;
  border: none;
  background-color: var(--cyan);
  color: var(--white);
  height: 40px;
  width: 100px;
  font-size: 14px;
}
form {
  width: 400px;
  padding: 20px;
  border: 1px solid var(--lightgrey);
}
textarea {
  width: 100%;
  height: 60px;
}
</style>
