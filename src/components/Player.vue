<template>
	<div class="consola">
		<h4>Ahora se escucha</h4>
		<!-- <h2 :playing="now_playing">{{ nowPlaying }}</h2> -->
		<h2>Beck - Nausea</h2>
		<div>
			<span>2:11</span>
			<span>4:27</span>
		</div>
		<div class="porcentaje"></div>
	</div>
</template>

<script>
	
export default {
	name: 'Player',
	data: () => {
		return {
			playingSong: {
				artista: 'Beck',
				cancion: 'Nausea'
			}
		}
	}
}

</script>

<style scoped>

h4, h3, h2 {
	margin-top:0;
	margin-bottom:0;
}

.consola {
	text-align: center;
	color: #ff8533;
	background-color: #111;
	padding-top: 10px;
	padding-bottom: 0;
	position: fixed;
	width:100%;
	left:0;
	height:77;
	top:0;
	z-index:100;
	box-shadow: 0 0 15px #000;
}

.porcentaje {
	background-color: #ff8533;
	width:30%;
	height:4px;
}

</style>