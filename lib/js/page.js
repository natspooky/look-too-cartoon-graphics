let eventListeners;


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
    rightClick()
})

function createAlert(icon, title, text) {
    let element = document.getElementById('popup'),
    listener;
    element.children[0].title = icon
    element.children[1].innerHTML = title
    element.children[2].innerHTML = text
    let closer = () => {
        element.classList.remove('active')
        listener()
    }

    listener = () => document.removeEventListener('click', closer)

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