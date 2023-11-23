(function(){
    if(!window.location.pathname.includes("archive.html")) return

    const container = document.getElementById("sections")

    const localStorageData = JSON.parse(localStorage.getItem('articleUrls')) || [];

    let categories = []

    function removeFromLocalStorage(articleTitle, element) {
        localStorageData.forEach((data, index) => {
            if (data.title === articleTitle) {
                localStorageData.splice(index, 1);
                localStorage.setItem('articleUrls', JSON.stringify(localStorageData));
                element.remove()
            }
        });
    }
    function toggleSectionContent(section, show) {
        section.style.display = show ? "block" : "none";
    }

    function createArticles(section, category){
        let articles = localStorageData.filter(article => article.category === category)
        articles.forEach(article => {
            const ARTICLE = document.createElement("article")
            ARTICLE.innerHTML = `<article class="section_article">
        <div>
            <div>
                <img src="${article.image}">
                <h2>${article.title}</h2>
            </div>
            <button class="material-symbols-outlined" style="background: red">delete</button>
        </div>
    </article>`

            ARTICLE.querySelector("button").addEventListener("click", function(){
                const isConfirmed = confirm(`Are you sure you want to delete "${article.title}"?`);
                if(isConfirmed){
                    removeFromLocalStorage(article.title, ARTICLE)

                }
            })

            section.append(ARTICLE)


        })
    }

    function removeArticles(section){
        Array.from(section.children).forEach(child => {
            if(child.tagName === "ARTICLE"){
                child.remove()
            }
        })
    }

    localStorageData.forEach(article => {
        if(!categories.includes(article.category)){
            categories.push(article.category)
            const SECTION = document.createElement("section");
            SECTION.classList.add("sections__section");

            SECTION.innerHTML = `
          <header class="sectionHeader" style="user-select: none; z-index: 99">
            <div class="sectionHeader__title">
              <span class="material-symbols-outlined">square</span>
              <h2>${article.category}</h2>
            </div>
            <span class="material-symbols-outlined sectionHeader__arrow">chevron_right</span>
          </header>`;


            let hasBeenClicked = false;
            SECTION.addEventListener("click", function(event){
                if (!event.target.classList.contains("sectionHeader") && !event.target.closest(".sectionHeader")) {
                    return;
                }

                const span = SECTION.querySelector(".sectionHeader__arrow");
                span.innerText = span.innerText === "chevron_right" ? "expand_more" : "chevron_right";


                if(span.innerText === "expand_more"){
                    createArticles(SECTION, article.category)
                } else {
                    removeArticles(SECTION)
                }
            })

            container.appendChild(SECTION)

        }
    })
})()