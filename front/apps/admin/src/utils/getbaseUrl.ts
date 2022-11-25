let url: string | undefined = '';

if (process.env['NODE_ENV'] === 'development') {
  url = 'http://api.do-thanh-dat.tech:8000/';
} else {
  if (
    process.env['NX_DOMAIN_PROD'] &&
    window.location.hostname.includes(process.env['NX_DOMAIN_PROD'])
  ) {
    url = process.env['NX_URL_PROD'];
  } else {
    url = process.env['NX_URL_STAGING'];
  }
}

export const baseUrl = url;
