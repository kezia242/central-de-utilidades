function calcularPrecoFinal(precoOriginal, percentualDesconto) {
  const valorDesconto = precoOriginal * (percentualDesconto / 100);
  return precoOriginal - valorDesconto;
}

function calcularValorParcela(valorTotal, quantidadeParcelas) {
  return valorTotal / quantidadeParcelas;
}

function simularInvestimento(inicial, aporteMensal, taxaMensalPct, meses) {
  let saldo = inicial;
  const taxaDecimal = taxaMensalPct / 100;

  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo + saldo * taxaDecimal;
    saldo = saldo + aporteMensal;
  }

  const totalInvestido = inicial + aporteMensal * meses;
  const rendimentoObtido = saldo - totalInvestido;

  return {
    saldoFinal: saldo,
    totalInvestido: totalInvestido,
    rendimentoObtido: rendimentoObtido
  };
}

function calcularTotalDespesas(listaDespesas) {
  let total = 0;
  for (const item of listaDespesas) {
    total += item.valor;
  }
  return total;
}

function calcularDivisao(totalDespesas, quantidadePessoas) {
  return totalDespesas / quantidadePessoas;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostrarErro(elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.classList.add("visivel");
}

function limparErro(elemento) {
  elemento.textContent = "";
  elemento.classList.remove("visivel");
}

const secoes = {
  inicio: document.getElementById("inicio"),
  ferramentas: document.getElementById("ferramentas"),
  sobre: document.getElementById("sobre")
};

const linksNav = {
  inicio: document.getElementById("nav-inicio"),
  ferramentas: document.getElementById("nav-ferramentas"),
  sobre: document.getElementById("nav-sobre")
};

const paineisFerramenta = {
  desconto: document.getElementById("ferramenta-desconto"),
  parcelas: document.getElementById("ferramenta-parcelas"),
  investimentos: document.getElementById("ferramenta-investimentos"),
  despesas: document.getElementById("ferramenta-despesas")
};

const botoesAba = document.querySelectorAll(".aba");

function navegarPara(nomeSecao) {
  Object.keys(secoes).forEach((chave) => {
    secoes[chave].classList.toggle("ativa", chave === nomeSecao);
    linksNav[chave].classList.toggle("ativo", chave === nomeSecao);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selecionarFerramenta(nomeFerramenta) {
  navegarPara("ferramentas");

  Object.keys(paineisFerramenta).forEach((chave) => {
    paineisFerramenta[chave].classList.toggle("ativa", chave === nomeFerramenta);
  });

  botoesAba.forEach((aba) => {
    aba.classList.toggle("ativa", aba.dataset.ferramenta === nomeFerramenta);
  });
}

linksNav.inicio.addEventListener("click", (e) => {
  e.preventDefault();
  navegarPara("inicio");
});

linksNav.ferramentas.addEventListener("click", (e) => {
  e.preventDefault();
  selecionarFerramenta("desconto");
});

linksNav.sobre.addEventListener("click", (e) => {
  e.preventDefault();
  navegarPara("sobre");
});

document.getElementById("btn-ir-ferramentas").addEventListener("click", () => {
  selecionarFerramenta("desconto");
});

document.getElementById("btn-voltar-inicio").addEventListener("click", () => {
  navegarPara("inicio");
});

document.querySelectorAll(".btn-card").forEach((botao) => {
  botao.addEventListener("click", () => {
    selecionarFerramenta(botao.dataset.abrir);
  });
});

botoesAba.forEach((aba) => {
  aba.addEventListener("click", () => {
    selecionarFerramenta(aba.dataset.ferramenta);
  });
});

const formDesconto = document.getElementById("form-desconto");
const erroDesconto = document.getElementById("erro-desconto");
const resultadoDesconto = document.getElementById("resultado-desconto");

formDesconto.addEventListener("submit", (e) => {
  e.preventDefault();
  limparErro(erroDesconto);

  const preco = Number(document.getElementById("preco-original").value);
  const desconto = Number(document.getElementById("percentual-desconto").value);

  if (Number.isNaN(preco) || preco <= 0) {
    mostrarErro(erroDesconto, "Informe um preço original maior que R$ 0,00.");
    return;
  }

  if (Number.isNaN(desconto) || desconto < 0 || desconto > 100) {
    mostrarErro(erroDesconto, "Informe um percentual de desconto entre 0% e 100%.");
    return;
  }

  const precoFinal = calcularPrecoFinal(preco, desconto);
  const valorEconomizado = preco - precoFinal;

  resultadoDesconto.innerHTML = `
    <div class="resultado-topo">
      <span class="check">&#10003;</span>
      <h3>Resultado</h3>
    </div>
    <div class="linha-resultado">
      <span>Preço original:</span>
      <strong>${formatarMoeda(preco)}</strong>
    </div>
    <div class="linha-resultado">
      <span>Desconto (${desconto}%):</span>
      <strong>${formatarMoeda(valorEconomizado)}</strong>
    </div>
    <div class="linha-resultado destaque-resultado">
      <span>Preço final:</span>
      <strong>${formatarMoeda(precoFinal)}</strong>
    </div>
  `;
});

const formParcelas = document.getElementById("form-parcelas");
const erroParcelas = document.getElementById("erro-parcelas");
const resultadoParcelas = document.getElementById("resultado-parcelas");

formParcelas.addEventListener("submit", (e) => {
  e.preventDefault();
  limparErro(erroParcelas);

  const valorTotal = Number(document.getElementById("valor-total-compra").value);
  const parcelas = Number(document.getElementById("quantidade-parcelas").value);

  if (Number.isNaN(valorTotal) || valorTotal <= 0) {
    mostrarErro(erroParcelas, "Informe um valor total da compra maior que R$ 0,00.");
    return;
  }

  if (!Number.isInteger(parcelas) || parcelas <= 0) {
    mostrarErro(erroParcelas, "Quantidade de parcelas inválida! Informe um número inteiro maior que 0.");
    return;
  }

  const valorParcela = calcularValorParcela(valorTotal, parcelas);

  resultadoParcelas.innerHTML = `
    <div class="resultado-topo">
      <span class="check">&#10003;</span>
      <h3>Resultado</h3>
    </div>
    <div class="linha-resultado">
      <span>Valor total:</span>
      <strong>${formatarMoeda(valorTotal)}</strong>
    </div>
    <div class="linha-resultado">
      <span>Quantidade de parcelas:</span>
      <strong>${parcelas}x sem juros</strong>
    </div>
    <div class="linha-resultado destaque-resultado">
      <span>Valor de cada parcela:</span>
      <strong>${formatarMoeda(valorParcela)}</strong>
    </div>
  `;
});

const formInvestimentos = document.getElementById("form-investimentos");
const erroInvestimentos = document.getElementById("erro-investimentos");
const resultadoInvestimentos = document.getElementById("resultado-investimentos");

formInvestimentos.addEventListener("submit", (e) => {
  e.preventDefault();
  limparErro(erroInvestimentos);

  const inicial = Number(document.getElementById("investimento-inicial").value);
  const aporte = Number(document.getElementById("aporte-mensal").value);
  const taxa = Number(document.getElementById("taxa-mensal").value);
  const meses = Number(document.getElementById("periodo-meses").value);

  if (Number.isNaN(inicial) || inicial < 0) {
    mostrarErro(erroInvestimentos, "Informe um investimento inicial válido (0 ou maior).");
    return;
  }

  if (Number.isNaN(aporte) || aporte < 0) {
    mostrarErro(erroInvestimentos, "Informe um aporte mensal válido (0 ou maior).");
    return;
  }

  if (Number.isNaN(taxa) || taxa < 0) {
    mostrarErro(erroInvestimentos, "Informe uma taxa de rendimento mensal válida (0 ou maior).");
    return;
  }

  if (!Number.isInteger(meses) || meses <= 0) {
    mostrarErro(erroInvestimentos, "Informe um período em meses inteiro e maior que 0.");
    return;
  }

  const simulacao = simularInvestimento(inicial, aporte, taxa, meses);

  resultadoInvestimentos.innerHTML = `
    <div class="resultado-topo">
      <span class="check">&#10003;</span>
      <h3>Resultado da Simulação</h3>
    </div>
    <div class="linha-resultado destaque-resultado">
      <span>Saldo final:</span>
      <strong>${formatarMoeda(simulacao.saldoFinal)}</strong>
    </div>
    <div class="linha-resultado">
      <span>Total investido:</span>
      <strong>${formatarMoeda(simulacao.totalInvestido)}</strong>
    </div>
    <div class="linha-resultado">
      <span>Rendimento obtido:</span>
      <strong>${formatarMoeda(simulacao.rendimentoObtido)}</strong>
    </div>
    <div class="detalhamento-box">
      <strong>Resumo dos parâmetros:</strong>
      <div>Investimento inicial: ${formatarMoeda(inicial)}</div>
      <div>Aportes (${meses} ${meses === 1 ? "mês" : "meses"}): ${formatarMoeda(aporte * meses)}</div>
      <div>Taxa de rendimento: ${taxa.toFixed(2)}% ao mês</div>
    </div>
  `;
});

let despesas = [];

const formAdicionarDespesa = document.getElementById("form-adicionar-despesa");
const inputDescricaoDespesa = document.getElementById("descricao-despesa");
const inputValorDespesa = document.getElementById("valor-despesa");
const listaDespesasEl = document.getElementById("lista-despesas");
const inputQuantidadePessoas = document.getElementById("quantidade-pessoas");
const btnDividirDespesas = document.getElementById("btn-dividir-despesas");
const erroDespesas = document.getElementById("erro-despesas");
const resultadoDespesas = document.getElementById("resultado-despesas");

function renderizarListaDespesas() {
  listaDespesasEl.innerHTML = "";

  if (despesas.length === 0) {
    listaDespesasEl.innerHTML = '<li class="lista-vazia">Nenhuma despesa adicionada ainda.</li>';
    return;
  }

  despesas.forEach((despesa, index) => {
    const li = document.createElement("li");
    li.className = "item-despesa";
    li.innerHTML = `
      <span><strong>${despesa.descricao}</strong> — ${formatarMoeda(despesa.valor)}</span>
      <button type="button" class="btn-remover" data-index="${index}">Remover</button>
    `;
    listaDespesasEl.appendChild(li);
  });

  listaDespesasEl.querySelectorAll(".btn-remover").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      despesas.splice(idx, 1);
      renderizarListaDespesas();
      atualizarDivisaoDespesas(false);
    });
  });
}

