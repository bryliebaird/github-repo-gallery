const overviewDiv = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const repoBtn = document.querySelector(".view-repos");


const username = "bryliebaird";
const repo = "guess-the-word";


//Fetch User Information from GH API
const getUserInfo = async function(){
    const res = await fetch (`https://api.github.com/users/${username}`);
    const userInfo = await res.json();
    //console.log(userData);
    displayUserInfo(userInfo);
}
getUserInfo();

// Display User Information in 'overview' section
const displayUserInfo = function(userInfo){
    let userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");

    const avatar = userInfo.avatar_url;
    const name = userInfo.name;
    const bio = userInfo.bio;
    const location = userInfo.location;
    const repoNum = userInfo.public_repos;

    userInfoDiv.innerHTML = 
    `  <figure>
            <img alt="user avatar" src=${avatar} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of Public Repos:</strong> ${repoNum}</p>
        </div> `

    overviewDiv.append(userInfoDiv);
}

const getAllRepos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const allRepoList = await res.json();
    //console.log(allRepoList);
    displayAllRepos(allRepoList);
}
getAllRepos();

const displayAllRepos = function(allRepoList){
    for(const item of allRepoList){
        let li = document.createElement("li");
        let title = document.createElement("h3");
        title.innerText = item.name;
        li.append(title);
        li.classList.add("repo");
        repoList.append(li);
    }
}



repoList.addEventListener("click", function(e){
    if(e.target.matches("h3")){
        let repoName = e.target.innerText;        
        console.log(repoName);
        getRepoData(repoName);
    }
});

const getRepoData = async function(repoName){
    // Fetch Repo Data
    const fetchRepoData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoData = await fetchRepoData.json();

    // Fetch Languages
    const fetchLanguages = await fetch(repoData.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    let languageArray = [];
    for(const item in languageData){
        languageArray.push(item);
    }
    //console.log(languageArray);
    let repoLanguages = languageArray.join(", ");
    //console.log(repoLanguages);
    displayRepoData(repoData, repoLanguages);
}

const displayRepoData = function(repoData, repoLanguages){
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
    
    let div = document.createElement("div");
    
    div.innerHTML = 
    `<h3>Name: ${repoData.name}</h3>
    <p>Description: ${repoData.description}</p>
    <p>Default Branch: ${repoData.default_branch}</p>
    <p>Languages: ${repoLanguages}.</p>
    <a class="visit" href="${repoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    div.classList.add("repo-data");
    repoDataSection.append(div);

    repoBtn.classList.remove("hide");

    
}