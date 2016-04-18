var pikePlaceShop = {
  name: 'Pike Place Market',
  minCust: 17,
  maxCust: 88,
  avgCookie: 5.2,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  totalCookiesSold: 0,
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var tempt = Math.floor(this.custPerHour * this.avgCookie);
      this.cookiesPerHour.push(tempt);
      this.totalCookiesSold += tempt;
    }
  }
};

var seaTacShop = {
  name: 'SeaTac Airport',
  minCust: 6,
  maxCust: 24,
  avgCookie: 1.2,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  totalCookiesSold: 0,
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var tempt = Math.floor(this.custPerHour * this.avgCookie);
      this.cookiesPerHour.push(tempt);
      this.totalCookiesSold += tempt;    }
  }
};

var southCenterShop = {
  name: 'Southcenter',
  minCust: 11,
  maxCust: 38,
  avgCookie: 1.9,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  totalCookiesSold:0,
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var tempt = Math.floor(this.custPerHour * this.avgCookie);
      this.cookiesPerHour.push(tempt);
      this.totalCookiesSold += tempt;    }
  }
};

var bellSquareShop = {
  name: 'Bellevue Square',
  minCust: 20,
  maxCust: 48,
  avgCookie: 3.3,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  totalCookiesSold: 0,
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var tempt = Math.floor(this.custPerHour * this.avgCookie);
      this.cookiesPerHour.push(tempt);
      this.totalCookiesSold += tempt;    }
  }
};

var alkiShop = {
  name: 'Alki',
  minCust: 3,
  maxCust: 24,
  avgCookie: 2.6,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  totalCookiesSold: 0,
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      var tempt = Math.floor(this.custPerHour * this.avgCookie);
      this.cookiesPerHour.push(tempt);
      this.totalCookiesSold += tempt;    }
  }
};

function generateSales() {
  pikePlaceShop.fill();
  seaTacShop.fill();
  southCenterShop.fill();
  bellSquareShop.fill();
  alkiShop.fill();
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

generateSales();

allShops.addShop(pikePlaceShop);
allShops.addShop(seaTacShop);
allShops.addShop(southCenterShop);
allShops.addShop(bellSquareShop);
allShops.addShop(alkiShop);

console.log(allShops);

var hours = [];
for (var k = 0; k < 6; k++) {
  hours.push((k + 6) + ' AM');
}
for (var l = 0; l < 9; l++) {
  hours.push(l + ' PM');
}

function displaySales() {
  var allShopContainers = document.getElementsByClassName('shop');
  console.log(allShopContainers);

  var container = document.getElementById('displaySaleData'), tbl = document.createElement('table');

  //location heading
  var headings = tbl.insertRow();
  var cellEntry = headings.insertCell();
  var currentShop;
  var row;
  cellEntry.appendChild(document.createTextNode('Location'));

  //location and hour headings
  for (var i = 0; i < hours.length; i++) {
    cellEntry = headings.insertCell();
    cellEntry.appendChild(document.createTextNode(hours[i]));
  }
  cellEntry = headings.insertCell();
  cellEntry.appendChild(document.createTextNode('Total Sold'));

  //log cell entries
  console.log(allShops.shops.length);
  for (var j = 0; j < allShops.shops.length; j++) {
    currentShop = allShops.shops[j];
    row = tbl.insertRow();
    //log row label
    cellEntry = row.insertCell();
    cellEntry.appendChild(document.createTextNode(currentShop.name));
    //log sales
    for (var k = 0; k < 15; k++) {
      cellEntry = row.insertCell();
      cellEntry.appendChild(document.createTextNode(currentShop.cookiesPerHour[k]));
    }
    cellEntry = row.insertCell();
    cellEntry.appendChild(document.createTextNode(currentShop.totalCookiesSold));
  }

  container.appendChild(tbl);
}

displaySales();
