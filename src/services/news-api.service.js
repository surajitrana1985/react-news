const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchTrends = async (searchParam) => {
    let CONSTRUCTED_URL = '';
    for (const key in searchParam) {
        CONSTRUCTED_URL += CONSTRUCTED_URL === '' ?
            `${key}=${searchParam[key]}` :
            `&${key}=${searchParam[key]}`;
    }
    let REQUEST_URL = `${BASE_URL}?${CONSTRUCTED_URL}`;
    try {
        const response = await fetch(REQUEST_URL);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
};
