<script lang="ts">
    export let Class: string;
    export let increase: Function;
    export let decrease: Function;
    export let count: number;
    export let light: boolean = false;
</script>

<div class="row {Class}">
    <!-- svelte-ignore a11y-missing-attribute -->
    {#if light}
        <input type="number" class="col-12" bind:value={count} width="20px" />
    {:else}
        <button class="bg-warn col-2" on:click={() => decrease()}>-</button>
        <input type="number" class="col-3" bind:value={count} width="20px" />
        <button class="bg-succes col-2" on:click={() => increase()}>+</button>
    {/if}
</div>
