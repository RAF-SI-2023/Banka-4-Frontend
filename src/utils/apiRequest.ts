import { getApiUrl } from "./apiUrl";

export const getJWT = () => {
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQGdtYWlsLnJzIiwicGVybWlzc2lvbiI6NDE5NDMwMywiaWQiOjEsImV4cCI6MTcxMDQ3NDY2MCwiaWF0IjoxNzEwNDQ1ODYwfQ.zd5ImPnm9PQkFPn6gSfyR8HgW6nX1Irw2ToW_PjhRqo2U7GFJlFI-b7ENQRqruEGlAQmsMxccANf9uwncdSHiw';
    // localStorage.setItem('si_jwt', token);
    return localStorage.getItem('si_jwt');
};

export const makeApiRequest = async (route: string, type: string, data?: object, noAuth?: boolean, noJson?: boolean) => {
    try {
        const token = getJWT()
        const apiUrl = getApiUrl(route)
        const headers: HeadersInit = noAuth ? {
            'Content-Type': 'application/json',
        } : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await fetch(`${apiUrl}${route}`, {
            method: type,
            headers: headers,
            body: JSON.stringify(data)
        });
        // console.log(response)

        if (response.ok) {
            const res = noJson ? response : await response.json()// fix this shit
            return res
        }
        if (!response.ok) {
            throw new Error('Error goes errrrr');
        }
        console.log('Big YAY');
    } catch (error) {
        console.error('BIG SAD:', error);
    }
}

export const makeGetRequest = async (route: string) => {
    try {
        const token = getJWT()
        const apiUrl = getApiUrl(route)
        const response = await fetch(`${apiUrl}${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });
        if (!response.ok) {
            throw new Error('Error goes errrrr');
        }
        return await response.json()
    } catch (error) {
        console.error('BIG SAD:', error);
    }
}