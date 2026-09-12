document
.getElementById("btnGerar")
.addEventListener("click", iniciar);

async function iniciar(){

    alert("1 - Entrou na função");

    const arquivoINC =
        document.getElementById("arquivoINC").files[0];

    const arquivoTASK =
        document.getElementById("arquivoTASK").files[0];

    const arquivoHistorico =
        document.getElementById("arquivoHistorico").files[0];

    if(!arquivoINC || !arquivoTASK || !arquivoHistorico){

        alert("2 - Falta arquivo");

        return;
    }

    alert("3 - Arquivos encontrados");

}
