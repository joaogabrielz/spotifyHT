<template @onload="typees()">
  <section class=" bg-blue-400 absolute left-0 top-0 h-full p-10 lg:w-2/5 md:w-2/4 sm:w-full">

  <h2 class="text-white text-3xl font-semibold mt-20 ">Entre agora para começar a curtir as suas musicas preferidas</h2>
  <img class="opacity-90 pl-20 mix-blend-multiply absolute lg:w-4/5 md:w-4/6 sm:w-4/6 left-0 bottom-0 " src="../assets/wmmusic.png" alt="">

  </section>

  <section class="w-3/5 sm:w-4/6 absolute right-0 top-0 h-full">
    <div>

      <img class='m-auto pt-10' src="../assets/imagespt.png" alt="">
      
    </div>
    <div class=" text-center absolute w-full bottom-10 ">
      <button @click="login()" class='bg-green-500 text-white px-10 py-5 text-xl rounded-full '>Entre com Spotify</button>
    </div>
  </section>

</template>
<script>
export default{
  data: () => {
      return{
        clientID:"cb0e364b3a124b408ebca2c2dc873701",
        scopes:"playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private",
        redirecURI:"http://localhost:3000/playlists"
      }
  },
  methods:{
    login(){
      window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientID}&scope=${this.scopes}&redirect_uri=${this.redirecURI}`
    }
  }

}
</script>
