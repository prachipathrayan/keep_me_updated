import { nest } from '../../utils';
import instance from '../../config/axios.config';
import logger from '@shared/Logger';
import {IGetEventService, eventDetails} from './types';

export class GetEvents implements IGetEventService{

    async getEvents(): Promise<any | Error> {
        let err: Error;
        let res: any;
        [err, res] = await nest(instance());
        if (err) {
            logger.error('Error in fetching data for the function', {error: err});
            throw new Error('Error in fetching data for the function');
        }
        return res;
    }
    async getPastEvents(): Promise<eventDetails[] | Error>{
        let err:Error;
        let res: any;
        [err, res]= await  nest(this.getEvents());
        if(err){
            logger.error('Error in getEvents function',{error: err});
            throw new Error('Error in getEvents function');
        }
        const pastEvents = new Array<eventDetails>();
        const today= new Date();
        res.forEach((item: {id : number; title: string; host: string; url: string; start: Date; end: Date; countdown: number; icon: string;}) => {
            const e= new Date(item.end);
            if(e.toDateString() < today.toDateString()){
                pastEvents.push({
                    id : item.id,
                    title: item.title,
                    host: item.host,
                    url: item.url,
                    start: item.start,
                    end: item.end,
                    countdown: item.countdown,
                    icon: item.icon,
                });
            }});
        return pastEvents;

    }}

