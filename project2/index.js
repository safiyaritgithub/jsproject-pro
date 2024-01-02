const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
  return `
    <div class="px-5 py-6 shadow-lg w-6/12  -mt-64 ml-80  transition ease-in duration-500 hover:-rotate-3 scale-125 transition ease-in duration-500" >
    <div class=" flex items-center gap-2 ">
      <div>
        <img src="${profile.avatar_url}" class="h-10 w-10 rounded-2xl"/>
      </div>
      <div class="">
        <h1 class="font-bold">${profile.name}</h1>
        <h1 class="font-bold">${profile.login}</h1>

      </div>
      <a href="${profile.html_url}" target="_blank">
      <button class=" border bg-purple-700 text-white text-sm p-1  hover:bg-purple-900 active:bg-purple-600 ml-80" id="search-btn">Check profile</button>
      </a>

          </div>
          <div class="m-3">
            <h2 class="font-bold">
              About
            </h2>
            <p> ${profile.bio}</p>
          </div>
          <div class="m-2 grid grid-cols-3">
            <div class="flex flex-col items-center">
              <h3 class="font-bold">Followers</h3>
              <p>${profile.followers}</p>
            </div>
            <div>
              <h3 class="font-bold">Followings</h3>
              <p>${profile.following}</p>
            </div>
            <div>
              <h3 class="font-bold">Reposers</h3>
              <p>${profile.public_repos}</p>
            </div>
          </div>
</div>

    `;
};

const fetchProfile = async () => {
  const username = searchInputEl.value;
  loadingEl.innerText = "loading...";
  loadingEl.style.color = "black";

  try {
    const res = await fetch(`${url}/${username}`);
    const data = await res.json();
    if (data.bio) {
      loadingEl.innerText = "";
      profileContainerEl.innerHTML = generateProfile(data);
    } else {
      loadingEl.innerHTML = data.message;
      loadingEl.style.color = "red";
      profileContainerEl.innerText = "";
    }

    console.log("data", data);
  } catch (error) {
    console.log({ error });
    loadingEl.innerText = "";
  }
};
searchBtnEl.addEventListener("click", fetchProfile);
