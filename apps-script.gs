/**
 * Minissimulado PMERJ → Planilha "Leads · Minissimulado PMERJ · Instituto Souto"
 * Implantado como App da Web (Executar como: Eu | Acesso: Qualquer pessoa).
 * A URL /exec vai em CONFIG.planilha no index.html.
 */
const PLANILHA_ID = '1drQFy6gVnMoqq6fh0EwBQ1buJDxcg5-Yj7EJcBL3LWI';
const OURO = '#ffc21a';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const ss = SpreadsheetApp.openById(PLANILHA_ID);
    const sh = ss.getSheetByName('Leads') || ss.getSheets()[0];
    const nota = Math.max(0, Math.min(10, Number(p.nota) || 0));
    sh.appendRow([new Date(), limpar(p.nome), limpar(p.whatsapp), nota]);
    const r = sh.getLastRow();
    // barrinha dourada proporcional à nota
    sh.getRange(r, 5).setFormula(`=SPARKLINE(D${r},{"charttype","bar";"max",10;"color1","${OURO}"})`);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// abre a página no navegador só para confirmar que está no ar
function doGet() {
  return ContentService.createTextOutput('Minissimulado PMERJ: conectado à planilha.');
}

// evita que texto começando com = + - @ vire fórmula na planilha
function limpar(v) {
  v = String(v || '').slice(0, 120).trim();
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
