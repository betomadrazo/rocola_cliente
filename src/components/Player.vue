<template>
	<div class="consola">
		<div class="navegador">
			<!-- <router-link  class="linko atras" to="/">&#12296;</router-link> -->
			<span v-if="$routerHistory.hasPrevious()">
				<router-link  class="linko atras" :to="{ path: $routerHistory.previous().path }">&#12296;</router-link>
			</span>
			<span class="loguito">
				<!-- <img src="../assets/static/img/loguito.png" alt=""> -->
			</span>
		</div>
		<div class="info">
			<h4>Ahora se escucha</h4>
			<h2>
				<span>{{ playingSong.artista }}</span> - <span>{{ playingSong.cancion }}</span>
				<!-- <span>{{ playingSong.artista }}</span> - <span>fnsadklf  fkldsaj fsdkla kljkfladsj l llkfsdjakl lkjklfas dkl</span> -->
			</h2>
			<div>
				<span class="tiempo-total"><span>{{ playingSong.tiempo_total }}</span><span>&#8250;</span></span>
				<span class="porcentaje">
					<span class="porcentaje-transcurrido"></span>
				</span>
				<span class="tiempo-transcurrido">{{ playingSong.tiempo_transcurrido }}</span>
			</div>
		</div>
		<h3 class="seccion">Artistas</h3>
	</div>
</template>

<script>
import router from '../main';
	
export default {
	name: 'Player',
	data: () => {
		return {
			playingSong: {
				artista: 'Beck',
				cancion: 'Nausea',
				tiempo_total: '4:27',
				tiempo_transcurrido: '2:11'
			}
		};
	},
	created() {
		console.log(this.$router);
	}
}

</script>

<style scoped>

h4, h3, h2 {
	margin-top:0;
	margin-bottom:0;
}

h2 span {
	max-width: 140px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
	text-transform: uppercase;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.navegador {
	height:50px;
	width:100%;
}

.loguito {
    float: right;
    width: 50px;
    height: 49px;
    position: relative;
    left: -20px;
    top: 0px;
    background-image: url(../assets/static/img/loguito.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 75%;
}

.loguito img {
	height:24px;

}

.consola {
	text-align: center;
	color: #fff;
	background-color: #45A774;
	padding-bottom: 0;
	position: fixed;
	width:100%;
	left:0;
	height:130px;
	top:0;
	z-index:100;
	/*box-shadow: 0 0 15px #000;*/
}

.info {
	padding:10px;
	padding-top:0;
	padding-bottom:10px;
}

.porcentaje {
	background-color: #000;
	background-color: #197A56;
	position:relative;
	width:58%;
	text-align: left;
}

.tiempo-total, .tiempo-transcurrido {
	font-weight: bold;
	width:18%;
	display:inline-block;
}

.tiempo-total {
	width:22%;
}

.tiempo-total span:nth-of-type(1) {
	width:85%;
	display: inline-block;
}

.tiempo-total span:nth-of-type(2) {
	width:15%;
	display: inline-block;
	text-align: left;
	vertical-align: middle;
	font-size:16px;
	color: orange;
}

.porcentaje-transcurrido {
	background-color: #ff8533;
	width:30%;
	
}

.porcentaje, .porcentaje-transcurrido {
	border-radius:3px;
	display: inline-block;
	height:5px;
}

.porcentaje-transcurrido {
	position:absolute;
	width:60%;
}

.atras {
    text-decoration: none;
    color: #197A56;
    font-size: 40px;
    float: left;
    border: none !important;
}

.atras:active {
	color: #ff8533;
}


.seccion {
	margin-top:0;
	font-weight: normal;
	width:100%;
	position:fixed;
	background-color: #42A382;
	top:127px;
	padding-top:5px;
	padding-bottom:5px;
}

</style>