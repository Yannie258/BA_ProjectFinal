<template>
  <div
    class="absolute flex-col items-start w-screen top-20 h-screen text-orange-700 z-10 p-14 text-center flex-wrap"
  >
    <div class="relative ml-10 pl-28">
      <p class="">Visitors Report Abrufe/Zeiteinheit</p>
      <p class="bg-red-100">
        {{ items }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const items = ref([]);
    onMounted(async () => {
      await axios
        .post(
          "https://di-tools.t-systems-mms.com/matomo/?module=API&method=VisitorInterest.getNumberOfVisitsByVisitCount&idSite=1&period=day&date=yesterday&format=JSON",
          null,
          {
            params: {
              token_auth: "75ec70b4a582bc3a659820a96c0df4c0",
            },
          }
        )
        .then((response) => {
          console.log("response", response);
          items.value = response.data;
        });
    });

    return {
      items,
    };
  },
};
</script>

<style></style>
