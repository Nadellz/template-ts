import TimeListModel from "../model/ClockListModel"
import ClockListView from "../view/ClockListView"
import ClockView from "../view/ClockView"
import ClockController from "./ClockController"


export interface IClockListController{
    model: TimeListModel
    view: ClockListView

    addClock(timezone: string, format: "AM" | "PM" |"24H"): void
    removeClock(id: string): void
}

export default class ClockListController implements IClockListController{

    model: TimeListModel
    view: ClockListView

    clockControllers: Map<string, ClockController> = new Map()
    clockCounter: number = 0

    constructor(model: TimeListModel, view: ClockListView){
        this.model = model
        this.view = view

        this.view.addOnClick((timezone: string, format: "AM" | "PM" |"24H")=> this.addClock(timezone, format))
        this.view.removeOnClick((id: string) => this.removeClock(id))
        this.view.timezoneOnChange()
    }


    addClock(timezone: string, format: "AM" | "PM" |"24H"): void {
        const clockId: string = `clock-${this.clockCounter++}`
        this.model.add(clockId, this.view.timeZoneSelected, format)

        const ClockModel = this.model.getClock(clockId)
        const clockView = new ClockView(clockId)
        const clockController = new ClockController(ClockModel, clockView)
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