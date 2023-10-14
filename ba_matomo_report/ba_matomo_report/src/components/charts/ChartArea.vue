<template>
  <div>
    <!-- Chart component includes 2 properties : data and option design  -->
    <!-- vertical bar chart -->
    <div v-if="$store.state.chartType === 'Säulendiagramm'">
      <div v-if="$store.state.secondaryDimenHeaders.length === 0" class="card">
        <Chart type="bar" :data="basicData" :options="basicOptions" />
      </div>
      <div v-if="$store.state.secondaryDimenHeaders.length === 1" class="card">
        <Chart type="bar" :data="basicData1" :options="basicOptions" />
      </div>
      <div v-if="$store.state.secondaryDimenHeaders.length === 2" class="card">
        <Chart type="bar" :data="basicData2" :options="basicOptions" />
      </div>
      <div
        v-if="pageUrlOption && $store.state.secondaryDimenHeaders.length === 2"
        class="card"
      >
        <Chart type="bar" :data="basicData2" :options="basicOptions" />
      </div>
    </div>
    <!-- Line chart -->
    <div v-if="$store.state.chartType === 'Liniendiagramm'">
      <div v-if="$store.state.secondaryDimenHeaders.length === 0" class="card">
        <Chart type="line" :data="basicData" :options="basicOptions" />
      </div>
      <div v-if="$store.state.secondaryDimenHeaders.length === 1" class="card">
        <Chart type="line" :data="basicData1" :options="basicOptions" />
      </div>
      <div v-if="$store.state.secondaryDimenHeaders.length === 2" class="card">
        <Chart type="line" :data="basicData2" :options="basicOptions" />
      </div>
      <div
        v-if="pageUrlOption && $store.state.secondaryDimenHeaders.length === 2"
        class="card"
      >
        <Chart type="line" :data="basicData2" :options="basicOptions" />
      </div>
    </div>
    <!-- horizon bar chart -->
    <div v-if="$store.state.chartType === 'Balkendiagramm'">
      <div v-if="$store.state.secondaryDimenHeaders.length === 0">
        <Chart type="bar" :data="basicData" :options="horizontalOptions" />
      </div>
      <div v-if="$store.state.secondaryDimenHeaders.length === 1">
        <Chart type="bar" :data="basicData1" :options="horizontalOptions" />
      </div>
      <div v-if="$store.state.secondaryDimenHeaders.length === 2">
        <Chart type="bar" :data="basicData2" :options="horizontalOptions" />
      </div>
      <div
        v-if="pageUrlOption && $store.state.secondaryDimenHeaders.length === 2"
      >
        <Chart type="bar" :data="basicData2" :options="horizontalOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "primevue/chart";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Chart,
  },
  setup() {
    const store = useStore();

    const getValue = computed(() => {
      return store.state.data;
    });
    const getHeader = computed(() => {
      return store.state.secondaryDimenHeaders;
    });

    const basicData = computed(() => {
      return {
        labels: getValue.value.map((d) => d.rootLabel),
        datasets: [
          {
            label: "Besuchen",
            backgroundColor: "#42A5F5",
            data: getValue.value.map((d) => {
              if (store.state.metricHeaders.includes("Besuchen")) {
                return d.visits;
              } else return;
            }),
          },
          {
            label: "Ereignisse",
            backgroundColor: "#FFB562",
            data: getValue.value.map((d) => {
              if (store.state.metricHeaders.includes("Ereignisse")) {
                return d.events;
              } else return;
            }),
          },
        ],
      };
    });
    const basicData1 = computed(() => {
      return {
        labels: getValue.value.map((d) => `${d.rootLabel}-${d.label}`),
        datasets: [
          {
            label: "Besuchen",
            backgroundColor: "#42A5F5",
            data: getValue.value.map((d) => {
              if (store.state.metricHeaders.includes("Besuchen")) {
                return d.visits;
              } else return;
            }),
          },
          {
            label: "Ereignisse",
            backgroundColor: "#FFB562",
            data: getValue.value.map((d) => {
              if (store.state.metricHeaders.includes("Ereignisse")) {
                return d.events;
              } else return;
            }),
          },
        ],
      };
      // } else return 0;
    });
    const basicData2 = computed(() => {
      if (getHeader.value.length === 2) {
        return {
          labels: getValue.value.map(
            (d) => `${d.rootLabel}-${d.r2_label}-${d.label}`
          ),

          datasets: [
            {
              label: "Besuchen",
              backgroundColor: "#42A5F5",
              data: getValue.value.map((d) => {
                if (store.state.metricHeaders.includes("Besuchen")) {
                  return d.visits;
                } else return;
              }),
            },
            {
              label: "Ereignisse",
              backgroundColor: "#FFB562",
              data: getValue.value.map((d) => {
                if (store.state.metricHeaders.includes("Ereignisse")) {
                  return d.events;
                } else return;
              }),
            },
          ],
        };
      } else return 0;
    });

    const basicOptions = ref({
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    });
    const horizontalOptions = ref({
      indexAxis: "y",
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    });

    return {
      basicData,
      basicData1,
      basicData2,
      basicOptions,
      store,
      getValue,
      getHeader,
      horizontalOptions,
    };
  },
};
</script>

<style></style>
