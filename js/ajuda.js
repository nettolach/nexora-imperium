"use strict";
// ============================================================
//  ÁREA DE AJUDA — seção de FAQ na página + widget de chat
//  "NEX Ajudante". Não é inteligência artificial: ele procura,
//  nas perguntas frequentes de ajuda-dados.js, a que mais
//  combina com o que foi digitado.
// ============================================================

const PALAVRAS_IGNORADAS = new Set([
  "que", "como", "qual", "quais", "quando", "onde", "porque", "por", "para",
  "com", "sem", "uma", "um", "umas", "uns", "voce", "voces", "sua", "seu",
  "suas", "seus", "tem", "sao", "meu", "minha", "isso", "aqui", "ai", "la",
  "esse", "essa", "esses", "essas", "este", "esta", "estes", "estas",
  "pode", "posso", "da", "do", "de", "em", "no", "na", "nos", "nas", "ao",
  "aos", "as", "os", "e", "ou", "se", "eu", "tu", "ele", "ela", "nao", "sim",
  "vendem", "tipo", "tudo", "algo", "coisa", "sobre"
]);

function normalizarTexto(t) {
  return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, " ");
}

function resolverResposta(item) {
  return typeof item.resposta === "function" ? item.resposta(CONFIG) : item.resposta;
}

function encontrarMelhorResposta(textoDigitado) {
  const entrada = normalizarTexto(textoDigitado);
  if (!entrada.trim()) return null;
  let melhor = null, melhorPontuacao = 0;

  PERGUNTAS_FREQUENTES.forEach((item) => {
    let pontuacao = 0;
    const termos = [normalizarTexto(item.pergunta), ...item.chaves.map(normalizarTexto)];

    termos.forEach((termo) => {
      if (!termo) return;
      if (termo.includes(" ") && entrada.includes(termo)) {
        pontuacao += termo.split(" ").length * 2;
        return;
      }
      termo.split(" ").forEach((palavra) => {
        if (palavra.length >= 4 && !PALAVRAS_IGNORADAS.has(palavra) && entrada.includes(palavra)) {
          pontuacao += 1.5;
        }
      });
    });

    if (pontuacao > melhorPontuacao) { melhorPontuacao = pontuacao; melhor = item; }
  });

  return melhorPontuacao >= 1.5 ? melhor : null;
}

/* ---------------- Seção de FAQ visível na página ---------------- */
function renderizarSecaoFAQ() {
  const lista = document.getElementById("ajuda-faq-lista");
  if (!lista) return;
  lista.innerHTML = PERGUNTAS_FREQUENTES.map((item, i) => `
    <div class="ajuda-faq-item">
      <button type="button" class="ajuda-faq-pergunta" data-faq="${i}" aria-expanded="false">
        <span>${item.pergunta}</span>
        <span class="ajuda-faq-seta">+</span>
      </button>
      <div class="ajuda-faq-resposta" id="ajuda-faq-resposta-${i}" hidden>
        <p>${resolverResposta(item)}</p>
      </div>
    </div>
  `).join("");

  lista.querySelectorAll(".ajuda-faq-pergunta").forEach((botao) => {
    botao.addEventListener("click", () => {
      const resposta = document.getElementById("ajuda-faq-resposta-" + botao.dataset.faq);
      const aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      resposta.hidden = aberto;
      botao.querySelector(".ajuda-faq-seta").textContent = aberto ? "+" : "–";
    });
  });
}

