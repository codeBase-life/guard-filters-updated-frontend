var splide = new Splide(".splide", {
  type: "loop",
  perPage: 3,
  focus: "center",
  pagination: false,
  gap: "1rem",
  breakpoints: {
    768: {
      perPage: 1,
    },
  },
});

splide.mount();

// select js
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filterSelect").value = "";
});

const get_data = async (search) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${search}`);
    const products = await response.json();
    displayResults(products);
  } catch (error) {
    console.error("error fetching products for search", error);
  }
};

const md_searchBox = document.getElementById("md-search-box");
const md_searchResults = document.getElementById("md-search-results");
// console.log(searchBox);

md_searchBox.addEventListener("input", () => {
  const query = md_searchBox.value.toLowerCase();
  console.log(query);

  get_data(query ? query : " ");
});

// for hide the search box if clicked outside the box
document.addEventListener("click", (e) => {
  if (
    !md_searchBox.contains(e.target) &&
    !md_searchResults.contains(e.target)
  ) {
    md_searchResults.style.display = "none";
  }
});

const displayResults = (products) => {
  const searchResults = document.getElementById("md-search-results");
  searchResults.innerHTML = "";
  if (products.length > 0) {
    searchResults.innerHTML = "";
    searchResults.style.display = "block";
    products.slice(0, 5).forEach((item) => {
      const first_ul = document.createElement("ul");
      first_ul.className = "list-unstyled ";
      const first_li = document.createElement("li");
      const second_ul = document.createElement("ul");
      second_ul.className =
        "list-unstyled d-flex justify-content-between px-3 align-items-center";

      const second_li = document.createElement("li");
      second_li.innerHTML = `<img class="img-fluid search-box-img fixed-size-img" src="${item.image}" alt="">`;
      second_ul.appendChild(second_li);

      const third_li = document.createElement("li");
      third_li.innerHTML = `<p class="text-dark">${item.title}</p>`;
      second_ul.appendChild(third_li);

      const forth_li = document.createElement("li");
      forth_li.innerHTML = `<a href='./product.html?id=${item.id}' role="button" class="text-dark text-decoration-none rounded-pill bg-light py-1 px-2">view</a>`;
      second_ul.appendChild(forth_li);

      first_li.appendChild(second_ul);
      first_ul.appendChild(first_li);
      const first_hr = document.createElement("hr");
      first_hr.className = "p-0 m-0 border border-1";
      first_ul.appendChild(first_hr);
      searchResults.appendChild(first_ul);
    });
  } else {
    searchResults.style.display = "none";
  }
};

//for small devices

const sm_get_data = async (search) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${search}`);
    const products = await response.json();
    sm_displayResults(products);
  } catch (error) {
    console.error("error fetching products for search", error);
  }
};

const sm_searchBox = document.getElementById("sm-search-box");
const sm_searchResults = document.getElementById("sm-search-results");
// console.log(searchBox);

sm_searchBox.addEventListener("input", () => {
  const query = sm_searchBox.value.toLowerCase();

  sm_get_data(query ? query : " ");
});

// for hide the search box if clicked outside the box
document.addEventListener("click", (e) => {
  if (
    !sm_searchBox.contains(e.target) &&
    !sm_searchResults.contains(e.target)
  ) {
    sm_searchResults.style.display = "none";
  }
});

const sm_displayResults = (products) => {
  const searchResults = document.getElementById("sm-search-results");
  searchResults.innerHTML = "";
  if (products.length > 0) {
    searchResults.innerHTML = "";
    searchResults.style.display = "block";
    products.slice(0, 5).forEach((item) => {
      const first_ul = document.createElement("ul");
      first_ul.className = "list-unstyled ";
      const first_li = document.createElement("li");
      const second_ul = document.createElement("ul");
      second_ul.className =
        "list-unstyled d-flex justify-content-between px-3 align-items-center";

      const second_li = document.createElement("li");
      second_li.innerHTML = `<img class="img-fluid search-box-img fixed-size-img" src="${item.image}" alt="">`;
      second_ul.appendChild(second_li);

      const third_li = document.createElement("li");
      third_li.innerHTML = `<p class="text-dark">${item.title}</p>`;
      second_ul.appendChild(third_li);

      const forth_li = document.createElement("li");
      forth_li.innerHTML = `<a href='./product.html?id=${item.id}' role="button" class="text-dark text-decoration-none rounded-pill bg-light py-1 px-2">view</a>`;
      second_ul.appendChild(forth_li);

      first_li.appendChild(second_ul);
      first_ul.appendChild(first_li);
      const first_hr = document.createElement("hr");
      first_hr.className = "p-0 m-0 border border-1";
      first_ul.appendChild(first_hr);
      searchResults.appendChild(first_ul);
    });
  } else {
    searchResults.style.display = "none";
  }
};
