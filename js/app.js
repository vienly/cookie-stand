var pikePlaceShop = {
  name: 'Pike Place Market',
  minCust: 17,
  maxCust: 88,
  avgCookie: 5.2,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.cookiesPerHour.push(Math.floor(this.custPerHour * this.avgCookie));
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
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.cookiesPerHour.push(Math.floor(this.custPerHour * this.avgCookie));
    }
  }
};

var southCenterShop = {
  name: 'Southcenter',
  minCust: 11,
  maxCust: 38,
  avgCookie: 1.9,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.cookiesPerHour.push(Math.floor(this.custPerHour * this.avgCookie));
    }
  }
};

var bellSquareShop = {
  name: 'Bellevue Square',
  minCust: 20,
  maxCust: 48,
  avgCookie: 3.3,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.cookiesPerHour.push(Math.floor(this.custPerHour * this.avgCookie));
    }
  }
};

var alkiShop = {
  name: 'Alki',
  minCust: 3,
  maxCust: 24,
  avgCookie: 2.6,
  custPerHour: 0,
  cookiesPerHour: new Array(),
  fill: function() {
    for (var i = 0; i < 15; i++) {
      this.custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
      this.cookiesPerHour.push(Math.floor(this.custPerHour * this.avgCookie));
    }
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

  var body = document.getElementById('pikePlace'), tbl = document.createElement('table');

  //location heading
  var row;
  var headings = tbl.insertRow();
  var storeLog;
  var label = headings.insertCell();
  var currentShop;
  var logItem;
  label.appendChild(document.createTextNode('Location'));

  for (var i = 0; i < hours.length; i++) {
    label = headings.insertCell();
    label.appendChild(document.createTextNode(hours[i]));
  }

  console.log(allShops.shops.length);
  for (var j = 0; j < allShops.shops.length; j++) {
    currentShop = allShops.shops[j];
    row = tbl.insertRow();
    label = row.insertCell();
    label.appendChild(document.createTextNode(currentShop.name));
    for (var k = 0; k < 15; k++) {
      logItem = row.insertCell();
      logItem.appendChild(document.createTextNode(currentShop.cookiesPerHour[k]));
    }
  }

  body.appendChild(tbl);
}

displaySales();
