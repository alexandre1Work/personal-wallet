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

class BD {
    //contruindo o 'ID', se ele não existe
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    //pega o proximo id
    getProximoiD(){
        let proximoId = localStorage.getItem('id'); //começando em 0
        return parseInt(proximoId) + 1 // será o id atual
    }
    
    gravar(d) {
        //1p - identificação do dado que queremos armazenar
        //2p - o proprio dado que queremos armazenar - PRECISA ser em formato JSON
        //possui id - identificador único, o que quer dizer que uma despesa atribuida ao mesmo ide sobrepoe ele
        
        //pega o id atual
        let id = this.getProximoiD();

        //vai cadastrar no id especificado
        localStorage.setItem('dado_' + id, JSON.stringify(d));

        //atualizar o valor do id
        localStorage.setItem('id', id)

    }
}

let bd = new BD();

function cadastrarDespesa() {
    //seleciona os ids
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //recupera os valores, e armazena
    let despesa = new Despesa(
        ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value
    );

    //chama a classe para gravar em localStorage
    bd.gravar(despesa); //envia um objeto
}



