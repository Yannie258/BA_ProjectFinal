# Matomo _Report-Builder_Prototype_

## Description

- This is a Tool which is built with Vue 3 and help to create a Report at the time. Users have full rights to config the options of event-tracking. These Tool can also combine the events and page URL together.
- The event-tracking includes category, name and action. They are combined when you choose more than one.
- The Matomo API Module was discribed by [developer.matomo.org] (https://developer.matomo.org/api-reference/reporting-api)
  Actually Test-Environment is the Website of Plantshop [https://plantshop.t-systems-mms.com/en]. These Website is written by Vuejs and tracked by matomo.

## Prerequisites

The project is based on:

```
- vue-datepicker
- axios
- vuex
- vue-cli
- primevue
- tailwindcss
```

## Project setup

### Install dependencies

```
yarn install
```

### Compiles and hot-reloads for development at localhost

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Unit Test

```
yarn test:unit
```

## Features

- Calender format
- Authentication to API - Token API
- Configuration for:
  - Primary Dimension : only one is choosen (category, name , action)
  - Secondary Dimension : can be more than one or none ( - , category, name, action, page-URL). They are not includes the option of primary Dimension
  - Metrics : visits , hits or none
  - Graphic : Bar-chart or Line-chart
- Error catching

## Need to Know

- Vue 3 syntax
- store manages the global states in Vuex
- axios for POST-Request to A
- 'tw' is prefix to use Tailwindcss classes

## Component structure

### **App**:

- #### _views_ folder:

  - **Home.vue** : contains all layout of app
  - **Introduction.vue** : contains the user manual

- #### _components_ folder:

  _layout_ folder contains all components for layout structure of programm. It based on Header, Modal and ReportArea components

  - **Header** includes Calender and SubNavigator
  - **Modal** includes the configurations of user
  - **Report** area include the performance of report table.

  _charts_ folder:

  - **ChartArea.vue** : contains chart Template and declare for diagram types

- #### _Button_:

component help to reuse the design of button types

- #### _service_ folder:

  consists of helper-file to translate the options of user to request parameter and send to Matomo API (dimensions and metrics)

  - **api.js** : call dimension api through POST- request and its parameter
  - **pageUrlApi.js** : call page url api

- #### _store_ :

  state management for global. the components can communicate together hence.

## For Developer

<details><summary><strong><ul><li>How to add more dimensions?</li></ul></strong></summary>

#### Primary dimension

```javascript
// in ModalComponent
// add more primary dimension

<select v-model="primaryDimension">
  <option disabled value="">
    Primäre Dimension
  </option>
  <option>Ereigniskategorie</option>
  <option>Ereignisname</option>
  <option>Ereignisaktion</option>
  <option>another Option is here...</option>
</select>
```

</details>

#### Secondary selection

```javascript
// in ModalComponent
// add more secondary dimension

<div v-if="primaryDimension">
    <label v-for="(dim, _id) in secondaryDimensionOptions()" :key="_id" for="id">
     {{ dim }}
        <input id="id" v-model="selectedSecDimens" type="checkbox" :value="dim"/>
    </label>
</div>
...
//condition for secondary dimensions
//avoid dupplicating with primary dimension

const secondaryDimensionOptions = () => {
      newSecondaryDimensions.value = store.state.secondaryDimensions.filter(
        (dim) => dim !== primaryDimension.value
      );
      return newSecondaryDimensions.value;
    };
```

</details>

<details><summary><strong><ul><li>How to send request to Matomo API?</li></ul></strong></summary>

#### Call Dimension API

- **primary dimension**: is the API method and it should be get* with * is one of (Category, Name, Action)
- **secondary dimension**: is taken when you call the API method as primary dimension and its subdata as secondary dimension. The method should be one of (Category, Name, Action) and the second dimension has the syntax event* with * is one of (Category, Name, Action) but it must not be same with API method

```javascript
//primary dimension

const axios = require("axios");

async function callApi(token, methods, beginDate, endDate) {
  let item = null;
  await axios
    .post(
      `https://di-tools.t-systems-mms.com/matomo/?module=API&method=${methods}&idSite=1&period=range&date=${beginDate},${endDate}&format=JSON&expanded=1`,
      null,
      {
        params: {
          token_auth: token,
        },
      }
    )
    .then((response) => (item = response.data))

    .catch((err) => console.log("Error:", err));
  return item;
}

