<template>
	<div class="contenedor-pedir">
		<div class="boton-pedir">
			pedir canci&oacute;n
		</div>
	</div>
</template>
<script>

export default {
	name: 'BotonPedir'
};

</script>
<style scoped>

.contenedor-pedir {
	text-align: center;
	min-height: 100px;
	padding: 40px;
}

.boton-pedir {
	width:75%;
	margin:auto;
	height:50%;
	background-color: green;
	color: #fff;
	padding:30px;
	font-size: 20px;
	text-transform: uppercase;
}

</style>