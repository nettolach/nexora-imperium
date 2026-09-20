"use strict";

/* ============================================================
   Utilitários
   ============================================================ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));
const norm = (t) => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 5000);
}

/* ============================================================
   Mensagem do pedido
   ============================================================ */
function montarMensagem(titulo, linhas) {
  const corpo = linhas
    .filter((l) => l.valor && String(l.valor).trim())
    .map((l) => `*${l.rotulo}:* ${String(l.valor).trim()}`)
    .join("\n");
  return `Olá! Vim pelo site da ${CONFIG.nomeEmpresa} e gostaria de fazer uma solicitação.\n\n*${titulo}*\n${corpo}`;
}

/* ============================================================
   Canais de atendimento
   ============================================================ */
function contatosWhats() {
  return (CONFIG.whatsappContatos || []).filter(
    (c) => String(c.numero || "").replace(/\D/g, "")
  );
}

function discordDisponivel() {
  return Boolean(CONFIG.discordAtivo) && Boolean((CONFIG.discordLink || "").trim());
}

// prefixo: texto antes do nome do canal (ex.: "Enviar pelo ")
function botoesAtendimentoHTML(prefixo) {
  const html = [];
  if (discordDisponivel()) {
    html.push(`<button type="button" class="btn btn-discord" data-canal="discord">${esc(prefixo)}Discord</button>`);
  }
  contatosWhats().forEach((c, i) => {
    html.push(`<button type="button" class="btn btn-whats" data-canal="whats" data-i="${i}">${esc(prefixo)}WhatsApp — ${esc(c.nome)}</button>`);
  });
  return html.join("");
}

/* ============================================================
   Modal de escolha do atendimento
   ============================================================ */
let mensagemAtual = "";

function abrirModal(titulo, mensagem) {
  mensagemAtual = mensagem;
  $("#modal-titulo").textContent = titulo;
  $("#modal-resumo").textContent = mensagem;

  const botoes = botoesAtendimentoHTML("Enviar pelo ");
  $("#modal-btns").innerHTML = botoes ||
    '<p class="vazio">Nenhum canal de atendimento configurado. Edite js/config.js.</p>';

  $("#modal-nota").textContent = discordDisponivel()
    ? "No Discord, a mensagem é copiada para você colar no atendimento por ticket. No WhatsApp, ela já vai preenchida com os dados do pedido."
    : "No WhatsApp, a mensagem já vai preenchida com os dados do pedido.";

  $("#modal").classList.add("open");
  document.body.classList.add("no-scroll");
}

function fecharModal() {
  $("#modal").classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function copiarFallback(texto) {
  const ta = document.createElement("textarea");
  ta.value = texto;
  ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  ta.remove();
  return ok;
}

function copiarTexto(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(texto).then(() => true).catch(() => copiarFallback(texto));
  }
  return Promise.resolve(copiarFallback(texto));
}

function enviarDiscord() {
  if (!discordDisponivel()) {
    toast("O atendimento pelo Discord não está disponível no momento.");
    return;
  }
  const copia = copiarTexto(mensagemAtual);
  window.open(CONFIG.discordLink.trim(), "_blank", "noopener");
  copia.then((ok) => toast(
    ok ? "Mensagem copiada! Cole no atendimento por ticket do Discord."
       : "Abra o atendimento no Discord e escreva o seu pedido."
  ));
}

