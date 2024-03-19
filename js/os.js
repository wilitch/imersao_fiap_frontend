async function getAll() {
    let response = await fetch("http://localhost:8080/os")

    if (response.ok) {
        let body = await response.json()
        const table = document.getElementById('osCadastradas');
        const tBody = table.getElementsByTagName('tbody')[0];

        tBody.innerHTML = ""

        body.forEach(os => {
            const newRow = tBody.insertRow();

            const newColumnId = newRow.insertCell();
            const newTextId = document.createTextNode(os.id);
            newColumnId.appendChild(newTextId);

            const newColumnProprietario = newRow.insertCell();
            const newTextProprietario = document.createTextNode(os.proprietario);
            newColumnProprietario.appendChild(newTextProprietario);

            const newColumnEntrada = newRow.insertCell();
            const newTextEntrada = document.createTextNode(os.entradaLab);
            newColumnEntrada.appendChild(newTextEntrada);

            const newColumnDefeito = newRow.insertCell();
            const newTextDefeito = document.createTextNode(os.defeito);
            newColumnDefeito.appendChild(newTextDefeito);

            const newColumnEntrega = newRow.insertCell();
            const newTextEntrega = document.createTextNode(os.previsaoEntrega);
            newColumnEntrega.appendChild(newTextEntrega);

            const newColumnStatus = newRow.insertCell();
            const newTextStatus = document.createTextNode(os.statusConcerto);
            newColumnStatus.appendChild(newTextStatus);

            const newColumnObservacoes = newRow.insertCell();
            const newTextObservacoes = document.createTextNode(os.observacoes);
            newColumnObservacoes.appendChild(newTextObservacoes);

            const newColumnSistema = newRow.insertCell();
            var newTextSistema = document.createElement("a");
            newTextSistema.appendChild(document.createTextNode("Alterar"));
            newTextSistema.href='#';
            newTextSistema.onclick = function () {
                return get(os.id)
            }
            newColumnSistema.appendChild(newTextSistema);
        })
    }
}

async function get(id) {
    let response = await fetch(`http://localhost:8080/os/${id}`)

    if (response.ok) {
        let body = await response.json()

        document.getElementById("id").value = body.id
        document.getElementById("proprietario").value = body.proprietario
        document.getElementById("tipoEquipamento").value = body.tipoEquipamento
        document.getElementById("entradaLab").value = body.entradaLab
        document.getElementById("defeito").value = body.defeito
        document.getElementById("previsaoEntrega").value = body.previsaoEntrega
        document.getElementById("statusConcerto").value = body.statusConcerto
        document.getElementById("observacoes").value = body.observacoes


        document.getElementById('botaoSalvar').style.display = "none"
        document.getElementById('botaoAlterar').style.display = "block"
        document.getElementById("proprietario").focus()
    }
}

async function save() {
    const form = document.getElementById('dados');
    const formData = new FormData(form);

    const response = await fetch("http://localhost:8080/os", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })

    let body = await response.text()

    if (response.ok) {
        getAll()

        document.getElementById('botaoSalvar').style.display = "block"
        document.getElementById('botaoAlterar').style.display = "none"
        document.getElementById("id").value = null
        document.getElementById("proprietario").value = null
        document.getElementById("tipoEquipamento").value = 0
        document.getElementById("entradaLab").value = null
        document.getElementById("defeito").value = null
        document.getElementById("previsaoEntrega").value = null
        document.getElementById("statusConcerto").value = 0
        document.getElementById("observacoes").value = null
        document.getElementById("proprietario").focus()
    } else {
        document.getElementById('errorMessage').innerHTML = body
        document.getElementById('errorMessage').style.visibility = "visible"
    }
}

async function update() {
    const form = document.getElementById('dados');
    const formData = new FormData(form);
    const id = document.getElementById('id').value

    const response = await fetch(`http://localhost:8080/os/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })

    let body = await response.text()

    if (response.ok) {

    } else {
        document.getElementById('errorMessage').innerHTML = body
        document.getElementById('errorMessage').style.visibility = "visible"
    }

    getAll()

    document.getElementById('botaoSalvar').style.display = "block"
    document.getElementById('botaoAlterar').style.display = "none"
    document.getElementById("id").value = null
    document.getElementById("proprietario").value = null
    document.getElementById("tipoEquipamento").value = 0
    document.getElementById("entradaLab").value = null
    document.getElementById("defeito").value = null
    document.getElementById("previsaoEntrega").value = null
    document.getElementById("statusConcerto").value = 0
    document.getElementById("observacoes").value = null
    document.getElementById("proprietario").focus()
}