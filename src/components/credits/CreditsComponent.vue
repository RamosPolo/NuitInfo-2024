<script>
// N'oubliez pas d'importer ApexCharts
import ApexCharts from 'vue3-apexcharts';
export default {
  components: {
    apexchart: ApexCharts,
  },
};
</script>

<script setup>
// Importation d'AOS
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'

const resUsers = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://54.38.1.169:3000/api/users');
    resUsers.value = response.data.data;
  } catch (error) {
    console.error("Erreur de requête:", error);
  }
};

// Appel de la fonction pour récupérer les utilisateurs

const pageContainer = ref(null);

// Initialisation d'AOS lors du montage du composant
onMounted(async () => {
  await fetchUsers();
  AOS.init({
    duration: 1200, // Durée de l'animation
    offset: 200,    // Décalage avant que l'animation ne se déclenche
  });

  // Déclencher un scroll automatique vers le bas
  const interval = setInterval(() => {
    if (pageContainer.value) {
      pageContainer.value.scrollTop += 2; // Scroll lentement vers le bas
    }
  }, 20);

  // Nettoyer l'intervalle lors du démontage
  return () => clearInterval(interval);
});

// Rafraîchissement d'AOS lorsqu'il y a une mise à jour dans le composant
onBeforeUnmount(() => {
  AOS.refresh();
});




// const resUsers = ref({
//     "success": true,
//     "data": [
//       {
//         "login": "Oziphos",
//         "id": 104010906,
//         "node_id": "U_kgDOBlGZGg",
//         "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/Oziphos",
//         "html_url": "https://github.com/Oziphos",
//         "followers_url": "https://api.github.com/users/Oziphos/followers",
//         "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
//         "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
//         "organizations_url": "https://api.github.com/users/Oziphos/orgs",
//         "repos_url": "https://api.github.com/users/Oziphos/repos",
//         "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/Oziphos/received_events",
//         "type": "User",
//         "user_view_type": "public",
//         "site_admin": false,
//         "permissions": {
//           "admin": true,
//           "maintain": true,
//           "push": true,
//           "triage": true,
//           "pull": true
//         },
//         "role_name": "admin"
//       },
//       {
//         "login": "Oziphos",
//         "id": 106020906,
//         "node_id": "U_kgDOBlGZGg",
//         "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/Oziphos",
//         "html_url": "https://github.com/Oziphos",
//         "followers_url": "https://api.github.com/users/Oziphos/followers",
//         "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
//         "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
//         "organizations_url": "https://api.github.com/users/Oziphos/orgs",
//         "repos_url": "https://api.github.com/users/Oziphos/repos",
//         "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/Oziphos/received_events",
//         "type": "User",
//         "user_view_type": "public",
//         "site_admin": false,
//         "permissions": {
//           "admin": true,
//           "maintain": true,
//           "push": true,
//           "triage": true,
//           "pull": true
//         },
//         "role_name": "admin"
//       },
//       {
//         "login": "Oziphos",
//         "id": 106010976,
//         "node_id": "U_kgDOBlGZGg",
//         "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/Oziphos",
//         "html_url": "https://github.com/Oziphos",
//         "followers_url": "https://api.github.com/users/Oziphos/followers",
//         "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
//         "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
//         "organizations_url": "https://api.github.com/users/Oziphos/orgs",
//         "repos_url": "https://api.github.com/users/Oziphos/repos",
//         "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/Oziphos/received_events",
//         "type": "User",
//         "user_view_type": "public",
//         "site_admin": false,
//         "permissions": {
//           "admin": true,
//           "maintain": true,
//           "push": true,
//           "triage": true,
//           "pull": true
//         },
//         "role_name": "admin"
//       },
//       {
//         "login": "Oziphos",
//         "id": 106010406,
//         "node_id": "U_kgDOBlGZGg",
//         "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/Oziphos",
//         "html_url": "https://github.com/Oziphos",
//         "followers_url": "https://api.github.com/users/Oziphos/followers",
//         "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
//         "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
//         "organizations_url": "https://api.github.com/users/Oziphos/orgs",
//         "repos_url": "https://api.github.com/users/Oziphos/repos",
//         "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/Oziphos/received_events",
//         "type": "User",
//         "user_view_type": "public",
//         "site_admin": false,
//         "permissions": {
//           "admin": true,
//           "maintain": true,
//           "push": true,
//           "triage": true,
//           "pull": true
//         },
//         "role_name": "admin"
//       },
//       {
//         "login": "Oziphos",
//         "id": 106010806,
//         "node_id": "U_kgDOBlGZGg",
//         "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/Oziphos",
//         "html_url": "https://github.com/Oziphos",
//         "followers_url": "https://api.github.com/users/Oziphos/followers",
//         "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
//         "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
//         "organizations_url": "https://api.github.com/users/Oziphos/orgs",
//         "repos_url": "https://api.github.com/users/Oziphos/repos",
//         "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/Oziphos/received_events",
//         "type": "User",
//         "user_view_type": "public",
//         "site_admin": false,
//         "permissions": {
//           "admin": true,
//           "maintain": true,
//           "push": true,
//           "triage": true,
//           "pull": true
//         },
//         "role_name": "admin"
//       }
//     ]
//   })
const resContributors = ref([
  {
    "login": "Oziphos",
    "id": 106010907,
    "node_id": "U_kgDOBlGZGg",
    "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Oziphos",
    "html_url": "https://github.com/Oziphos",
    "followers_url": "https://api.github.com/users/Oziphos/followers",
    "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
    "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
    "organizations_url": "https://api.github.com/users/Oziphos/orgs",
    "repos_url": "https://api.github.com/users/Oziphos/repos",
    "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Oziphos/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "contributions": 2
  }
])


