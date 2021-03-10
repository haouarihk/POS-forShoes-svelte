<script lang="ts">
    import type { NewItem } from "../../../d/types";

    import Template from "./template.svelte";

    export let values: NewItem.all = {};
</script>

<Template>
    <div class="col-6">
        DisplayName: <input type="text" bind:value={values.displayName} />
    </div>
    <div class="col-6">
        Contact: <input type="email" bind:value={values.contact} />
    </div>
</Template>
