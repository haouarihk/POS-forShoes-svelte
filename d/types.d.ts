
export interface Params {
  page: string;

}

export interface BasketItemd {
  id: string;
  storageId: string;

}


export interface ItemShop {
  id: string;
  name: string;
  photoURL: string;
  category: string;
  price: number;
  buyingPrice: number;
  seller: string;
  storage: Storage;
}
export interface itm {
  id: string;
  name: string;
  photoURL: string;
  category: string;
  price: number;
  buyingPrice: number;
  seller: string;
  color: string;
  size: string;
}

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

export interface Interdata {
  name: string;
  title: string;
  answerType: string;
  dir: string;
  items: string[];
  data: any;
  required: boolean;
}


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

