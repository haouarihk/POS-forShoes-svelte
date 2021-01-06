<script lang="ts">
    import type { Interdata } from "../../../d/types";

    import BarCodeSetter from "../barcoder/barCodeSetter.svelte";
    import Helper from "./components/helper.svelte";
    import Dropdown from "../dropdown.svelte";
    import Lister from "./lister.svelte";
    import StorageMaker from "./storage/storageMaker.svelte";

    export let interdata: Interdata[] = [];

    export let specialReplacementForDir: any = {};

    export let productId: string="";

    function handleInputType(e:any, type:string) {
        e.target.type = type;
    }

    function setFileAsData(e:any, interal:Interdata) {
        //@ts-ignore
        interal.data = e.target.files[0];
    }
</script>

<div>
    {#each interdata as interal, i (interal.name)}
        <div class="row w-100 h-100 f1">
            <h4 class="col-6">
                {interal.name}
                {#if interal.required}
                    <k style="color:red !important">*</k>
                {/if}
            </h4>
            {#if interal.answerType == 'dropdown'}
                <Dropdown
                    Class="col-6"
                    value={i}
                    bind:title={interal.data}
                    bind:items={interal.items} />
            {:else if interal.answerType == 'barcode'}
                <BarCodeSetter Class="col-6" bind:value={interal.data} />
            {:else if interal.answerType == 'helper'}
                <Helper bind:value={interal.data} posibilities={interal.items} />
            {:else if interal.answerType == 'storage'}
                <StorageMaker
                    bind:storage={interal.data}
                    {productId}
                    addedable={true} />
            {:else if interal.answerType == 'lister'}
                <Lister
                    Class="col-6"
                    interdatatype={interal.dir}
                    bind:title={interal.title}
                    dir={interal.dir}
                    bind:value={interal.data}
                    {specialReplacementForDir} />
            {:else if interal.answerType == 'file'}
                <input
                    Class="col-6 dk"
                    type="file"
                    on:change={(e) => setFileAsData(e, interal)} />
            {:else}
                <input
                    Class="col-6 dk"
                    on:input={(e) => handleInputType(e, interal.answerType || 'text')}
                    bind:value={interal.data} />
            {/if}
        </div>
        <br />
    {/each}
</div>
