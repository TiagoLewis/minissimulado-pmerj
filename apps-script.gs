/**
 * Instituto Souto · Leads → Planilhas
 * Implantado como App da Web (Executar como: Eu | Acesso: Qualquer pessoa).
 *
 * 1) Minissimulados (form-urlencoded): campo s = 'pmerj' | 'angra'
 * 2) Quiz de perfil da aula (JSON em text/plain): tipo = 'quiz', s = 'quiz-pmerj' | 'quiz-angra'
 */
const PLANILHAS = {
  pmerj: '1Z3ZiFKirWHvZ6PREbwf3VHUYUnww1GwPuMUBJmLWEt8',
  angra: '1TTVboxNMqGN-KyJDkG8cseDg83Vyh0-d74SoboRocAk',
  'quiz-pmerj': '1h7gpfoe3jWDnKOqb3lkRiS5RLti_iL8ZrJrOt-a4BjM',
  'quiz-angra': '1WeWHvfy5fJ7BSoZ6jjM0hgqClXFlqfuTbTb6lcQPa5I'
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    // quiz de perfil: corpo JSON
    if (e && e.postData && e.postData.contents && e.postData.contents.trim().charAt(0) === '{') {
      const d = JSON.parse(e.postData.contents);
      if (d.tipo === 'quiz') return salvarQuiz(d);
    }
    return salvarMinissimulado((e && e.parameter) || {});
  } finally {
    lock.releaseLock();
  }
}

function salvarMinissimulado(p) {
  const ss = SpreadsheetApp.openById(PLANILHAS[p.s] || PLANILHAS.pmerj);
  const sh = ss.getSheetByName('Leads') || ss.getSheets()[0];
  const nota = Math.max(0, Math.min(10, Number(p.nota) || 0));
  sh.appendRow([new Date(), limpar(p.nome), limpar(p.whatsapp), nota]);
  const r = sh.getLastRow();
  sh.getRange(r, 1).setNumberFormat('dd/MM/yyyy HH:mm');
  sh.getRange(r, 5).setValue('█'.repeat(nota) + '░'.repeat(10 - nota)); // barrinha da nota
  return ContentService.createTextOutput('ok');
}

function salvarQuiz(d) {
  const id = PLANILHAS[d.s] || PLANILHAS['quiz-pmerj'];
  const ss = SpreadsheetApp.openById(id);
  const sh = ss.getSheetByName('Respostas') || ss.getSheets()[0];
  const resp = Array.isArray(d.respostas) ? d.respostas : [];
  const linha = [new Date(), limpar(d.nome), limpar(d.whatsapp), limpar(d.email), limpar(d.evento)];
  for (let i = 0; i < 9; i++) linha.push(limpar(resp[i]));
  linha.push(limpar(d.utm_source), limpar(d.utm_medium), limpar(d.utm_campaign), limpar(d.utm_content), limpar(d.variante));
  sh.appendRow(linha);
  sh.getRange(sh.getLastRow(), 1).setNumberFormat('dd/MM/yyyy HH:mm');
  return ContentService.createTextOutput('ok');
}

// abre a URL no navegador só para confirmar que está no ar
function doGet() {
  return ContentService.createTextOutput('Instituto Souto: conectado às planilhas.');
}

// evita que texto começando com = + - @ vire fórmula na planilha
function limpar(v) {
  v = String(v == null ? '' : v).slice(0, 200).trim();
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
