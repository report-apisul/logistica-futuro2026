const fs = require('fs');
const path = require('path');

const ROOT = path.dirname(__dirname);
const OUT = path.join(ROOT, 'entrevistas');

const NAV = `<nav class="site-nav">
  <a class="brand" href="../index.html">Logística do Futuro</a>
  <input type="checkbox" id="navToggle" class="nav-toggle-input">
  <div class="links">
    <a href="../index.html#evento">O evento</a>
    <a href="../palestra.html">Palestra</a>
    <a href="../entrevistas/index.html" class="active">Entrevistas</a>
    <a href="../videos.html">Vídeos</a>
  </div>
  <label for="navToggle" class="nav-toggle-btn" aria-label="Abrir menu">
    <span class="bars"><span></span><span></span><span></span></span>
  </label>
  <a class="cta" href="../entrevistas/index.html">Ver todas</a>
</nav>`;

const FOOTER = `<footer class="site-footer">
  <div class="wrap">
    <p>Logística do Futuro · cobertura especial do Grupo Apisul.</p>
    <p><a href="../index.html">Voltar ao início</a></p>
  </div>
</footer>`;

function mdInline(s) {
  let out = '';
  let i = 0;
  let boldOpen = false, emOpen = false;
  while (i < s.length) {
    if (s.slice(i, i + 2) === '**') {
      out += boldOpen ? '</strong>' : '<strong>';
      boldOpen = !boldOpen;
      i += 2;
    } else if (s[i] === '*') {
      out += emOpen ? '</em>' : '<em>';
      emOpen = !emOpen;
      i += 1;
    } else {
      out += s[i];
      i += 1;
    }
  }
  return out;
}

function pOrQuote(block) {
  block = block.trim();
  if (block.startsWith('*"') && block.endsWith('"*')) {
    const text = block.slice(2, -2);
    return `<blockquote><p>${text}</p></blockquote>`;
  }
  if (block.startsWith('**') && block.endsWith('**') && !block.slice(2, -2).includes('**')) {
    return `<h2>${block.slice(2, -2)}</h2>`;
  }
  return `<p>${mdInline(block)}</p>`;
}

function renderBody(blocks) {
  const out = [];
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    if (b.startsWith('- ')) {
      const items = b.split('\n').map(li => li.replace(/^- /, '').trim());
      const lis = items.map(li => `<li>${mdInline(li)}</li>`).join('');
      out.push(`<ul>${lis}</ul>`);
    } else {
      out.push(pOrQuote(b));
    }
  }
  return out.join('\n      ');
}

