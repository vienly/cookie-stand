'use strict';

var hours = [];
for (var k = 0; k < 6; k++) {
  hours.push((k + 6) + ' AM');
}
for (var l = 0; l < 9; l++) {
  hours.push(l + ' PM');
}

class cookieShop {
  constructor(name, minCust, maxCust, avgCookie) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookie = avgCookie;
    this.custPerHour = 0;
    this.cookiesPerHour = new Array();
    this.totalCookiesSold = 0;
  }

  logCookiesSold() {
    for (var i = 0; i < hours.length; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var tempt = Math.floor(this.custPerHour * this.avgCookie);
      this.cookiesPerHour.push(tempt);
      this.totalCookiesSold += tempt;
    }
  }

  logSaleData() {
    var cellEntry;
    // row = tbl.insertRow();
    var row = document.createElement('tr');
    //log row label column 1
    var th = document.createElement('th');
    // cellEntry = row.insertCell();
    th.appendChild(document.createTextNode(this.name));
    row.appendChild(th);
    //log sales, columns 2-15
    for (var i = 0; i < 15; i++) {
      //-1 index is used to insert cell at the end of the row
      cellEntry = row.insertCell(-1);
      cellEntry.appendChild(document.createTextNode(this.cookiesPerHour[i]));
    }
    //log total cookies sold on last column
    cellEntry = row.insertCell(-1);
    cellEntry.appendChild(document.createTextNode(this.totalCookiesSold));

    return row;
  }
}

var allShops = {
  shops: new Array(),
  addShop: function(shopName) {
    this.shops.push(shopName);
  },
  removeShop: function(shopName) {
    var index = this.shops.indexOf(shopName);
    this.shops.splice(index, 1);
  }
};

var pikePlaceShop = new cookieShop('Pike Place', 17, 88, 5.2);
var seaTacShop = new cookieShop('SeaTac Airport', 6, 24, 1.2);
var southCenterShop = new cookieShop('Southcenter', 11, 38, 1.9);
var bellSquareShop = new cookieShop('Bellevue Square', 20, 48, 3.3);
var alkiShop = new cookieShop('Alki', 3, 24, 2.6);

function generateSales() {
  pikePlaceShop.logCookiesSold();
  seaTacShop.logCookiesSold();
  southCenterShop.logCookiesSold();
  bellSquareShop.logCookiesSold();
  alkiShop.logCookiesSold();
}

generateSales();

allShops.addShop(pikePlaceShop);
allShops.addShop(seaTacShop);
allShops.addShop(southCenterShop);
allShops.addShop(bellSquareShop);
allShops.addShop(alkiShop);

function displaySales() {
  var tbl = document.getElementById('saleDataTable');
  var hourLabelRow = document.createElement('tr');
  var headingCell = document.createElement('th');
  headingCell.appendChild(document.createTextNode(''));
  hourLabelRow.appendChild(headingCell);
  for (var j = 0; j < hours.length; j++) {
    headingCell = document.createElement('th');
    headingCell.appendChild(document.createTextNode(hours[j]));
    hourLabelRow.appendChild(headingCell);
  }
  tbl.appendChild(hourLabelRow);

  headingCell = document.createElement('th');
  headingCell.appendChild(document.createTextNode('Total Sold'));
  hourLabelRow.appendChild(headingCell);

  for (var i = 0; i < allShops.shops.length; i++) {
    tbl.appendChild(allShops.shops[i].logSaleData());
  }
}

displaySales();


var newShopForm = document.getElementById('addNewShop');
