export const parseQueryString = (search: string) => {
  const ret: Record<string, string> = {};

  if (search === '') return null;
  const params = new URLSearchParams(search);

  params.forEach((value, key) => {
    console.log(key, value);
    ret[key] = value;
  });

  return ret;
};
