$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99");
});

function validaCPF() {
  const cpfFormatado = document.getElementById("cpf").value;
  const cpf = limpaFormatacao(cpfFormatado);
  if (cpf.length !== 11) {
    mostrarResultado("CPF deve conter 11 dígitos.", "red");
    limparResultadoAposTempo();
    return false;
  }
  if (verificarDigitosRepetidos(cpf)) {
    mostrarResultado("CPF não pode conter repetição de dígitos.", "red");
    limparResultadoAposTempo();
    return false;
  }
  const digitoVerificador1 = calcularDigitoVerificador(cpf, 1);
  const digitoVerificador2 = calcularDigitoVerificador(cpf, 2);
  if (digitoVerificador1 && digitoVerificador2) {
    mostrarResultado(`CPF Válido - ${cpfFormatado}`, "green");
  } else {
    mostrarResultado(`CPF Inválido - ${cpfFormatado}`, "red");
  }
  limparResultadoAposTempo();
}

function calcularDigitoVerificador(cpf, posicao) {
  cpf = limpaFormatacao(cpf);
  const sequencia = cpf.slice(0, 8 + posicao).split("");
  let soma = 0;
  let multiplicador = 9 + posicao;
  for (const numero of sequencia) {
    soma += multiplicador * Number(numero);
    multiplicador--;
  }
  const restoDivisao = (soma * 10) % 11;
  const digito = cpf.slice(8 + posicao, 9 + posicao);
  return restoDivisao == digito;
}

function limpaFormatacao(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return cpf;
}

function mostrarResultado(texto, cor) {
  const span = document.getElementById("resultado");
  span.innerHTML = texto;
  span.style.color = cor;
}

function verificarDigitosRepetidos(cpf) {
  return cpf.split("").every((d) => d === cpf[0]);
}

function limparResultadoAposTempo() {
  setTimeout(function () {
    limparResultado();
  }, 2000); // 2 segundos (2000 milissegundos)
}

function limparResultado() {
  const span = document.getElementById("resultado");
  span.innerHTML = "";
}
