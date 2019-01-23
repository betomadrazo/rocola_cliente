const DEBUGGING = true;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' : 'http://betomad.com';
// : 'http://rocola.pendulo.com.mx';

const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;

let decryptedQueryString;

console.log(BASE_URL);
// const ID_SUCURSAL = 20;
let encryptedQueryString = window.location.search.substring(1);

console.log("encrypted", encryptedQueryString);

try {
	decryptedQueryString = atob(encryptedQueryString);
	console.log(decryptedQueryString);
	console.log("decrypted", decryptedQueryString);
} catch(error) {
	console.log("error", error);
}

// const ID_SUCURSAL = parseInt(new URLSearchParams(encryptedQueryString).get('sucursal_id'));
const ID_SUCURSAL = parseInt(new URLSearchParams(decryptedQueryString).get('sucursal_id'));

console.log("###", ID_SUCURSAL);


export {
	BASE_URL,
	ID_SUCURSAL,
	// TIPO_SUCURSAL
};
