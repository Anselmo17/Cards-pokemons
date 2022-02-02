
// funcao adiciona e remove o loading 
function stadoLoaging(statusLoader){

    const adicionarLoading = true; 
  
      if(statusLoader === adicionarLoading){
        document.getElementById("loader").style.display = "block";
        document.getElementById("fundoLoading").style.display = "block";
      } else {
        document.getElementById("loader").style.display = "none";
        document.getElementById("fundoLoading").style.display = "none";
      };
  
  }