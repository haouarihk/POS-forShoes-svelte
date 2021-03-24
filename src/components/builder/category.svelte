<script lang="ts">
    import type { NewItem } from "d/types";

    import Template from "./temps/template.svelte";

    export let values: NewItem.all = {};
</script>

<Template>
    <div class="col-6">
        DisplayName: <input type="text" bind:value={values.displayName} />
    </div>
    <div class="col-6">
        Discription: <input type="text" bind:value={values.discription} />
    </div>
</Template>
