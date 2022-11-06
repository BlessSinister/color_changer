const cols = document.querySelectorAll('.col')
document.addEventListener('click', event => {
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ?
            event.target :
            event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        colorCopy(event.target.textContent)
    }
})
document.addEventListener('keydown', event => {
    event.preventDefault()
    event.code.toLocaleLowerCase() === 'space' ? setRandomColors() : false
})

// function generateRandomColor() {
//     const hexCode = '0123456789ABCDEF'
//     let color = ''
//     for (let i = 0; i < 6; i++) {
//         color += hexCode[Math.floor(Math.random() * hexCode.length)]
//     }
//     return '#' + color
// }


function colorCopy(text) {
    return navigator.clipboard.writeText(text)

}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {
        const isLock = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        if (isLock) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()
        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color



        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateColorshash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    luminance > 0.5 ? text.style.color = 'black' : text.style.color = 'white'
}

function updateColorshash(colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color)
    }
    return []
}

setRandomColors(true)