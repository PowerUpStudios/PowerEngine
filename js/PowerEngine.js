/*The MIT License (MIT)
Copyright © 2022 Power Up Studio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

const doc = document
const win = window
const nav = navigator
class CustomElement {
  constructor(name, onuse) {
    this.name = name
    this.onuse = onuse
    this.element = class Element extends HTMLElement {connectedCallback(){ onuse(this) }}
    customElements.define(this.name, this.element)
  }
}
class CustomError {
  constructor(name) {
    this.name = name
    this.error = class Err extends Error {constructor(msg){ super(msg); this.name = name}}
  }
}
class Bar {
  constructor(min, max, delay, onmax) {
    this.min = min
    this.max = max
    this.delay = delay
    this.onmax = onmax
    this.value = min
    const bar = document.createElement("p")
    let progress = ""
    for (let char = min; char < max; char++) {
      progress = progress + "□"
    }
    bar.innerHTML = progress
    document.getElementsByTagName("body")[0].appendChild(bar)
    let p = min
    function loop() {
      setTimeout(function() {
        p = p + 1
        this.value = p
        progress = ""
        for (let char = min; char < p; char++) {
          progress = progress + "■"
        }
        for (let char = min; char < max - p; char++) {
          progress = progress + "□"
        }
        bar.innerHTML = progress
        if (p < max) {
          loop()
        }else{
          onmax(bar)
        }
      }, delay)
    }
    loop()
  }
}
class Box {
  constructor(title, txt, height, width, btntxt, bc, txtc, br, onclose) {
    this.title = title 
    this.txt = txt
    this.height = height
    this.width = width
    this.btntxt = btntxt
    this.bc = bc
    this.txtc = txtc
    this.br = br
    this.onclose = onclose
    const box = document.createElement("div")
    box.style.height = (height + (txt.length / (width / 21)) * 10)
    box.setAttribute("id","box")
    box.style.width = width
    box.style.backgroundColor = bc
    box.style.color = txtc
    box.style.border = "2px solid " + txtc
    box.style.borderRadius = br
    const box_title = document.createElement("h2")
    box_title.innerHTML = title
    box.appendChild(box_title)
    const box_txt = document.createElement("p")
    box_txt.innerHTML = txt
    box.appendChild(box_txt)
    const box_btn = document.createElement("button")
    box_btn.style.width = "50px"
    box_btn.style.height = "25px"
    box_btn.style.backgroundColor = bc
    box_btn.style.color = txtc
    box_btn.innerHTML = btntxt
    box_btn.style.border = "2px solid " + txtc
    box.appendChild(box_btn)
    document.getElementsByTagName("body")[0].appendChild(box)
    box_btn.onclick = function() {
      if (onclose) {
        onclose()        
      }
      box.remove()
    }
  }
}
function underline(txt) {
  return "<u>" + txt + "</u>"
}
function bold(txt) {
  return "<b>" + txt + "</b>"
}
function italic(txt) {
  return "<i>" + txt + "</i>"
}
function link(txt, url) {
  return "<a href='" + url + "'>" + txt + "</a>"
}
function header(txt, size) {
  return "<h" + size.toString() + ">" + txt + "</h" + size.toString() + ">"
}
function favicon(url) {
  return "<link rel='icon' href='" + url + "'/>"
}
function style(element, attribute, value) {
  element.style[attribute] = value
}
function append(str, parent) {
  const element = document.createRange().createContextualFragment(str)
  if (parent) {
    parent.appendChild(element)
  }else{
    document.getElementsByTagName("body")[0].appendChild(element)
  }
}
function get(key, method) {
  if (method == "id") {
    return document.getElementById(key)
  }else{
    if (method == "class") {
      return document.getElementsByClassName(key)
    }else{
      if (method == "name") {
        return document.getElementsByName(key)
      }else{
        if (method == "tagname") {
          return document.getElementsByTagName(key)
        }
      }
    }
  }
}
window.size = [window.innerHeight + "px", window.innerWidth + "px"]
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min
}
function getQuery() {
  return Object.fromEntries(new URLSearchParams(window.location.search).entries());
}
function setAttributes(element, attrs) {
  for (let attr = 0; attr < attrs.length; attr++) {
    element[attrs[attr].name] = attrs[attr].value
  }
}
function chars(str) {
  return str.split("")
}
function toBinary(int) {
  return this.toString(2)
}
function toHex(int) {
  return int.toString(16)
}
function toOctal(int) {
  return int.toString(8)
}
