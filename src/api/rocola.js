const DEBUGGING = false

const DOMAIN = DEBUGGING ? 'http://localhost' : 'https://betomad.com'

const BASE_URL = `${DOMAIN}/rocola/consola/controllers/controller_musica.php`

const ID_SUCURSAL = getIdSucursal(window.location.search.substring(1))

function getIdSucursal(idSucursal) {
  let sucursales = {
    condesa: 11,
    polanco: 12,
    santafe: 13,
    perisur: 14,
    zonarosa: 15,
    roma: 16,
    sanangel: 17,
    prueba: 20,
  }

  return sucursales[idSucursal]
}

export { BASE_URL, ID_SUCURSAL }
