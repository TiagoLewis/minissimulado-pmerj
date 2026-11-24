// Ajustes aplicados sobre a página no ar (quizangra.institutosouto.com.br).
// Idempotente: pode rodar várias vezes sobre a versão já editada.
const fs=require('fs');const f='out/index.html';let h=fs.readFileSync(f,'utf8');
const AULA_HTML = '<div class="aula">\n      <small><i></i> 3 aulas especiais gratuitas</small>\n      <ol style="list-style:none;margin:8px 0 0;padding:0;display:grid;gap:8px"><li style="display:flex;gap:10px;align-items:baseline"><b style="flex:none;color:#ffc21a;font-size:.85em">1ª AULA</b><strong id="aulaTitulo" style="margin:0">Como ser aprovado na Guarda Municipal de Angra dos Reis</strong></li><li style="display:flex;gap:10px;align-items:baseline"><b style="flex:none;color:#ffc21a;font-size:.85em">2ª AULA</b><strong style="margin:0">Simulado de Direito Penal, Processo Penal e Leis Penais Especiais</strong></li><li style="display:flex;gap:10px;align-items:baseline"><b style="flex:none;color:#ffc21a;font-size:.85em">3ª AULA</b><strong style="margin:0">Plano de estudos para a GCM Angra dos Reis</strong></li></ol><span id="aulaData" hidden></span>\n    </div>';
h = h.replace(/<div class="aula">[\s\S]*?<\/div>/, AULA_HTML);
h = h.replace('var AULA_FIXA = "2026-12-01";','var AULA_FIXA = "2026-11-24";');
// o texto do card é fixo: impede o script da página de sobrescrever título/data
h = h.replace(/\$\('aula(Titulo|Data)'\)\.textContent\s*=/g, 'void ');
// texto de abertura e botão
h = h.replace(/<p>(?:Você já está na turma! Agora r|R)esponda <b>8 perguntas rápidas<\/b>[\s\S]*?<\/p>/, '<p>Você já está na turma! Agora responda <b>8 perguntas rápidas</b> (menos de 1 minuto) para eu conhecer a sua rotina. Com as suas respostas, eu preparo o melhor caminho para você até a prova.</p>');
h = h.replace(/(<button type="button" class="btn" id="comecar">)[^<]*/, '$1Responder agora! ');
if (!h.includes('3 aulas especiais gratuitas')) { console.error('card da aula não encontrado'); process.exit(1); }
fs.writeFileSync(f,h);console.log('edited',h.length);
