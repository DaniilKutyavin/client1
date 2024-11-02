import {makeAutoObservable} from "mobx"

export default class ProductStore {
    constructor () {
        this._prod = []
        makeAutoObservable(this)
    }

    setProd(prod) {
        this._prod = prod
    }

    get prod() {
        return this._prod
    }

}