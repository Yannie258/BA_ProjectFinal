<template>
  <div class="tw-flex tw-space-x-3 tw-justify-center tw-items-center">
    <div class="tw-flex tw-space-x-3">
      <!-- only allow chosing until current day -->
      <!-- reformate day form to YYYY-MM-DD -->
      <label for="">Von</label>
      <Datepicker
        v-model="dateFrom"
        :format="formatFrom"
        :maxDate="new Date()"
      />
    </div>
    <div class="tw-flex tw-space-x-3">
      <label for="">Bis</label>
      <Datepicker
        v-model="dateTo"
        :format="formatTo"
        :maxDate="new Date()"
      ></Datepicker>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { Datepicker },
  setup() {
    const store = useStore();
    const dateFrom = ref(new Date());
    const dateTo = ref(new Date());

    //format Day

    const formatFrom = (dateFrom) => {
      const day = ("0" + dateFrom.getDate()).slice(-2);
      const month = ("0" + (dateFrom.getMonth() + 1)).slice(-2);
      const year = dateFrom.getFullYear();

      let result = `${year}-${month}-${day}`;

      //committing a mutation in vue store to update change state
      store.commit("UPDATE_DAY_BEGIN", result);

      return result.toString();
    };

    const formatTo = (dateTo) => {
      const day = ("0" + dateTo.getDate()).slice(-2);
      const month = ("0" + (dateTo.getMonth() + 1)).slice(-2);

      const year = dateTo.getFullYear();
      let result = `${year}-${month}-${day}`;
      //committing a mutation in vue store to update change state
      store.commit("UPDATE_DAY_END", result);

      return result.toString();
    };

    return {
      dateFrom,
      dateTo,
      formatFrom,
      formatTo,
    };
  },
};
</script>

<style></style>
