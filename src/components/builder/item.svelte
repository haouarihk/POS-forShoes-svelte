<script lang="ts">
    import Template from "./template.svelte";
    import BarCodeSetter from "../barcoder/barCodeSetter.svelte";
    import type { ItemShop } from "../../../d/types";
    import { defaults } from "../utils/defaults";
    import Lister from "./components/lister.svelte";
    import Category from "./category.svelte";
    import Seller from "./seller.svelte";
    import StorageMaker from "./storage/storageMaker.svelte";

    // function handleInputType(e: any, type: string) {
    //     e.target.type = type;
    // }

    // function setFileAsData(e: any, interal: Interdata) {
    //     //@ts-ignore
    //     interal.data = e.target.files[0];
    // }

    export var values: ItemShop = defaults.ItemShop;
</script>

<Template>
    <BarCodeSetter Class="col-6" bind:value={values.barcode} />

    <div class="col-6 dk">
        Name: <input type="text" bind:value={values.displayName} />
    </div>

    <Lister
        component={Seller}
        Class="col-6"
        dir="sellers"
        bind:title={values.seller}
    />

    <Lister
        component={Category}
        Class="col-6"
        dir="categories"
        bind:title={values.category}
    />

    <div class="col-6 dk">
        buyingPrice: <input type="number" bind:value={values.buyingPrice} />
    </div>

    <div class="col-6 dk">
        Price: <input type="number" bind:value={values.price} />
    </div>

    <StorageMaker bind:storage={values.storage} productId={values.id} />
</Template>
