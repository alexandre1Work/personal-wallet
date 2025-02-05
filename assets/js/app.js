class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
}

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value
    );

    gravar(despesa);
}

function gravar(d) {
    //1p - identificação do dado que queremos armazenar
    //2p - o proprio dado que queremos armazenar - PRECISA ser em formato JSON
    //possui id - identificador único, o que quer dizer que uma despesa atribuida ao mesmo ide sobrepoe ele
    localStorage.setItem('despesa', JSON.stringify(d));
}

