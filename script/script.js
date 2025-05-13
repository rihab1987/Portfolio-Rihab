// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {  // On définit une fonction nommée handleNavbarScroll.
    const header = document.querySelector(".navbar"); // On sélectionne l’élément avec la classe .navbar → il sera affecté par les styles.
    window.onscroll = function () { //  À chaque scroll de la page, on exécute une fonction.
        const top = window.scrollY; // On stocke la distance verticale en pixels depuis le haut de la page.
        if (top >= 100) { // Si la distance est supérieure ou égale à 100 pixels, on ajoute la classe .navbarDark.
            header.classList.add("navbarDark"); // ..alors on ajoute la classe navbarDark → fond coloré via CSS.
        } else {
            header.classList.remove("navbarDark"); //  Sinon, on retire cette classe pour revenir au style initial.
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() { // On définit une fonction nommée handleNavbarCollapse.
    const navLinks = document.querySelectorAll(".nav-item"); // On sélectionne tous les éléments avec la classe .nav-item → ce sont les liens de la navbar.
    const menuToggle = document.getElementById("navbarSupportedContent"); //  On sélectionne le bloc qui s’ouvre/se ferme (le menu burger).

    navLinks.forEach((link) => {  // Pour chaque lien du menu, quand on clique  On cree une instance Bootstrap de collapse Et on ferme le menu     
        
        link.addEventListener("click", () => { 
            new bootstrap.Collapse(menuToggle).toggle(); 
        });
    });
}

// Function to dynamically create HTML elements from the JSON file (Skills) // Fonction pour afficher les compétences depuis le fichier skills.json
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container"); //  On sélectionne le conteneur dans la section #skills.
    let row = document.createElement("div");
    row.classList.add("row", "align-items-stretch"); // On crée une ligne Bootstrap pour afficher les cartes sur une même ligne.

    fetch("data/skills.json") //  On récupère le fichier JSON.
        .then((response) => response.json()) //  On le transforme en objet JavaScript.
        .then((data) => {
            data.forEach((item) => { // On parcourt chaque objet item du tableau.
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4"); // On crée une colonne pour chaque carte compétence.
                card.innerHTML = ` 
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.alt}" loading="lazy" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>  
                        </div>
                    </div> 
                `; // On construit le HTML de la carte avec l’image, le titre, le texte.
                row.appendChild(card); // On ajoute la carte à la ligne.
            });
            container.appendChild(row); //On insère la ligne complète dans le container .skills.
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
                            <div class="card-image-wrapper">
                                <img src="images/${item.image}" alt="${item.alt}" loading="lazy" />
                            </div>
                            <h3 class="card-title mt-3">${item.title}</h3>
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
const sectionTitles = document.querySelectorAll('#about h2, #skills h2, #portfolio h2, #contact h2'); // On sélectionne tous les <h2> à animer.

const revealOnScroll = () => {  //  Fonction qui ajoute une animation de "révélation" si le titre est visible à l’écran.
    sectionTitles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            title.classList.add('visible');
        }
    });
};
// On déclenche cette animation au chargement et au scroll.
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Call the functions to execute the code //  Ces fonctions sont appelées dès que la page est chargée, pour que tout fonctionne automatiquement.
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
