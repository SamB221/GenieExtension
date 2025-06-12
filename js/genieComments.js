document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const elem = document.getElementById("hld_main_cirBorrowers_hld_borrowerInfo");

    if (elem) {
        const text = elem.innerHTML.split("Comments:")
        if (text.length > 1) {
            applySheet(text[1]);
        }

        const dueDates = document.getElementsByClassName("lc-ft-datetime");
        if (dueDates) {
            for (let i = 0; i < dueDates.length; i++) {
                checkDueDate(dueDates[i]);
            }
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

function checkDueDate(element) {
    var dateElement = element.querySelector('.ViewControl span');
    if (!dateElement || !dateElement.innerHTML.trim()) return;

    var dateText = dateElement.innerHTML.split(' ')[0];
    var parts = dateText.split('/');
    if (parts.length == 3) {
        var dueDate = new Date(parts[2], parts[0] - 1, parts[1]);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // ensures items on same day not marked late
        if (currentDate > dueDate) {
            dateElement.style.color = "red";
        }
    }
}