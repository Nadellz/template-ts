import ClockModel from "./ClockModel";

export interface IClockListModel {
    list : Map<string, ClockModel>
    add(id:string, timezone: string, format: "AM"|"PM"|"24H"): void
    remove(id: string): void
    getClock(id: string): ClockModel | undefined
}

export default class ClockListModel implements IClockListModel{

    list : Map<string, ClockModel>

    constructor(){
        this.list = new Map()
    }

    add(id:string, timezone: string, format: "AM"|"PM"|"24H"): void{
        const clock: ClockModel = new ClockModel(new Date(), "none", timezone, format)
        this.list.set(id, clock)
    }

    remove(id: string): void {
        this.list.delete(id)
    }

    getClock(id: string): ClockModel | undefined {
        return this.list.get(id)
    }
    

}