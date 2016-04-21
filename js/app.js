'use strict';

var hours = [];
for (var k = 0; k < 6; k++) {
  hours.push((k + 6) + ' AM');
}
for (var l = 0; l < 9; l++) {
  hours.push(l + ' PM');
}

var table;
var theading = document.createElement('thead');
var tbody = document.createElement('tbody');

function createTable() {
  table = document.getElementById('saleDataTable');
  theading = document.createElement('thead');
  var headingCell = document.createElement('th');
  headingCell.appendChild(document.createTextNode(''));
  theading.appendChild(headingCell);
  for (var j = 0; j < hours.length; j++) {
    headingCell = document.createElement('th');
    headingCell.appendChild(document.createTextNode(hours[j]));
    theading.appendChild(headingCell);
  }
  table.appendChild(theading);

  headingCell = document.createElement('th');
  headingCell.appendChild(document.createTextNode('Total Sold'));
  theading.appendChild(headingCell);
  table.appendChild(theading);
  table.appendChild(tbody);
}

createTable();

class CookieShop {
  constructor(name, minCust, maxCust, avgCookie) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookie = avgCookie;
    this.custPerHour = 0;
    this.cookiesPerHour = new Array();
    this.totalCookiesSold = 0;
  }
}

CookieShop.prototype.logCookiesSold = function() {
  this.totalCookiesSold = 0;
  this.cookiesPerHour = new Array();
  for (var i = 0; i < hours.length; i++) {
    this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
    var tempt = Math.floor(this.custPerHour * this.avgCookie);
    this.cookiesPerHour.push(tempt);
    this.totalCookiesSold += tempt;
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

var pikePlaceShop = new CookieShop('Pike Place', 17, 88, 5.2);
var seaTacShop = new CookieShop('SeaTac Airport', 6, 24, 1.2);
var southCenterShop = new CookieShop('Southcenter', 11, 38, 1.9);
var bellSquareShop = new CookieShop('Bellevue Square', 20, 48, 3.3);
var alkiShop = new CookieShop('Alki', 3, 24, 2.6);

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

function displaySaleData() {
  var newTbody = document.createElement('tbody');
  var cellEntry;
  var row;
  var rowLabel;
  var currentShop;

  for (var i = 0; i < allShops.shops.length; i++) {
    currentShop = allShops.shops[i];
    row = document.createElement('tr');
    rowLabel = document.createElement('th');
    rowLabel.appendChild(document.createTextNode(currentShop.name));
    row.appendChild(rowLabel);
    for (var j = 0; j < hours.length; j++) {
      cellEntry = document.createElement('td');
      cellEntry.appendChild(document.createTextNode(currentShop.cookiesPerHour[j]));
      row.appendChild(cellEntry);
    }
    cellEntry = document.createElement('td');
    cellEntry.appendChild(document.createTextNode(currentShop.totalCookiesSold));
    row.appendChild(cellEntry);

    newTbody.appendChild(row);
  }
  tbody.parentNode.replaceChild(newTbody, tbody);
  tbody = newTbody;
}

displaySaleData();


function createNewShop(event) {
  event.preventDefault();

  if (!event.target.shopName.value || !event.target.minCust.value || !event.target.maxCust.value || !event.target.avgCookies.value) {
    return alert('Fields cannot be empty!');
  }

  var shopNameInput = event.target.shopName.value;
//  console.log(shopNameInput);
  var minCustInput = Number.parseInt(event.target.minCust.value);
  var maxCustInput = Number.parseInt(event.target.maxCust.value);
  var avgCookiesInput = Number.parseFloat(event.target.avgCookies.value);
  var newTable;
  var flag = true;

  var currentShopIteration;

  for (var i = 0; i < allShops.shops.length; i++) {
    currentShopIteration = allShops.shops[i];
    if (shopNameInput == currentShopIteration.name) {
      flag = false;
      currentShopIteration.minCust = minCustInput;
      currentShopIteration.maxCust = maxCustInput;
      currentShopIteration.avgCookie = avgCookiesInput;
      // console.log(allShops.shops[i].minCust);
      // console.log(allShops.shops[i].maxCust);
      // console.log(allShops.shops[i].avgCookie);

      currentShopIteration.logCookiesSold();

      displaySaleData();
      console.log(allShops.shops.length);
    }
  }

  if(flag) {
    var newShop = new CookieShop(shopNameInput, minCustInput, maxCustInput, avgCookiesInput);
    newShop.logCookiesSold();
    allShops.addShop(newShop);
    displaySaleData();
  }

  event.target.shopName.value = null;
  event.target.minCust.value = null;
  event.target.maxCust.value = null;
  event.target.avgCookies.value = null;
}

var newShopForm = document.getElementById('addNewShop');
newShopForm.addEventListener('submit', createNewShop);
