export interface Timing{
    dateTime: Date 
    editMode: 'none' | 'hours' | 'minutes'
   
    getCurrentTime(): {hours: number, minutes:number, seconds: number}
    getEditMode(): void
    nextEditMode(): void
    increaseHours(): void
    increaseMinutes(): void
    tick(): void
    
}

export default  class TimeModel implements Timing{
    dateTime: Date
    editMode: 'none' | 'hours' | 'minutes'
  

    constructor(
        dateTime: Date = new Date(),
        editMode: 'none' | 'hours' | 'minutes' = 'none',
    ) {
        this.dateTime = dateTime
        this.editMode = editMode
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
    


}