const overviewDiv = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const username = "bryliebaird";
const repo = "guess-the-word";


//Fetch API JSON Data from Github API 
const getUserData = async function(){
    const res = await fetch (`https://api.github.com/users/${username}`);
    const userData = await res.json();
    //console.log(userData);
  
    // Fire displayUserData function
    displayUserData(userData);
}

// Fire getUserData function
getUserData();


const displayUserData = function(userData){
    //console.log(`displayUserData function is running and can pass userData ${userData}`);

    let userInformation = document.createElement("div");
    userInformation.classList.add("user-info");

    const avatar = userData.avatar_url;
    const name = userData.name;
    const bio = userData.bio;
    const location = userData.location;
    const repoNum = userData.public_repos;

    //console.log(name);

    userInformation.innerHTML = 
    `  <figure>
            <img alt="user avatar" src=${avatar} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of Public Repos:</strong> ${repoNum}</p>
        </div> `

    overviewDiv.append(userInformation);
}


const getRepos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const repoData = await res.json();
    console.log(repoData);
    displayRepo(repoData);
}

getRepos();

const displayRepo = function(repoData){
    for(const item of repoData){
        let li = document.createElement("li");
        let title = document.createElement("h3");
        title.innerText = item.name;
        li.append(title);
        li.classList.add("repo");
        repoList.append(li);
        //console.log(repoList, li);
    }
}
