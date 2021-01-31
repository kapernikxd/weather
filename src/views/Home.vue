<template>
  <div class="home">
      <vue-confirm-dialog></vue-confirm-dialog>
      <button @click="settings=!settings">Настройки</button>
      <WidgetSet v-if="settings"/>
      <div 
        v-else
        v-for="(city, i) in cities" :key="i">
        <WidgetData :city="city"/>
      </div>

    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

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
    // this.getIP()
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

</style>
