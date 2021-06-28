const BASE_URL = 'https://newsapi.org/v2';

export const latestTrends = async (apiKey) => {
    const FETCH_LATEST_URL = `top-headlines?country=us&apiKey=${apiKey}`;
    const REQUEST_URL = `${BASE_URL}/${FETCH_LATEST_URL}`;
    const response = await fetch(REQUEST_URL);
    return await response.json();
}

export const fetchTrends = async (searchParam) => {
    const FETCH_TRENDS_URL = `${BASE_URL}/everything`
    let CONSTRUCTED_URL = '';
    for (const key in searchParam) {
        CONSTRUCTED_URL += CONSTRUCTED_URL === '' ?
            `${key}=${searchParam[key]}` :
            `&${key}=${searchParam[key]}`;
    }
    let REQUEST_URL = `${FETCH_TRENDS_URL}?${CONSTRUCTED_URL}`;
    const response = await fetch(REQUEST_URL);
    return await response.json();
};
