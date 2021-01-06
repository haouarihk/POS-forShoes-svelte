<script lang="ts">
    export let data: any;
    export let data2: any;

    $: {
        data2 = data;
    }
</script>
