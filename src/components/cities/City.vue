<template>
    <div class="widget__city">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            style="transform: rotate(45deg);"
            small
          >
            zoom_out_map
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content calss="ml-2">
          <v-list-item-title v-text="name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="$emit('on-delete')">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
    </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    name: String
  },
  methods: {
  

  }
};
</script>

<style lang="scss" scoped>
.widget__city{
  
}
</style>
