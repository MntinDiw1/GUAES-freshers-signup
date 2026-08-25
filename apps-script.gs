// Paste this into Extensions > Apps Script in your Google Sheet, then deploy
// as a Web App. See SETUP.md for step-by-step instructions.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var params = e.parameter;

  var headers = ["Submitted", "Name", "Email", "Favourite genre", "Experience", "Contribution", "Event ideas"];

  // Write header row once, if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  sheet.appendRow([
    params["Submitted"] || new Date().toISOString(),
    params["Name"] || "",
    params["Email"] || "",
    params["Favourite genre"] || "",
    params["Experience"] || "",
    params["Contribution"] || "",
    params["Event ideas"] || ""
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
