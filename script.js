const APIURL = "https://api.github.com/users/"

const main = document.getElementById("main")
const search = document.getElementById("search")
const form = document.getElementById("form")

getUser('gideon5')
async function getUser(username){
   const resp = await fetch(APIURL + username)
    respData = await resp.json()

    createUserCard(respData)

    getRepos(username)
}

async function getRepos(username){
    const resp = await fetch (APIURL + username)
    const respData = resp.json()

    addReposToCard(respData)

}

function createUserCard(user){
    const cardHTML = 
    `<div class="card"
    <div class="img-container">
    <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul class="info">
        <li><strong>Followers </strong>${user.followers}</li>
        <li><strong>Following </strong>${user.following}</li>
        <li><strong>Repos </strong>${user.public_repos}</li>
        </ul>
        <div id="repos" class="repos">
        </div>

    </div>
    </div>
    
    `
    
    main.innerHTML = cardHTML

}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos")

    repos.forEach((repo) => {
        const repoEl = document.createElement("a")
        repoEl.classList.add("repo")

        repoEl.href = repo.html_url
        repoEl.target = "_blank"
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })

    repos.forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });




}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)
        
        search.value = ""
    }

})