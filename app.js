document
.getElementById("btnGerar")
.addEventListener("click", iniciar);

async function iniciar(){

    try{

        const arquivoTASK =
            document.getElementById("arquivoTASK").files[0];

        if(!arquivoTASK){

            alert("Selecione a base TASK.");

            return;
        }

        const dadosTASK =
            await lerExcel(arquivoTASK);

        const parceiros =
            dadosTASK.filter(
                linha =>
                    String(linha["Operadora"])
                    .trim()
                    .toUpperCase() === "OUTRAS"
            );
        const sigitm =
            dadosTASK.filter(
                linha =>
                    String(linha["Operadora"])
                    .trim()
                    .toUpperCase() === "VIVO"
            );

        const task =
            [...dadosTASK];
             
        const workbook = new ExcelJS.Workbook();

const abaParceiras =
    workbook.addWorksheet("TMA-PARCEIRAS");

const abaSigitm =
    workbook.addWorksheet("TMA-SIGITM");

const abaTask =
    workbook.addWorksheet("TMA-TASK");

function preencherAba(aba, dados){

    if(!dados.length) return;

    aba.columns =
        Object.keys(dados[0]).map(coluna => ({
            header: coluna,
            key: coluna,
            width: 30
        }));

    dados.forEach(linha => {
        aba.addRow(linha);
    });
}

preencherAba(
    abaParceiras,
    parceiros
);

preencherAba(
    abaSigitm,
    sigitm
);

preencherAba(
    abaTask,
    task
);
        const buffer =
            await workbook.xlsx.writeBuffer();

        const blob =
            new Blob(
                [buffer],
                {
                    type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );

        const link =
            document.createElement("a");

        link.href =
            window.URL.createObjectURL(blob);

        link.download =
            "TMA-RELATORIO.xlsx";

        link.click();

document.getElementById("status")
.innerHTML =
`
✅ TMA-PARCEIRAS: ${parceiros.length} registros<br>
✅ TMA-SIGITM: ${sigitm.length} registros<br>
✅ TMA-TASK: ${task.length} registros
`;

    }
    catch(erro){

        console.error(erro);

        document.getElementById("status")
        .innerHTML =
        "❌ Erro ao gerar Excel.";
    }
}

function lerExcel(arquivo){

    return new Promise((resolve,reject)=>{

        const reader =
            new FileReader();

        reader.onload =
            function(e){

                try{

                    const data =
                        new Uint8Array(
                            e.target.result
                        );

                    const workbook =
                        XLSX.read(
                            data,
                            {type:"array"}
                        );

                    const worksheet =
                        workbook.Sheets[
                            workbook.SheetNames[0]
                        ];

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
