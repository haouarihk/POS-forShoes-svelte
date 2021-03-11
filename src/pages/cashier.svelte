<script lang="ts">
    import BarCodeReader from "../components/barcoder/barCodeReader.svelte";
    import Client from "../components/builder/client.svelte";
    import Lister from "../components/builder/components/lister.svelte";

    // export let basketItems: BasketItemd[];
    // export let arrayitems: any[] = [];

    export let addToBasket: Function = () => {};

    // export let totalCost: number = 0;

    export let removeItem: any;
</script>

<main class="main">
    <div class="row">
        <h3 class="col-6">Add item by Barcode:</h3>
        <BarCodeReader Class="col-6" {addToBasket} {removeItem} />
    </div>
    <br />
    <div class="row">
        <h3 class="col-6">select Costumer:</h3>
        <Lister
            component={Client}
            Class="col-6"
            title="clients"
            dir="clients"
        />
    </div>
</main>

<style>
    .main {
        display: absolute;
        height: 78vh;
    }
</style>
