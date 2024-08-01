import TimeListModel from "../model/TimeListModel"
import TimeListView from "../view/TimeListView"
import TimeView from "../view/TimeView"
import TimeController from "./TimeController"


export interface ITimeListController{
    model: TimeListModel
    view: TimeListView

    addClock(): void
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

        this.view.addOnClick(()=> this.addClock())
        this.view.removeOnClick((id: string) => this.removeClock(id))
    }


    addClock(timezone: string = "Europe/Paris", format: "AM" | "PM" |"24H" = "24H"): void {
        const clockId: string = `clock-${this.clockCounter++}`
        this.model.add(clockId, timezone, format)

        const timeModel = this.model.getClock(clockId)
        const clockView = new TimeView(clockId, `${clockId}-mode`, `${clockId}-increase`, `${clockId}-light`, `${clockId}-remove`, `${clockId}-format`)
        const clockController = new TimeController(timeModel, clockView)
        this.clockControllers.set(clockId, clockController)
        this.view.renderClock(clockId,clockView)
        
        clockView.closeOnClick(()=> this.removeClock(clockId))
    }

    removeClock(id: string): void {
        console.log("remove clock list controller "+id)
        this.view.removeClock(id) //remove view
        this.model.remove(id) // remove clock from list
        this.clockControllers.delete(id) // remove clock's controller
    }

}