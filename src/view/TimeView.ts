
export interface ITimeView{
    clockElement: HTMLElement
    timeElement: HTMLElement
    hoursElement: HTMLElement
    minutesElement: HTMLElement
    secondsElement: HTMLElement
    modeButton: HTMLButtonElement
    increaseButton: HTMLButtonElement
    lightButton: HTMLButtonElement
    isLightOn: boolean

    displayTime(hours: Number, minutes: Number, seconds: Number, editMode: 'none' | 'hours' | 'minutes'): void
    modeOnClick(handler: ()=> void): void
    increaseOnClick(handler: ()=> void): void
    lightOnClick(handler: ()=> void): void
    toggleLight(): void
    pad(num: Number): string
    
}
export default class TimeView implements ITimeView{
    clockElement: HTMLElement
    timeElement: HTMLElement
    hoursElement: HTMLElement
    minutesElement: HTMLElement
    secondsElement: HTMLElement
    modeButton: HTMLButtonElement
    increaseButton: HTMLButtonElement
    lightButton: HTMLButtonElement
    isLightOn: boolean = false

    constructor(){

        //1. create clock element

        //3. create time element

        //4. create and append elements to timeElement

        //5. create and append elements to buttons container

        //6. append timeElement to the clock element.


        //1
        this.clockElement = document.createElement("div")
        this.clockElement.className = "clock-element"

    
        //3
        this.timeElement = document.createElement("span")
        this.timeElement.className = "time-element"

        //4 create 
        this.hoursElement = document.createElement('span')
        this.minutesElement = document.createElement('span')
        this.secondsElement = document.createElement('span')

        //4 append
        this.timeElement.appendChild(this.hoursElement)
        this.timeElement.appendChild(document.createTextNode(":"))
        this.timeElement.appendChild(this.minutesElement)
        this.timeElement.appendChild(document.createTextNode(":"))
        this.timeElement.appendChild(this.secondsElement)

        //5 create
        this.modeButton = document.createElement("button")
        this.modeButton.className = "button mode"
        const modeLabel = document.createElement("div")
        modeLabel.className = "button-label mode-label"
        modeLabel.innerHTML = "Mode"

        this.increaseButton = document.createElement("button")
        this.increaseButton.className = "button increase"
        const increaseLabel = document.createElement("div")
        increaseLabel.className = "button-label increase-label"
        increaseLabel.innerHTML = "Increase"

        this.lightButton = document.createElement("button")
        this.lightButton.className = "button light"
        const lightLabel = document.createElement("div")
        lightLabel.className = "button-label light-label"
        lightLabel.innerHTML = "Light"

        //5 append 
        this.clockElement.appendChild(this.modeButton)
        this.clockElement.appendChild(this.increaseButton)
        this.clockElement.appendChild(this.lightButton)
        this.clockElement.appendChild(modeLabel)
        this.clockElement.appendChild(increaseLabel)
        this.clockElement.appendChild(lightLabel)

        //6
        this.clockElement.appendChild(this.timeElement)

        const app = document.getElementById("app")?.append(this.clockElement)

    }


    
    displayTime(hours: number, minutes: number, seconds: number, editMode: 'none' | 'hours' | 'minutes'): void
    {
        this.hoursElement.innerHTML = this.pad(hours)
        this.minutesElement.innerText = this.pad(minutes)
        this.secondsElement.innerHTML = this.pad(seconds)
        if(editMode == 'hours'){
            console.log("coloring hours")
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
}