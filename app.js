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

        document.getElementById("status").innerHTML =
        "⏳ Lendo arquivos...";

        const dadosINC =
            await lerExcel(arquivoINC);

        const dadosTASK =
            await lerExcel(arquivoTASK);

        const dadosHistorico =
            await lerExcel(arquivoHistorico);

        document.getElementById("status").innerHTML =
        `
        ✅ INC: ${dadosINC.length} linhas<br>
        ✅ TASK: ${dadosTASK.length} linhas<br>
        ✅ HISTÓRICO: ${dadosHistorico.length} linhas
        `;

        console.log("INC", dadosINC);
        console.log("TASK", dadosTASK);
        console.log("HISTORICO", dadosHistorico);

    }
    catch(erro){

        console.error(erro);

        document.getElementById("status").innerHTML =
        "❌ Erro ao ler os arquivos.";
    }
}

function lerExcel(arquivo){

    return new Promise((resolve, reject)=>{

        const leitor = new FileReader();

        leitor.onload = function(e){

            try{

                const dados =
                    new Uint8Array(e.target.result);

                const workbook =
                    XLSX.read(dados, {type:"array"});

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

        leitor.readAsArrayBuffer(arquivo);

    });
}
