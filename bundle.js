/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _getData = __webpack_require__(1);

	var _getData2 = _interopRequireDefault(_getData);

	var _changeNews = __webpack_require__(4);

	var _changeNews2 = _interopRequireDefault(_changeNews);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.querySelectorAll('.resource').forEach(function (i) {
	  return i.addEventListener("click", _changeNews2.default);
	});

	(0, _getData2.default)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getData;

	var _renderNews = __webpack_require__(2);

	var _renderNews2 = _interopRequireDefault(_renderNews);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var apiKey = 'b33018277b5a4dc298a613609d54a1ea';

	function getData() {
		var resourceID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bbc-news';

		var url = 'https://newsapi.org/v2/everything?sources=' + resourceID + '&apiKey=' + apiKey;
		var req = new Request(url);

		fetch(req, { mode: 'cors' }).then(function (response) {
			response.json().then(function (itemsData) {
				(0, _renderNews2.default)(itemsData);
			});
		}).catch(function (error) {
			console.warn(error);
		});
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = renderNews;

	var _convertDate = __webpack_require__(3);

	var _convertDate2 = _interopRequireDefault(_convertDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    span.innerHTML = (0, _convertDate2.default)(itemData.publishedAt);
	    info.appendChild(span);

	    var p = document.createElement('p');
	    p.className = "description";
	    p.innerHTML = itemData.description;
	    info.appendChild(p);
	}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = convertDate;
	function convertDate(str) {
	  var date = new Date(str);
	  var day = date.getDate();
	  if (day < 10) {
	    day = "0" + day;
	  }
	  var month = date.getMonth() + 1;
	  if (month < 10) {
	    month = "0" + month;
	  }

	  return day + "." + month + "." + date.getFullYear();
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = changeNews;

	var _getData = __webpack_require__(1);

	var _getData2 = _interopRequireDefault(_getData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	  (0, _getData2.default)(resourceIDs[e.target.innerHTML]);
	}

/***/ })
/******/ ]);