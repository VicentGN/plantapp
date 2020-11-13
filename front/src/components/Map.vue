<template>
  <div class="parent">
    <l-map
      :zoom="zoom"
      :center="center"
      v-on:click="selectPositionOnMap"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <div v-if="markerLatLng">
        <l-marker :lat-lng="markerLatLng" />
      </div>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import EventBus from './../bus.js';

// Reseteo de Iconos para que puedan visualizarse
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom: 1,
      center: latLng(0,0),
      markerLatLng: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  methods: {
    selectPositionOnMap: function(e) {
      EventBus.$emit('sendCoordinatesFromMap', e.latlng)
      this.markerLatLng = e.latlng
    },
    updateMap: function() {
      EventBus.$on('updateMap', data => {
        this.markerLatLng = data;
      })
    }
  },
  mounted() {
    this.updateMap()
  }
};
</script>

<style scoped>
  .parent {
    height: 500px; 
    width: 100%;
    margin-top: 30px;
  }
</style>
