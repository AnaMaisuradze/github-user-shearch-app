const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const title = document.querySelector(".title");
const modeText = document.querySelector(".mode-text");
const userInput = document.querySelector("#user");
const searchButton = document.querySelector(".searchbtn");
const cards = document.querySelectorAll(".card");

const profileImgMobile = document.querySelector(".profile-img-mobile");
const profileImgDesktop = document.querySelector(".profile-img-desktop");
const profileName = document.querySelector(".name");
const profileLogin = document.querySelector(".login");
const createDate = document.querySelector(".create-date");
const bio = document.querySelector(".bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const cityLocation = document.querySelector("#location");
const website = document.querySelector("#website");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const errorElement = document.querySelector(".error");
const statistic = document.querySelector(".statistic");

const octocat = {
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    bio: null,
    blog: "https://github.blog",
    company: "@github",
    created_at: "2011-01-25T18:44:36Z",
    email: null,
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    followers: 8291,
    followers_url: "https://api.github.com/users/octocat/followers",
    following: 9,
    following_url: "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    gravatar_id: "",
    hireable: null,
    html_url: "https://github.com/octocat",
    id: 583231,
    location: "San Francisco",
    login: "octocat",
    name: "The Octocat",
    node_id: "MDQ6VXNlcjU4MzIzMQ==",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    public_gists: 8,
    public_repos: 8,
    received_events_url: "https://api.github.com/users/octocat/received_events",
    repos_url: "https://api.github.com/users/octocat/repos",
    site_admin: false,
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    twitter_username: null,
    type: "User",
    updated_at: "2023-01-22T12:13:51Z",
    url: "https://api.github.com/users/octocat",
};

userInput.addEventListener("input", () => {
    errorElement.textContent = "";
});
  
// date convertor

const dateConvertor = (date) => {
    const transformedDate = new Date(date);
    const dateString = transformedDate.toDateString();
    const [weekday, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year}`;
};

// user profile information

const userProfile = (user) => {
    profileImgMobile.src = user.avatar_url;
    profileImgDesktop.src = user.avatar_url;
    profileName.textContent = user.name;
    profileLogin.textContent = "@" + user.login;
    const date = dateConvertor(user.created_at);
    createDate.textContent = "Joined " + date;
    bio.textContent =
    user.bio ||
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.";
    repos.textContent = user.public_repos;
    following.textContent = user.following;
    followers.textContent = user.followers;


    if (user.location){
        cityLocation.textContent = user.location;
        cityLocation.parentElement.style.opacity = 1;
    }else{
        cityLocation.textContent = "Not Available";
        cityLocation.parentElement.style.opacity = 0.5;
    }

    if (user.twitter_username){
        twitter.textContent = user.location;
        twitter.parentElement.style.opacity = 1;
    }else{
        twitter.textContent = "Not Available";
        twitter.parentElement.style.opacity = 0.5;
    }

    if (user.blog){
        website.textContent = user.blog;
        website.href = user.blog;
        website.parentElement.style.opacity = 1;
    }else{
        website.textContent = "Not Available";
        website.href = "#";
        website.parentElement.style.opacity = 0.5;
    }

    if (user.company){
        company.textContent = user.company;
        company.parentElement.style.opacity = 1;
    }else{
        company.textContent = "Not Available";
        company.parentElement.style.opacity = 0.5;
    }
};

userProfile(octocat);

//   switching mode

const switchMode = (mode) => {
    if (mode === "dark"){
        moon.style.display = "none";
        sun.style.display = "block";
        document.body.style.backgroundColor = "#141d2f";
    }else{
        moon.style.display = "block";
        sun.style.display = "none";
        document.body.style.backgroundColor = "#f6f8ff";
    }

    title.classList.toggle("dark");
    modeText.classList.toggle("dark");
    userInput.classList.toggle("dark");
    Array.from(cards).forEach((card)=>card.classList.toggle("dark"));
    website.classList.toggle("dark");
    profileLogin.style.color = "var(--blue)";
    statistic.classList.toggle("dark");
}

moon.addEventListener("click",() => switchMode("dark"));
sun.addEventListener("click",() => switchMode("light"));

// connecting to API

searchButton.addEventListener ("click", async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get(
            "https://api.github.com/users/" + userInput.value
        );
        const user = response.data;
        userProfile(user);
        userInput.value = "";
        
    } catch (error) {
        errorElement.textContent = "No result";
        
    }

})