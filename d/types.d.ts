
export interface Params {
  page: string;

}

export interface BasketItemd {
  id: string;
  storageId: string;

}






export interface ItemShop {
  id: string;
  displayName: string;
  photoURL?: string;
  category: string;
  price: number;
  buyingPrice: number;
  seller: string;
  storage: Storage;
  barcode?: string;
}

// export interface itm {
//   id: string;
//   name: string;
//   photoURL: string;
//   category: string;
//   price: number;
//   buyingPrice: number;
//   seller: string;
//   color: string;
//   size: string;
// }

export interface SoldItem {
  name: string;
  category: string;
  price: number;
  seller: string;
  storageItem: StorageItem;
  date: Date;
}

export interface Sold {
  [key: string]: SoldItem
}

export interface Category {
  displayName: string;
  discription: string;
}

export interface Categories {
  [key: string]: { item: Category }
}

export interface Settings {
  tag: string;
  darkThem: boolean;
}

export interface Seller {
  displayName: string;
  contact: string;
}

export interface Sellers {
  [key: string]: { item: Seller }
}

export interface Buyer {
  id: string;
  displayName: string;
  contact: string;
  boughtItems: string[];
}

export interface Buyers {
  [key: string]: { item: Buyer }
}

// export interface Interdata {
//   name: string;
//   title: string;
//   answerType: string;
//   dir: string;
//   items: string[];
//   data: any;
//   required: boolean;
// }


export interface StorageItem {
  id: string;
  size: number;
  color: string;
}

export interface Storage {
  [key: string]: StorageItem
}


export interface DataS {
  theMod: number;
  val: number;
  val2: number;
  selectedColor: string;
  selectedSize: number;
}



export namespace NewItem {
  export interface all {
    displayName?: string;
    discription?: string;
    contact?: string;

    photo?: any;

    seller?: any;
    category?: any;

    buyingPrice?: number;
    price?: number;

    Storage?: any;
    sizes?: any;

    barcode?: any;
  }
  export interface category {
    displayName?: string;
    discription?: string;
  }

  export interface color {
    displayName?: string;
    discription?: string;
  }
}



export namespace LangTypes {
  export namespace modals {
    export interface Item {
      photo: string;
      Name: string;
      BarCode: string;
      Seller: string;
      Category: string;
      buyingPrice: string;
      Price: string;
      Storage: string;
    }
    export interface Modals {
      item: Item;
    }
  }

  export interface General {
    cashier: string;
    items: string;
    logs: string;

    log: string;

    sellers: string;
    category: string;
    Filters: string;

    loading: string;
  }

  export interface Cashier {
    AddByBarcode: string;
    SeleteCostumer: string;
  }

  export interface LogInPage {
    login: string;
    logout: string;

    ForgotPassword: string;
    loginWithGoogle: string;

    username: string;
    password: string;

    notLoggedIn: string;
  }

  export interface Filter {
    Filters: string;
    addNewItem: string;
  }

  export interface Editing {
    create: string;
    edit: string;
    open: string;
    close: string;
    deleteAllLogs: string;

    error: string;
    return: string;
  }

  export interface Language {
    general: General;
    cashier: Cashier;
    logInPage: LogInPage;
    filter: Filter;
    editing: Editing;
    modals: modals.Modals;
  }

  export interface Langies {
    [key: string]: Language
  }

}