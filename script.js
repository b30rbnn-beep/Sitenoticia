const slidesDoVideo = [
  { titulo: "Rede de abrigos amplia atendimento e pressiona orçamento em capitais do país", data: "22 de setembro de 2026" },
  { titulo: "Painel acompanha promessas, contratos e entregas das obras mais caras do semestre", data: "21 de setembro de 2026" },
  { titulo: "Mapa da mobilidade identifica trajetos onde o tempo de deslocamento mais cresceu", data: "19 de setembro de 2026" },
  { titulo: "Consórcios regionais aceleram compras coletivas de medicamentos e manutenção urbana", data: "18 de setembro de 2026" },
  { titulo: "Portais de transparência avançam, mas ainda falham em explicar contratos emergenciais", data: "16 de setembro de 2026" },
  { titulo: "Calendário de audiências públicas mostra decisões que afetam transporte e moradia", data: "15 de setembro de 2026" }
];

let slideAtual = 0;

// Este carrossel de destaques só existe na página inicial (index.html).
// A checagem abaixo evita que a página quebre em outras páginas do site.
if (document.getElementById("seta-esquerda")) {

  function mostrarSlide(indice) {
    slideAtual = indice;
    const slide = slidesDoVideo[slideAtual];

    const heroTitulo = document.getElementById("hero-titulo");
    if (heroTitulo) {
      heroTitulo.textContent = slide.titulo;
    }

    const heroData = document.getElementById("hero-data");
    if (heroData) {
      heroData.textContent = slide.data;
    }

    document.querySelectorAll(".pagina").forEach(function (elemento, i) {
      elemento.classList.toggle("pagina-ativa", i === slideAtual);
    });
  }

  document.querySelectorAll(".pagina").forEach(function (elemento, i) {
    elemento.addEventListener("click", function () {
      mostrarSlide(i);
      reiniciarAutoAvanco();
    });
  });

  const setaEsquerda = document.getElementById("seta-esquerda");
  const setaDireita = document.getElementById("seta-direita");

  if (setaEsquerda) {
    setaEsquerda.addEventListener("click", function () {
      const anterior = (slideAtual - 1 + slidesDoVideo.length) % slidesDoVideo.length;
      mostrarSlide(anterior);
      reiniciarAutoAvanco();
    });
  }

  if (setaDireita) {
    setaDireita.addEventListener("click", function () {
      const proximo = (slideAtual + 1) % slidesDoVideo.length;
      mostrarSlide(proximo);
      reiniciarAutoAvanco();
    });
  }
}

// ===== Avanço automático (passa de 1 em 1 sozinho) =====
let temporizador;

function reiniciarAutoAvanco() {
  clearInterval(temporizador);
  temporizador = setInterval(function () {
    const proximo = (slideAtual + 1) % slidesDoVideo.length;
    mostrarSlide(proximo);
  }, 6000); // troca a cada 6 segundos — mude o número pra ajustar a velocidade
}

// Carrega o primeiro destaque assim que a página abre
if (document.getElementById("seta-esquerda")) {
  mostrarSlide(0);
  reiniciarAutoAvanco();
}

const botaoAviso = document.getElementById("botao-aviso");
if (botaoAviso) {
  botaoAviso.addEventListener("click", function () {
    const painel = document.getElementById("painel-aviso");
    const seta = document.getElementById("seta-aviso");
    const estaAberto = painel && !painel.hasAttribute("hidden");

    if (painel) {
      if (estaAberto) {
        painel.setAttribute("hidden", "");
      } else {
        painel.removeAttribute("hidden");
      }
    }

    if (seta) {
      seta.classList.toggle("aberto", !estaAberto);
    }
  });
}

function igualarLarguraBusca() {
  const links = document.getElementById("topo-links");
  const busca = document.getElementById("topo-busca");
  if (links && busca) {
    busca.style.width = links.offsetWidth + "px";
  }
}

