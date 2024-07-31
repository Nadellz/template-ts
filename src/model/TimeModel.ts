import {toZonedTime , format } from "date-fns-tz"

export interface Timing{
    dateTime: Date 
    editMode: 'none' | 'hours' | 'minutes'
    timeZone: string
    format: "AM" | "PM" | "24H"
    getCurrentTime(): {hours: number, minutes:number, seconds: number}
    getEditMode(): void
    nextEditMode(): void
    increaseHours(): void
    increaseMinutes(): void
    tick(): void
    resetTime(): void
    nextFormat(): void
    
}

export default  class TimeModel implements Timing{
    dateTime: Date
    editMode: 'none' | 'hours' | 'minutes'
    timeZone: string
    format: "AM" | "PM" | "24H"

    constructor(
        dateTime: Date = new Date(),
        editMode: 'none' | 'hours' | 'minutes' = 'none',
        timezone: string = 'Europe/Athens',
        format: "AM" | "PM" | "24H" = "24H"
    ) {
        this.dateTime = dateTime
        this.editMode = editMode
        this.timeZone = timezone
        this.format = format
    }

    getCurrentTime(): {hours: number, minutes:number, seconds: number}{
        return {
            hours: this.dateTime.getHours(),
            minutes: this.dateTime.getMinutes(),
            seconds: this.dateTime.getSeconds()
        }
    }
    getEditMode(): 'none'|'hours'|'minutes'{
        return this.editMode
    }

    nextEditMode(){
        if(this.editMode=="none"){this.editMode = "hours"}
        else if(this.editMode=="hours"){this.editMode = "minutes"}
        else if(this.editMode=="minutes"){this.editMode="none"}
    }

    increaseHours(){
        let hours: number = this.dateTime.getHours()
        hours = (hours + 1) % 24
        this.dateTime.setHours(hours)
    }
    increaseMinutes(){
        let minutes = this.dateTime.getMinutes()
        minutes = (minutes + 1) % 60
        if(minutes === 0){
            console.log("inc hours in minutes")
            this.dateTime.setHours((this.dateTime.getHours() + 1) % 24)
        }
        this.dateTime.setMinutes(minutes)
    }

    tick(){
        this.dateTime.setSeconds(this.dateTime.getSeconds() + 1) // updates time even when editing.
    }

    
    getTimeZone(){
        return this.timeZone
    }
    
    setTimeZone(timeZone: string){
        this.timeZone = timeZone
    }

    getFormat(){
        return this.format
    }
  
    setFormat(format: "AM" | "PM" | "24H"){
        this.format = format
    }

    resetTime(): void {
        const date = new Date()

        const zonedDate= toZonedTime(date, this.timeZone)

        this.dateTime = zonedDate
    }


    nextFormat(): void {

        if(this.format=="AM"){this.format = "PM"}
        else if(this.format=="PM"){this.format = "24H"}
        else if(this.format=="24H")
        {
            this.format="AM"
            // change format 24H to AM/PM
            let hours: number = this.dateTime.getHours()
            if(hours == 0){
                hours = 12
            }else if( hours > 12){
                hours = hours - 12
            }
            this.dateTime.setHours(hours)

        }

        
    }

    
}