function atualizarDivisaoDespesas(exigirPessoas = true) {
  limparErro(erroDespesas);

  const pessoas = Number(inputQuantidadePessoas.value);
  const total = calcularTotalDespesas(despesas);

  if (despesas.length === 0) {
    resultadoDespesas.innerHTML = `
      <div class="resultado-topo">
        <span class="check">&#10003;</span>
        <h3>Resultado</h3>
      </div>
      <p class="placeholder-resultado">Adicione pelo menos uma despesa para calcular.</p>
    `;
    return;
  }

  if (!Number.isInteger(pessoas) || pessoas <= 0) {
    if (exigirPessoas) {
      mostrarErro(erroDespesas, "Informe uma quantidade de pessoas válida (número inteiro maior que 0).");
    }
    return;
  }

  const valorPorPessoa = calcularDivisao(total, pessoas);
  const itensHtml = despesas
    .map((d) => `<li>${d.descricao}: ${formatarMoeda(d.valor)}</li>`)
    .join("");

  resultadoDespesas.innerHTML = `
    <div class="resultado-topo">
      <span class="check">&#10003;</span>
      <h3>Resultado</h3>
    </div>
    <div class="linha-resultado">
      <span>Total das despesas:</span>
      <strong>${formatarMoeda(total)}</strong>
    </div>
    <div class="linha-resultado">
      <span>Quantidade de pessoas:</span>
      <strong>${pessoas}</strong>
    </div>
    <div class="linha-resultado destaque-resultado">
      <span>Valor por pessoa:</span>
      <strong>${formatarMoeda(valorPorPessoa)}</strong>
    </div>
    <div class="detalhamento-box">
      <strong>Detalhamento das despesas:</strong>
      <ul>${itensHtml}</ul>
    </div>
  `;
}

