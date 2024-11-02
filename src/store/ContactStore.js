import {makeAutoObservable} from "mobx"

export default class ContactStore {
    constructor () {
        this._infocon = []
        this._usercon = []
        makeAutoObservable(this)
    }

    setInfocon(infocon) {
        this._infocon = infocon
    }

    setUsercon(usercon) {
        this._usercon = usercon
    }

    get infocon() {
        return this._infocon
    }

    get usercon() {
        return this._usercon
    }

}