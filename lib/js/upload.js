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
        //console.log(dataURL.slice(22, dataURL.length), 'image/png'.length)
        //console.log(atob(dataURL.slice(13 + this.imageType.length, dataURL.length)))
        image.src = dataURL
    }
    //this.imageType = file.files[0].type
    reader.readAsDataURL(file.files[0]);
}

function createImageBuffer(file) {
    let e = new Image()

    e.onload = () => {

        let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
        canvas.width = size
        canvas.height = Math.floor(canvas.width * (e.height / e.width))

        ctx.drawImage(e, 0, 0)
        //console.log('working')
        img = loadImage(canvas.toDataURL("image/png"), startGame())
     
    }
    readInput(file, e)                    
}