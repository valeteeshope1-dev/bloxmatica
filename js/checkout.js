/* ==========================================================================
   Checkout - Bloxmática  (layout do checkout Mundo Matemágico)

   >>> ÚNICA COISA QUE VOCÊ PRECISA EDITAR ESTÁ LOGO ABAIXO <<<

   Cole o link de pagamento de cada plano no campo "pay".
   Enquanto o link estiver vazio, o botão de compra fica desativado de
   propósito - para nenhum cliente clicar e cair em página quebrada.
   Preços sempre em centavos (1490 = R$ 14,90).
   ========================================================================== */

var PLANOS = {

  basico: {
    nome: 'Plano Básico',
    desc: '+350 aventuras de matemática do 1º ao 5º ano, em PDF. Sem o aplicativo.',
    img: 'img/capa-plano-basico.webp',
    preco: 1490,          // R$ 14,90
    de: 3990,             // R$ 39,90 riscado
    parcelas: null,       // sem parcelamento
    resumo: 'Somente o material · pagamento único',
    inclui: [
      '+350 aventuras de matemática do 1º ao 5º ano',
      'Operações, problemas, frações, medidas e gráficos',
      'Arquivo em PDF, pronto para imprimir',
      'Organização visual por série escolar',
      'Envio imediato por e-mail',
      'Não inclui o aplicativo'
    ],

    pay: 'https://pay.cakto.com.br/exfs9jn_1153810'   // Cakto · Básico R$ 14,90
  },

  premium: {
    nome: 'Premium Completo',
    desc: 'Aplicativo + material para imprimir + 3 presentes exclusivos.',
    img: 'img/capa-plano-premium.webp',
    preco: 3790,          // R$ 37,90
    de: 8790,             // R$ 87,90 riscado
    parcelas: null,       // ex.: "em até 3x no cartão" (se a plataforma permitir)
    selo: '⚡ Mais escolhido',
    resumo: 'Aplicativo + PDF + 3 presentes · todos os materiais',
    inclui: [
      '+350 aventuras de matemática do 1º ao 5º ano',
      'Operações, problemas, frações, medidas e gráficos',
      'Arquivo em PDF, pronto para imprimir',
      'Acesso digital e vitalício',
      '🎁 Guia Rápido para os Pais (de R$ 8,90 por GRÁTIS)',
      '🎁 Plano Semanal de Matemática (de R$ 12,90 por GRÁTIS)',
      '🎁 Acesso Vitalício ao Aplicativo (de R$ 27,90 por GRÁTIS)',
      'Envio imediato por e-mail (aplicativo + PDF)'
    ],

    pay: 'https://pay.cakto.com.br/347pjfb_1153873'   // Cakto · Premium Completo R$ 37,90
  },

  /* Premium Essencial: só aparece no DOWNSELL, quando o cliente do Básico
     recusa o Premium Completo. Não aparece na escolha de planos.
     = mesmo Premium, com o aplicativo, SEM os 2 bônus (Guia + Plano Semanal). */
  essencial: {
    nome: 'Premium Essencial',
    desc: 'Aplicativo vitalício + material para imprimir. Sem os 2 bônus.',
    img: 'img/capa-plano-premium.webp',
    preco: 2490,          // R$ 24,90 (confirmado; confere com a Cakto)
    de: 3790,             // riscado = preço do Premium Completo
    parcelas: null,
    oculto: true,         // não aparece na escolha de planos
    resumo: 'Aplicativo + PDF · sem os bônus',
    inclui: [
      '+350 aventuras de matemática do 1º ao 5º ano',
      'Operações, problemas, frações, medidas e gráficos',
      'Arquivo em PDF, pronto para imprimir',
      'Acesso Vitalício ao Aplicativo — sem mensalidade',
      'Envio imediato por e-mail (aplicativo + PDF)',
      'Não inclui: Guia Rápido para os Pais e Plano Semanal de Matemática'
    ],

    pay: 'https://pay.cakto.com.br/3eyqzi3_1158177'   // Cakto · Premium Essencial R$ 24,90
  }

};

