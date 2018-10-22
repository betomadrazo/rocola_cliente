<template>
	<div class="contenedor">
		<Player></Player>
		<CatalogoArtistas></CatalogoArtistas>
		<Canciones></Canciones>
		<!-- <BotonPedir></BotonPedir> -->
		<Cola></Cola>
		<Status></Status>
	</div>
</template>

<script>
import Player from './components/Player';
import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';
import Cola from './components/Cola';
import BotonPedir from './components/BotonPedir';
import Status from './components/Status';

export default {
	name: 'App',
	components: {
		Player,
		CatalogoArtistas,
		Canciones,
		Cola,
		BotonPedir,
		Status,
	}
};

</script>

<style scoped>
	
.contenedor {
	min-width:300px;
	max-width: 1024px;
	margin:auto;
	margin-top:77px;
}

</style>