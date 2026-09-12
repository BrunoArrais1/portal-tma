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

    try{

        const dadosINC = await lerExcel(arquivoINC);
        const dadosTASK = await lerExcel(arquivoTASK);
        const dadosHistorico = await lerExcel(arquivoHistorico);

        document.getElementById("status").innerHTML = `
            ✅ Base INC: ${dadosINC.length} registros<br>
            ✅ Base TASK: ${dadosTASK.length} registros<br>
            ✅ Histórico TASK: ${dadosHistorico.length} registros
        `;

        console.log("INC", dadosINC);
        console.log("TASK", dadosTASK);
        console.log("HISTÓRICO", dadosHistorico);

    }
    catch(erro){

        console.error(erro);

        document.getElementById("status").innerHTML =
            "❌ Erro ao ler as planilhas.";

    }
}

function lerExcel(arquivo){

    return new Promise((resolve, reject)=>{

        const reader = new FileReader();

        reader.onload = function(e){

            try{

                const data =
                    new Uint8Array(e.target.result);

                const workbook =
                    XLSX.read(data, {type:'array'});

                const nomeAba =
                    workbook.SheetNames[0];

                const worksheet =
                    workbook.Sheets[nomeAba];

                const json =
                    XLSX.utils.sheet_to_json(
                        worksheet,
                        {defval:""}
                    );

                resolve(json);

            }
            catch(erro){

                reject(erro);

            }
        };

        reader.readAsArrayBuffer(arquivo);

    });

}
