document.querySelectorAll('.resource').forEach( (i) => i.addEventListener("click", changeNews) );
const apiKey = 'b33018277b5a4dc298a613609d54a1ea';

function getData(resourceID = 'bbc-news') {
	let url = `https://newsapi.org/v2/everything?sources=${resourceID}&apiKey=${apiKey}`;
	let req = new Request(url);

	fetch(req, {mode: 'cors'})
	    .then( response => {
	        response.json()
	        	.then( itemsData => {
              renderNews(itemsData);
          });
	    })
	  	.catch((error) => {
    		console.warn(error);
		});
};


getData();

const resourceIDs = {
	'BBC': 'bbc-news',
	'CNN': 'cnn',
	'Fox': 'fox-news',
	'Reuters': 'reuters',
	'Time': 'time',
};

function changeNews(e) {

  let formerSelected = document.querySelector('.selected');
  formerSelected.classList.remove('selected');
  e.target.classList.add('selected');

  document.querySelector('.current-resource').innerHTML = `${e.target.innerHTML} news:`;
  document.querySelector('.content').innerHTML = ``;

  getData(resourceIDs[e.target.innerHTML]);
}

function convertDate(str) {
	let date = new Date(str);
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}.${month}.${date.getFullYear()}`;
}

function renderNews(resp) {
	resp.articles.forEach( i => renderItem (i));
};

function renderItem (itemData) {
	let contentDiv = document.querySelector('.content');

	  let item = document.createElement('div');
    item.className = "item";
    contentDiv.appendChild(item);

	  let imgDiv = document.createElement('div');
    imgDiv.className = "item-img";
    item.appendChild(imgDiv);

    let img = document.createElement('img');
    img.setAttribute('src', itemData.urlToImage);
    img.setAttribute('alt', '');
    imgDiv.appendChild(img);

    let info = document.createElement('div');
    info.className = "item-info";
    item.appendChild(info);

    let h3 = document.createElement('h3');
    info.appendChild(h3);

    let a = document.createElement('a');
    a.setAttribute('href', itemData.url);
    a.innerHTML = itemData.title;
    h3.appendChild(a);

    let span = document.createElement('span');
    span.className = "published-at";
    span.innerHTML = convertDate(itemData.publishedAt);
    info.appendChild(span);

    let p = document.createElement('p');
    p.className = "description";
    p.innerHTML = itemData.description;
    info.appendChild(p);

}
