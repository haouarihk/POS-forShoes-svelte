export namespace Lang {
    export const usedLang = "English";


    export namespace types {
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
        }
        export interface Langies {
            [key: string]: Language
        }
    }


    export const langs: types.Langies = {
        English: {
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

                Item: {
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
    }

}