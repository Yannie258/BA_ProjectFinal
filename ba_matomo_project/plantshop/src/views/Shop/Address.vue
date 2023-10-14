<template>

<div class="form-group">
    <h2>Please enter your address to continue</h2>
  <input type="street" 
         class="form-control" 
         id="autocomplete" 
         placeholder="Street">
  
  <input type="city" 
         class="form-control" 
         id="inputCity" 
         placeholder="City">
  
  <input type="state" 
         class="form-control" 
         id="inputState" 
         placeholder="State">
  
  <input type="zip" 
         class="form-control" 
         id="inputZip" 
         placeholder="Zip">
  
  <input type="city" 
         class="form-control" 
         id="inputCounty" 
         placeholder="City">
  
  <input type="country" 
         class="form-control" 
         id="inputCountry" 
         placeholder="Country">


  <router-link :to="'/' + $i18n.locale + this.$i18n.locale + '/paymentInfo'"
    >Proceed to enter payment details.
  </router-link>
  </div>
</template>

<style scoped>
input, label {
  margin: 5px 5px;
}

.form-group {
  margin: 30px auto;
  width: 450px;
}

.form-control {
  float: left;
}

#inputStreet {
  width: 100%;
}

#inputCity {
  width: 50%;
}

#inputState {
  width: 15%;
}

#inputZip {
  width: 28%;
}

#inputCounty {
  width: 45%;
}

#inputCountry {
  width: 50%;
}

</style>>