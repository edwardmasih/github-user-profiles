const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// getUser("edwardmasih");

async function getUser(username) {
  const resp = await fetch(API_URL + username);
  const respData = await resp.json();

  createCard(respData);
}

async function getRepos(username) {
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function createCard(userData) {
  const cardHTML = `
        <div class="card">
            <div>
                <a href="${userData.html_url}">
                    <img class="avatar" src="${userData.avatar_url}" alt="${userData.name}" />
                </a>
            </div>
            <div class="user-info">
                <a href="${userData.html_url}">
                    <h2>${userData.name}</h2>
                </a>
                ${
                  userData.location!=null ? `<h4>${userData.location}</h4>` : '',
                  userData.bio!=null ? `<p>${userData.bio}</p>` : ''
                }
                <ul class="info">
                    <li>${userData.followers}<strong>Followers</strong></li>
                    <li>${userData.following}<strong>Following</strong></li>
                    <li>${userData.public_repos}<strong>Repos</strong></li>
                </ul>
            </div>
        </div>
    `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = search.value;

  if (username) {
    getUser(username);
    search.value = "";
  }
});
