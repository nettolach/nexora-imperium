// ============================================================
//  DADOS DO SITE
//  Para alterar textos, ícones ou incluir imagem, edite aqui.
//  "imagem" é opcional: ex. "img/bot.png". Vazio = usa o ícone.
// ============================================================

const CATALOGO = {
  desenvolvimento: {
    titulo: "Desenvolvimento e programação",
    resumo: "Bots, sites, plugins e servidores de Minecraft feitos sob medida.",
    itens: [
      { nome: "Bots personalizados para Discord", icone: "🤖", imagem: "", descricao: "Bots sob medida para o seu servidor, com os comandos e recursos que você precisar." },
      { nome: "Sites personalizados", icone: "🌐", imagem: "", descricao: "Sites desenvolvidos de acordo com a sua ideia, com layout responsivo." },
      { nome: "Grupos para criação de plugins", icone: "🧩", imagem: "", descricao: "Solicite a criação de plugins para o seu projeto, escolhendo da lista ou descrevendo o que deseja." },
      { nome: "Servidores de Minecraft", icone: "⛏️", imagem: "", descricao: "Criação de servidores de Minecraft de acordo com o estilo e os recursos que você deseja." }
    ]
  },

  digitais: {
    titulo: "Produtos digitais",
    resumo: "Templates, planilhas, modelos, conteúdos e recursos gráficos.",
    itens: [
      { nome: "Templates de portfólios", icone: "🎨", imagem: "", descricao: "Modelos prontos para apresentar seus trabalhos de forma profissional." },
      { nome: "Templates para Notion", icone: "🗂️", imagem: "", descricao: "Estruturas prontas para organizar projetos, estudos e rotinas no Notion." },
      { nome: "Planilhas financeiras", icone: "💰", imagem: "", descricao: "Planilhas para acompanhar receitas, despesas e o controle financeiro." },
      { nome: "Planilhas de estoque", icone: "📦", imagem: "", descricao: "Planilhas para controlar a entrada, a saída e a quantidade de produtos." },
      { nome: "Planilhas de vendas", icone: "📈", imagem: "", descricao: "Planilhas para registrar e acompanhar suas vendas." },
      { nome: "Planilhas de organização", icone: "🗓️", imagem: "", descricao: "Planilhas para organizar tarefas, metas e atividades." },
      { nome: "Modelos de contratos", icone: "📝", imagem: "", descricao: "Modelos editáveis de contratos para adaptar às suas necessidades." },
      { nome: "Modelos de propostas comerciais", icone: "🤝", imagem: "", descricao: "Modelos para apresentar propostas comerciais de forma clara e profissional." },
      { nome: "Modelos de orçamentos", icone: "🧾", imagem: "", descricao: "Modelos editáveis para montar e apresentar orçamentos." },
      { nome: "Documentações técnicas", icone: "📚", imagem: "", descricao: "Documentos técnicos para descrever e explicar projetos e sistemas." },
      { nome: "Guias de instalação", icone: "🛠️", imagem: "", descricao: "Guias passo a passo para instalar e configurar." },
      { nome: "Tutoriais de programação", icone: "👨‍💻", imagem: "", descricao: "Conteúdos que ensinam programação de forma prática." },
      { nome: "E-books de programação", icone: "📖", imagem: "", descricao: "Livros digitais sobre programação para estudar no seu ritmo." },
      { nome: "Pacotes de ícones", icone: "✨", imagem: "", descricao: "Conjuntos de ícones para usar em sites, aplicativos e projetos." },
      { nome: "Packs de texturas autorais", icone: "🧱", imagem: "", descricao: "Texturas autorais para dar identidade visual aos seus projetos." },
      { nome: "Packs de recursos gráficos", icone: "🖼️", imagem: "", descricao: "Conjuntos de elementos gráficos para usar nos seus projetos." },
      { nome: "Modelos de apresentações", icone: "📊", imagem: "", descricao: "Modelos de apresentações prontos para editar e usar." },
      { nome: "Templates de currículos", icone: "📄", imagem: "", descricao: "Modelos de currículos editáveis e organizados." },
      { nome: "Templates de certificados", icone: "🏅", imagem: "", descricao: "Modelos de certificados editáveis para personalizar." },
      { nome: "Pacotes de arquivos editáveis", icone: "📁", imagem: "", descricao: "Pacotes com arquivos editáveis para você adaptar aos seus projetos." }
    ]
  },

  servicos: {
    titulo: "Serviços extras",
    resumo: "Instalação, manutenção, personalização, migração e consultoria.",
    itens: [
      { nome: "Instalação de bots", icone: "⚙️", imagem: "", descricao: "Instalação de bots para você começar a usar sem dor de cabeça." },
      { nome: "Instalação de plugins", icone: "🔌", imagem: "", descricao: "Instalação de plugins no seu servidor." },
      { nome: "Configuração de servidores", icone: "🖥️", imagem: "", descricao: "Configuração de servidores conforme a sua necessidade." },
      { nome: "Hospedagem e configuração de sites", icone: "☁️", imagem: "", descricao: "Colocamos o seu site no ar e deixamos tudo configurado." },
      { nome: "Manutenção de sites", icone: "🧰", imagem: "", descricao: "Manutenção para manter o seu site funcionando corretamente." },
      { nome: "Manutenção de bots", icone: "🛡️", imagem: "", descricao: "Manutenção para manter o seu bot estável e funcionando." },
      { nome: "Manutenção de plugins", icone: "🔧", imagem: "", descricao: "Manutenção para manter os seus plugins funcionando corretamente." },
      { nome: "Correção de bugs", icone: "🐞", imagem: "", descricao: "Encontramos e corrigimos erros em bots, sites, plugins e sistemas." },
      { nome: "Atualização de sistemas", icone: "🔄", imagem: "", descricao: "Atualização de sistemas para mantê-los em dia." },
      { nome: "Personalização de scripts", icone: "📜", imagem: "", descricao: "Adaptamos scripts para fazerem o que você precisa." },
      { nome: "Personalização de bots", icone: "🎛️", imagem: "", descricao: "Ajustes e novos recursos para o seu bot." },
      { nome: "Personalização de plugins", icone: "🧬", imagem: "", descricao: "Ajustes e modificações nos seus plugins." },
      { nome: "Personalização de sites", icone: "🖌️", imagem: "", descricao: "Ajustes de visual e funcionamento no seu site." },
      { nome: "Migração de sites", icone: "🚚", imagem: "", descricao: "Levamos o seu site para outro local com segurança." },
      { nome: "Migração de servidores", icone: "🔀", imagem: "", descricao: "Migração do seu servidor para outro ambiente." },
      { nome: "Criação de bancos de dados", icone: "🗄️", imagem: "", descricao: "Criação e estruturação de bancos de dados para o seu projeto." },
      { nome: "Configuração de APIs", icone: "🔗", imagem: "", descricao: "Configuração de APIs para o seu projeto." },
      { nome: "Integração com sistemas externos", icone: "🧭", imagem: "", descricao: "Conectamos o seu projeto a outros sistemas." },
      { nome: "Consultoria de programação", icone: "💡", imagem: "", descricao: "Orientação técnica para tirar dúvidas e definir o melhor caminho." },
      { nome: "Desenvolvimento de projetos completos", icone: "🚀", imagem: "", descricao: "Desenvolvimento de projetos do início ao fim, conforme a sua necessidade." }
    ]
  }
};