/* ---------------- Widget flutuante "NEX Ajudante" ---------------- */
function montarWidget() {
  const botaoAbrir = document.createElement("button");
  botaoAbrir.type = "button";
  botaoAbrir.className = "nex-ajuda-botao";
  botaoAbrir.innerHTML = `<span class="nex-ajuda-botao-icone">N</span><span class="nex-ajuda-botao-texto">Precisa de ajuda?</span>`;

  const painel = document.createElement("div");
  painel.className = "nex-ajuda-painel";
  painel.innerHTML = `
    <div class="nex-ajuda-cabecalho">
      <div>
        <strong>NEX Ajudante</strong>
        <span class="nex-ajuda-status">Respostas automáticas</span>
      </div>
      <button type="button" class="nex-ajuda-fechar" aria-label="Fechar">✕</button>
    </div>
    <div class="nex-ajuda-mensagens" id="nex-ajuda-mensagens" role="log" aria-live="polite"></div>
    <div class="nex-ajuda-sugestoes-bloco">
      <button type="button" class="nex-ajuda-sugestoes-toggle" id="nex-ajuda-sugestoes-toggle" aria-expanded="true">
        Todas as perguntas <span>▲</span>
      </button>
      <div class="nex-ajuda-sugestoes" id="nex-ajuda-sugestoes"></div>
    </div>
    <form class="nex-ajuda-form" id="nex-ajuda-form">
      <input type="text" id="nex-ajuda-input" placeholder="Digite sua pergunta..." autocomplete="off">
      <button type="submit" aria-label="Enviar">➤</button>
    </form>
  `;

  document.body.appendChild(botaoAbrir);
  document.body.appendChild(painel);

  const mensagens = painel.querySelector("#nex-ajuda-mensagens");
  const sugestoesEl = painel.querySelector("#nex-ajuda-sugestoes");
  const sugestoesToggle = painel.querySelector("#nex-ajuda-sugestoes-toggle");
  const form = painel.querySelector("#nex-ajuda-form");
  const input = painel.querySelector("#nex-ajuda-input");

  function adicionarMensagem(quem, texto) {
    const linha = document.createElement("div");
    linha.className = "nex-ajuda-linha " + (quem === "nex" ? "nex-ajuda-linha-nex" : "nex-ajuda-linha-cliente");

    if (quem === "nex") {
      const avatar = document.createElement("span");
      avatar.className = "nex-ajuda-avatar";
      avatar.textContent = "N";
      linha.appendChild(avatar);
    }

    const bolha = document.createElement("div");
    bolha.className = "nex-ajuda-bolha " + (quem === "nex" ? "nex-ajuda-bolha-nex" : "nex-ajuda-bolha-cliente");
    bolha.textContent = texto;
    linha.appendChild(bolha);

    mensagens.appendChild(linha);
    mensagens.scrollTop = mensagens.scrollHeight;
  }

  // Mostra TODAS as perguntas cadastradas como sugestão, não só algumas.
  function renderizarSugestoes() {
    sugestoesEl.innerHTML = PERGUNTAS_FREQUENTES.map((item, i) =>
      `<button type="button" class="nex-ajuda-chip" data-chip="${i}">${item.pergunta}</button>`
    ).join("");
    sugestoesEl.querySelectorAll("[data-chip]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const item = PERGUNTAS_FREQUENTES[Number(chip.dataset.chip)];
        processarPergunta(item.pergunta);
      });
    });
  }

  sugestoesToggle.addEventListener("click", () => {
    const aberto = sugestoesToggle.getAttribute("aria-expanded") === "true";
    sugestoesToggle.setAttribute("aria-expanded", String(!aberto));
    sugestoesEl.hidden = aberto;
    sugestoesToggle.querySelector("span").textContent = aberto ? "▼" : "▲";
  });

  function textoContatoFallback() {
    const contatos = (CONFIG.whatsappContatos || []).filter((c) => String(c.numero || "").replace(/\D/g, ""));
    if (!contatos.length) return "Fale diretamente com a gente pelo WhatsApp.";
    const nomes = contatos.map((c) => c.cargo ? `${c.nome} (${c.cargo})` : c.nome).join(" ou ");
    return `Não encontrei uma resposta pronta pra isso. Fala direto com ${nomes} pelo WhatsApp (tem botão no rodapé do site) que te ajudam certinho!`;
  }

  function processarPergunta(texto) {
    if (!texto || !texto.trim()) return;
    adicionarMensagem("cliente", texto.trim());
    const item = encontrarMelhorResposta(texto);
    setTimeout(() => {
      adicionarMensagem("nex", item ? resolverResposta(item) : textoContatoFallback());
    }, 350);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value;
    input.value = "";
    processarPergunta(texto);
  });

  botaoAbrir.addEventListener("click", () => {
    painel.classList.add("on");
    botaoAbrir.classList.add("escondido");
    if (!mensagens.childElementCount) {
      adicionarMensagem("nex", "Oi! Eu sou o NEX Ajudante. Pode perguntar sobre pedidos, pagamento, prazos, plugins ou qualquer coisa do site — ou escolher uma das perguntas abaixo.");
      renderizarSugestoes();
    }
    input.focus();
  });

  painel.querySelector(".nex-ajuda-fechar").addEventListener("click", () => {
    painel.classList.remove("on");
    botaoAbrir.classList.remove("escondido");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarSecaoFAQ();
  montarWidget();
});
