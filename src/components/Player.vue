<template>
	<div>
		<h4>Ahora se escucha</h4>
		<!-- <h2 :playing="now_playing">{{ nowPlaying }}</h2> -->
		<h2>Beck - Nausea</h2>
		<h3>Ahora se escucha</h3>
		<div>
			<span>2:11</span>
			<span>4:27</span>
		</div>
		<div></div>
	</div>
</template>

<script>
	
export default {
	name: 'Player',
	data: {
		playingSong: {
			artista: 'Beck',
			cancion: 'Nausea'
		}
	}
}

</script>

<style scoped>
	


</style>