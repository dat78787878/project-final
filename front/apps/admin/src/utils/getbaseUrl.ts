let url: string | undefined = '';

if (process.env['NODE_ENV'] === 'development') {
  url = 'http://52.194.87.144:8000/';
  console.log("url1",url)
} else {
  if (
    process.env['NX_DOMAIN_PROD'] &&
    window.location.hostname.includes(process.env['NX_DOMAIN_PROD'])
  ) {
    url = process.env['NX_URL_PROD'];
    console.log("url2",url)
  } else {
    url = process.env['NX_URL_STAGING'];
    console.log("url3",url)
  }
}
console.log("url",url)
export const baseUrl = url;