igualarLarguraBusca();
window.addEventListener("resize", igualarLarguraBusca);
window.addEventListener("load", igualarLarguraBusca);
setTimeout(igualarLarguraBusca, 300);
setTimeout(igualarLarguraBusca, 1000);


// ===== Carrossel de dossiês em destaque (4 conjuntos de 3, troca automática) =====
const semFoto = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23DDE3EC'/><circle cx='100' cy='80' r='35' fill='%23AEAFB3'/><circle cx='100' cy='165' r='52' fill='%23AEAFB3'/></svg>";

const conjuntosWanted = [
  [
    { foto: "", nome: "Moradia emergencial", office: "Cidades e Serviços", foco: "Orçamento, contratos e capacidade de acolhimento", loc: "Capitais do Sudeste e Nordeste" },
    { foto: "", nome: "Transporte em revisão", office: "Mobilidade", foco: "Corredores de ônibus, tarifa e integração metropolitana", loc: "Regiões metropolitanas" },
    { foto: "", nome: "Creches em expansão", office: "Educação", foco: "Fila de matrícula, obras e atendimento parcial", loc: "Interior e periferias urbanas" }
  ],
  [
    { foto: "", nome: "Contratos sob lupa", office: "Transparência", foco: "Aditivos, prazos e termos de referência", loc: "Estados e consórcios regionais" },
    { foto: "", nome: "Chuvas e resposta rápida", office: "Clima", foco: "Planos de contingência, sirenes e obras de drenagem", loc: "Litoral e áreas de encosta" },
    { foto: "", nome: "Saúde de bairro", office: "Saúde Pública", foco: "Reforma de unidades, equipes e filas reguladas", loc: "Capitais e cidades médias" }
  ],
  [
    { foto: "", nome: "Economia do cuidado", office: "Trabalho e Renda", foco: "Remuneração, jornadas e oferta de serviços", loc: "Grandes centros urbanos" },
    { foto: "", nome: "Habitação em disputa", office: "Planejamento", foco: "Regularização, aluguel social e uso do solo", loc: "Centro expandido e periferias" },
    { foto: "", nome: "Escolas em obras", office: "Infraestrutura", foco: "Licitações, cronogramas e fiscalização local", loc: "Norte e Centro-Oeste" }
  ],
  [
    { foto: "", nome: "Água e saneamento", office: "Serviços Essenciais", foco: "Metas de expansão, perdas e investimentos", loc: "Semiárido e regiões costeiras" },
    { foto: "", nome: "Segurança alimentar", office: "Desenvolvimento Social", foco: "Distribuição, compras públicas e cobertura local", loc: "Redes comunitárias e zonas rurais" },
    { foto: "", nome: "Dados do orçamento", office: "Contas Públicas", foco: "Execução financeira, suplementações e restos a pagar", loc: "União, estados e capitais" }
  ]
];

let conjuntoAtual = 0;

function mostrarConjuntoWanted(indice) {
  conjuntoAtual = indice;
  const pessoas = conjuntosWanted[conjuntoAtual];

  pessoas.forEach(function (pessoa, i) {
    const foto = document.getElementById("wanted-foto-" + i);
    const nome = document.getElementById("wanted-nome-" + i);
    const office = document.getElementById("wanted-office-" + i);
    const foco = document.getElementById("wanted-for-" + i);
    const loc = document.getElementById("wanted-loc-" + i);

    if (foto) {
      foto.src = pessoa.foto || semFoto;
      foto.alt = pessoa.nome ? "Ilustração do dossiê " + pessoa.nome : "";
    }
    if (nome) nome.textContent = pessoa.nome;
    if (office) office.textContent = pessoa.office;
    if (foco) foco.textContent = pessoa.foco;
    if (loc) loc.textContent = pessoa.loc;
  });

  document.querySelectorAll("#wanted-pontos span").forEach(function (ponto, i) {
    ponto.classList.toggle("ponto-ativo", i === conjuntoAtual);
  });
}

