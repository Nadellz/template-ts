
import ClockModel from "../model/ClockModel"
import ClockView from "../view/ClockView"


export interface IClockController {
    model: ClockModel
    view: ClockView
    updateTime(): void
    changeEditMode(): void
    increaseValue(): void
    toggleLight(): void
    resetClock(): void
    formatClock(): void
}

export default class ClockController implements IClockController{
    model: ClockModel;
    view: ClockView;

    constructor(model: ClockModel, view: ClockView){
        this.model= model
        this.view = view

        this.view.modeOnClick(()=>this.changeEditMode())
        this.view.increaseOnClick(()=>this.increaseValue())
        this.view.lightOnClick(()=>this.toggleLight())
        this.view.resetOnClick(()=>this.resetClock())
        this.view.formatOnClick(()=>this.formatClock())

        setInterval(()=> this.updateTime(), 1000)
    }

    updateTime(): void{
        this.model.tick() 
        const { hours, minutes, seconds, timezone } = this.model.getCurrentTime()
        this.view.displayTime(hours, minutes, seconds, this.model.format, timezone, this.model.editMode)
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

    resetClock(): void{
        this.model.resetTime()
    }

    formatClock(): void {
        this.model.nextFormat()
    }
}