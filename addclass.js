function addClass(className, id, term, teacher, classroom, grade, absent, tardy, dismissed, abbrev) {
  var tableElement = document.getElementById("dataGrid").firstElementChild;
  var tBodyElement = tableElement.firstElementChild;
  var rows = tBodyElement.children;
  var lastRow = rows[rows.length - 1];
  for (var i = rows.length - 1; lastRow.nodeName != "TR" && i >= 0; i--)
  {
    lastRow = rows[i];
  }

  var newRow = document.createElement("tr");

  newRow.setAttribute("class", "listCell listRowHeight null");
  if (lastRow.style.backgroundColor == "rgb(245, 245, 245)")
  {
    newRow.style.backgroundColor = "rgb(255, 255, 255)";
  } else {
    newRow.style.backgroundColor = "rgb(245, 245, 245)";
  }

  var classCode = "SSC000002ju" + abbrev;

  // Make array of all table datas
  var tds = [
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td")
  ];

  var checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.id = classCode;
  checkBox.setAttribute("name", "selectedOids");
  checkBox.setAttribute("value", classCode);
  checkBox.addEventListener("click", function(){selectMultipleRow("classListForm", "allRows", classCode, true)});
  //checkBox.setAttribute("onclick", "selectMultipleRow(\"classListForm\", \"allRows\", \"" + classCode + "\", true);");
  tds[0].setAttribute("width", "1");
  tds[0].insertAdjacentElement('beforeend', checkBox);


  var link = document.createElement("a");
  tds[1].id = classCode;
  tds[1].addEventListener("mouesover", function(){this.className = 'listRowHighlight pointer';});
  //tds[1].setAttribute("onmouseover", "this.className = 'listRowHighlight pointer'");
  tds[1].addEventListener("mouseout", function(){this.className = 'pointer';});
  //tds[1].setAttribute("onmouseout", "this.className = 'pointer';");
  tds[1].class = "pointer";
  tds[1].addEventListener("click", function(){javascript:doParamSubmit(2100, document.forms['classListForm'], classCode);});
  //tds[1].setAttribute("onclick", "javascript:doParamSubmit(2100, document.forms['classListForm'], \"" + classCode + "\");");
  tds[1].setAttribute("width", 0);
  link.setAttribute("href", "javascript:doParamSubmit(2100, document.forms['classListForm'], 'SSC000002ju" + classCode + "')");
  link.innerHTML = className;
  tds[1].insertAdjacentElement('beforeend', link);

  for (var i = 2; i < 10; i++) {
    tds[i].setAttribute("nowrap", true);
  }
  tds[2].innerHTML = id;
  tds[3].innerHTML = term;
  tds[4].innerHTML = teacher;
  tds[5].innerHTML = classroom;
  tds[6].innerHTML = grade;
  tds[7].innerHTML = absent;
  tds[8].innerHTML = tardy;
  tds[9].innerHTML = dismissed;

  for (var i = 0; i < 10; i++) {
    newRow.insertAdjacentElement('beforeend', tds[i]);
  }

  tBodyElement.insertAdjacentElement('beforeend', newRow);

  var counterScript = tBodyElement.children[0];
  for (var i = 1; i < tBodyElement.children.length && counterScript.nodeName != "SCRIPT"; i++) {
    counterScript = tBodyElement.children[i];
  }
  counterScript.innerHTML = "totalRecords = " + (tBodyElement.children.length - 1) + ";";

}
