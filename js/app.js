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

generateSales();

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
  var currentShop;
  var saleList;
  var items;
  var itemText;
  console.log(allShopContainers);
  for (var i = 0; i < 5; i++) {
    currentShop = allShops.shops[i];
    allShopContainers[i].appendChild(document.createTextNode(currentShop.name));
    saleList = document.createElement('ul');
    for (var j = 0; j < 15; j++) {
      item = document.createElement('li');
      itemText = document.createTextNode(hours[j] + ' : ' + currentShop.cookiesPerHour[j] + ' cookies');
      item.appendChild(itemText);
      saleList.appendChild(item);
    }
    allShopContainers[i].appendChild(saleList);
    console.log(allShopContainers[i]);
  }
}

displaySales();
