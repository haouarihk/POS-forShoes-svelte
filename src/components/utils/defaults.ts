import type { ItemShop, Storage } from "d/types";

export namespace defaults {

    export const defaultPhoto = "./png/defaultshoe.png";
    export const soldoutPhoto = "./png/soldout.png";

    export const storage: Storage = {};
    export const ItemShop: ItemShop = {
        id: "",
        displayName: "",
        photoURL: "",
        category: "",
        price: -1,
        buyingPrice: -1,
        seller: "",
        storage: defaults.storage,
        barcode: ""
    }

    export namespace style {
        export const scaleIn = {
            duration: 100
        }
        export const scaleOut = {
            duration: 100
        }

    }

}