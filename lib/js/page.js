let eventListeners,
gallery = false,
isImage = false,
assist = false;


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
        setTimeout(() => {
            document.getElementById('loader').remove()
        }, 1000);
    },1000)
})

document.addEventListener('contextmenu', function(e) {
    e.preventDefault()
})
function closer(event) {
    if(event.target.classList.contains('popup'))
    document.getElementById('popup').classList.remove('active')
}
function createAlert(icon, title, text, timer) {
    let element = document.getElementById('popup')
    element.children[0].style.mask = `url(https://natski.netlify.app/icon/svg/ENCORE_GIS/${icon}.svg)`
    element.children[1].innerHTML = title
    element.children[2].innerHTML = text
   

    element.classList.add('active')
    if(timer) {
        setTimeout(() => {
            element.classList.remove('active')
        }, 5500);
    }
}


function changePage(id, element) {
    if(id == 'home'){
        playSSC(0)
    }else {
        pauseSSC(0)
    }
    document.getElementById('SSM').classList.remove('open')
    document.getElementById(id).classList.toggle('unhidden')
    element.classList.toggle('unhidden')
}