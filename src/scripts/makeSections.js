const sections = document.getElementById("sections");
const categories = [
    "arts", "automobiles", "books", "business", "fashion",
    "food", "health", "home", "insider", "magazine",
    "movies", "nyregion", "obituaries", "opinion", "politics",
    "realestate", "science", "sundayreview", "technology", "theater",
    "t-magazine", "travel", "upshot", "us", "world"
];

const KEY = "gg4o4fPysU10MQik7zMnN7FzGn9kGLqk";


async function fetchData(category) {
    const request = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${KEY}`);
    const data = await request.json();
    return data.results;
}

function createArticle(result) {
    const ARTICLE = document.createElement("article")
    ARTICLE.innerHTML = `<article class="removeScrollbar">
        <div>
            <div>
                <img src="${result.multimedia[2].url}">
                    <h2>${result.title}</h2>
            </div>
            <button class="material-symbols-outlined identifier">bottom_drawer</button>
        </div>
    </article>`




    return ARTICLE.innerHTML
}

function saveToArchive(title) {
    console.log(`Adding "${title}" to archive`);
}

function toggleSectionContent(section, show) {
    section.style.display = show ? "block" : "none";
}

function addSections() {
    categories.forEach(async category => {
        const SECTION = document.createElement("section");
        SECTION.classList.add("sections__section");

        SECTION.innerHTML = `
      <header class="sectionHeader" style="user-select: none; z-index: 99">
        <div class="sectionHeader__title">
          <span class="material-symbols-outlined">square</span>
          <h2>${category}</h2>
        </div>
        <span class="material-symbols-outlined sectionHeader__arrow">chevron_right</span>
      </header>`;

        let requestHasBeenMade = false;

        SECTION.addEventListener("click", async function () {
            if (!event.target.classList.contains("sectionHeader") && !event.target.closest(".sectionHeader")) {
                return;
            }

            const span = SECTION.querySelector(".sectionHeader__arrow");
            span.innerText = span.innerText === "chevron_right" ? "expand_more" : "chevron_right";

            if (span.innerText === "expand_more") {
                if (!requestHasBeenMade) {
                    const results = await fetchData(category);
                    results.forEach((result, index) => {
                        setTimeout(() => {
                            SECTION.innerHTML += createArticle(result);
                        }, 10 * index);
                    });
                    requestHasBeenMade = true;
                } else {
                    for (let i = 2; i <= SECTION.childElementCount; i++) {
                        setTimeout(() => {
                            toggleSectionContent(SECTION.children[i - 1], true);
                        }, 2 * (i - 1));
                    }
                }
            } else {
                for (let i = SECTION.childElementCount; i > 1; i--) {
                    setTimeout(() => {
                        toggleSectionContent(SECTION.children[i - 1], false);
                    }, 10 * (i - 1));
                }
            }
        });

        sections.appendChild(SECTION);
    });
}

addSections();
