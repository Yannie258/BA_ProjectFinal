<template>
  <div>
    <header-component />
    <modal-component />
    <report-area />
  </div>
</template>

<script>
import HeaderComponent from "../components/layout/HeaderComponent.vue";
import ReportArea from "@/components/layout/ReportArea.vue";
import ModalComponent from "@/components/layout/ModalComponent.vue";

export default {
  name: "Home",
  components: {
    HeaderComponent,
    ReportArea,
    ModalComponent,
  },
};
</script>

<style>
/* @import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss"; */
</style>
