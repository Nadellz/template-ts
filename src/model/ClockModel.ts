import {toZonedTime , format } from "date-fns-tz"

export interface IClockModel{
    dateTime: Date 
    editMode: 'none' | 'hours' | 'minutes'
    timezone: string
    format: "AM" | "PM" | "24H"
    getCurrentTime(): {hours: number, minutes:number, seconds: number, timezone: string}
    nextEditMode(): void
    increaseHours(): void
    increaseMinutes(): void
    tick(): void
    resetTime(): void
    nextFormat(): void
    
}

export default  class ClockModel implements IClockModel{
    dateTime: Date
    editMode: 'none' | 'hours' | 'minutes'
    timezone: string
    format: "AM" | "PM" | "24H"

    constructor(
        dateTime: Date,
        editMode: 'none' | 'hours' | 'minutes',
        timezone: string ,
        format: "AM" | "PM" | "24H" 
    ) {
        this.dateTime = dateTime
        this.editMode = editMode
        this.timezone = timezone
        this.format = format
        this.resetTime() // function called to set time according to it's timezone
    }

    getCurrentTime(): {hours: number, minutes:number, seconds: number, timezone: string}{
        let tz: string = "local"
        switch(this.timezone){
            case "Europe/Paris": tz = this.dateTime.toString().split(" ")[5]; break;
            case "Africa/Lagos": tz = "UTC+01:00"; break;
            case "Asia/Kolkata": tz = "UTC+5:30"; break;
            case "Europe/Athens": tz = "GMT+03:00"; break;
        }
        return {
            hours: this.dateTime.getHours(),
            minutes: this.dateTime.getMinutes(),
            seconds: this.dateTime.getSeconds(),
            timezone: this.timezone == "Europe/Paris" ? (tz.length == 8 ? `${tz.slice(0,4)}${tz.slice(4,6)}:${tz.slice(6)}` : tz) : tz
        }
    }
   

    nextEditMode(){
        if(this.editMode=="none"){this.editMode = "hours"}
        else if(this.editMode=="hours"){this.editMode = "minutes"}
        else if(this.editMode=="minutes"){this.editMode="none"}
    }

    increaseHours(){
        let hours: number = this.dateTime.getHours()
        if(this.format == "24H"){
            hours = (hours + 1) % 24
        }else{
            hours = (hours + 1) % 12
            if(hours == 0){ hours = 12}
        }
        this.dateTime.setHours(hours)
    }
    increaseMinutes(){
        let minutes: number = this.dateTime.getMinutes()
        minutes = (minutes + 1) % 60
        if(minutes === 0){

            if(this.format == "24H"){
                this.dateTime.setHours((this.dateTime.getHours() + 1) % 24)
            }else{
                let hours: number = this.dateTime.getHours()
                hours = (hours + 1) % 12
                if(hours == 0){ hours = 12}
                this.dateTime.setHours(hours)
            }
        }
        this.dateTime.setMinutes(minutes)
    }

    tick(){
        this.dateTime.setSeconds(this.dateTime.getSeconds() + 1) // updates time even when editing.
    }

    resetTime(): void {
        const date = new Date()

        const zonedDate= toZonedTime(date, this.timezone)

        this.dateTime = zonedDate

        // If the clock's format is in AM/PM, we need to convert zonedDate, since it is in 24H format (Date()).
        if(this.format =="AM" || this.format=="PM"){
            this.format24toAMPM()
        }
    }

    format24toAMPM(): void{
        let hours: number = this.dateTime.getHours()
        if(hours == 0){
            hours = 12 
            // 24H -> PM
            this.format = "PM"
        }else if( hours > 12){
            hours = hours - 12
            // 24H -> PM
            this.format = "PM"
        }else{
            // 24H -> AM
            this.format = "AM"
        }
        this.dateTime.setHours(hours)
    }
    
    formatPMto24(): void{
        //PM -> 24H
        let hours: number = this.dateTime.getHours()
        hours = hours + 12
        this.dateTime.setHours(hours)
    }

    nextFormat(): void {

        if (this.format == "AM") 
            {   
                this.format = "PM"  
                //no need for conversion : AM to 24H
            }
        else if (this.format == "PM") {
            this.format = "24H"
            //change format PM to 24H
            this.formatPMto24()
        }
        else if (this.format == "24H") {
            this.format = "AM"
            // change format 24H to AM/PM
            this.format24toAMPM()

        }

    }

   

    
}