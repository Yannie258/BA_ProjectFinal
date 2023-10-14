<template>
  <div
    v-if="$store.state.showModal"
    class="tw-overflow-x-hidden tw-overflow-y-auto tw-fixed tw-max-h-[80%] tw-inset-2 tw-top-12 tw-z-50"
  >
    <div class="tw-relative tw-w-auto tw-my-6 tw-mx-auto tw-max-w-6xl">
      <div
        class="tw-border-0 tw-rounded-lg tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-bg-white tw-outline-none tw-focus:outline-none"
      >
        <div
          class="tw-p-5 tw-border-b tw-border-solid tw-border-slate-200 tw-rounded-t tw-bg-white"
        >
          <h3 class="tw-text-3xl tw-font-semibold">Konfiguration</h3>
        </div>

        <div
          class="tw-relative tw-p-6 tw-flex tw-items-center tw-justify-start tw-w-full"
        >
          <form class="tw-w-full">
            <div class="tw-py-5 tw-flex tw-space-x-9">
              <label class="tw-text-2xl" for="">Authentifizierung</label>
              <input
                class="tw-border tw-w-96 tw-pl-3"
                v-model="userToken"
                type="text"
                placeholder="Geben Sie Ihr Token an Matomo API ein"
              />
            </div>
            <div
              class="tw-py-5 tw-w-full tw-border-2 tw-p-3 tw-border-solid tw-border-slate-200 tw-rounded-t tw-bg-white"
            >
              <p class="tw-text-2xl">Daten Darstellung</p>
              <br />
              <div class="tw-flex tw-space-x-3">
                <!-- <dimension-config @updatePrimaryDimens="updatePrimaryDimens" /> -->
                <div>
                  <h1 class="tw-text-lg tw-text-red-900">Dimension</h1>
                  <!-- select Primary Dimension  -->
                  <div class="tw-flex tw-space-x-7">
                    <p class="tw-font-bold">Primäre Dimension:</p>
                    <select
                      v-model="primaryDimension"
                      @change="onChangePrimaryDimension($event)"
                    >
                      <option disabled value="">Primäre Dimension</option>
                      <option>Ereigniskategorie</option>
                      <option>Ereignisname</option>
                      <option>Ereignisaktion</option>
                    </select>

                    <div class="tw-text-red-600">{{ primaryDimension }}</div>
                  </div>

                  <!-- select secondary Dimension  -->
                  <h3 class="tw-font-bold">Sekundäre Dimension:</h3>
                  <div class="tw-flex tw-space-x-5">
                    <div v-if="primaryDimension" class="tw-flex tw-space-x-14">
                      <label
                        v-for="(dim, _id) in secondaryDimensionOptions()"
                        :key="_id"
                        for="id"
                      >
                        {{ dim }}
                        <input
                          id="id"
                          v-model="selectedSecDimens"
                          type="checkbox"
                          :value="dim"
                      /></label>

                      <!-- list selected secondary dimension -->

                      <div>
                        <p v-for="(sec, i) in selectedSecDimens" :key="i">
                          {{ i + 1 }}. {{ sec }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div v-if="activePageUrl()">
                    <br />

                    <label for="pageUrl">
                      <input
                        id="pageUrl"
                        v-model="selected"
                        type="checkbox"
                        @change="onActiveUrl($event)"
                      />Seiten-URL nach Ereignisname anzeigen</label
                    >
                  </div>
                </div>
              </div>
              <div>
                <!-- <metric-config /> -->
                <br />
                <div>
                  <h1 class="tw-text-lg tw-text-red-900">Metriken</h1>
                  <div class="tw-flex tw-justify-start tw-space-x-7">
                    <div class="tw-flex tw-space-x-5">
                      <label
                        v-for="(metric, _id) in $store.state.metrics"
                        :key="_id"
                        for="metrics"
                      >
                        {{ metric }}
                        <input
                          id="metrics"
                          v-model="selectedMetrics"
                          type="checkbox"
                          :value="metric"
                      /></label>
                      <div>
                        <p v-for="(met, i) in selectedMetrics" :key="i">
                          {{ i + 1 }}. {{ met }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div>
                  Baum-Tabelle
                  <input-switch
                    class="tw-h-6 tw-w-10 tw-ml-5"
                    v-model="checkedTreeTable"
                  ></input-switch>
                </div>
              </div>
            </div>

            <div
              class="tw-flex-row tw-space-y-7 tw-border-t tw-border-solid tw-border-slate-200 tw-pt-5 tw-rounded-b tw-justify-start tw-items-center"
            >
              <label class="tw-text-2xl" for="">Diagramm Darstellung</label>
              <div class="tw-flex tw-space-x-7">
                <label class="" for="">Diagrammsart</label>
                <select
                  v-model="chartType"
                  class="tw-border"
                  value=""
                  @change="onChangeChartType($event)"
                >
                  <option value="" disabled>Diagrammsart anzeigen</option>
                  <option>Kein</option>
                  <option>Säulendiagramm</option>
                  <option>Balkendiagramm</option>
                  <option>Liniendiagramm</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div
          class="tw-flex tw-border-t tw-border-solid tw-border-slate-200 tw-justify-end tw-space-x-5 tw-h-20 tw-w-full tw-p-3"
        >
          <button-component type="secondary" @click="closeModal">
            Schließen
          </button-component>
          <button-component type="primary" @click="saveConfig">
            Speichern
          </button-component>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="$store.state.showModal"
    class="tw-absolute tw-inset-0 tw-z-40 tw-opacity-50 tw-bg-black"
  ></div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import ButtonComponent from "../ButtonComponent.vue";
import InputSwitch from "primevue/inputswitch";
export default {
  components: {
    ButtonComponent,
    InputSwitch,
  },
  setup() {
    const store = useStore();
    const updatePrimaryDimens = ref("");
    const selected = ref(false);
    const primaryDimension = ref("");
    const selectedSecDimens = ref([]);
    const secondaryDimension = ref("");
    const pageUrlOption = ref(false);
    const newSecondaryDimensions = ref([]);
    const selectedMetrics = ref([]);
    const chartType = ref("");
    const showPageUrl = ref(false);
    const userToken = ref("");
    const closeModal = () => {
      store.commit("CHANGE_MODAL");
    };
    const checkedTreeTable = ref(false);

    const onActiveUrl = (e) => {
      selected.value = e.target.checked;

      return selected.value;
    };

    const activePageUrl = () => {
      const concatDimension = [].concat(
        primaryDimension.value,
        selectedSecDimens.value
      );

      if (concatDimension.includes("Ereignisname")) {
        return true;
      } else {
        return false;
      }
    };
    const onChangePrimaryDimension = (e) => {
      primaryDimension.value = e.target.value;
      selectedSecDimens.value = [];
    };
    const onChangeChartType = (e) => {
      chartType.value = e.target.value;
    };

    const secondaryDimensionOptions = () => {
      newSecondaryDimensions.value = store.state.secondaryDimensions.filter(
        (dim) => dim !== primaryDimension.value
      );
      return newSecondaryDimensions.value;
    };

    const saveConfig = async () => {
      if (!userToken.value) {
        alert("Tragen Sie bitte Ihr Token für Authentifizierung ein!");
        return;
      }
      if (!primaryDimension.value) {
        alert("Wählen Sie bitte eine primäre Dimension!");
        return;
      }
      store.commit("UPDATE_TOKEN", userToken.value);
      store.commit("UPDATE_PRIMARY_DIMENSION", primaryDimension.value);
      store.dispatch("loadData");
      store.commit("CHANGE_MODAL");
      store.commit("UPDATE_REPORT");
      store.commit("UPDATE_CHART", chartType.value);

      if (selectedSecDimens.value) {
        store.commit("UPDATE_SECONDARY_DIMENSION_COL", selectedSecDimens.value);
      }
      if (selectedMetrics.value) {
        store.commit("UPDATE_METRIC_COL", selectedMetrics.value);
      }
      if (selectedSecDimens.value) {
        store.commit("UPDATE_SECONDARY_DIMENSION_COL", selectedSecDimens.value);
      }
      if (selectedMetrics.value) {
        store.commit("UPDATE_METRIC_COL", selectedMetrics.value);
      }
      if (activePageUrl()) {
        store.commit("UPDATE_PAGE_URL", selected.value);
      } else store.commit("UPDATE_PAGE_URL", false);

      store.commit("UPDATE_TREE_TABLE", checkedTreeTable.value);
    };
    return {
      store,
      closeModal,
      saveConfig,
      selected,
      updatePrimaryDimens,
      activePageUrl,
      onChangePrimaryDimension,
      primaryDimension,
      secondaryDimensionOptions,
      secondaryDimension,
      newSecondaryDimensions,
      selectedSecDimens,
      selectedMetrics,
      onChangeChartType,
      chartType,
      showPageUrl,
      onActiveUrl,
      pageUrlOption,
      checkedTreeTable,
      userToken,
    };
  },
};
</script>

<style></style>
