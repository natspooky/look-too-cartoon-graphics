function generateGalleryTile(size, clickedImage) {
    let bigImage = new Image()
    bigImage.onload = function() {
        let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        scaler = bigImage.width / size
        canvas.width = canvas.height = size
        container = document.getElementById('smallImages')
        container.innerHTML = ''

        console.log(`scaler: ${scaler}  height:${bigImage.height}`)

        for(let y = 0; y < bigImage.height / size; y += 1) {
            for(let x = 0; x < bigImage.width / size; x += 1) {
                ctx.drawImage(bigImage, scaler * x, scaler * y, size, size)
                let cont = document.createElement('span'),
                smallImage = new Image(),
                index = (bigImage.width / size) * y + x,
                won = checkStorage(size, index)
                if(won) cont.classList.add('won')
                smallImage.onclick = function() {
                    img = loadImage(this.src, () => {
                        isImage = true; 
                        gallery = true; galleryIndex = index; 
                        startGame(); 
                        changePage('game', document.getElementById('gallery'))})
                }
                cont.style.height = `${100 / scaler}%`
                cont.style.width = `${100 / scaler}%`
                smallImage.onload = function() {
                    smallImage.style.opacity = 1
                }
                smallImage.src = canvas.toDataURL("image/png")

                cont.appendChild(smallImage)

                container.appendChild(cont)
            }
        }
    }
    bigImage.src = clickedImage
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