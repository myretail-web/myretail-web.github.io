function openSearchBox() {
    let searchBox = document.getElementById("navbar-search")
    searchBox.style.display = "block"
    searchBox.style.backgroundColor = "black"
    searchBox.style.opacity = "1"
}

function closeSearchBox() {
    document.getElementById("navbar-search").style.display="none"
}

function showLanguageSelector() {
    let langSelector = document.getElementById("language-selector")
    langSelector.style.display = "block"
    langSelector.style.backgroundColor = "black"
    langSelector.style.opacity = "1"
}

function hideLanguageSelector() {
    document.getElementById("language-selector").style.display = "none"
}

function toggleSideNav() {
    let sideNav = document.getElementById("we-example-navbar-collapse-inverse")
    if (sideNav.style.display =="block") {
        sideNav.style.display = "none"
    } else {
        sideNav.style.display = "block"
    }
}

function showMainMenu(bigScreen) {
    if (bigScreen.matches) {
        document.getElementById("we-example-navbar-collapse-inverse").style.display = "none"
    } else {
        document.getElementById("we-example-navbar-collapse-inverse").style.display = "block"
    }
  }
  var bigScreen = window.matchMedia("(max-width: 991px)")
  showMainMenu(bigScreen)
  bigScreen.addEventListener('change', showMainMenu)

  function toggleTrial() {
    scrollToTop()
    let tryButton = document.getElementById("tryItButton")
    if (tryButton.textContent.toLowerCase() =="try it") {
        tryButton.textContent = "end trial"
        document.getElementById("productImage").style.display = "none"
        document.getElementById("canvas_output").style.display = "block"
    } else {
        document.getElementById("canvas_output").style.display = "none"
        document.getElementById("productImage").style.display = "block"
        tryButton.textContent = "try it"
    }
}

function scrollToTop() {
    if (document.body.scrollTop) {
        document.body.scrollTop = 0;
    }
    if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = 0;
    }
}

function setProduct(sku) {
    let i1 = document.getElementById('productImage').src
    let t1 = document.getElementById('productName').textContent
    let p1 = document.getElementById("productPrice").textContent

    let i2 = document.getElementById('prdImage_' + sku).src
    let t2 = document.getElementById('prdName_' + sku).textContent
    let p2 = document.getElementById('prdPrice_' + sku).textContent

    document.getElementById('productImage').src = i2
    document.getElementById('productName').textContent = t2
    document.getElementById("productPrice").textContent = p2

    document.getElementById('prdImage_' + sku).src = i1
    document.getElementById('prdName_' + sku).textContent = t1
    document.getElementById('prdPrice_' + sku).textContent = p1



    scrollToTop()
}