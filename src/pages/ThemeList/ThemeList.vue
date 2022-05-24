<template>
  <v-container fluid>
    <div class="list-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <v-col lg="6" sm="6" xs="12">
          <h1 class="page-title">Theme Detail</h1>
        </v-col>
        <v-col cols="auto">
          <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on"
                >Create Theme</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="primary" dark>Create Theme</v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">
                    <v-text-field
                      label="Title"
                      v-model="newThemeData.title"
                    ></v-text-field>
                    <v-textarea
                      v-model="newThemeData.definition"
                      rows="2"
                      name="definition"
                      label="Definition"
                    ></v-textarea>
                    <v-textarea
                      v-model="newThemeData.storyReference"
                      rows="2"
                      name="storyReference"
                      label="Story Reference"
                    ></v-textarea>
                    <v-textarea
                      v-model="newThemeData.storyContent"
                      rows="2"
                      name="storyContent"
                      label="Story Content"
                    ></v-textarea>
                    <v-textarea
                      v-model="newThemeData.visual"
                      rows="2"
                      name="visual"
                      label="Image Name"
                    ></v-textarea>
                    <v-btn color="success" @click="$refs.inputUpload.click()"
                      >Upload Image
                    </v-btn>
                    <input
                      v-show="false"
                      ref="inputUpload"
                      type="file"
                      @change="imageupload"
                    />
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Cancel</v-btn>
                  <v-btn color="primary" text @click="createTheme(dialog)"
                    >Create</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          lg="3"
          sm="6"
          md="7"
          cols="12"
          v-for="(item, index) in themes"
          :key="item.id"
        >
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>{{ item.title }}</p>
              <v-spacer></v-spacer>
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    @click="getTheme(index)"
                    small
                    v-bind="attrs"
                    v-on="on"
                    >Edit</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark>Edit Theme</v-toolbar>
                    <v-card-text>
                      <div class="text-h2 pa-12">
                        <v-text-field
                          label="Title"
                          v-model="updateData.title"
                        ></v-text-field>
                        <v-textarea
                          v-model="updateData.definition"
                          rows="2"
                          name="definition"
                          label="Definition"
                        ></v-textarea>
                        <v-textarea
                          v-model="updateData.storyReference"
                          rows="2"
                          name="storyReference"
                          label="Story Reference"
                        ></v-textarea>
                        <v-textarea
                          v-model="updateData.storyContent"
                          rows="2"
                          name="storyContent"
                          label="Story Content"
                        ></v-textarea>
                        <!-- <v-text-field
                          label="Visual"
                          v-model="updateData.visual"
                        ></v-text-field> -->
                        <img :src="updateData.visual" style="max-width:200px">
                        <br>
                        <v-btn
                          color="success"
                          @click="selectImage"
                          >Change Image
                        </v-btn>
                        <input
                          v-show="false"
                          ref="visualImage"
                          type="file"
                          @change="changeupload"
                        />
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Cancel</v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="updateTheme(dialog, index)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <div class="mr-4">
                  <v-icon color="primary" class="ml-n2">
                    mdi-circle-medium
                  </v-icon>
                  <span class="card-light-grey">Name: </span>
                </div>
                <div>
                  <span class="card-light-grey">{{ item.definition }}</span>
                </div>
              </v-row>
              <v-row no-gutters class="pb-5">
                <div class="mr-4">
                  <v-icon color="primary" class="ml-n2">
                    mdi-circle-medium
                  </v-icon>
                  <span class="card-light-grey">Content: </span>
                </div>
                <div>
                  <span class="card-light-grey">
                    {{ item.storyContent }}
                  </span>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
const GET_THEMES = gql`
  query {
    themes {
      id
      title
      definition
      storyReference
      storyContent
      visual
    }
  }
`;
const CREATE_THEME = gql`
  mutation ($data: ThemeInput!) {
    createTheme(data: $data) {
      title
      definition
      storyReference
      storyContent
      visual
    }
  }
`;
const UPDATE_THEME = gql`
  mutation (
    $id: Float!
    $title: String!
    $definition: String!
    $storyReference: String!
    $storyContent: String!
    $visual: String!
  ) {
    updateTheme(
      id: $id
      title: $title
      definition: $definition
      storyReference: $storyReference
      storyContent: $storyContent
      visual: $visual
    ) {
      id
      title
      definition
      storyReference
      storyContent
      visual
    }
  }
`;
export default {
  name: "ThemeList",
  components: {},
  data() {
    return {
      themes: [],
      newThemeData: {
        title: "",
        definition: "",
        storyReference: "",
        storyContent: "",
        visual: "",
      },
      updateData: {
        id: "",
        title: "",
        definition: "",
        storyReference: "",
        storyContent: "",
        visual: "",
      },
    };
  },
  apollo: {
    themes: {
      query: GET_THEMES,
    },
  },
  methods: {
    selectImage(){
      console.log(this.$refs)
      this.$refs.visualImage[0].click();
    },
    imageupload(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.newThemeData.visual = fr.result;
        });
      }
    },
    changeupload(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.updateData.visual = fr.result;
        });
      }
    },
    getTheme(index) {
      this.updateData = this.themes[index];
    },
    createTheme(dlg) {
      this.$apollo.mutate({
        mutation: CREATE_THEME,
        variables: {
          data: this.newThemeData,
        },
      });
      dlg.value = false;
      this.themes.push(this.newThemeData);
      this.newThemeData = {};
    },
    updateTheme(dlg, index) {
      this.$apollo.mutate({
        mutation: UPDATE_THEME,
        variables: {
          id: parseFloat(this.updateData.id),
          title: this.updateData.title,
          definition: this.updateData.definition,
          storyReference: this.updateData.storyReference,
          storyContent: this.updateData.storyContent,
          visual: this.updateData.visual,
        },
      });
      dlg.value = false;
      this.themes.splice(index, 1, this.updateData);
      this.updateData = {};
    },
  },
  mounted() {},
};
</script>

<style src="./Theme.scss" lang="scss"/>