<template>
    <div class="vld-parent">
      <loading v-model:active="carregando"
                 :can-cancel="false"
                 :on-cancel="false"
                 :is-full-page="true"/>

    <nav class="py-8 px-10 text-white flex justify-between bg-zinc-900">
         <h1 class="text-2xl font-bold">Suas Playlists</h1>
        <div>
        <span >{{usuarioLogado.nome}}</span>
         <button class="ml-10" @click="logout" >Sair</button>
        </div>
    </nav>
 
    <!-- <h2 class="text-white">Bem vindo @{{usuarioLogado.nome}}</h2> -->
    <!-- {{playlists}} -->
    <section class="playlists mt-10">
        <div class="text-white py-5 px-10 flex justify-evenly font-bold">
            <p class="w-40">Nome</p>
            <p class="w-40">Publica</p>
            <p class="w-40">Colaborativa</p>
            <p class="w-40">Autor</p>
        </div>
        <div class="text-white py-5 px-10 flex justify-evenly" v-for="item in playlists" :key="item.id"> 
           <p class="lg:w-40 md:w-40 sm:w-48"> {{item.name}} - </p>   <!-- <img class="w-12 h-12" src="{{item.images.}}">  -->
            <p  class="lg:w-40 md:w-40 sm:w-48">{{item.public ? "sim" : "nao"}} - </p>
             <p class="lg:w-40 md:w-40 sm:w-48">{{item.collaborative  ? "sim" : "nao"}} - </p>
             <p class="lg:w-40 md:w-40 sm:w-48">{{item.owner.display_name == usuarioLogado.nome ? "Você" : item.owner.display_name}} - </p>
        </div>
    </section>

    <footer class="py-5 px-10 text-white text-center mt-10 bg-zinc-900">
        <span>Aplicação desenvolvida por jG seguindo Hightech</span>
    </footer>
      </div>
</template>
<script>
//import axios from "axios"
import SpotifyApi from "./../api/SpotifyApi"

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components:{
        Loading
    },
    data: () => {
        return{
            usuarioLogado: {},
            playlists: [],
            carregando: true
        }

    },
    methods:{
        logout(){

            this.$router.push("/")
        }

    },
   async mounted(){
        
        let params = new URLSearchParams(document.location.search)
        let code = params.get("code")
        
        //Obtendo acess token
        await SpotifyApi.getToken(code);

        //Obter id do usuario Logado
        this.usuarioLogado = await SpotifyApi.getUsuario()

       //Obter playlists do usuario
        this.playlists = await SpotifyApi.getPlaylists();
      
      this.carregando = false;
        
    }
    
}
</script>
