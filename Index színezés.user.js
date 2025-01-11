// ==UserScript==
// @name Index színezés
// @namespace Violentmonkey Scripts
// @match http://forum.index.hu/Article/showArticle*
// @match https://forum.index.hu/Article/showArticle*
// @grant none
// ==/UserScript==

var ezvagyoken = "e_laca";
var ezazenszinem = "#CCFFFF";
var ezavalaszolokszine = "#CCFF99";


var tables = document.getElementsByTagName("table");

for (var i = 0 ; i < tables.length; i++)
{
  var table = tables[i];

  if (table.getAttribute("class") != "art")
    continue;

  var userName = undefined;
  var bodyDiv = undefined;

  var rows = table.getElementsByTagName("tr");
  for (var k = 0; k < rows.length; k++)
  {
    var row = rows[k];

    if (row.getAttribute("class") == "art_h")
    {
    var fields = row.getElementsByTagName("td");

    for (var j = 0; j < fields.length; j++)
    {
      var field = fields[j];
      //if (field.getAttribute("class") && field.getAttribute("class") == "art_h_l")
      //helyett (mert több osztálya van): (2015-04)
      if (field.getAttribute("class") && field.classList.contains("art_h_l"))   // bal mező
        userName = field.getElementsByTagName("strong")[0].innerHTML;
    }
    }
    else if (row.getAttribute("class") == "art_b")
    {
      bodyDiv = row.getElementsByTagName("td")[0];
      if (userName == ezvagyoken)
    bodyDiv.bgColor = ezazenszinem;
    }
    else if (row.getAttribute("class") == "art_f")
    {
      var links = row.getElementsByTagName("a");
      if (links.length > 0)
      {
    var prevuser = links[0].innerHTML.replace(/(.*) \(.*/,"$1");
    if (prevuser == ezvagyoken)
      bodyDiv.bgColor = ezavalaszolokszine;      
      }
    }
  }

}

