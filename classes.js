/*addClass("AP League of Legends", "YAS-UO", "Season 8", "Huang, Longhao", "Summoner's Rift", "Diamond II", 0, 0, 0, "LoL");
addClass("AP Terraria", "DRT-RD", "FY", "Yan, Edward", "The Crimson", "100.0", 0, 0, 0, "Tra");
addClass("AP Homeroom", "SSS-212", "FY", "Myette, Silvana D", 212, "43.7 F-", 50, 0, 0, "212");
*/

var numAddedClasses = 0;

function displaySettings(settings) {
  var classList = settings.classList;
  var totalOptions = settings.totalOptions;

  if (!totalOptions.includeAdded) {
    calcAvg();
  }
  numAddedClasses = classList.length;
  for (var i = 0; i < classList.length; i++)
  {
    var entry = classList[i];
    addClass(entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6], entry[7], entry[8], entry[9]);
  }
  if (totalOptions.includeAdded) {
    calcAvg();
  }
}

chrome.storage.sync.get({
  "classList": [],
  "totalOptions": {
    "position": "above",
    "includeAdded": false
  }
}, displaySettings);

/**
 *  @param {Element} dataElement
 */
function styleAvgCalc(dataElement) {
  dataElement.style.display = "inline-block";
  dataElement.style.border = "2px #00000080";
  dataElement.style.padding = "5px";
  dataElement.style.backgroundColor = "#00000010";
  dataElement.style.margin = "2px";
}

function calcAvg() {
  var tableElement = document.getElementById("dataGrid").firstElementChild;
  var tBodyElement = tableElement.firstElementChild;
  var rows = tBodyElement.children;
  var grades = [];
  var absent = 0;
  var tardy = 0;
  var dismissed = 0;
  var numRealClasses = rows.length - numAddedClasses;
  for (var i = 1; i < rows.length; i++) { // First row is the heading
    var row = rows[i];

    if (row.nodeName != "TR") {
      continue;
    }

    var tds = row.children;
    
    var grade = parseFloat(tds[6].innerText);
    if (tds[1].innerText.includes("AP")) {
      grade += 10;
    }
    if (!isNaN(grade)) {
      grades.push(grade);
    }

    var abs = parseInt(tds[7].innerText);
    if (!isNaN(abs)) {
      absent += abs;
    }
    var trd = parseInt(tds[8].innerText);
    if (!isNaN(trd)) {
      tardy += trd;
    }
    var dsm = parseInt(tds[9].innerText);
    if (!isNaN(dsm)) {
      dismissed += dsm;
    }
  }
  var average = 0;
  for (var i = 0; i < grades.length; i++) {
    average += grades[i] / grades.length;
  }
  var gpa = average / 100 * 4.13;
  var averageSpan = document.createElement("span");
  styleAvgCalc(averageSpan);
  averageSpan.innerHTML = "Average " + average.toPrecision(2);
  var gpaSpan = document.createElement("span");
  styleAvgCalc(gpaSpan);
  gpaSpan.innerHTML = "GPA " + gpa.toPrecision(2);
  var dataString = averageSpan.outerHTML + gpaSpan.outerHTML;
  addClass("<strong>Total</strong>", "WT-AVG", "FY", "Various", "Various", dataString, absent, tardy, dismissed, "avg");
  // TODO add absent, dismissed, etc.
}