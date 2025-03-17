export const saveUserName = (name: string) => {
  localStorage.setItem('userName', JSON.stringify(name));
}

export const loadUserName = () => {
  const storedData = localStorage.getItem('userName');
  if (!storedData) return null;
  const parsedData = JSON.parse(storedData);
  return parsedData;
}

