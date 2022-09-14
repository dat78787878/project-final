export const setQuery = (data: { [key: string]: string }) => {
  const newObj: { [key: string]: string } = {};
  Object.keys(data).forEach((element: string) => {
    newObj[`q[${element}]`] = data[element];
  });
  return newObj;
};
