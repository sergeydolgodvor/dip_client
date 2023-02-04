export default (string) => {
  const initials = string
    .split(' ')
    .slice(1, 3)
    .map((el) => el.slice(0, 1) + '.')
    .join('');
  const surname = string.split(' ')[0];

  const newString = `${surname} ${initials}`;

  return newString;
};
