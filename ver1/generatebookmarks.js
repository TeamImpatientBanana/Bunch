function refreshIdArray() {
	var allBookmarksKeysArray = [];
	allBookmarksKeysArray = getAllBookmarkKeys();

	var currentFolderOrder = "orderByKey";

	loadPage(allBookmarksKeysArray, currentFolderOrder);
}

function getAllBookmarkKeys() {
	var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksKeysArray = Object.keys(bookmarksArray);
	console.log(bookmarksKeysArray);

	return bookmarksKeysArray;
}

function loadPage(allBookmarksKeysArray, currentFolderOrder) {

	var codeOfBookmarksOnPage = "";

	switch(currentFolderOrder) {

		case "orderByKey":
			break;

		case "orderByAlphabetical":
			break;

		case "orderByReAlphabetical":
			break;
	}

	if(allBookmarksKeysArray) {
	var i = allBookmarksKeysArray.length;
		for (var count = 0; count < i; ++count) {
			var key = allBookmarksKeysArray[count];
			codeOfBookmarksOnPage += makeABookmark(key);
		}
	}

	//console.log("codeOfBookmarksOnPage = "+codeOfBookmarksOnPage);

	document.getElementById("metaBookmarkContainer").innerHTML = codeOfBookmarksOnPage;
}

function makeABookmark(key) {

	var bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));

	var name = bookmarksArray[key].name;
	var icon = bookmarksArray[key].icon;
	var url =  bookmarksArray[key].url;
	var annotation = bookmarksArray[key].annotation;

	
	var singleBookmarkHTML = "<div draggable='true' class='pure-u-1-3 pure-u-sm-1-6 pure-u-md-1-8 pure-u-lg-1-12 pure-u-xl-1-24 bookmarkcontainer "+key+"' draggable='true'><a target='_blank' href='"+url+"' title='"+name+"'><img draggable='false' class='bookmarkicon' src='"+icon+"'></a><div class='bookmarkname'>"+annotation+"</div></div>";

    return singleBookmarkHTML;
}

function storeBookmark() {
	// check for browser's local storage support using Modernizr
	if (Modernizr.localstorage) {
		/*
		if (localStorage.length = 0) {
			var bookmarkArray = [];
			var newBookmark = bookmarkData();
			localStorage.setItem('newBookmark', JSON.stringify(bookmarkArray));
		}
		*/
		// The array we use to store the bookmarks
		var bookmarkArray = [];
		//console.log(bookmarkArray);
		// The new bookmark to be pushed to the array
		var newBookmark = bookmarkData();
		// If they have nothing in storage, run this
	    if (localStorage.length === 0) {
	    	bookmarkArray.push(newBookmark);
	    	localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));

	    }
	    else {
	    	// get the bookmark array
		    bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
		    console.log(bookmarkArray);

		    // Push the new data (whether it be an object or anything else) onto the array
		    bookmarkArray.push(newBookmark);

		    
		    // Re-serialize the array back into a string and store it in localStorage
		    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
			// parse the object from local storage as JSON then console log it
			console.log(JSON.parse(localStorage.getItem('bookmarks')));
		}
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
	//bookmark.id = (new Date()).getTime();
	bookmark.name = document.getElementById('bookmarkName').value;
	bookmark.url = document.getElementById('bookmarkURL').value;
	bookmark.annotation = document.getElementById('bookmarkAnnotation').value;
	bookmark.icon = "pinkieicon.png";
	//bookmark.folder = "/";

	// tags will be in an array
	//bookmark.tags = ["search", "google"];

	console.log(bookmark);

	return bookmark;
}

function dragInData(linkOrText) {
	// define bookmark object
	var bookmark = {};
	//bookmark.id = (new Date()).getTime();
	bookmark.name = linkOrText;
	bookmark.url = linkOrText;
	bookmark.annotation = linkOrText;
	bookmark.icon = "pinkieicon.png";
	//bookmark.folder = "/";

	// tags will be in an array
	//bookmark.tags = ["search", "google"];

<<<<<<< HEAD
	console.log("bookmark = "+bookmark);
=======
	console.log(bookmark);
	bookmarkArray.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
>>>>>>> origin/master

	refreshIdArray();

	return bookmark;
}