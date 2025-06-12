document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const elem = document.getElementById("hld_main_cirBorrowers_hld_borrowerInfo");

    if (elem) {
        const text = elem.innerHTML.split("Comments:")
        if (text.length > 1) {
            applySheet(text[1]);
        }
    }
}

function applySheet(text) {
    if (!document.getElementById("highlightedcommentextension")) {
        try {
            var link = document.createElement("link");
            link.href = chrome.runtime.getURL('css/comment.css');
            link.id = "highlightedcommentextension";
            link.type = "text/css";
            link.rel = "stylesheet";
            document.getElementsByTagName("html")[0].appendChild(link);
        } catch (e) {
            console.error("Error loading CSS: ", e);
        }
    }

    var element = document.getElementById("hld_main_cirBorrowers_hld_borrowerInfo");
    if (element) element.style.setProperty('--after-content', `"Comment: ${text}"`);
}