import TimeView from "./TimeView";
import TimeListModel from "../model/TimeListModel"


export interface ITimeListView {
    container: HTMLElement
    addButton: HTMLElement
    selectTimezone: HTMLElement

    timeZoneSelected: string
    addOnClick():void
    renderList(list: TimeListModel) :void

}

export default class TimeListView implements TimeListView{
    container: HTMLElement
    addButton: HTMLElement
    selectTimezone: HTMLElement
    timeZoneSelected: string

    constructor(){
        //1. create container
        this.container = document.createElement("div")
        this.container.className = "list-clocks-container"

        //2. create add button
        this.addButton = document.createElement("button")
        this.addButton.innerHTML = "Add"
        this.addButton.className = "Add"

        //3. append container and addButton
        this.container.append(this.addButton)
        const app = document.getElementById("app")?.append(this.container)
    }

    addOnClick(): void{
        //1. check timezone
        //2. create clock
        //3. append clock to the list 
    }

    getTimeZoneSelected(): string {
        return this.timeZoneSelected
    }

    setTimeZoneSelected(newTimeZone: string): void{
        this.timeZoneSelected = newTimeZone
    }   

}