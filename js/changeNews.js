import getData from './getData';

const resourceIDs = {
	'BBC': 'bbc-news',
	'CNN': 'cnn',
	'Fox': 'fox-news',
	'Reuters': 'reuters',
	'Time': 'time',
};

export default function changeNews(e) {

  let formerSelected = document.querySelector('.selected');
  formerSelected.classList.remove('selected');
  e.target.classList.add('selected');

  document.querySelector('.current-resource').innerHTML = `${e.target.innerHTML} news:`;
  document.querySelector('.content').innerHTML = ``;

  getData(resourceIDs[e.target.innerHTML]);
}
