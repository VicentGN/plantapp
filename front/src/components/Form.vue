<template>
  <div class="container">
    <div></div>
    <div>
      <form novalidate @submit.prevent="validatePlant">
        <md-card class="md-layout-item md-small-size-100">
          <md-card-header v-if="!form.id_plant">
            <div class="md-title">Registro de Nueva Planta</div>
          </md-card-header>
          <md-card-header v-else>
            <div class="md-title">Modificación de Planta Existente</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="name">Nombre Científico</label>
                  <md-input
                    name="name"
                    id="name"
                    autocomplete="given-name"
                    v-model="form.name"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.name.required"
                    >El nombre es requerido</span
                  >
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('sample')">
                  <label for="habitat">Descripción de la muestra</label>
                  <md-textarea
                    name="habitat"
                    id="habitat"
                    v-model="form.sample"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.sample.required"
                    >La descripción de la muestra es requerida</span
                  >
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('habitat')">
                  <label for="habitat">Descripción del hábitat</label>
                  <md-textarea
                    name="habitat"
                    id="habitat"
                    v-model="form.habitat"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.habitat.required"
                    >La descripción del hábitat es requerida</span
                  >
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('coordinates')">
                  <label class="label-map" for="coordinates"
                    >Lugar de recogida de la muestra</label
                  >
                  <md-input
                    name="coordinates"
                    id="coordinates"
                    :disabled="true"
                    v-model="form.coordinates"
                  />
                  <span class="md-error" v-if="!$v.form.coordinates.required"
                    >Las coordenadas son requeridas
                  </span>
                </md-field>
                <div class="parent">
                  <l-map
                    :zoom="zoom"
                    :center="center"
                    v-on:click="selectPositionOnMap"
                  >
                    <l-tile-layer :url="url" :attribution="attribution" />
                    <div v-if="markerLatLng">
                      <l-marker :lat-lng="markerLatLng" />
                    </div>
                  </l-map>
                </div>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button
              type="button"
              @click="clearForm()"
              class="md-primary"
              :disabled="sending"
              >Limpiar Formulario</md-button
            >
          </md-card-actions>
          <md-card-actions v-if="!form.id_plant">
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Guardar Planta</md-button
            >
          </md-card-actions>
          <md-card-actions v-else>
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Modificar Planta</md-button
            >
          </md-card-actions>
        </md-card>

        <md-snackbar v-if="!form.id_plant" :md-active.sync="plantSaved"
          >La planta {{ lastPlant }} ha sido almacenada
          exitosamente!</md-snackbar
        >
        <md-snackbar v-else :md-active.sync="plantSaved"
          >La planta {{ lastPlant }} ha sido actualizada
          exitosamente!</md-snackbar
        >
      </form>
    </div>
    <div></div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from "axios";

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
// import EventBus from "./../bus.js";

// Reseteo de Iconos para que puedan visualizarse
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data: () => ({
    form: {
      _id: null,
      name: null,
      sample: null,
      habitat: null,
      coordinates: null,
    },
    plantSaved: false,
    sending: false,
    lastPlant: null,
    zoom: 1,
    center: latLng(0, 0),
    markerLatLng: null,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }),
  validations: {
    form: {
      name: {
        required,
      },
      sample: {
        required,
      },
      habitat: {
        required,
      },
      coordinates: {
        required,
      },
    },
  },
  methods: {
    selectImage: function () {
      this.form.plant_image = this.$refs.image.files[0];
      console.log(this.form.plant_image);
    },
    selectPositionOnMap: function (e) {
      this.markerLatLng = e.latlng;
      this.form.coordinates = [e.latlng.lat, e.latlng.lng];
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.habitat = null;
      this.form.sample = null;
      this.form.coordinates = null;
      this.markerLatLng = null;
    },
    savePlant() {
      this.sending = true;

      let dataForm = {
        name: this.form.name,
        sample: this.form.sample,
        habitat: this.form.habitat,
        coordinates: this.form.coordinates,
      };

      axios
        .post("http://localhost:5000/api/plants", dataForm)
        .then(
          () => (this.sending = false),
          (this.plantSaved = true),
          (this.lastPlant = this.form.name),
          this.clearForm()
        )
        .catch((error) => alert(error.response.data.message));
    },
    updatePlant() {
      this.sending = true;

      let dataForm = {
        name: this.form.name,
        sample: this.form.sample,
        habitat: this.form.habitat,
        coordinates: this.form.coordinates,
      };

      axios
        .put(
          "http://localhost:5000/api/plants/" + this.$route.params.id,
          dataForm
        )
        .then(
          () => (this.sending = false),
          (this.plantSaved = true),
          (this.lastPlant = this.form.name),
        )
        .catch((error) => alert(error.response.data.message));
    },
    validatePlant() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.form.id_plant ? this.updatePlant() : this.savePlant();
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      axios
        .get("http://localhost:5000/api/plants/" + this.$route.params.id)
        .then(
          (resolve) => (
            (this.form = {
              id_plant: resolve.data._id,
              name: resolve.data.name,
              sample: resolve.data.sample,
              habitat: resolve.data.habitat,
              coordinates: resolve.data.coordinates,
            }),
            (this.markerLatLng = resolve.data.coordinates)
          )
        )
        .catch((error) => error.msg);
    }
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.md-field {
  margin: 4px 0 12px;
}

.container {
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.5fr;
}

@media (min-width: 1392px) {
  .container {
    display: grid;
    grid-template-columns: 1.5fr 2fr 1.5fr;
  }
}

.md-card {
  border-radius: 20px;
}
.label-map {
  color: rgba(0, 0, 0, 0.54);
}
.class-map {
  margin: 0px;
}
.parent {
  height: 100%;
  width: 100%;
  margin-top: 30px;
}
.leaflet-container {
  height: 200px;
}
</style>