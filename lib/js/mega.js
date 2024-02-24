function generateGalleryTile(size, clickedImage, callback) {
    let bigImage = new Image(),
    container = document.getElementById('smallImages')
    container.innerHTML = ''
    document.getElementById('gallery').setAttribute('currentImg', clickedImage)
    bigImage.onload = function() {
        let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        scaler = bigImage.width / size
        canvas.width = canvas.height = size


        //make convert images to 60px then allow for custom uploads

        console.log(`scaler: ${scaler}  height:${bigImage.height}`)

        for(let y = 0; y < bigImage.height / size; y += 1) {
            for(let x = 0; x < bigImage.width / size; x += 1) {
                ctx.drawImage(bigImage, size * x, size * y, size, size, 0, 0, size, size)
                let cont = document.createElement('span'),
                smallImage = new Image(),
                index = (bigImage.width / size) * y + x,
                won = checkStorage(size, index, clickedImage)
                //console.log(won, index)
                if(won) cont.classList.add('won')
                smallImage.onclick = function() {
                    img = loadImage(this.src, () => {
                        isImage = true; 
                        gallery = true; 
                        galleryIndex = index; 
                        startGame(); 
                        changePage('game', document.getElementById('gallery'))})
                        container.innerHTML = ''
                }
                cont.style.height = `${100 / scaler}%`
                cont.style.width = `${100 / scaler}%`
                smallImage.onload = function() {
                    smallImage.parentNode.style.opacity = 1
                }
                smallImage.src = canvas.toDataURL("image/png")

                cont.appendChild(smallImage)

                container.appendChild(cont)
            }
        }
        setTimeout(() => {
            callback
        }, 200);
    }
    bigImage.onerror = function() {
        createAlert('alert', 'Uh Oh!', 'there was an error loading Mega Picross!<br><br>Please try again later', true)
    }
    bigImage.src = clickedImage
}


/* 
    ctx.drawImage(e, 0, 0, e.width, e.height, 0, 0, size, size)
        img = loadImage(canvas.toDataURL("image/png"), () => {isImage = true; gallery = false; startGame(); changePage('game', document.getElementById('home'))})
*/



function checkStorage(gallerySize, tileIndex, image) {
    if(localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}%${image}`) == 'true') {
        return true
    }else {
        localStorage.setItem(`Picross!%${gallerySize}%${tileIndex}%${image}`, 'false')
        return false
    }
    
}

function tileCompleted(gallerySize, tileIndex, image) {
    console.log(gallerySize, tileIndex, localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}%${image}`))
    if(localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}%${image}`) == 'false' || localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}%${image}`)) {
        localStorage.setItem(`Picross!%${gallerySize}%${tileIndex}%${image}`, 'true')
    }
}

function checkGal() {
    if(document.getElementById('gallery').classList.contains('unhidden')) {
        generateGalleryTile(size, document.getElementById('gallery').getAttribute('currentImg'))
    }
}