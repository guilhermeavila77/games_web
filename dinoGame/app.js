const dino = document.getElementById("dino")
const cac = document.getElementById("cac")

function jump(){
    if (dispatchEvent.classList != "jump"){
        dino.classList.add("jump");
        setTimeout(function(){
            dino.classList.remove("jump");
        }, 300)
    }
}

let checkAlive = setInterval(function(){
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cacLeft = parseInt(window.getComputedStyle(cac).getPropertyValue("left"));

    if(cacLeft > 0 && cacLeft < 70 && dinoTop >= 143){
        dino.style.animationPlayState = "paused";
        cac.style.animationPlayState = "paused";
        alert("RODOU PLAY BOY! :(");
        window.location.reload();
    }
}, 10);

document.addEventListener("keydown", function(event){
    jump();
})