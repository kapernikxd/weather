<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ listName }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <add-city @on-new-city="addCity($event)" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <draggable v-model="cities" :move="onMove">
            <city
              v-for="city in cities"
              :key="city.index"
              :name="city.name"
              @on-delete="deleteCity(city)"
            />
          </draggable>
        </ul>
      </div>
    </div>

    <div class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </div>

  </div>
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
    listString() {
      return JSON.stringify(this.cities, null, 2);
    },
  },
  mounted () {
    
  },
  methods: {
    addCity(newCity) {
      this.$store.dispatch('addCity', { name: newCity, index: this.cities.length })
      // this.cities.push({ description: newCity, completed: false });
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

<style scoped lang="scss"></style>
