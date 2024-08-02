import ClockModel from "./ClockModel";
/*
ClockListModel.ts : model of the list of clocks (ClockModel).

functions: 

add: adds clock to the list.
remove: removes clock found by it's id from the list.
getClock: returns clock found by it's id.


*/
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