const COMPANIES = [
  { n: 1, slug: 'multisat', name: 'MultiSat', photo: 'multisat.png',
    kicker: 'Do monitoramento à prevenção',
    title: 'Do monitoramento à antecipação: o novo papel do gerenciamento de risco',
    byline: 'Por Eduardo Domingues, diretor de operações da Apisul',
    dek: 'Câmeras embarcadas geram milhares de eventos por dia. A IA aprendeu a separar o que é ruído do que é risco real, e o motorista virou parte da equação, não só o veículo.',
    body: [
      'O gerenciamento de risco está passando por uma mudança de conceito. Durante muitos anos, a atividade foi estruturada para identificar e reagir ao risco. O próximo passo é antecipá-lo. Isso significa combinar tecnologia, dados, inteligência artificial e conhecimento operacional para identificar comportamentos e padrões antes que eles se transformem em acidentes, sinistros ou perdas.',
      'É nesse cenário que a MultiSat, estrutura de gerenciamento de risco do Grupo Apisul, combina monitoramento, telemetria, inteligência artificial e análise de comportamento do motorista.',
      'Segundo Eduardo Domingues, diretor de operações da Apisul, a necessidade mais evidente hoje está na prevenção de acidentes.',
      '*"A dor mais exposta do mercado hoje é o aumento dos acidentes de trânsito e a necessidade de realizar a gestão comportamental do motorista na prevenção de acidentes."*',
      'Muitos motoristas dirigem da mesma forma há décadas, sem nunca terem recebido acompanhamento estruturado sobre seu comportamento ao volante.',
      '**O problema não é ter informação, é saber o que ignorar**',
      'Em uma operação de grande escala, gerar dado é fácil. Câmeras embarcadas produzem milhares de eventos por dia. Um bocejo, uma sombra, um movimento de cabeça: qualquer um desses dispara um alerta de fadiga que, isolado, não significa nada.',
      'A triagem acontece antes de chegar ao operador:',
      '*"A central utiliza inteligência artificial na nuvem para realizar a filtragem dos milhares de eventos gerados pelas câmeras embarcadas, eliminando os falsos positivos, como bocejos comuns e sombras. O operador humano recebe apenas os eventos validados de risco elevado."*',
      'A tecnologia não decide no lugar do operador. Ela filtra o que chega até ele.',
      '**O motorista também pode evoluir**',
      'A MultiSat avalia o profissional de outra forma. Em vez de aprovado ou reprovado, o sistema constrói um histórico. Boa conduta ao longo do tempo vira pontuação, e pontuação abre porta.',
      'Condutores com pontuação elevada ganham prioridade para transportar cargas de altíssimo valor. Quem está começando opera em cargas de menor exposição até provar consistência.',
      'O cadastro deixa de ser apenas uma fotografia daquele momento e passa a considerar a jornada e o histórico do profissional. Experiência, comportamento e consistência passam a compor uma visão evolutiva de risco, permitindo decisões mais assertivas sobre o perfil de operação adequado para cada motorista.',
      '**Da prevenção ao ecossistema**',
      'A MultiSat aponta para maior integração entre as camadas da operação: de um lado o gerenciamento de risco tradicional, focado em roubo de cargas; de outro, a gestão logística e a prevenção de acidentes.',
      'O futuro não está em ter uma central para logística, outra para gerenciamento de risco e outra para prevenção de acidentes. O futuro está em uma Torre de Controle Unificada, capaz de enxergar a jornada de forma completa. Risco, logística, comportamento do motorista, tecnologia e inteligência precisam conversar dentro do mesmo ecossistema.',
      '*"Quando conseguimos conectar essas informações, deixamos de simplesmente monitorar uma viagem. Passamos a entender o que está acontecendo, antecipar o que pode acontecer e atuar antes que um desvio se transforme em perda. Para mim, essa é a evolução do gerenciamento de risco."*',
    ],
    raiox: {
      o_que_e: 'A estrutura de gerenciamento de risco do Grupo Apisul, focada em prevenção de acidentes além do combate a roubo de cargas.',
      problema: 'Câmeras embarcadas geram milhares de alertas por dia. A maioria é falso positivo. A IA filtra antes de chegar ao operador humano.',
      inovacao: 'Sistema de pontuação por experiência: motoristas evoluem de cargas menores para cargas de alto valor conforme constroem histórico de boa conduta.',
      futuro: 'Torre de Controle Unificada, juntando risco, logística e prevenção de acidentes em uma única plataforma.',
    } },

  { n: 2, slug: 'apisul-corretora-seguros', name: 'Apisul Corretora de Seguros', photo: 'apisul-corretora-seguros.png',
    kicker: 'Quando a apólice conhece a estrada',
    title: 'Seguro pensado para quem vive a operação',
    byline: 'Por João Machnick, Grupo Apisul',
    dek: 'Coberturas que não existem em catálogo nenhum, criadas a partir de prejuízo real relatado por cliente, e uma reguladora própria que chega antes do saque da carga.',
    body: [
      'Vender seguro para transporte de cargas costuma significar aplicar uma tabela genérica sobre um risco que, na prática, muda de rota para rota. A Apisul Corretora trabalha diferente: constrói a apólice a partir do que realmente acontece na operação do cliente.',
      '*"A Corretora de Seguros do Grupo Apisul é especializada na cadeia de transporte e logística. Atuamos de forma consultiva junto a embarcadores e transportadores."*',
      'Fazer parte de um grupo maior muda o poder de negociação. E muda também o que acontece depois que o sinistro ocorre.',
      '**A resposta rápida importa mais que a cobertura no papel**',
      'Um acidente na estrada não é só um problema de indenização. É uma corrida contra o tempo antes que a carga seja saqueada.',
      '*"Contamos com a estrutura própria da reguladora de sinistros Excel, cujas equipes prestam atendimento presencial imediato em acidentes para socorrer o motorista e conter o saque de mercadorias."*',
      'Isso muda a lógica da apólice. Não é só pagar depois do prejuízo, é reduzir o prejuízo enquanto ele ainda está acontecendo.',
      '**Coberturas que nasceram de conversa, não de catálogo**',
      'A corretora criou três produtos que não existem no seguro tradicional:',
      '- **Perda de frete**: protege o transportador quando a carga é danificada e o embarcador retém o pagamento por causa disso.\n- **Responsabilidade ambiental**: cobre vazamento de produtos químicos, combustíveis e cargas perigosas em rodovias ou mananciais.\n- **Variação de temperatura e quebra de máquina**: protege o transporte de congelados e refrigerados contra falha mecânica no motor do refrigerador da carreta.',
      'Nenhuma dessas coberturas nasceu de planilha. Nasceu de cliente relatando um prejuízo que o seguro comum não cobria.',
      '**O papel da corretora não termina na venda**',
      '*"Nosso papel não é apenas vender uma apólice, mas estar presente no dia a dia da operação. Nós traduzimos o perfil de risco real do cliente para a seguradora, garantindo que ele tenha coberturas personalizadas para sazonalidades sem lacunas de proteção."*',
      'Uma apólice parada no tempo vira uma apólice furada. Se a operação do cliente muda, novo tipo de carga, nova rota, novo pico de demanda, e a cobertura não acompanha, o risco de sinistro sem cobertura sobe.',
    ],
    raiox: {
      o_que_e: 'Corretora especializada em transporte e logística dentro do Grupo Apisul, com atuação consultiva junto a embarcadores e transportadores.',
      problema: 'Falta de cobertura adequada para riscos específicos do setor e lentidão no atendimento após o sinistro.',
      inovacao: 'Coberturas criadas sob medida: perda de frete, responsabilidade ambiental e variação de temperatura com quebra de máquina.',
      futuro: 'Incentivos tarifários para frotas que adotam tecnologia de prevenção de acidentes e telemetria comportamental.',
    } },

  { n: 3, slug: 'apisul-produtos-digitais-ia', name: 'Apisul Produtos Digitais & IA', photo: 'apisul-produtos-digitais-ia.png',
    kicker: 'O filme, não a foto',
    title: 'Como a Apisul lê o comportamento do motorista em tempo real',
    byline: 'Por Daniel Nobre, superintendente de Produtos Digitais e Tecnologia do Grupo Apisul',
    dek: 'Um supercomputador na nuvem processa cinco câmeras simultâneas em vinte segundos, e um agente de voz por IA já liga sozinho para tratar alertas de rotina.',
    body: [
      'Uma câmera embarcada consegue ver um olho fechado. O que ela não consegue é dizer se aquilo é sono, ofuscamento de farol ou uma piscada comum. Foi esse limite de processamento que levou a Apisul a tirar a inteligência artificial de dentro do caminhão e colocá-la na nuvem.',
      '*"A nossa vertical de tecnologia é dividida em três pilares: infraestrutura interna, produtos digitais e o Centro de Pesquisa e Inovação. Nossa função é antecipar tendências de mercado."*',
      'A plataforma que sustenta essa operação, a Apisul Integra, existe desde 2006. Duas décadas de desenvolvimento contínuo e integração nativa com mais de dez tecnologias de rastreamento do mercado.',
      '**Um supercomputador olhando cinco câmeras ao mesmo tempo**',
      'Enquanto o hardware embarcado no caminhão processa recortes isolados (cinto, olho fechado, celular na mão), a nuvem faz outra conta.',
      '*"Um supercomputador processa até cinco câmeras simultâneas em menos de vinte segundos, avaliando o semblante do motorista e elementos da rodovia, como leitura de placas de velocidade."*',
      'A diferença não é só velocidade. É contexto.',
      '**A foto engana, o filme não**',
      'Uma frenagem brusca isolada pode ser uma manobra defensiva legítima. O problema aparece quando ela se repete dentro de um padrão.',
      '*"O sistema não analisa apenas um segundo isolado de imagem. Ele cruza o vídeo com os dados telemáticos da viagem dos últimos trinta minutos: velocidade, aceleração lateral, frenagens bruscas, jornada e histórico. Uma frenagem isolada pode ser uma manobra defensiva legítima; porém, se combinada a excesso de velocidade e uso de celular minutos antes, o risco é classificado no nível máximo."*',
      'É essa combinação de eventos, e não um evento isolado, que decide se o alerta sobe para um operador humano ou não.',
      '**Quando o alerta vira ligação telefônica**',
      'A última peça dessa arquitetura é o Bino, um agente de voz que liga para o motorista ou para o transportador quando algo precisa ser tratado.',
      '*"O Bino realiza chamadas telefônicas automatizadas em linguagem natural diretamente para motoristas ou transportadores para tratar alertas de fadiga, paradas não informadas ou desvios de conduta. O Bino já está em operação ativa na central da Apisul tratando eventos de rotina e liberando a equipe humana para atendimentos de alta complexidade."*',
      'A lógica é dividir o trabalho por complexidade. O que é rotina, a máquina resolve. O que exige julgamento, vai para uma pessoa.',
    ],
    raiox: {
      o_que_e: 'O centro de tecnologia e inovação do Grupo Apisul, responsável pela plataforma Apisul Integra e pelos modelos de IA para vídeo e voz.',
      problema: 'Câmeras embarcadas processam apenas recortes isolados. A nuvem cruza vídeo com telemetria e histórico para entender o contexto real da viagem.',
      inovacao: 'O Bino, agente de voz por IA que liga automaticamente para motoristas e transportadores para tratar alertas de rotina.',
      futuro: 'Agentes de IA atuando de forma preditiva, orientando o condutor antes que o risco vire acidente.',
    } },

  { n: 4, slug: 'carga-online', name: 'Carga Online', photo: 'carga-online.png',
    kicker: 'Motorista engajado, não motorista pressionado',
    title: 'A plataforma que trava o caminhão antes da viagem começar',
    byline: null,
    dek: 'Quatro módulos, um objetivo: reduzir turnover, diesel e avarias, a começar pelo checklist que impede a saída de um veículo com pendência.',
    body: [
      'A Carga Online parte de um diagnóstico direto: fiscalizar mais não resolve o problema de fundo da frota. O caminho é engajar o motorista antes da viagem começar.',
      '*"A Carga Online é uma plataforma que apoia a transportadora e os embarcadores na gestão dos motoristas. Nós criamos quatro módulos principais que entregam justamente essa eficiência operacional."*',
      '**Quatro módulos, um só objetivo**',
      'Capacitação, ambientação, gestão documental e checklists operacionais. Cada módulo ataca uma dor específica da operação.',
      '*"Do que a gente tá falando de resultado, no fim das contas: redução de consumo de diesel, redução de turnover, redução de avarias e sinistros da frota."*',
      '**O checklist que trava o caminhão antes da viagem**',
      'Um caminhão com pendência técnica ou documental simplesmente não sai da garagem.',
      '*"A verificação digitalizada via checklist impede que um caminhão com pendências técnicas ou documentais inicie a viagem, evitando paradas não planejadas e fiscalizações com retenção."*',
      'Isso evita a multa na estrada. Mas o efeito maior aparece antes: no tempo que leva para um motorista novo virar um motorista produtivo.',
      '*"O módulo de ambientação acelera a integração e reduz o custo da curva de aprendizado em um cenário de escassez de profissionais."*',
    ],
    raiox: {
      o_que_e: 'Plataforma de gestão de motoristas para transportadoras e embarcadores, estruturada em quatro módulos.',
      problema: 'Alto turnover, consumo excessivo de diesel e avarias causadas por falta de treinamento ou checagem preventiva do veículo.',
      inovacao: 'Checklist digital que bloqueia a saída do caminhão com pendência técnica ou documental.',
      futuro: 'Unificar capacitação, engajamento e desempenho em um único indicador de confiabilidade do motorista.',
    } },

  { n: 5, slug: 'trucks-control', name: 'Trucks Control', photo: 'trucks-control.png',
    kicker: 'Quando o jammer entra em cena',
    title: 'O caminhão vizinho vira rede',
    byline: null,
    dek: 'Uma rede própria entre veículos mantém a comunicação viva mesmo quando o sinal de celular é bloqueado de propósito por criminosos.',
    body: [
      'A Trucks Control resolve um problema específico: o que acontece quando o sinal do rastreador é derrubado de propósito.',
      '*"A Trucks Control fornece tecnologia de rastreamento com controle de jornada, câmeras veiculares, sensores de temperatura e umidade, travas de baú e trava de quinta roda para desengate."*',
      '**Caminhões amigos**',
      'Um jammer bloqueia sinal de celular. Não bloqueia a rede que a Trucks Control criou entre os próprios veículos.',
      '*"Mesmo tendo a comunicação de celular afetada por um jammer próximo utilizado por criminosos, o equipamento mantém a comunicação via rede LoRa através de um conceito que chamamos de caminhões amigos. Um caminhão próximo equipado com a nossa tecnologia consegue capturar e retransmitir o sinal e a posição do outro veículo."*',
      '**Um mês de gravação por câmera**',
      'Até seis câmeras por conjunto transportador, com cartão de memória de até 1 TB.',
      '*"As imagens e alertas ficam armazenados nos nossos servidores por até seis meses. A estrutura física dentro do caminhão aceita cartões de memória de até 1 TB, garantindo entre 25 e 30 dias de gravação contínua 24 horas por dia para perícias e análises retroativas de acidentes."*',
      '**O próximo passo é a área sem sinal nenhum**',
      '*"Estamos abrindo a banda para receber outras informações, como envio de fotos de comprovantes e navegadores rodoviários para áreas remotas. É como ter um Waze integrado nativamente ao rastreador para rodar em regiões sem cobertura celular."*',
    ],
    raiox: {
      o_que_e: 'Tecnologia de rastreamento, telemetria e câmeras veiculares, com foco em segurança e visibilidade de frota.',
      problema: 'Perda de sinal por jammer e falta de visibilidade sobre o estado real da frota em tempo real.',
      inovacao: 'Rede entre caminhões (LoRaWAN) que retransmite sinal quando o celular é bloqueado por interferência criminosa.',
      futuro: 'Expansão do canal via satélite para navegação e envio de imagens em áreas sem cobertura celular.',
    } },

  { n: 6, slug: 'omnilink', name: 'OmniLink', photo: 'omnilink.png',
    kicker: 'Vinte e seis anos de hardware',
    title: 'Até virar integrador de qualquer tecnologia',
    byline: null,
    dek: 'De fabricante de rastreador a integrador universal, com um sensor de pneu que avisa antes do incêndio e um checklist que roda só no WhatsApp.',
    body: [
      'A OmniLink não nasceu como plataforma. Nasceu como fabricante de rastreador e foi mudando de papel conforme o mercado se fragmentava.',
      '*"A OmniLink é uma empresa de tecnologia com soluções voltadas para todo o ecossistema do transporte. A OmniLink tem 26 anos de mercado e foi uma das pioneiras no setor. Hoje não somos apenas uma empresa de hardware, mas desenvolvemos plataformas, softwares e um integrador capaz de operar com qualquer tecnologia de mercado."*',
      '**O pneu que avisa antes de pegar fogo**',
      'Grande parte dos incêndios em carretas começa no pneu, por superaquecimento.',
      '*"O TPMS mede a pressão e a temperatura interna dos pneus em tempo real e online. Além de prevenir acidentes e incêndios, o sistema calcula o desgaste da borracha em milímetros para controle do custo por quilômetro rodado."*',
      '**Checklist pelo WhatsApp, sem instalar nada no caminhão**',
      '*"Lançamos também o Omnicom, que é um chatbot automatizado via WhatsApp. Ele permite realizar checklists do veículo, verificação do acondicionamento de carga e confirmações de entrega no celular do motorista, sem necessidade de rastreador ou hardware no veículo."*',
      '**Desenvolvimento próprio na China**',
      '*"A OmniLink possui um escritório de desenvolvimento próprio em Shenzhen, na China, para acelerar a inovação de hardware."*',
    ],
    raiox: {
      o_que_e: 'Empresa de tecnologia com 26 anos de mercado, hoje atuando como integrador de qualquer tecnologia de rastreamento.',
      problema: 'Fragmentação de sistemas em frotas com múltiplos fornecedores e prevenção de incêndio por superaquecimento de pneu.',
      inovacao: 'TPMS online (pneu conectado) e Omnicom, checklist automatizado via WhatsApp sem hardware no veículo.',
      futuro: 'Software integrador único, funcionando como torre logística central com IA para análise comportamental.',
    } },

  { n: 7, slug: 'sighra', name: 'SIGhRA', photo: 'sighra.png',
    kicker: 'O rosto como chave',
    title: 'Biometria facial trava o caminhão até confirmar quem está dirigindo',
    byline: null,
    dek: 'Rastreamento, gerenciamento de risco, telemetria e videomonitoramento reunidos numa interface só, travada por reconhecimento facial do motorista.',
    body: [
      'A SIGhRA aposta em um único ponto de verdade: se o rosto não bate com o cadastro, o caminhão não sai.',
      '*"A SIGhRA é uma empresa de tecnologia com 17 anos de mercado no segmento de rastreamento e gerenciamento de risco. Desenvolvemos hardware e plataforma proprietários com leitura de dados telemáticos do veículo, gerando relatórios de desempenho, consumo de combustível e indicadores de uso da frota."*',
      '**Um sistema só, em vez de cinco**',
      '*"Sabemos da dificuldade das empresas em treinar pessoas para operar softwares complexos. Na SIGhRA, reunimos rastreamento, gerenciamento de risco, controle de jornada, telemetria, rotograma, videomonitoramento e análise comportamental por IA em uma interface simples."*',
      '**Face ID no caminhão**',
      '*"Lançamos o módulo de identificação e validação por biometria facial com gabarito. O sistema exige a validação facial do condutor antes do início da viagem e após paradas operacionais. Se a face não corresponder ao motorista autorizado pelo cadastro do gerenciamento de risco, o veículo permanece bloqueado."*',
      'Isso não atende só o transportador. Atende também quem segura o risco financeiro da operação.',
      '*"Essa solução atende tanto às exigências do transportador quanto das seguradoras e gerenciadoras de risco."*',
    ],
    raiox: {
      o_que_e: 'Empresa de tecnologia com 17 anos de mercado, com hardware e software próprios para rastreamento e gerenciamento de risco.',
      problema: 'Múltiplos sistemas desconectados na mesma frota e falta de garantia sobre quem realmente está no volante.',
      inovacao: 'Biometria facial com gabarito: o caminhão trava se o rosto não corresponder ao motorista cadastrado.',
      futuro: 'Análise comportamental contínua por IA e liberação automatizada de travas via API com parceiros de gerenciamento de risco.',
    } },

  { n: 8, slug: 'jomed', name: 'Jomed Transportadora', photo: null,
    kicker: 'Frota nova, biometano e um prêmio de peso',
    title: 'Como reter motorista num mercado em escassez',
    byline: null,
    dek: '54 veículos movidos a biometano, idade média de frota de 2,5 anos, e um automóvel zero quilômetro pro melhor motorista do ano.',
    body: [
      'A Jomed resolve dois problemas ao mesmo tempo: exigência de ESG dos grandes embarcadores e escassez de motorista qualificado.',
      '*"A Jomed é responsável por operações de transporte rodoviário de alta exigência, como o atendimento dedicado à Mondelēz e a grandes embarcadores. Nosso projeto de sustentabilidade conta atualmente com 54 veículos movidos a biometano. Não rodamos com veículos com mais de 10 anos de uso. A idade média da nossa frota própria hoje é de apenas 2,5 anos."*',
      '**A câmera que já livrou motorista de acusação injusta**',
      '*"A câmera dianteira já nos livrou de falsas acusações em acidentes de trânsito onde terceiros colidiram contra o caminhão, provando a isenção de responsabilidade do nosso motorista."*',
      '**Reter motorista custa menos que substituir**',
      '*"Oferecemos conforto com caminhões novos e bem equipados, remuneração atrativa e programas de premiação. O melhor motorista da nossa frota no último ano foi premiado com um automóvel zero quilômetro."*',
    ],
    raiox: {
      o_que_e: 'Transportadora especializada em operações de alta exigência para grandes embarcadores, com frota própria sustentável.',
      problema: 'Metas ESG dos embarcadores aliadas à garantia de integridade de cargas sensíveis, em um mercado com escassez de motoristas.',
      inovacao: 'Frota de 54 veículos movidos a biometano, com idade média de 2,5 anos e monitoramento total por câmeras.',
      futuro: 'Expansão da frota renovável para novos estados e mais investimento em retenção de motoristas.',
    } },

  { n: 9, slug: 'x-global', name: 'X-Global', photo: 'x-global.png',
    kicker: 'Uma isca que dura um ano em vez de um mês',
    title: 'O canal que atravessa o baú de aço',
    byline: null,
    dek: 'Autonomia de até 380 dias contra os 30 dias do mercado, mais travas com fibra óptica e etiquetas antichama para medicamento.',
    body: [
      'A X-Global ataca um problema físico: sinal que não atravessa baú metálico e bateria que não dura a viagem toda.',
      '*"A X-Global é fabricante de iscas de rastreamento com produção 100% interna e representante exclusiva de etiquetas eletrônicas de rastreabilidade."*',
      '**O canal que atravessa o baú de aço**',
      '*"Desenvolvemos um canal de comunicação proprietário chamado LBS Pro. Ele combina a leveza e a capacidade de penetração do sinal LBS tradicional com a precisão de localização do GPS. O LBS Pro reduz drasticamente o consumo de energia da bateria."*',
      'O resultado aparece na autonomia:',
      '*"Enquanto dispositivos comuns no mercado duram cerca de 30 dias transmitindo posições de 30 em 30 minutos, o nosso equipamento Slim garante autonomia mínima de 80 a 380 dias no mesmo intervalo de transmissão."*',
      '**Trava que avisa no instante do corte**',
      '*"Fabricamos travas blindadas forjadas em aço bélico sem emendas de solda, equipadas com laço de fibra óptica e conexão 4G. Se a trava for cortada, o laço rompe e o alerta é enviado instantaneamente."*',
      'Para medicamento, o risco não é só roubo. É incêndio dentro da embalagem.',
      '*"Desenvolvemos etiquetas com baterias antichama à base de zinco que utilizam combustível líquido não inflamável, eliminando o risco de incêndio por curto-circuito em caixas de papelão."*',
    ],
    raiox: {
      o_que_e: 'Fabricante de iscas de rastreamento, etiquetas eletrônicas e travas de segurança física para cargas de alto valor.',
      problema: 'Perda de sinal dentro de baús metálicos e bateria com autonomia curta demais para viagens longas.',
      inovacao: 'LBS Pro, canal de comunicação que penetra estruturas metálicas com baixo consumo de energia, e travas com sensor de fibra óptica.',
      futuro: 'Etiquetas ultra-finas com chip multi-operadora e Wi-Fi para localização de precisão dentro de galpões.',
    } },

  { n: 10, slug: 't4s-tecnologia', name: 'T4S Tecnologia', photo: 't4s-tecnologia.png',
    kicker: 'Um imobilizador que ninguém desarma em segundos',
    title: 'Mesh entre 42 mil caminhões contra roubo de carga',
    byline: null,
    dek: 'Sem conexão física com o chicote elétrico, o T4S trava sozinho ao detectar jammer, e uma câmera com IA já reconhece arma antes da abordagem.',
    body: [
      'A T4S ataca a fragilidade dos bloqueios tradicionais: fio cortado, sistema desarmado, caminhão liberado em minutos.',
      '*"A T4S é uma empresa de inovação focada no combate ao roubo de cargas e veículos pesados, aplicando inteligência artificial e tecnologias patenteadas para ações preventivas e preditivas antes que o sinistro se concretize."*',
      '**Sem fio, sem chance de desarme rápido**',
      '*"O Imobilizador T4S atinge 99% de efetividade na preservação da carga e 95% na recuperação do caminhão. O grande diferencial é que o dispositivo não possui conexão física com o chicote elétrico principal, impedindo que criminosos desarmem o sistema em segundos."*',
      'Se o jammer entra em ação, o caminhão trava sozinho.',
      '*"Ao detectar a interferência do jammer, o T4S bloqueia o veículo automaticamente em no máximo 45 segundos. Se um caminhão perde o sinal celular GPRS, qualquer outro dos mais de 42 mil caminhões rodando com T4S no Brasil que passe em um raio de até 3 km captura o sinal e transmite a localização exata do veículo roubado."*',
      '**Câmera que reconhece arma antes da abordagem**',
      '*"O Anjo da Carga foi desenvolvido para frotas de alto valor agregado e utiliza câmeras com IA para detecção autônoma de armas: câmeras laterais identificam pessoas armadas se aproximando do caminhão e sobem alerta imediato."*',
    ],
    raiox: {
      o_que_e: 'Empresa de engenharia focada em imobilizadores patenteados e visão computacional contra roubo de cargas.',
      problema: 'Vulnerabilidade dos bloqueios tradicionais, desarmados com corte de fio, e ausência de detecção preditiva de ameaça.',
      inovacao: 'Imobilizador sem conexão física com o chicote elétrico, com rede Mesh entre mais de 42 mil caminhões no Brasil.',
      futuro: 'Monitoramento volumétrico do baú e checagem biométrica facial contínua em bancos de dados externos.',
    } },

  { n: 11, slug: 'netfleet-driver-serie-a', name: 'Netfleet / Driver Série A', photo: 'netfleet-driver-serie-a.png',
    kicker: 'Telemetria sem instalar nada',
    title: 'Só com o celular do motorista',
    byline: null,
    dek: 'O aplicativo é o sensor: acelerômetro e GPS do próprio smartphone viram telemetria comportamental, com ranking em vez de punição.',
    body: [
      'A Netfleet resolve o problema de quem sempre ficou de fora da telemetria: o motorista autônomo, sem hardware fixo no veículo.',
      '*"O nosso propósito é usar a tecnologia para salvar vidas, reduzindo acidentes de trânsito no transporte profissional de cargas. No Brasil, ocorrem cerca de 37 mil mortes por ano no trânsito e mais de cinco vezes esse número de pessoas com sequelas graves."*',
      '**O aplicativo é o sensor**',
      '*"Desenvolvemos um sistema de telemetria comportamental operado exclusivamente pelo smartphone do motorista via aplicativo, sem a necessidade de instalar nenhum tipo de hardware ou equipamento no veículo. O aplicativo utiliza os sensores de acelerômetro e GPS do celular para detectar excesso de velocidade, frenagens bruscas, acelerações severas, curvas acentuadas e manuseio do celular ao dirigir."*',
      '**Ranking em vez de punição**',
      '*"A plataforma utiliza gamificação. O motorista acompanha sua nota e posição em um ranking ao final de cada viagem. As empresas utilizam esses dados para criar campanhas de reconhecimento, premiar os melhores condutores e direcionar treinamentos para os que apresentam menor pontuação."*',
      'O resultado já foi testado em escala nacional, no programa Motorista Série A do SEST SENAT.',
      '*"Ao longo de 32 semanas de acompanhamento via aplicativo, a curva de desempenho de todos os condutores participantes apresentou uma evolução expressiva na redução de infrações e manobras arriscadas."*',
    ],
    raiox: {
      o_que_e: 'Plataforma de telemetria comportamental via aplicativo, sem necessidade de hardware instalado no veículo.',
      problema: 'Alto custo de instalação de telemetria tradicional e falta de monitoramento para motoristas autônomos e agregados.',
      inovacao: 'Uso dos sensores do próprio smartphone (GPS e acelerômetro) combinado a gamificação e ranking de desempenho.',
      futuro: 'Modelo White Label, integrando a telemetria comportamental a aplicativos de seguradoras e transportadoras.',
    } },

  { n: 12, slug: 'grupo-tracker', name: 'Grupo Tracker', photo: 'grupo-tracker.png',
    kicker: 'Quando o GPS cala',
    title: 'A radiofrequência continua falando',
    byline: null,
    dek: 'Uma rede própria de antenas de RF, imune a jammer, localiza carga escondida em galpão fechado, com busca terrestre e aérea.',
    body: [
      'O Grupo Tracker aposta em uma tecnologia que jammer nenhum consegue derrubar: radiofrequência com rede própria de antenas.',
      '*"O Grupo Tracker atua há mais de 25 anos no mercado e tem como carro-chefe a tecnologia de rastreamento e recuperação de veículos e cargas por radiofrequência. Possuímos uma rede própria e exclusiva de antenas e rádio frequência em todo o país, acompanhada por uma estrutura operacional terrestre e aérea especializada."*',
      '**Imune ao bloqueador de sinal**',
      '*"Os rastreadores convencionais baseados em GPS e GPRS/4G podem ter seu sinal inibido quando criminosos utilizam bloqueadores. A tecnologia de radiofrequência da Tracker não é afetada por jammers, permitindo que nossos receptores localizem o ativo roubado mesmo se ele estiver escondido dentro de galpões fechados, subsolos ou baús metálicos."*',
      '**Redundância dupla**',
      '*"Oferecemos o Tracker Log, que combina rastreamento com um dispositivo de RF; e o Tracker Log Max, que possui dois dispositivos de RF integrados no mesmo conjunto para garantir redundância total na localização."*',
      'A central que coordena tudo isso tem nome: COG.',
      '*"Toda a operação é gerenciada pela nossa central inteligente, o COG."*',
    ],
    raiox: {
      o_que_e: 'Empresa especializada em localização e recuperação de veículos e cargas roubadas via radiofrequência própria.',
      problema: 'Perda de sinal por jammer e localização de cargas escondidas em locais fechados ou sem cobertura celular.',
      inovacao: 'Rede própria de antenas de RF, imune a bloqueador de sinal, com estrutura de busca terrestre e aérea.',
      futuro: 'Integração da recuperação de ativos por RF a softwares de gestão de frota e telemetria.',
    } },

  { n: 13, slug: 'ita-frio', name: 'Ita Fria', photo: 'ita-frio.png',
    kicker: 'Chocolate viajando em caminhão comum',
    title: 'Sem refrigeração ligada',
    byline: null,
    dek: 'Placas de PCM absorvem calor em vez de gelar, e eliminam a dependência de frigorífico caro na distribuição fracionada de produtos sensíveis.',
    body: [
      'A Ita Fria resolve um problema de custo: caminhão frigorífico é caro, e nem toda carga sensível precisa de um.',
      '*"A Ita Fria é fabricante de embalagens e soluções para logística térmica. Desenvolvemos uma caixa plástica retornável de alta durabilidade equipada com placas de PCM para o transporte com controle térmico passivo de produtos sensíveis, como chocolates e medicamentos."*',
      '**A placa que absorve calor em vez de gelar**',
      '*"As placas de PCM contêm um fluido estabilizador térmico que absorve e retém o calor. Garantimos a manutenção da temperatura interna na faixa de 15°C a 25°C para chocolates, ou de 2°C a 8°C para produtos refrigerados, sem a necessidade de ar-condicionado ou refrigeração ativa no caminhão."*',
      '**Testado nas rotas mais quentes do país**',
      '*"Realizamos testes rigorosos de laboratório em estufas térmicas calibradas para simular o verão brasileiro e, em seguida, testes práticos em rotas críticas reais. No transporte de chocolates para marcas como Mondelēz e Nestlé, testamos as caixas nas rotas mais quentes do país, como Ribeirão Preto e entregas na região Nordeste."*',
      'O ganho final é financeiro tanto quanto técnico.',
      '*"A caixa elimina a dependência de caminhões frigoríficos caros na distribuição fracionada urbana. O cliente pode transportar chocolates e produtos refrigerados em caminhões sider ou baús secos comuns, mantendo a qualidade do produto intacta e reduzindo drasticamente os custos operacionais com frete especial."*',
    ],
    raiox: {
      o_que_e: 'Fabricante de embalagens térmicas passivas para transporte de produtos sensíveis ao calor.',
      problema: 'Dependência de caminhão frigorífico caro para transportar chocolate e produtos refrigerados em distribuição fracionada.',
      inovacao: 'Placas de PCM que mantêm faixa de temperatura estável por horas, sem refrigeração ativa no veículo.',
      futuro: 'Novas matrizes de PCM para rotas de longa distância nas regiões Norte e Nordeste, sob temperatura extrema.',
    } },
];

