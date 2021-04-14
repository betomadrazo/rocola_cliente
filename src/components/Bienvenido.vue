<template>
  <div>
    <div class="titulo_app" :style="getTitular"></div>
    <div class="textura">
      <div></div>
      <div></div>
    </div>
    <div class="fondo_app"></div>
  </div>
</template>

<script>
import Fingerprint2 from "fingerprintjs2";

import { mapActions, mapGetters, mapMutations } from "vuex";
import { router } from "../main";

export default {
  name: "Bienvenido",
  created() {
    this.$store.dispatch("songStatus");

    var self = this;
    this.$store.dispatch("getCancionesEnCola");

    if (!this.deviceId) {
      if (window.requestIdleCallback) {
        requestIdleCallback(function () {
          Fingerprint2.get(function (components) {
            var values = components.map(function (component) {
              return component.value;
            });
            var murmur = Fingerprint2.x64hash128(values.join(""), 31);

            self.$store.dispatch("setDeviceId", murmur);
            self.$store.dispatch("getCancionPedida");
            self.$store.dispatch("getPuedePedir");
          });
        });
      } else {
        setTimeout(function () {
          Fingerprint2.get(function (components) {
            var values = components.map(function (component) {
              return component.value;
            });
            var murmur = Fingerprint2.x64hash128(values.join(""), 31);

            self.$store.dispatch("setDeviceId", murmur);
          });
        }, 500);
      }
    }

    let ID_SUCURSAL = this.getIdSucursal(window.location.search.substring(1));

    this.$store.dispatch("setIDsucursal", ID_SUCURSAL);

    setTimeout(() => {
      this.$store.dispatch("getPlayerVars").then(() => {
        if (this.ID_SUCURSAL && this.artistaAhoraServer) {
          router.push("/cola");
        }
      });
    }, 2500);

    var init = setInterval(() => {
      this.$store.dispatch("getPlayerVars").then(() => {
        if (this.ID_SUCURSAL && this.artistaAhoraServer) {
          clearInterval(init);
          router.push("/cola");
        } else {
          console.log("no están listas las variables");
        }
      });
    }, 2500);
  },
  methods: {
    ...mapActions([
      "getCancionesEnCola",
      "getPlayerVars",
      "setDeviceId",
      "getCancionPedida",
      "songStatus",
      "setIDsucursal",
    ]),

    getIdSucursal(idSucursal) {
      let sucursales = {
        condesa: 11,
        polanco: 12,
        santafe: 13,
        perisur: 14,
        zonarosa: 15,
        roma: 16,
        sanangel: 17,
        prueba: 20,
      };

      return sucursales[idSucursal];
    },
  },
  computed: {
    ...mapGetters([
      "deviceId",
      "artistaAhoraServer",
      "ID_SUCURSAL",
      "transcurrido",
    ]),
    getTitular() {
      var image = require.context("../assets/static/img/");
      return this.ID_SUCURSAL
        ? `background-image: url(${image("./titulo_app.png")});`
        : `background-image: url(${image("./VISITANOS-APP.png")});`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/estilo";

h1 {
  text-align: center;
}

.fondo_app,
.titulo_app {
  width: 100%;
  height: 100%;
  display: block;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.titulo_app {
  background-size: 75%;
  background-position: center;
  background-repeat: no-repeat;
}

.textura {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: radial-gradient(#9cca82, #06938e 70%);
  background-position: center;
  background-repeat: no-repeat;

  & div {
    width: 30%;
    height: 100%;

    &:nth-of-type(1) {
      background-image: url(../assets/static/img/rayas_app_a.png);
      float: left;
      background-repeat: repeat-y;
      background-position: left;
    }
    &:nth-of-type(2) {
      float: right;
      background-image: url(../assets/static/img/rayas_app_b.png);
      background-repeat: repeat-y;
      background-position: right;
    }
  }
}

@media (min-width: 500px) {
  .titulo_app {
    background-size: 60%;
  }
}

@media (min-width: 600px) {
  .titulo_app {
    background-size: 35%;
  }
}
</style>