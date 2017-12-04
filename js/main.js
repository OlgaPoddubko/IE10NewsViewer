import getData from './getData';
import changeNews from './changeNews';

document.querySelectorAll('.resource').forEach( (i) => i.addEventListener("click", changeNews) );

getData();
