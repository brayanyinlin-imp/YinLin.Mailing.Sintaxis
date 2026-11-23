import { defineBrand } from '#core/brand'

/** No Hay Sin Suerte. Los links pasan por el login y vuelven a la ruta con returnUrl. */
export default defineBrand({
  id: 'nhss',
  site: 'https://jorgitoluna.com',
  assets: 'https://stnohaysinsuerteprod.blob.core.windows.net/mailing/',
  utm: { source: 'newsletter', medium: 'email' },
  link: (path) => ({ path: '/iniciar-sesion', query: { returnUrl: path } }),
  personalization: { },
  styles: new URL('./styles.css', import.meta.url),
})