// Este carrossel de dossiês só existe na página inicial (index.html).
// A checagem abaixo evita que a página quebre em outras páginas do site.
if (document.getElementById("wanted-pontos")) {

  document.querySelectorAll("#wanted-pontos span").forEach(function (ponto, i) {
    ponto.addEventListener("click", function () {
      mostrarConjuntoWanted(i);
      reiniciarAutoAvancoWanted();
    });
  });

  var temporizadorWanted;

  function reiniciarAutoAvancoWanted() {
    clearInterval(temporizadorWanted);
    temporizadorWanted = setInterval(function () {
      const proximo = (conjuntoAtual + 1) % conjuntosWanted.length;
      mostrarConjuntoWanted(proximo);
    }, 3500); // troca a cada 3,5 segundos
  }

  mostrarConjuntoWanted(0);
  reiniciarAutoAvancoWanted();
}

// ===== Carrossel da página About DOJ (retratos) =====
if (document.getElementById("about-hero-paginas")) {
  const slidesAbout = [
    { olho: "1789 TO TODAY", titulo: "History &amp; Art of the Department of Justice" },
    { olho: "PORTRAITS, BIOGRAPHIES AND SPEECHES", titulo: "Learn More About the Attorneys General of the United States 1789-Present" }
  ];

  let slideAboutAtual = 1;

  function mostrarSlideAbout(indice) {
    slideAboutAtual = indice;
    const slide = slidesAbout[slideAboutAtual];
    const olho = document.getElementById("about-hero-olho");
    const titulo = document.getElementById("about-hero-titulo");
    if (olho) olho.innerHTML = slide.olho;
    if (titulo) titulo.innerHTML = slide.titulo;

    document.querySelectorAll("#about-hero-paginas .pagina").forEach(function (el, i) {
      el.classList.toggle("pagina-ativa", i === slideAboutAtual);
    });
    const fundoPredio = document.getElementById("about-hero-bg-predio");
    const retratos = document.querySelector(".about-hero-retratos");
    if (slideAboutAtual === 0) {
      if (fundoPredio) fundoPredio.classList.add("ativo");
      if (retratos) retratos.style.visibility = "hidden";
    } else {
      if (fundoPredio) fundoPredio.classList.remove("ativo");
      if (retratos) retratos.style.visibility = "visible";
    }
  }

  document.querySelectorAll("#about-hero-paginas .pagina").forEach(function (el, i) {
    el.addEventListener("click", function () {
      mostrarSlideAbout(i);
    });
  });

  const aboutSetaEsq = document.getElementById("about-seta-esquerda");
  const aboutSetaDir = document.getElementById("about-seta-direita");

  if (aboutSetaEsq) {
    aboutSetaEsq.addEventListener("click", function () {
      mostrarSlideAbout((slideAboutAtual - 1 + slidesAbout.length) % slidesAbout.length);
    });
  }

  if (aboutSetaDir) {
    aboutSetaDir.addEventListener("click", function () {
      mostrarSlideAbout((slideAboutAtual + 1) % slidesAbout.length);
    });
  }
}

// ===== Carrossel da página History of the Department of Justice =====
if (document.getElementById("historia-hero")) {
  const slidesHistoria = document.querySelectorAll(".historia-slide");
  const paginasHistoria = document.querySelectorAll("#historia-paginas .historia-pagina");
  let slideHistoriaAtual = 0;

  function mostrarSlideHistoria(indice) {
    slideHistoriaAtual = indice;
    slidesHistoria.forEach(function (el, i) {
      el.classList.toggle("historia-slide-ativa", i === slideHistoriaAtual);
    });
    paginasHistoria.forEach(function (el, i) {
      el.classList.toggle("pagina-ativa", i === slideHistoriaAtual);
    });
  }

  paginasHistoria.forEach(function (el, i) {
    el.addEventListener("click", function () {
      mostrarSlideHistoria(i);
    });
  });

  const setaEsqHistoria = document.getElementById("historia-seta-esquerda");
  const setaDirHistoria = document.getElementById("historia-seta-direita");

  if (setaEsqHistoria) {
    setaEsqHistoria.addEventListener("click", function () {
      mostrarSlideHistoria((slideHistoriaAtual - 1 + slidesHistoria.length) % slidesHistoria.length);
    });
  }

  if (setaDirHistoria) {
    setaDirHistoria.addEventListener("click", function () {
      mostrarSlideHistoria((slideHistoriaAtual + 1) % slidesHistoria.length);
    });
  }
}

