<script context="module">
  import Cashier from "./pages/cashier.svelte";
  import Console from "./pages/console.svelte";
  import Items from "./pages/Items.svelte";

  export const navOptions = [
    { page: "cashier", component: Cashier },
    { page: "items", component: Items },
    { page: "console", component: Console },
  ];
</script>
