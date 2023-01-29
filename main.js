// variavel p/ armazer contas
let contas = 
[
    {
        nome: 'Thais Bertoldo',
        cpf: '999.999.999.99',
        celular: '(99) 99999-9999',
        senha: '1',
        conta: 1674333795439,
        saldo: 0,
    },
];

// obter formulário p/ add evento
const formulario = document.getElementById('form-cadastro')

//função para exercutar envio do formulário
const enviarFormulario = (Event) => {
    //evitar comportamento padrão do evento submit do form
    Event.preventDefault()

    //ober os campos de senha p/ validar se são iguais
    const senha = Event.target.senha.value
    const confirmacaoSenha = Event.target.confirmacaoSenha.value

    if(senha !== confirmacaoSenha) {
        alert('senhas divergentes');
        return;
    }

    //add a conta array
    const nome = Event.target.nome.value;
    const cpf = Event.target.cpf.value;
    const celular = Event.target.celular.value;
    const conta = new Date().getTime();
    const saldo = 0;

    const contaCriada = {
        conta,
        nome,
        cpf,
        celular,
        senha,
        saldo,
    }
    contas.push(contaCriada);
    
};

// vincular função ao evento
formulario.addEventListener('submit', enviarFormulario);

//operações
//
const formOperacao = document.getElementById('form-operacao')

// Função de saque
const sacar = (conta, valor) => {
    // Verifica se o valor é maior que 0
    if (valor > 0) {
      // Verifica se tem saldo disponível
    if (conta.saldo >= valor) {
        const novoSaldo = conta.saldo - valor;
        conta.saldo = novoSaldo;
        
        alert(`Saque efetuado com sucesso! Novo saldo: ${novoSaldo}`);
        return;
    }

    alert('Saldo insuficiente');
    return;
    }

    alert('Não foi possível efetuar o saque.');
};

//função depositar
const depositar = (conta, valor) => {
    if(valor > 0){
        const novoSaldo = conta.saldo + valor
        conta.saldo = novoSaldo;

        alert(`Deposito efetuado com sucesso! novo saldo: ${novoSaldo}`)
        return;
    }
    alert('não foi possivel efetuar o depósito.')
};

//função consulta saldo
const consultarSaldo = (conta) => {
    alert(`Saldo atual: ${conta.saldo}`);
};

// enviar formulário de operação
const enviarFormularioOperacao = (Event) => {
    Event.preventDefault()

    //obter valor digitado
    const conta = parseInt(Event.target.conta.value);
    const operacao = Event.target.operacao.value;
    const valor = parseFloat(Event.target.valor.value);
    const senha = Event.target.senhaOperacao.value;

    //obter conta e senha
    const contaAtual = contas.find((elemento) => elemento.conta === conta)

    if (!contaAtual) {
        alert('conta invalida');
        return;
    }

    if (contaAtual.senha !== senha) {
        alert("senha invalida");
        return;
    }

    switch (operacao) {
        case 'saque':
            sacar(contaAtual, valor)
            break;
        case 'deposito':
            depositar(contaAtual, valor);
            break;
        case 'saldo':
            consultarSaldo(contaAtual)
            break;
        default:
            alert('operacao inválida');
            break;
    }
};
//vincular função ao evento submit do form operação;
formOperacao.addEventListener('submit', enviarFormularioOperacao);

//Desabilitaar/Habilitar campo de valor

// Obter select para adicionar evento de onchange
const operacao = document.getElementById('operacao');
operacao.addEventListener('change', (event) => {
  //Obter o campo de valor do html
    const inputValor = document.getElementById('valor');

  // Verifica se o valor selecionado é saldo
    if (event.target.value === 'saldo') {
    // Desabilitar o campo
    inputValor.disabled = true;
    // Limpa o valor digitado
    inputValor.value = '';
    return;
    }

  // Habilita o campo quando a operação for diferente de saldo
    inputValor.disabled = false;
});