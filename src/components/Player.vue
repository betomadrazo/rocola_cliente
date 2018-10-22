<template>
	<div class="consola">
		<div class="info">
			<h4>Ahora se escucha</h4>
			<h2>
				<span>{{ playingSong.artista }}</span> - <span>{{ playingSong.cancion }}</span>
				<!-- <span>{{ playingSong.artista }}</span> - <span>fnsadklf  fkldsaj fsdkla kljkfladsj l llkfsdjakl lkjklfas dkl</span> -->
			</h2>
			<div class="clearfix">
				<span id="tiempo-total" style="float:left;">{{ playingSong.tiempo_total }}</span><span id="tiempo-transcurrido" style="float:right;">{{ playingSong.tiempo_transcurrido }}</span>
			</div>
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
				cancion: 'Nausea',
				tiempo_total: '4:27',
				tiempo_transcurrido: '2:11'
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

h2 span {
	max-width: 140px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.consola {
	text-align: center;
	color: #ff8533;
	background-color: #111;
	padding-bottom: 0;
	position: fixed;
	width:100%;
	left:0;
	height:77;
	top:0;
	z-index:100;
	box-shadow: 0 0 15px #000;
}

.info {
	padding:10px;
	padding-bottom:0;
}

.porcentaje {
	background-color: #ff8533;
	width:30%;
	height:4px;
}

</style>