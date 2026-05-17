export const pt = {
  common: {
    appName: "TypeDash",
    appShort: "TypeDash",
    test: "Teste",
    practice: "Prática",
    ranking: "Ranking",
    dashboard: "Dashboard",
    about: "Sobre",
    login: "Entrar",
    logout: "Sair",
    loggedIn: "Conectado",
    github: "GitHub",
    repository: "Repositório",
    project: "Projeto",
    navigation: "Navegação",
    version: "Versão",
    toggleLanguage: "Alternar idioma",
    user: "Usuário",
    wpm: "WPM",
    accuracy: "Precisão",
    date: "Data",
    duration: "Duração",
    sort: "Ordenar",
    showMore: "Mostrar mais",
    remaining: "restantes",
    loading: "Carregando...",
    top: "Top",
    competitors: "competidores",
    rank: "Posição",
  },
  header: {
    logoAlt: "Logo do TypeDash",
    userAvatarAlt: "Usuário",
    saveProgress: "Entrar para salvar progresso",
    brandSuffix: "treino de digitação",
  },
  footer: {
    description:
      "Pratique com foco, acompanhe sua evolução e compare seus melhores resultados em uma experiência simples e direta.",
    projectDescription: "Treino de digitação com progresso salvo e ranking global.",
    rights: "Todos os direitos reservados.",
    bottomNote: "Velocidade, precisão e constância em um só lugar.",
  },
  home: {
    badge: "Treino com foco",
    title: "Treine velocidade, precisão e ritmo com uma experiência clara e direta.",
    description:
      "Veja seu desempenho em tempo real, acompanhe sua evolução e transforme prática em resultado de forma consistente.",
    aboutBadge: "Sobre o projeto",
    aboutTitle: "Uma forma melhor de praticar todos os dias",
    aboutText:
      "TypeDash foi criado para tornar a prática mais objetiva. Você começa rápido, entende seu resultado na hora e volta para a próxima sessão com clareza sobre onde melhorar.",
    featuresTitle: "Por que o TypeDash é diferente?",
    featuresSubtitle: "Tudo foi pensado para manter sua prática leve, clara e consistente.",
    features: [
      {
        title: "Feedback imediato",
        description: "Veja seu ritmo e sua precisão enquanto digita, sem precisar esperar o fim do teste.",
      },
      {
        title: "Leitura confortável",
        description: "Uma interface limpa ajuda você a manter atenção no texto e no seu ritmo.",
      },
      {
        title: "Ranking vivo",
        description: "Compare seus melhores resultados com outras pessoas e veja onde você está hoje.",
      },
      {
        title: "Evolução contínua",
        description: "Volte ao seu histórico, veja tendências e acompanhe sua consistência ao longo do tempo.",
      },
      {
        title: "Prática em qualquer lugar",
        description: "Treine no computador ou no celular com a mesma fluidez.",
      },
      {
        title: "Sessões rápidas",
        description: "Abra, pratique e continue seu dia sem fricção.",
      },
    ],
    trainingTitle: "Como funciona o treinamento?",
    trainingSubtitle: "Três passos simples para começar a evoluir agora.",
    steps: [
      {
        title: "Digite o texto",
        description: "Comece a digitar e o teste inicia automaticamente no primeiro toque.",
      },
      {
        title: "Corrija os erros",
        description: "Acompanhe erros e acertos em tempo real para manter sua precisão sob controle.",
      },
      {
        title: "Veja seu resultado",
        description: "Ao final da sessão, confira seu desempenho, salve seu progresso e acompanhe o ranking.",
      },
    ],
    faqTitle: "Perguntas frequentes (FAQ)",
    faqSubtitle: "As respostas principais para aproveitar melhor cada sessão.",
    faqs: [
      {
        question: "O que significa WPM e como ele é calculado?",
        answer:
          "WPM significa palavras por minuto. Ele mostra quantas palavras você consegue manter com ritmo e precisão durante o teste.",
      },
      {
        question: "Por que devo focar na precisão antes da velocidade?",
        answer:
          "Quando a precisão sobe, a velocidade cresce de forma mais estável. Primeiro construa controle, depois acelere.",
      },
      {
        question: "Como consistência e correções impactam minha nota?",
        answer:
          "Um ritmo mais estável costuma gerar resultados melhores. Muitas correções quebram o fluxo e reduzem a consistência da sessão.",
      },
      {
        question: "Preciso entrar para usar o TypeDash?",
        answer:
          "Você pode praticar sem entrar. Ao fazer login, seu progresso fica salvo e seus resultados podem aparecer no ranking.",
      },
    ],
    ctaLoggedInText:
      "Seu progresso está salvo. Continue praticando, melhore seu ritmo e veja até onde você consegue chegar.",
    practiceMode: "Modo prática",
    viewDashboard: "Ver meu dashboard",
    ctaLoggedOutTitle: "Pronto para registrar sua evolução histórica?",
    ctaLoggedOutText:
      "Entre para salvar seu progresso, acompanhar sua evolução e aparecer no ranking com seus melhores resultados.",
    ctaLoggedOutButton: "Criar conta / fazer login",
    loggedInTitle: (name: string) => `Tudo pronto, ${name}!`,
    fallbackPilot: "Você",
  },
  liveStats: {
    time: "tempo",
    accuracy: "precisão",
    wpm: "wpm",
  },
  typingArea: {
    ariaLabel: "Área de digitação, comece a digitar para iniciar o teste",
    overlay: "Toque aqui ou comece a digitar para iniciar",
  },
  results: {
    accuracy: "Precisão",
    correct: "Acertos",
    incorrect: "Erros",
    chartTitle: "WPM ao longo do tempo",
    retry: "Tentar novamente",
  },
  telemetry: {
    duration: "Duração",
    telemetry: "Resumo",
    ranking: "Ranking",
    live: "ativo",
    global: "global",
    loginNotice: "Os resultados só são salvos quando você está autenticado.",
    loginCta: "Entrar para salvar progresso",
  },
  ranking: {
    sectionLabel: "Ranking",
    title: "Melhores resultados",
    subtitle: "Um resultado por pessoa, usando a melhor pontuação do período selecionado.",
    periods: {
      day: "Hoje",
      week: "Semana",
      month: "Mês",
      all: "Geral",
    },
    periodDescriptions: {
      day: "Ranking diário",
      week: "Ranking semanal",
      month: "Ranking mensal",
      all: "Ranking geral",
    },
    loading: "Carregando ranking...",
    emptyStart: "Ainda não há resultados no ranking de",
    emptyEnd: "Seja o primeiro.",
    headers: {
      user: "Usuário",
      accuracy: "Precisão",
      date: "Data",
      acc: "Prec.",
    },
    cardLabels: {
      rank: "Posição",
      user: "Usuário",
      accuracy: "Precisão",
      date: "Data",
    },
  },
  rankingPage: {
    badge: "Melhores resultados",
    title: "Compare os melhores resultados por período.",
    subtitle:
      "Cada pessoa aparece com seu melhor resultado em cada período, para que o ranking fique mais claro e mais justo.",
    startTest: "Iniciar teste",
    cards: [
      {
        title: "Um melhor resultado",
        text: "Cada pessoa entra com sua melhor sessão dentro do período selecionado.",
      },
      {
        title: "Visões por período",
        text: "Acompanhe o que muda hoje, nesta semana, neste mês ou no geral.",
      },
      {
        title: "Velocidade com controle",
        text: "Resultados fortes combinam ritmo, precisão e constância.",
      },
    ],
  },
  practicePage: {
    badge: "Recursos de prática",
    title: "Sessões curtas para melhorar com mais clareza.",
    subtitle:
      "Use estas sugestões para treinar com mais intenção e transformar prática em progresso real.",
    openTest: "Abrir teste",
    drills: [
      {
        title: "Sprint de 30 segundos",
        text: "Faça três sessões curtas e mantenha o melhor resultado. É simples e fácil de repetir.",
      },
      {
        title: "Disciplina de correção",
        text: "Corrija só quando necessário. Menos interrupções ajudam você a manter ritmo e precisão.",
      },
      {
        title: "Foco em padrão",
        text: "Quando notar erros repetidos, reduza o ritmo por uma sessão e volte a acelerar depois.",
      },
      {
        title: "Cheque de consistência",
        text: "Uma boa sequência de resultados vale mais do que um único pico isolado.",
      },
    ],
    recommendedTitle: "Loop recomendado",
    recommendedText:
      "Comece com uma sessão controlada, faça três testes completos e revise seu histórico antes de mudar sua meta.",
  },
  dashboardPage: {
    title: "Seu progresso",
    subtitle: "Veja seu histórico, acompanhe tendências e entenda como seu ritmo evolui.",
    historyTitle: "Histórico de testes",
    loadingAuth: "Você precisa estar autenticado para ver seu histórico.",
    loadingError: "Não foi possível carregar as métricas. Tente novamente.",
    networkError: "Não foi possível conectar ao servidor.",
    loginCta: "Entrar",
    emptyHistory: "Nenhum teste encontrado. Complete um teste para ver seu histórico.",
    chartsEmpty: "Complete pelo menos 2 testes para visualizar sua evolução.",
    performanceOverTime: "Evolução ao longo do tempo",
    chartAxisTest: "Teste",
    chartLabel: "Teste #",
    chartCards: {
      wpm: {
        title: "WPM",
        subtitle: "Seu ritmo de digitação",
      },
      accuracy: {
        title: "Precisão",
        subtitle: "Quanto você mantém controle",
      },
      duration: {
        title: "Duração",
        subtitle: "Tempo total de cada sessão",
      },
    },
    stats: {
      bestWpm: "Melhor WPM",
      averageWpm: "WPM médio",
      averageAccuracy: "Precisão média",
      completedTests: "Testes concluídos",
    },
    sortOptions: {
      recent: "Mais recentes",
      wpm_desc: "Maior WPM",
      wpm_asc: "Menor WPM",
      accuracy_desc: "Maior precisão",
      accuracy_asc: "Menor precisão",
      duration_desc: "Maior duração",
    },
  },
  loginPage: {
    title: "Entrar",
    subtitle: "Entre para salvar seu progresso, acompanhar sua evolução e entrar no ranking.",
    continueWithGithub: "Continuar com GitHub",
  },
  aboutPage: {
    badge: "Sobre o projeto",
    title: "TypeDash",
    subtitle:
      "TypeDash ajuda você a praticar com mais clareza, entender seu ritmo e acompanhar sua evolução ao longo do tempo.",
    startTest: "Iniciar teste",
    heroImageAlt: "Tela do dashboard do TypeDash",
    pillars: [
      {
        title: "Leitura imediata",
        description: "Você entende seu resultado assim que termina a sessão.",
      },
      {
        title: "Progresso salvo",
        description: "Seu histórico fica organizado para mostrar evolução com clareza.",
      },
      {
        title: "Ranking justo",
        description: "O ranking destaca o melhor resultado de cada pessoa em cada período.",
      },
    ],
    engineeringLabel: "Experiência",
    engineeringTitle: "Feito para repetir, comparar e melhorar",
    engineeringText:
      "Cada parte da experiência foi pensada para reduzir atrito e ajudar você a voltar para a próxima sessão com mais clareza.",
    userDataTitle: "Seu progresso",
    userDataText:
      "Quando você entra, seus resultados ficam salvos para que sua evolução apareça com contexto e continuidade.",
    technicalBaseTitle: "Experiência diária",
    technicalBaseText:
      "Sessões rápidas, leitura simples e comparação clara ajudam a manter constância sem complicar sua rotina.",
  },
} as const;
