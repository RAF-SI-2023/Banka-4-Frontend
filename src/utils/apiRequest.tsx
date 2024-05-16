import { jwtDecode } from "jwt-decode";
import { getApiUrl } from "./apiUrl";
import { Context, Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { ContextType } from "App";


type Decoded = {
    permission: number;
    exp: number;
}


export const getJWT = () => {
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQGdtYWlsLnJzIiwicGVybWlzc2lvbiI6NDE5NDMwMywiaWQiOjEsImV4cCI6MTcxMDQ3NDY2MCwiaWF0IjoxNzEwNDQ1ODYwfQ.zd5ImPnm9PQkFPn6gSfyR8HgW6nX1Irw2ToW_PjhRqo2U7GFJlFI-b7ENQRqruEGlAQmsMxccANf9uwncdSHiw';
    // localStorage.setItem('si_jwt', token);
    const token = localStorage.getItem('si_jwt')
    if (token) {
        const decoded: Decoded = jwtDecode(token);
        if (decoded && decoded.exp) {
            const now = new Date().getTime()
            if (decoded.exp * 1000 < now) {
                localStorage.removeItem('si_jwt')
            }
            const tokenRemovalTimestamp = Number(localStorage.getItem('tokenRemovalTimestamp'));
            const expirationThreshold = 1000 * 10 * 1; // 10 sec
            if (tokenRemovalTimestamp && Date.now() - tokenRemovalTimestamp > expirationThreshold) {
                localStorage.removeItem('si_jwt');
                localStorage.removeItem('tokenRemovalTimestamp');
            }
            else {
                localStorage.removeItem('tokenRemovalTimestamp');
            }

            return token;
        }
    }
};

export const makeApiRequest = async (
    route: string,
    type: string,
    data?: object,
    noAuth?: boolean,
    noJson?: boolean,
    ctx?: ContextType | null
) => {
    try {
        const errs = []
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

        if (response.ok) {
            try {
                const res = noJson ? response : await response.json()// fix this shit
                return res
            } catch(e){
                console.log(e)
            }
            return response;
        }
        if (!response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const res = await response.json();
                for (const key in res) {
                    if (Object.hasOwnProperty.call(res, key)) {
                        const value = res[key];
                        errs.push(value)
                        // throw new Error(value);
                    }
                }
                if (errs) {
                    ctx?.setErrors?.([...ctx?.errors, ...errs])
                }
            } else {
                const res = await response.text();
                ctx?.setErrors?.([...ctx?.errors, res])
                // throw new Error(res);
                return res
            }
        }
        console.log('Big YAY');
    } catch (error) {
        console.error('BIG SAD:', error);
    }
}

export const makeGetRequest = async (route: string, ctx?: ContextType | null) => {
    try {
        const token = getJWT()
        const errs = []
        const apiUrl = getApiUrl(route)
        const response = await fetch(`${apiUrl}${route}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });
        if (!response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const res = await response.json();
                for (const key in res) {
                    if (Object.hasOwnProperty.call(res, key)) {
                        const value = res[key];
                        errs.push(value)
                        // throw new Error(value);
                    }
                }
                if (errs) {
                    ctx?.setErrors?.([...ctx?.errors, ...errs])
                }
            } else {
                const res = await response.text();
                ctx?.setErrors?.([...ctx?.errors, res])
                // throw new Error(res);
            }
        }

        return await response.json()
    } catch (error) {
        console.error('BIG SAD:', error);
    }
}
