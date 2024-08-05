/*
ClockView.ts : determines the view of one clock.

functions: 
displayTime : the funtion displays time in the view : hours, minutes, seconds, format, timezone, and the mode.

modeOnClick: adds event listener on the 'mode' button.
increaseOnClick: adds event listener on the 'increase' button.
lightOnClick: adds event listener on the 'light' button.
resetOnClick: adds event listener on the 'reset' button.
formatOnClick: adds event listener on the  'format' button.
closeOnClick: adds event listener on the 'close' button.
toggleLight: changes state of 'isLightOn' attribute to toggle a change of background-color in the watch.
*/


export interface IClockView{
    clockElement: HTMLElement
    timeElement: HTMLElement
    hoursElement: HTMLElement
    minutesElement: HTMLElement
    secondsElement: HTMLElement
    formatElement: HTMLElement
    timezoneElement: HTMLElement

    modeButton: HTMLButtonElement
    increaseButton: HTMLButtonElement
    lightButton: HTMLButtonElement
    resetButton: HTMLButtonElement
    formatButton: HTMLButtonElement
    closeButton: HTMLButtonElement
    isLightOn: boolean
    clockContainer: HTMLElement
    
    displayTime(hours: Number, minutes: Number, seconds: Number,format: "AM" | "PM" | "24H", timezone: string, editMode: 'none' | 'hours' | 'minutes'): void
    modeOnClick(handler: ()=> void): void
    increaseOnClick(handler: ()=> void): void
    lightOnClick(handler: ()=> void): void
    resetOnClick(handler: ()=> void): void
    formatOnClick(handler: ()=> void): void
    closeOnClick(handler: ()=> void): void 
    toggleLight(): void
    
}
export default class ClockView implements IClockView{
    clockElement: HTMLElement
    timeElement: HTMLElement
    hoursElement: HTMLElement
    minutesElement: HTMLElement
    secondsElement: HTMLElement
    formatElement: HTMLElement
    timezoneElement: HTMLElement

    modeButton: HTMLButtonElement
    increaseButton: HTMLButtonElement
    lightButton: HTMLButtonElement
    isLightOn: boolean = false
    resetButton: HTMLButtonElement
    formatButton: HTMLButtonElement
    closeButton: HTMLButtonElement
    clockContainer: HTMLElement


    constructor(clockId: string){

        //0. create clock-container
        this.clockContainer = document.createElement("div")
        this.clockContainer.className = "clock-container"
        this.clockContainer.id = `${clockId}`
        this.clockContainer.draggable = true

        // add drag and drop listeners
        this.clockContainer.addEventListener("dragstart",this.onDragStart.bind(this))
        this.clockContainer.addEventListener("dragover",this.onDragOver.bind(this))
        this.clockContainer.addEventListener("drop",this.onDrop.bind(this))
   

        //1. create clock-element
        this.clockElement = document.createElement("div")
        this.clockElement.className = "clock-element"
        this.clockElement.id = `clock-element-${clockId}`
    
        //3. create time-element x:x:x
        this.timeElement = document.createElement("span")
        this.timeElement.className = "time-element"
        this.timeElement.id = `time-element-${clockId}`

        //4. create hours-element hh
        this.hoursElement = document.createElement('span')
        this.hoursElement.className = "hours-element"
        this.hoursElement.id = `hours-element-${clockId}`

        // create minutes-element mm
        this.minutesElement = document.createElement('span')
        this.minutesElement.className = "minutes-element"
        this.minutesElement.id = `minutes-element-${clockId}`

        // create seconds-element ss
        this.secondsElement = document.createElement('span')
        this.secondsElement.className = "seconds-element"
        this.secondsElement.id = `seconds-element-${clockId}`

        // create format-element AM, PM, 24H
        this.formatElement = document.createElement('span')
        this.formatElement.className = "format-element"
        this.formatElement.id = `format-element-${clockId}`

        // create timezone-element
        this.timezoneElement = document.createElement('span')
        this.timezoneElement.className = "timezone-element"
        this.timezoneElement.id = `timezone-element-${clockId}`

        //5. append childs to time-element
        this.timeElement.appendChild(this.hoursElement)
        this.timeElement.appendChild(document.createTextNode(":"))
        this.timeElement.appendChild(this.minutesElement)
        this.timeElement.appendChild(document.createTextNode(":"))
        this.timeElement.appendChild(this.secondsElement)
        this.timeElement.appendChild(this.formatElement)
        this.timeElement.appendChild(this.timezoneElement)

        //6. create mode button
        this.modeButton = document.createElement("button")
        this.modeButton.className = "button mode"
        this.modeButton.id = `mode-button-${clockId}`

        // create increase button
        this.increaseButton = document.createElement("button")
        this.increaseButton.className = "button increase"
        this.increaseButton.id = `increase-button-${clockId}`

        // create light button
        this.lightButton = document.createElement("button")
        this.lightButton.className = "button light"
        this.lightButton.id = `light-button-${clockId}`

        // create reset button
        this.resetButton = document.createElement("button")
        this.resetButton.className = "button reset"
        this.resetButton.id = `reset-button-${clockId}`

        // create format button
        this.formatButton = document.createElement("button")
        this.formatButton.className = "button format"
        this.formatButton.id = `format-button-${clockId}`

        // create close button
        this.closeButton = document.createElement("button")
        this.closeButton.innerHTML = "x"
        this.closeButton.className = "close-button close"
        this.closeButton.id = `close-button-${clockId}`

        //7. create mode label
        const modeLabel = document.createElement("div")
        modeLabel.className = "button-label mode-label"
        modeLabel.innerHTML = "Mode"
        modeLabel.id = `mode-label-${clockId}`
        
        // create increase label
        const increaseLabel = document.createElement("div")
        increaseLabel.className = "button-label increase-label"
        increaseLabel.innerHTML = "Increase"
        increaseLabel.id = `increase-label-${clockId}`
        
        // create light label
        const lightLabel = document.createElement("div")
        lightLabel.className = "button-label light-label"
        lightLabel.innerHTML = "Light"
        lightLabel.id = `light-label-${clockId}`

        // create reset label
        const resetLabel = document.createElement("div")
        resetLabel.className = "button-label reset-label"
        resetLabel.innerHTML = "Reset"
        resetLabel.id = `reset-label-${clockId}`

        // create format label
        const formatLabel = document.createElement("div")
        formatLabel.className = "button-label format-label"
        formatLabel.innerHTML = "AM/PM - 24H"
        formatLabel.id = `format-label-${clockId}`

        //8. append childs to the clock
        // buttons
        this.clockElement.appendChild(this.modeButton)
        this.clockElement.appendChild(this.increaseButton)
        this.clockElement.appendChild(this.lightButton)
        this.clockElement.appendChild(this.resetButton)
        this.clockElement.appendChild(this.formatButton)

        // labels
        this.clockElement.appendChild(modeLabel)
        this.clockElement.appendChild(increaseLabel)
        this.clockElement.appendChild(lightLabel)
        this.clockElement.appendChild(resetLabel)
        this.clockElement.appendChild(formatLabel)

        // time-element
        this.clockElement.appendChild(this.timeElement)

        //9. append childs to clock-container
        this.clockContainer.appendChild(this.closeButton)
        this.clockContainer.appendChild(this.clockElement)

    }


