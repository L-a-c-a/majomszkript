// ==UserScript==
// @name Index előzményre ugrás
// @namespace Violentmonkey Scripts
// @match http://forum.index.hu/Article/showArticle*
// @match https://forum.index.hu/Article/showArticle*
// @grant none
// ==/UserScript==

var vasmacska; //itt lesz az ugrási címke
var hsz;
var ugr; // <a href=#vasmacska> elem
var ugrhsz;
var beszurt;

var ugrszoveg;
var hely;  // tampermonkey -ban ezek nélkül hiba

var hszok = [];

var tables = document.getElementsByTagName("table");

for (var i = tables.length-1; i >= 0 ; i--)
{
 var table = tables[i];

 if (table.getAttribute("class") != "art")     //hozzászólás (ha nem, ugorgyunk)
   continue;

 var rows = table.getElementsByTagName("tr");
 
  for (var k = 0; k < rows.length; k++)         // 3 vagy 2 sor: fejléc, szöveg, lábléc
 {
   var row = rows[k];

   if (row.getAttribute("class") == "art_h")    //fejléc
   {
     var fields = row.getElementsByTagName("td");

     for (var j = 0; j < fields.length; j++)
     {
       var field = fields[j];

       //if (field.getAttribute("class") && field.getAttribute("class") == "art_h_l")
       //helyett (mert több osztálya van): (2015-04)
       if (field.getAttribute("class") && field.classList.contains("art_h_l"))   // bal mező
         vasmacska = field.getElementsByTagName("a")[0].getAttribute("name");
       else
       if (field.getAttribute("class") && field.getAttribute("class") == "art_h_r")  //jobb mező
       {
         //hsz = field.getElementsByTagName("strong")[0].innerHTML; helyett: (megváltozott, és közben lett getElementsByClassName - 2013.08)
         hsz = field.getElementsByClassName("art_nr")[0].innerHTML;
           // alert("hsz="+hsz);
         hszok[hsz] = vasmacska;
       }
     }
   }
   else if (row.getAttribute("class") == "art_f")  //lábléc
   {
     var links = row.getElementsByTagName("a");
        //alert(links.length+" link a láblécben")
     if (links.length > 0)
     {
             //alert(links[0].innerHTML);
       ugrhsz = links[0].innerHTML.split("(")[1].replace(")", "");
       if  (hszok[ugrhsz])
       {
         ugr = document.createElement("a");
         ugrszoveg = document.createTextNode("odaugr");
         ugr.setAttribute("href", "#"+hszok[ugrhsz]);
          ugr.setAttribute("onclick", 'document.getElementById("passportHeader").innerHTML = "";');   //2015-11-20
         ugr.appendChild(ugrszoveg);
         beszurt = row.firstChild.insertBefore(ugr, row.firstChild.lastChild/*.previousSibling*/); //2013.08: nem previousSibling
         hely = document.createTextNode(" ");
         row.firstChild.insertBefore(hely, beszurt);
       }
     }
   }
 }

}

document.getElementById("passportHeader").innerHTML = "";