/* ---------------- UPGRADE + DOWNSELL ----------------
   Quando o cliente do Básico clica para pagar:
     1) oferece o PREMIUM COMPLETO (app + 2 bônus)
     2) se recusar, oferece o PREMIUM ESSENCIAL (app, sem os 2 bônus)
     3) se recusar de novo, segue com o Básico.
   O aplicativo é fixo: nunca sai da oferta.
   Valores dos itens = os mesmos anunciados na página de vendas. */
var FUNIL = {
  ativo: true,
  app:    { nome: 'Aplicativo Bloxmática', detalhe: 'Acesso vitalício · sem mensalidade', valor: 2790, img: 'img/presente-3-acesso-app.webp' },
  bonus1: { nome: 'Guia Rápido para os Pais', detalhe: 'Como acompanhar e incentivar os estudos', valor: 890, img: 'img/presente-1-guia-pais.webp' },
  bonus2: { nome: 'Plano Semanal de Matemática', detalhe: 'Rotina pronta para cada dia da semana', valor: 1290, img: 'img/presente-2-plano-semanal.webp' }
};

/* ---------------- ORDER BUMPS ----------------
   Ofertas extras que o cliente marca antes de pagar.
   - img:   caminho da capa (coloque o arquivo em img/order-bumps/)
   - preco: em centavos (ex.: 990 = R$ 9,90). null = preço ainda não definido
   - de:    preço riscado (opcional), em centavos
   - ocultarNoPlano: esconde o bump quando o cliente estiver nesse plano
                     (ex.: 'premium' se o item já vem grátis no Premium) */
var BUMPS = [
  {
    id: 'tabuada7dias',
    nome: 'Técnica da Tabuada — Aprenda Tabuada em 7 Dias',
    desc: 'Plano simples e progressivo para praticar e fixar a tabuada em 7 dias.',
    img: 'img/order-bumps/tabuada-7-dias.webp',
    preco: 1290,          // R$ 12,90
    de: 2590              // R$ 25,90 riscado
  },
  {
    id: 'uno4operacoes',
    nome: 'UNO 4 Operações para Imprimir',
    desc: 'Jogo para imprimir e praticar adição, subtração, multiplicação e divisão brincando.',
    img: 'img/order-bumps/uno-4-operacoes.webp',
    preco: 1290,          // R$ 12,90
    de: 2590              // R$ 25,90 riscado
  },
  {
    id: 'planosemanal',
    nome: 'Plano Semanal — Menos Tempo de Esforço, Mais Matemática',
    desc: 'Atividades rápidas de lógica, padrões e resolução de problemas para estimular o raciocínio.',
    img: 'img/order-bumps/plano-semanal.webp',
    ocultarNoPlano: 'premium',   // o Premium já inclui o Plano Semanal de presente
    preco: 1290,          // R$ 12,90
    de: 2590              // R$ 25,90 riscado
  },
  {
    id: 'geometriajogos',
    nome: 'Geometria nos Jogos',
    desc: 'Atividades práticas para aprender formas geométricas de um jeito mais divertido.',
    img: 'img/order-bumps/geometria-nos-jogos.webp',
    preco: 1290,          // R$ 12,90
    de: 2590              // R$ 25,90 riscado
  }
];

/* ========================================================================
   Daqui para baixo nao precisa mexer.
   ======================================================================== */

