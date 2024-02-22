function checkLoaded() {
    return document.readyState === "complete";
}

if(checkLoaded()) {
    //SSCstyleCall(`https://natski.netlify.app/lib/ENCORE_DB/SSC/${SSC_settings.style}SSC.css`, SSC_settings, loadSSC)
}

window.addEventListener("load", function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('loaded')
    },1000)
})

document.addEventListener('contextmenu', function(e) {
    e.preventDefault()
})