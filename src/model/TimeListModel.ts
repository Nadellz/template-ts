import TimeModel from "./TimeModel";

export interface List {
    list : TimeModel[]
    add(clock: TimeModel): void
    clear(): void
}

export default class FullList implements List{

    static instance: FullList = new FullList()
    list : TimeModel[]

    constructor(list : TimeModel[] = []){
        this.list = list
    }


    add(clock: TimeModel):void{
        this.list.push(clock)
    }

    clear(): void{
        this.list = []
    }

    getList(): TimeModel[]{
        return this.list
    }

    getClock(index: number){
        return this.list[index]
    }

    removeClock(index: number){
        if(index >= 0 && index <=this.list.length){
            this.list.splice(index,1)
        }
    }



}