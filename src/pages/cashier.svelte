<script lang="ts">
    import type { BasketItemd } from "../../d/types";
    import BarCodeReader from "../components/barcoder/barCodeReader.svelte";
    import Lister from "../components/creation/lister.svelte";

    export let basketItems: BasketItemd[];
    export let arrayitems: any[] = [];

    export let addToBasket: Function = () => {};

    export let totalCost: number = 0;

    export let takeItem: any;
</script>

<style>
    .main {
        display: absolute;
        height: 78vh;
    }
</style>

<main class="main">
    <div class="row">
        <h3 class="col-6">Add item by Barcode:</h3>
        <BarCodeReader Class="col-6" {addToBasket} {takeItem} />
    </div>
    <br />
    <div class="row">
        <h3 class="col-6">select Costumer:</h3>
        <Lister
            Class="col-6"
            interdatatype="buyers"
            title="buyers"
            dir="buyers" />
    </div>
</main>
