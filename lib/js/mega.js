window.addEventListener('load', function() {

})

function generateGalleryTile(size) {
    let bigImage = new Image()
    bigImage.onload = function() {
        let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        smallImages = [],
        container = document.getElementById('gallery')
        container.innerHTML = ''


        for(let y = 0; y < bigImage.height / size; y += size) {
            for(let x = 0; x < bigImage.width / size; x += size) {
                ctx.drawImage(e, x, y, size, size)
                let cont = document.createElement('span'),
                smallImage = new Image(),
                index = (bigImage.width / size) * y + x
                smallImage.onclick = function() {
                    img = loadImage(this.src, () => {isImage = true; gallery = true; galleryIndex =  startGame(); changePage('game', document.getElementById('gallery'))})
                }
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


localStorage.setItem("myCat", "Tom");

function checkStorage(gallerySize, tileIndex) {
    if(localStorage.getItem(`Picross!%${gallerySize}%${tileIndex}`) == true) {

    }else {
        localStorage.setItem(`Picross!%${gallerySize}%${tileIndex}`, false)
    }
    
}

function loadTile(gallerySize, index, complete, images) {
    img = loadImage(images[index], () => {isImage = true; gallery = true; startGame(); changePage('game', document.getElementById('gallery'))})
}

function tileCompleted() {

}

function checkGal() {
    if(document.getElementById('gallery').classList.contains('unhidden')) {
        generateGalleryTile(size)
    }
}