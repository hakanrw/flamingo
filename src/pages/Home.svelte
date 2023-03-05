<script>
    import Poster from "../lib/Poster.svelte";
    import stc from "string-to-color";
    import { user } from "../lib/store";
    import Flame from "../lib/Flame.svelte";
    import { Route, Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { firestore } from "../lib/firebase";
    import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
    import TagHome from "./TagHome.svelte";

    let tags = [];

    let flames = [];

    onMount(() => {
      console.log("subscribe main");

      const q = query(collection(firestore, "flames"), orderBy("createdAt", "desc"), limit(20));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const flamesDelta = [];
        querySnapshot.forEach((doc) => {
          flamesDelta.push({ id: doc.id, ...doc.data() });
        });
        console.log(flamesDelta);
        flames = flamesDelta;
        tags = flamesDelta.reduce((acc, curr) => [...acc, ...curr.tags], []);
        tags = [ ... new Set(tags) ];
      });

      return () => {
        unsubscribe();
      }
    });

    console.log($user)
</script>

<div class="bg-secondary whitespace-nowrap overflow-auto">
  {#each tags as tag (tag)}
    <Link to={`/tag/${tag}`} class="badge p-3 m-2 mr-1 ml-1 badge-primary badge-lg" style="background-color: {stc(tag)}; border-color: {stc(tag)}">{tag}</Link>
  {/each}
</div>

<Route path="/">
  <div class="w-full max-w-[500px] md:max-w-[800px] lg:max-w-[1200px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-8">
    {#if $user}
      <Flame />
    {/if}
    {#each flames as flame (flame.id)}
      <Flame data={flame} />
    {/each}
  </div>
</Route>

<Route path="/tag/:tag" component={TagHome} />

<Route path="/write">    
  {#if $user !== null}
    <Poster /> 
  {:else}
    <div class="mx-5 mt-[40vh] md:mx-auto md:w-[500px] text-primary text-center text-3xl font-medium">
      you need to log in
    </div>
  {/if}
</Route>