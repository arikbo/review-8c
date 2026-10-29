// דפי חזרה ח'3 – קליטת הגשות. יוצר לבד גיליון "הגשות דפי חזרה ח'3" ב-Drive בהגשה הראשונה.
const HEAD = ['student','answered','score','graded','answers','submitted_at'];
function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID'), ss;
  if (id) ss = SpreadsheetApp.openById(id);
  else { ss = SpreadsheetApp.create("הגשות דפי חזרה ח'3"); props.setProperty('SHEET_ID', ss.getId()); }
  let sh = ss.getSheetByName('submission');
  if (!sh) { sh = ss.getSheets()[0]; sh.setName('submission'); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}
function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    getSheet_().appendRow(HEAD.map(k => d[k] || ''));
  } finally { lock.releaseLock(); }
  return ContentService.createTextOutput('ok');
}
