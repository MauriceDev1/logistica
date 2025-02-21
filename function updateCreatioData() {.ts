function updateCreatioData() {
  var response = UrlFetchApp.fetch('https://ekomi.bpmonline.com/ServiceModel/AuthService.svc/Login', {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : JSON.stringify({"UserName":"michael","UserPassword":"BH21/jm00!ng"})
    });
  
  var cookies = response.getAllHeaders()['Set-Cookie'];
  var myCookies = {};
  for (var cooky in cookies) {
    var split1 = cookies[cooky].split(";");
    var split2 = split1[0].split("=");
    var s1 = split2[0];
    var s2 = split2[1];    
    myCookies[s1] = s2;
  }
  
    // The JSON query to DataService
    var select_json = {
        "RootSchemaName": "Opportunity",
        "OperationType": 0,
        "Columns": {
            "Items": {
                "Id": {"Expression": {"ExpressionType": 0, "ColumnPath": "Id"}},
                "Title": {"Expression": {"ExpressionType": 0, "ColumnPath": "Title"}},
                "Stage": {"Expression": {"ExpressionType": 0, "ColumnPath": "Stage"}},
                "Probability": {"Expression": {"ExpressionType": 0, "ColumnPath": "Probability"}},
                "UsrCurrency": {"Expression": {"ExpressionType": 0, "ColumnPath": "UsrCurrency"}},
                "Amount": {"Expression": {"ExpressionType": 0, "ColumnPath": "Amount"}},
                "UsrPrimaryAmount": {"Expression": {"ExpressionType": 0, "ColumnPath": "UsrPrimaryAmount"}},
                "Mood": {"Expression": {"ExpressionType": 0, "ColumnPath": "Mood"}},
                "Account": {"Expression": {"ExpressionType": 0, "ColumnPath": "Account"}},
                "Owner": {"Expression": {"ExpressionType": 0, "ColumnPath": "Owner"}},
                "UsrSetupFee": {"Expression": {"ExpressionType": 0, "ColumnPath": "UsrSetupFee"}},
                "UsrMonthlyFee": {"Expression": {"ExpressionType": 0, "ColumnPath": "UsrMonthlyFee"}},
                "CreatedOn": {"Expression": {"ExpressionType": 0, "ColumnPath": "CreatedOn"}},
                "DueDate": {"Expression": {"ExpressionType": 0, "ColumnPath": "DueDate"}},
                "ModifiedOn": {"Expression": {"ExpressionType": 0, "ColumnPath": "ModifiedOn"}},
                "ModifiedBy": {"Expression": {"ExpressionType": 0, "ColumnPath": "ModifiedBy"}},
                "Contact": {"Expression": {"ExpressionType": 0, "ColumnPath": "Contact"}},
                "UsrReason": {"Expression": {"ExpressionType": 0, "ColumnPath": "UsrReason"}},
                "Description": {"Expression": {"ExpressionType": 0, "ColumnPath": "Description"}}
            }
        },
        "AllColumns": 1,
           "filters": {
             "items": {
                "4ff8b855-6aa5-49e7-88ff-f9ea9cdd607d": {
                  "items": {
                    "FixedFilters": {
                      "items": {},
                      "logicalOperation": 0,
                      "isEnabled": true,
                      "filterType": 6
                    },
                    "CustomFilters": {
                      "items": {
                        "c0a9234d-8248-4e44-b06b-669700d56d61": {
                          "filterType": 1,
                          "comparisonType": 7,
                          "isEnabled": true,
                          "trimDateTimeParameterToDate": true,
                          "leftExpression": {
                            "expressionType": 0,
                            "columnPath": "DueDate"
                          },
                          "rightExpression": {
                            "expressionType": 2,
                            "parameter": {
                              "dataValueType": 8,
                              "value": "\"2023-10-01T11:50:59.790\""
                            }
                          }
                        }
                      },
                      "logicalOperation": 0,
                      "isEnabled": true,
                      "filterType": 6,
                      "rootSchemaName": "Opportunity"
                    }
                  },
                  "logicalOperation": 0,
                  "isEnabled": true,
                  "filterType": 6
                }
    },
    "logicalOperation": 0,
    "isEnabled": true,
    "filterType": 6
    }
    };
  
  var myCookies_formatted = "BPMLOADER=" + myCookies['BPMLOADER'] + "; UserName=" + myCookies['UserType'] + "; .ASPXAUTH=" + myCookies['.ASPXAUTH'] + "; BPMCSRF=" + myCookies['BPMCSRF'];
  
  var select_response = UrlFetchApp.fetch('https://ekomi.bpmonline.com/0/dataservice/json/reply/SelectQuery', {
    "method" : "POST",
    "contentType" : "application/json",
    "headers" : {"contentType" : "application/json",
                 "BPMCSRF" : myCookies['BPMCSRF'],
                 "BPMLOADER" : myCookies['BPMLOADER'],
                 ".ASPXAUTH" : myCookies['.ASPXAUTH'],
                 "UserName" : myCookies['UserType'],
                 "Cookie": myCookies_formatted},
    "payload" : JSON.stringify(select_json)
  });
  
  var parsed = JSON.parse(select_response.getContentText());
  var rows = parsed['rows'];

  //  for (i = 1; i < 3; i++){
  //    var row = rows[i];
  //    Logger.log(row);
  //  }
   
  var creatioData = [];
  var now = new Date();
  var MILLIS_IN_35DAYS = 1000 * 60 * 60 * 24 * 180;
  var date35DaysAgo = new Date(now.getTime() - MILLIS_IN_35DAYS);
  var dayPast = Utilities.formatDate(date35DaysAgo, "Europe/Berlin", "yyyy-MM-dd");
  // Logger.log(day);
  // Logger.log("data in first row:");
  // Logger.log(rows[0]);
  
  for (i = 0; i < rows.length; i++){
    var row = rows[i];
    
    // Formatting CreatedOn date column from string yyyy-MM-ddThh:mm:ss.000 to date yyyy-MM-dd
    var year = +row['CreatedOn'].substring(0, 4);
    var month = +row['CreatedOn'].substring(5, 7);
    var day = +row['CreatedOn'].substring(8, 10);
    var date = new Date(year, month - 1, day);
    row['CreatedOn'] = Utilities.formatDate(date, "Europe/Berlin", "yyyy-MM-dd");
    
    // Formatting DueDate date column from string yyyy-MM-ddThh:mm:ss.000 to date yyyy-MM-dd
    var year = +row['DueDate'].substring(0, 4);
    var month = +row['DueDate'].substring(5, 7);
    var day = +row['DueDate'].substring(8, 10);
    var dateDueDate = new Date(year, month - 1, day);
    row['DueDate'] = Utilities.formatDate(dateDueDate, "Europe/Berlin", "yyyy-MM-dd");
    
    // Formatting ModifiedOn date column from string yyyy-MM-ddThh:mm:ss.000 to date yyyy-MM-dd
    var year = +row['ModifiedOn'].substring(0, 4);
    var month = +row['ModifiedOn'].substring(5, 7);
    var day = +row['ModifiedOn'].substring(8, 10);
    var dateModifiedOn = new Date(year, month - 1, day);
    row['ModifiedOn'] = Utilities.formatDate(dateModifiedOn, "Europe/Berlin", "yyyy-MM-dd");
    //degub
    // if(row['Title'] == 'LYTFIX TECHNOLOGIES'){
    //   Logger.log("debug")
    // }
    if (row['DueDate'] > dayPast || row['ModifiedOn'] > dayPast) {    
      creatioData.push([row['Title'],
                        row['Stage']['displayValue'],
                        row['UsrCurrency']['displayValue'],
                        row['Amount'],
                        row['UsrPrimaryAmount'],
                        row['Owner']['displayValue'],
                        row['UsrSetupFee'],
                        row['UsrMonthlyFee'],
                        row['CreatedOn'],
                        row['DueDate'],
                        row['ModifiedOn'],
                        row['ModifiedBy']['displayValue'],
                     ]);
                        }
    }
  
  Logger.log(creatioData.length);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Creatio");
  // var emptyData = new Array(17000);
  // for(i=0; i<emptyData.length; i++) {
  //   emptyData[i] = new Array(12);
  // }
  // if (creatioData.length > 2) {
  //   sheet.getRange(2,1, emptyData.length, emptyData[0].length).setValues(emptyData);
  // }
  var aLast = getLastNotEmptyRow(sheet);
  if (creatioData.length > 2) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Creatio");
    sheet.getRange(2, 1, aLast, 12).clearContent();
  }
  SpreadsheetApp.flush();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Creatio");
  sheet.getRange(2,1, creatioData.length, creatioData[0].length).setValues(creatioData);
  
  var time = new Date();
  time = Utilities.formatDate(time, "Europe/Berlin", "dd.MM.yyyy HH:mm");
  var sheet4 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Creatio");
  
  if (creatioData.length > 0) {
    sheet4.getRange(2,16, 1, 1).setValue(time);
  }
}

function getLastNotEmptyRow(ss){
  var Direction=SpreadsheetApp.Direction;
  var aLast =ss.getRange("A"+(ss.getLastRow()+1)).getNextDataCell(Direction.UP).getRow();
  Logger.log("Last row: "+ aLast);
  return aLast;
}