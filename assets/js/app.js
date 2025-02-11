class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        //for ... in percorre todas as chaves de um objeto
        for (let i in this){
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            } 
        }
        return true
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
    getProximoiD() {
        let proximoId = localStorage.getItem('id');
    
        if (!proximoId || isNaN(proximoId)) {
            localStorage.setItem('id', 0); // Garante que começa do 0 caso esteja inválido
            return 1;
        }
        return parseInt(proximoId) + 1;
    }
    
    gravar(d) {
        //1p - identificação do dado que queremos armazenar
        //2p - o proprio dado que queremos armazenar - PRECISA ser em formato JSON
        //possui id - identificador único, o que quer dizer que uma despesa atribuida ao mesmo ide sobrepoe ele
        
        //pega o id atual
        let id = this.getProximoiD();

        //atualizar o valor do id
        localStorage.setItem('id', id)

        //vai cadastrar no id especificado
        localStorage.setItem(id, JSON.stringify(d));
    }

    recuperarTodosRegistros() {
       
        let despesas = Array();

        let id = parseInt(localStorage.getItem('id')) || 0;;

        //recupera todas as despesas em localStorage
        for (let i = 1; i <= id; i++) {
            //recupera a despesa
            let despesa = JSON.parse(localStorage.getItem(i));

            if (despesa != null) {
                despesas.push(despesa)
            }
        }

        return despesas;
    }

    pesquisar(despesa) {

        //declarando um array
        let despesasFiltradas = Array()
        
        //selecionando todos os intem do localStorage e atribuindo a uum array
        despesasFiltradas = this.recuperarTodosRegistros();

        //filtro ano 
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //filtro mes
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //filtro tipo
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //filtro descricao
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        } 

        //filtro valor
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        // Se não encontrou nada, retorna null
        if (despesasFiltradas.length === 0) {
            return null;
        }

        return despesasFiltradas
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

    let modalTitulo = document.getElementById('modalTitulo');
    let modalTexto = document.getElementById('modalTexto');

    if (despesa.validarDados()) {
        //sucesso
        //chama a classe para gravar em localStorage
        bd.gravar(despesa); //envia um objeto

        //mensagem
        modalTitulo.innerHTML = "SUCESSO! ✅";
        modalTexto.innerHTML = "Seus dados foram salvos com sucesso";
        modalTitulo.style.color = "green";
        voltarCorrigir.style.display = "none"; // Esconde o botão "Voltar e corrigir"
        continuar.style.display = "block"; // Exibe o botão "Continuar"
        continuar.style.backgroundColor = "green";

        // Limpa os campos de entrada
        document.getElementById('ano').value = "";
        document.getElementById('mes').value = "";
        document.getElementById('dia').value = "";
        document.getElementById('tipo').value = "";
        document.getElementById('descricao').value = "";
        document.getElementById('valor').value = "";
    } else {
        //erro
        modalTitulo.innerHTML = "ERRO! ❌";
        modalTexto.innerHTML = "Verifique se todos os campos foram preenchidos corretamente";
        modalTitulo.style.color = "red";  
        voltarCorrigir.style.display = "block"; // Esconde o botão "Voltar e corrigir"
        continuar.style.display = "none"; // Exibe o botão "Continuar"
        voltarCorrigir.style.backgroundColor = "red";
    }

    modal.style.display = "block"; // Exibe o modal

}

//configurando modal
let modal = document.getElementById('meuModal');
let btn = document.getElementById('abrirModal');
let span = document.getElementsByClassName('fechar')[0];
let voltarCorrigir = document.getElementById('voltarCorrigir');
let continuar = document.getElementById('continuar');

if (modal) {
    if (span) {
        span.onclick = () => modal.style.display = "none";
    }
    if (voltarCorrigir) {
        voltarCorrigir.onclick = () => modal.style.display = "none";
    }
    if (continuar) {
        continuar.onclick = () => modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

if (btn) {
    btn.onclick = function() {
        cadastrarDespesa();
    }
}

//executa a função toda vez que recarregar a página
function carregarListaDesesas(despesas = Array(), filtro = false) {
    
    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

    if (!Array.isArray(despesas)) {
        despesas = [];
    }

    let listaDespesas = document.getElementById('listaDespesas');
    
    if (listaDespesas) {
        listaDespesas.innerHTML =  '';
    }

    if (!listaDespesas) return; // Se a tabela não existe, não executa

    despesas.forEach(d => {
        //inserindo as linhas 
        let linha = listaDespesas.insertRow();

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        let tipos = {
            '1': 'Alimentação',
            '2': 'Educação',
            '3': 'Lazer',
            '4': 'Saúde',
            '5': 'Transporte'
        };

        linha.insertCell(1).innerHTML = tipos[d.tipo] || 'Outro';
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = `R$ ${parseFloat(d.valor).toFixed(2)}`;

    });
};

window.onload = function() {
    carregarListaDesesas();
}

function pesquisarDespesa() {
        //seleciona os ids
        let ano = document.getElementById('ano').value
        let mes = document.getElementById('mes').value
        let dia = document.getElementById('dia').value
        let tipo = document.getElementById('tipo').value
        let descricao = document.getElementById('descricao').value
        let valor = document.getElementById('valor').value

        let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

        let despesas = bd.pesquisar(despesa)

        if (despesas === null) {
            let listaDespesas = document.getElementById('listaDespesas');
            listaDespesas.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;"><i class="fa-solid fa-magnifying-glass"></i> Nenhuma despesa encontrada</td></tr>';
        } else {
            carregarListaDesesas(despesas);
        }
}

//função para recuperar infomações ao clicar no botao pesquisar
pesquisar = document.getElementById('pesquisar')

pesquisar.onclick = function() {
    pesquisarDespesa()
}



