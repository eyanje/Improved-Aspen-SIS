function addRow() {
  var tBody = document.getElementById("tableBody");
  var row = document.createElement("tr");
  for (var i = 0; i < 10; i++) {
    var td = document.createElement("td");
    var textBox = document.createElement("input");
    textBox.setAttribute("type", "text");
    td.insertAdjacentElement('beforeend', textBox);
    row.insertAdjacentElement('beforeend', td);
  }
  row.children[1].children[0].style.width = "4em";
  row.children[6].children[0].style.width = "2em";
  row.children[7].children[0].style.width = "2em";
  row.children[8].children[0].style.width = "2em";
  row.children[9].children[0].style.width = "2em";
  tBody.insertAdjacentElement('beforeend', row);
}

function showNotif() {
  var notif = document.getElementById("notif");
  notif.style.visibility = "visible";
  setTimeout(function() {
    notif.style.visibility = "hidden";
  }, 3000);
}

function saveClasses() {
  var tBody = document.getElementById("tableBody");
  var rows = tBody.children;
  var settings = new Array(rows.length);
  for (var i = 0; i < rows.length; i++) {
    //Check for empty rows
    var tds = rows[i].children;

    var empty = true;
    do {
      for (var j = 0; j < tds.length; j++) { // Loops through all tds
        if (tds[j].children[0].value.length > 0) { // If value in <input> is a string of positive length
          empty = false;
          break;
        }
      }
      if (empty) {
        rows[i].remove();
        settings.length--;
        if (i >= rows.length) break;
        tds = rows[i].children;
      }
    } while (empty);
    if (i >= rows.length) break; // Out of rows!

    settings[i] = [];
    var tds = rows[i].children;
    for (var j = 0; j < tds.length; j++) {
      settings[i][j] = tds[j].firstElementChild.value;
    }
  }
  if (!browser.chrome) {
    browser.storage.sync.set({classList: settings});
  } else {
    chrome.storage.sync.set({classList: settings});
  }
}

// Saves the settings for the Total row on SIS
function saveTotalOptions() {
  var includeAdded = document.getElementById("includeAdded").checked;
  var totalOptions = {
    "includeAdded": includeAdded
  };
  
  if (!window.chrome) {
    browser.storage.sync.set({"totalOptions": totalOptions})
  } else {
    chrome.storage.sync.set({"totalOptions": totalOptions});
  }
}

function saveSettings() {
  if (!window.chrome) {
    browser.storage.sync.clear();
  } else {
    chrome.storage.sync.clear();
  }
  saveClasses();
  saveTotalOptions();
  showNotif();
}

function displayClassList(classList) {
  var tBody = document.getElementById("tableBody");
  tBody.innerHTML = "";
  for (var i = 0; i < classList.length; i++) {
    var row = document.createElement("tr");
    var setting = classList[i];
    for (var j = 0; j < setting.length; j++) {
      var td = document.createElement("td");
      var textBox = document.createElement("input");
      textBox.setAttribute("type", "text");
      textBox.value = classList[i][j];
      td.insertAdjacentElement('beforeend', textBox);
      row.insertAdjacentElement('beforeend', td);
    }
    row.children[1].children[0].style.width = "4em";
    row.children[6].children[0].style.width = "2em";
    row.children[7].children[0].style.width = "2em";
    row.children[8].children[0].style.width = "2em";
    row.children[9].children[0].style.width = "2em";
    // 6 7 8 9
    tBody.insertAdjacentElement('beforeend', row);
  }
}

function displayTotalOptions(totalOptions) {
  var includeAdded = document.getElementById("includeAdded");
  includeAdded.checked = totalOptions.includeAdded;
}

function displaySettings(settings) {
  displayClassList(settings.classList);
  displayTotalOptions(settings.totalOptions);
}

function restoreSettings() {
  if (!window.chrome || !window.chrome.webstore) {
    let getSettings = browser.storage.sync.get({
      "classList": [],
      "totalOptions": {
        "position": "above",
        "includeAdded": false
      },
    });
    getSettings.then(displaySettings);
  } else {
    chrome.storage.sync.get({
      "classList": [],
      "totalOptions": {
        "position": "above",
        "includeAdded": false
      },
    }, displaySettings);
  }
}

document.addEventListener("DOMContentLoaded", restoreSettings);
document.getElementById("addRow").addEventListener("click", addRow);
document.getElementById("save").addEventListener("click", saveSettings);
document.getElementById("restore").addEventListener("click", restoreSettings);
