<template>
	<div class="contenedor-cola">
	<h2>Canciones en cola</h2>
		<ul>
			<li>
				<Cancion></Cancion>
			</li>
		</ul>
	</div>
</template>

<script>

import Cancion from './Cancion';

export default {
	name: 'Cola',
	components: {
		Cancion
	}
};

</script>

<style scoped>

.contenedor-cola {
	min-height: 300px;
}

ul {
	list-style: none;
	padding: 0;
}

</style>