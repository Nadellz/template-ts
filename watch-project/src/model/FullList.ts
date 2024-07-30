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

    getList(): TimeModel[]{
        return this.list
    }

    add(clock: TimeModel):void{
        this.list.push(clock)
    }

    clear(): void{
        this.list = []
    }


    load(){}

    save(){}


}