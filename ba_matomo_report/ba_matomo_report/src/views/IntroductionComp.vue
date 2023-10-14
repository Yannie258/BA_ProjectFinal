<template>
  <div
    class="tw-overflow-x-hidden tw-overflow-y-auto tw-fixed tw-max-h-[80%] tw-inset-2 tw-top-12 tw-z-50"
  >
    <div class="tw-relative tw-w-auto tw-my-6 tw-mx-auto tw-max-w-6xl">
      <div
        class="tw-border-0 tw-rounded-lg tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-bg-gray-100 tw-outline-none tw-focus:outline-none"
      >
        <h3 class="tw-text-3xl tw-font-semibold tw-m-5">
          Hinweis zum App-Nutzung
        </h3>
        <div
          class="tw-border-t tw-border-solid tw-border-slate-200 tw-justify-end tw-space-x-5 tw-w-full tw-p-5"
        >
          <div class="tw-pl-5">
            <span class="tw-font-bold">Betrachten des Zeitpunkts:</span>
            <span> wählen Sie Start- und Endzeit im Eingabefeld aus. </span>
          </div>
          <div class="tw-pl-0">
            <span class="tw-font-bold"> Primäre Dimensionsauswahl:</span>
            <span> wählen Sie eine Option in der Liste. </span>
          </div>
          <div class="tw-pl-0">
            <span class="tw-font-bold">Sekundäre Dimensionsauswahl:</span>
            <span>
              wählen Sie die mögliche Option der Dimension aus (Mehrfachnennung
              möglich).</span
            >
          </div>
          <div class="tw-pl-0">
            <span class="tw-font-bold">Metrikenauswahl:</span>
            <span>
              wählen Sie die Metrikenauswahl aus (Mehrfachnennung möglich).
              <span class="tw-italic tw-font-bold tw-text-gray-500"
                >Ereignisse:</span
              >
              Anzahl den geladenen Dateien der Webseite und
              <span class="tw-font-bold tw-italic tw-text-gray-500"
                >Besuche:</span
              >
              Anzahl des Besuchens aus.
            </span>
          </div>
          <div class="tw-pl-0">
            <span class="tw-font-bold">Diagrammdarstellung:</span>
            <span> wählen Sie eine Option in der Liste für Diagramm aus. </span>
          </div>
        </div>

        <div
          class="tw-flex tw-border-t tw-border-solid tw-border-slate-200 tw-justify-end tw-space-x-5 tw-h-20 tw-w-full tw-p-3"
        >
          <button-component @click="closeIntro"
            ><span>Schließen</span></button-component
          >
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="$store.state.showIntro"
    class="tw-absolute tw-inset-0 tw-z-40 tw-opacity-50 tw-bg-black"
  ></div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Introduction",
  components: {
    ButtonComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const closeIntro = () => {
      store.commit("SHOW_INTRO");
    };
    return {
      closeIntro,
    };
  },
};
</script>

<style>
/* @import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss"; */
</style>
