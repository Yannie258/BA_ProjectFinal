<template>
  <div class="tw-flex-row tw-space-y-5">
    <div class="tw-flex tw-space-x-10 tw-justify-start tw-absolute tw-right-20">
      <calendar />
    </div>
    <div class="tw-pt-5">
      <nav class="tw-p-10 tw-w-full">
        <sub-navigator />
      </nav>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref } from "vue";

import Calendar from "@/components/Calendar.vue";
import SubNavigator from "@/components/layout/SubNavigator.vue";

export default {
  name: "HeaderComponent",
  components: {
    Calendar,

    SubNavigator,
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>
