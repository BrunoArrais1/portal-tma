document
.getElementById("btnGerar")
.addEventListener("click", iniciar);

async function iniciar(){

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

    document.getElementById("status").innerHTML =
        "⏳ Lendo arquivos...";

    console.log("Iniciando leitura");

    console.log("INC:", arquivoINC.name);
    console.log("TASK:", arquivoTASK.name);
    console.log("HIST:", arquivoHistorico.name);
}
