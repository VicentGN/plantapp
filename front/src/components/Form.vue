<template>
  <div class="container">
    <div></div>
    <div>
      <form
        novalidate
        enctype="multipart/form-data"
        class="md-layout md-alignment-top-center"
        @submit.prevent="validatePlant"
      >
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
            <!-- <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('legiti_dni')">
                  <label for="legiti_dni">Recolector</label>
                  <md-input
                    name="legiti_dni"
                    id="legiti_dni"
                    autocomplete="family-legiti_dni"
                    v-model="form.legiti_dni"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.legiti_dni.required"
                    >El recolector es requerido</span
                  >
                  <span class="md-error" v-if="!$v.form.legiti_dni.onlyDni"
                    >El formato DNI no coincide</span
                  >
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('determini_dni')">
                  <label for="determini_dni">Identificador</label>
                  <md-input
                    name="determini_dni"
                    id="determini_dni"
                    autocomplete="family-determini_dni"
                    v-model="form.determini_dni"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.determini_dni.required"
                    >El identificador es requerido</span
                  >
                  <span class="md-error" v-if="!$v.form.determini_dni.onlyDni"
                    >El formato DNI no coincide</span
                  >
                </md-field>
              </div>
            </div> -->
            <!-- <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <label>Subir imagen</label><br />
                <input type="file" ref="image" @change="selectImage()" />
              </div>
            </div> -->
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
import { required, helpers } from "vuelidate/lib/validators";
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

// Custom Validations
const onlyDni = helpers.regex("dni", /^[0-9]{8,8}[A-Z]$/);

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
      id_plant: null,
      name: null,
      // plant_image: null,
      // plant_hash: null,
      // legiti_dni: null,
      // determini_dni: null,
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
      legiti_dni: {
        required,
        onlyDni,
      },
      determini_dni: {
        required,
        onlyDni,
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
      console.log(this.form.plant_image)
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
      // this.form.plant_image = null;
      this.form.habitat = null;
      // this.form.legiti_dni = null;
      // this.form.determini_dni = null;
      this.form.sample = null;
      this.form.coordinates = null;
      this.markerLatLng = null;
    },
    savePlant() {
      this.sending = true;

      const formData = new FormData();
      formData.append("name", this.form.name);
      // formData.append("plant_image", this.form.plant_image);
      // formData.append("legiti_dni", this.form.legiti_dni);
      // formData.append("determini_dni", this.form.determini_dni);
      formData.append("sample", this.form.sample),
      formData.append("habitat", this.form.habitat);
      formData.append("coordinates", this.form.coordinates);

      axios
        .post("http://localhost:4000/api/plants/new", formData)
        .then(
          (resolve) => this.displayServerError(resolve.data.errno, "create"),
          (this.sending = false)
        )
        .catch((error) => alert(error.response.data.message));
    },
    updatePlant() {
      this.sending = true;

      const formData = new FormData();
      formData.append("id_plant", this.form.id_plant);
      formData.append("name", this.form.name);
      // formData.append("plant_image", this.form.plant_image);
      // formData.append("legiti_dni", this.form.legiti_dni);
      // formData.append("determini_dni", this.form.determini_dni);
      formData.append("sample", this.form.sample),
      formData.append("habitat", this.form.habitat);
      formData.append("coordinates", this.form.coordinates);

      axios
        .put("http://localhost:4000/api/plants/update", formData)
        .then(
          (resolve) => this.displayServerError(resolve.data.errno, "update"),
          (this.sending = false)
        )
        .catch((error) => alert(error.response.data.message));
    },
    validatePlant() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.form.id_plant ? this.updatePlant() : this.savePlant();
      }
    },
    displayServerError(error, action) {
      if (error == 1452) {
        alert("El DNI introducido no está registrado en nuestro sistema");
      } else {
        if (action == "update") {
          (this.plantSaved = true), (this.lastPlant = this.form.name);
        } else {
          (this.plantSaved = true),
            (this.lastPlant = this.form.name),
            this.clearForm();
        }
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      axios
        .get("http://localhost:4000/api/plants/" + this.$route.params.id)
        .then(
          (resolve) => (
            (this.form = {
              id_plant: resolve.data[0].id_plant,
              name: resolve.data[0].name,
              // plant_image: resolve.data[0].plant_image,
              // legiti_dni: resolve.data[0].legiti_dni,
              // determini_dni: resolve.data[0].determini_dni,
              sample: resolve.data[0].sample,
              habitat: resolve.data[0].habitat,
              coordinates: [resolve.data[0].lat, resolve.data[0].lng],
            }),
            (this.markerLatLng = [resolve.data[0].lat, resolve.data[0].lng])
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
.container {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr;
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
  height: 500px;
  width: 100%;
  margin-top: 30px;
}
</style>