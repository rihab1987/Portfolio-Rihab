// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file (Skills)
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row", "align-items-stretch");

    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.alt}" loading="lazy" />
                            <h4 class="card-title mt-3">${item.title}</h4>
                            <p class="card-text mt-3">${item.text}</p>  
                        </div>
                    </div>
                `;
                row.appendChild(card);
            });
            container.appendChild(row);
        });
}

// Function to dynamically create HTML elements from the JSON file (Portfolio)
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row", "align-items-stretch");

    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                        <div class="card-body">
                            <div class="card-image">
                                <img src="images/${item.image}" alt="${item.alt}" loading="lazy" />
                            </div>
                            <h4 class="card-title mt-3">${item.title}</h4>
                            <p class="card-text mt-3">${item.text}</p>
                            <div class="text-center mt-3">
                                <a href="${item.link}" class="btn btn-success">Lien</a>
                            </div>
                        </div>
                    </div>
                `;
                row.appendChild(card);
            });
            container.appendChild(row);
        });
}

// Animation on scroll for section titles
const sectionTitles = document.querySelectorAll('#about h2, #skills h2, #portfolio h2, #contact h2');

const revealOnScroll = () => {
    sectionTitles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            title.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
