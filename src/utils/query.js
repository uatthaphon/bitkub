/**
 * @param  {object} params The query parameter object
 */
export const transformQuery = (params) => {
  const q = [];

  Object.keys(params)
    .filter((key) => params[key])
    .forEach((key) => {
      q.push(`${key}=${params[key]}`);
    });

  const query = q.join('&');

  return query.length > 0 ? `?${query}` : '';
};
