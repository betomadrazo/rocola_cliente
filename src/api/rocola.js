import qs from 'qs';

const DEBUGGING = false;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' : 'http://www.betomad.com';

// const BASE_URL = 'http://www.betomad.com/rocola/consola/controllers/controller_musica.php';
const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

var encryptedQueryString = window.location.search.substring(1);

// console.log(encryptedQueryString);
// var decrypedQueryString = atob(encryptedQueryString).catch(function(error) {
// 			console.log("---------------------/ ", error);
// 		});;
// console.log(decrypedQueryString);}


// try {
// 	var decrypedQueryString = atob(encryptedQueryString);
// } catch(error) {}


const ID_SUCURSAL = parseInt(new URLSearchParams(encryptedQueryString).get('sucursal_id'));
// const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));

console.log(ID_SUCURSAL);
// window.history.replaceState({}, document.title, "/");

export {
	BASE_URL,
	ID_SUCURSAL,
};
