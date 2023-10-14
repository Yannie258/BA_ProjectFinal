<template>
  <div class="bg-black text-white p-5 w-1/6 h-screen fixed z-50">
    <!-- <ul>
      <li v-for="(note, i) in categories" :key="i">{{ note }}</li>
    </ul>
    <input v-model="title" class="border" type="text" @keypress.enter="save" /> -->
    <!-- <p>Total categories: {{ totalCategories }}</p> -->
    <ul class="flex-row space-y-5">
      <li class="hover:bg-gray-600">
        <a href="#" @click="goToVisitors">Abfrage</a>
      </li>

      <li class="hover:bg-gray-600">
        <router-link to="/visitors">Besucher</router-link>
      </li>
      <li class="hover:bg-gray-600">
        <router-link to="/behaviors">Verhalten</router-link>
      </li>
      <li class="hover:bg-gray-600">
        <router-link to="/acquisition">Akquisition</router-link>
      </li>
      <li class="hover:bg-gray-600">
        <router-link to="/ecommerce">Ecommerce</router-link>
      </li>
      <li class="hover:bg-gray-600">
        <router-link to="/target">Ziele</router-link>
      </li>
      <li class="hover:bg-gray-600">
        <router-link to="/marketPlace">Marketplace</router-link>
      </li>
    </ul>
  </div>
  <router-view />
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "SideBar",
  components: {},
  setup() {
    const store = useStore();
    const categories = computed(() => store.state.categories);
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
      categories,
      save,
      title,
    };
  },
};
</script>
