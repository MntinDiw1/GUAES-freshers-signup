// Paste this into Extensions > Apps Script in your Google Sheet, then deploy
// as a Web App. See SETUP.md for step-by-step instructions.

// Set this to the email address that should get a notification for every
// new contributor application. Leave blank ("") to turn notifications off.
var NOTIFY_EMAIL = "PASTE_YOUR_EMAIL_HERE";

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var params = e.parameter;

  var headers = ["Submitted", "Name", "Email", "Year of study & course", "Favourite genre", "Experience", "Contribution", "Event ideas"];

  // Write header row once, if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  var row = {
    Submitted: params["Submitted"] || new Date().toISOString(),
    Name: params["Name"] || "",
    Email: params["Email"] || "",
    "Year of study & course": params["Year of study & course"] || "",
    "Favourite genre": params["Favourite genre"] || "",
    Experience: params["Experience"] || "",
    Contribution: params["Contribution"] || "",
    "Event ideas": params["Event ideas"] || ""
  };

  sheet.appendRow(headers.map(function(h) { return row[h]; }));

  notifyNewApplication(row);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function notifyNewApplication(row) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf("PASTE_YOUR") === 0) return;

  var body =
    "New GUAES contributor application:\n\n" +
    "Name: " + row.Name + "\n" +
    "Email: " + row.Email + "\n" +
    "Year of study & course: " + row["Year of study & course"] + "\n" +
    "Favourite genre: " + row["Favourite genre"] + "\n" +
    "Experience: " + row.Experience + "\n" +
    "Contribution: " + row.Contribution + "\n" +
    "Event ideas: " + row["Event ideas"] + "\n\n" +
    "Full sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();

  try {
    MailApp.sendEmail(NOTIFY_EMAIL, "New GUAES contributor application: " + row.Name, body);
  } catch (err) {
    // Don't let a mail failure block the form submission itself.
  }
}
