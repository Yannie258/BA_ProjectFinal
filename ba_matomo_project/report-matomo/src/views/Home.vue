<template>
  <div class="flex z-10">
    <!-- <nav>
      <router-link to="/home"></router-link>
      <router-link to="/about"></router-link>
    </nav> -->
    <div class="w-1/6">
      <side-bar />
    </div>
    <div class="w-5/6 bg-blue-200">
      <content-view />
    </div>

    <!-- <p class="p-5 w-4/6">{{ $store.state.title }}</p> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import ContentView from "./ContentView.vue";
export default {
  name: "Home",
  components: { SideBar, ContentView },
};
</script>

<style></style>
