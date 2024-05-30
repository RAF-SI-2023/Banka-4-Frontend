import { jwtDecode } from "jwt-decode";
import { getApiUrl } from "./apiUrl";
import { ContextType } from "App";


type Decoded = {
    permission: number;
    exp: number;
}


export const getJWT = () => {
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
    } catch (error) {
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
    }
}
