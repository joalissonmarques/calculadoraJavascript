const previousOperationText = document.getElementById('previous-operation')
const currentOperationText = document.getElementById('current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

/* Queremos que o objeto tem um padrão */
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    /* Esses são valores que são impressos na tela */
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    /* Aqui será quando o usuario tiver digitando no momento */
    this.currentOperation = ''
  }
  /* Adiciona digitos */
  addDigit(digit) {
    /* Aqui vamos adicionar o digito e fazer com que ele apareça no visor*/
    /* Checar se a operação atual já tem um ponto, e com includes, saber se já tem o ponto */
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return
    }
    this.currentOperation = digit
    this.updateScren()
  }

  /* Operações da calculadora */
  processOperation(operation) {
    /* Fazer uma checagem se o currentvalue é vazio*/
    if (this.currentOperationText.innerText === '' && operation !== "C") {
      /* checagem para mudar operação */
      if (this.previousOperationText.innerText !== '') {
        /* Somente para mudar a operação */
        this.changeOperation(operation)
      }
      return
    }
    //pegar vamos atuais e valores anteriores para fazer a operação e tranformamos em number
    let operationValue
    /* Utilizamos o split para separar o texto do espaço, operatiovValue + operation*/
    const previous = +this.previousOperationText.innerText.split(' ')[0]
    const current = +this.currentOperationText.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.updateScren(operationValue, operation, current, previous)
        break
      case '-':
        operationValue = previous - current
        this.updateScren(operationValue, operation, current, previous)
        break
      case '/':
        operationValue = previous / current
        this.updateScren(operationValue, operation, current, previous)
        break
      case '*':
        operationValue = previous * current
        this.updateScren(operationValue, operation, current, previous)
        break
      case 'DEL':
        this.processDelOperator()
        break
      case 'CE':
        this.processClearCurrentOperatino();
        break
        case 'C':
          this.processClearAll();
        break
        case '=':
          this.processEqualOperator();
        break
      default:
        return
    }
  }

  /* Mudanças de valores para visor, vai pegar os valores digitados, novos e atuais, fazer o update no visor*/
  updateScren(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    /* Estamos adicionando valores na current */
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      /* chegar se valor é zero, se for, ele adiciona o valor */
      if (previous === 0) {
        operationValue = current
      }
      /* Jogando o valor lá de baixo para cima, no previous: valor da operação + operação*/
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      /* Depois que foi acrescentado a operação, aqui vamos zerar ela para ser adicionado novos valores */
      this.currentOperationText.innerText = ''
    }
  }

  /* Mudança de operações, se for incluir mais alguma operação, terá que incluir aqui para assim a calculadora fazer a troca de operações sem ter bugs*/
  changeOperation(operation) {
    const mathOperations = ['*', '/', '+', '-']
    if (!mathOperations.includes(operation)) {
      return
    } /* slice para remover o ultimo caractere que é a operação e vamos colocar o operation novamente, sendo novo operador e efetuando a troca */
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation
  }
  /* Operação de deletar o ultimo digito */
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }
  /* Limpa todas as operações e valores da parte de baixo */
  processClearCurrentOperatino() {
    this.currentOperationText.innerText = "";
  }
  /* Limpar todas as operações */
  processClearAll() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  /* Sinal de igual */
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(' ')[1]

    this.processOperation(operation)
  }
}

/* Aqui estamos instanciando o objeto */
const calc = new Calculator(previousOperationText, currentOperationText)

/*Utilizamos value quando é input, pois pegamos o valor, como aqui é texto, temos que pegar pelo innerText, com target para poder pegar o valor aplicado */

/* Aqui estamos dando um forEach, para pecorrer todos os dados, logo em seguida, vamos pegar cada valor por click. */
buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const value = e.target.innerText

    /* Todos os botões são string, por isso devemos converter para number colocando o + */
    /* Aqui iremos saber se o usuario digitou um numero ou operações */
    if (+value >= 0 || value === '.') {
      /* Estamos instanciando o objeto calc, adicionando a função addDigit e pegando o value que foi transformado em number */
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
      /* Trabalhando com as operações */
    }
  })
})
