<script lang="ts">
    import Template from "./template.svelte";
    import Helper from "./components/helper.svelte";

    export var possibleColors: string[] = [];
    export var possibleSizes: number[] = [];
    export var selectedColor: string;
    export var selectedSize: number;
</script>

<Template>
    <Helper bind:value={selectedColor} posibilities={possibleColors} />
    <Helper bind:value={selectedSize} posibilities={possibleSizes} />
</Template>
