export const saveUserName = (name: string) => {

    localStorage.setItem('userName', JSON.stringify(name));
}

export const loadUserName = (): string => {

    const storedData = localStorage.getItem('userName');

    if (!storedData) return '';

    const parsedData = JSON.parse(storedData);

    return parsedData;
}

