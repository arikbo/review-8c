// Google Apps Script – קולט הגשות של דפי החזרה ח'3 וכותב אותן לגיליון.
// שמות העמודות תואמים לדף admin.html (מעקב הגשות).
const HEAD = ['student','answered','score','graded','answers','submitted_at'];
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('submission');
  if (!sh) { sh = ss.insertSheet('submission'); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  sh.appendRow(HEAD.map(k => d[k] || ''));
  return ContentService.createTextOutput('ok');
}