function listOfUsers(resUsers) {
  let users = []
  for (let user of resUsers) {
    users.push(user.login)
  }
  return users
}

const users = computed(() => {
  return listOfUsers(resUsers.value)
})

const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  xaxis: {
    categories: listOfUsers(resUsers.value),
    labels: {
      style: {
        colors: '#FFFFFF',  // Couleur des labels de l'axe Y
        fontSize: '14px',    // Taille de la police des labels Y
        fontWeight: 'bold',  // Poids de la police des labels Y
      },
    },// Utiliser les logins des utilisateurs pour les catégories
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
    },
  },
  dataLabels: {
    enabled: false
  },
  yaxis: {
    title: {
      text: 'Number of commits',
    },
    labels: {
      style: {
        colors: '#FFFFFF',  // Couleur des labels de l'axe Y
        fontSize: '14px',    // Taille de la police des labels Y
        fontWeight: 'bold',  // Poids de la police des labels Y
      },
    },// Utiliser les logins des utilisateurs pour les catégories
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " commits";
      },
    }
  }
}


// Séries de données qui sont calculées une seule fois pour tous les utilisateurs
const series = ref([{
  name: 'Commits',
  data: [2, 2, 8, 2, 2, 5, 7, 6], // Chaque utilisateur a son propre nombre de commits
}]);

</script>

<template>

  <main>
    <h1>Crédits</h1>
    <div v-if="resUsers">
      <div class="card" v-for="(user) in resUsers" :key="user.id" data-aos="flip-left">
        <div class="imge" :src="user.avatar_url">
          <img :src="user.avatar_url" class="Usericon" />
          <p class="UserName">{{ user.login }}</p>
          <p class="Id">{{ user.role_name }}</p>
        </div>

        <div class="Description">
          <apexchart type="bar" :options="chartOptions" :series="series" height="350" />
        </div>
      </div>
    </div>

  </main>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

* {
  font-family: 'Press Start 2P', cursive;
}

main {
  //background-image: url("../../assets/credits_pixel_art.png");
  //filter: blur(100px);
  position: relative;
  z-index: -1;
  width: 99vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-behavior: smooth;
}

h1 {
  font-size: 200px;
  text-align: center;
  background: linear-gradient(131deg, rgba(132, 0, 243, 1) 19%, rgba(255, 220, 0, 1) 86%);
  -webkit-background-clip: text;
  /* Nécessaire pour Safari */
  background-clip: text;
  /* Pour les autres navigateurs modernes */
  color: transparent;
  /* Rend le texte transparent pour afficher le fond du dégradé */
  margin: 10rem;
}

/* Appliquer l'image de fond floutée */
main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/credits_pixel_art.png");
  background-size: cover;
  filter: blur(100px);
  /* Applique le flou uniquement à l'image de fond */
  z-index: -1;
  /* Met l'image en dessous du contenu principal */
}

.card {
  width: 475px;
  height: 470px;
  background: rgb(38, 38, 38);
  box-shadow: 7px 5px 10px rgba(0, 0, 0, 0.333);
  margin-top: 8rem;
  margin-bottom: 8rem;
}

.imge {
  height: 120px;
  background-color: #ff5858;
}

.imge .Usericon {
  transform: translateX(10px) translateY(10px);
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.imge .UserName {
  border-width: 10px;
  border-radius: 5px;
  border-color: #262626;
  color: #262626;
  font-size: 25px;
  font-weight: bold;
  transform: translateX(120px) translateY(-100px);
}

.imge .Id {
  width: 100px;
  height: 10px;
  border-width: 10px;
  border-radius: 5px;
  border-color: #262626;
  color: #262626;
  font-size: 25px;
  font-weight: bold;
  transform: translateX(122px) translateY(-100px);
}

.Description {
  border-color: #141414;
  background-color: #414141;
  transform: translate(5px, 6px);
  width: 465px;
  height: 340px;
  border-radius: 5px;
}
</style>
