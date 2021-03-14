import type firebase from "firebase"

/** tunrs an object to array 
 * 
 * @param obje -is the obejct that you wanna 
 */
export let toArray = (obje: any) => {
    let obj = obje || {}
    let indexes = Object.keys(obj)
    let _array: Array<any> = []
    indexes.forEach(i => {
        _array.push({ ...obj[i], ...{ id: i } })
    })
    return _array;
}


/** returns a costructed param 
 * @returns - all array[i].title -> array[i].data in one object 
 */
export let constructParam = (array: Array<{ title: string; data: any }>) => {
    let newObj: any = {}
    array.forEach(a => {
        newObj[a.title] = a.data
    })
    return newObj
}

/** get list of a specific param out of an objectmap */
export let getListOf = (objs: any, param: string) => {
    let _array: any[] = []
    let keys = Object.keys(objs)
    keys.forEach(k => {
        _array.push(objs[k][param])
    })
    return _array;
}

/** get id inside object */
export let instructId = (objs: any) => {
    let _objs = objs;
    Object.keys(_objs).forEach(k => {
        _objs[k]["id"] = k
    })
    return _objs
}

/** get interdata out of the realtime database */
export async function getInterData(db: any, interdatatype: string): Promise<Array<any>> {

    return new Promise((solve, reject) => {
        if (interdatatype) {
            //@ts-ignore
            db.ref(`interdata/${interdatatype}`)
                .once("value", (snap: { val: () => any }) => {
                    let val = snap.val();
                    solve(toArray(val) || []);
                });
        } else {
            solve([])
        }
    })

}

/** replaces every param of special_replacer_obj with its value  on text*/
export function filtererOBJ(text: string, special_replacer_obj: any) {
    let txt = text
    Object.keys(special_replacer_obj).forEach((sro: string) => {
        txt = txt.replace("{" + sro + "}", special_replacer_obj[sro])
    })
    return txt
}


export function getCountFrom(storage: Storage) {
    let sarray = toArray(storage)

    let count: number = 0
    sarray.forEach(a => {
        if (a)
            toArray(a.sizes).forEach(b => {
                count += 1
            })
    })

    return count
}

/** gets item by id 
 * @param db - realtime database ref
 * @param id - the id
*/
export function getItemById(db: any, id: string) {
    return new Promise((solve, reject) => {
        db.ref(`items/${id}`).once("value", (snap: { val: () => any }) => {
            solve(snap.val())
        })
    })

}

/** gets multiple items by id */
export async function getMultiItemsById(db: any, ids: string[]) {
    let _items: any = {};
    for (let i = 0; i < ids.length; i++) {
        _items[ids[i]] = await getItemById(db, ids[i]);
    }
    return _items
}

/** get storage item  */
export async function getItemStorage(db: any, storageItem: { id: string, storageId: string }) {
    return new Promise((solve, reject) => {
        db.ref(`items/${storageItem.id}/storage/${storageItem.storageId}`).once("value", (snap: { val: () => any }) => {
            solve(snap.val())
        })
    })
}

/**get multiple storage items */
export async function getMultiItemStorage(db: any, _basketItems: Array<{ id: string, storageId: string }>) {
    let _bItems = [];
    for (let i = 0; i < _basketItems.length; i++) {
        _bItems.push(await getItemStorage(db, _basketItems[i]));
    }
    return _bItems
}


/* download image out of firebase storage */
export async function getImg(fStorage: firebase.storage.Storage, photoRef: string): Promise<string> {
    return new Promise((s, r) => {
        fStorage.ref(photoRef).getDownloadURL().then(s).catch(r)
    })
}

export function arrayRepetationExtraction(array: string[]) {
    let _array: string[] = [];
    let _arrQuantity: number[] = [];
    array.forEach((a, i) => {
        let i2 = _array.indexOf(a)
        if (i2 == -1) {// if its not on the array
            _array[i] = a
            _arrQuantity[i] = 1
        } else {                  // if it is in the array
            _arrQuantity[i2] += 1
        }
    })
    return { array: _array, arrQuantity: _arrQuantity }
}

/** turns array into object. param id is required */
export function toObj(array: any[]) {
    let _obj: any = {}
    array.forEach(a => {
        if (a)
            _obj[a.id] = a
    })
    return _obj
}

/** filter object */
export function filterObj(obj: any, cb: (objItem: any) => any) {
    let arr = toArray(obj).filter(cb);
    return toObj(arr)
}

/** filters the same */
export function filterTheSame(arr: string[]) {
    let _arr: string[] = []
    arr.forEach(a => {
        if (_arr.indexOf(a) == -1) {
            _arr.push(a)
        }
    })
    return _arr
}

/** logges in the database */
export async function log(db: any, message: string) {
    let newlog = db.ref("logs").push()
    await newlog.set({ message, date: new Date() })
}


/** handle getting the selected page */
export function qgnu(ph: any, arr: any[]) {
    let selectedPage = arr[0];
    let o = arr.find(a => a.page == ph.get("page"))
    if (o) {
        selectedPage = o
    }
    return { selectedPage, intSelectedPage: arr.indexOf(selectedPage) }
}



/**get a unic new id */
export function getUnicId(obj: any) {
    let _obj = obj || {}
    return toArray(obj).length + 1
}


/** removes the repetion */
export function removeRepetatives(arr: string[]) {
    let _obj: any = {}
    arr.forEach(i => {
        _obj[i] = true;
    })
    return Object.keys(_obj)
}

/** distruction data to something useful */
export function getDC(items: any) {
    let _DD: any = { color: {}, size: {} }

    let list = toArray(items);
    let list2 = Object.keys(list[0] || {}) || []
    list2.forEach(key => {
        if (key != "id")
            list.forEach(body => {
                Object.keys(body).forEach(_key2 => {

                    if (_key2 != "id")
                        if (key != _key2) {
                            if (!_DD[key]) _DD[key] = {}
                            if (!_DD[key][body[key]]) _DD[key][body[key]] = {}
                            _DD[key][body[key]][key] = body[key]
                            if (!_DD[key][body[key]][_key2 + "s"]) _DD[key][body[key]][_key2 + "s"] = []

                            list.forEach(a => {
                                if (a[key] == body[key])
                                    _DD[key][body[key]][_key2 + "s"].push(body[_key2])
                            })
                            _DD[key][body[key]][_key2 + "s"] = removeRepetatives(_DD[key][body[key]][_key2 + "s"])
                        }
                })
            })

    })

    return _DD
}





export function getUserInfo(db: any, uid: string) {
    return db.ref(`users/${uid}`)
}


export function addToMyBasket(db: any, workerId: string, item: any) {
    return db.ref(`users/${workerId}/basket/${item.id}_${item.storageId}`).set(item)

}