    displayTime(hours: number, minutes: number, seconds: number, format: "AM" | "PM" | "24H", timezone: string, editMode: 'none' | 'hours' | 'minutes'): void
    {
        this.hoursElement.innerHTML = this.pad(hours)
        this.minutesElement.innerText = this.pad(minutes)
        this.secondsElement.innerHTML = this.pad(seconds)
        this.formatElement.innerHTML = format
        this.timezoneElement.innerHTML = timezone

        if(editMode == 'hours'){
            this.hoursElement.classList.toggle("blink")
            this.minutesElement.classList.remove("blink")
        }else if(editMode == 'minutes'){
            this.minutesElement.classList.toggle("blink")
            this.hoursElement.classList.remove("blink")
        }else{
            this.minutesElement.classList.remove("blink")
            this.hoursElement.classList.remove("blink")
        }
    }

    modeOnClick(handler: ()=> void): void{
        this.modeButton.addEventListener('click', handler)
    }

    increaseOnClick(handler: ()=> void): void{
        this.increaseButton.addEventListener('click', handler)
    }

    lightOnClick(handler: ()=> void): void{
        this.lightButton.addEventListener('click', handler)
    }

    toggleLight(): void{
        this.isLightOn = !this.isLightOn
        this.timeElement.style.backgroundColor = this.isLightOn ? '#FBE106' : '#FFFFFF'
    }

    pad(num: number): string{
        return num.toString().padStart(2, '0')
    }

    resetOnClick(handler: ()=> void): void {
        this.resetButton.addEventListener('click', handler)
    }
    formatOnClick(handler: ()=> void): void {
        this.formatButton.addEventListener('click', handler)
    }

    closeOnClick(handler: ()=> void): void{
        this.closeButton.addEventListener('click', handler)
    }

    onDragStart(event: DragEvent): void{
        event.dataTransfer?.setData("text/plain",this.clockContainer.id)
    }

    onDragOver(event: DragEvent): void{
        event.preventDefault()
    }

    onDrop(event: DragEvent): void{
        event.preventDefault()

        // Get draged element's id :
        const targetId: string = event.dataTransfer?.getData("text/plain")
        const targetElement: Node | null = document.getElementById(targetId)

        // check if the element exists and that is different from the actual element we're dragging into
        if(targetElement && (targetElement !== this.clockContainer)){

            //1. get clocks container and next sibiling of this clock
            const parent: Node | null = this.clockContainer.parentElement
            const nextSibiling: Node | null = this.clockContainer.nextElementSibling

            //2. put clock before target element 
            parent.insertBefore(this.clockContainer, targetElement)

            //3. put target element before this clock's next sibiling
            parent.insertBefore(targetElement, nextSibiling)
        }
    }

 


}