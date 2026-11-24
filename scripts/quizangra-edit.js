// Ajustes aplicados sobre a página no ar (quizangra.institutosouto.com.br).
// Idempotente: pode rodar várias vezes sobre a versão já editada.
const fs=require('fs');const f='out/index.html';let h=fs.readFileSync(f,'utf8');
const AULAS = [
  'Como ser aprovado na Guarda Municipal de Angra dos Reis',
  'Simulado de Direito Penal, Processo Penal e Leis Penais Especiais',
  'Plano de estudos para a GCM Angra dos Reis'
];
const AULA_HTML = '<!--AULAS--><div class="aulas-3">'
  + '<p style="margin:0 0 10px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#ffc21a">3 aulas especiais gratuitas</p>'
  + AULAS.map((t,i)=>'<div class="aula"'+(i?' style="margin-top:10px"':'')+'><small><i></i> '+(i+1)+'ª aula</small><strong'+(i?'':' id="aulaTitulo"')+'>'+t+'</strong></div>').join('')
  + '<span id="aulaData" hidden></span></div><!--/AULAS-->';
h = h.replace(/<!--AULAS-->[\s\S]*?<!--\/AULAS-->|<div class="aula">[\s\S]*?<\/div>/, AULA_HTML);
// vagas: 450
h = h.replace(/(<small>Vagas<\/small><strong>)\s*\d+\s*(<\/strong>)/i, '$1450$2');
// o texto do card é fixo: impede o script da página de sobrescrever título/data
h = h.replace(/\$\('aula(Titulo|Data)'\)\.textContent\s*=/g, 'void ');
// texto de abertura e botão
h = h.replace(/<p>(?:Você já está na turma! Agora r|R)esponda <b>8 perguntas rápidas<\/b>[\s\S]*?<\/p>/, '<p>Você já está na turma! Agora responda <b>8 perguntas rápidas</b> (menos de 1 minuto) para eu conhecer a sua rotina. Com as suas respostas, eu preparo o melhor caminho para você até a prova.</p>');
h = h.replace(/(<button type="button" class="btn" id="comecar">)[^<]*/, '$1Responder agora! ');
// vagas: 450
h = h.replace(/(<small>Vagas<\/small>\s*<strong>)\s*200\s*(<\/strong>)/i, '$1450$2');
h = h.replace(/\b200 vagas\b/g, '450 vagas');
// ===== tela de captura, tela final e título (quiz da turma, sem data de aula) =====
const T = 'Quiz da Turma — GCM Angra dos Reis';
h = h.replace(/<title>[^<]*<\/title>/, '<title>'+T+'</title>');
h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, '$1'+T+'$2');
h = h.replace(/<h1>Para onde envio o link da aula\?<\/h1>/, '<h1>Quase lá! Para quem eu preparo esse caminho?</h1>');
h = h.replace(/(<p class="sub">)O link da sala chega no seu WhatsApp e o seu brinde, no seu e-mail\.(<\/p>)/, '$1Os avisos das aulas chegam no grupo da turma e no seu WhatsApp.$2');
h = h.replace(/(<small class="dica">)É por e-mail que você recebe o brinde[^<]*(<\/small>)/, '$1Seu e-mail fica com a equipe do Instituto Souto.$2');
h = h.replace(/(<span id="okTexto">)[^<]*(<\/span>)/, '$1Aceito receber os avisos das aulas do Instituto Souto pelo WhatsApp.$2');
h = h.replace(/\$\('okTexto'\)\.textContent\s*=/g, 'void ');
h = h.replace(/(<button type="submit" class="btn" id="enviar">)Confirmar presença(<\/button>)/, '$1Enviar respostas$2');
h = h.replace('<h2>Presença confirmada!</h2>', '<h2>Respostas registradas!</h2>');
h = h.replace(/(<p id="revealTxt">)Sua vaga na aula está garantida\.(<\/p>)/, '$1Com elas eu preparo o seu plano de estudos até a prova.$2');
h = h.replace(/\$\('revealTxt'\)\.innerHTML\s*=\s*'Pronto, <b>'\+pn\+'<\/b>! Sua vaga na aula de <b>'\+esc\(AULA_TXT\)\+'<\/b> está garantida\.';/, "$('revealTxt').innerHTML = 'Pronto, <b>'+pn+'</b>! Respostas registradas. Com elas eu preparo o seu plano de estudos até a prova.';");
h = h.replace('<b>✓</b> Vaga na aula confirmada</li>', '<b>✓</b> Respostas enviadas</li>');
h = h.replace(/<span>Assistir à aula ao vivo: <span id="passoAula">[^<]*<\/span><\/span>/, '<span>Assistir às aulas às 20h: <span id="passoAula">o link chega no grupo da turma</span></span>');
h = h.replace(/\$\('passoAula'\)\.textContent\s*=/g, 'void ');
// sem data fixa de aula
h = h.replace(/var AULA_FIXA\s*=\s*"[^"]*";/, 'var AULA_FIXA = "";');
// sem a regra de "toda terça": a página não calcula mais data de aula
h = h.replace(/var AULA = \(function\(\)\{[\s\S]*?\n\}\)\(\);/, "var AULA = {dia: '', data: ''}; // sem data fixa: aulas avisadas no grupo da turma");
h = h.replace(/var EVENTO\s*=\s*'Aula GCM Angra ' \+ AULA\.data;/, "var EVENTO = 'Quiz da Turma GCM Angra';");
if (!h.includes('3 aulas especiais gratuitas')) { console.error('card da aula não encontrado'); process.exit(1); }
fs.writeFileSync(f,h);console.log('edited',h.length);
