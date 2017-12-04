import convertDate from './convertDate';

export default function renderNews(resp) {
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
