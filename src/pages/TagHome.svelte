<script>
  import Poster from "../lib/Poster.svelte";
  import stc from "string-to-color";
  import { user } from "../lib/store";
  import Flame from "../lib/Flame.svelte";
  import { Route, useParams } from "svelte-navigator";
  import { onMount } from "svelte";
  import { firestore } from "../lib/firebase";
  import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";


  let flames = [];

  let params = useParams();

  let currentListenerUnsubscribe = () => {};
  let lastTag = null;

  function listenFlames(tag) {
    if (lastTag === tag) return;
    lastTag = tag;
    console.log("subscribe to " + tag);

    currentListenerUnsubscribe();

    const q = query(collection(firestore, "flames"), where("tags", "array-contains", tag), orderBy("createdAt", "desc"), limit(20));

    currentListenerUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const flamesDelta = [];
      querySnapshot.forEach((doc) => {
        flamesDelta.push({ id: doc.id, ...doc.data() });
      });
      console.log(flamesDelta);
      flames = flamesDelta;
    });

  }

  onMount(() => {
    listenFlames($params.tag);

    return () => {
      currentListenerUnsubscribe();
    }
  });

  
  $: listenFlames($params.tag);

  console.log($user)
</script>

<div class="w-full max-w-[500px] md:max-w-[800px] lg:max-w-[1200px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-8">
  {#each flames as flame (flame.id)}
    <Flame data={flame} />
  {/each}
</div>