const sections = document.getElementById("sections")
const categories = [
    "arts", "automobiles", "books", "business", "fashion",
    "food", "health", "home", "insider", "magazine",
    "movies", "nyregion", "obituaries", "opinion", "politics",
    "realestate", "science", "sundayreview", "technology", "theater",
    "t-magazine", "travel", "upshot", "us", "world"
]

const KEY = "gg4o4fPysU10MQik7zMnN7FzGn9kGLqk"
function addSections(){
    categories.forEach(category => {
        const SECTION = document.createElement("section")
        SECTION.classList.add("sections__section")

        SECTION.innerHTML =
        `
            <header class="sectionHeader" style="user-select: none; z-index: 99">
                <div class="sectionHeader__title">
                    <span class="material-symbols-outlined">
                        square
                    </span>
                    <h2>
                       ${category}
                    </h2>
                </div>
                <span class="material-symbols-outlined sectionHeader__arrow">
                    chevron_right
                </span>
            </header>            
        `

        let requestHasBeenMade = false



        SECTION.addEventListener("click", async function(section){
            if (!event.target.classList.contains("sectionHeader") && !event.target.closest(".sectionHeader")) {
                return;
            }
            const span = SECTION.querySelector(".sectionHeader__arrow")
            span.innerText = span.innerText === "chevron_right" ? "expand_more" : "chevron_right"

            if(span.innerText == "expand_more"){

                if(requestHasBeenMade === false){
                    const request = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${KEY}`)
                    const data = await request.json()

                    data.results.forEach((result, index) => {


                        setTimeout(() => {
                            SECTION.innerHTML += `
                                   <article style=" " class="removeScrollbar">
                                       <div style="">
                                           <div style="">
                                               <img src="${result.multimedia[2].url}">
                                               <h2>${result.title}</h2> 
                                           </div> 
                                           <button class="material-symbols-outlined">bottom_drawer</button>                          
                                        </div>
                                   </article>
                            `
                        }, 10 * index)
                    })
                    requestHasBeenMade = true
                } else{
                    let i = 2;
                    let delayMultiplier = 0;

                    while (i <= SECTION.childElementCount) {
                        (function (index) {
                            setTimeout(() => {
                                SECTION.children[index].style.display = "block";
                            }, 2 * delayMultiplier);
                        })(i - 1);

                        i++;
                        delayMultiplier
                }}
            }


             else {
                let i = SECTION.childElementCount;
                let delayMultiplier = 0;

                while (i > 1) {
                    (function (index) {
                        setTimeout(() => {
                            SECTION.children[index].style.display = "none"
                        }, 10 * delayMultiplier);
                    })(i - 1); // -1 because arrays start at 0

                    i--;
                    delayMultiplier++;
                }
            }



        })

        sections.appendChild(SECTION)
    })

    function removeAndAddToLocalStorage(){
        console.log("hej")
    }
}

addSections()