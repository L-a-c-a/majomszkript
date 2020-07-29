// ==UserScript==
// @name        metnet.hu/forum kedvencek
// @namespace   Violentmonkey Scripts
// @include     https://www.metnet.hu/forum
// @grant       none
// @version     1.1
// @author      -
// @description 2019. 12. 23. 10:36:13
// ==/UserScript==

let beszurnivaloElem = document.createElement('div')
beszurnivaloElem.className = "forum-category"
beszurnivaloElem.innerHTML = '<div class="category-name">Kedvenc olvasatlan</div><div id="kedv" class="topic-list"></div>'

let kedvElem = beszurnivaloElem.querySelector('#kedv')
document.querySelectorAll('div.favorited.unread').forEach( e => { kedvElem.append(e.cloneNode(true)) } )
let titleElem = document.querySelector('.page-title')
titleElem.parentNode.insertBefore(beszurnivaloElem, titleElem.nextSibling)
