function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  var coinDict = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  var cidCoins = [];
  var cidNumber = Math.round(cid.map(slot => slot[1]).reduce((accumulator, currentValue) => accumulator + currentValue) * 100) / 100;
  for (var i = 0; i < cid.length; i++){
    cidCoins.push([cid[i][0], cid[i][1] / coinDict[cid[i][0]]])
  };
    if (change == cidNumber){
    return {status: "CLOSED", change: cid}
  }
  if (change > cidNumber){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  else {
    var changeCoins = [];
    var changeCountdown = change;
    for (var i = cid.length - 1; i >= 0; i--){
          console.log(changeCountdown);
      if (changeCountdown > coinDict[cid[i][0]]){
        var changeRequest = Math.floor(changeCountdown / coinDict[cid[i][0]]);
        console.log("change request" + changeRequest)
        var changeAvailable = cid[i][1] / coinDict[cid[i][0]];
        console.log("change available" + changeAvailable)
        if (changeRequest > changeAvailable){
          changeCoins.push([cid[i][0], changeAvailable * coinDict[cid[i][0]]]);
          changeCountdown = Math.round((changeCountdown - (changeAvailable * coinDict[cid[i][0]])) * 100) / 100;
        }
        else {
          changeCoins.push([cid[i][0], changeRequest * coinDict[cid[i][0]]]);
          changeCountdown = Math.round((changeCountdown - (changeRequest * coinDict[cid[i][0]])) * 100) / 100
        }
      }
      
    }
    if (changeCountdown == 0){
      return {status: "OPEN", change: changeCoins}
    }
    else {
      return  {status: "INSUFFICIENT_FUNDS", change: []};
    }

  }
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]


checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);