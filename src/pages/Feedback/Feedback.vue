/* eslint-disable vue/valid-v-slot */
/* eslint-disable no-undef */
<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Feedback</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <v-spacer></v-spacer>
              <v-text-field
                v-model="mock.employeeTable.search"
                append-icon="mdi-magnify"
                label="Search"
                clearable
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="mock.employeeTable.selected"
              :headers="headers"
              :items="feedbacks"
              :search="mock.employeeTable.search"
              item-key="name"
            >
          // eslint-disable-next-line vue/valid-v-slot
          <template v-slot:[`item.onDate`]="{ item }">
           <span>{{ new Date(item.onDate).toLocaleString() }}</span>
          </template>
              <template v-slot:top>
                
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Feedback</v-card-title>
                    <v-card-text>
                      {{ editedItem }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:[`item.state`]="{ item }">
                <v-icon :color="item.state ? 'green' : 'red'"
                  >mdi-check-circle-outline
                </v-icon>
              </template>
              <template v-slot:[`item.message`]="{ item }">
                <a @click="deleteItem(item)">
                  {{ truncate(item.message, 100) }}
                </a>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import gql from "graphql-tag";
const GET_FEEDBACK = gql`
  query {
    feedbacks {
      id
      name email onDate message status
    }
  }
`;
export default {
  name: "Feedback",
  data() {
    return {
      mock: [],
       headers: [
            { text: 'Date', value: 'onDate', formatter: this.formatDate },
            {
                text: 'Name',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            { text: 'Email', value: 'email' },
            { text: 'Message', value: 'message'},
            
            { text: 'read', value: 'status' },
        ],
      dialog: false,
      editIndex: -1,
      editedItem: "",
    };
  },
  created() {
    this.initialize();
  },
  apollo: {
    feedbacks: {
      query: GET_FEEDBACK,
    },
  },
  methods: {
    initialize() {
      this.mock = mock;
    
    },
    formatDate(d){
      console.log(d)
      return 'TEST' ;
    },
    truncate(message, n) {
      return message.length > n ? message.substr(0, n - 1) + "  ..." : message;
    },
    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.mock.employeeTable.employee.indexOf(item);
      this.editedItem = item.message;
      this.dialog = true;
    },
    deleteItemConfirm() {
      this.mock.employeeTable.employee[`${this.editedIndex}`].state = true;
      this.closeDelete();
    },
    closeDelete() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.editedItem = "";
      });
    },
  },
};
</script>




<style src="./Feedback.scss" scoped lang="scss"></style>
