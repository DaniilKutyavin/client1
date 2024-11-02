import {makeAutoObservable} from "mobx"

export default class GiftStore {
    constructor () {
        this._gift = []
        makeAutoObservable(this)
    }

    setGift(gift) {
        this._gift = gift
    }

    get gift() {
        return this._gift
    }

}