// ===== Acordeão da página Business and Contracts =====
document.querySelectorAll(".business-acordeao-item").forEach(function (botao) {
  botao.addEventListener("click", function () {
    botao.classList.toggle("business-acordeao-aberto");
  });
});

// ===== Carrossel da página Legal Careers =====
if (document.getElementById("legal-carrossel")) {
  const slidesLegal = [
    "Legal Careers at Justice",
    "Find Opportunities for Law Students",
    "The Attorney General's Honors Program",
    "Experienced Attorneys",
    "Explore the Benefits of Working at Justice"
  ];

  let slideLegalAtual = 0;

  function mostrarSlideLegal(indice) {
    slideLegalAtual = indice;
    const titulo = document.getElementById("legal-carrossel-titulo");
    if (titulo) titulo.textContent = slidesLegal[slideLegalAtual];
    document.querySelectorAll("#legal-carrossel-paginas .legal-pagina").forEach(function (el, i) {
      el.classList.toggle("pagina-ativa", i === slideLegalAtual);
    });
  }

  document.querySelectorAll("#legal-carrossel-paginas .legal-pagina").forEach(function (el, i) {
    el.addEventListener("click", function () {
      mostrarSlideLegal(i);
    });
  });

  const legalSetaEsq = document.getElementById("legal-seta-esquerda");
  const legalSetaDir = document.getElementById("legal-seta-direita");

  if (legalSetaEsq) {
    legalSetaEsq.addEventListener("click", function () {
      mostrarSlideLegal((slideLegalAtual - 1 + slidesLegal.length) % slidesLegal.length);
    });
  }

  if (legalSetaDir) {
    legalSetaDir.addEventListener("click", function () {
      mostrarSlideLegal((slideLegalAtual + 1) % slidesLegal.length);
    });
  }
}

// Botão "voltar ao topo": só aparece ao alcançar a seção azul (painel-navy).
// Em páginas sem essa seção, usa um limite de rolagem como alternativa.
(function () {
  var botaoTopo = document.querySelector(".botao-topo");
  if (!botaoTopo) return;

  var secaoAzul = document.querySelector(".painel-navy");
  var limiteFallback = 400;

  function atualizarVisibilidade() {
    var deveMostrar;
    if (secaoAzul) {
      deveMostrar = window.scrollY >= secaoAzul.offsetTop;
    } else {
      deveMostrar = window.scrollY >= limiteFallback;
    }
    botaoTopo.classList.toggle("visivel", deveMostrar);
  }

  window.addEventListener("scroll", atualizarVisibilidade, { passive: true });
  atualizarVisibilidade();
})();

// Organograma: caixas clicaveis/selecionaveis
(function () {
  var caixas = document.querySelectorAll(".organograma .og-box");
  if (!caixas.length) return;
  caixas.forEach(function (caixa) {
    caixa.addEventListener("click", function (e) {
      e.preventDefault();
      var jaSelecionada = caixa.classList.contains("og-box-selecionado");
      caixas.forEach(function (c) { c.classList.remove("og-box-selecionado"); });
      if (!jaSelecionada) {
        caixa.classList.add("og-box-selecionado");
      }
    });
  });
})();
