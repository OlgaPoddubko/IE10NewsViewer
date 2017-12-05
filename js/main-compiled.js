'use strict';

document.querySelectorAll('.resource').forEach(function (i) {
    return i.addEventListener("click", changeNews);
});
var apiKey = 'b33018277b5a4dc298a613609d54a1ea';

function getData() {
    var resourceID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bbc-news';

    var url = 'https://newsapi.org/v2/everything?sources=' + resourceID + '&apiKey=' + apiKey;
    var req = new Request(url);

    fetch(req, { mode: 'cors' }).then(function (response) {
        response.json().then(function (itemsData) {
            renderNews(itemsData);
        });
    }).catch(function (error) {
        console.warn(error);
    });
};

getData();

var resourceIDs = {
    'BBC': 'bbc-news',
    'CNN': 'cnn',
    'Fox': 'fox-news',
    'Reuters': 'reuters',
    'Time': 'time'
};

function changeNews(e) {

    var formerSelected = document.querySelector('.selected');
    formerSelected.classList.remove('selected');
    e.target.classList.add('selected');

    document.querySelector('.current-resource').innerHTML = e.target.innerHTML + ' news:';
    document.querySelector('.content').innerHTML = '';

    getData(resourceIDs[e.target.innerHTML]);
}

function convertDate(str) {
    var date = new Date(str);
    var day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    return day + '.' + month + '.' + date.getFullYear();
}

function renderNews(resp) {
    resp.articles.forEach(function (i) {
        return renderItem(i);
    });
};

function renderItem(itemData) {
    var contentDiv = document.querySelector('.content');

    var item = document.createElement('div');
    item.className = "item";
    contentDiv.appendChild(item);

    var imgDiv = document.createElement('div');
    imgDiv.className = "item-img";
    item.appendChild(imgDiv);

    var img = document.createElement('img');
    img.setAttribute('src', itemData.urlToImage);
    img.setAttribute('alt', '');
    imgDiv.appendChild(img);

    var info = document.createElement('div');
    info.className = "item-info";
    item.appendChild(info);

    var h3 = document.createElement('h3');
    info.appendChild(h3);

    var a = document.createElement('a');
    a.setAttribute('href', itemData.url);
    a.innerHTML = itemData.title;
    h3.appendChild(a);

    var span = document.createElement('span');
    span.className = "published-at";
    span.innerHTML = convertDate(itemData.publishedAt);
    info.appendChild(span);

    var p = document.createElement('p');
    p.className = "description";
    p.innerHTML = itemData.description;
    info.appendChild(p);
}