function pageHtml(c, prevC, nextC) {
  const thumb = c.photo ? `<img class="speaker-photo" src="fotos/${c.photo}" alt="${c.name}">` : '';
  const bylineHtml = c.byline ? `<p class="byline">${c.byline}</p>` : '';
  const bodyHtml = renderBody(c.body);
  const prevLink = prevC ? `<a href="${prevC.slug}.html"><span class="dir">← Anterior</span>${prevC.name}</a>` : '<span></span>';
  const nextLink = nextC ? `<a href="${nextC.slug}.html"><span class="dir">Próxima →</span>${nextC.name}</a>` : '<span></span>';
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.name} · Logística do Futuro</title>
<link rel="icon" href="../assets/favicon.png" type="image/png">
<meta name="description" content="${c.dek}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Logística do Futuro">
<meta property="og:title" content="${c.name} · Logística do Futuro">
<meta property="og:description" content="${c.dek}">
<meta property="og:url" content="https://report-apisul.github.io/logistica-futuro2026/entrevistas/${c.slug}.html">
<meta property="og:image" content="https://report-apisul.github.io/logistica-futuro2026/${c.photo ? 'entrevistas/fotos/og/' + c.slug + '.jpg' : 'assets/og-image.jpg'}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${c.name} · Logística do Futuro">
<meta name="twitter:description" content="${c.dek}">
<meta name="twitter:image" content="https://report-apisul.github.io/logistica-futuro2026/${c.photo ? 'entrevistas/fotos/og/' + c.slug + '.jpg' : 'assets/og-image.jpg'}">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Spectral:ital,wght@0,200;0,300;0,400;1,200;1,300&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@500,600&display=swap">
<link rel="stylesheet" href="../assets/site.css">
</head>
<body>
${NAV}

