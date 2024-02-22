let eventListeners,
gallery = false,
isImage = false;


function checkLoaded() {
    return document.readyState === "complete";
}

if(checkLoaded()) {
    //SSCstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`, SSC_settings, loadSSC)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        document.addEventListener('click', closer)
        document.getElementById('loader').classList.add('loaded')
    },1000)
})

document.addEventListener('contextmenu', function(e) {
    e.preventDefault()
    rightClick()
})
function closer(event) {
    if(event.target.classList.contains('popup'))
    document.getElementById('popup').classList.remove('active')
}
function createAlert(icon, title, text) {
    let element = document.getElementById('popup')
    element.children[0].style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${icon}.svg)`
    element.children[1].innerHTML = title
    element.children[2].innerHTML = text
    
    document.addEventListener('click', closer)

    element.classList.add('active')
}

function createListeners() {
    let closer = (event) => {

        if(!event.target.classList.contains('CMSclickable')) {
            this.close()
        }

    },

    fader = (event) => this.fadeOut(event)

    document.addEventListener('click', closer);
    document.addEventListener('mousemove', fader);

    this.tempEventListeners = [
        () => document.removeEventListener('click', closer),
        () => document.removeEventListener('mousemove', fader)
    ]
}

function changePage(id, element) {
    document.getElementById('SSM').classList.remove('open')
    document.getElementById(id).classList.toggle('unhidden')
    element.classList.toggle('unhidden')
}