<script lang="ts">
    import firebase from "firebase";
    import Fb from "firebase/app";
    import "firebase/firestore";
    import "firebase/auth";
    import "firebase/storage";

    const db = firebase.database();

    interface _User {
        uid: string;
    }

    interface _Auth {
        signOut: Function;
        signInAnonymously: Function;
    }
    export let user: _User;
    export let auth: _Auth;

    export let userData: any = {};

    function syco() {
        return db.ref(`users/${user.uid}`).on("value", (snap) => {
            userData = snap.val() || {};
        });
    }
</script>

{#await syco()}awaiting{:then _}
{userData.displayName}
{:catch}
you don't have perms
{/await}
|
<button
    class="btn btn-outline-success my-2 my-sm-0"
    on:click={() => auth.signOut()}>LogOut
</button>
