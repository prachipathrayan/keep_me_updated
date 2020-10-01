/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Router } from 'express';
import { GetEvents } from '../services/getEvents/getEvents';

import {nest} from '../utils';
import {eventDetails} from '../services/getEvents/types';
import logger from '@shared/Logger';

const router = Router();


/******************************************************************************
 *                      "GET /api/users/_eventtype_"
 ******************************************************************************/


router.get('/pastEvents', async (req, res)=>{
    const getEvents= new GetEvents();
    let event: eventDetails[];
    let err: Error;
    [err, event]= await nest(getEvents.getPastEvents());
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
    }
    return res.json({
        type: 'Past Events',
        data: event,
        error: null
    });
});


router.get('/ongoingEvents', async (req, res)=>{
    const getEvents= new GetEvents();
    let event: eventDetails[];
    let err: Error;
    [err, event]= await nest(getEvents.getOngoingEvents());
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
    }
    return res.json({
        type: 'Present Events',
        data: event,
        error: null
    });
});

router.get('/futureEvents', async (req, res)=>{
    const getEvents= new GetEvents();
    let event: eventDetails[];
    let err: Error;
    [err, event]= await nest(getEvents.getFutureEvents());
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
    }
    return res.json({
        type: 'Future Events',
        data: event,
        error: null
    });
});


export default router;