formAdicionarDespesa.addEventListener("submit", (e) => {
  e.preventDefault();
  limparErro(erroDespesas);

  const descricao = inputDescricaoDespesa.value.trim();
  const valor = Number(inputValorDespesa.value);

  if (!descricao) {
    mostrarErro(erroDespesas, "Informe uma descrição para a despesa.");
    return;
  }

  if (Number.isNaN(valor) || valor <= 0) {
    mostrarErro(erroDespesas, "Informe um valor de despesa maior que R$ 0,00.");
    return;
  }

  despesas.push({ descricao, valor });
  inputDescricaoDespesa.value = "";
  inputValorDespesa.value = "";
  inputDescricaoDespesa.focus();

  renderizarListaDespesas();
  atualizarDivisaoDespesas(false);
});

btnDividirDespesas.addEventListener("click", () => {
  atualizarDivisaoDespesas(true);
});

inputQuantidadePessoas.addEventListener("change", () => {
  atualizarDivisaoDespesas(false);
});

function executarModoPromptAlert() {
  const escolha = prompt(
    "CENTRAL DE UTILIDADES (Modo Prompt/Alert)\n" +
    "1 - Calculadora de Descontos\n" +
    "2 - Calculadora de Parcelas\n" +
    "3 - Simulador de Investimentos\n" +
    "4 - Divisor de Despesas (digite 0 para encerrar)"
  );

  switch (escolha) {
    case "1": {
      const preco = Number(prompt("Preço original (R$):"));
      const desc = Number(prompt("Desconto (%):"));
      if (Number.isNaN(preco) || preco <= 0 || Number.isNaN(desc) || desc < 0 || desc > 100) {
        alert("Dados inválidos.");
        return;
      }
      const finalPreco = calcularPrecoFinal(preco, desc);
      alert(
        "Preço original: " + formatarMoeda(preco) +
        "\nEconomia: " + formatarMoeda(preco - finalPreco) +
        "\nPreço final: " + formatarMoeda(finalPreco)
      );
      break;
    }
    case "2": {
      const total = Number(prompt("Valor total da compra (R$):"));
      const qtd = Number(prompt("Quantidade de parcelas:"));
      if (Number.isNaN(total) || total <= 0 || !Number.isInteger(qtd) || qtd <= 0) {
        alert("Dados ou quantidade de parcelas inválidos.");
        return;
      }
      alert("Valor de cada parcela: " + formatarMoeda(calcularValorParcela(total, qtd)));
      break;
    }
    case "3": {
      const inicial = Number(prompt("Investimento inicial (R$):"));
      const aporte = Number(prompt("Aporte mensal (R$):"));
      const taxa = Number(prompt("Taxa mensal (%):"));
      const meses = Number(prompt("Período (meses):"));
      if (
        Number.isNaN(inicial) || inicial < 0 ||
        Number.isNaN(aporte) || aporte < 0 ||
        Number.isNaN(taxa) || taxa < 0 ||
        !Number.isInteger(meses) || meses <= 0
      ) {
        alert("Dados inválidos.");
        return;
      }
      const res = simularInvestimento(inicial, aporte, taxa, meses);
      alert(
        "Saldo final: " + formatarMoeda(res.saldoFinal) +
        "\nTotal investido: " + formatarMoeda(res.totalInvestido) +
        "\nRendimento: " + formatarMoeda(res.rendimentoObtido)
      );
      break;
    }
    case "4": {
      let soma = 0;
      let valor = 0;
      do {
        const entrada = prompt("Valor da despesa (0 para encerrar):");
        if (entrada === null) return;
        valor = Number(entrada);
        if (Number.isNaN(valor) || valor < 0) {
          alert("Valor inválido.");
          valor = -1;
        } else if (valor > 0) {
          soma += valor;
        }
      } while (valor !== 0);

      const pessoas = Number(prompt("Quantidade de pessoas:"));
      if (soma <= 0 || !Number.isInteger(pessoas) || pessoas <= 0) {
        alert("Valores ou quantidade de pessoas inválidos.");
        return;
      }
      alert("Total: " + formatarMoeda(soma) + "\nValor por pessoa: " + formatarMoeda(calcularDivisao(soma, pessoas)));
      break;
    }
    default:
      alert("Opção cancelada ou inválida.");
  }
}

document.getElementById("btn-modo-prompt").addEventListener("click", executarModoPromptAlert);