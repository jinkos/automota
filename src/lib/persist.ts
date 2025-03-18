export type Score = {
    myScore: number,
    compScore: number,
};

export const saveUserName = (name: string) => {

    localStorage.setItem('userName', JSON.stringify(name));
}

export const loadUserName = (): string => {

    const storedData = localStorage.getItem('userName');

    if (!storedData) return '';

    const parsedData = JSON.parse(storedData);

    return parsedData;
}

export const saveScore = (score: Score) => {

    localStorage.setItem('score', JSON.stringify(score));
}

export const loadScore = (): Score => {

    const storedData = localStorage.getItem('score');

    if (!storedData) return { myScore: 0, compScore: 0 };

    const parsedData = JSON.parse(storedData);

    return parsedData;
}
