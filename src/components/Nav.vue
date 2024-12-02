<template>
  <nav>
    <div class="perfil">
      <img src="../assets/img/leleco.png" alt="Foto de perfil" class="foto-perfil">
      <span class="nome-usuario">Bem Vindo,</span>
      <span class="nome-usuario">FATEC</span>
    </div>
    <div class="paginas">
      <router-link to="/">
        Dashboard
      </router-link>
      <router-link to="/vagas">
        Vagas
      </router-link>
      <router-link to="/alarmes">
        Alarmes  
        <span :class="{
          'notif-alert': alarmStatus === 'disparado',
        }">( {{ this.alarmCount }} )</span>
      </router-link>
      <router-link to="/candidatos">
        Candidatos
      </router-link>
      <router-link to="/analise">
        Análise
      </router-link>
      <router-link to="/compartilharDash">
        Compartilhar análises
      </router-link>
    </div>
    <div class="sair">
      <router-link to="/sair">
        Sair
      </router-link>
    </div>
  </nav>
</template>

<script >
export default {
  name: 'NavBar',
  data() {
          return {
              alarmes :[],
              alarmCount: 0,
              alarmStatus: 'normal',
          };
      },
      async mounted() { 
          await this.fetchData();
      },
      methods: {
          checkAlarms() {
              // Exemplo: Verifique se há alarmes disparados
              this.alarmCount = this.alarmes.length;
              if(this.alarmCount > 0){
                this.alarmStatus = "disparado"
              }
              else{
                this.alarmStatus = "normal"
              }
              
          },
          async fetchData() {
              try {
                  const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/graficos/alarmesAtivos`);
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  this.transformData(data);
                  this.checkAlarms();
              } catch (error) {
                  console.error('Erro ao buscar dados:', error);
              }
          },
          transformData(data) {
              this.alarmes = data;
          }
      }
}
</script>

<style scoped>
.notif-alert {
  text-decoration: none;
  color: #fd2222;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  border-radius: 40px; /* Adicionado border-radius para arredondar as bordas */
}

nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #554d96;
  color: #554d96;
  padding: 1rem 0.5rem;
  border-radius: 0; /* Removido o border-radius */
}

.perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.foto-perfil {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.nome-usuario {
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  color: var(--branco2-pro4tech);
}

.paginas {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
}

.paginas a {
  margin: 0.5rem 0;
  text-decoration: none;
  color: var(--branco2-pro4tech);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  border-radius: 40px; /* Adicionado border-radius para arredondar as bordas */
  margin-bottom: 0;
}

.paginas a:hover {
  background-color: #ffffff;
  color: #000000;
  transform: translateX(5px);
}

.sair {
  margin-top: auto;
  width: 100%;
}

.sair a {
  margin: 0.5rem 0;
  text-decoration: none;
  color: var(--branco2-pro4tech);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  border-radius: 40px;
}

.sair a:hover {
  background-color: #ffffff;
  color: #000000;
  transform: translateX(5px);
}

.router-link-active {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px; /* Adicionado border-radius para arredondar as bordas */
}

.router-link-active:hover {
  background-color: #ffffff;
  color: #000000;
}
</style>
