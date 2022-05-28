const controlPanel = document.querySelector(".control-panel");

// controlPanel.addEventListener("mousedown", () => {
//     controlPanel.addEventListener("mousemove", onDrag)
// });

// document.addEventListener("mouseup", () => {
//     controlPanel.removeEventListener("mousemove", onDrag)
// })

function onDrag({movementX, movementY}) {
    let cpStyle = getComputedStyle(controlPanel);
    controlPanel.style.left = `${parseInt(cpStyle.left) + movementX}px`
    controlPanel.style.top = `${parseInt(cpStyle.top) + movementY}px`
}

document.getElementById("pathFinder").addEventListener("change", (e) => {
    currentFinder = e.currentTarget.value
})