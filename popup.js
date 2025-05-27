const input = document.getElementById("urlInput");
const list = document.getElementById("bookmarkList");
const addBtn = document.getElementById("addBtn");

function loadBookmarks() {
  const stored = localStorage.getItem("bookmarks");
  return stored ? JSON.parse(stored) : [];
}

function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function displayBookmarks(bookmarks) {
  list.innerHTML = "";
  bookmarks.forEach(url => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url.startsWith("http") ? url : "https://" + url;
    a.textContent = url;
    a.target = "_blank";
    li.appendChild(a);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const url = input.value.trim();
  if (!url) return;
  const bookmarks = loadBookmarks();
  bookmarks.push(url);
  saveBookmarks(bookmarks);
  displayBookmarks(bookmarks);
  input.value = "";
});

// Initialize
displayBookmarks(loadBookmarks());


document.getElementById("fp").addEventListener("click", () => {
  window.open('popup.html', '_blank');
});
