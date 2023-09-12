document.getElementById("cell1").onclick = function(e){
    document.getElementById("scamLink").style.visibility = "hidden";
    document.getElementById("cell2").innerHTML = "Pop!";
    document.getElementById("cell4").innerHTML = "Pop!";

    document.getElementById("cell5").innerHTML = "Click Me!!!";
    document.getElementById("cell1").onclick = null;

    cell5();
}
function cell5(){
    document.getElementById("cell5").onclick = function(e){
    
        document.getElementById("cell5").innerHTML = "<span></span>"
    
        document.getElementById("cell2").innerHTML = "Dance!";
        document.getElementById("cell4").innerHTML = "Move!";
        document.getElementById("cell6").innerHTML = "Move!";
        document.getElementById("cell8").innerHTML = "Dance!";
    
        document.getElementById("cell9").innerHTML = "Click Me!!!";
        document.getElementById("cell5").onclick = null;

        cell9();
    }
}

function cell9(){
    document.getElementById("cell9").onclick = function(e){

        document.getElementById("scamLink").style.visibility = "visible";
    
        document.getElementById("cell2").innerHTML = "Dance!";
        document.getElementById("cell4").innerHTML = "Move!";
        document.getElementById("cell6").innerHTML = "Move!";
        document.getElementById("cell8").innerHTML = "Dance!";
    
        document.getElementById("cell3").innerHTML = "Pop!!!";
        document.getElementById("cell5").innerHTML = "Pop!!!";
        document.getElementById("cell7").innerHTML = "Pop!!!";
        document.getElementById("cell9").innerHTML = "Pop!!!";
    
        document.getElementById("cell9").onclick = null;
    }
}






