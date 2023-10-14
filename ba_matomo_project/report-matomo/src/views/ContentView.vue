<template>
  <div class="p-5 z-10 h-screen">
    <h1>This is an ContentView page</h1>
    <!-- <input v-model="title" class="border" type="text" @keypress.enter="save" /> -->
    <!-- <p>Total categories: {{ totalCategories }}</p> -->
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "ContentView",
  components: {},
  setup() {
    const store = useStore();

    const totalCategories = computed(() => store.getters.totalCategories);
    const title = ref("");
    const save = () => {
      //call mutation
      // store.commit("SAVE_NOTE", title.value);
      //call actions
      store.dispatch("saveNote", title.value);
      title.value = "";
    };
    return {
      totalCategories,

      save,
      title,
    };
  },
};
</script>
