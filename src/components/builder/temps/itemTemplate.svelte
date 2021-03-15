<script lang="ts">
    export let title: string;
    export let Class: string = "col-6 dk";
</script>

<div class={Class}>
    {title}:
    <slot />
</div>