function enviarWhatsApp(indice) {
  const contato = contatosWhats()[indice];
  if (!contato) {
    toast("Contato de WhatsApp não encontrado.");
    return;
  }
  const numero = String(contato.numero).replace(/\D/g, "");
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagemAtual)}`;
  window.open(url, "_blank", "noopener");
}

function iniciarModal() {
  $("#modal-fechar").addEventListener("click", fecharModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") fecharModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharModal(); });

  // Botões de canal (modal e rodapé)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-canal]");
    if (!btn) return;
    if (btn.closest("#footer-btns")) {
      mensagemAtual = `Olá! Vim pelo site da ${CONFIG.nomeEmpresa} e gostaria de mais informações.`;
    }
    if (btn.dataset.canal === "discord") enviarDiscord();
    else enviarWhatsApp(Number(btn.dataset.i));
  });
}

/* ============================================================
   Identidade, rodapé e menu
   ============================================================ */
function listaDeNomes(nomes) {
  return nomes.join(", ").replace(/, ([^,]*)$/, " e $1");
}

function aplicarIdentidade() {
  const nome = (CONFIG.nomeEmpresa || "Empresa").trim();
  document.title = nome + " | Produtos digitais e serviços de programação";
  $("#brand-nome").textContent = nome;
  $("#footer-nome").textContent = nome;
  $("#hero-slogan").textContent = CONFIG.slogan || "";
  $("#ano").textContent = new Date().getFullYear();

  const logo = $("#brand-logo");
  if (CONFIG.logo) {
    logo.innerHTML = `<img src="${esc(CONFIG.logo)}" alt="Logo ${esc(nome)}">`;
  } else {
    logo.textContent = nome.charAt(0).toUpperCase();
  }

  // Rodapé: donos e botões de contato
  const contatos = contatosWhats();
  $("#footer-contato").textContent = contatos.length
    ? "Atendimento direto com " + listaDeNomes(contatos.map((c) => c.nome)) + "."
    : "Atendimento em breve.";
  $("#footer-btns").innerHTML = botoesAtendimentoHTML("");
}

function iniciarMenu() {
  const btn = $("#menu-btn");
  const nav = $("#nav");
  btn.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(aberto));
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }));
}

/* ============================================================
   Catálogo (categorias, produtos e serviços)
   ============================================================ */
function cardHTML(chave, item, i) {
  const visual = item.imagem
    ? `<img src="${esc(item.imagem)}" alt="${esc(item.nome)}" loading="lazy">`
    : esc(item.icone || "💠");
  return `
    <article class="card reveal" data-nome="${esc(norm(item.nome))}">
      <div class="card-icon">${visual}</div>
      <h3>${esc(item.nome)}</h3>
      <p>${esc(item.descricao)}</p>
      <button type="button" class="btn btn-primary" data-solicitar="${chave}|${i}">Solicitar atendimento</button>
    </article>`;
}

function renderCatalogo() {
  ["desenvolvimento", "digitais", "servicos"].forEach((chave) => {
    $("#grid-" + chave).innerHTML = CATALOGO[chave].itens
      .map((item, i) => cardHTML(chave, item, i)).join("");
  });

  const icones = { desenvolvimento: "💻", digitais: "🗃️", servicos: "🔧" };
  $("#grid-categorias").innerHTML = Object.keys(CATALOGO).map((chave) => {
    const c = CATALOGO[chave];
    return `
      <a class="card reveal" href="#${chave}">
        <div class="card-icon">${icones[chave]}</div>
        <h3>${esc(c.titulo)}</h3>
        <p>${esc(c.resumo)}</p>
        <span class="cat-qtd">${c.itens.length} itens →</span>
      </a>`;
  }).join("");
}

function iniciarSolicitacoes() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-solicitar]");
    if (!btn) return;
    const [chave, i] = btn.dataset.solicitar.split("|");
    const grupo = CATALOGO[chave];
    const item = grupo && grupo.itens[Number(i)];
    if (!item) return;
    abrirModal("Solicitar atendimento", montarMensagem("Solicitação de atendimento", [
      { rotulo: "Categoria", valor: grupo.titulo },
      { rotulo: "Item", valor: item.nome }
    ]));
  });
}

function iniciarFiltros() {
  $$("[data-filtro]").forEach((input) => {
    input.addEventListener("input", () => {
      const chave = input.dataset.filtro;
      const termo = norm(input.value.trim());
      let visiveis = 0;
      $$("#grid-" + chave + " .card").forEach((card) => {
        const ok = card.dataset.nome.includes(termo);
        card.hidden = !ok;
        if (ok) visiveis++;
      });
      $("#vazio-" + chave).hidden = visiveis > 0;
    });
  });
}

/* ============================================================
   Validação e campos dinâmicos
   ============================================================ */
function validar(form) {
  $$("input, select, textarea", form).forEach((el) => el.setCustomValidity(""));
  $$("[required]", form).forEach((el) => {
    if (!el.value.trim()) el.setCustomValidity("Preencha este campo.");
  });
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
}

function campoHTML(c, prefixo) {
  const id = `${prefixo}-${c.id}`;
  const req = c.obrigatorio ? "required" : "";
  const marca = c.obrigatorio
    ? ' <span class="req">*</span>'
    : ' <span class="opc">(opcional)</span>';
  const ph = c.placeholder ? `placeholder="${esc(c.placeholder)}"` : "";
  let input;
  if (c.tipo === "textarea") {
    input = `<textarea id="${id}" rows="4" ${req} ${ph}></textarea>`;
  } else if (c.tipo === "select") {
    const ops = (c.opcoes || []).map((o) => `<option>${esc(o)}</option>`).join("");
    input = `<select id="${id}" ${req}><option value="">Selecione...</option>${ops}</select>`;
  } else {
    input = `<input type="text" id="${id}" ${req} ${ph}>`;
  }
  return `<div class="campo"><label for="${id}">${esc(c.rotulo)}${marca}</label>${input}</div>`;
}

/* ============================================================
   Pedido de desenvolvimento
   ============================================================ */
function iniciarPedidoDev() {
  const select = $("#dev-tipo");
  select.innerHTML = '<option value="">Selecione...</option>' +
    Object.keys(FORMULARIOS).map((k) => `<option value="${k}">${esc(FORMULARIOS[k].titulo)}</option>`).join("");

  select.addEventListener("change", () => {
    const f = FORMULARIOS[select.value];
    $("#dev-campos").innerHTML = f ? f.campos.map((c) => campoHTML(c, "dev")).join("") : "";
  });

  $("#form-dev").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validar(form)) return;
    const f = FORMULARIOS[select.value];
    const linhas = [{ rotulo: "Tipo de projeto", valor: f.titulo }].concat(
      f.campos.map((c) => ({ rotulo: c.rotulo, valor: $("#dev-" + c.id).value }))
    );
    abrirModal("Como deseja enviar o pedido?", montarMensagem("Pedido de desenvolvimento", linhas));
  });
}

/* ============================================================
   Pedido de plugins
   ============================================================ */
const pluginsSel = []; // índices de PLUGINS_DISPONIVEIS

function renderPlugins() {
  const lista = $("#plugins-disponiveis");
  const check = $("#plugin-custom-check");

  if (!PLUGINS_DISPONIVEIS.length) {
    lista.innerHTML = '<p class="vazio">Nenhum plugin cadastrado na lista ainda. Use a opção de pedido personalizado abaixo para descrever o plugin que você deseja.</p>';
    check.checked = true;
    check.disabled = true;
  } else {
    lista.innerHTML = PLUGINS_DISPONIVEIS.map((p, i) => `
      <button type="button" class="plugin-opt ${pluginsSel.includes(i) ? "on" : ""}" data-plugin="${i}" aria-pressed="${pluginsSel.includes(i)}">
        <strong>${esc(p.nome)}</strong>
        <span>${esc(p.descricao || "")}</span>
      </button>`).join("");
  }

  const sel = $("#plugins-selecionados");
  sel.innerHTML = pluginsSel.length
    ? pluginsSel.map((i) => `<li><span>${esc(PLUGINS_DISPONIVEIS[i].nome)}</span><button type="button" data-remover="${i}">Remover</button></li>`).join("")
    : '<li class="vazio-li">Nenhum plugin selecionado.</li>';

  atualizarPluginCustom();
}

function atualizarPluginCustom() {
  const marcado = $("#plugin-custom-check").checked;
  $("#plugin-custom-box").hidden = !marcado;
  $("#plugin-custom-desc").required = marcado;
}

function iniciarPedidoPlugins() {
  const form = $("#form-plugins");

  form.addEventListener("click", (e) => {
    const opt = e.target.closest("[data-plugin]");
    const rem = e.target.closest("[data-remover]");
    if (opt) {
      const i = Number(opt.dataset.plugin);
      const pos = pluginsSel.indexOf(i);
      if (pos >= 0) pluginsSel.splice(pos, 1); else pluginsSel.push(i);
      renderPlugins();
    } else if (rem) {
      const pos = pluginsSel.indexOf(Number(rem.dataset.remover));
      if (pos >= 0) pluginsSel.splice(pos, 1);
      renderPlugins();
    }
  });

  $("#plugin-custom-check").addEventListener("change", atualizarPluginCustom);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const custom = $("#plugin-custom-check").checked;
    if (!pluginsSel.length && !custom) {
      toast("Selecione ao menos um plugin ou marque a opção de pedido personalizado.");
      return;
    }
    if (!validar(form)) return;

    const nomes = pluginsSel.map((i) => PLUGINS_DISPONIVEIS[i].nome).join(", ");
    abrirModal("Como deseja enviar o pedido?", montarMensagem("Pedido de plugins de Minecraft", [
      { rotulo: "Plugins selecionados", valor: nomes },
      { rotulo: "Detalhes adicionais", valor: $("#plugins-detalhes").value },
      { rotulo: "Plugin personalizado", valor: custom ? $("#plugin-custom-desc").value : "" }
    ]));
  });
}

/* ============================================================
   Pedido personalizado
   ============================================================ */
function iniciarPedidoCustom() {
  $("#form-custom").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validar(form)) return;
    abrirModal("Como deseja enviar o pedido?", montarMensagem("Pedido Personalizado", [
      { rotulo: "Nome do pedido", valor: $("#cp-nome").value },
      { rotulo: "Categoria", valor: $("#cp-categoria").value },
      { rotulo: "Descrição", valor: $("#cp-desc").value },
      { rotulo: "Informações adicionais", valor: $("#cp-extra").value }
    ]));
  });
}

/* ============================================================
   Animação de entrada
   ============================================================ */
function iniciarReveal() {
  const els = $$(".reveal:not(.visivel)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visivel"));
    return;
  }
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visivel");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach((el) => io.observe(el));
}

/* ============================================================
   Inicialização
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  aplicarIdentidade();
  iniciarMenu();
  renderCatalogo();
  iniciarSolicitacoes();
  iniciarFiltros();
  iniciarPedidoDev();
  renderPlugins();
  iniciarPedidoPlugins();
  iniciarPedidoCustom();
  iniciarModal();
  iniciarReveal();
});
