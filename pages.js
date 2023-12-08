function openPage(evt, pagename){
    var i,offclass;
    offclass = document.getElementsByClassName("pageform");
    for(i=0;i<offclass.length;i++){
        offclass[i].style.display = "none";
    }
    document.getElementById(pagename).style.display = "block";
    document.getElementById(pagename).style.opacity = 0;
    document.getElementById('start_window').style.opacity=0;
    evt.currentTarget.className +=" active";
    let x=document.getElementById(pagename);
    let start = Date.now();
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (timePassed >= 1000) {
            clearInterval(timer); 
            return;
        }
        draw(timePassed);
    },  20);
    function draw(timePassed) {
        x.style.opacity = timePassed/1000;
    }
}