// ------------------------------------------------------------
//  Formulários do pedido de desenvolvimento (um por tipo).
//  tipo do campo: "text", "textarea" ou "select" (com "opcoes").
// ------------------------------------------------------------
const FORMULARIOS = {
  bot: {
    titulo: "Bot personalizado para Discord",
    campos: [
      { id: "nomeBot", rotulo: "Nome do bot", tipo: "text", obrigatorio: false },
      { id: "funcoes", rotulo: "Funcionalidades desejadas", tipo: "textarea", obrigatorio: true, placeholder: "Descreva o que o bot deve fazer." },
      { id: "comandos", rotulo: "Tipo de comandos (slash, prefixo ou ambos)", tipo: "text", obrigatorio: false },
      { id: "prazo", rotulo: "Prazo desejado", tipo: "text", obrigatorio: false },
      { id: "extra", rotulo: "Informações adicionais", tipo: "textarea", obrigatorio: false }
    ]
  },
  site: {
    titulo: "Site personalizado",
    campos: [
      { id: "tipoSite", rotulo: "Tipo de site desejado", tipo: "text", obrigatorio: true },
      { id: "paginas", rotulo: "Páginas e seções desejadas", tipo: "textarea", obrigatorio: true },
      { id: "referencias", rotulo: "Sites de referência (links ou nomes)", tipo: "text", obrigatorio: false },
      { id: "hospedagem", rotulo: "Você já possui domínio/hospedagem?", tipo: "select", obrigatorio: false, opcoes: ["Sim", "Não", "Não sei"] },
      { id: "prazo", rotulo: "Prazo desejado", tipo: "text", obrigatorio: false },
      { id: "extra", rotulo: "Informações adicionais", tipo: "textarea", obrigatorio: false }
    ]
  },
  plugins: {
    titulo: "Grupo para criação de plugins",
    campos: [
      { id: "versao", rotulo: "Versão do Minecraft", tipo: "text", obrigatorio: false },
      { id: "plataforma", rotulo: "Plataforma do servidor (se souber)", tipo: "text", obrigatorio: false },
      { id: "descricao", rotulo: "O que o(s) plugin(s) deve(m) fazer", tipo: "textarea", obrigatorio: true },
      { id: "prazo", rotulo: "Prazo desejado", tipo: "text", obrigatorio: false },
      { id: "extra", rotulo: "Informações adicionais", tipo: "textarea", obrigatorio: false }
    ]
  },
  minecraft: {
    titulo: "Servidor de Minecraft",
    campos: [
      { id: "modalidade", rotulo: "Tipo/modalidade do servidor", tipo: "text", obrigatorio: true },
      { id: "versao", rotulo: "Versão do Minecraft", tipo: "text", obrigatorio: false },
      { id: "jogadores", rotulo: "Quantidade estimada de jogadores", tipo: "text", obrigatorio: false },
      { id: "recursos", rotulo: "Recursos e configurações desejados", tipo: "textarea", obrigatorio: true },
      { id: "prazo", rotulo: "Prazo desejado", tipo: "text", obrigatorio: false },
      { id: "extra", rotulo: "Informações adicionais", tipo: "textarea", obrigatorio: false }
    ]
  }
};

// ------------------------------------------------------------
//  Plugins disponíveis para escolha (comece vazio e adicione os reais).
//  Formato de cada item:
//    { nome: "Nome do plugin", descricao: "Descrição curta" },
// ------------------------------------------------------------
const PLUGINS_DISPONIVEIS = [
];
