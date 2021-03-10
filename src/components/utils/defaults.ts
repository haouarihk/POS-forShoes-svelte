import type { ItemShop, Storage } from "../../../d/types";

export namespace defaults {
    export const storage: Storage = {};
    export const ItemShop: ItemShop = {
        id: "dd",
        displayName: "dd",
        photoURL: "dd",
        category: "dd",
        price: 0,
        buyingPrice: 0,
        seller: "dd",
        storage: defaults.storage,
        barcode: "dd"
    }
}