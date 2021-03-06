function resetEventListeners() {
  var bookmarks = document.querySelectorAll('.bookmarkcontainer');
  console.log("starting bookmarks = ");
  console.log(bookmarks);

  var folders = document.querySelectorAll('.bookmarkfolder');

  var metaBookmarkContainer = document.querySelectorAll('#metaBookmarkContainer');

  [].forEach.call(bookmarks, function(bookmarks) {
    bookmarks.addEventListener('dragstart', bookmarkHandleDragStart, false);
    bookmarks.addEventListener('drop', bookmarkHandleDrop, false);
    bookmarks.addEventListener('dragend', bookmarkHandleDragEnd, false);
    bookmarks.addEventListener('dragover', bookmarkHandleDragOver, false);
    bookmarks.addEventListener('dragleave', bookmarkHandleDragLeave, false);
  });

  [].forEach.call(folders, function(folders) {
    folders.addEventListener('dragstart', folderHandleDragStart, false);
    folders.addEventListener('dragenter', folderHandleDragEnter, false);
    folders.addEventListener('dragover', folderHandleDragOver, false);
    folders.addEventListener('dragleave', folderHandleDragLeave, false);
    folders.addEventListener('drop', folderHandleDrop, false);
    folders.addEventListener('dragend', folderHandleDragEnd, false);
  });

  [].forEach.call(metaBookmarkContainer, function(metaBookmarkContainer) {
    metaBookmarkContainer.addEventListener('dragover', metaBookmarkContainerHandleDragOver, false);
    metaBookmarkContainer.addEventListener('drop', metaBookmarkContainerHandleDrop, false);
  });
}

//Bookmarks

function bookmarkHandleDragStart() {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';
  return false;
}

function bookmarkHandleDragEnd() {
  this.style.opacity = '1.0';
  return false;
}
  
function bookmarkHandleDrop() {
  this.style.opacity = '1.0';

  var draggedUrl = event.dataTransfer.getData("text/uri-list");
  var checkBookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
  var draggedOntoUrl = checkBookmarkArray[this.id].url;

  checkBookmarkKeysArray = getAllBookmarkKeys();
  var i = checkBookmarkKeysArray.length;

  var currentFolder = checkBookmarkArray[this.id].folder;

  for (var count = 0; count < i; count++) {
    var key = checkBookmarkKeysArray[count];

    if (checkBookmarkArray[key].url == draggedUrl) {
      console.log("checkBookmarkArray[key].folder before = "+checkBookmarkArray[key].folder);
      checkBookmarkArray[key].folder = "/test/";
      console.log("checkBookmarkArray[key].folder = "+checkBookmarkArray[key].folder);

      checkBookmarkArray[this.id].folder = "/test/";
      console.log("checkBookmarkArray[this.id].folder = "+checkBookmarkArray[this.id].folder);

      makeAFolder("/test/", currentFolder);
      localStorage.clear();
      pushToArray(checkBookmarkArray, checkBookmarkArray[key]);
      pushToArray(checkBookmarkArray, checkBookmarkArray[this.id]);

      console.log("Check at end of handle drop = "+checkBookmarkArray);

      refreshIdArray();

      return false;

    }
    else {
      //do nothing
    }
  }

  checkBookmarkArray[this.id].folder = "/test/";
  makeAFolder("/test/", currentFolder);
  refreshIdArray();
  return false;
}

function bookmarkHandleDragOver() {
  this.style.opacity = '0.4';
  return false;
}

function bookmarkHandleDragLeave() {
  this.style.opacity = '1.0';
  return false;
}

//Folders

function folderHandleDragStart() {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';
  return false;
}

function folderHandleDragEnter() {
  // this / e.target is the current hover target.
  this.classList.add('over');
  return false;
}

function folderHandleDragOver() {
  return false;
}

function folderHandleDragLeave() {
  this.classList.remove('over');  // this / e.target is previous target element.
  return false;
}

function folderHandleDragEnd() {
  this.style.opacity = '1.0';
  return false;
}
  
function folderHandleDrop() {
  return false;
}

//Body

function metaBookmarkContainerHandleDragOver() {
  event.preventDefault();
  return false;
}
  
function metaBookmarkContainerHandleDrop() {
  // this/e.target is current target element.

  var links = event.dataTransfer.getData("text/uri-list").split("\n");
  var i = links.length;

  for (var count = 0; count < i; count++) {
    dragInData(links[count]);
  }

  event.preventDefault();

  return false;
}