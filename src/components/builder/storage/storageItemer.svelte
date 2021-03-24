<script lang="ts">
    import type { BasketItemd, Storage, StorageItem } from "d/types";

    import Dropdown from "../../dropdown.svelte";
    import {
        filterTheSame,
        getDC,
        getListOf,
        toArray,
    } from "../../utils/utils";

    // input
    export let storage: Storage;
    export let productId: string = "";
    //

    // optional outputs
    export let arrayStorage: StorageItem[] = [];
    export let _theMod: number = 0;

    export let selectedColorIndex: number = -1;
    export let selectedSizeIndex: number = -1;
    export let _colors: any = {},
        _sizes: any = {};
    //

    // output
    export let possibleColors: string[] = [];
    export let possibleSizes: number[] = [];

    export let selectedColor: string = "";
    export let selectedSize: number = 0;

    export let possibleItems: BasketItemd[] = [];
    export let selectedItem: BasketItemd = {
        id: productId,
        storageId: "",
    };
    //

    // detect Mode
    $: {
        if (selectedColorIndex == -1 && selectedSizeIndex == -1) {
            _theMod = 0;
        }
        if (selectedColorIndex > -1) {
            _theMod = 2;
        } else if (selectedSizeIndex > -1) {
            _theMod = 1;
        }
    }

    // update arrayStorag
    $: {
        arrayStorage = toArray(storage);
    }

    // update possibleColors and possibleSizes
    $: {
        possibleColors = filterTheSame(getListOf(arrayStorage, "color"));
        possibleSizes = filterTheSame(getListOf(arrayStorage, "size")).map(
            (a) => +a
        );
    }

    // getting constructed storage based on colors over sizes and the opposite
    $: {
        let deta: { color: any; size: any } = getDC(storage);

        _colors = deta.color;
        _sizes = deta.size;
    }

    // update selets
    $: {
        if (arrayStorage.length > 0)
            if (_theMod == 2) {
                selectedColor = possibleColors[selectedColorIndex];

                if (selectedColorIndex != -1)
                    selectedSize =
                        _colors[possibleColors[selectedColorIndex]].sizes[
                            selectedSizeIndex
                        ];
            } else if (_theMod == 1) {
                selectedSize = possibleSizes[selectedSizeIndex];

                if (selectedSizeIndex != -1)
                    selectedColor =
                        _sizes[possibleSizes[selectedSizeIndex]].colors[
                            selectedColorIndex
                        ];
            } else {
                selectedSize = possibleSizes[selectedSizeIndex];
                selectedColor = possibleColors[selectedColorIndex];
            }
    }

    // get possible Items from this set of selection
    $: {
        let filterdArray = arrayStorage.filter(
            ({ color }) => color == selectedColor
        );

        filterdArray = arrayStorage.filter(({ size }) => size == selectedSize);

        possibleItems = filterdArray.map((a) => ({
            id: productId,
            storageId: a.id,
        }));
    }

    // export the selected data
    $: {
        if (possibleItems[0]) {
            selectedItem = possibleItems[0];
        }
    }

    let wid;
</script>

<div class="row" bind:offsetWidth={wid}>
    {#if arrayStorage.length > 0}
        {#if _theMod == 2}
            <h5 class=" {wid < 200 ? 'col-12' : 'col-6'}">Color:</h5>
            <Dropdown
                Class="{wid < 200 ? 'col-12' : 'col-6'} cup pad0 brr"
                items={possibleColors}
                bind:value={selectedColorIndex}
                defaultTitle="Color"
                title={selectedColor}
            />

            {#if selectedColorIndex != -1}
                <h5 class=" {wid < 200 ? 'col-12' : 'col-6'}">Size:</h5>

                <Dropdown
                    Class="{wid < 200 ? 'col-12' : 'col-6'} cup pad0 brr"
                    items={_colors[possibleColors[selectedColorIndex]].sizes}
                    bind:value={selectedSizeIndex}
                    defaultTitle="Size"
                    title={"" + selectedSize}
                />
            {/if}
        {:else if _theMod == 1}
            <h5 class=" {wid < 200 ? 'col-12' : 'col-6'}">Size:</h5>
            <Dropdown
                Class="{wid < 200 ? 'col-12' : 'col-6'} cup pad0 brr"
                items={possibleSizes.map((a) => "" + a)}
                bind:value={selectedSizeIndex}
                defaultTitle="Size"
                title={"" + selectedSize}
            />

            {#if selectedSizeIndex != -1}
                <h5 class=" {wid < 200 ? 'col-12' : 'col-6'}">Color:</h5>

                <Dropdown
                    Class="{wid < 200 ? 'col-12' : 'col-6'} cup pad0 brr"
                    items={_sizes[possibleSizes[selectedSizeIndex]].colors}
                    bind:value={selectedColorIndex}
                    defaultTitle="Color"
                    title={selectedColor}
                />
            {/if}
        {:else}
            <h5 class=" {wid < 200 ? 'col-12' : 'col-6'}">Color:</h5>
            <Dropdown
                Class="{wid < 200 ? 'col-12' : 'col-6'} cup pad0 brr"
                items={possibleColors}
                bind:value={selectedColorIndex}
                defaultTitle="Color"
                title={selectedColor}
            />

            <h5 class=" {wid < 200 ? 'col-12' : 'col-6'}">Size:</h5>
            <Dropdown
                Class="{wid < 200 ? 'col-12' : 'col-6'} cup pad0 brr"
                items={possibleSizes.map((a) => "" + a)}
                bind:value={selectedSizeIndex}
                defaultTitle="Size"
                title={"" + selectedSize}
            />
        {/if}
    {/if}
</div>
