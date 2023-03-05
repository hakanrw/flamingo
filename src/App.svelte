<script>
  import { Router, Route } from "svelte-navigator";
  import { auth } from "./lib/firebase";
  import Navbar from './lib/Navbar.svelte';
  import Poster from "./lib/Poster.svelte";
  import { user } from "./lib/store";
  import Home from "./pages/Home.svelte";
  import Profile from "./pages/Profile.svelte";

  auth.onAuthStateChanged(usere => {
    if (usere === null) user.set(null);
    else user.set(JSON.stringify({ email: usere.email, displayName: usere.displayName, uid: usere.uid }));
  })
</script>

<svelte:head>
  <title>Flamingo</title>
</svelte:head>

<Router primary={false}>

  <Navbar />
  
  <Route path="/account" component={Profile} />
  
  <Route path="/*" component={Home} />

</Router>

<style global>
  .paper {
    box-shadow: 0px 1px 3px 1px rgba(0,0,0,.25);
    border-radius: 0.375rem;
  }
</style>