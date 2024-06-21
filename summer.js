const apikey = `94b5b4e2cffb4b4395f63fa3dfa4d6ec`;
const search = document.getElementById("input");
const submit = document.querySelector(".btn");
const container = document.querySelector(".main");

async function fetchData() {
    try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apikey}`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data.articles;
    } catch (err) {
        console.log(err);
        return [];
    }
}

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    const query = search.value.trim();
    if (query) {
        try {
            const articles = await fetchNewsData(query);
            displayDatas(articles);
        } catch (err) {
            console.log(err);
        }
    }
});

function displayDatas(articles) {
    container.innerHTML = "";
    if (!articles || articles.length === 0) {
        container.innerHTML = "<p>No articles found</p>";
        return;
    }
    articles.forEach((article) => {
        if (article.urlToImage) {
            const div = document.createElement("div");
            div.classList.add("card");

            let image = document.createElement("img");
            image.src = article.urlToImage;
            image.alt = article.title;

            const title = document.createElement("h2");
            const description = document.createElement("p");

            const shrink = article.title.length > 38 ? article.title.slice(0, 38) + "...." : article.title;
            title.textContent = shrink;

            const descriptionSlice = article.description && article.description.length > 100 ? article.description.slice(0, 100) + "...." : article.description;
            description.textContent = descriptionSlice;

            div.appendChild(image);
            div.appendChild(title);
            div.appendChild(description);

            div.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            container.append(div);
        }
    });
}

(async () => {
    try {
        const articles = await fetchData();
        displayDatas(articles);
    } catch (err) {
        console.error(err);
    }
})();

async function fetchNewsData(query) {
    try {
        let url = `https://newsapi.org/v2/everything?q=${query}&pageSize=30&apiKey=${apikey}`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data.articles;
    } catch (err) {
        console.log(err);
        return [];
    }
}
