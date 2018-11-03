import qs from 'qs';

const DEBUGGING = true;

const DEBUG_DOMAIN = (DEBUGGING) ? 'http://localhost' : 'http://www.betomad.com';

// const BASE_URL = 'http://www.betomad.com/rocola/consola/controllers/controller_musica.php';
const BASE_URL = `${DEBUG_DOMAIN}/rocola/consola/controllers/controller_musica.php`;
const ID_SUCURSAL = parseInt(new URLSearchParams(window.location.search).get('sucursal_id'));

export {
	BASE_URL,
	ID_SUCURSAL,
};