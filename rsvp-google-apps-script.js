function doPost(event) {
  const payload = JSON.parse(event.postData.contents || '{}')
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheets()[0]

  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.guestName || '',
    payload.attendance || '',
    payload.pageUrl || '',
    payload.userAgent || '',
  ])

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
}
