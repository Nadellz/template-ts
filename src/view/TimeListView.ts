import TimeView from "./TimeView";
import TimeListModel from "../model/TimeListModel"


export interface ITimeListView {
    container: HTMLElement
    addButton: HTMLElement

    selectTimezone: HTMLElement
    timeZoneSelected: string

    addOnClick(handler: () => void):void
    removeOnClick(handler: (id:string)=> void):void

    renderClock(id: string, clockView: TimeView): void
    removeClock(id: string): void

}

export default class TimeListView implements TimeListView{
    container: HTMLElement
    addButton: HTMLElement
    selectTimezone: HTMLElement
    timeZoneSelected: string

    constructor(){
        //1. create container
        this.container = document.createElement("div")
        this.container.className = "clock-list-container"

        //2. create add button
        this.addButton = document.createElement("button")
        this.addButton.innerHTML = "Add"
        this.addButton.className = "Add"

        //3. append container and addButton
        
        const app = document.getElementById("app")?.append(this.container)
        this.container.append(this.addButton)
    }

    addOnClick(handler: ()=> void): void{
        this.addButton.addEventListener('click', handler)
    }
    removeOnClick(handler: (id: string)=> void): void{
        this.container.addEventListener('click', (event)=>{
            const target: HTMLElement = event.target as HTMLElement
            if(target.classList.contains("close-button")){
                const id: string = target.dataset.id
                if(id) handler(id)
            }

        })
    }

    renderClock(id: string, clockView: TimeView): void{
        //append clock to container
        this.container.appendChild(clockView.clockContainer)
    }

    removeClock(id: string): void{
        //remove clock from container
        console.log("remove clock list view "+id)
        const clock = document.getElementById(id)
        if(clock){
            this.container.removeChild(clock)
        }
        
    }


    getTimeZoneSelected(): string {
        return this.timeZoneSelected
    }

    setTimeZoneSelected(newTimeZone: string): void{
        this.timeZoneSelected = newTimeZone
    }   

}