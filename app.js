document
.getElementById("btnGerar")
.addEventListener("click", iniciar);

function iniciar(){

    const inc =
        document.getElementById("arquivoINC").files[0];

    const task =
        document.getElementById("arquivoTASK").files[0];

    const historico =
        document.getElementById("arquivoHistorico").files[0];

    if(!inc || !task || !historico){

        alert(
            "Selecione os 3 arquivos."
        );

        return;
    }

    document.getElementById("status")
    .innerHTML =
    "✅ Arquivos carregados corretamente.";
}
