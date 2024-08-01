import TimeListModel from "../model/TimeListModel"
import TimeListView from "../view/TimeListView"
import TimeView from "../view/TimeView"
import TimeController from "./TimeController"


export interface ITimeListController{
    model: TimeListModel
    view: TimeListView

    addClock(timezone: string, format: "AM" | "PM" |"24H"): void
    removeClock(id: string): void
}

export default class TimeListController implements ITimeListController{

    model: TimeListModel
    view: TimeListView

    clockControllers: Map<string, TimeController> = new Map()
    clockCounter: number = 0

    constructor(model: TimeListModel, view: TimeListView){
        this.model = model
        this.view = view

        this.view.addOnClick((timezone: string, format: "AM" | "PM" |"24H")=> this.addClock(timezone, format))
        this.view.removeOnClick((id: string) => this.removeClock(id))
        this.view.timezoneOnChange()
    }


    addClock(timezone: string, format: "AM" | "PM" |"24H"): void {
        const clockId: string = `clock-${this.clockCounter++}`
        this.model.add(clockId, this.view.timeZoneSelected, format)

        const timeModel = this.model.getClock(clockId)
        const clockView = new TimeView(clockId)
        const clockController = new TimeController(timeModel, clockView)
        this.clockControllers.set(clockId, clockController)
        this.view.renderClock(clockId,clockView)
        
        clockView.closeOnClick(()=> this.removeClock(clockId))
    }

    removeClock(id: string): void {
        console.log("remove from controller"+id)
        this.view.removeClock(id) //remove view
        this.model.remove(id) // remove clock from list
        this.clockControllers.delete(id) // remove clock's controller
    }

    selectTimezone(){
        
    }

}