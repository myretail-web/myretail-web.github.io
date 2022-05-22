function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if ( arr[i].toLowerCase().indexOf(val.toLowerCase()) >= 0 )  {
  
          }
          // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          if (arr[i].toLowerCase().indexOf(val.toLowerCase()) >= 0) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  //var productArray = ["Women: Platinum Diamond Emerald Bliss","Women: Diamond Rhodium Sensational Sapphire","Women: Gold Bridal Jhumkas","Women: Golden Bell","Women: Gold Diamond Dandling Ball","Women: Diamond Rhodium Magnifique mesh","Women: Gold leaf","Women: Pearl and Gold Butta","Women: Chandeliere de gold","Women: Ruby drop","Women: Gemstone bonanza","Women: Diamond Rhodium Emerald Drop","Women: Gold ","Women: Emerald Gold Diamond Rain","Women: Diamond Sapphire bliss","Women: Cat eyeMajestic Cat","Women: Diamond Rhodium Ruby bliss","Women: Diamond Rhodium Emerald Spade","Women: Rhodium Ruby Spade","Women: Diamond and gold ensemble","Women: BronzeGemstone Radiance","Men: Rhodium Diamond Trophy","Men: Steel Holy Cross","Men: Gold Diamond Lord of the Butterflies ","Men: Gold Diamond Upscale","Men: Rhodium Brilliant Cookie","Men: Rhodium Diamond Panthera Majestica"]
  
  axios.get('/data/suggestions.json', {headers: {'Content-Type': 'application/json'}})
  .then(response => {
      const productArray = response.data.products
      autocomplete(document.getElementById("myInput"), productArray);
  })

  function showCatalogue() {
    let searchTerms = document.getElementById("myInput").value
    let searchPhrase = searchTerms.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_").toLowerCase().trim()
    let keywords = (searchPhrase.length < 80 ) ? searchPhrase : searchPhrase.substr(0, 79)
    window.open("/products?key=" + keywords, "_self")
  }


function showProductGrid() {
  let params = new URLSearchParams(window.location.search)
  if (params.has("key")) {
    let keywords = params.get("key").trim()
    if (keywords.length > 0) {
      axios.get('/data/search-results.json', {headers: {'Content-Type': 'application/json'}})
      .then(response => {
          const productData = response.data.products
          if (productData.length > 0) {
            let gridHtml = ''
            let itemTemplate =  `
            <li class="foundation-list-item"><div class="we-ProductsGrid-item"><div class="we-ProductsGrid-item-image img-center">
            <div><img src="/images/set__id_.png" alt="_title_" title="_title_" class="cq-dd-image"></div></div>
            <h3 class="we-ProductsGrid-item-title h4">_title_</h3><span class="we-ProductsGrid-item-subtitle small text-muted">
            _subtitle_</span><strong class="we-ProductsGrid-item-price"><span>_price_</span><span class="we-ProductsGrid-item-price-new">
            </span><s class="we-ProductsGrid-item-price-old"></s></strong><span class="we-ProductsGrid-item-discount hidden">
            <span></span>off</span><a href="/earrings.html?key=_id_" class="we-ProductsGrid-item-link"></a></div></li>
            `
            for (let i = 0; i < productData.length; i++) {
              let subTitle = (productData[i].id.indexOf("w") >= 0) ? "Women" : "Men"
              gridHtml = gridHtml + itemTemplate.replace(/_id_/g, productData[i].id)
                            .replace(/_title_/g, productData[i].title)
                            .replace(/_subtitle_/g, subTitle)
                            .replace(/_price_/g, productData[i].price)
            }
            document.getElementById("productGrid").innerHTML = gridHtml
          }
      })
    }
  }
} 

function showRecommendations() {
  let key = "w1"
  let params = new URLSearchParams(window.location.search)
  if (params.has("key") && params.get("key").trim().length > 0) {
    key = params.get("key").trim().toLowerCase()
  }

  let recData = []
  if (key.indexOf("m") >= 0) {
    document.getElementById("breadcrumbLink").href = "/men"
    document.getElementById("breadcrumbLinkText").textContent = "Men"
    recData = ["m1#Diamond Trophy#746.63","m2#Holy Cross#581.12","m3#Lord of the Butterflies#418.6","m4#Upscale#611.72","m5#Brilliant Cookie#584.35","m6#Panthera Majestica#818.8"]
  } else {
    document.getElementById("breadcrumbLink").href = "/women"
    document.getElementById("breadcrumbLinkText").textContent = "Women"
    recData = ["w1#Emerald Bliss#1286.44","w2#Sensational Sapphire#381.84","w3#Gold Bridal Jhumkas#442.68","w4#Golden Bell#420.75","w5#Dangling Ball#610.73","w6#Magnifique mesh#310.98","w7#Gold leaf#250.75","w8#Pearl and Gold Butta#439.64","w9#Chandeliere de gold#508.2","w10#Ruby drop#691.12","w11#Gemstone bonanza#800.88","w12#Emerald Drop#394.32","w13#Gold Butta#770.04","w14#Diamond Rain#688.86","w15#Sapphire bliss#262.4","w16#Majestic Cat#813.78","w17#Ruby bliss#731","w18#Emerald Spade#489.24","w19#Ruby Spade#429.66","w20#Diamond and gold ensemble#624.65","w21#Gemstone Radiance#99.99"]
  }

  let gridHtml = ''
  let itemTemplate =  `
  <li class="foundation-list-item">
    <div class="we-ProductsGrid-item">
      <div class="we-ProductsGrid-item-image img-center">
        <img id="prdImage__id_" src="/images/set__id_.png" alt="_title_">
      </div>
      <h3 class="we-ProductsGrid-item-title h4" id="prdName__id_">_title_</h3>
      <strong class="we-ProductsGrid-item-price">
        <span id="prdPrice__id_">_price_</span>
        <span class="we-ProductsGrid-item-price-new"></span>
        <s class="we-ProductsGrid-item-price-old"></s>
      </strong>
      <span class="we-ProductsGrid-item-discount hidden"><span></span>off</span>
      <a onclick="setProduct('_id_')" class="we-ProductsGrid-item-link"></a>
    </div>
  </li>
  `

  for (let i = 0; i < recData.length; i++) {
    let rec = recData[i].split("#")
    if (key === rec[0]) {
      document.getElementById("productImage").src = ("images/set_" + key + ".png")
      document.getElementById("productName").textContent = rec[1]
      document.getElementById("productPrice").textContent = rec[2]
      continue
    }
    gridHtml = gridHtml + itemTemplate.replace(/_id_/g, rec[0])
                  .replace(/_title_/g, rec[1])
                  .replace(/_price_/g, "£" + rec[2])
  }
  document.getElementById("recommendationsGrid").innerHTML = gridHtml
}