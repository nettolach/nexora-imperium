// ============================================================
//  BASE DE PERGUNTAS FREQUENTES — "NEX Ajudante"
//  Edite aqui pra adicionar, mudar ou remover perguntas.
// ============================================================
const PERGUNTAS_FREQUENTES = [
  {
    id: "pagamento-forma",
    pergunta: "Onde e como o pagamento é realizado?",
    chaves: ["pagamento", "pagar", "pix", "forma de pagamento", "como pago"],
    resposta: "O pagamento é combinado diretamente no atendimento — pelo WhatsApp do Netto ou do Jhonatas (e pelo Discord, quando estiver ativo). Pode ser feito por Pix ou outra forma combinada com quem te atender. As conversas pelo WhatsApp já são protegidas por criptografia de ponta a ponta; de qualquer forma, por segurança, vale guardar um print do que foi combinado."
  },
  {
    id: "pagamento-valor",
    pergunta: "Quanto custa um pedido?",
    chaves: ["quanto custa", "valor", "preco", "orcamento", "quanto fica", "quanto sai"],
    resposta: "Os valores não são fixos — cada pedido é orçado individualmente, de acordo com o que você precisa (tamanho, complexidade, prazo etc.). Pra saber quanto fica o seu, é só mandar os detalhes pelo WhatsApp e pedir um orçamento."
  },
  {
    id: "adiantado",
    pergunta: "Preciso pagar adiantado?",
    chaves: ["adiantado", "antecipado", "pagar antes", "sinal", "metade agora"],
    resposta: "Isso é combinado caso a caso, diretamente no atendimento. Fale com o Netto ou o Jhonatas pra alinhar certinho antes de começar o projeto."
  },
  {
    id: "desconto",
    pergunta: "Tem desconto pra pedidos maiores ou em quantidade?",
    chaves: ["desconto", "promocao", "pacote de servicos"],
    resposta: "Isso pode ser conversado diretamente no atendimento, dependendo do pedido."
  },
  {
    id: "como-pedir",
    pergunta: "Como eu faço um pedido?",
    chaves: ["como pedir", "fazer pedido", "encomendar", "como comprar", "como contratar"],
    resposta: "Escolha o produto ou serviço em qualquer seção do site e clique em 'Solicitar atendimento' — ou preencha um dos formulários (Pedido de Desenvolvimento, Plugins ou Pedido Personalizado). Na hora de enviar, você escolhe se prefere falar pelo WhatsApp ou pelo Discord."
  },
  {
    id: "diferenca-formularios",
    pergunta: "Qual a diferença entre o Pedido de Desenvolvimento e o Pedido Personalizado?",
    chaves: ["diferenca entre pedido", "pedido de desenvolvimento ou personalizado"],
    resposta: "O Pedido de Desenvolvimento é pra bot, site, grupo de plugins ou servidor de Minecraft, com um formulário específico pra cada um. Já o Pedido Personalizado é pra qualquer outra ideia que não se encaixe nessas opções, ou pra descrever tudo em texto livre."
  },
  {
    id: "apos-envio",
    pergunta: "O que acontece depois que eu envio o pedido?",
    chaves: ["depois que envio", "o que acontece depois", "proximo passo"],
    resposta: "Você escolhe enviar pelo WhatsApp ou pelo Discord, e a conversa continua por lá — é ali que são combinados os detalhes, o prazo e o pagamento."
  },
  {
    id: "conta-cadastro",
    pergunta: "Preciso criar conta ou fazer login?",
    chaves: ["conta", "cadastro", "login", "registrar", "criar conta"],
    resposta: "Não. O site não tem sistema de login nem cadastro. É só escolher o que você precisa e enviar o pedido — o atendimento acontece pelo WhatsApp ou Discord."
  },
  {
    id: "carrinho",
    pergunta: "O site tem carrinho de compras ou pagamento automático?",
    chaves: ["carrinho", "pagamento automatico", "compra automatica", "checkout"],
    resposta: "Não. O site não processa pagamentos nem tem carrinho de compras. Toda venda é combinada diretamente com o Netto ou o Jhonatas, no atendimento."
  },
  {
    id: "prazo",
    pergunta: "Qual é o prazo de entrega?",
    chaves: ["prazo de entrega", "demora quanto tempo", "tempo de entrega", "quando fica pronto"],
    resposta: "O prazo varia de acordo com o tipo e a complexidade do pedido, e é combinado diretamente no atendimento. Nos formulários de pedido tem um campo pra você já informar o prazo que gostaria."
  },
  {
    id: "cancelar-alterar",
    pergunta: "Dá pra cancelar ou mudar um pedido depois de enviado?",
    chaves: ["cancelar pedido", "mudar pedido", "alterar pedido", "desistir do pedido"],
    resposta: "Dá sim — é só avisar direto no atendimento (WhatsApp ou Discord) o quanto antes, pra alinhar certinho o que pode ser ajustado."
  },
  {
    id: "acompanhar-pedido",
    pergunta: "Dá pra acompanhar o andamento do meu pedido?",
    chaves: ["acompanhar pedido", "andamento do pedido", "status do pedido"],
    resposta: "O acompanhamento é feito direto na conversa do WhatsApp ou Discord com quem está te atendendo."
  },
  {
    id: "revisao-ajuste",
    pergunta: "Dá pra pedir uma revisão ou ajuste depois de pronto?",
    chaves: ["revisao", "ajuste depois", "mudar depois de pronto"],
    resposta: "Isso é combinado diretamente com quem fez seu pedido, no atendimento — fale com o Netto ou o Jhonatas explicando o que precisa ajustar."
  },
  {
    id: "suporte-pos-entrega",
    pergunta: "Depois de pronto, tem suporte se der algum problema?",
    chaves: ["suporte", "depois da entrega", "deu erro", "deu problema", "garantia"],
    resposta: "Isso é combinado no atendimento, conforme o tipo de projeto. Se notar algum problema depois da entrega, é só chamar o Netto ou o Jhonatas pelo WhatsApp."
  },
  {
    id: "arquivos-codigo",
    pergunta: "Eu recebo os arquivos ou o código fonte do que for feito?",
    chaves: ["arquivo", "codigo fonte", "recebo o que", "o que eu recebo"],
    resposta: "O que você recebe depende do tipo de pedido — isso é explicado e combinado diretamente no atendimento, antes de começar."
  },
  {
    id: "atende-fora",
    pergunta: "Vocês atendem fora da minha cidade ou de outros estados?",
    chaves: ["outra cidade", "outro estado", "fora do brasil", "atendimento online", "a distancia"],
    resposta: "Sim! Todo o atendimento é feito online, pelo WhatsApp ou Discord — não importa de onde você é."
  },
  {
    id: "idioma",
    pergunta: "O atendimento é em português?",
    chaves: ["idioma", "portugues", "falam ingles"],
    resposta: "Sim, o atendimento é feito em português."
  },
  {
    id: "horario",
    pergunta: "Qual o horário de atendimento?",
    chaves: ["horario de atendimento", "que horas atendem", "atendem de madrugada"],
    resposta: "O horário é combinado direto no WhatsApp — manda sua mensagem que o Netto ou o Jhonatas respondem assim que possível."
  },
  {
    id: "quem-responde",
    pergunta: "Quem vai me atender, o Netto ou o Jhonatas?",
    chaves: ["quem atende", "quem responde", "netto ou jhonatas"],
    resposta: "Pode ser qualquer um dos dois — o Netto é o dono da Nex Imperium e o Jhonatas é o subdono, e os dois atendem pessoalmente pelo WhatsApp."
  },
  {
    id: "donos",
    pergunta: "Quem são o Netto e o Jhonatas?",
    chaves: ["netto", "jhonatas", "donos da empresa", "quem administra"],
    resposta: "O Netto é o dono da Nex Imperium, e o Jhonatas é o subdono. Os dois atendem pessoalmente pelo WhatsApp pra tirar dúvidas, fazer pedidos e combinar pagamento."
  },
  {
    id: "confianca",
    pergunta: "É confiável? Quem são vocês?",
    chaves: ["confiavel", "e seguro comprar", "quem sao voces", "golpe", "e serio"],
    resposta: "A Nex Imperium é administrada pelo Netto (dono) e pelo Jhonatas (subdono), que atendem pessoalmente cada pedido pelo WhatsApp. Qualquer detalhe do pedido e do pagamento é combinado direto com eles — por isso vale sempre conferir e guardar o combinado por escrito."
  },
  {
    id: "contato",
    pergunta: "Como eu falo com vocês?",
    chaves: ["contato", "falar com voces", "atendimento"],
    resposta: "Pelo WhatsApp do Netto (dono) ou do Jhonatas (subdono) — os botões estão no rodapé do site e também aparecem quando você solicita um produto ou serviço."
  },
  {
    id: "discord",
    pergunta: "Vocês têm Discord?",
    chaves: ["discord", "servidor discord", "ticket"],
    resposta(config) {
      if (config.discordAtivo && (config.discordLink || "").trim()) {
        return "Sim! É só entrar pelo link de atendimento do Discord e abrir um ticket por lá.";
      }
      return "Ainda não — por enquanto o atendimento é só pelo WhatsApp. Assim que o Discord for criado, essa opção passa a aparecer por aqui também.";
    }
  },
  {
    id: "seguranca",
    pergunta: "A conversa pelo WhatsApp é segura?",
    chaves: ["seguro", "seguranca da conversa", "criptografado", "privacidade"],
    resposta: "Sim. O WhatsApp usa criptografia de ponta a ponta nas conversas. De qualquer forma, por segurança, é sempre bom guardar prints do que foi combinado (valores, prazos, detalhes do pedido)."
  },
  {
    id: "multiplos-pedidos",
    pergunta: "Posso pedir mais de uma coisa ao mesmo tempo?",
    chaves: ["mais de um pedido", "varios pedidos", "dois produtos juntos"],
    resposta: "Pode sim! Você pode descrever tudo de uma vez na seção 'Pedido Personalizado' ou simplesmente explicar direto no atendimento."
  },
  {
    id: "catalogo",
    pergunta: "Quais produtos e serviços vocês oferecem?",
    chaves: ["produtos e servicos", "o que voces fazem", "o que voces oferecem", "catalogo"],
    resposta: "Trabalhamos com bots para Discord, sites, plugins, servidores de Minecraft, uma linha grande de produtos digitais (templates, planilhas, modelos, e-books etc.) e serviços extras como instalação, manutenção, personalização e consultoria. Dá uma olhada nas seções 'Desenvolvimento', 'Produtos digitais' e 'Serviços extras' pra ver tudo."
  },
  {
    id: "bot-discord",
    pergunta: "O que é o bot personalizado para Discord?",
    chaves: ["bot discord", "bot personalizado", "bot para servidor", "criar bot"],
    resposta: "É um bot feito sob medida pro seu servidor de Discord, com os comandos e funções que você precisar. Pra pedir, use a seção 'Pedido de Desenvolvimento' e escolha 'Bot personalizado para Discord'."
  },
  {
    id: "site-personalizado",
    pergunta: "O que é o site personalizado?",
    chaves: ["site personalizado", "criar site", "fazer site", "desenvolver site"],
    resposta: "É um site desenvolvido do zero, de acordo com a sua ideia, layout e funcionalidades. Pra pedir, use a seção 'Pedido de Desenvolvimento' e escolha 'Site personalizado'."
  },
  {
    id: "plugins-minecraft",
    pergunta: "Como peço um plugin de Minecraft?",
    chaves: ["plugin", "plugins", "minecraft plugin", "mod minecraft", "addon"],
    resposta: "Vá até a seção 'Plugins', lá embaixo. Você pode escolher plugins já listados ali, ou marcar a opção de plugin personalizado e descrever exatamente o que precisa."
  },
  {
    id: "varios-plugins",
    pergunta: "Posso escolher mais de um plugin no mesmo pedido?",
    chaves: ["mais de um plugin", "varios plugins", "multiplos plugins"],
    resposta: "Pode sim! Na seção 'Plugins' dá pra marcar vários ao mesmo tempo, ver a lista dos que você escolheu e remover algum se mudar de ideia."
  },
  {
    id: "servidor-minecraft",
    pergunta: "Como peço um servidor de Minecraft?",
    chaves: ["servidor minecraft", "criar servidor minecraft", "montar servidor"],
    resposta: "Use a seção 'Pedido de Desenvolvimento' e escolha 'Servidor de Minecraft', descrevendo o tipo de servidor, a versão e os recursos que você quer."
  },
  {
    id: "produtos-digitais-entrega",
    pergunta: "Como recebo um produto digital, tipo template ou planilha?",
    chaves: ["como recebo o produto", "entrega do produto digital", "planilha chega como"],
    resposta: "A entrega é combinada diretamente no atendimento, depois do pedido confirmado — não é uma entrega automática pelo site."
  },
  {
    id: "tipos-planilha",
    pergunta: "Quais tipos de planilha vocês têm?",
    chaves: ["tipos de planilha", "planilha financeira", "planilha de estoque", "planilha de vendas"],
    resposta: "Temos planilhas financeiras, de estoque, de vendas e de organização. Dá uma olhada na seção 'Produtos digitais' pra ver a descrição de cada uma."
  },
  {
    id: "tipos-templates",
    pergunta: "Quais tipos de templates e modelos vocês têm?",
    chaves: ["templates", "modelos de contrato", "modelos de proposta", "certificados", "curriculos"],
    resposta: "Temos templates de portfólio, de Notion, de currículo, de certificado e de apresentações, além de modelos de contrato, proposta comercial e orçamento. Também tem documentações técnicas, guias e tutoriais. Veja tudo na seção 'Produtos digitais'."
  },
  {
    id: "recursos-graficos",
    pergunta: "O que são os pacotes de ícones e recursos gráficos?",
    chaves: ["pacote de icones", "recursos graficos", "texturas", "packs"],
    resposta: "São pacotes prontos de ícones, texturas autorais e outros recursos gráficos pra usar nos seus próprios projetos — também na seção 'Produtos digitais'."
  },
  {
    id: "servicos-extras",
    pergunta: "O que são os serviços extras?",
    chaves: ["servicos extras", "manutencao", "instalacao", "correcao de bugs"],
    resposta: "São serviços como instalação, manutenção, correção de bugs, personalização, migração e consultoria — tanto pra bots e sites quanto pra plugins e servidores. Dá uma olhada na seção 'Serviços extras' pra ver a lista completa."
  },
  {
    id: "manutencao-terceiro",
    pergunta: "Vocês mexem em um projeto que não foi feito por vocês?",
    chaves: ["projeto de outra pessoa", "nao foi feito por voces", "outro desenvolvedor"],
    resposta: "Pode ser que sim, depende do caso. O melhor é explicar a situação direto no atendimento, pra ver se dá pra ajudar."
  },
  {
    id: "consultoria",
    pergunta: "Vocês fazem consultoria avulsa, sem fechar um projeto inteiro?",
    chaves: ["consultoria", "tirar duvida de programacao", "so uma duvida"],
    resposta: "Sim, consultoria de programação está na lista de serviços extras. É só solicitar atendimento por lá."
  },
  {
    id: "fora-da-lista",
    pergunta: "Posso pedir algo que não está na lista do site?",
    chaves: ["nao esta na lista", "coisa diferente", "fora da lista"],
    resposta: "Pode sim! Use a seção 'Pedido Personalizado', lá embaixo, descrevendo exatamente o que você precisa. Se for sobre plugin de Minecraft, dá pra marcar a opção de plugin personalizado direto na seção de Plugins."
  },
  {
    id: "redes-sociais",
    pergunta: "Vocês têm Instagram ou outra rede social?",
    chaves: ["instagram", "rede social", "tiktok", "redes sociais"],
    resposta: "No momento, o atendimento é só pelo WhatsApp (e pelo Discord, quando ativo) — não temos outra rede social divulgada aqui no site."
  }
];
