<template>
  <form class="col-12 col-sm-10 col-md-8 cl-lg-6" @submit.prevent="addCity()">
    <input
      v-model="newCity"
      type="text"
      class="form-control"
      placeholder="Input city"
    />
  </form>
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

<style lang="scss" scoped></style>
