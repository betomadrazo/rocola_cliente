import qs from 'qs';

const DEBUGGING = false;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' : 'http://www.betomad.com';

// const BASE_URL = 'http://www.betomad.com/rocola/consola/controllers/controller_musica.php';
const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

var encryptedQueryString = window.location.search.substring(1);

window.history.replaceState({}, document.title, "/");

console.log(encryptedQueryString);
var decrypedQueryString = atob(encryptedQueryString);
console.log(decrypedQueryString);

const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id')) || 1;

console.log(ID_SUCURSAL);

export {
	BASE_URL,
	ID_SUCURSAL,
};