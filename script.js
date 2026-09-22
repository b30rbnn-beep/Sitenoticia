// ===== Carrossel de vídeos do cartão inicial =====
// Troque cada "SEU_ID_DO_VIDEO_X" pelo ID real do vídeo no YouTube.
// O ID é a parte depois de "v=" no link do vídeo.
// Exemplo: em https://www.youtube.com/watch?v=ABC123XYZ, o ID é ABC123XYZ
//
// "titulo" e "data" também podem ser trocados por vídeo, se quiser.

const slidesDoVideo = [
  { video: "wCCeMfAT8g8", titulo: "Attorney General Todd Blanche's Address to the Workforce", data: "August 13, 2026" },
  { video: "n6hj94Q3uvc", titulo: "11 Defendants Charged in Dismantling of Decade-Long Nationwide Marriage Fraud Scheme", data: "August 12, 2026" },
  { video: "9y2D24zwWsQ", titulo: "DOJ, State Dept. Announce Latest Enforcement Efforts to Eliminate Cartel Jalisco Nueva Generación", data: "August 5, 2026" },
  { video: "mClEqQtJsyc", titulo: "Justice Department Announces Significant Health Care Fraud Takedown, District Anti-Fraud Initiative", data: "August 4, 2026" },
  { video: "Gc94Lq7rY2o", titulo: "Justice Department Announces New State Partnerships and Record Fraud Enforcement Actions Across Southeast", data: "July 30, 2026" },
  { video: "eeP6px4f5o4", titulo: "Department of Justice Holds Press Conference Announcing Tren de Aragua Developments", data: "July 1, 2026" }
];

let slideAtual = 0;

// Este carrossel (vídeo do topo) só existe na página inicial (index.html).
// A checagem abaixo evita que a página quebre em outras páginas do site.
if (document.getElementById("seta-esquerda")) {

  function mostrarSlide(indice) {
    slideAtual = indice;
    const slide = slidesDoVideo[slideAtual];

    const videoHero = document.getElementById("video-hero");
    if (videoHero) {
      videoHero.src = "https://www.youtube.com/embed/" + slide.video + "?rel=0";
    }

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

// Carrega o primeiro vídeo assim que a página abre
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


// ===== Carrossel "Wanted Fugitives" (4 conjuntos de 3, troca automática) =====
const semFoto = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23DDE3EC'/><circle cx='100' cy='80' r='35' fill='%23AEAFB3'/><circle cx='100' cy='165' r='52' fill='%23AEAFB3'/></svg>";

const conjuntosWanted = [
  [
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAADMCAIAAAC0tQuYAADOW0lEQVR4nLT9XbMkS3IkiKmauUfmOXXvbfT0DAYYDLCzXOEP4o8m+UK+8IlvS5GdxQCDQX/cqjonM8LNlA/mHpmnqhrAUoQJSHXdrMzIiHAL+1BT[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAIAAACxN37FAAEAAElEQVR42rT97ZYcSZIkiomomkcmUNU93CF57rl8fj4KX4T8s3fv3NnuApAZEe6mKvyhah6R+KjuOTuThUJ3AZmRke7mZqqi8sH//f/9/8E//iAJ[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAADMCAIAAAC0tQuYAADHzElEQVR4nMT96ZctR5IfiNni7rHcJTPfAuABqKW7qrurWU0Oh1RT1AfNkWb0N+oP0Dn6F6QjzZFm+IE8w55uFtl7LY2qQqEAvC1fZt4lItzdzPTB[...]
  ],
  [
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAADDCAIAAAA3LNv7AAC9i0lEQVR4nOz925IkSZIlBp7DLCJqZu4Ream+zwwGwAIDQuPyC0u0D/vh+7BEoMU+7BKeAFpgB709M+iurqrMiHA3VRFm3gcWVTP3uGRWd0VWgwjS[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAADDCAIAAAA3LNv7AAD+f0lEQVR4nOz9abClaXIehmW++7ed5Z671K21u6v3WXt2DAbAEADHAhcQBEkJoijZYSpCki2KphwMh8V/lhx22IqQw3bQtoK2SFE0RYEkQIAUQIKD[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAADDCAIAAAA3LNv7AADTx0lEQVR4nOz9a5ckyXElCF4RUVUzc4/IiMysKgAkm+zX9Mzp3f28e/b/f9/e6e6dJpcEQBSAeuUjnu5mpioi+0HUPDwys4Aim0hwzxlFoSrSw93T[...]
  ],
  [
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADNCAIAAAAJ02q2AACaTUlEQVR4nOz965Ykx60sDJoB7pFZ1U1Se5/LN+tbs9Y8wTzBvP28wfd/9qxz9oUSKZJ9rcqMCAdsfsAjq7pJShRFSiSHLqov1XmJCwIOGAwGvn37[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADNCAIAAAAJ02q2AADNCklEQVR4nOz925YkV44kCooA+6JqZu4eQTKrp3tmHs4682fny+YTzmfMP8zD3Nbp7qpKMi7ubmaqG8A8QNXcPRhkMoPsrF65uIsZFeFuF71AsQGB[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADNCAIAAAAJ02q2AAC3UklEQVR4nOz9a5clx60kCpoB8IjYmfWgHt09M+uu+/9/1oxOSzoSRdYrM/eOcAcwH+Cxqyip7xElltStRec5FMnK3I8IhDtgMDMwM/Hz+nn9n7yu[...]
  ],
  [
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADQCAIAAABZWRDNAADKvklEQVR4nOz9abMsSY4dCB4Aqmbm7nd9ayy5VFZVT3eTlCZFZv5if22R/mUUocwHNtnkFKsqM2N5273XFzNTBdAfoGbu70VkVvUycktSwjLybdcX[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAIAAACxN37FAADcDUlEQVR42uz92ZYkyZElCNIlYhYRVbXN11iwZFV1dk/3nP74+YX5hJlzqqsrE0gAsXj4arsuIsxENA/MIipqbuZLhCMQqBpLHKTD3cxUVJSFmejS[...]
    { foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAIAAACxN37FAAD0C0lEQVR42uz96Zpk15EdiNoys33cIzIBAiSrWFVd/bVad3g1/dCT6D30IHqEVkuqYoEEwQlTzpkxuPvZ22zdH7aPh2cCIEESAMWrDuJLBhIx+LAH[...]
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
    const wanted = document.getElementById("wanted-for-" + i);
    const loc = document.getElementById("wanted-loc-" + i);

    if (foto) foto.src = pessoa.foto || semFoto;
    if (nome) nome.textContent = pessoa.nome;
    if (office) office.textContent = pessoa.office;
    if (wanted) wanted.textContent = pessoa.wanted;
    if (loc) loc.textContent = pessoa.loc;
  });

  document.querySelectorAll("#wanted-pontos span").forEach(function (ponto, i) {
    ponto.classList.toggle("ponto-ativo", i === conjuntoAtual);
  });
}

// Este carrossel (Wanted Fugitives) só existe na página inicial (index.html).
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
