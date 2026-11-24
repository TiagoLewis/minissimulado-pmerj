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
h = h.replace('var AULA_FIXA = "2026-12-01";','var AULA_FIXA = "2026-11-24";');
// o texto do card é fixo: impede o script da página de sobrescrever título/data
h = h.replace(/\$\('aula(Titulo|Data)'\)\.textContent\s*=/g, 'void ');
// texto de abertura e botão
h = h.replace(/<p>(?:Você já está na turma! Agora r|R)esponda <b>8 perguntas rápidas<\/b>[\s\S]*?<\/p>/, '<p>Você já está na turma! Agora responda <b>8 perguntas rápidas</b> (menos de 1 minuto) para eu conhecer a sua rotina. Com as suas respostas, eu preparo o melhor caminho para você até a prova.</p>');
h = h.replace(/(<button type="button" class="btn" id="comecar">)[^<]*/, '$1Responder agora! ');
// vagas: 450
h = h.replace(/(<small>Vagas<\/small>\s*<strong>)\s*200\s*(<\/strong>)/i, '$1450$2');
h = h.replace(/\b200 vagas\b/g, '450 vagas');
if (!h.includes('3 aulas especiais gratuitas')) { console.error('card da aula não encontrado'); process.exit(1); }
fs.writeFileSync(f,h);console.log('edited',h.length);
