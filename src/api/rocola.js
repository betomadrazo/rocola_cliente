const DEBUGGING = true;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' 
																 : 'http://rockola.pendulo.com.mx';
																 // : 'http://www.betomad.com';

const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

var encryptedQueryString = window.location.search.substring(1);

try {
	var decrypedQueryString = atob(encryptedQueryString);
} catch(error) {}


// const ID_SUCURSAL = parseInt(new URLSearchParams(encryptedQueryString).get('sucursal_id'));
const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));
const TIPO_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('tipo_sucursal'));

console.log(ID_SUCURSAL);
// window.history.replaceState({}, document.title, "/");

export {
	BASE_URL,
	ID_SUCURSAL,
};
