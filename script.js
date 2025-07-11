const buttonEl = document.getElementById('search-button');
const formEl = document.getElementById('form')
const inputEl = document.getElementById('input');
const resultsEl = document.getElementById('results');
const loadMoreEl = document.getElementById('load-more');

let page = 1;

formEl.addEventListener('submit', (event) => {
    page = 1;
    event.preventDefault()
    fetchImages();
})

loadMoreEl.addEventListener('click', () => {
    page++;
    fetchImages();
})

async function fetchImages() {
    const token = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${token}`

    if(!inputData.trim().length) {
        alert("Please add the search term");
        return; // exit from the function
    }

    try {
        const fetched = await fetch(url);
        const data = await fetched.json();

        console.log(data)

        if (page == 1) {
            resultsEl.innerHTML = ""
        }

        const items = data.results;

        for (let i = 0; i < items.length; i++) {
            const imgUrl = items[i].urls.regular;
            const description = items[i].alt_description;
            const originUrl = items[i].links.html;

            const resultItemEl = document.createElement('div');
            resultItemEl.classList.add('result-item');

            const imgEl = document.createElement('img');
            imgEl.classList.add('image')
            imgEl.setAttribute('src', imgUrl)

            const aEl = document.createElement('a');
            aEl.classList.add('description');
            aEl.innerText = description;
            aEl.setAttribute('href', originUrl)
            aEl.setAttribute('target', '_blank')

            resultItemEl.append(imgEl);
            resultItemEl.append(aEl);

            resultsEl.append(resultItemEl)
        }

        if (items.length > 0 || !data.total_page == page) {
            loadMoreEl.style.display = "block"
        } else {
            loadMoreEl.style.display = "none"
        }
    } catch (error) {
        alert("Sorry something went wrong")
    }
}