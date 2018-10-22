<template>
	<div class="contenedor-thumb">
		<img src="http://www.betomad.com/rocola/consola/album_artwork/img_placeholder.jpg" alt="">
		<p>artistilla</p>
	</div>
</template>
<script>
	
export default {
	name: 'ThumbArtista'
};

</script>
<style scoped>
	
.contenedor-thumb {
	/*border:1px solid;*/	
	margin-top:4px;
	margin-bottom:4px;
	margin:4px;
	width:80px;
	height:110px;
	text-align: center;
	display: inline-block;
	cursor: pointer;
}

img {
	width:100%;
	max-height: 90px;
}

p {
	margin: 0;
	color: #eee;
}

</style>