<header class="page-head">
  <div class="wrap">
    <a class="back-link" href="index.html">← Todas as entrevistas</a>
    <span class="eyebrow">${c.kicker}</span>
    <h1>${c.title}</h1>
    <p class="lede">${c.dek}</p>
  </div>
</header>

<main class="wrap">
  <article class="article">
    ${thumb}
    ${bylineHtml}
    ${bodyHtml}

    <div class="raiox">
      <h3>Raio-X: ${c.name}</h3>
      <dl>
        <div><dt>O que é?</dt><dd>${c.raiox.o_que_e}</dd></div>
        <div><dt>Qual problema resolve?</dt><dd>${c.raiox.problema}</dd></div>
        <div><dt>Qual a principal inovação?</dt><dd>${c.raiox.inovacao}</dd></div>
        <div><dt>Para onde vai?</dt><dd>${c.raiox.futuro}</dd></div>
      </dl>
    </div>

    <nav class="pagenav">
      ${prevLink}
      ${nextLink}
    </nav>
  </article>
</main>

${FOOTER}
<script src="../assets/nav-scroll.js"></script>
<script src="../assets/reveal.js"></script>
</body>
</html>
`;
}

function hubHtml() {
  const items = COMPANIES.map(c => {
    const thumb = c.photo
      ? `<div class="thumb"><img src="fotos/${c.photo}" alt="${c.name}"></div>`
      : `<div class="thumb placeholder">${c.name[0]}</div>`;
    const num = String(c.n).padStart(2, '0');
    return `      <a class="item" href="${c.slug}.html">
        <span class="num">${num}</span>
        ${thumb}
        <div class="txt">
          <h3>${c.name}</h3>
          <p class="dek">${c.kicker}: ${c.title}</p>
          <span class="more">Ler entrevista →</span>
        </div>
      </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Entrevistas · Logística do Futuro</title>
