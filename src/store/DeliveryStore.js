import {makeAutoObservable} from "mobx"

export default class DeliveryStore {
    constructor () {
        this._info = []
        makeAutoObservable(this)
    }

    setInfo(info) {
        this._info = info
    }

    get info() {
        return this._info
    }

}