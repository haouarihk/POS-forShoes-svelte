import type { LangTypes } from "../../d/types";



export const English: LangTypes.Language = {
    general: {
        cashier: "Cashier",
        items: "items",
        logs: "logs",

        log: "log",

        sellers: "sellers",
        category: "Category",
        Filters: "Filters",

        loading: "loading..."

    },

    cashier: {
        AddByBarcode: "Add item by Barcode",
        SeleteCostumer: "Select Costumer"
    },

    logInPage: {
        login: "LogIn",
        logout: "LogOut",

        ForgotPassword: "Forgot password?",
        loginWithGoogle: "Login using google",

        username: "Username",
        password: "Password",

        notLoggedIn: "Not logged in yet"
    },

    filter: {
        Filters: "Filters",
        addNewItem: "Add Item"
    },

    editing: {
        create: "Create",
        edit: "edit",
        open: "open",
        close: "Close",
        deleteAllLogs: "Delete all logs",

        error: "Error",
        return: "Return",
    },

    modals: {
        item: {
            photo: "photo",
            Name: "Name",
            BarCode: "BarCode",
            Seller: "Seller",
            Category: "Category",
            buyingPrice: "buyingPrice",
            Price: "Price",
            Storage: "Storage",
        }
    }
}