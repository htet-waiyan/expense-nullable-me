export const constructParam = (url, params) => {
  const t = `t=${new Date().getTime()}`;
  const q = [];
  q.push(t);
  Object.keys(params).forEach((key) => {
    q.push(`${key}=${params[key]}`);
  });

  return `${url}?${q.join('&')}`;
};

export const getRandomStr = () => {};
