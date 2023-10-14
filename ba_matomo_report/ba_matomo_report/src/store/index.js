import { createStore } from "vuex";
import { callApi, subDataTableAPI } from "@/services/api.js";
import { pageUrlApi } from "@/services/pageUrlApi.js";
import { secondDimensionTranslateName } from "../services/helper/secondDimension.js";
import { primaryDimensionTransName } from "../services/helper/primaryDimensionTransName.js";

const store = createStore({
  state: {
    data: [],
    dayBegin: "",
    dayEnd: "",
    primaryDimension: "",
    transPrimaryDimension: "",
    transSecondaryDimension: "",
    secondaryDimenHeaders: [],
    subMethode: "",
    secondaryDimensions: [
      "Ereigniskategorie",
      "Ereignisname",
      "Ereignisaktion",
    ],
    metrics: ["Ereignisse", "Besuchen"],
    metricHeaders: [],
    chartType: "",
    showPageUrl: null,
    showTreeTable: false,
    showIntro: false,
    token: "",
  },

  mutations: {
    CHANGE_MODAL(state) {
      state.showModal = !state.showModal;
    },

    UPDATE_DATA(state, payload) {
      state.data = payload;
    },

    UPDATE_DAY_BEGIN(state, payload) {
      state.dayBegin = payload;
    },

    UPDATE_DAY_END(state, payload) {
      state.dayEnd = payload;
    },

    UPDATE_PRIMARY_DIMENSION(state, payload) {
      state.primaryDimension = payload;
      state.transPrimaryDimension = primaryDimensionTransName(payload);
    },

    UPDATE_SECONDARY_DIMENSION_COL(state, payload) {
      state.secondaryDimenHeaders = payload;
    },

    UPDATE_REPORT(state) {
      state.exportReport = true;
    },

    RESET_CONFIG() {
      window.location.reload();
    },

    UPDATE_METRIC_COL(state, payload) {
      state.metricHeaders = payload;
    },

    UPDATE_CHART(state, payload) {
      state.chartType = payload;
    },

    UPDATE_PAGE_URL(state, payload) {
      state.showPageUrl = payload;
    },

    SHOW_INTRO(state) {
      state.showIntro = !state.showIntro;
    },
    UPDATE_TOKEN(state, payload) {
      state.token = payload;
    },

    UPDATE_TREE_TABLE(state, payload) {
      state.showTreeTable = payload;
    },
  },
  actions: {
    closeModal({ commit }, state) {
      commit("CHANGE_MODAL");
    },

    async loadData({ commit, state }) {
      let details, res, items, res2, res3, getUrls, getPageUrl;

      var dat,
        dat2,
        newData = [];

      // Event-tracking:  track primary dimension
      //level 0
      const primaryData = await callApi(
        state.token,
        state.transPrimaryDimension,
        state.dayBegin,
        state.dayEnd
      );

      //catch error when it occurs by get data from server
      if ((await primaryData.result) === "error") {
        alert(primaryData.message);
      }
      //scenario 1: only event name and page url
      if (state.showPageUrl) {
        getUrls = await pageUrlApi(
          state.token,
          "1",
          state.dayBegin,
          state.dayEnd
        );
      }
      //filter by eventName label
      // filterUrlData
      // just take the url from plantshop with url beginning: plantshop.t-systems-mms.com/...
      // plantshop.t-systems-mms.com.en.address
      function filterUrl(urlArray, pageIdToCompare) {
        let getPageUrlArr;
        let getUrlArray = urlArray.filter(
          (u) => u.label === pageIdToCompare.label
        );
        if (
          getUrlArray.length !== 0 &&
          getUrlArray[0].subtable.find(
            (e) => e.label.replaceAll("/", ".") === pageIdToCompare.label
          )
        ) {
          getPageUrlArr = getUrlArray[0].subtable.filter(
            (ur) => ur.label.replaceAll("/", ".") === pageIdToCompare.label
          );
        } else if (
          getUrlArray.length !== 0 &&
          getUrlArray[0].subtable.find(
            (e) => e.label.replaceAll("/", ".") !== pageIdToCompare.label
          ) &&
          getUrlArray[0].subtable.find(
            (url) =>
              pageIdToCompare.label ===
              url.label
                .replace("localhost:8080", "plantshop.t-systems-mms.com")
                .replaceAll("/", ".")
          )
        ) {
          getPageUrlArr = getUrlArray[0].subtable.filter((ur) => {
            return (
              pageIdToCompare.label ===
              ur.label
                .replace("localhost:8080", "plantshop.t-systems-mms.com")
                .replaceAll("/", ".")
            );
          });
        } else {
          if (getUrlArray.length === 0) getPageUrlArr = null;
          else getPageUrlArr = getUrlArray[0].subtable;
        }
        return getPageUrlArr;
      }
      // children as page url
      function getChildren(url) {
        let children = [
          {
            data: {
              label: state.showPageUrl && url ? url[0].label : null,
              events: state.showPageUrl && url ? url[0].nb_hits : null,
              visits: state.showPageUrl && url ? url[0].nb_visits : null,
            },
          },
        ];
        return children;
      }

      // reduce object attributes, just need label, events and visits
      dat = primaryData.map((d) => {
        if (state.showPageUrl) {
          getPageUrl = filterUrl(getUrls, d);
        }

        // when page url option is active, then pageURL = getPageUrl

        items = {
          rootLabel: d.label,
          events: d.nb_events,
          visits: d.nb_visits,
          pageUrl: state.showPageUrl && getPageUrl ? getPageUrl[0].label : null,
          data: {
            events: d.nb_events,
            visits: d.nb_visits,
            label: d.label,
          },
          children: getChildren(getPageUrl),
        };

        return items;
      });

      commit("UPDATE_DATA", dat);

      //When exist secondary dimension options
      //track the  after primary dimension

      if (state.secondaryDimenHeaders.length > 0) {
        res = await subDataTableAPI(
          state.token,
          primaryDimensionTransName(state.primaryDimension),
          secondDimensionTranslateName(state.secondaryDimenHeaders[0]),
          state.dayBegin,
          state.dayEnd
        );

        //first level
        // if the first secondary dimension is name
        if (state.secondaryDimenHeaders.length === 1) {
          if (state.secondaryDimenHeaders[0] === "Ereignisname") {
            dat = res.map((el) => {
              details = el.subtable.map((e) => {
                //filter Url based on event name (second dimension)

                if (state.showPageUrl) {
                  getPageUrl = filterUrl(getUrls, e);
                }

                return newData.push({
                  label: e.label,
                  events: e.nb_events,
                  visits: e.nb_visits,
                  rootLabel: el.label,
                  pageUrl:
                    state.showPageUrl && getPageUrl
                      ? getPageUrl[0].label
                      : null,
                  data: {
                    events: el.nb_events,
                    visits: el.nb_visits,
                    label: el.label,
                  },
                  children: [
                    {
                      data: {
                        label: e.label,
                        events: e.nb_events,
                        visits: e.nb_visits,
                      },
                      children: getChildren(getPageUrl),
                    },
                  ],
                });
              });
            });
          }
          //if primary dimension is event name
          else if (state.primaryDimension === "Ereignisname") {
            dat = res.map((el) => {
              //filter data based on label name of root (primary dimension)
              if (state.showPageUrl) {
                getPageUrl = filterUrl(getUrls, el);
              }

              //take metrics of second event for page url
              details = el.subtable.map((e) => {
                return newData.push({
                  label: e.label,
                  events: e.nb_events,
                  visits: e.nb_visits,
                  rootLabel: el.label,
                  pageUrl:
                    state.showPageUrl && getPageUrl
                      ? getPageUrl[0].label
                      : null,
                  data: {
                    events: el.nb_events,
                    visits: el.nb_visits,
                    label: el.label,
                  },
                  children: getChildren(getPageUrl),
                });
              });
            });
          } else {
            // not filter page url
            dat = res.map((el) => {
              details = el.subtable.map((e) => {
                return newData.push({
                  label: e.label,
                  events: e.nb_events,
                  visits: e.nb_visits,
                  rootLabel: el.label,
                  data: {
                    events: el.nb_events,
                    visits: el.nb_visits,
                    label: el.label,
                  },
                  children: [
                    {
                      data: {
                        label: e.label,
                        events: e.nb_events,
                        visits: e.nb_visits,
                      },
                    },
                  ],
                });
              });
            });
          }

          commit("UPDATE_DATA", newData);
        }
        //when both option of secondary dimension are chosen
        if (state.secondaryDimenHeaders.length === 2) {
          res2 = await subDataTableAPI(
            state.token,
            primaryDimensionTransName(state.secondaryDimenHeaders[0]),
            secondDimensionTranslateName(state.secondaryDimenHeaders[1]),
            state.dayBegin,
            state.dayEnd
          );
          res3 = await subDataTableAPI(
            state.token,
            primaryDimensionTransName(state.primaryDimension),
            secondDimensionTranslateName(state.secondaryDimenHeaders[1]),
            state.dayBegin,
            state.dayEnd
          );

          dat = res.map((el) => {
            if (
              state.primaryDimension === "Ereignisname" &&
              state.secondaryDimenHeaders[0] === "Ereigniskategorie"
            ) {
              //when page url is active
              //AR and TR (Asymmetric and transitivity relation)
              //filter data based on label name of root

              details = res3.filter((f) => el.label === f.label);

              details.map((m) => {
                if (state.showPageUrl) {
                  getPageUrl = filterUrl(getUrls, m);
                }

                m.subtable.map((e) => {
                  return newData.push({
                    label: e.label,
                    visits: e.nb_visits,
                    events: e.nb_events,
                    rootLabel: el.label,
                    r_events: el.nb_events,
                    r_visits: el.nb_visits,
                    r2_label: el.subtable[0].label,
                    r2_visits: m.nb_visits,
                    r2_events: m.nb_events,
                    pageUrl:
                      state.showPageUrl && getPageUrl
                        ? getPageUrl[0].label
                        : null,
                    data: {
                      events: el.nb_events,
                      visits: el.nb_visits,
                      label: el.label,
                    },
                    children: [
                      {
                        data: {
                          label: el.subtable[0].label,
                          events: el.subtable[0].nb_events,
                          visits: el.subtable[0].nb_visits,
                        },
                        children: [
                          {
                            data: {
                              events: e.nb_events,
                              visits: e.nb_visits,
                              label: e.label,
                            },
                            children: getChildren(getPageUrl),
                          },
                        ],
                      },
                    ],
                  });
                });
              });
            }
            if (
              state.primaryDimension === "Ereignisname" &&
              state.secondaryDimenHeaders[0] === "Ereignisaktion"
            ) {
              //when page url is active
              //SR and TR (symmetric and transitivity relation)
              // metric of 2.secondary dimension is of  action dimension in 1.Request
              //filter data based on label name of root
              el.subtable.map((e) => {
                let subData = res2.filter((r) => e.label === r.label);

                if (state.showPageUrl) {
                  getPageUrl = filterUrl(getUrls, el);
                }
                subData.map((s) => {
                  return newData.push({
                    label: s.subtable[0].label,
                    rootLabel: el.label,
                    r_events: el.nb_events,
                    r_visits: el.nb_visits,
                    r2_event: e.nb_events,
                    r2_visits: e.nb_visits,
                    r2_label: e.label,
                    visits: e.nb_visits,
                    events: e.nb_events,
                    pageUrl:
                      state.showPageUrl && getPageUrl
                        ? getPageUrl[0].label
                        : null,
                    data: {
                      events: el.nb_events,
                      visits: el.nb_visits,
                      label: el.label,
                    },
                    children: [
                      {
                        data: {
                          label: e.label,
                          events: e.nb_events,
                          visits: e.nb_visits,
                        },
                        children: [
                          {
                            data: {
                              events: e.nb_events,
                              visits: e.nb_visits,
                              label: s.subtable[0].label,
                            },
                            children: getChildren(getPageUrl),
                          },
                        ],
                      },
                    ],
                  });
                });
              });
            }

            if (
              state.primaryDimension === "Ereigniskategorie" &&
              state.secondaryDimenHeaders[0] === "Ereignisname"
            ) {
              //SR and TR (symmetric and transitivity relation)
              //filter data based on label name of root
              el.subtable.map((e) => {
                let subData = res2.filter((r) => e.label === r.label);

                subData.map((s) => {
                  if (state.showPageUrl) {
                    getPageUrl = filterUrl(getUrls, s);
                  }
                  s.subtable.map((st) => {
                    return newData.push({
                      label: st.label,
                      rootLabel: el.label,
                      r_events: el.nb_events,
                      r_visits: el.nb_visits,
                      r2_event: e.nb_events,
                      r2_visits: e.nb_visits,
                      r2_label: e.label,
                      visits: st.nb_visits,
                      events: st.nb_events,
                      pageUrl:
                        state.showPageUrl && getPageUrl
                          ? getPageUrl[0].label
                          : null,
                      data: {
                        events: el.nb_events,
                        visits: el.nb_visits,
                        label: el.label,
                      },
                      children: [
                        {
                          data: {
                            label: e.label,
                            events: e.nb_events,
                            visits: e.nb_visits,
                          },
                          children: [
                            {
                              data: {
                                events: st.nb_events,
                                visits: st.nb_visits,
                                label: st.label,
                              },
                              children: getChildren(getPageUrl),
                            },
                          ],
                        },
                      ],
                    });
                  });
                });
              });
            }

            if (
              state.primaryDimension === "Ereigniskategorie" &&
              state.secondaryDimenHeaders[0] === "Ereignisaktion"
            ) {
              //SR and TR (symmetric and transitivity relation)
              //filter data based on label name of root
              el.subtable.map((e) => {
                let subData = res2.filter((r) => e.label === r.label);

                subData.map((s) => {
                  s.subtable.map((st) => {
                    if (state.showPageUrl) {
                      getPageUrl = filterUrl(getUrls, st);
                    }
                    return newData.push({
                      label: st.label,
                      rootLabel: el.label,
                      r_events: el.nb_events,
                      r_visits: el.nb_visits,
                      r2_event: e.nb_events,
                      r2_visits: e.nb_visits,
                      r2_label: e.label,
                      visits: st.nb_visits,
                      events: st.nb_events,
                      pageUrl:
                        state.showPageUrl && getPageUrl
                          ? getPageUrl[0].label
                          : null,
                      data: {
                        events: el.nb_events,
                        visits: el.nb_visits,
                        label: el.label,
                      },
                      children: [
                        {
                          data: {
                            label: e.label,
                            events: e.nb_events,
                            visits: e.nb_visits,
                          },
                          children: [
                            {
                              data: {
                                events: st.nb_events,
                                visits: st.nb_visits,
                                label: st.label,
                              },
                              children: getChildren(getPageUrl),
                            },
                          ],
                        },
                      ],
                    });
                  });
                });
              });
            }

            if (
              state.primaryDimension === "Ereignisaktion" &&
              state.secondaryDimenHeaders[0] === "Ereignisname"
            ) {
              //AR and TR (Asymmetric and transitivity relation)
              //filter data based on label name of root
              details = res3.filter((f) => el.label === f.label);
              let label;
              details.map((d) => {
                // get label of category from the second hierachy (action-name)
                label = d.subtable[0].label;
              });
              el.subtable.map((m) => {
                if (state.showPageUrl) {
                  getPageUrl = filterUrl(getUrls, m);
                }
                return newData.push({
                  label: label,
                  rootLabel: el.label,
                  r_events: el.nb_events,
                  r_visits: el.nb_visits,
                  r2_event: m.nb_events,
                  r2_visits: m.nb_visits,
                  r2_label: m.label,
                  visits: m.nb_visits,
                  events: m.nb_events,
                  pageUrl:
                    state.showPageUrl && getPageUrl
                      ? getPageUrl[0].label
                      : null,
                  data: {
                    events: el.nb_events,
                    visits: el.nb_visits,
                    label: el.label,
                  },
                  children: [
                    {
                      data: {
                        label: m.label,
                        events: m.nb_events,
                        visits: m.nb_visits,
                      },
                      children: [
                        {
                          data: {
                            events: m.nb_events,
                            visits: m.nb_visits,
                            label: label,
                          },
                          children: getChildren(getPageUrl),
                        },
                      ],
                    },
                  ],
                });
              });
            }
            if (
              state.primaryDimension === "Ereignisaktion" &&
              state.secondaryDimenHeaders[0] === "Ereigniskategorie"
            ) {
              //AR and TR (Asymmetric and transitivity relation)
              //filter data based on label name of root
              details = res3.filter((f) => el.label === f.label);

              details.map((d) => {
                d.subtable.map((m) => {
                  if (state.showPageUrl) {
                    getPageUrl = filterUrl(getUrls, m);
                  }
                  // get label of category from the second hierachy(action-category)
                  let r2_label = el.subtable[0].label;
                  return newData.push({
                    label: m.label,
                    rootLabel: el.label,
                    r_events: el.nb_events,
                    r_visits: el.nb_visits,
                    r2_event: m.nb_events,
                    r2_visits: m.nb_visits,
                    r2_label: r2_label,
                    visits: m.nb_visits,
                    events: m.nb_events,
                    pageUrl:
                      state.showPageUrl && getPageUrl
                        ? getPageUrl[0].label
                        : null,
                    data: {
                      events: el.nb_events,
                      visits: el.nb_visits,
                      label: el.label,
                    },
                    children: [
                      {
                        data: {
                          events: m.nb_events,
                          visits: m.nb_visits,
                          label: r2_label,
                        },
                        children: [
                          {
                            data: {
                              events: m.nb_events,
                              visits: m.nb_visits,
                              label: m.label,
                            },
                            children: getChildren(getPageUrl),
                          },
                        ],
                      },
                    ],
                  });
                });
              });
            }
          });

          commit("UPDATE_DATA", newData);
        }
      }
    },
  },
});
export default store;
