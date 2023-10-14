<template>
  <div class="header top-nav-bar">
    <div class="search-box">
      <router-link :to="'/' + $i18n.locale" id="logo">
        <img src="@/assets/img/logo_200x200.png" alt="Plant-Shop-Logo" class="logo" onclick="return tag.click.send({elem:this, name:'router-link-exact-active-router-link-active', chapter1:'nav-bar', chapter2:'icon', type:'navigation'});" />
      </router-link>
      <router-link :to="'/' + $i18n.locale" id="plantShop">
        <h1 onclick="return tag.click.send({elem:this, name:'plant-shop', chapter1:'nav-bar', chapter2:'icon', type:'navigation'});">{{ $t("title") }}</h1>
      </router-link>
      <input type="text" class="form-control" id="searchterm" />
      <span class="input-group-text">
       <a id="searchid" href="#"> <i class="fa fa-search" onclick="return tag.click.send({elem:this, name:'text', chapter1:'content', chapter2:'text', type:'navigation'});"></i></a>
      </span>
    </div>
    <div v-if="authorize()" class="menu-bar">
      <ul>
        <li class="submenu">
          <router-link :to="'/' + $i18n.locale + '/login'" id="topCart">
            <i class="fa fa-shopping-cart" id="nav_cart" onclick="return tag.click.send({elem:this, name:'cart', chapter1:'content', chapter2:'text', type:'navigation'});" ></i>
            {{ $t("header.cart.title") }}
          </router-link>
          <div id="shopping-cart">
            <table id="cart-content" class="u-full-width">
              <thead>
                <tr>
                  <th>{{ $t("header.cart.image") }}</th>
                  <th>{{ $t("header.cart.name") }}</th>
                  <th>{{ $t("header.cart.price") }}</th>
                  <th>{{ $t("header.cart.qty") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="(cartProduct, index) in cartProducts" :key="index">
                <tr>
                  <td>
                    <img :src="cartProduct.image" :alt="cartProduct.title" width="50" />
                  </td>
                  <td>{{ cartProduct.title }}</td>
                  <td>{{ cartProduct.price.toFixed(2) }}€</td>
                  <td class="product-${cartProduct.id}">{{ cartProduct.qty }}</td>
                  <td>
                    <a href="#" @click="remove(cartProduct.id)" class="remove">X</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <router-link
              :to="'/' + $i18n.locale + '/login'"
              id="clear-cart"
              class="button-clear-cart u-full-width"
            >{{ $t("header.cart.buy") }}</router-link>
          </div>
        </li>
        <li onclick="return tag.click.send({elem:this, name:'social', chapter1:'content', chapter2:'text', type:'navigation'});">
          <router-link :to="'/' + $i18n.locale + '/social'" id="topSocial">
            <i class="fa fa-user-plus"></i>
            {{ $t("header.nav.social") }}
          </router-link>
        </li>
        <li onclick="return tag.click.send({elem:this, name:'login', chapter1:'content', chapter2:'text', type:'navigation'});">
          <router-link :to="'/' + $i18n.locale + '/login'" id="topLogin">
            <i class="fa fa-user"></i>
            {{ $t("header.nav.login") }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else class="menu-bar">
      <ul>
        <li class="submenu">
          <router-link :to="'/' + $i18n.locale + '/login'" id="topCart">
            <i class="fa fa-shopping-cart" id="nav_cart"></i>
            {{ $t("header.cart.title") }}
          </router-link>
          <div id="shopping-cart">
            <table id="cart-content" class="u-full-width">
              <thead>
                <tr>
                  <th>{{ $t("header.cart.image") }}</th>
                  <th>{{ $t("header.cart.name") }}</th>
                  <th>{{ $t("header.cart.price") }}</th>
                  <th>{{ $t("header.cart.qty") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="(cartProduct, index) in cartProducts" :key="index">
                <tr>
                  <td>
                    <img :src="cartProduct.image" :alt="cartProduct.title" width="50" />
                  </td>
                  <td>{{ cartProduct.title }}</td>
                  <td>{{ cartProduct.price.toFixed(2) }}€</td>
                  <td class="product-${cartProduct.id}">{{ cartProduct.qty }}</td>
                  <td>
                    <a href="#" @click="remove(cartProduct.id)" class="remove">X</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <router-link
              :to="'/' + $i18n.locale + '/login'"
              id="clear-cart"
              class="button-clear-cart u-full-width"
              onclick="return tag.click.send({elem:this, name:'buy-now', chapter1:'content', chapter2:'text', type:'navigation'});"
            >{{ $t("header.cart.buy") }}</router-link>
          </div>
        </li>
        <li>
          <router-link :to="'/' + $i18n.locale + '/social'" id="topSocial">
            <i class="fa fa-user-plus"></i>
            {{ $t("header.nav.social") }}
          </router-link>
        </li>
        <li>
          <router-link :to="'/' + $i18n.locale " @click.native="changeVal()" id="topLogin">
            <i class="fa fa-user"></i>
            Logout
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import Login from "@/components/Login.vue";


export default {
  name: "Header",
  computed: {
    ...mapState({
      cartProducts: state => state.cartProducts
    })
  },
  methods: {
    remove(id) {
      this.$store.commit("remove", id);
    },
    authorize() {
      if (localStorage.getItem("useracc")) {
        return false;
      } else {
        return true;
      }
    },
    changeVal(){
      localStorage.removeItem("useracc");
      location.reload();
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
.top-nav-bar {
  height: 57px;
  top: 0;
  position: sticky;
  background: var(--white);
  box-shadow: 0px 1px 2px 1px var(--darkgrey);
  z-index: 2;
}

.search-box {
  display: inline-flex;
  width: 60%;
}

.top-nav-bar .search-box img.logo {
  height: 42px;
  margin: 10px 50px;
}

.top-nav-bar .search-box a {
  text-decoration: none;
  width: 100%;
}

.header .top-nav-bar a.router-link-exact-active {
  color: var(--orange);
}

.top-nav-bar .search-box h1 {
  color: var(--darkgrey);
  margin-top: 5px;
  font-size: 38px;
}

.top-nav-bar .search-box input.form-control {
  margin-top: 9px;
  margin-left: 30px;
  border: 1px solid var(--superlightgrey);
  border-radius: 20px 0 0 20px !important;
  background: var(--superlightgrey);
  box-shadow: none !important;
}

.top-nav-bar .search-box input.form-control:focus {
  background-color: var(--white);
}

.top-nav-bar .search-box span.input-group-text {
  background: var(--superlightgrey) !important;
  border: 1px solid var(--superlightgrey) !important;
  margin: 8.5px 10px 3px 0 !important;
  border-radius: 0 20px 20px 0 !important;
  cursor: pointer;
  height: 38px;
}

.top-nav-bar .search-box span.input-group-text i.fa-search {
  color: var(--lightgrey);
}

.menu-bar {
  width: 40%;
  height: 57px;
  float: right;
}

.menu-bar ul {
  display: inline-flex;
  float: right;
}

.menu-bar ul li {
  border-left: 1px solid var(--white);
  list-style-type: none;
  padding: 15px 35px;
  text-align: center;
  background-color: var(--cyan);
  cursor: pointer;
}

.menu-bar ul li:hover {
  background-color: var(--darkgrey);
}

.menu-bar ul li a:not(.button-clear-cart) {
  font: bold 16px;
  text-decoration: none;
  color: var(--white);
}

.menu-bar ul li a .fa-shopping-cart {
  margin-right: 5px;
}

.menu-bar ul li a .fa-user-plus {
  margin-right: 5px;
}

.menu-bar ul li a .fa-user {
  margin-right: 5px;
}

.submenu {
  position: relative;
}

.submenu #shopping-cart {
  display: none;
}
.submenu:hover #shopping-cart {
  display: block;
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 1;
  background-color: white;
  box-shadow: 5px 5px 5px 0px var(--darkgrey);
  padding: 20px;
  min-height: 400px;
  min-width: 300px;
}
/* Tables
–––––––––––––––––––––––––––––––––––––––––––––––––– */
th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e1e1e1;
}
th:first-child,
td:first-child {
  padding-left: 0;
}
th:last-child,
td:last-child {
  padding-right: 0;
}

/* Utilities
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.u-full-width {
  width: 100%;
  box-sizing: border-box;
}

/* Buttons
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.button-clear-cart {
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: var(--darkgrey);
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  box-sizing: border-box;
}
.button-clear-cart:hover,
.button-clear-cart:focus {
  color: var(--cyan);
  border-color: var(--cyan);
  outline: 0;
  text-decoration: none;
}

.remove {
  background-color: red;
  border-radius: 50%;
  padding: 5px 10px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

@media only screen and (max-width: 1030px) {
  .top-nav-bar {
    height: 118px;
    border-bottom: 0;
  }
  .search-box {
    width: 100%;
  }
  .top-nav-bar .search-box img.logo {
    height: 47px;
    margin: 10px 50px;
  }
  .top-nav-bar .search-box h1 {
    font-size: 32px;
  }
  .menu-bar {
    width: 100%;
  }
  .menu-bar ul {
    margin: 10px 0;
    width: 100%;
  }
  .menu-bar ul li {
    font-size: 18px;
    height: 70px;
    width: 100%;
  }
}
</style>
