function fetchAndDisplayProducts(query = "") {
  fetch(`/api/products${query}`)
    .then((data) => data.json())
    .then((products) => {
      const products_section = document.getElementById(
        "all-products-products-section"
      );
      products_section.innerHTML = "";
      products.forEach((item) => {
        const first_inner_div = document.createElement("div");
        first_inner_div.className =
          "col d-flex flex-column justify-content-between";

        const second_inner_div = document.createElement("div");
        second_inner_div.className =
          "rounded bg-white text-center d-flex align-items-center justify-content-center ";
        second_inner_div.style = "height:100%";

        second_inner_div.innerHTML = `  <img class="img-fluid" src="${item.image}" alt="">`;

        const inner_ul = document.createElement("ul");
        inner_ul.className =
          "list-unstyled bg-white rounded-bottom px-3 py-3  d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-md-between align-items-md-end justify-content-start";
        const ul_first_li = document.createElement("li");
        ul_first_li.innerHTML = `
               <b class="text-black product-title">${item.title}</b>
              `;
        const ul_second_li = document.createElement("li");
        ul_second_li.innerHTML =
          '<button type="button" class="product-btn">view</button>';
        inner_ul.appendChild(ul_first_li);
        inner_ul.appendChild(ul_second_li);

        first_inner_div.appendChild(second_inner_div);
        first_inner_div.appendChild(inner_ul);
        products_section.appendChild(first_inner_div);
      });
    })
    .catch((err) => console.error("error fetching products", err));
}
fetchAndDisplayProducts();

// FILTER VALUES ----------------------------------------------------------------

async function fetchFilterValues() {
  try {
    const response = await fetch("/api/products/filter_values");
    const filterValues = await response.json();
    return filterValues;
  } catch (error) {
    console.error("problem with fetching filter values", error);
  }
}

fetchFilterValues().then((values) => {
  const makes = values.make;
  const years = values.year;
  const models = values.model;
  const types = values.type;

  //
  const allFilter = document.getElementById("all-filters");
  const allModel = document.getElementById("all-model");
  const allMake = document.getElementById("all-make");
  const allYear = document.getElementById("all-year");

  // Clear existing filter items to avoid duplication
  allFilter.innerHTML = "";
  allModel.innerHTML = "";
  allMake.innerHTML = "";
  allYear.innerHTML = "";

  const checkAllFilter = new Set();
  const checkAllYear = new Set();
  const checkAllMake = new Set();
  const checkAllModel = new Set();

  //  make values
  makes.forEach((make) => {
    if (!checkAllMake.has(make)) {
      const make_li = document.createElement("li");
      make_li.innerHTML = `
        <a class="dropdown-item" href="" data-filter="make" data-value="${make}">${make}</a>
        `;
      allMake.appendChild(make_li);
      checkAllMake.add(make);
    }
  });

  // year values
  years.forEach((year) => {
    if (!checkAllYear.has(year)) {
      const year_li = document.createElement("li");
      year_li.innerHTML = `
        <a class="dropdown-item" href="" data-filter="year" data-value="${year}">${year}</a>
        `;
      allYear.appendChild(year_li);
      checkAllYear.add(year);
    }
  });

  models.forEach((model) => {
    if (!checkAllModel.has(model)) {
      const model_li = document.createElement("li");
      model_li.innerHTML = `
        <a class="dropdown-item" href="" data-filter="model" data-value="${model}">${model}</a>
        `;
      allModel.appendChild(model_li);
      checkAllModel.add(model);
    }
  });

  types.forEach((type) => {
    if (!checkAllFilter.has(type)) {
      const type_li = document.createElement("li");
      type_li.innerHTML = `
        <a class="dropdown-item" href="" data-filter="type" data-value="${type}">${type}</a>
        `;
      allFilter.appendChild(type_li);
      checkAllFilter.add(type);
    }
  });
  document.querySelectorAll(".dropdown-item").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const filterType = link.getAttribute("data-filter");
      const filterValue = link.getAttribute("data-value");
      const query = `?${filterType}=${filterValue}`;
      fetchAndDisplayProducts(query);
      console.log(query);
    });
  });
});
