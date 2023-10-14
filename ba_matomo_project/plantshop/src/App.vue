<template>
  <div v-if="getAccess ()" id="app">
    <Header />
    <Menu />
    <BreadCrump />
    <router-view />
    <Footer />
  </div>
  <div v-else id="app">
    <div>
    <div class="container text-center">
      <h2>Please enter password to access this page.</h2>

      <div class="row">
        <div class="col-md-6 offset-md-3">
          <form v-on:submit.prevent="validateBeforeSubmit">
            <div class="form-group text-left">
              <label class="custom-label control-label">Password</label>
              <input class="form-control password-field" type="password" name="password" v-model.trim="password" id ="testID">
              <span class="error help-block" ></span>
            </div>
            <div class="text-danger" v-if="error"><p>Incorrect password.</p></div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Menu from "@/components/layout/Menu.vue";
import Footer from "@/components/layout/Footer.vue";
import BreadCrump from "@/components/layout/BreadCrump.vue";


export default {
  name: "App",
  components: {
    Header,
    Footer,
    Menu,
    BreadCrump
  },
  data (){
    return{
      error: null,
      password: null,
      access: false
    }
  },
  methods: {
    validateBeforeSubmit() {
      if (this.password === "test123") {
        this.error = false;
        this.access = true;
        window.localStorage.setItem("user", "allow");
        this.$router.push("/" + this.$i18n.locale);
      } else {
        this.error = true;
      }
    },
    getAccess() {
      if (window.localStorage.getItem("user") == "allow") {
        this.access = true;
        return this.access;
      } else {
        return this.access;
      }
    }
  }
};
</script>

<style>
@font-face {
  font-family: TeleGroteskMedium;
  src: url(./assets/fonts/telegrotesknext-medium.woff) format("woff"),
    url(./assets/fonts/telegrotesknext-medium.woff2) format("woff2");
}

:root {
  /* Colour Variables Telekom Brand Design */
  --magenta: #e20074 !important;
  --white: #ffffff !important;
  --black: #4b4b4b !important;
  --superlightgrey: #eeeeee !important;
  --lightgrey: #a4a4a4 !important;
  --darkgrey: #6c6c6c !important;
  --darkblue: #1063ad !important;
  --lightblue: #53baf2 !important;
  --cyan: #1bada2 !important;
  --green: #bfcb44 !important;
  --yellow: #ffd329 !important;
  --orange: #ff9a1e !important;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: TeleGroteskMedium !important;
  background-color: var(--white);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--darkgrey);
}

a {
  cursor: pointer;
}
</style>
