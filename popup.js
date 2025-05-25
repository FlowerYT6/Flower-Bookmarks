document.getElementById("fp").addEventListener("click", () => {
  window.open('popup.html', '_blank');
});

document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("urlInput");
    const addBtn = document.getElementById("addBtn");
    const urlList = document.getElementById("urlList");

    function loadUrls() {
        chrome.storage.sync.get(["savedUrls"], function (data) {
            urlList.innerHTML = "";
            const urls = data.savedUrls || [];

            urls.forEach((url, index) => {
                const li = document.createElement("li");
                li.textContent = url;
                
                // Delete Button
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Remove";
                deleteBtn.addEventListener("click", function () {
                    urls.splice(index, 1);
                    chrome.storage.sync.set({ savedUrls: urls }, loadUrls);
                });

                li.appendChild(deleteBtn);
                urlList.appendChild(li);
            });
        });
    }

    addBtn.addEventListener("click", function () {
        const newUrl = urlInput.value.trim();
        if (newUrl) {
            chrome.storage.sync.get(["savedUrls"], function (data) {
                const urls = data.savedUrls || [];
                urls.push(newUrl);
                chrome.storage.sync.set({ savedUrls: urls }, () => {
                    urlInput.value = "";
                    loadUrls();
                });
            });
        }
    });

    loadUrls();
});