<link rel="icon" href="../assets/favicon.png" type="image/png">
<meta name="description" content="13 empresas, 13 abordagens diferentes para o mesmo problema: segurança, rastreamento e inteligência no transporte de cargas.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Logística do Futuro">
<meta property="og:title" content="Entrevistas · Logística do Futuro">
<meta property="og:description" content="13 empresas, 13 abordagens diferentes para o mesmo problema: segurança, rastreamento e inteligência no transporte de cargas.">
<meta property="og:url" content="https://report-apisul.github.io/logistica-futuro2026/entrevistas/index.html">
<meta property="og:image" content="https://report-apisul.github.io/logistica-futuro2026/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Entrevistas · Logística do Futuro">
<meta name="twitter:description" content="13 empresas, 13 abordagens diferentes para o mesmo problema: segurança, rastreamento e inteligência no transporte de cargas.">
<meta name="twitter:image" content="https://report-apisul.github.io/logistica-futuro2026/assets/og-image.jpg">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Spectral:ital,wght@0,200;0,300;0,400;1,200;1,300&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@500,600&display=swap">
<link rel="stylesheet" href="../assets/site.css">
</head>
<body>
${NAV}

<header class="page-head">
  <div class="wrap">
    <span class="eyebrow">13 empresas, 13 abordagens</span>
    <h1>Entrevistas</h1>
    <p class="lede">Conversamos com 13 empresas presentes no Logística do Futuro sobre o que estão construindo para resolver roubo de carga, acidente e visibilidade de frota.</p>
  </div>
</header>

<main class="wrap">
  <div class="prog">
${items}
  </div>
</main>

${FOOTER}
<script src="../assets/nav-scroll.js"></script>
<script src="../assets/reveal.js"></script>
</body>
</html>
`;
}

const ORDER = [
  'multisat', 'apisul-corretora-seguros', 'sighra', 'apisul-produtos-digitais-ia',
  'carga-online', 'trucks-control', 'omnilink', 'jomed', 'x-global',
  't4s-tecnologia', 'netfleet-driver-serie-a', 'grupo-tracker', 'ita-frio',
];
COMPANIES.sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));
COMPANIES.forEach((c, i) => { c.n = i + 1; });

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  COMPANIES.forEach((c, i) => {
    const prevC = i > 0 ? COMPANIES[i - 1] : null;
    const nextC = i < COMPANIES.length - 1 ? COMPANIES[i + 1] : null;
    fs.writeFileSync(path.join(OUT, `${c.slug}.html`), pageHtml(c, prevC, nextC), 'utf-8');
  });
  fs.writeFileSync(path.join(OUT, 'index.html'), hubHtml(), 'utf-8');
  console.log(`Geradas ${COMPANIES.length} páginas + hub em ${OUT}`);
}

main();
