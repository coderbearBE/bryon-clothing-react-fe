import axios from 'axios';

export const AxiosInstance = () => {
    const axiosApiRequest = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api`,
    });
    
    axiosApiRequest.interceptors.request.use(
        (apiConfig) => {
            const bryonApiConfig = { ...apiConfig };
            
            bryonApiConfig.headers['Accept'] = 'application/json';
            bryonApiConfig.headers['Accept-language'] = 'nl';
            
            return bryonApiConfig;
        },
        (error) => Promise.reject(error)
    );
    
    axiosApiRequest.interceptors.response.use(
        (response) => response.data,
        (error) => console.error(error)
    )
    
    return axiosApiRequest;
}