<template>
  <div class="login">
    <div class="form-box">
      <div class="button-box">
        <div id="btn"></div>
        <button id="login-btn" class="abc" @click="showLogin();" onclick="return tag.click.send({elem:this, name:'login', chapter1:'switch-bar', chapter2:'button', type:'action'});">{{ $t("login.login") }}</button>
        <button id="register-btn" class ="def" @click.stop.prevent="showSignup()" onclick="return tag.click.send({elem:this, name:'register', chapter1:'switch-bar', chapter2:'button', type:'action'});">{{ $t("login.register") }}</button>
      </div>

      <SocialIcons />

      <form id="login-form">
        <input id="user" type="text" placeholder="Username" v-model="login_username" required />
        <input id="pass" type="password" placeholder="Password" v-model="login_password" required />
        <span id="error" style="color: red"> </span> 

        <button type="submit" class="login_submit" @click.stop.prevent="login">{{ $t("login.login") }}</button>
        <div class="alert alert-success" v-if="message">{{ message }}</div>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
      </form>

      <form id="register-form">
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="password" placeholder="Passwort" v-model="password_repeat" />
        <button type="submit" class ="login_register" @click.stop.prevent="signUp" onclick="return tag.click.send({elem:this, name:'register', chapter1:'request-button', chapter2:'user-login-button', type:'action'});">{{ $t("login.register") }}</button>
        <div class="alert alert-success" v-if="message">{{ message }}</div>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import SocialIcons from "@/components/SocialIcons.vue";
import AuthService from '@/services/AuthService.js';
export default {
  name: "Login",
  components: {
    SocialIcons
  },
  data() {
    return {
      authenticated: true,
      mockAccount: {
        mockuser: "testAccount",
        mockpass: "test235"
      },
      username: "",
      password: "",
      password_repeat: "",
      login_username: "",
      login_password: "",
      message: "",
      error: ""
    };
  },
  methods: {
    showSignup() {
      document.getElementById("login-form").style.left = "-400px";
      document.getElementById("register-form").style.left = "50px";
      document.getElementById("btn").style.left = "110px";
      document.getElementById("login-btn").style.color = "var(--darkgrey)";
      document.getElementById("register-btn").style.color = "var(--white)";
    },
    showLogin() {
      document.getElementById("login-form").style.left = "50px";
      document.getElementById("register-form").style.left = "450px";
      document.getElementById("btn").style.left = "0";
      document.getElementById("login-btn").style.color = "var(--white)";
      document.getElementById("register-btn").style.color = "var(--darkgrey)";
    },
    clearMessage() {
      setTimeout(() => {
        this.message = this.error = "";
      }, 3000);
    },
    async signUp() {
       try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = 'Something went wrong';
      }
      /*try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        };
        await axios
          .post("http://localhost:3000/users/" + "sign-up", credentials)
          .then(response => {
            this.error = "";
            this.message =
              "The user " +
              response.data.username +
              " has been succesfully created";
          });
        this.clearMessage();
      } catch (error) {
        this.message = "";
        this.error = error.response.data.message;
        this.clearMessage();
      }*/
    },
    auth (){
      if(this.authenticated){
        this.authenticated = false;
      }
      else{
        this.authenticated = true;
      }
    },
    async login() {
      try{
        const credentials = {
          username: this.username,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const token = response.token;
        const user = response.user;
        this.$store.dispatch('login', { token, user });
        this.$router.push("/" + this.$i18n.locale + "/address");
      }
       catch (error) {
        this.msg = 'Something went wrong';
      }
      /*try {
        const credentials = {
          username: this.login_username,
          password: this.login_password
        };
        await axios
          .post("http://localhost:3000/users/" + "login", credentials)
          .then(response => {
            this.message =
              response.data.user.username + " " + response.data.message;
          });
        setTimeout(() => {
          this.$router.push("/" + this.$i18n.locale + "/success");
        }, 3000);
      } catch (error) {
        this.error = error.response.data.message;
        this.clearMessage();
      }*/
      if ((this.login_username === this.mockAccount.mockuser)
        &&(this.login_password === this.mockAccount.mockpass)){
          this.auth();
          localStorage.setItem("useracc", "loggedin");
          setTimeout(() => {
          this.$router.push("/" + this.$i18n.locale + "/address");
        }, 100);
      } else {
        document.getElementById("error").innerHTML =
          "Username or Password Invalid !";
      }
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/img/flower-banner.jpg");
  background-position: center;
  background-size: cover;
  position: absolute;
}
.login .form-box {
  width: 380px;
  height: 530px;
  position: relative;
  margin: 10% auto;
  background: var(--white);
  padding: 5px;
  border-radius: 30px;
  overflow: hidden;
}
.login .form-box .button-box {
  width: 220px;
  margin: 35px auto;
  position: relative;
  box-shadow: 0 0 20px 9px var(--cyan);
  border-radius: 30px;
}
.login .form-box .button-box #btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 100%;
  background: var(--cyan);
  border-radius: 30px;
  transition: 0.5s;
}
.login .form-box .button-box button {
  padding: 10px 30px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
}
.login .form-box .button-box #login-btn {
  color: var(--white);
}
.login .form-box .button-box #register-btn {
  color: var(--darkgrey);
}
.login .form-box form {
  position: absolute;
  top: 180px;
  width: 280px;
  transition: 0.5s;
}
.login .form-box form input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border-right: 0;
  border-top: 0;
  border-left: 0;
  border-bottom: 1px solid var(--lightgrey);
  outline: none;
  background: transparent;
}
.login .form-box form input[type="checkbox"] {
  margin: 30px 10px 30px 0px;
}
.login .form-box form label {
  color: var(--lightgrey);
  font-size: 12px;
  position: absolute;
  bottom: 165px;
}
.login .form-box form button[type="submit"] {
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  background: var(--cyan);
  color: var(--white);
  border: 0;
  outline: none;
  border-radius: 30px;
  margin: 10%;
}
.login .form-box form#login-form {
  left: 50px;
}
.login .form-box form#register-form {
  left: 450px;
}

@media only screen and (max-width: 600px) {
  .login .form-box {
    margin-top: 30%;
    width: 300px;
  }
  .login .form-box form {
    width: 200px;
  }
}
</style>
