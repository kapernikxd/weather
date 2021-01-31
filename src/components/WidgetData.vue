<template>
  <div>
    <div v-if="loadedData">
      <p>{{weatherAPI != null ? weatherAPI.name : ''}}, {{weatherAPI != '' ? weatherAPI.sys.country : ''}}</p>
      <img alt="weather" :src="image">
      <p>{{convertKtoC(weatherAPI.main.temp)}}</p> 
      <div>Feels like {{convertKtoC(weatherAPI.main.feels_like)}}℃. {{weatherAPI.weather[0].description}}</div>
      <div style="display:flex; justify-content: center"><div :style="style">&#8657;</div>{{weatherAPI.wind.speed}}m/s {{windDirection(weatherAPI.wind.deg)}}  {{weatherAPI.main.pressure}}</div>
      <p>Humidity: {{weatherAPI.main.humidity}}% Dew point: 0℃</p>
      <p>Cloudiness: {{weatherAPI.clouds.all}}%</p>  
    </div>
    <div v-else style="text-align:center">
      Загрузка...
    </div>
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

      }
  },
}
</script>



<style lang="scss" scoped>

</style>
