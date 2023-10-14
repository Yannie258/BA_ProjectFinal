<template>
  <div class="tw-shadow-2xl tw-bg-white tw-rounded tw-p-8">
    <div v-if="!$store.state.exportReport" class="tw-p-10">
      <h1 class="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-400">
        Unser Report enthält noch keine Elemente
      </h1>
      <p class="tw-text-center tw-text-gray-500">
        Fügen Sie die gewünschen Elemente über die Schaltflächen hinzu.
      </p>
    </div>

    <div v-else class="tw-text-left tw-overflow-auto tw-max-w-[95%]">
      <div v-if="$store.state.chartType !== 'Kein'">
        <chart-area></chart-area>
      </div>

      <div v-if="!$store.state.showTreeTable">
        <DataTable
          v-model:filters="filters"
          filterDisplay="menu"
          :value="$store.state.data"
          :paginator="true"
          :rows="8"
          stripedRows
          dataKey="id"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Zeigen {first} zum {last} von {totalRecords} Beträge"
          :globalFilterFields="['rootLabel', 'label', 'r2_label', 'pageUrl']"
        >
          <template #header>
            <div class="tw-flex tw-justify-between">
              <button-component
                type="primary"
                label="Clear"
                @click="clearFilter()"
                >Löschen</button-component
              >
              <span class="p-input-icon-right">
                <i class="pi pi-search" />
                <input
                  class="tw-flex tw-justify-start tw-p-2"
                  v-model="filters['global'].value"
                  placeholder="Keywort suchen"
                />
              </span>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column
            field="rootLabel"
            :sortable="true"
            :header="$store.state.primaryDimension"
          ></Column>
          <Column
            v-if="$store.state.secondaryDimenHeaders.length === 1"
            :header="$store.state.secondaryDimenHeaders[0]"
            :sortable="true"
            field="label"
          ></Column>

          <Column
            v-if="$store.state.secondaryDimenHeaders.length === 2"
            :header="$store.state.secondaryDimenHeaders[0]"
            :sortable="true"
            field="r2_label"
          ></Column>
          <Column
            v-if="$store.state.secondaryDimenHeaders.length === 2"
            :header="$store.state.secondaryDimenHeaders[1]"
            :sortable="true"
            field="label"
          ></Column>
          <Column
            v-if="$store.state.showPageUrl"
            header="Seiten-URL"
            :sortable="true"
            field="pageUrl"
          ></Column>

          <Column
            v-for="(headerMetric, idx) in $store.state.metricHeaders"
            :key="idx"
            :field="headerOfMetric(headerMetric)"
            :header="headerMetric"
            :sortable="true"
          >
          </Column>
        </DataTable>
      </div>

      <div v-if="$store.state.showTreeTable">
        <tree-table></tree-table>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { metricTranslateName } from "../../services/helper/metricName.js";
import ChartArea from "../charts/ChartArea.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import ButtonComponent from "../ButtonComponent.vue";
import TreeTable from "./TreeTable.vue";

export default {
  components: {
    ChartArea,
    DataTable,
    Column,
    ButtonComponent,
    TreeTable,
  },
  setup() {
    const currentPage = ref(1);
    const totalPages = ref(0);
    const store = useStore();

    const newDataArray = ref([]);

    const metricList = ref([]);
    const headerOfMetric = (metricName) => {
      if (metricName === "Ereignisse") {
        return "events";
      }
      if (metricName === "Besuchen") {
        return "visits";
      } else return "";
    };
    const sumPages = ref();
    //  :globalFilterFields="['rootLabel', 'label', 'r2_label', 'pageUrl']"
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      rootLabel: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      label: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      r2_label: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      pageUrl: { value: null, matchMode: FilterMatchMode.IN },
    });

    // when only 1 secondary dimension is chosen, we just need subdata, because it includes all info from parent too.
    const handelData = () => {
      //array of subtable data
      newDataArray.value = [];
      store.state.data.map((d) => newDataArray.value.push(d.subtable));

      return newDataArray.value;
    };

    const transMetricValues = () => {
      metricList.value = [];
      store.state.metricHeaders.map((e) => {
        metricList.value.push(metricTranslateName(e));
      });
      return metricList.value;
    };
    const clearFilter = () => {
      initFilters();
    };
    const initFilters = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        rootLabel: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        label: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        r2_label: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        pageUrl: { value: null, matchMode: FilterMatchMode.IN },
      };
    };
    return {
      store,
      metricList,
      transMetricValues,
      handelData,
      newDataArray,
      currentPage,
      sumPages,
      totalPages,
      headerOfMetric,
      filters,
      clearFilter,
      initFilters,
    };
  },
};
</script>

<style></style>
