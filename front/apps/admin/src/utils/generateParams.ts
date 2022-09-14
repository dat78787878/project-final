export const generateParams = (
  path: string,
  params: { [key: string]: any }
) => {
  let url = path + '?';
  Object.keys(params).forEach((item, index) => {
    url += `${item}=${params[item]}${
      index < Object.keys(params).length - 1 ? '&' : ''
    }`;
  });
  return url;
};
