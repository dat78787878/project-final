let url: string | undefined = '';

if (process.env['NODE_ENV'] === 'development') {
  url = 'https://api.do-thanh-dat.tech/';
  console.log("1")
} else {
  if (
    process.env['NX_DOMAIN_PROD'] &&
    window.location.hostname.includes(process.env['NX_DOMAIN_PROD'])
  ) {
    url = process.env['NX_URL_PROD'];
    console.log("2")
   
  } else {
    url = process.env['NX_URL_STAGING'];
    console.log("3")
   
  }
}
console.log("url",url)
export const baseUrl = url;
