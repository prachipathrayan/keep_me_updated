export interface IGetEventService{
    getPastEvents(): Promise<eventDetails[] | Error>;
    getEvents(): Promise<any | Error>
}
export type eventDetails ={
    id : number;
    title : string;
    host : string;
    url : string;
    start : Date;
    end : Date;
    countdown : number;
    icon : string;
}
