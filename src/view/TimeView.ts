
export interface ITimeView{
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
    pad(num: Number): string
    
}
export default class TimeView implements ITimeView{
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

        //0
        this.clockContainer = document.createElement("div")
        this.clockContainer.className = "clock-container"
        this.clockContainer.id = `clock-container-${clockId}`

        //1
        this.clockElement = document.createElement("div")
        this.clockElement.className = "clock-element"
        this.clockElement.id = `clock-element-${clockId}`
    
        //3
        this.timeElement = document.createElement("span")
        this.timeElement.className = "time-element"
        this.timeElement.id = `time-element-${clockId}`

        //4 create 
        this.hoursElement = document.createElement('span')
        this.hoursElement.className = "hours-element"
        this.hoursElement.id = `hours-element-${clockId}`

        this.minutesElement = document.createElement('span')
        this.minutesElement.className = "minutes-element"
        this.minutesElement.id = `minutes-element-${clockId}`

        this.secondsElement = document.createElement('span')
        this.secondsElement.className = "seconds-element"
        this.secondsElement.id = `seconds-element-${clockId}`

        this.formatElement = document.createElement('span')
        this.formatElement.className = "format-element"
        this.formatElement.id = `format-element-${clockId}`

        this.timezoneElement = document.createElement('span')
        this.timezoneElement.className = "timezone-element"
        this.timezoneElement.id = `timezone-element-${clockId}`

        //4 append
        this.timeElement.appendChild(this.hoursElement)
        this.timeElement.appendChild(document.createTextNode(":"))
        this.timeElement.appendChild(this.minutesElement)
        this.timeElement.appendChild(document.createTextNode(":"))
        this.timeElement.appendChild(this.secondsElement)
        this.timeElement.appendChild(this.formatElement)
        this.timeElement.appendChild(this.timezoneElement)

        //5 create
        this.modeButton = document.createElement("button")
        this.modeButton.className = "button mode"
        this.modeButton.id = `mode-button-${clockId}`

        this.increaseButton = document.createElement("button")
        this.increaseButton.className = "button increase"
        this.increaseButton.id = `increase-button-${clockId}`

        this.lightButton = document.createElement("button")
        this.lightButton.className = "button light"
        this.lightButton.id = `light-button-${clockId}`

        this.resetButton = document.createElement("button")
        this.resetButton.className = "button reset"
        this.resetButton.id = `reset-button-${clockId}`

        this.formatButton = document.createElement("button")
        this.formatButton.innerHTML = "AM/PM - 24h"
        this.formatButton.className = "format"
        this.formatButton.id = `format-button-${clockId}`

        this.closeButton = document.createElement("button")
        this.closeButton.innerHTML = "x"
        this.closeButton.className = "close-button close"
        this.closeButton.id = `close-button-${clockId}`

        const modeLabel = document.createElement("div")
        modeLabel.className = "button-label mode-label"
        modeLabel.innerHTML = "Mode"
        modeLabel.id = `mode-label-${clockId}`
        
        const increaseLabel = document.createElement("div")
        increaseLabel.className = "button-label increase-label"
        increaseLabel.innerHTML = "Increase"
        increaseLabel.id = `increase-label-${clockId}`
        
        const lightLabel = document.createElement("div")
        lightLabel.className = "button-label light-label"
        lightLabel.innerHTML = "Light"
        lightLabel.id = `light-label-${clockId}`

        const resetLabel = document.createElement("div")
        resetLabel.className = "button-label reset-label"
        resetLabel.innerHTML = "Reset"
        resetLabel.id = `reset-label-${clockId}`

        //5 append 
        this.clockElement.appendChild(this.modeButton)
        this.clockElement.appendChild(this.increaseButton)
        this.clockElement.appendChild(this.lightButton)
        this.clockElement.appendChild(this.resetButton)

        this.clockElement.appendChild(modeLabel)
        this.clockElement.appendChild(increaseLabel)
        this.clockElement.appendChild(lightLabel)
        this.clockElement.appendChild(resetLabel)
  
        //6
        this.clockElement.appendChild(this.timeElement)

        this.clockContainer.appendChild(this.closeButton)
        this.clockContainer.appendChild(this.formatButton)
        this.clockContainer.appendChild(this.clockElement)


        const app = document.getElementById("app")?.append(this.clockContainer)

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
}