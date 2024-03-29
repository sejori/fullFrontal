import { getState, setState } from "/js/state.js"
import { dragStartHandler, dragOverHandler, dropHandler, dragEndHandler } from "/js/dragDropFunctions.js"

let iframe = document.querySelector("#app-view")
setState("iframe", iframe)

function selectElement() {
  event.stopPropagation()
  setState("selectedElement", event.target)
}

function setUpElementSelection() {
  iframe.addEventListener('load', (ev) => {
    setState("selectedElement", iframe.contentWindow.document.body, [ [ "/js/rightPanel.js", "handleSelectedElementChange" ] ])
    Array.from(iframe.contentWindow.document.body.getElementsByTagName("*")).forEach( el => {
      el.addEventListener("click", selectElement)
      el.setAttribute("draggable", true)
      el.addEventListener("dragstart", dragStartHandler)
      el.addEventListener("dragover", dragOverHandler)
      el.addEventListener("drop", dropHandler)
      el.addEventListener("dragend", dragEndHandler)
    })

    // also store reference to iframe CSS from here
    setState("iFrameCSS", iframe.contentWindow.document.styleSheets[0])
  })
}

// function popOut() {
//   let appView = document.querySelector("#app-view")
//   let popOut = window.open(appView.src, "Full Frontal", "width=400,height=600")
//   popOut.addEventListener('load', (evt) => {
//     Array.from(popOut.document.getElementsByTagName("*")).forEach( el => {
//       el.addEventListener("click", selectElement)
//     })
//   })
// }
//
// function toggleEdit() {
//   if (event.target.style.backgroundColor !== "green") {
//     // edit mode on
//     event.target.style.backgroundColor = "green"
//
//     // make all elements of app-view selectable and not interactable
//     return
//   }
//   // edit mode off
//   // elements unselectable and interactable
// }

setUpElementSelection()
