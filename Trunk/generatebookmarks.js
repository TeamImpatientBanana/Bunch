window.load function onLoad() {
 refreshIDArray();
}

function refreshIdArray() {
	var allBookmarksKeysArray[] = getAllBookmarkKeys();

	var currentFolderOrder = "orderByKey";

	loadPage(allBookmarksArrayOfKeys[], currentFolderOrder);
}

function getAllBookmarkKeys() {
	var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));
	bookmarksKeysArray = Object.keys(bookmarksArray);
	console.log(bookmarksKeysArray);
}

function loadPage(allBookmarksArrayOfKeys[], currentFolderOrder); {

	var codeOfBookmarksOnPage = "";

	if("orderByKey"); {
		//do nothing
	}
	else if("alphabetical") {
		//putThe allBookmarksArrayofIDs[] array in aphabetical order();
	}
	else if("revaphabetical") {
		//putThe allBookmarksArrayofIDs[] array in revaphabetical order();
	}

	foreach (allBookmarksArrayOfKeys[] as key) {
		codeOfBookmarksOnPage += makeABookmark(key);
	}

	document.getElementById('metaBookmarkContainer').innerHTML = codeOfBookmarksOnPage;
}

function makeABookmark (key) {

	var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));

	var name = bookmarksArray[key].name;
	var icon = bookmarksArray[key].icon;
	var url =  bookmarksArray[key].url;
	var annotation = bookmarksArray[key].annotation;

	result = "
	<div class='pure-u-1-3 pure-u-sm-1-6 pure-u-md-1-8 pure-u-lg-1-12 pure-u-xl-1-24 bookmarkcontainer "+key+"' draggable='true'>
      <img draggable='false' class='bookmarkicon' src='"+icon+"'>
      <div class='bookmarkname'>"+annotation+"</div>
    </div>
    ";

    return result;
}