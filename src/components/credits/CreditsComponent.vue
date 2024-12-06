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
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import axios from 'axios'

const resUsers = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/api/users');
    resUsers.value = response.data;
  } catch (error) {
    console.error("Erreur de requête:", error);
  }
};

// Appel de la fonction pour récupérer les utilisateurs
fetchUsers();
  const pageContainer = ref(null);

  // Initialisation d'AOS lors du montage du composant
  onMounted(() => {
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
  // const resCommits = ref(
  //   {
  //     "success": true,
  //     "data": [
  //       {
  //         "sha": "a2c0ebde34d388a570996e743386a946f99e90ed",
  //         "node_id": "C_kwDONZg3n9oAKGEyYzBlYmRlMzRkMzg4YTU3MDk5NmU3NDMzODZhOTQ2Zjk5ZTkwZWQ",
  //         "commit": {
  //           "author": {
  //             "name": "Oziphos",
  //             "email": "106010906+Oziphos@users.noreply.github.com",
  //             "date": "2024-12-05T19:04:31Z"
  //           },
  //           "committer": {
  //             "name": "GitHub",
  //             "email": "noreply@github.com",
  //             "date": "2024-12-05T19:04:31Z"
  //           },
  //           "message": "Create README.md",
  //           "tree": {
  //             "sha": "f49ca8d178ef3d82dce40573b15699935a4472d4",
  //             "url": "https://api.github.com/repos/Oziphos/test/git/trees/f49ca8d178ef3d82dce40573b15699935a4472d4"
  //           },
  //           "url": "https://api.github.com/repos/Oziphos/test/git/commits/a2c0ebde34d388a570996e743386a946f99e90ed",
  //           "comment_count": 0,
  //           "verification": {
  //             "verified": true,
  //             "reason": "valid",
  //             "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsFcBAABCAAQBQJnUfk/CRC1aQ7uu5UhlAAA9WYQAA1AIqnzKC6LXMLxjoBZGpZG\nR/xuBr9VzeII9YbQja6G6qEcAvxVnv1lW7ngorZrT7Q6umm2TRgIUSgTbJR/AHrC\n8Wm6QU8N6M0Xm7/h1BCHvQGu07leuYdM1nDG4qtPrK5zG+vbbF7VX+0WauAhEoGN\ngjh6udB5rTAdj22bD5Y6B7g3GU+EfY0lhyy2gfT7uApE8JGgWKsmTQYU86iJOpaQ\nVJ20xnfZNYWZP6PzqB4ZbmHgk9nT9mRr9DIafkC8VUze/maUW1w/xNNtE3BiI3ku\n+3GqhQo8vouzquO+ZhfqFOCHmGiKap7L5u2h99v/KMHjZZ2+zD344Nz3bpgNpq2g\nGnNWY0eY5170hxzuzhFJEdbnH9ksgKEHC5zUAW0M0Q6MlyBRXZxEjymYdyz0gDIY\nM6P2H0I/3TVOJYXSITwgVH4bsUN+oSgHMxgacThVLacGspOWBKd8WV+NZheI+zyj\nWGjHD9OGhpC/Yh2oFmSpoSFHzW7cpLA8t3ZslJleHdkfBQFmBLoBKFcPoYptBT61\nLwFxvaYQpOOdEcEDo/ikFj49Kti1FvsQdZbPbVLC+RJ7ECLv6GoWpekFSnQeZ/71\n3nX3juFpGx0jjod9/h/gzBq+i/4f/Dzmh3jxKM3Q6f0+5VVSE12mVk0blBZ/cDaj\nrgZJm1LebGeuznpnCWPb\n=6NFn\n-----END PGP SIGNATURE-----\n",
  //             "payload": "tree f49ca8d178ef3d82dce40573b15699935a4472d4\nparent 2a0f95083094d14114dcec216b09f29f1a2a9c2b\nauthor Oziphos \u003C106010906+Oziphos@users.noreply.github.com\u003E 1733425471 +0100\ncommitter GitHub \u003Cnoreply@github.com\u003E 1733425471 +0100\n\nCreate README.md",
  //             "verified_at": "2024-12-05T19:04:36Z"
  //           }
  //         },
  //         "url": "https://api.github.com/repos/Oziphos/test/commits/a2c0ebde34d388a570996e743386a946f99e90ed",
  //         "html_url": "https://github.com/Oziphos/test/commit/a2c0ebde34d388a570996e743386a946f99e90ed",
  //         "comments_url": "https://api.github.com/repos/Oziphos/test/commits/a2c0ebde34d388a570996e743386a946f99e90ed/comments",
  //         "author": {
  //           "login": "Oziphos",
  //           "id": 106010906,
  //           "node_id": "U_kgDOBlGZGg",
  //           "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
  //           "gravatar_id": "",
  //           "url": "https://api.github.com/users/Oziphos",
  //           "html_url": "https://github.com/Oziphos",
  //           "followers_url": "https://api.github.com/users/Oziphos/followers",
  //           "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
  //           "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
  //           "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
  //           "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
  //           "organizations_url": "https://api.github.com/users/Oziphos/orgs",
  //           "repos_url": "https://api.github.com/users/Oziphos/repos",
  //           "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
  //           "received_events_url": "https://api.github.com/users/Oziphos/received_events",
  //           "type": "User",
  //           "user_view_type": "public",
  //           "site_admin": false
  //         },
  //         "committer": {
  //           "login": "web-flow",
  //           "id": 19864447,
  //           "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
  //           "avatar_url": "https://avatars.githubusercontent.com/u/19864447?v=4",
  //           "gravatar_id": "",
  //           "url": "https://api.github.com/users/web-flow",
  //           "html_url": "https://github.com/web-flow",
  //           "followers_url": "https://api.github.com/users/web-flow/followers",
  //           "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
  //           "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
  //           "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
  //           "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
  //           "organizations_url": "https://api.github.com/users/web-flow/orgs",
  //           "repos_url": "https://api.github.com/users/web-flow/repos",
  //           "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
  //           "received_events_url": "https://api.github.com/users/web-flow/received_events",
  //           "type": "User",
  //           "user_view_type": "public",
  //           "site_admin": false
  //         },
  //         "parents": [
  //           {
  //             "sha": "2a0f95083094d14114dcec216b09f29f1a2a9c2b",
  //             "url": "https://api.github.com/repos/Oziphos/test/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
  //             "html_url": "https://github.com/Oziphos/test/commit/2a0f95083094d14114dcec216b09f29f1a2a9c2b"
  //           }
  //         ]
  //       },
  //       {
  //         "sha": "2a0f95083094d14114dcec216b09f29f1a2a9c2b",
  //         "node_id": "C_kwDONZg3n9oAKDJhMGY5NTA4MzA5NGQxNDExNGRjZWMyMTZiMDlmMjlmMWEyYTljMmI",
  //         "commit": {
  //           "author": {
  //             "name": "Oziphos",
  //             "email": "106010906+Oziphos@users.noreply.github.com",
  //             "date": "2024-12-05T18:42:28Z"
  //           },
  //           "committer": {
  //             "name": "GitHub",
  //             "email": "noreply@github.com",
  //             "date": "2024-12-05T18:42:28Z"
  //           },
  //           "message": "Create blank.yml",
  //           "tree": {
  //             "sha": "a127940a2c22141cbabc717f515dc98d816b9c73",
  //             "url": "https://api.github.com/repos/Oziphos/test/git/trees/a127940a2c22141cbabc717f515dc98d816b9c73"
  //           },
  //           "url": "https://api.github.com/repos/Oziphos/test/git/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
  //           "comment_count": 0,
  //           "verification": {
  //             "verified": true,
  //             "reason": "valid",
  //             "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsFcBAABCAAQBQJnUfQUCRC1aQ7uu5UhlAAAZAYQAEDlrwTwQAJc9KZNmYY7/KQu\ncAz3MG/5454zQOuMZn667xrLSuYtj1NJgzAJ4+KxYb0SoLafkS2KqhbU+Yg+u/mE\n8BZx9VPPu5W2zeJV7fBhCkfGQRY0EADym7cTxtpTE2ne7smqjjoe9azfRi2/CoQm\n3pQSOHG6437e7A4V4hgXaLgMHktSs8ffcFzhMGh4XDcvRcNuXHvmKVcW5o5B8rdw\nacCDWVEc+YRspsV7qB3A8Z/DzrhXIm5l/FN+MMxu4myH/oHRUaz55yjJoJHewl1G\nih/1uKJmKkaUd4mhTDLgcFjRGYbJdO2eBZ2rKwBde3XQNzcrb3xPkgmRdRvd7NXA\nm/i48ohvoevvKGdHKuRlbIzNGOuolCCl5YKIbGgqHkU2hjQOV7yXrIBPEOHfGcRN\ndgixF3c707azzMZ2HZ43sysWTEG4n2zATOdc++oxgHZ0/UoIByZUzPq5cfd6E/7o\n+GgBfMExg7XbB4J2EZSbeEin98wzW7rAp0arkFFMu46y106zPLWgUM+EH5wvFbu3\n7AWFCD+MVsCUvhZa9uh3wDovQj2iw0aLImXck8PVqtafEc8AnxBqldlge/lIilX1\n2E1aCcr5U9R6aj5/gDxg5Jp/389UUOsD0gWKuiw//aJE3saWiCVE3rkZRsbpCEBh\nDyUzTtvfCV4jlEySzdcB\n=y8my\n-----END PGP SIGNATURE-----\n",
  //             "payload": "tree a127940a2c22141cbabc717f515dc98d816b9c73\nauthor Oziphos \u003C106010906+Oziphos@users.noreply.github.com\u003E 1733424148 +0100\ncommitter GitHub \u003Cnoreply@github.com\u003E 1733424148 +0100\n\nCreate blank.yml",
  //             "verified_at": "2024-12-05T18:43:33Z"
  //           }
  //         },
  //         "url": "https://api.github.com/repos/Oziphos/test/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
  //         "html_url": "https://github.com/Oziphos/test/commit/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
  //         "comments_url": "https://api.github.com/repos/Oziphos/test/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b/comments",
  //         "author": {
  //           "login": "Oziphos",
  //           "id": 106010906,
  //           "node_id": "U_kgDOBlGZGg",
  //           "avatar_url": "https://avatars.githubusercontent.com/u/106010906?v=4",
  //           "gravatar_id": "",
  //           "url": "https://api.github.com/users/Oziphos",
  //           "html_url": "https://github.com/Oziphos",
  //           "followers_url": "https://api.github.com/users/Oziphos/followers",
  //           "following_url": "https://api.github.com/users/Oziphos/following{/other_user}",
  //           "gists_url": "https://api.github.com/users/Oziphos/gists{/gist_id}",
  //           "starred_url": "https://api.github.com/users/Oziphos/starred{/owner}{/repo}",
  //           "subscriptions_url": "https://api.github.com/users/Oziphos/subscriptions",
  //           "organizations_url": "https://api.github.com/users/Oziphos/orgs",
  //           "repos_url": "https://api.github.com/users/Oziphos/repos",
  //           "events_url": "https://api.github.com/users/Oziphos/events{/privacy}",
  //           "received_events_url": "https://api.github.com/users/Oziphos/received_events",
  //           "type": "User",
  //           "user_view_type": "public",
  //           "site_admin": false
  //         },
  //         "committer": {
  //           "login": "web-flow",
  //           "id": 19864447,
  //           "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
  //           "avatar_url": "https://avatars.githubusercontent.com/u/19864447?v=4",
  //           "gravatar_id": "",
  //           "url": "https://api.github.com/users/web-flow",
  //           "html_url": "https://github.com/web-flow",
  //           "followers_url": "https://api.github.com/users/web-flow/followers",
  //           "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
  //           "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
  //           "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
  //           "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
  //           "organizations_url": "https://api.github.com/users/web-flow/orgs",
  //           "repos_url": "https://api.github.com/users/web-flow/repos",
  //           "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
  //           "received_events_url": "https://api.github.com/users/web-flow/received_events",
  //           "type": "User",
  //           "user_view_type": "public",
  //           "site_admin": false
  //         },
  //         "parents": []
  //       }
  //     ]
  //   }
  // )

// console.log(resCommits.value.data[0].commit.author.name)
  function listOfUsers(resUsers){
    let users = []
    for (let user of resUsers){
      users.push(user.login)
    }
    return users
  }
//
//   const users = listOfUsers(resUsers.value.data)
//   function nbCommitsByUsers(users,resCommits){
//     let nbCommits = {}
//     for (let user of users){
//       let nbCommits = 0
//       for (let commit of resCommits){
//         console.log(commit.commit)
//         if (user == commit.commit.author.name){
//           nbCommits += {"login":user, "commits":nbCommits++}
//         }
//       }
//       nbCommits = 0
//     }
//     return nbCommits
//   }
//   const nb = nbCommitsByUsers(users, resCommits.value.data)
//   console.log(nb)
console.log(listOfUsers(resUsers.value.data))
const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  xaxis: {
    categories: listOfUsers(resUsers.value.data),
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
  }}

// Séries de données qui sont calculées une seule fois pour tous les utilisateurs
const series = ref([{
  name: 'Commits',
  data: [2,2,8,2,2], // Chaque utilisateur a son propre nombre de commits
}]);

</script>

<template>

  <main>
    <h1>Crédits</h1>
    <div class="card" v-for="(user) in resUsers.data" :key="user.id" data-aos="flip-left">
      <div class="imge" :src="user.avatar_url">
        <img :src="user.avatar_url" class="Usericon" />
        <p class="UserName">{{ user.login }}</p>
        <p class="Id">{{ user.role_name }}</p>
      </div>

      <div class="Description">
        <apexchart
          type="bar"
          :options="chartOptions"
        :series="series"
        height="350"
        />
      </div>
    </div>
  </main>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
* {
  font-family: 'Press Start 2P', cursive;
}
  main{
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
  background: linear-gradient(131deg, rgba(132,0,243,1) 19%, rgba(255,220,0,1) 86%);
  -webkit-background-clip: text; /* Nécessaire pour Safari */
  background-clip: text; /* Pour les autres navigateurs modernes */
  color: transparent; /* Rend le texte transparent pour afficher le fond du dégradé */
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
    filter: blur(100px); /* Applique le flou uniquement à l'image de fond */
    z-index: -1; /* Met l'image en dessous du contenu principal */
  }

  .card {
    width: 390px;
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
    font-size: 35px;
    font-weight: bold;
    transform: translateX(120px) translateY(-100px);
  }

  .imge .Id {
    width: 100px;
    height: 15px;
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
    width: 380px;
    height: 340px;
    border-radius: 5px;
  }

</style>
