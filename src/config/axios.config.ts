import axios, { AxiosInstance } from 'axios';
import {promises} from 'dns';
import { nest } from '../utils/index';
import logger from '@shared/Logger';

// const instance: AxiosInstance = axios.create({
//     baseURL:
//         process.env.NODE_ENV === 'production'
//             ? process.env.REACT_APP_BASE_PROD_IP
//             : process.env.REACT_APP_BASE_DEV_IP,
// });
async function instance(): Promise< any |Error>{
    let err: Error;
    let res: any;
    [err, res]= await nest(axios.get('https://clist.by/get/events/'));
    if(err){
        logger.error('Error in getting response',{error: err});
        throw new Error('Error in getting response');
    }
    return res.data;

}

export default instance;