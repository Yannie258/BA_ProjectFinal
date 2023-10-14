<template>
  <!-- language switcher https://forum.pinegrow.com/t/bootstrap-4-multilingual-site-menu/1720  -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
    <div class="collapse navbar-collapse" id="navbarsExample09">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="http://example.com"
            id="dropdown09"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><span class="flag-icon flag-icon-gb"> </span> English</a
          >
          <div class="dropdown-menu" aria-labelledby="dropdown09">
            <a class="dropdown-item" href="#fr"
              ><span class="flag-icon flag-icon-de"> </span> Deutsch</a
            >
            <a class="dropdown-item" href="#it"
              ><span class="flag-icon flag-icon-it"> </span> Italian</a
            >
            <a class="dropdown-item" href="#ru"
              ><span class="flag-icon flag-icon-ru"> </span> Russian</a
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "LanguageSwitcherPine"
};
</script>

<style scoped></style>
