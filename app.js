document
.getElementById("btnGerar")
.addEventListener("click", iniciar);

function iniciar(){

    const arquivoINC =
        document.getElementById("arquivoINC").files[0];

    const arquivoTASK =
        document.getElementById("arquivoTASK").files[0];

    const arquivoHistorico =
        document.getElementById("arquivoHistorico").files[0];

    if(!arquivoINC || !arquivoTASK || !arquivoHistorico){

        alert("Selecione os 3 arquivos.");
        return;
    }

    document.getElementById("status").innerHTML = `
        ✅ Base INC: ${arquivoINC.name}<br>
        ✅ Base TASK: ${arquivoTASK.name}<br>
        ✅ Histórico: ${arquivoHistorico.name}
    `;
}
