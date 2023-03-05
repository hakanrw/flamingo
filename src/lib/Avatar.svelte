<script>
  export let url;
  export let small = false;
</script>

<div class={small ? "avatar" : "avatar mt-5 mx-auto"}>
  <div class={small ? "w-12 rounded-full" : "w-[150px] rounded-full"}>
    <img src={url || "/avatar.jpg"} alt="avatar"/>
  </div>
</div>