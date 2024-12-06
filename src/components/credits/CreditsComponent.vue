<script setup>
// Importation d'AOS
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import axios from "axios"

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




  const resUsers = ref({
      "success": true,
      "data": [
        {
          "login": "Oziphos",
          "id": 106010906,
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
          "permissions": {
            "admin": true,
            "maintain": true,
            "push": true,
            "triage": true,
            "pull": true
          },
          "role_name": "admin"
        },
        {
          "login": "Oziphos",
          "id": 106010906,
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
          "permissions": {
            "admin": true,
            "maintain": true,
            "push": true,
            "triage": true,
            "pull": true
          },
          "role_name": "admin"
        },
        {
          "login": "Oziphos",
          "id": 106010906,
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
          "permissions": {
            "admin": true,
            "maintain": true,
            "push": true,
            "triage": true,
            "pull": true
          },
          "role_name": "admin"
        },
        {
          "login": "Oziphos",
          "id": 106010906,
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
          "permissions": {
            "admin": true,
            "maintain": true,
            "push": true,
            "triage": true,
            "pull": true
          },
          "role_name": "admin"
        },
        {
          "login": "Oziphos",
          "id": 106010906,
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
          "permissions": {
            "admin": true,
            "maintain": true,
            "push": true,
            "triage": true,
            "pull": true
          },
          "role_name": "admin"
        }
      ]
    })
  const resCommits = ref(
    {
      "success": true,
      "data": [
        {
          "sha": "a2c0ebde34d388a570996e743386a946f99e90ed",
          "node_id": "C_kwDONZg3n9oAKGEyYzBlYmRlMzRkMzg4YTU3MDk5NmU3NDMzODZhOTQ2Zjk5ZTkwZWQ",
          "commit": {
            "author": {
              "name": "Oziphos",
              "email": "106010906+Oziphos@users.noreply.github.com",
              "date": "2024-12-05T19:04:31Z"
            },
            "committer": {
              "name": "GitHub",
              "email": "noreply@github.com",
              "date": "2024-12-05T19:04:31Z"
            },
            "message": "Create README.md",
            "tree": {
              "sha": "f49ca8d178ef3d82dce40573b15699935a4472d4",
              "url": "https://api.github.com/repos/Oziphos/test/git/trees/f49ca8d178ef3d82dce40573b15699935a4472d4"
            },
            "url": "https://api.github.com/repos/Oziphos/test/git/commits/a2c0ebde34d388a570996e743386a946f99e90ed",
            "comment_count": 0,
            "verification": {
              "verified": true,
              "reason": "valid",
              "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsFcBAABCAAQBQJnUfk/CRC1aQ7uu5UhlAAA9WYQAA1AIqnzKC6LXMLxjoBZGpZG\nR/xuBr9VzeII9YbQja6G6qEcAvxVnv1lW7ngorZrT7Q6umm2TRgIUSgTbJR/AHrC\n8Wm6QU8N6M0Xm7/h1BCHvQGu07leuYdM1nDG4qtPrK5zG+vbbF7VX+0WauAhEoGN\ngjh6udB5rTAdj22bD5Y6B7g3GU+EfY0lhyy2gfT7uApE8JGgWKsmTQYU86iJOpaQ\nVJ20xnfZNYWZP6PzqB4ZbmHgk9nT9mRr9DIafkC8VUze/maUW1w/xNNtE3BiI3ku\n+3GqhQo8vouzquO+ZhfqFOCHmGiKap7L5u2h99v/KMHjZZ2+zD344Nz3bpgNpq2g\nGnNWY0eY5170hxzuzhFJEdbnH9ksgKEHC5zUAW0M0Q6MlyBRXZxEjymYdyz0gDIY\nM6P2H0I/3TVOJYXSITwgVH4bsUN+oSgHMxgacThVLacGspOWBKd8WV+NZheI+zyj\nWGjHD9OGhpC/Yh2oFmSpoSFHzW7cpLA8t3ZslJleHdkfBQFmBLoBKFcPoYptBT61\nLwFxvaYQpOOdEcEDo/ikFj49Kti1FvsQdZbPbVLC+RJ7ECLv6GoWpekFSnQeZ/71\n3nX3juFpGx0jjod9/h/gzBq+i/4f/Dzmh3jxKM3Q6f0+5VVSE12mVk0blBZ/cDaj\nrgZJm1LebGeuznpnCWPb\n=6NFn\n-----END PGP SIGNATURE-----\n",
              "payload": "tree f49ca8d178ef3d82dce40573b15699935a4472d4\nparent 2a0f95083094d14114dcec216b09f29f1a2a9c2b\nauthor Oziphos \u003C106010906+Oziphos@users.noreply.github.com\u003E 1733425471 +0100\ncommitter GitHub \u003Cnoreply@github.com\u003E 1733425471 +0100\n\nCreate README.md",
              "verified_at": "2024-12-05T19:04:36Z"
            }
          },
          "url": "https://api.github.com/repos/Oziphos/test/commits/a2c0ebde34d388a570996e743386a946f99e90ed",
          "html_url": "https://github.com/Oziphos/test/commit/a2c0ebde34d388a570996e743386a946f99e90ed",
          "comments_url": "https://api.github.com/repos/Oziphos/test/commits/a2c0ebde34d388a570996e743386a946f99e90ed/comments",
          "author": {
            "login": "Oziphos",
            "id": 106010906,
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
            "site_admin": false
          },
          "committer": {
            "login": "web-flow",
            "id": 19864447,
            "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
            "avatar_url": "https://avatars.githubusercontent.com/u/19864447?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/web-flow",
            "html_url": "https://github.com/web-flow",
            "followers_url": "https://api.github.com/users/web-flow/followers",
            "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
            "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
            "organizations_url": "https://api.github.com/users/web-flow/orgs",
            "repos_url": "https://api.github.com/users/web-flow/repos",
            "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
            "received_events_url": "https://api.github.com/users/web-flow/received_events",
            "type": "User",
            "user_view_type": "public",
            "site_admin": false
          },
          "parents": [
            {
              "sha": "2a0f95083094d14114dcec216b09f29f1a2a9c2b",
              "url": "https://api.github.com/repos/Oziphos/test/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
              "html_url": "https://github.com/Oziphos/test/commit/2a0f95083094d14114dcec216b09f29f1a2a9c2b"
            }
          ]
        },
        {
          "sha": "2a0f95083094d14114dcec216b09f29f1a2a9c2b",
          "node_id": "C_kwDONZg3n9oAKDJhMGY5NTA4MzA5NGQxNDExNGRjZWMyMTZiMDlmMjlmMWEyYTljMmI",
          "commit": {
            "author": {
              "name": "Oziphos",
              "email": "106010906+Oziphos@users.noreply.github.com",
              "date": "2024-12-05T18:42:28Z"
            },
            "committer": {
              "name": "GitHub",
              "email": "noreply@github.com",
              "date": "2024-12-05T18:42:28Z"
            },
            "message": "Create blank.yml",
            "tree": {
              "sha": "a127940a2c22141cbabc717f515dc98d816b9c73",
              "url": "https://api.github.com/repos/Oziphos/test/git/trees/a127940a2c22141cbabc717f515dc98d816b9c73"
            },
            "url": "https://api.github.com/repos/Oziphos/test/git/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
            "comment_count": 0,
            "verification": {
              "verified": true,
              "reason": "valid",
              "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsFcBAABCAAQBQJnUfQUCRC1aQ7uu5UhlAAAZAYQAEDlrwTwQAJc9KZNmYY7/KQu\ncAz3MG/5454zQOuMZn667xrLSuYtj1NJgzAJ4+KxYb0SoLafkS2KqhbU+Yg+u/mE\n8BZx9VPPu5W2zeJV7fBhCkfGQRY0EADym7cTxtpTE2ne7smqjjoe9azfRi2/CoQm\n3pQSOHG6437e7A4V4hgXaLgMHktSs8ffcFzhMGh4XDcvRcNuXHvmKVcW5o5B8rdw\nacCDWVEc+YRspsV7qB3A8Z/DzrhXIm5l/FN+MMxu4myH/oHRUaz55yjJoJHewl1G\nih/1uKJmKkaUd4mhTDLgcFjRGYbJdO2eBZ2rKwBde3XQNzcrb3xPkgmRdRvd7NXA\nm/i48ohvoevvKGdHKuRlbIzNGOuolCCl5YKIbGgqHkU2hjQOV7yXrIBPEOHfGcRN\ndgixF3c707azzMZ2HZ43sysWTEG4n2zATOdc++oxgHZ0/UoIByZUzPq5cfd6E/7o\n+GgBfMExg7XbB4J2EZSbeEin98wzW7rAp0arkFFMu46y106zPLWgUM+EH5wvFbu3\n7AWFCD+MVsCUvhZa9uh3wDovQj2iw0aLImXck8PVqtafEc8AnxBqldlge/lIilX1\n2E1aCcr5U9R6aj5/gDxg5Jp/389UUOsD0gWKuiw//aJE3saWiCVE3rkZRsbpCEBh\nDyUzTtvfCV4jlEySzdcB\n=y8my\n-----END PGP SIGNATURE-----\n",
              "payload": "tree a127940a2c22141cbabc717f515dc98d816b9c73\nauthor Oziphos \u003C106010906+Oziphos@users.noreply.github.com\u003E 1733424148 +0100\ncommitter GitHub \u003Cnoreply@github.com\u003E 1733424148 +0100\n\nCreate blank.yml",
              "verified_at": "2024-12-05T18:43:33Z"
            }
          },
          "url": "https://api.github.com/repos/Oziphos/test/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
          "html_url": "https://github.com/Oziphos/test/commit/2a0f95083094d14114dcec216b09f29f1a2a9c2b",
          "comments_url": "https://api.github.com/repos/Oziphos/test/commits/2a0f95083094d14114dcec216b09f29f1a2a9c2b/comments",
          "author": {
            "login": "Oziphos",
            "id": 106010906,
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
            "site_admin": false
          },
          "committer": {
            "login": "web-flow",
            "id": 19864447,
            "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
            "avatar_url": "https://avatars.githubusercontent.com/u/19864447?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/web-flow",
            "html_url": "https://github.com/web-flow",
            "followers_url": "https://api.github.com/users/web-flow/followers",
            "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
            "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
            "organizations_url": "https://api.github.com/users/web-flow/orgs",
            "repos_url": "https://api.github.com/users/web-flow/repos",
            "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
            "received_events_url": "https://api.github.com/users/web-flow/received_events",
            "type": "User",
            "user_view_type": "public",
            "site_admin": false
          },
          "parents": []
        }
      ]
    }
  )

console.log(resCommits.value.data[0].commit.author.name)

</script>

<template>
  <main>
    <div class="user"  v-for="user in resUsers.data" :key="user.id" data-aos="flip-up">
      <img :src="user.avatar_url " class="avatar" />
      <h2>{{ user.login }}</h2>
      <h3>{{ user.role_name }}</h3>
    </div>
  </main>


</template>

<style scoped>
  main{
    width: 99vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user{
    margin-top: 8rem;
    margin-bottom: 8rem;
  }

</style>
