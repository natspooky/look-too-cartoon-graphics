let size = 5
window.addEventListener("load", function() {
    
    document.getElementById('uploader').addEventListener('change', function(e) {
        createImageBuffer(this)
    })
    
})

function readInput(file, image) {
    let reader = new FileReader()
    reader.onload = function() {
        let dataURL = reader.result
        image.src = dataURL
    }
    reader.readAsDataURL(file.files[0]);
}

function createImageBuffer(file) {
    let e = new Image()

    e.onload = () => {

        let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
        canvas.width = size
        canvas.height = size

        ctx.drawImage(e, 0, 0, e.width, e.height, 0, 0, size, size)
        img = loadImage(canvas.toDataURL("image/png"), () => {isImage = false; startGame(); changePage('game', document.getElementById('upload'))})
     
    }
    readInput(file, e)                    
}