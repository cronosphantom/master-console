<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Users</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                clearable
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="users"
              :search="search"
              item-key="name"
              show-select
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
const GET_USERS = gql`
  query {
    users {
      firstName
      lastName
      email
      city
      country
    }
  }
`;
export default {
  name: "Users",
  data() {
    return {
      users: [],
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "firstName",
        },
        { text: "", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "City", value: "city" },
        { text: "Country", value: "country" },
      ],
    };
  },
  apollo: {
    users: {
      query: GET_USERS,
    },
  },
};
</script>

<style src="./Users.scss" lang="scss"></style>
