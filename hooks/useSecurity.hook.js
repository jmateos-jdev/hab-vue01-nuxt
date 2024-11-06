import { useUserServices } from '../services/user/index.service.js';

export const useSecurity = () => {
    const { checkTokenService } = useUserServices;
    
    const checkToken = async () => {
        const token = localStorage.getItem('token');
        const tokenTime = localStorage.getItem('tokenTime');
        if (tokenTime) {
            const currentTime = Date.now();
            const tokenAge = currentTime - tokenTime;
            if (tokenAge > 1000 * 60 * 1 || !token) {
                localStorage.clear();
                return false;
            } else {
                const data = await checkTokenService(token);
                if (data.statusCode !== 200) {
                    localStorage.clear();
                    return false;
                } else {
                    localStorage.setItem('tokenTime', Date.now());
                    localStorage.setItem('token', data.data.token);
                    return true;
                }
            }
        }
        return false;
    }

    return {
        checkToken
    }
}