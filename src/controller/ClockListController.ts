import TimeListModel from "../model/ClockListModel"
import ClockListView from "../view/ClockListView"
import ClockView from "../view/ClockView"
import ClockController from "./ClockController"

/*
ClockListController.ts : manages model(ClockListModel) and view(ClockListView) of the list of clocks.

functions:
addClock: add clock
removeClock : removes clock from the list (removes it's view, model, controller)

*/

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

        //1. add clock to the list (creates a model)
        const clockId: string = `clock-${this.clockCounter++}`
        this.model.add(clockId, this.view.timeZoneSelected, format)

        //2. create a model, a view, and a controller for this clock
        const ClockModel = this.model.getClock(clockId)
        const clockView = new ClockView(clockId)
        const clockController = new ClockController(ClockModel, clockView)

        //3. store controller
        this.clockControllers.set(clockId, clockController) 

        //4. render clock
        this.view.renderClock(clockId,clockView) 
        
        clockView.closeOnClick(()=> this.removeClock(clockId)) // attach event handler to close button
    }

    removeClock(id: string): void {
        this.view.removeClock(id) //remove view
        this.model.remove(id) // remove clock from list (model)
        this.clockControllers.delete(id) // remove clock's controller
    }

}