/*
Autosave feature for the gijoe repo. For now I'm gonna make use of the localStorage function
before I understand where the data will be going. I assume that there will be a database
somewhere that we can use in order.
*/

setInterval(autosave, 2000);
var codeArea = document.getElementById("textareacode");

function formatTimeStamp(date_list) {
    let formatted = [];
    date_list.forEach(num => {
        formatted.push(
            num.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
        )
    })
    return formatted[0] + ":" + formatted[1] + ":" + formatted[2];
}


function autosaveDisplay(statusCode) {
    const autosaveArea = document.getElementById("autosave-area");
    const date = new Date();
    const dateArray = [date.getHours(), date.getMinutes(), date.getSeconds()];
    let timestamp = formatTimeStamp(dateArray);
    if (statusCode == 201) {
        autosaveArea.classList.add("success");
        autosaveArea.classList.remove("error");
        autosaveArea.innerHTML = "<h4>Autosaved Successfully at " + timestamp + "</h4>";
    } else if (statusCode == 500) {
        autosaveArea.classList.add("error");
        autosaveArea.classList.remove("success");
        autosaveArea.innerHTML = "<h4>Autosave Failed. No connection to the server found</h4>";
    } else {
        autosaveArea.classList.add("error");
        autosaveArea.classList.remove("success");
        autosaveArea.innerHTML = "<h4>Autosave Failed at " + timestamp + "</h4>";
    }
}

function autosave() {
    var codeFragment = myCodeMirror.getValue();
    //localStorage.setItem("code", codeFragment);
    const http = new XMLHttpRequest();
    try {
        http.open("POST", "/autosave");
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify({code: codeFragment }));
        http.onload = function() {
            autosaveDisplay(http.status);
        }
    } catch (err) {
        autosaveDisplay(500);
    }
}