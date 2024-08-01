import TimeModel from "./TimeModel";

export interface IClockList {
    list : Map<string, TimeModel>
    add(id:string, timezone: string, format: "AM"|"PM"|"24H"): void
    remove(id: string): void
    getClock(id: string): TimeModel | undefined
}

export default class ClockList implements IClockList{

    list : Map<string, TimeModel>

    constructor(){
        this.list = new Map()
    }

    add(id:string, timezone: string, format: "AM"|"PM"|"24H"): void{
        const clock: TimeModel = new TimeModel(new Date(), "none", timezone, format)
        this.list.set(id, clock)
    }

    remove(id: string): void {
        this.list.delete(id)
        console.log("remove clock list model "+id)
    }

    getClock(id: string): TimeModel | undefined {
        return this.list.get(id)
    }
    

}