(function () {
  'use strict';

  var PREFIXO_PAGAMENTO = 'https://';
  var GUARDA = 'bloxmatica-checkout-identificacao';

  var planoAtual = null;

  function el(id) { return document.getElementById(id); }

  function brl(centavos) {
    return 'R$ ' + (centavos / 100).toFixed(2).replace('.', ',');
  }

  function configurado(plano) {
    return typeof plano.pay === 'string' && plano.pay.indexOf(PREFIXO_PAGAMENTO) === 0;
  }

  var CHECK = '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M173.9 439.4l-166.4-166.4c-10-10-10-26.2 0-36.2l36.2-36.2c10-10 26.2-10 36.2 0L192 312.7 432.1 72.6c10-10 26.2-10 36.2 0l36.2 36.2c10 10 10 26.2 0 36.2l-294.4 294.4c-10 10-26.2 10-36.2 0z"/></svg>';

  /* ======================= identificacao do cliente ======================= */

  /* "chave" e o nome do parametro que a plataforma de pagamento espera na URL para
     ja abrir com os dados preenchidos. Os nomes abaixo sao o padrao da Cakto;
     se a plataforma nova usar outros nomes, troque aqui.
     Nao invente nomes aqui: sao os documentados em
     ajuda.cakto.com.br -> "Como usar URL para checkout pre-preenchido".
     Errar o nome nao da erro nenhum - o campo simplesmente chega vazio
     do outro lado, e o cliente digita tudo de novo. */
  var CAMPOS = [
    {
      id: 'f-email', box: 'campo-email', chave: 'email',
      valida: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
    },
    {
      id: 'f-nome', box: 'campo-nome', chave: 'name',
      valida: function (v) { return v.trim().split(/\s+/).length >= 2; }
    },
    {
      id: 'f-fone', box: 'campo-fone', chave: 'phone',
      valida: function (v) {
        var d = v.replace(/\D/g, '');
        return d.length === 10 || d.length === 11;
      },
      /* a Cakto exige o codigo do pais na frente, senao ignora o numero */
      formata: function (v) { return '55' + v.replace(/\D/g, ''); },
      mascara: function (v) { return mascaraTelefone(v); }
    },
    {
      /* testado na Cakto: o CPF só chega preenchido com o nome "document" */
      id: 'f-cpf', box: 'campo-cpf', chave: 'document',
      valida: function (v) { return cpfValido(v); },
      /* a Cakto espera so os digitos, sem ponto nem traco */
      formata: function (v) { return v.replace(/\D/g, ''); },
      mascara: function (v) { return mascaraCPF(v); }
    }
  ];

  /* (11) 91234-5678 */
  function mascaraTelefone(v) {
    var d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) { return d; }
    if (d.length <= 6) { return '(' + d.slice(0, 2) + ') ' + d.slice(2); }
    if (d.length <= 10) { return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6); }
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  /* 000.000.000-00 */
  function mascaraCPF(v) {
    var d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 3) { return d; }
    if (d.length <= 6) { return d.slice(0, 3) + '.' + d.slice(3); }
    if (d.length <= 9) { return d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6); }
    return d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6, 9) + '-' + d.slice(9);
  }

  /* Confere os dois digitos verificadores. Sem isto, um numero digitado
     errado so seria recusado la no pagamento, depois de o cliente achar
     que ja tinha terminado. */
  function cpfValido(v) {
    var d = v.replace(/\D/g, '');
    if (d.length !== 11) { return false; }
    if (/^(\d)\1{10}$/.test(d)) { return false; }   /* 111.111.111-11 e afins */

    var i, soma, resto;

    soma = 0;
    for (i = 0; i < 9; i++) { soma += parseInt(d.charAt(i), 10) * (10 - i); }
    resto = soma % 11;
    if (parseInt(d.charAt(9), 10) !== (resto < 2 ? 0 : 11 - resto)) { return false; }

    soma = 0;
    for (i = 0; i < 10; i++) { soma += parseInt(d.charAt(i), 10) * (11 - i); }
    resto = soma % 11;
    return parseInt(d.charAt(10), 10) === (resto < 2 ? 0 : 11 - resto);
  }

  /* Vira true na primeira tentativa de avancar. Antes disso, campo vazio nao
     e acusado como erro - ninguem gosta de ver o formulario ficar vermelho
     antes de ter tido a chance de preencher. Depois, vazio conta como erro. */
  var exigirTudo = false;

  function estaErrado(campo) {
    var v = el(campo.id).value;
    if (v.trim() === '') { return exigirTudo; }
    return !campo.valida(v);
  }

  /* Criterio para liberar o botao de compra: aqui vazio sempre pesa. */
  function incompleto(campo) {
    var v = el(campo.id).value;
    return v.trim() === '' || !campo.valida(v);
  }

  function primeiroPendente() {
    for (var i = 0; i < CAMPOS.length; i++) {
      if (incompleto(CAMPOS[i])) { return CAMPOS[i]; }
    }
    return null;
  }

  function marcar(campo, mostrarErro) {
    el(campo.box).classList.toggle('invalido', mostrarErro && estaErrado(campo));
  }

  function rolarPara(alvo, bloco) {
    var suave = !(window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    alvo.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: bloco || 'center' });
  }

  /* Aponta o primeiro campo pendente e leva o cliente ate ele. */
  function cobrarPendencias() {
    exigirTudo = true;
    CAMPOS.forEach(function (c) { marcar(c, true); });
    var falta = primeiroPendente();
    if (falta) {
      rolarPara(el(falta.box), 'center');
      el(falta.id).focus({ preventScroll: true });
    }
    return falta;
  }

  function guardar() {
    var dados = {};
    /* CPF nunca é guardado no navegador (o texto de ajuda do campo promete isso) */
    CAMPOS.forEach(function (c) { if (c.id !== 'f-cpf') { dados[c.chave] = el(c.id).value; } });
    try { localStorage.setItem(GUARDA, JSON.stringify(dados)); }
    catch (e) { /* navegacao privada ou storage cheio: segue sem guardar */ }
  }

  function restaurar() {
    var dados;
    try { dados = JSON.parse(localStorage.getItem(GUARDA)) || {}; }
    catch (e) { dados = {}; }
    CAMPOS.forEach(function (c) {
      if (c.id !== 'f-cpf' && typeof dados[c.chave] === 'string') { el(c.id).value = dados[c.chave]; }
    });
  }

  function ligarCampos() {
    CAMPOS.forEach(function (campo) {
      var input = el(campo.id);

      input.addEventListener('input', function () {
        if (campo.mascara) { input.value = campo.mascara(input.value); }
        marcar(campo, false);   /* enquanto digita, nao acusa erro */
        guardar();
        atualizarLink();
      });

      input.addEventListener('blur', function () {
        marcar(campo, true);    /* ao sair do campo, aponta o que esta errado */
        revalidar();
      });

      /* autopreenchimento do navegador às vezes só dispara "change" */
      input.addEventListener('change', revalidar);
    });
  }

  /* Relê os campos como estão na tela. Necessário porque o navegador pode
     preencher sozinho (autopreenchimento, ou ao recarregar a página) sem
     avisar a página — aí o botão ficava cinza com tudo preenchido. */
  function revalidar() {
    CAMPOS.forEach(function (c) {
      var input = el(c.id);
      if (c.mascara && input.value) { input.value = c.mascara(input.value); }
    });
    if (planoAtual) { atualizarLink(); }
  }

  /* ================== link final para o checkout externo ================= */

  function atualizarLink() {
    var cta = el('cta');
    var aviso = el('aviso');
    var p = PLANOS[planoAtual];

    if (!configurado(p)) {
      cta.removeAttribute('href');
      cta.setAttribute('aria-disabled', 'true');
      cta.textContent = 'LINK DE PAGAMENTO NÃO CONFIGURADO';
      el('aviso-plano').textContent = p.nome;
      aviso.classList.add('on');
      return;
    }

    aviso.classList.remove('on');

    /* Sem os quatro campos validos o botao fica travado: o objetivo e que
       ninguem chegue no pagamento com dado faltando ou errado. */
    if (primeiroPendente()) {
      cta.removeAttribute('href');
      cta.setAttribute('aria-disabled', 'true');
      cta.textContent = 'PREENCHA SEUS DADOS ACIMA';
      return;
    }

    cta.href = linkPara(p);
    cta.removeAttribute('aria-disabled');
    cta.textContent = 'IR PARA O PAGAMENTO SEGURO';
  }

  /* link de pagamento do plano, levando os dados preenchidos para o cliente
     nao digitar tudo de novo */
  function linkPara(p) {
    var extras = [];
    CAMPOS.forEach(function (c) {
      var v = el(c.id).value.trim();
      if (c.formata) { v = c.formata(v); }
      extras.push(encodeURIComponent(c.chave) + '=' + encodeURIComponent(v));

      /* a Cakto tem campo de confirmacao de e-mail; sem isto o cliente
         digitaria o mesmo endereco duas vezes do outro lado */
      if (c.chave === 'email') {
        extras.push('confirmEmail=' + encodeURIComponent(v));
      }
    });
    return p.pay + '?' + extras.join('&');
  }

  /* ======================= upgrade + downsell (funil) ===================== */

  var funil = { decidido: false, aberto: false };

  function fillText(id, txt) { var e = el(id); if (e) { e.textContent = txt; } }

  /* Preenche todos os números da oferta a partir de PLANOS e FUNIL,
     para a copy nunca ficar diferente dos preços reais. */
  function preencherFunil() {
    var b = PLANOS.basico.preco, c = PLANOS.premium.preco, e = PLANOS.essencial.preco;
    var soma = FUNIL.app.valor + FUNIL.bonus1.valor + FUNIL.bonus2.valor;
    fillText('fn-basico', brl(b));
    fillText('fn-basico-2', brl(b));
    fillText('fn-completo', brl(c));
    fillText('fn-completo-2', brl(c));
    fillText('fn-completo-3', brl(c));
    fillText('fn-dif-completo', brl(c - b));
    fillText('fn-soma', brl(soma));
    fillText('fn-essencial', brl(e));
    fillText('fn-dif-essencial', brl(e - b));
    fillText('fn-economia', brl(c - e));
    ['app', 'bonus1', 'bonus2'].forEach(function (k) {
      fillText('fn-' + k + '-nome', FUNIL[k].nome);
      fillText('fn-' + k + '-det', FUNIL[k].detalhe);
      fillText('fn-' + k + '-valor', brl(FUNIL[k].valor));
      document.querySelectorAll('[data-fn-img="' + k + '"]').forEach(function (img) { img.src = FUNIL[k].img; });
      document.querySelectorAll('[data-fn-nome="' + k + '"]').forEach(function (s) { s.textContent = FUNIL[k].nome; });
    });
  }

  function mostrarEtapa(qual) {
    el('funil-upgrade').hidden = qual !== 'upgrade';
    el('funil-downsell').hidden = qual !== 'downsell';
    var caixa = el('funil-caixa');
    caixa.setAttribute('aria-labelledby', qual === 'upgrade' ? 'funil-t1' : 'funil-t2');
    caixa.scrollTop = 0;
    /* reinicia a animação de retirada dos bônus */
    var card = el('funil-reducao');
    card.classList.remove('animar');
    if (qual === 'downsell') { void card.offsetWidth; card.classList.add('animar'); }
    var titulo = el(qual === 'upgrade' ? 'funil-t1' : 'funil-t2');
    titulo.focus({ preventScroll: true });
  }

  function abrirFunil(qual) {
    preencherFunil();
    el('funil').hidden = false;
    document.body.classList.add('funil-aberto');
    funil.aberto = true;
    mostrarEtapa(qual || 'upgrade');
  }

  function fecharFunil() {
    el('funil').hidden = true;
    document.body.classList.remove('funil-aberto');
    funil.aberto = false;
  }

  function escolherPlano(chave) {
    montarSeletor(chave);
    render(chave);
  }

  /* Depois da decisão, segue direto para o pagamento do plano escolhido.
     Se o link ainda não estiver configurado, volta ao checkout e mostra o aviso. */
  function seguirParaPagamento() {
    fecharFunil();
    var p = PLANOS[planoAtual];
    if (configurado(p) && !primeiroPendente()) {
      window.location.href = linkPara(p);
    } else {
      rolarPara(el('cta'), 'center');
    }
  }

  function ligarFunil() {
    el('aceitar-completo').addEventListener('click', function () {
      funil.decidido = true;
      escolherPlano('premium');
      seguirParaPagamento();
    });
    el('recusar-completo').addEventListener('click', function () {
      mostrarEtapa('downsell');
    });
    el('aceitar-essencial').addEventListener('click', function () {
      funil.decidido = true;
      escolherPlano('essencial');
      seguirParaPagamento();
    });
    el('recusar-essencial').addEventListener('click', function () {
      funil.decidido = true;          /* continua com o Básico */
      seguirParaPagamento();
    });
    /* Esc fecha sem decidir: no próximo clique em pagar, a oferta volta */
    document.addEventListener('keydown', function (ev) {
      if (funil.aberto && ev.key === 'Escape') { fecharFunil(); }
    });
  }

  /* ====================== cartoes de escolha de plano ===================== */

  function montarSeletor(atual) {
    var alvo = el('planos');
    alvo.innerHTML = '';

    Object.keys(PLANOS).forEach(function (chave) {
      var p = PLANOS[chave];
      /* planos ocultos (Premium Essencial) só aparecem se forem o escolhido */
      if (p.oculto && chave !== atual) { return; }

      var label = document.createElement('label');
      label.className = 'plano';

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'plano';
      input.value = chave;
      input.checked = (chave === atual);

      var marca = document.createElement('span');
      marca.className = 'marca';
      marca.setAttribute('aria-hidden', 'true');

      var corpo = document.createElement('span');
      corpo.className = 'corpo';

      var titulo = document.createElement('span');
      titulo.className = 'titulo';
      titulo.appendChild(document.createTextNode(p.nome));
      if (p.selo) {
        var selo = document.createElement('span');
        selo.className = 'selo';
        selo.textContent = p.selo;
        titulo.appendChild(selo);
      }

      var resumo = document.createElement('span');
      resumo.className = 'resumo';
      resumo.textContent = p.resumo;

      var linha = document.createElement('span');
      linha.className = 'linha-preco';

      var preco = document.createElement('span');
      preco.className = 'p';
      preco.textContent = brl(p.preco);
      linha.appendChild(preco);

      if (p.de) {
        var de = document.createElement('span');
        de.className = 'p-de';
        de.textContent = brl(p.de);
        linha.appendChild(de);
      }
      if (p.parcelas) {
        var parc = document.createElement('span');
        parc.className = 'p-parc';
        parc.textContent = 'ou ' + p.parcelas;
        linha.appendChild(parc);
      }

      corpo.appendChild(titulo);
      corpo.appendChild(resumo);
      corpo.appendChild(linha);

      label.appendChild(input);
      label.appendChild(marca);
      label.appendChild(corpo);
      alvo.appendChild(label);

      input.addEventListener('change', function () {
        if (input.checked) { render(chave); }
      });
    });
  }

  /* ============================= order bumps ============================== */

  var bumpsMarcados = {};

  function bumpsVisiveis() {
    return BUMPS.filter(function (b) { return b.ocultarNoPlano !== planoAtual; });
  }

  function montarBumps() {
    var alvo = el('bumps');
    var lista = bumpsVisiveis();
    el('bumps-bloco').hidden = lista.length === 0;
    alvo.innerHTML = '';

    lista.forEach(function (b) {
      var label = document.createElement('label');
      label.className = 'bump' + (bumpsMarcados[b.id] ? ' on' : '');

      var topo = document.createElement('span');
      topo.className = 'bump-topo';
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!bumpsMarcados[b.id];
      var caixa = document.createElement('span');
      caixa.className = 'bump-caixa';
      caixa.setAttribute('aria-hidden', 'true');
      var chamada = document.createElement('span');
      chamada.className = 'bump-chamada';
      chamada.textContent = 'Sim! Quero adicionar ao meu pedido';
      topo.appendChild(input);
      topo.appendChild(caixa);
      topo.appendChild(chamada);

      var corpo = document.createElement('span');
      corpo.className = 'bump-corpo';

      var thumb = document.createElement('span');
      thumb.className = 'bump-thumb';
      var img = document.createElement('img');
      img.src = b.img;
      img.alt = b.nome;
      img.loading = 'lazy';
      img.onerror = function () { thumb.classList.add('sem-img'); img.remove(); };
      thumb.appendChild(img);

      var info = document.createElement('span');
      info.className = 'bump-info';
      var nome = document.createElement('span');
      nome.className = 'bump-nome';
      nome.textContent = b.nome;
      var desc = document.createElement('span');
      desc.className = 'bump-desc';
      desc.textContent = b.desc;
      var preco = document.createElement('span');
      preco.className = 'bump-preco';
      if (typeof b.preco === 'number') {
        if (b.de) {
          var de = document.createElement('del');
          de.textContent = brl(b.de);
          preco.appendChild(de);
        }
        var por = document.createElement('strong');
        por.textContent = '+ ' + brl(b.preco);
        preco.appendChild(por);
      } else {
        preco.textContent = 'Preço a definir';
        preco.classList.add('pendente');
      }
      info.appendChild(nome);
      info.appendChild(desc);
      info.appendChild(preco);

      corpo.appendChild(thumb);
      corpo.appendChild(info);
      label.appendChild(topo);
      label.appendChild(corpo);
      alvo.appendChild(label);

      input.addEventListener('change', function () {
        bumpsMarcados[b.id] = input.checked;
        label.classList.toggle('on', input.checked);
        atualizarTotal();
      });
    });
  }

  function atualizarTotal() {
    var p = PLANOS[planoAtual];
    var total = p.preco;
    var box = el('resumo-bumps');
    box.innerHTML = '';

    bumpsVisiveis().forEach(function (b) {
      if (!bumpsMarcados[b.id]) { return; }
      var valor = typeof b.preco === 'number' ? b.preco : 0;
      total += valor;
      var linha = document.createElement('div');
      linha.className = 'resumo-linha';
      var n = document.createElement('span');
      n.textContent = '+ ' + b.nome;
      var v = document.createElement('span');
      v.textContent = typeof b.preco === 'number' ? brl(b.preco) : 'a definir';
      linha.appendChild(n);
      linha.appendChild(v);
      box.appendChild(linha);
    });

    el('total').textContent = brl(total);
  }

  /* ===================== carrinho, inclusos e resumo ====================== */

  function render(chave) {
    planoAtual = chave;
    var p = PLANOS[chave];

    /* carrinho */
    el('item-img').src = p.img;
    el('item-img').alt = p.nome + ' — Bloxmática';
    el('item-nome').textContent = p.nome;
    el('item-desc').textContent = p.desc;
    el('item-preco').textContent = brl(p.preco);

    var de = el('item-de');
    if (p.de) { de.textContent = brl(p.de); de.hidden = false; }
    else { de.hidden = true; }

    /* o que esta incluso */
    var lista = el('inclui');
    lista.innerHTML = '';
    p.inclui.forEach(function (txt) {
      var li = document.createElement('li');
      li.innerHTML = CHECK;
      li.appendChild(document.createTextNode(txt));
      lista.appendChild(li);
    });

    /* resumo */
    el('sub-nome').textContent = p.nome;
    el('sub-valor').textContent = brl(p.preco);
    el('parcelado').textContent = p.parcelas ? 'ou ' + p.parcelas : 'Pagamento único';

    montarBumps();
    atualizarTotal();
    atualizarLink();

    /* mantem a URL coerente com o plano escolhido, sem recarregar */
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('plano', chave);
      history.replaceState(null, '', u);
    } catch (e) { /* navegador antigo: ignora */ }

    document.title = p.nome + ' — Checkout Bloxmática';
  }

  /* --------- qual plano veio da landing? ?plano=basico | premium --------- */
  function planoInicial() {
    var p = new URLSearchParams(window.location.search).get('plano');
    if (p) { p = p.toLowerCase().trim(); }
    return PLANOS[p] ? p : 'premium';
  }

  /* ================================ inicio =============================== */

  document.addEventListener('DOMContentLoaded', function () {
    restaurar();
    ligarCampos();

    var inicial = planoInicial();
    montarSeletor(inicial);
    render(inicial);
    ligarFunil();

    /* pré-visualização: checkout.html?plano=basico&ver=upgrade (ou ver=downsell) */
    var ver = new URLSearchParams(window.location.search).get('ver');
    if (FUNIL.ativo && (ver === 'upgrade' || ver === 'downsell')) { abrirFunil(ver); }

    /* Atalho: desce ate o botao de compra, ou cobra o que falta antes. */
    /* confere de novo depois que o navegador termina de preencher os campos */
    setTimeout(revalidar, 300);
    setTimeout(revalidar, 1200);
    window.addEventListener('load', revalidar);
    window.addEventListener('pageshow', revalidar);

    el('descer').addEventListener('click', function () {
      revalidar();
      if (cobrarPendencias()) { return; }
      rolarPara(el('cta'), 'center');
    });

    el("cta").addEventListener("click", function (ev) {
      revalidar();   /* garante que o botão reflete o que está na tela agora */
      /* Cliente do Básico com os dados completos: antes de pagar, oferece o
         upgrade (e, se recusar, o downsell). Só uma vez por visita. */
      if (FUNIL.ativo && planoAtual === 'basico' && !funil.decidido && !primeiroPendente()) {
        ev.preventDefault();
        abrirFunil('upgrade');
        return;
      }
      if (el("cta").getAttribute("aria-disabled") === "true") {
        ev.preventDefault();
        cobrarPendencias();   /* mostra o que falta em vez de so nao reagir */
        return;
      }
    });
  });

})();
