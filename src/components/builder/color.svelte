<script lang="ts">
    import Template from "./template.svelte";

    export let displayName: string = "red";
    export let discription: string = "this is a color";
</script>

<Template>
    <div class="col-6">
        DisplayName: <input type="text" bind:value={displayName} />
    </div>
    <div class="col-6">
        Discription: <input type="text" bind:value={discription} />
    </div>
</Template>
