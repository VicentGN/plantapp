<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-progress-spinner
        :md-diameter="100"
        :md-stroke="10"
        md-mode="indeterminate"
        v-if="loadingData"
      ></md-progress-spinner>
      <md-table v-else>
        <md-table-row>
          <md-table-head>Nombre</md-table-head>
          <md-table-head>Muestra</md-table-head>
          <md-table-head>Fecha</md-table-head>
          <md-table-head>Habitat</md-table-head>
          <md-table-head>Acciones</md-table-head>
        </md-table-row>
        <Row
          v-for="planta in plantas"
          :key="planta._id"
          :planta="planta"
        />
      </md-table>
      <Window />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Row from "./Row.vue";
import Window from "./Window.vue";

export default {
  name: "Table",
  components: {
    Row: Row,
    Window: Window,
  },
  data: () => {
    return {
      plantas: [],
      loadingData: true,
    };
  },
  methods: {
    getData: function () {
      axios
        .get("http://localhost:5000/api/plants")
        .then((resolve) => 
          this.plantas = resolve.data,          
          this.stopLoading())
        .catch((error) => error.msg);
    },
    stopLoading: function () {
      this.loadingData = false;
    },
  },
  mounted() {
    // Desde aquí se llamará para cargar
    this.getData();
  }
};
</script>
<style lang="scss">
.md-layout-item {
  margin: 0px 50px;
}
.md-table {
  border-radius: 20px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.md-table-head {
  text-align: center;
  font-size: 18px;
}
</style>
