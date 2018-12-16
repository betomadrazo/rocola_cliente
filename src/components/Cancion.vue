<template>
	<div 
		:class="alte" 
		class="contenedor-cancion"
		@click="setCancion"
	>
		<span class="flechita"></span><span class="titulo" :class="cancion_larga" v-html="scanTexto(cancion.titulo_cancion)"></span><span class="album-o-artista" :class="album_o_artista" v-html="scanTexto(artistaOAlbum)"></span><span class="duracion">{{ cancion.duracion }}</span>
	</div>

</template>

<script>
import router from '../main';
import { mapGetters } from 'vuex';

export default {
	name: 'Cancion',
	props: ['id_cancion', 'artista_album', 'cancion', 'album', 'duracion', 'index', 'isCola'],
	methods: {
		created(){
			console.log("=========> ", this.cancion);
		},
		setCancion(){
			console.log(this.id_cancion);
			this.$store.dispatch('setCancion', this.id_cancion);
		},

		scanTexto(texto) {
			texto = this.decodeHtml(texto);

			var nuevoTexto = "";
			for(var i=0; i<texto.length; i++) {
				if(texto[i] == "í") {
					nuevoTexto = texto.substr(0, i) + '<span style="font-family:Arial, sans-serif;">í</span>'+ texto.substr(i + 1);
				}

				if(texto[i] == "Í") {
					nuevoTexto = texto.substr(0, i) + '<span style="font-family:Arial, sans-serif;">Í</span>'+ texto.substr(i + 1);
				}
			}

			if(nuevoTexto) {
				return nuevoTexto;
			}

			return texto;
		},

		decodeHtml(html) {
			var txt = document.createElement("textarea");
			txt.innerHTML = html;
			return txt.value;
		}
	},
	computed: {
		...mapGetters(['cancionPedida', 'mySongIsPlaying']),
		alte: function() {
			return {
				cancion_alt: parseInt(this.index) % 2 === 0,
				tu_cancion: this.cancionPedida === this.cancion.id_cancion
			};	
		},
		album_o_artista: function() {
			return {
				no_album: this.$router.currentRoute.path != '/cola',
			};
		},
		cancion_larga: function() {
			return {
				cancion_larga: this.$router.currentRoute.path != '/cola'
			};
		},
		artistaOAlbum: function() {
			console.log("###", this.cancion);
			return (this.cancion.cola) ? this.decodeHtml(this.cancion.artista) : '';
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';

.contenedor-cancion {
	padding-left:1rem;
	padding-right:1rem;
	height: 3rem;
	font-family: $knockout;
}

.cancion_alt {
	background-color: $cancion_alt;
}

.no_album {
	display: none !important;		
}

.cancion_larga {
	width: 70% !important;
}

.flechita {
	color: #FF9E16;
	text-align: left;
	// margin-right:5px;
	vertical-align: middle;
	box-sizing: border-box;
    background-image: url(../assets/static/img/CANCION.png);
    background-size: 0.8rem;
    background-repeat: no-repeat;
    width: 1.6rem;
    height: 3rem;
    background-position: center;
    display: inline-blocK;
    width:10%;
}

.tu_cancion {
	background-color:  #ff8533;
}

.tu_cancion .flechita {
	color:  #42A382;
	font-weight: bolder;
    background-image: url(../assets/static/img/CANCION_PEDIDA.png) !important;
}

span {
	box-sizing: border-box;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.6rem;
	padding-right: 0.5rem;
	height: 3rem;
	line-height: 3rem;
	vertical-align: middle;
}

.titulo {
	width: 35%;
}

.album-o-artista {
	width: 35%;
}
.duracion {
	width: 20%;
	text-align: right;
}


</style>