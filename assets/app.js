(function () {
  "use strict";

  /* ====== CONFIGURAÇÃO (edite aqui) ====== */
  const WA_NUMBER = "5541991271247";
  const EMAIL = "administracaonetto@gmail.com";
  const WA_HELLO = "Olá! Vim pelo site da Nex Imperium e gostaria de fazer um orçamento.";

  const FILTERS = [
    ["all", "Todos"], ["dev", "Desenvolvimento"], ["plg", "Plugins"], ["dig", "Digitais"], ["srv", "Serviços"]
  ];
  const TAGS = { dev: "Desenvolvimento", plg: "Plugin", dig: "Digital", srv: "Serviço" };

  const CATALOG = [
    { cat: "dev", ico: "🤖", title: "Bot para Discord", text: "Moderação, tickets, economia, música, boas-vindas e comandos personalizados.", order: "Bot para Discord" },
    { cat: "dev", ico: "🌐", title: "Site personalizado", text: "Landing pages, portfólios e sites institucionais responsivos e rápidos.", order: "Site" },
    { cat: "dev", ico: "⛏️", title: "Servidor de Minecraft", text: "Configuração completa: modos de jogo, lobby, ranks, economia e otimização.", order: "Servidor de Minecraft" },
    { cat: "plg", ico: "🧩", title: "Plugin sob medida", text: "Plugins para Spigot/Paper feitos exatamente do jeito que o seu servidor precisa.", order: "Plugin de Minecraft" },
    { cat: "plg", ico: "💰", title: "Pacote de plugins", text: "Escolha vários plugins prontos (economia, clãs, kits...) e receba tudo configurado.", order: "Plugin de Minecraft" },
    { cat: "dig", ico: "📊", title: "Planilhas e modelos", text: "Planilhas, templates e modelos prontos para organizar seu projeto ou negócio.", order: "Produto digital" },
    { cat: "dig", ico: "🎨", title: "Recursos gráficos", text: "Banners, logos, ícones e artes para Discord, redes sociais e servidores.", order: "Produto digital" },
    { cat: "srv", ico: "🔧", title: "Instalação e configuração", text: "Deixamos bots, sites e plugins instalados e funcionando no seu ambiente.", order: "Serviço extra" },
    { cat: "srv", ico: "🛟", title: "Manutenção e suporte", text: "Correção de bugs, atualizações e acompanhamento dos seus projetos.", order: "Serviço extra" },
    { cat: "srv", ico: "🚚", title: "Migração e personalização", text: "Mudança de hospedagem, ajustes visuais e novas funções em projetos existentes.", order: "Serviço extra" }
  ];

  const PLUGINS = ["Economia", "Clãs / Guildas", "Lobby e Hub", "Kits", "Ranks e permissões", "Homes e Warps", "Chat personalizado", "Anti-spam", "Scoreboard", "Loja (GUI)"];

  /* ====== utilidades ====== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const waLink = (t) => "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
  }

  /* ====== WhatsApp com mensagem pronta ====== */
  ["waFoot", "waFloat"].forEach((id) => { const a = $("#" + id); if (a) a.href = waLink(WA_HELLO); });
  $("#year").textContent = new Date().getFullYear();

  /* ====== menu ====== */
  const burger = $("#burger"), menu = $("#menu"), nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#menu a").forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    $("#progress").style.width = (p * 100) + "%";
  }, { passive: true });

  const links = $$("#menu a");
  const secObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id], footer[id]").forEach((s) => secObs.observe(s));

  /* ====== efeito de digitação ====== */
  const words = ["bots para Discord", "sites profissionais", "plugins de Minecraft", "produtos digitais", "soluções sob medida"];
  const typedEl = $("#typed");
  if (!reduced) {
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      typedEl.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
      if (del && c === 0) { del = false; w = (w + 1) % words.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    })();
  }

  /* ====== catálogo ====== */
  const catalogEl = $("#catalog"), filtersEl = $("#filters");

  FILTERS.forEach(([key, label], i) => {
    const b = document.createElement("button");
    b.className = "filter" + (i === 0 ? " on" : "");
    b.type = "button";
    b.textContent = label;
    b.addEventListener("click", () => {
      $$(".filter", filtersEl).forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      $$(".card", catalogEl).forEach((card) => card.classList.toggle("hide", key !== "all" && card.dataset.cat !== key));
    });
    filtersEl.appendChild(b);
  });

  CATALOG.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card reveal";
    card.dataset.cat = item.cat;

    const ico = document.createElement("div"); ico.className = "ico"; ico.textContent = item.ico;
    const tag = document.createElement("span"); tag.className = "tag " + item.cat; tag.textContent = TAGS[item.cat];
    const h3 = document.createElement("h3"); h3.textContent = item.title;
    const p = document.createElement("p"); p.textContent = item.text;
    const price = document.createElement("div"); price.className = "price"; price.textContent = "Sob orçamento";
    const btn = document.createElement("button"); btn.className = "btn-sm"; btn.type = "button"; btn.textContent = "Pedir";

    btn.addEventListener("click", () => {
      $("#fTipo").value = item.order;
      $("#fTipo").dispatchEvent(new Event("change"));
      $("#fTitulo").value = item.title;
      $("#pedido").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      setTimeout(() => $("#fNome").focus({ preventScroll: true }), 600);
      toast("Pedido iniciado: " + item.title);
    });

    card.append(ico, tag, h3, p, price, btn);
    catalogEl.appendChild(card);
  });

  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card || reduced) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", (x * 100) + "%");
    card.style.setProperty("--my", (y * 100) + "%");
    card.style.setProperty("--ry", ((x - .5) * 8) + "deg");
    card.style.setProperty("--rx", ((.5 - y) * 8) + "deg");
  });
  document.addEventListener("pointerout", (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (card) { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); }
  });

  /* ====== formulário ====== */
  const chips = $("#chips"), pluginBox = $("#pluginBox"), tipo = $("#fTipo");
  PLUGINS.forEach((name) => {
    const l = document.createElement("label"); l.className = "chip";
    const i = document.createElement("input"); i.type = "checkbox"; i.value = name;
    const s = document.createElement("span"); s.textContent = name;
    l.append(i, s); chips.appendChild(l);
  });
  tipo.addEventListener("change", () => { pluginBox.hidden = tipo.value !== "Plugin de Minecraft"; });

  function validate() {
    let ok = true;
    ["fNome", "fTipo", "fTitulo", "fDesc"].forEach((id) => {
      const el = $("#" + id);
      const bad = !el.value.trim();
      el.classList.toggle("bad", bad);
      if (bad) ok = false;
    });
    if (!ok) toast("Preencha os campos obrigatórios (*)");
    return ok;
  }
  ["fNome", "fTipo", "fTitulo", "fDesc"].forEach((id) => $("#" + id).addEventListener("input", (e) => e.target.classList.remove("bad")));

  function buildMessage() {
    const plugins = $$("#chips input:checked").map((i) => i.value);
    const lines = [
      "Olá! Vim pelo site da Nex Imperium e quero fazer um pedido.",
      "",
      "*Nome:* " + $("#fNome").value.trim(),
      "*Tipo de projeto:* " + tipo.value,
      "*Pedido:* " + $("#fTitulo").value.trim()
    ];
    if (plugins.length) lines.push("*Plugins:* " + plugins.join(", "));
    lines.push("*Descrição:* " + $("#fDesc").value.trim());
    const extra = $("#fExtra").value.trim();
    if (extra) lines.push("*Informações adicionais:* " + extra);
    return lines.join("\n");
  }

  $("#sendWa").addEventListener("click", () => {
    if (!validate()) return;
    window.open(waLink(buildMessage()), "_blank", "noopener");
    toast("Abrindo o WhatsApp com sua mensagem...");
  });

  $("#sendMail").addEventListener("click", () => {
    if (!validate()) return;
    const subject = "Pedido: " + $("#fTitulo").value.trim() + " (" + tipo.value + ")";
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(buildMessage());
    toast("Abrindo seu e-mail...");
  });

  /* ====== revelar ao rolar ====== */
  const revObs = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); } });
  }, { threshold: .12 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; revObs.observe(el); });

  /* ====== partículas ====== */
  const cv = $("#stars"), ctx = cv.getContext("2d");
  let W, H, pts = [];
  function resize() {
    W = cv.width = window.innerWidth; H = cv.height = window.innerHeight;
    const n = Math.min(70, Math.floor(W * H / 22000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.fillStyle = "rgba(167,139,250,.8)";
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.strokeStyle = "rgba(34,211,238," + (.18 * (1 - d / 120)) + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    });
    requestAnimationFrame(frame);
  }
  if (!reduced) { resize(); window.addEventListener("resize", resize); frame(); }
})();
