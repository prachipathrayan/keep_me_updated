/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { GetEvents } from '../services/getEvents/getEvents';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';
import {nest} from '../utils';
import {eventDetails} from '../services/getEvents/types';
import logger from '@shared/Logger';

// Init shared
const router = Router();
const userDao = new UserDao();


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
});

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

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
