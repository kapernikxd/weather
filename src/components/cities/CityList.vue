<template>
    <v-card
      class="mx-auto widget__citis_list"    
    >
      <h2 class="widget__h2">Settings</h2>
      <draggable v-model="cities" :move="onMove">
        <city
          v-for="city in cities"
          :key="city.index"
          :name="city.name"
          @on-delete="deleteCity(city)"
        />
      </draggable>

      <add-city @on-new-city="addCity($event)" />
    </v-card>
</template>

<script>
import City from "./City.vue";
import AddCity from "./AddCity.vue";

import _ from 'lodash'
import draggable from 'vuedraggable'

export default {
  props: {
    listName: String,
  },
  components: { City, AddCity, draggable},
  data() {
    return {
      cities: this.$store.state.cities,
    };
  },

  watch: {
    '$store.state.cities': function(val) {
      this.cities = val
    },

    cities(val){
      this.$store.dispatch('moved', val) //передвинули элемент
    }

  },
  computed: {
    // listString() {
    //   return JSON.stringify(this.cities, null, 2);
    // },
  },
  mounted () {
    
  },
  methods: {
    addCity(newCity) {
      this.$store.dispatch('addCity', { name: newCity, index: this.cities.length })
    },

    deleteCity(deletedCity) {
      let filter = _.filter(this.cities, function(list) {
        return list.name !== deletedCity.name;
      });
      this.$store.dispatch('deleteCity', filter)
    },

    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
 
  },

};
</script>

<style scoped lang="scss">
.widget__h2{
  padding: 20px;
}
</style>