// secondary dimension

async function subDataTableAPI(
  token,
  firstDimension,
  secondDimension,
  beginDate,
  endDate
) {
  let data = [];
  await axios
    .post(
      `https://di-tools.t-systems-mms.com/matomo/?&module=API&method=${firstDimension}&idSite=1&secondaryDimension=${secondDimension}&period=range&date=${beginDate},${endDate}&format=JSON&expanded=1`,
      null,
      {
        params: {
          token_auth: token,
        },
      }
    )
    .then((response) => (data = response.data))

    .catch((err) => console.log("Error:", err));
  return data;
}

export { callApi, subDataTableAPI };
```

</details>

#### Call Page URL API

- It will be called when event-name is called too
- The method for that is CustomDimensions.getCustomDimension. See more in [developer.matomo.org/api-reference/reporting-api]
- It returns label as event name (=PageId) and subdata is page-url

```javascript
// request page-url from API
// expanded should be 1 to activate subdata page url
const axios = require("axios");

async function pageUrlApi(token, flag, beginDate, endDate) {
  let data = [];
  await axios
    .post(
      `https://di-tools.t-systems-mms.com/matomo/?module=API&method=CustomDimensions.getCustomDimension&idSite=1&period=range&date=${beginDate},${endDate}&format=JSON&idDimension=5&expanded=${flag}`,
      null,
      {
        params: {
          token_auth: token,
        },
      }
    )
    .then((response) => (data = response.data))

    .catch((err) => console.log("Error:", err));

  return data;
}

export { pageUrlApi };
```

#### Load and filter Data

- You need to send at least 2 requests to get from 2 secondary dimensions at the same time.
- But their parameters are sometimes not the same, so you have to generate different requests
- It will be summarized in this table:

| Group (primary-secondary 1-secondary 2) |      Request Parameters | Note                                        |
| :-------------------------------------- | ----------------------: | :------------------------------------------ |
| Category-Action-Name                    | getCategory-eventAction |                                             |
| -                                       |     getAction-eventName |                                             |
| Category-Name-Action                    |   getCategory-eventName |                                             |
| -                                       |     getName-eventAction |                                             |
| Name-Action-Category                    |   getCategory-eventName | The category metrics are assigned by action |
| -                                       |     getName-eventAction |                                             |
| Name-Category-Action                    |   getName-eventCategory | category's action = name's action           |
| -                                       |     getName-eventAction |                                             |
| Action-Name-Category                    |     getAction-eventName | category's labe ='click'                    |
| -                                       | getAction-eventCategory | and its metric = name                       |
| Action-Category-Name                    | getAction-eventCategory | category's Name = action's Name             |
| -                                       |     getAction-eventName |                                             |

\* _you can use Postman to check this results_

#### Perfomance of table

- Data in Table should be dynamic and base on data state from store

#### Performance of chart

- Data for chart are depended on data state from store, but it must be updated everytime when data is changed.
- See more about primeVue [primefaces.org/primevue]

```javascript
<div v-if="$store.state.chartType === 'Balkendiagramm'">
      <div v-if="$store.state.secondaryDimenHeaders.length === 0" class="card">
        <Chart type="bar" :data="basicData" :options="basicOptions" />
      </div>
      ...
</div>
...
//update data
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
```

## Next step

- Searching
- Table features ( descrease , ascend/ increase)
- Pagination
- More Charts
- Export to another data types ( e.g Offices)
- And more Ideas ...:relaxed:
- Hostadresse: http://di-tools.t-systems-mms.com/matomo-report-builder/#/

## New Version in development-branch

- Smart Table with PrimeVue
- Page-url can appear whenever event-name exists
- Table sort, Table searching (Filter Menu) are available
- Pagination
- Horizontal bar-chart
- Tree-Table
