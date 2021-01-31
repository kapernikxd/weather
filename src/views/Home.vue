<template>
  <div class="weather">
      <vue-confirm-dialog></vue-confirm-dialog>
      <v-icon
        v-if="!settings"
        @click="settings=!settings"
        large
        color="green darken-2"
        class="weather__settings"
      >
        settings
      </v-icon>
      <v-icon
        v-else
        @click="settings=!settings"
        large
        color="green darken-2"
        class="weather__settings"
      >
        close
      </v-icon>
      <WidgetSet v-if="settings"/>

      <v-card
        elevation="2"
        v-else 
      >
        <WidgetData
          :city="city"
          v-for="(city, i) in cities" :key="i"
        />
      </v-card>
  </div>
</template>

<script>
import WidgetData from '@/components/WidgetData'
import WidgetSet from '@/components/WidgetSet'

import _ from 'lodash'
import axios from 'axios'


export default {
  name: 'Home',
  components: {
    WidgetData,
    WidgetSet
  },
  data() {
    return {
      settings: false,
      ip:null,
      cityByIP:null,
      api_key: 'f774956dd97ad12e94e7c7c924a1324e',
      IsEmptyLocalStore: null
    }
  },
  watch: {
    IsEmptyLocalStore(val) {
      if(val == true){
        this.getIP()
      }
    }
  },

  computed: {
    cities(){
      return _.map(this.$store.state.cities, city => city.name)
    }
  },

  mounted () {
    this.checkLocalStorage()
  },
  methods: {

    showConfirm() {
      this.$confirm({
        title: 'Confirm',
        message: `Are you from ${this.cityByIP}?`,
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm == true) {
            this.$store.dispatch('addCity', { name: `${this.cityByIP}`, index: this.cities.length })
            return
          }
          else this.settings = true
        }
      })
  
    },

    async getIP(){
      await axios({
        method: 'GET',
        url: `https://api.ipify.org?format=json`
        
      })
      .then(x => {
        this.ip = x.data.ip
        this.defineCity(this.ip)
      })
      .catch(err =>{
        console.log(err)
      })
    },

    async defineCity(ip){
      await axios({
        method: 'GET',
        url: `http://api.ipstack.com/${ip}?access_key=${this.api_key}`
        
      })
      .then(response => {
        this.cityByIP = response.data.city
        this.showConfirm()
      })
      .catch(err =>{
        console.log(err)
      })
    },

    checkLocalStorage(){
      let data = JSON.parse(localStorage.getItem('cities'))
      if(!_.isEmpty(data)){
        this.$store.dispatch('addFromLocalStore', data)
        this.IsEmptyLocalStore = false
        return
      }
      
      return this.IsEmptyLocalStore = true
      
    }
    
  },
}
</script>



<style lang="scss" scoped>
.weather{
  max-width: 320px;
  width: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  .weather__settings{
    position: absolute;
    z-index: 100;
    right: 10px;
    top: 10px;
  }
}
</style>
