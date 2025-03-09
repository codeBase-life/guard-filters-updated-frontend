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

// filter values

const all_filter = document.getElementById("all-filter");
const all_model = document.getElementById("all-model");
const all_make = document.getElementById("all-make");
const all_year = document.getElementById("all-year");

const filter_values = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/products/filter_values"
    );
    const filters = await response.json();
    topFilter(filters.type);

    return filters;
  } catch (error) {
    console.error("error fetching filter values ", error);
  }
};

const getFilterValues = async () => {
  const filters = await filter_values();
  return {
    make: filters.make,
    model: filters.model,
    year: filters.year,
    filter: filters.type,
  };
};

const display_filters = async () => {
  const { make, model, year, filter } = await getFilterValues();

  all_make.innerHTML = "";
  all_model.innerHTML = "";
  all_filter.innerHTML = "";
  all_year.innerHTML = "";

  const check_make = new Set();
  const check_year = new Set();
  const check_model = new Set();
  const check_filter = new Set();

  make.forEach((item) => {
    if (!check_make.has(item)) {
      const make_li = document.createElement("li");
      make_li.innerHTML = `<a class="dropdown-item" href="" data-filter="make" data-value="${item}">${item}</a>`;

      check_make.add(item);
      all_make.appendChild(make_li);
    }
  });

  model.forEach((item) => {
    if (!check_model.has(item)) {
      const make_li = document.createElement("li");
      make_li.innerHTML = `<a class="dropdown-item" href="" data-filter="model" data-value="${item}">${item}</a>`;
      check_model.add(item);
      all_model.appendChild(make_li);
    }
  });
  year.forEach((item) => {
    if (!check_year.has(item)) {
      const make_li = document.createElement("li");
      make_li.innerHTML = `<a class="dropdown-item" href="" data-filter="year" data-value="${item}">${item}</a>`;
      check_year.add(item);
      all_year.appendChild(make_li);
    }
  });

  filter.forEach((item) => {
    if (!check_filter.has(item)) {
      const li = document.createElement("li");
      li.innerHTML = `<a class="dropdown-item" href="" data-filter="type" data-value="${item}">${item}</a>`;
      check_filter.add(item);
      all_filter.appendChild(li);
    }
  });

  document.querySelectorAll(".dropdown-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const filter_type = link.getAttribute("data-filter");
      const filter_value = link.getAttribute("data-value");
      const query = `?${filter_type}=${filter_value}`;

      filter_applied(query);
    });
  });
};
display_filters();

const filter_applied = async (query) => {
  try {
    const value = await fetch(
      `http://localhost:3000/api/products${query ? query : ""}`
    );
    const data = await value.json();

    dynamic_products(data.filter_applied);
  } catch (error) {
    console.error("error fetching products after filter applied", error);
  }
};
filter_applied();

const dynamic_products = (data) => {
  let short = data.slice(0, 6);

  const products = document.getElementById("products");
  products.innerHTML = "";
  short.forEach((item) => {
    const first_div = document.createElement("div");
    first_div.className = "col d-flex flex-column justify-content-between";
    const first_inner_div = document.createElement("div");
    first_inner_div.className =
      "rounded bg-white text-center d-flex align-items-center justify-content-center";
    first_inner_div.style = "height:100%";
    first_inner_div.innerHTML = `<img class="img-fluid" src="${item.image}" alt="">`;

    const first_inner_ul = document.createElement("ul");
    first_inner_ul.className =
      "list-unstyled bg-white rounded-bottom px-3 py-3  d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-between align-items-center";
    const inner_ul_li = document.createElement("li");
    inner_ul_li.innerHTML = `<b class="text-black product-title">${item.title}</b>`;

    first_inner_ul.appendChild(inner_ul_li);

    const inner_ul_li_2 = document.createElement("li");
    inner_ul_li_2.innerHTML = `<a href="./product.html?id=${item.id}" role="button" class="product-btn text-decoration-none">view</a>`;
    first_inner_ul.appendChild(inner_ul_li_2);
    first_div.appendChild(first_inner_div);
    first_div.appendChild(first_inner_ul);
    products.appendChild(first_div);
  });
};

const topFilter = (value) => {
  const filter = document.getElementById("filterSelect");
  const check_value = new Set();
  value.forEach((item) => {
    if (!check_value.has(item)) {
      const val = document.createElement("option");
      val.className = "topFilter";
      val.innerText = item;
      val.value = item;

      check_value.add(item);
      filter.append(val);
    }
  });

  document.querySelectorAll(".topFilter").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
};
// topFilter();
