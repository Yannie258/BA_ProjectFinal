<template>
  <div class="success">
    <div class="jumbotron text-center" id="suc">
      <div class="imgg">
      <img src="@/assets/img/cart_.jpg" class=""  height="250" width="250" />
      </div>
      <h2><b>Order Summary</b></h2>
      <table class="cen">
        <tr>
          <th>PRODUCT</th>
          <th>QUANTITY</th>
          <th>PRICE</th>
        </tr>
        <tr>
          <td id="prod0"></td>
          <td id="prodqty0"></td>
          <td id="prodprice0"></td>
        </tr>
        <tr>
          <td id="prod1"></td>
          <td id="prodqty1"></td>
          <td id="prodprice1"></td>
        </tr>
        <tr>
          <td id="prod2"></td>
          <td id="prodqty2"></td>
          <td id="prodprice2"></td>
        </tr>
        <tr>
          <td id="prod3"></td>
          <td id="prodqty3"></td>
          <td id="prodprice3"></td>
        </tr>
        <tr>
          <td>TOTAL</td>
          <td>--</td>
          <td id="totalPrice"><b></b></td>
        </tr>
      </table>

      <h1 class="display-3">Vielen Dank für Ihren Einkauf!</h1>
      <p class="lead">
        <strong>Überprüfen Sie Ihren E-Mail Ordner</strong> für weitere Details.
      </p>
      <hr />
      <p>Haben Sie Probleme? <a id="coll" href="" onclick="return tag.click.send({elem:this, name:'kontaktieren-sie-uns', chapter1:'content', chapter2:'text', type:'action'});">Kontaktieren Sie uns</a></p>
      <p class="lead">
        <router-link
          class="btn btn-primary"
          :to="'/' + $i18n.locale"
          role="button"
          id="col"
          onclick="return tag.click.send({elem:this, name:'zurueck-zur-startseite', chapter1:'content', chapter2:'text', type:'action'});"
          >Zurück zur Startseite</router-link
        >
      </p>
    </div>
  </div>
</template>
<script>
window.onload = function() {
  var a = JSON.parse(window.localStorage.getItem("vuex"));
  var b = a["cartProducts"];
  var i;
  var sum =0;
  for (i = 0; i < b.length; i++) {
    document.getElementById("prod" + i).innerHTML = b[i].title;
    document.getElementById("prodqty" + i).innerHTML = b[i].qty;
    document.getElementById("prodprice" + i).innerHTML ="€ " + String(b[i].price).replace(".", ",");
    sum += b[i].price * b[i].qty;
  }
  document.getElementById("totalPrice").innerHTML = "€ " + Math.round(sum);
};
export default {
  name: "Success",
  mounted() {
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  }
};
</script>
<style scoped>
#col {
  background-color: #1BADA2;
}
#coll {
  text-emphasis-color: #1BADA2;
}
#suc {
  background-color: white;
  background-image: url("../../assets/img/confetti.png");
}
.cen {
  margin-left: auto;
  margin-right: auto;
}
table {
  border-collapse: collapse;
  width: 40%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr {
  background-color: #ffffff;
}

th {
  background-color: #1BADA2;
  color: white;
}
</style>
