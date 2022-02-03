
// funcao adiciona e remove o loading 
function stadoLoaging(statusLoader){ 
      if(statusLoader){
        document.getElementById("loader").style.display = "block";
        document.getElementById("fundoLoading").style.display = "block";
        return;
      }
        document.getElementById("loader").style.display = "none";
        document.getElementById("fundoLoading").style.display = "none";
  }