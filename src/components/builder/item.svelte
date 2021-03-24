<script lang="ts">
    import Template from "./temps/template.svelte";
    import BarCodeSetter from "../barcoder/barCodeSetter.svelte";
    import type { ItemShop, LangTypes } from "d/types";
    import { defaults } from "../utils/defaults";
    import Lister from "./components/lister.svelte";
    import Category from "./category.svelte";
    import Seller from "./seller.svelte";
    import StorageMaker from "./storage/storageMaker.svelte";
    import { Lang } from "lang/lang";
    import ItemTemplate from "./temps/itemTemplate.svelte";

    export let lang: string;

    let ilang: LangTypes.modals.Item;
    $: {
        ilang = Lang.langs[lang].modals.item;
    }

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
    <ItemTemplate title={ilang.displayName}>
        <input type="text" bind:value={values.displayName} />
    </ItemTemplate>

    <ItemTemplate title={ilang.BarCode}>
        <BarCodeSetter Class="col-12" bind:value={values.barcode} />
    </ItemTemplate>

    <ItemTemplate title={ilang.Seller} Class="col-12 dk mt-4">
        <Lister
            component={Seller}
            Class=" dk"
            dir="sellers"
            bind:title={values.seller}
        />
    </ItemTemplate>

    <ItemTemplate title={ilang.Category} Class="col-12 dk mt-4">
        <Lister
            component={Category}
            Class=" dk"
            dir="categories"
            bind:title={values.category}
        />
    </ItemTemplate>

    <ItemTemplate title={ilang.buyingPrice}>
        <input type="number" bind:value={values.buyingPrice} />
    </ItemTemplate>

    <ItemTemplate title={ilang.Price}>
        <input type="number" bind:value={values.price} />
    </ItemTemplate>

    <ItemTemplate title={ilang.Storage} Class="col-12 dk mt-5">
        <StorageMaker bind:storage={values.storage} productId={values.id} />
    </ItemTemplate>
</Template>
