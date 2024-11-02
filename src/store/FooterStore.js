import {makeAutoObservable} from "mobx"

export default class FooterStore {
    constructor () {
        this._footer = []
        makeAutoObservable(this)
    }

    setFooter(footer) {
        this._footer = footer
    }

    get footer() {
        return this._footer
    }

}