function refreshIdArray() {
	var allBookmarksKeysArray = [];
	allBookmarksKeysArray = getAllBookmarkKeys();

	var currentFolderOrder = "orderByKey";
	var currentFolder = "/";

	loadPage(allBookmarksKeysArray, currentFolderOrder, currentFolder);
	console.log("refreshIdArray = ");
	console.log(JSON.parse(localStorage.getItem('bookmarks')));
}

function getAllBookmarkKeys() {
	var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksKeysArray = Object.keys(bookmarksArray);

	return bookmarksKeysArray;
}

function loadPage(allBookmarksKeysArray, currentFolderOrder, currentFolder) {

	var codeOfBookmarksOnPage = "";

	switch(currentFolderOrder) {

		case "orderByKey":
			break;

		case "orderByAlphabetical":
			break;

		case "orderByReAlphabetical":
			break;
	}

	if (allBookmarksKeysArray) {

		var i = allBookmarksKeysArray.length;

		var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));

		for (var count = 0; count < i; count++) {
			var key = allBookmarksKeysArray[count];
			if (currentFolder == bookmarksArray[key].folder) {
				codeOfBookmarksOnPage += makeABookmark(key);
			}
			else {
				//do nothing because those bookmarks arent in this folder
			}
		}
	}
	document.getElementById("metaBookmarkContainer").innerHTML = codeOfBookmarksOnPage;
}

function makeABookmark(key) {

	var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));

	var name = bookmarksArray[key].name;
	var icon = bookmarksArray[key].icon;
	var url =  bookmarksArray[key].url;
	var annotation = bookmarksArray[key].annotation;

	
	var singleBookmarkHTML = "<div draggable='true' class='pure-u-1-3 pure-u-sm-1-6 pure-u-md-1-8 pure-u-lg-1-12 pure-u-xl-1-24 bookmarkcontainer' id='"+key+"' draggable='true'><a target='_blank' href='"+url+"' title='"+name+"'><img draggable='false' class='bookmarkicon' src='"+icon+"'></a><div class='bookmarkname'>"+annotation+"</div></div>";

    return singleBookmarkHTML;
}

function makeAFolder(path, currentPath) {
	console.log("Entered make a folder");

	// define bookmark object
	var bookmark = {};

	bookmark.name = path;
	bookmark.url = "";
	bookmark.annotation = path;
	bookmark.icon = "BFolder.svg";
	bookmark.folder = currentPath;

	// get the array from local storage to check it
	var checkBookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));

	// bookmarkArray[] needs to be defined here too
	var bookmarkArray = [];

	// different parameters for different local storage lengths
	pushToArray(bookmarkArray, bookmark);
	refreshIdArray();

}

function storeBookmark() {
	// check for browser's local storage support using Modernizr
	if (Modernizr.localstorage) {

		// the array used to push to local storage
		var bookmarkArray = [];
		// creat new bookmark to push from bookmarkData()
		var newBookmark = bookmarkData();

		// If they have nothing in storage, run this
		pushToArray(bookmarkArray, newBookmark);
		refreshIdArray();
	}
	else {
		// if the browser doesn't support it, send an alert
		alert('Cannot store user preferences as your browser do not support local storage');
	}
}

function bookmarkData() {
	// define bookmark object
	var bookmark = {};

	bookmark.name = document.getElementById('bookmarkName').value;
	bookmark.url = document.getElementById('bookmarkURL').value;
	bookmark.annotation = document.getElementById('bookmarkAnnotation').value;
	bookmark.icon = "BIcon.svg";
	bookmark.folder = "/";

	return bookmark;
}

function dragInData(linkOrText) {
	// define bookmark object
	var bookmark = {};

	bookmark.name = linkOrText;
	bookmark.url = linkOrText;
	bookmark.annotation = linkOrText;
	bookmark.icon = "BIcon.svg";
	bookmark.folder = "/";

	// get the array from local storage to check it
	var checkBookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));

	var i = checkBookmarkArray.length;

	for (var count = 0; count < i; count++) {
		if (bookmark.url == checkBookmarkArray[count].url) {
			return false;
		}
		else {
			// do nothing
		}
	}

	// bookmarkArray[] needs to be defined here too
	var bookmarkArray = [];

	// different parameters for different local storage lengths
	pushToArray(bookmarkArray, bookmark);
	refreshIdArray();
}

function pushToArray(bookmarkArray, newBookmark) {
	// If they have nothing in storage, run this
    if (localStorage.length === 0) {
    	bookmarkArray.push(newBookmark);
    	localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    }
    else {
    	// get the bookmark array
	    bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
	    // Push the new data (whether it be an object or anything else) onto the array
	    bookmarkArray.push(newBookmark);
	    // Re-serialize the array back into a string and store it in localStorage
	    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
	}
}
/*
function Update(keyValue, newKey, newValue) {
	keyValue.Key = newKey;
	keyValue.Value = newValue; 
}
*/