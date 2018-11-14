import qs from 'qs';

const DEBUGGING = false;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' : 'http://www.betomad.com';

const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

var encryptedQueryString = window.location.search.substring(1);

// console.log(encryptedQueryString);
// var decrypedQueryString = atob(encryptedQueryString).catch(function(error) {
// 			console.log("---------------------/ ", error);
// 		});
// console.log(decrypedQueryString);

<<<<<<< HEAD



=======
>>>>>>> bdf71acb82a8f133d479014f3e6033d58ae6d8e2
try {
	var decrypedQueryString = atob(encryptedQueryString);
} catch(error) {}


// const ID_SUCURSAL = parseInt(new URLSearchParams(encryptedQueryString).get('sucursal_id'));
const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));

console.log(ID_SUCURSAL);
// window.history.replaceState({}, document.title, "/");

export {
	BASE_URL,
	ID_SUCURSAL,
};
