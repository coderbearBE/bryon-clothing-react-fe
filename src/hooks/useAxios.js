import { AxiosInstance } from '../shared/constants'

export const useAxios = () => {
    const axiosApiRequest = AxiosInstance();
    
    const get = async (path) => await axiosApiRequest.get(path);
    const post = async (path, payload) => await axiosApiRequest.post(path, payload);
    
    return { get, post };
}