//var bookmarks = document.getElementsByClassName('bookmarkcontainer');

var bookmarks = document.querySelectorAll('.bookmarkcontainer');

var folders = document.querySelectorAll('.bookmarkfolder');

[].forEach.call(bookmarks, function(bookmarks) {
  bookmarks.addEventListener('dragstart', bookmarkHandleDragStart, false);
  bookmarks.addEventListener('drop', bookmarkHandleDrop, false);
  bookmarks.addEventListener('dragend', bookmarkHandleDragEnd, false);
});

[].forEach.call(folders, function(folders) {
  folders.addEventListener('dragstart', folderHandleDragStart, false);
  folders.addEventListener('dragenter', folderHandleDragEnter, false);
  folders.addEventListener('dragover', folderHandleDragOver, false);
  folders.addEventListener('dragleave', folderHandleDragLeave, false);
  folders.addEventListener('drop', folderHandleDrop, false);
  folders.addEventListener('dragend', folderHandleDragEnd, false);
});


//Bookmarks

var dragSrcEl = null;

function bookmarkHandleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  if (this.classList.contains("bookmarkscontainer")) {
    dragSrcEl = this;
  }

  e.dataTransfer.effectAllowed = 'move';
  //e.dataTransfer.setData('text/html', this.innerHTML);
}

function bookmarkHandleDragEnd(e) {
  // this/e.target is the source node.
  this.style.opacity = '1.0';

  [].forEach.call(folders, function (folders) {
    folders.classList.remove('over');
  });
}
  
function bookmarkHandleDrop(e) {
  // this/e.target is current target element.
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

//Folders

var dragSrcEl = null;

function folderHandleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  if (this.classList.contains("bookmarkscontainer")) {
    dragSrcEl = this;
  }

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function folderHandleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function folderHandleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function folderHandleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function folderHandleDragEnd(e) {
  // this/e.target is the source node.
  this.style.opacity = '1.0';

  [].forEach.call(bookmarks, function (bookmarks) {
    bookmarks.classList.remove('over');
  });
}
  
function folderHandleDrop(e) {
  // this/e.target is current target element.
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}