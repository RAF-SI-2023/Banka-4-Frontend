import { jwtDecode } from 'jwt-decode';
import { getJWT } from './apiRequest';

type Decoded = {
    permission: number;
    id: number;
    sub: string;
}
export const getMe = () => {
    const token = getJWT()
    if (token) {
        try {
            const decoded: Decoded = jwtDecode(token);
            if (decoded && decoded.id) {
                return { permission: decoded.permission, id: decoded.id, sub: decoded.sub }
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
};
