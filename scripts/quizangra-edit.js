// Ajustes aplicados sobre a página no ar (quizangra.institutosouto.com.br).
// Idempotente: pode rodar várias vezes sobre a versão já editada.
const fs=require('fs');const f='out/index.html';let h=fs.readFileSync(f,'utf8');
const AULA_HTML = '<div class="aula">\n      <small><i></i> Aula especial gratuita</small>\n      <strong id="aulaTitulo">Como ser aprovado na Guarda Municipal de Angra dos Reis</strong>\n      <span id="aulaData">Terça-feira, às 20h (horário de Brasília)</span>\n    </div>';
h = h.replace(/<div class="aula">[\s\S]*?<\/div>/, AULA_HTML);
h = h.replace('var AULA_FIXA = "2026-12-01";','var AULA_FIXA = "2026-11-24";');
// o texto do card é fixo: impede o script da página de sobrescrever título/data
h = h.replace(/\$\('aula(Titulo|Data)'\)\.textContent\s*=/g, 'void ');
// texto de abertura e botão
h = h.replace(/<p>(?:Você já está na turma! Agora r|R)esponda <b>8 perguntas rápidas<\/b>[\s\S]*?<\/p>/, '<p>Você já está na turma! Agora responda <b>8 perguntas rápidas</b> (menos de 1 minuto) para eu conhecer a sua rotina. Com as suas respostas, eu preparo o melhor caminho para você até a prova.</p>');
h = h.replace(/(<button type="button" class="btn" id="comecar">)[^<]*/, '$1Responder agora! ');
if (!h.includes('Como ser aprovado na Guarda Municipal de Angra dos Reis')) { console.error('card da aula não encontrado'); process.exit(1); }
fs.writeFileSync(f,h);console.log('edited',h.length);
