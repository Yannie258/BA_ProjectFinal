<template>
  <div v-if="$store.state.showTreeTable"></div>
  <tree-table
    :value="$store.state.data"
    :paginator="true"
    :rows="10"
    sortMode="multiple"
    :filters="filters"
    filterMode="lenient"
  >
    <template #header>
      <div class="text-right">
        <div class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <InputText
            v-model="filters['global']"
            placeholder="Global Search"
            size="50"
          />
        </div>
      </div>
    </template>
    <column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :expander="col.expander"
      :sortable="true"
    >
    </column>
  </tree-table>
</template>

<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TreeTable,
    Column,
    InputText,
  },
  setup() {
    const filters = ref({});

    const store = useStore();

    const getData = computed(() => {
      return store.state.showPageUrl;
    });

    //whenever the user change his option, data state has been updated
    const columns = computed(() => {
      return [
        {
          field: "label",
          header: "Ereigniselement",
          expander: store.state.showPageUrl ? true : false,
        },
        { field: "events", header: "Ereignisse" },
        { field: "visits", header: "Besuche" },
      ];
    });

    return {
      columns,
      filters,

      store,
      getData,
    };
  },
};
</script>

<style></style>
