<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">State</h1>
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="secondary"
              class="text-capitalize button-shadow mr-1"
              >Latest Reports</v-btn
            >
          </template>
        </v-menu> -->
      </v-row>
      <v-row>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Today</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-medium card-dark-grey"
                    style="font-size: 24px"
                    >12, 678</span
                  >
                </v-col>
                <v-col cols="6">
                  <Trend
                    :data="getRandomDataForTrends()"
                    :gradient="mock.trend.gradient"
                    :height="40"
                    stroke-width="4"
                    smooth
                  />
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between pb-3">
                <v-col cols="5">
                  <div class="card-light-grey">Events</div>
                  <div class="text-h6 card-dark-grey font-weight-regular">
                    860
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="card-light-grey">New Users</div>
                  <div class="text-h6 card-dark-grey font-weight-regular">
                    32
                  </div>
                </v-col>
                <v-col cols="4" xl="2">
                  <div class="text-right card-light-grey">Repeat Events</div>
                  <div
                    class="
                      text-right text-h6
                      card-dark-grey
                      font-weight-regular
                    "
                  >
                    3.25%
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      
        
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1" style="height: 228px">
            <v-card-title class="flex-nowrap pa-6 pb-3">
              <p class="text-truncate">Revenue Breakdown</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0 mb-1">
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="124"
                    type="donut"
                    class="mt-1"
                    :options="mock.apexPie.options"
                    :series="generatePieSeries()"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <v-row no-gutters>
                <v-col
                  cols="7"
                  sm="4"
                  md="4"
                  lg="5"
                  class="d-flex align-center"
                >
                  <p>Event & User Stats</p>
                </v-col>
                <v-col
                  sm="6"
                  md="6"
                  lg="5"
                  class="d-none d-sm-flex align-center"
                >
                  <v-icon size="18" color="warning">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Events per Day</span
                  >
                  <v-icon size="18" color="primary">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >New User</span
                  >
                </v-col>
                <v-col cols="5" sm="2" md="2" lg="1" offset-lg="1">
                  <span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >From the Past 7 Days
                  </span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col>
                  <ApexChart
                    v-if="apexLoading"
                    height="350"
                    type="area"
                    :options="mock.mainApexArea.options"
                    :series="tabledata"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
       
       
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import Trend from "vuetrend";
import ApexChart from "vue-apexcharts";

export default {
  name: "Dashboard",
  components: {
    Trend,
    ApexChart,
  },
  data() {
    return {
      mock,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Daily",
      tabledata: [
        {
          name: "Events Per Day",
          type: "line",
          data: [3100, 4000, 2800, 5100, 4200, 6090, 5100],
        },
        {
          name: "New User",
          type: "line",
          data: [2100, 2000, 1800, 4100, 1200, 3600, 6100],
        },
      ],
    };
  },
  methods: {
    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
    generatePieSeries() {
      let series = [];

      for (let i = 0; i < 4; i++) {
        let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
        series.push(y);
      }
      return series;
    },
    getRandomInt(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },
  mounted() {
    setTimeout(() => {
      this.apexLoading = true;
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"/>
