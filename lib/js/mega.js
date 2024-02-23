window.addEventListener('load', function() {

})

function generateGalleryTile(size) {
    let image = new Image()
    image.onload = function() {

    }
}

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
        
    }
}