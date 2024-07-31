import TimeModel from "../model/TimeModel"
import TimeView from "../view/TimeView"


export interface ITimeController {
    model: TimeModel
    view: TimeView
    updateTime(): void
    changeEditMode(): void
    increaseValue(): void
    toggleLight(): void
}


export default class TimeController implements TimeController{
    private model: TimeModel;
    private view: TimeView;

    constructor(model: TimeModel, view: TimeView){
        this.model= model
        this.view = view

        this.view.modeOnClick(()=>this.changeEditMode())
        this.view.increaseOnClick(()=>this.increaseValue())
        this.view.lightOnClick(()=>this.toggleLight())

        setInterval(()=> this.updateTime(), 1000)
    }

    updateTime(): void{
        this.model.tick()
        const { hours, minutes, seconds } = this.model.getCurrentTime()
        this.view.displayTime(hours, minutes, seconds, this.model.editMode)
    }
    changeEditMode(): void {
        this.model.nextEditMode()
    }
    increaseValue() :void{
        const editMode = this.model.editMode
        if(editMode == "hours"){
            this.model.increaseHours()
        }else if(editMode == "minutes"){
            this.model.increaseMinutes()
        }
    }
    toggleLight(): void{
        this.view.toggleLight()
    }


}