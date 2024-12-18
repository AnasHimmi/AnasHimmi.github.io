const clusters = {
  0: [
    { name: "Prima Pils", reviews: 2105.0 },
    { name: "Pabst Blue Ribbon (PBR)", reviews: 1724.0 },
    { name: "#9", reviews: 1703.0 },
    { name: "Budweiser", reviews: 1683.0 },
    { name: "Sierra Nevada Summerfest", reviews: 1605.0 }
  ],
  1: [
    { name: "Founders KBS (Kentucky Breakfast Stout)", reviews: 2180.0 },
    { name: "Founders Backwoods Bastard", reviews: 1842.0 },
    { name: "Crème Brûlée Imperial Milk Stout (Blackwater Series)", reviews: 1466.0 },
    { name: "Vanilla Porter", reviews: 1088.0 },
    { name: "Insanity (Ale Aged in Oak Barrels)", reviews: 947.0 }
  ],
  2: [
    { name: "90 Minute IPA", reviews: 3899.0 },
    { name: "Pliny The Elder", reviews: 3690.0 },
    { name: "Two Hearted Ale", reviews: 3561.0 },
    { name: "Hopslam Ale", reviews: 3527.0 },
    { name: "Sierra Nevada Celebration Ale", reviews: 3466.0 }
  ],
  3: [
    { name: "Founders Breakfast Stout", reviews: 3811.0 },
    { name: "Old Rasputin Russian Imperial Stout", reviews: 3722.0 },
    { name: "Brooklyn Black Chocolate Stout", reviews: 2810.0 },
    { name: "Stone Imperial Russian Stout", reviews: 2754.0 },
    { name: "Storm King Stout", reviews: 2642.0 }
  ],
  4: [
    { name: "La Fin Du Monde", reviews: 2976.0 },
    { name: "Weihenstephaner Hefeweissbier", reviews: 2530.0 },
    { name: "Hennepin (Farmhouse Saison)", reviews: 2176.0 },
    { name: "Bell's Oberon Ale", reviews: 1809.0 },
    { name: "Golden Monkey", reviews: 1799.0 }
  ],
  5: [
    { name: "Samuel Adams Octoberfest", reviews: 2148.0 },
    { name: "Schneider Weisse Tap 6 Unser Aventinus", reviews: 2142.0 },
    { name: "Double Bastard Ale", reviews: 2118.0 },
    { name: "Punkin Ale", reviews: 2111.0 },
    { name: "Three Philosophers Belgian Style Blend (Quadrupel)", reviews: 2101.0 }
  ],
  6: [
    { name: "Grapefruit Sculpin", reviews: 844.0 },
    { name: "Crazy Ed's Cave Creek Chili Beer", reviews: 232.0 },
    { name: "Original C Cave Creek Chili Beer - Cerveza Con Chili", reviews: 203.0 },
    { name: "Ghost Face Killah", reviews: 182.0 },
    { name: "Schöfferhofer Grapefruit Weizen-Mix", reviews: 173.0 }
  ],
  7: [
    { name: "Supplication", reviews: 1465.0 },
    { name: "Festina Pêche", reviews: 1365.0 },
    { name: "Consecration", reviews: 1165.0 },
    { name: "La Folie", reviews: 1060.0 },
    { name: "Temptation", reviews: 1029.0 }
  ],
  8: [
    { name: "Midas Touch", reviews: 1653.0 },
    { name: "Theobroma", reviews: 778.0 },
    { name: "Original Honey Brown Extra Rich Lager (Beer Brewed With Honey)", reviews: 669.0 },
    { name: "Samuel Adams Honey Porter", reviews: 635.0 },
    { name: "Chateau Jiahu", reviews: 569.0 }
  ]
};

function displayClusters(id) {
  const container = document.getElementById("cluster-container");
  container.innerHTML = "";

  const clusterDiv = document.createElement("div");
  clusterDiv.classList.add("cluster");
  
  const beers = clusters[id];
  beers.forEach(beer => {
      const beerItem = document.createElement("div");
      beerItem.classList.add("beer-item");
      beerItem.innerHTML = `<span>${beer.name}</span> - ${beer.reviews} reviews`;
      clusterDiv.appendChild(beerItem);
  });

  container.appendChild(clusterDiv);

  
}
