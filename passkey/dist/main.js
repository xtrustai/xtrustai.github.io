function addDomList(json){
    data = json.content
    let dom = document.createElement('div')
    dom.className = "GuideBox";
    let title = document.createElement('h1')
    title.className = "title";
    title.innerHTML = data.title
    dom.appendChild(title)
    let box = document.createElement('div')
    box.className = "content";
    for(let i in data.detail){
        let c = document.createElement(data.detail[i].tag)
        if(data.detail[i].tag == 'img'){
            c.src = data.detail[i].content
            c.className = "image"
            if((data.detail[i-1] && data.detail[i-1].tag == 'img') || (data.detail[i-1+2] && data.detail[i-1+2].tag == 'img')){
                c.className = "image_sml"
            }
        }else{
            switch (data.detail[i].tag){
                case 'p':
                    c.className = 'text'
                    break
                case 'li':
                    c.className = 'text liitem'
                    break
                default:
                    break
            }
            c.innerHTML = data.detail[i].content
        }
        box.appendChild(c)
    }
    dom.appendChild(box)
    let main = document.getElementById('main')
    main.appendChild(dom)
    if(sessionStorage.getItem('clickApp')){
        location.hash = 'main'
    }
}

function openUrl(addr){
    const url = window.location.origin + '/'
    window.open(url + addr, '_self')
}

function backTop(){
    window.scrollTo(0,0)
}

function fetchError(){
    let err = document.getElementById('error')
    err.style.display = 'block'
}

(() => {
    function resetFontSize() {
        const size = (document.documentElement.clientWidth / 1920) * 37.5;
        document.documentElement.style.fontSize = size + 'px';
    }
    resetFontSize();
    window.addEventListener('resize', resetFontSize);
})();

window.addEventListener("load", ()=>{
    if(document.getElementById('guide')){
        document.getElementById('guide').onchange = () => {
            let dom = document.getElementById('guide')
            let index = dom.selectedIndex
            if (!index) return
            let text = dom.options[index].text
            sessionStorage.setItem('clickApp', text)
            dom.options[0].selected = true
            window.open('./detail.html?app=' + text, '_self')
        }
    }
})
