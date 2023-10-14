<template>
  <footer class="footer footer-distributed">
    <div class="footer-left">
      <img src="@/assets/img/logo_white_200x200.png" />
      <h3>
        About
        <span>Plant-Shop</span>
      </h3>

      <p class="footer-links">
        <a id="footerHome" href="#" onclick="return tag.click.send({elem:this, name:'home', chapter1:'footer', chapter2:'left', type:'action'});">Home</a>
        |
        <a id="footerBlog" href="#" onclick="return tag.click.send({elem:this, name:'blog', chapter1:'footer', chapter2:'left', type:'action'});">Blog</a>
        |
        <a id="footerAbout" href="#" onclick="return tag.click.send({elem:this, name:'about', chapter1:'footer', chapter2:'left', type:'action'});">About</a>
        |
        <a id="footerContact" href="#" onclick="return tag.click.send({elem:this, name:'contact', chapter1:'footer', chapter2:'left', type:'action'});">Contact</a>
      </p>

      <p class="footer-company-name">© 2019 T-Systems Multi-Media-Solutions.</p>
    </div>

    <div class="footer-center">
      <div>
        <i class="fa fa-map-marker"></i>
        <p>
          <span>Riesaer Str. 5, 01129 Dresden</span>
          01069 Dresden
        </p>
      </div>

      <div>
        <i class="fa fa-phone"></i>
        <p>+49 351 28200</p>
      </div>
      <div>
        <i class="fa fa-envelope"></i>
        <p>
          <a id="mailto" href="mailto:arvid.strauss@t-systems.com" onclick="return tag.click.send({elem:this, name:'arvid.strausst-systems.com', chapter1:'footer', chapter2:'center-mail-to', type:'action'});"
            >arvid.strauss@t-systems.com</a
          >
        </p>
      </div>
    </div>
    <div class="footer-right">
      <p class="footer-company-about">
        <span>About the company</span>
        We not only sell plants :-)
      </p>
      <div class="footer-icons">
        <a id="footerFB" href="#" class="facebook" onclick="return tag.click.send({elem:this, name:'facebook', chapter1:'footer', chapter2:'right-social', type:'action'});">
          <i class="fa fa-facebook"></i>
        </a>
        <a id="footerTW" href="#" class="twitter" onclick="return tag.click.send({elem:this, name:'twitter', chapter1:'footer', chapter2:'right-social', type:'action'});">
          <i class="fa fa-twitter"></i>
        </a>
        <a id="footerIG" href="#" class="instagram" onclick="return tag.click.send({elem:this, name:'instagram', chapter1:'footer', chapter2:'right-social', type:'action'});">
          <i class="fa fa-instagram"></i>
        </a>
        <a id="footerLK" href="#" class="linkedin" onclick="return tag.click.send({elem:this, name:'linkedin', chapter1:'footer', chapter2:'right-social', type:'action'});">
          <i class="fa fa-linkedin"></i>
        </a>
        <a id="footerYT" href="#" class="youtube" onclick="return tag.click.send({elem:this, name:'youtube', chapter1:'footer', chapter2:'right-social', type:'action'});">
          <i class="fa fa-youtube"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
@media (max-height: 800px) {
  footer {
    position: static;
  }
}

.footer-distributed {
  background-color: var(--cyan);
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  padding: 50px 50px 60px 50px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right {
  display: inline-block;
  vertical-align: top;
}

/* Footer left */

.footer-distributed .footer-left {
  width: 30%;
}

.footer-distributed h3 {
  color: var(--white);
  font-size: 36px;
  margin: 0;
}

/* The company logo */

.footer-distributed .footer-left img {
  width: 30%;
}

.footer-distributed h3 span {
  color: var(--orange);
}

/* Footer links */

.footer-distributed .footer-links {
  color: var(--white);
  margin: 20px 0 12px;
}

.footer-distributed .footer-links a {
  display: inline-block;
  line-height: 1.8;
  text-decoration: none;
  color: inherit;
}

.footer-distributed .footer-company-name {
  color: var(--white);
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}

/* Footer Center */

.footer-distributed .footer-center {
  width: 35%;
}

.footer-distributed .footer-center i {
  background-color: var(--darkgrey);
  color: var(--white);
  font-size: 25px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin: 10px 15px;
  vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope {
  font-size: 17px;
  line-height: 38px;
}

.footer-distributed .footer-center p {
  display: inline-block;
  color: var(--white);
  vertical-align: middle;
  margin: 0;
}

.footer-distributed .footer-center p span {
  display: block;
  font-weight: normal;
  font-size: 14px;
  line-height: 2;
}

.footer-distributed .footer-center p a {
  color: var(--white);
  text-decoration: none;
}

/* Footer Right */

.footer-distributed .footer-right {
  width: 30%;
}

.footer-distributed .footer-company-about {
  line-height: 20px;
  color: var(--white);
  font-size: 13px;
  font-weight: normal;
  margin: 0;
}

.footer-distributed .footer-company-about span {
  display: block;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-distributed .footer-icons {
  margin-top: 25px;
}

.footer-distributed .footer-icons a {
  display: inline-block;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: var(--darkgrey);
  border-radius: 2px;

  font-size: 20px;
  color: var(--white);
  text-align: center;
  line-height: 35px;

  margin-right: 3px;
  margin-bottom: 5px;
}

/* Here is the code for Responsive Footer */
/* You can remove below code if you don't want Footer to be responsive */

@media (max-width: 880px) {
  .footer-distributed .footer-left,
  .footer-distributed .footer-center,
  .footer-distributed .footer-right {
    display: block;
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }

  .footer-distributed .footer-center i {
    margin-left: 0;
  }
}
</style>
