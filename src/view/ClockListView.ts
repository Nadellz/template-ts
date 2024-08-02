import ClockView from "./ClockView";


/*
ClocklistView.ts : determines the view of a list of clocks using ClockView.

functions: 
    addOnClick : adds click event listener to add clock button.
    removeOnClick: adds click event listener to close button.
    timezoneOnChange : adds change event listener to the select-timezone-element and change value of this.timeZoneSelected according to it.
    renderClock : adds clock from the view.
    removeClock : removes clock from view.
*/

export interface IClockListView {
    container: HTMLElement
    addButton: HTMLElement

    selectTimezone: HTMLSelectElement
    timeZoneSelected: string

    addOnClick(handler: () => void):void
    removeOnClick(handler: (id:string)=> void):void
    timezoneOnChange(handler:(timezone: string)=> void): void
    renderClock(id: string, clockView: ClockView): void
    removeClock(id: string): void

}

export default class ClockListView implements IClockListView{
    container: HTMLElement
    addButton: HTMLElement
    selectTimezone: HTMLSelectElement
    timeZoneSelected: string = "Europe/Paris"

    constructor(){
        //1. create container
        this.container = document.createElement("div")
        this.container.className = "clock-list-container"

        //2. create add button
        this.addButton = document.createElement("button")
        this.addButton.innerHTML = "Add a clock"
        this.addButton.className = "add-button"
        this.addButton.id = "add-button"

        //3. create select 
        this.selectTimezone = document.createElement("select")
        this.selectTimezone.className = "select-timzone-element"
        this.selectTimezone.id = "select-timzone-element"

        //4. create container add-clock-container for "add" button and select timezone element
        const addContainer = document.createElement("div")
        addContainer.className = "add-clock-container"
        addContainer.id = "add-clock-container"

        //5. create options : 
        const option1 = document.createElement("option")
        const option2 = document.createElement("option")
        const option3 = document.createElement("option")
        const option4 = document.createElement("option")

        option1.value="Europe/Paris"
        option1.innerHTML="default Europe/Paris time"

        option2.value="Africa/Lagos"
        option2.innerHTML="UTC+01:00"

        option3.value="Asia/Kolkata"
        option3.innerHTML="UTC+5:30"

        option4.value="Europe/Athens"
        option4.innerHTML="GMT+03:00"

        //6. append childs to select
        this.selectTimezone.appendChild(option1)
        this.selectTimezone.appendChild(option2)
        this.selectTimezone.appendChild(option3)
        this.selectTimezone.appendChild(option4)

        //7. append childs to add-clock-container
        addContainer.append(this.addButton)
        addContainer.append(this.selectTimezone)

        //8. Add a title for the page
        const title = document.createElement("h1")
        title.innerHTML="Watch project"
        title.className="project-title"

        //9. append childs to #app
        document.getElementById("app")?.append(title)
        document.getElementById("app")?.append(addContainer)
        document.getElementById("app")?.append(this.container)
       
        
    }

    addOnClick(handler: (timezone: string, format: "AM" | "PM" |"24H")=> void): void{
        this.addButton.addEventListener('click', ()=>{
            const timezone: string = this.timeZoneSelected
            const format: "AM" | "PM" |"24H" = "24H"
            handler(timezone,format)
        })
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

    timezoneOnChange(): void{
        this.selectTimezone.addEventListener('change', (event)=>{
            this.timeZoneSelected = this.selectTimezone.value
        })
    }

    renderClock(id: string, clockView: ClockView): void{
        // append clock to container
        this.container.appendChild(clockView.clockContainer)
    }

    removeClock(id: string): void{
        // remove clock from container
        const clock = document.getElementById(id)
        if(clock){
            this.container.removeChild(clock)
        }
        
    }

    
    
    

}