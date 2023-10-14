<template>
  <div class="tw-flex tw-space-x-3">
    <div class="tw-flex-row tw-space-y-0 tw-h-12 tw-justify-between">
      <button-component type="primary" @click="openMenu">
        <span>Konfiguration</span>
        <span><img src="../../assets/icons/arr_down.svg" alt="add" /></span
      ></button-component>
    </div>
    <button-component type="secondary" @click="instruct">
      <span>Anweisung</span>
    </button-component>
    <div v-if="$store.state.showIntro"><Introduction></Introduction></div>

    <button-component type="secondary" @click="resetConfig">
      <span>Neuladen</span>
    </button-component>
  </div>
  <!-- <router-view></router-view> -->
</template>

<script>
import { useStore } from "vuex";

import ButtonComponent from "@/components/ButtonComponent.vue";
import Introduction from "../../views/IntroductionComp.vue";
import { ref } from "@vue/reactivity";
// import { useRouter } from "vue-router";
export default {
  name: "ElementNavigator",
  components: {
    ButtonComponent,
    Introduction,
  },
  setup() {
    // const router = useRouter();
    const store = useStore();
    const showMenu = ref(false);
    const showIntro = ref(false);
    const openMenu = () => {
      store.commit("CHANGE_MODAL");
    };
    const resetConfig = () => {
      store.commit("RESET_CONFIG");
    };
    const instruct = () => {
      store.commit("SHOW_INTRO");
    };
    return { store, openMenu, showMenu, resetConfig, instruct, showIntro };
  },
};
</script>

<style></style>
