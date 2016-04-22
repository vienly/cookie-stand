'use strict';

var hours = [];
for (var k = 0; k < 6; k++) {
  hours.push((k + 6) + ' AM');
}
for (var l = 0; l < 9; l++) {
  hours.push(l + ' PM');
}

var table;
var tbody = document.createElement('tbody');

// Initial table and attach reference to the element
function createTable() {
  table = document.getElementById('saleDataTable');
  var theading = document.createElement('thead');
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
  var tempt;
  for (var i = 0; i < hours.length; i++) {
    this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
    tempt = Math.floor(this.custPerHour * this.avgCookie);
    this.cookiesPerHour.push(tempt);
    this.totalCookiesSold += tempt;
  }
}

// Shop manager for all shops
var allShops = {
  shops: new Array(),
  allShopDataArray: [['Pike Place', 17, 88, 5.2],
                      ['SeaTac Airport', 6, 24, 1.2],
                      ['Southcenter', 11, 38, 1.9],
                      ['Bellevue Square', 20, 48, 3.3],
                      ['Alki', 3, 24, 2.6]],
  addShop: function(shop) {
    this.shops.push(shop);
  },
  removeShop: function(shop) {
    var index = this.shops.indexOf(shop);
    this.shops.splice(index, 1);
  },
  initShops: function() {
    var newShopHolder;
    this.allShopDataArray.forEach(function(shop){
      newShopHolder = new CookieShop(shop[0], shop[1], shop[2], shop[3]);
      newShopHolder.logCookiesSold();
      // Cannot use this here because statement is inside of a forEach scope
      allShops.addShop(newShopHolder);
    });
  }
};

allShops.initShops();

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
  var minCustInput = Number.parseInt(event.target.minCust.value);
  var maxCustInput = Number.parseInt(event.target.maxCust.value);
  var avgCookiesInput = Number.parseFloat(event.target.avgCookies.value);
  var newTable;

  var currentShopIteration;

  for (var i = 0; i < allShops.shops.length; i++) {
    currentShopIteration = allShops.shops[i];
    if (shopNameInput == currentShopIteration.name) {
      currentShopIteration.minCust = minCustInput;
      currentShopIteration.maxCust = maxCustInput;
      currentShopIteration.avgCookie = avgCookiesInput;

      currentShopIteration.logCookiesSold();

      displaySaleData();
      allShops.allShopDataArray[i] = [shopNameInput, minCustInput, maxCustInput, avgCookiesInput];
    }
  }

  // If loop is exhausted
  if(i >= allShops.shops.length) {
    allShops.allShopDataArray.push([shopNameInput, minCustInput, maxCustInput, avgCookiesInput]);
    var newShop = new CookieShop(shopNameInput, minCustInput, maxCustInput, avgCookiesInput);
    newShop.logCookiesSold();
    allShops.addShop(newShop);
    displaySaleData();
  }
  console.log(allShops.allShopDataArray);

  event.target.shopName.value = null;
  event.target.minCust.value = null;
  event.target.maxCust.value = null;
  event.target.avgCookies.value = null;
}

var newShopForm = document.getElementById('addNewShop');
newShopForm.addEventListener('submit', createNewShop);
