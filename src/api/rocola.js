const DEBUGGING = true;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' 
																 : 'http://rocola.pendulo.com.mx';

const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

var encryptedQueryString = window.location.search.substring(1);

try {
	var decryptedQueryString = atob(encryptedQueryString);
	console.log(decryptedQueryString);
} catch(error) {}

// const ID_SUCURSAL = parseInt(new URLSearchParams(encryptedQueryString).get('sucursal_id'));
const ID_SUCURSAL = parseInt(new URLSearchParams(decryptedQueryString).get('sucursal_id'));

console.log(ID_SUCURSAL);

export {
	BASE_URL,
	ID_SUCURSAL,
	TIPO_SUCURSAL
};
