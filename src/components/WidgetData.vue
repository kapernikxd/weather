<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline" style="font-size: 25px;">
          {{weatherAPI != null ? weatherAPI.name : ''}}, {{weatherAPI != '' ? weatherAPI.sys.country : ''}}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
          class="display-3"
          cols="7"
          style="font-size:60px; line-height: 1.7em; padding-left:10px"
        >
          {{convertKtoC(weatherAPI.main.temp)}}&deg;C
        </v-col>
        <v-col 
          cols="5"
          class="justify-end flex">
          <v-img
            :src="image"
            alt="weather"
            style="width:90%;" 
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    
    <v-list-item>
      <v-list-item-subtitle>Feels like {{convertKtoC(weatherAPI.main.feels_like)}}&deg;C. {{toUpperCaseLetter(weatherAPI.weather[0].description)}}</v-list-item-subtitle>
    </v-list-item>
    
    
    <v-row class="ma-0 pa-0 widget__row">
      <v-col 
        cols="6">
        <v-list-item class="widget__list-item">
          <v-list-item-icon class="widget__item-icon">
            <v-icon :style="style">mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle style="margin-left:10px">{{weatherAPI.wind.speed}} m/s {{windDirection(weatherAPI.wind.deg)}}</v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-col 
        cols="6">
        <v-list-item class="widget__list-item">
          <v-list-item-icon class="widget__item-icon">
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle style="margin-left:10px">{{weatherAPI.clouds.all}}%</v-list-item-subtitle>
        </v-list-item>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0 widget__row">
      <v-col 
        cols="6">
        <v-list-item class="widget__list-item">
          <v-list-item-subtitle>Humidity: {{weatherAPI.main.humidity}}%</v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-col 
        cols="6">
        <v-list-item class="widget__list-item">
          <v-list-item-subtitle>Pressure: {{weatherAPI.main.pressure}}hPA</v-list-item-subtitle>
        </v-list-item>
      </v-col>
    </v-row>

    <v-divider class="widget__divider"></v-divider>

  </div>
</template>

<script>
import axios from 'axios'
import d2d from 'degrees-to-direction'

export default {
  props: ['city'],
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      weatherAPI: null,
      loadedData: true,
    }
  },
  watch: {
    city() {
      this.getWeather()
    }
  },
  computed: {
    image() {
      return `http://openweathermap.org/img/wn/${this.weatherAPI.weather[0].icon}@2x.png`
    },
    style () {
        return { transform: `rotate(${this.weatherAPI.wind.deg}deg)`}
    }
  },

  mounted () {
    this.getWeather()
  },

  methods: {

      //Возвращает Цельсий из Кельвинов
      convertKtoC(K){
        let C = K - 273.15
        return Math.round(C)
      },

      //Возвращает направление ветра
      windDirection(val){
        return d2d(val)
      },

      imgURL(){
        return `http://openweathermap.org/img/wn/11d@2x.png`
      },

      async getWeather(){
        return await axios({
          method: 'GET',
          url: `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=83c3332fba9c1cc0e22641da6260d796`  
        })
        .then(response =>{
          this.weatherAPI = response.data
          this.loadedData = true
          // console.log('getWeather', this.weatherAPI)
        })
        .catch(err =>{
          console.log(err)
        })

      },


      toUpperCaseLetter(string){
        return string[0].toUpperCase() + string.slice(1);
      }
  },
}
</script>



<style lang="scss">
.widget__row {
  margin: 0px !important;

  .widget__item-icon {
    margin:0px !important;
  }

  .widget__list-item {
    min-height: 25px !important;
    padding:0 !important;
  }
}

.widget__divider {
  margin-top:30px !important;
}
</style>

