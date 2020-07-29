// ==UserScript==
// @name        metnet.hu/forum kedvencek
// @namespace   Violentmonkey Scripts
// @include     https://www.metnet.hu/forum
// @grant       none
// @version     1.1
// @author      -
// @description 2019. 12. 23. 10:36:13
// ==/UserScript==

//document.body.style.transform = "scale(.75)"
//@include! nem @match! mert különben az összes topikra is működik! (nem nézi a ?topic=...-t)

let beszurnivaloElem = document.createElement('div')
//beszurnivaloElem.outerHTML = '<div class="forum-category"><div class="category-name">Kedvenc olvasatlan</div><div id="kedv" class="topic-list"></div></div>'
// ahogy azt Móricka... https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML Notes
beszurnivaloElem.className = "forum-category"
beszurnivaloElem.innerHTML = '<div class="category-name">Kedvenc olvasatlan</div><div id="kedv" class="topic-list"></div>'

let kedvElem = beszurnivaloElem.querySelector('#kedv')
//kedvElem.append(Array.from(document.querySelectorAll('div.favorited.unread')/*.map(e => {e.cloneNode()})*/)) //ez se műx
document.querySelectorAll('div.favorited.unread').forEach
( e =>
  { /**/console.log(e.cloneNode(true))
    kedvElem.append(e.cloneNode(true))
  }
)
/**/console.log(beszurnivaloElem)
let titleElem = document.querySelector('.page-title')
titleElem.parentNode.insertBefore(beszurnivaloElem, titleElem.nextSibling)
