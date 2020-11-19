<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Borrar Planta</md-dialog-title>
      <md-dialog-content>Desea borrar la planta {{ planta.id_plant }} - {{ planta.name }}?</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-secondary md-raised" @click="onCancel()">Cancelar</md-button>
        <md-button class="md-primary md-raised" @click="onConfirm()">Borrar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import EventBus from '../bus.js';
  import axios from 'axios';
  export default {
    name: 'DialogConfirm',
    data: () => ({
      showDialog: false,
      planta: ''
    }),
    methods: {
      onConfirm () {
        axios.delete('http://localhost:5000/api/plants/' + this.planta._id)
          .then((resolve )=>
          this.$parent.$data.plantas = this.$parent.$data.plantas.filter(planta => planta._id != resolve.data._id),      
          this.showDialog =  false
          )
          .catch((error) => alert(error.response.data.message))
      },
      onCancel () {
        this.showDialog = false;
      }
    },
    mounted: function() {
      // Recibe la planta a borrar que la fila le pasa por el bus de comunicaciones
      EventBus.$on('borrarPlanta', (planta) => {
        this.planta = planta,
        this.showDialog = true
      })
    }
  }
</script>