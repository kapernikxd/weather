<template>
  <v-text-field
    placeholder="Input city"
    v-model="newCity"
    style="padding: 0 20px 0 25px; margin-top:15px"
  >
    <v-icon
      slot="append"
      color="red"
      @click="addCity"
    >
      mdi-plus
    </v-icon>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newCity: ""
    };
  },
  methods: {
    addCity() {
      if (this.newCity.length > 0) {
        this.$emit("on-new-city", this.newCity);
      }
      this.newCity = "";
    }
  }
};
</script>

<style lang="scss" >
  @import '@/assets/_variables.scss'
</style>
