<template>
  <md-table-row>
    <md-table-cell>{{ planta.id_plant }}</md-table-cell>
    <md-table-cell>{{ planta.name }}</md-table-cell>
    <md-table-cell>{{ planta.sample }}</md-table-cell>
    <md-table-cell class="fecha">{{ formatDate() }}</md-table-cell>
    <!-- <md-table-cell>{{ planta.legiti_dni }}</md-table-cell>
    <md-table-cell>{{ planta.determini_dni }}</md-table-cell> -->
    <md-table-cell>{{ planta.habitat }}</md-table-cell>
    <md-table-cell>
      <md-icon v-on:click.native="edit()">edit</md-icon>
      <md-icon v-on:click.native="borrarCall()">delete</md-icon>
    </md-table-cell>
  </md-table-row>
</template>

<script>
import EventBus from '../bus.js';
import moment from 'moment';
export default {
  name: "Row",
  props: ["planta"],
  data: () => {
    return {
      borrarActivado: false
    }
  },
  methods: {
    borrarCall: function() {
      // Le pasa el identificador de la planta a borrar por un bus de comunicaciones
      this.borrarActivado = true;
      EventBus.$emit('borrarPlanta', this.planta);
      this.borrarActivado = false;
    },
    edit: function() {
      this.$router.push({name: 'FormEdit', params: {id: this.planta.id_plant }})
    },
    formatDate: function() {
      return moment(this.planta.date).format('DD-MM-YYYY');
    }
  }
};
</script>

<style class="scss" scoped>

.md-table-row:hover {
  background: #42b883;
  color: white;
}

.md-table-row:hover > .md-table-cell > .md-table-cell-container > .md-icon {
  color:white;
}
.md-table-cell{
  font-size: 14px;
}
.md-icon{
  cursor: pointer;
  margin: 0px 5px;
}
.fecha {
  width: 10%;
}
</style>