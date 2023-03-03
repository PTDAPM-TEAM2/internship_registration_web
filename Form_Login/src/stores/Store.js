import { makeAutoObservable, makeObservable, observable } from 'mobx';

export default class Store{
    count = 0;
    constructor(){
        makeObservable(this, {
            count: observable,
            inc: action,
        })
        makeAutoObservable(this)
    }
    inc(){
        this.count += 1;
    }
    dec(){
        this.count -= 1;
    }
    incWithParams() {
        this.count -= 1;
    }
}