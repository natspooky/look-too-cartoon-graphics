window.addEventListener('load', function() {

})

function generateGalleryTile(size) {
    let bigImage = new Image()
    bigImage.onload = function() {
        let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        smallImages = [],
        scaler = bigImage.width / size
        container = document.getElementById('gallery')
        container.innerHTML = ''


        for(let y = 0; y < bigImage.height / size; y += size) {
            for(let x = 0; x < bigImage.width / size; x += size) {
                ctx.drawImage(e, x, y, size, size)
                let cont = document.createElement('span'),
                smallImage = new Image(),
                index = (bigImage.width / size) * y + x,
                won = checkStorage(size, index)
                if(won) smallImage.classList.add('won')
                smallImage.onclick = function() {
                    img = loadImage(this.src, () => {isImage = true; gallery = true; galleryIndex = index; startGame(); changePage('game', document.getElementById('gallery'))})
                }
                smallImage.style.height = `${100 * scaler}%`
                smallImage.style.width = `${100 * scaler}%`
                smallImage.onload = function() {
                    smallImage.style.opacity = 1
                }
                smallImage.src = canvas.toDataURL("image/png")

                cont.appendChild(smallImage)

                smallImages.push(cont)
            }
        }
    }
}


/* 
    ctx.drawImage(e, 0, 0, e.width, e.height, 0, 0, size, size)
        img = loadImage(canvas.toDataURL("image/png"), () => {isImage = true; gallery = false; startGame(); changePage('game', document.getElementById('home'))})
*/



function checkStorage(gallerySize, tileIndex) {
    if(localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}`) == true) {

    }else {
        localStorage.setItem(`Picross!%${gallerySize}%${tileIndex}`, false)
    }
    
}

function tileCompleted(gallerySize, tileIndex) {
    if(localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}`) != true) {
        localStorage.setItem(`Picross!%${gallerySize}%${tileIndex}`, true)
    }
}

function checkGal() {
    if(document.getElementById('gallery').classList.contains('unhidden')) {
        generateGalleryTile(size)
    }
}