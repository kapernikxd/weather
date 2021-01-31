<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
    >
      <span>{{ name }}</span>
    </button>
    <button @click="$emit('on-delete')" class="btn btn-outline-danger border-0">
      <span class="fa fa-trash"></span>
    </button>
  </li>
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

</style>
