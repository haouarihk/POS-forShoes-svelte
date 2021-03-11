<script context="module">
  import Cashier from "./pages/cashier.svelte";
  import Logs from "./pages/logs.svelte";
  import Items from "./pages/Items.svelte";

  export const navOptions = [
    { page: "cashier", component: Cashier },
    { page: "items", component: Items },
    { page: "logs", component: Logs },
  ];
</script>
