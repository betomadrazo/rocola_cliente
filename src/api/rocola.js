const DEBUGGING = true;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' 
// : 'http://betomad.com';
: 'http://rocola.pendulo.com.mx';

const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

console.log(BASE_URL);

// const ID_SUCURSAL = getIdSucursal(
// 	new URLSearchParams(
// 		window.location.search.substring(1)
// 		).get('sucursal_id'));

const ID_SUCURSAL = getIdSucursal(
	new URLSearchParams(
		window.location.search.substring(1)
	).get('sucursal')
);

console.log("###", ID_SUCURSAL);

function getIdSucursal(idSucursal) {
	let sucursales = {
		 'condesa':   11,
		 'polanco':   12,
		 'santa_fe':  13,
		 'perisur':   14,
		 'zona_rosa': 15,
		 'roma':      16,
		 'san_angel': 17,
		 'prueba':    20
	};

	return sucursales[idSucursal];
}


export {
	BASE_URL,
	ID_SUCURSAL
};
