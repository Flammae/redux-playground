// helper functions from fp
export const pipe = (...fns) => value =>
  fns.reduce((acc, fn) => fn(acc), value);

export const trace = value => {
  console.log(value);
  return value;
};

export const renderInside = elem => html => {
  elem.innerHTML = html;
};
