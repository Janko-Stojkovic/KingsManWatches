window.onload = () => {

    function setItemToLS(name,data){
        localStorage.setItem(name,JSON.stringify(data));
    }   

    function getItemFromLS(name){
        return JSON.parse(localStorage.getItem(name));
    }
    var heroSec = document.getElementById("hero")
    heroSec.style.height = "0vh";
    document.getElementById("navbar").style.background = "#665132";

    let products = getItemFromLS("cart");
    if(products == null){
        showEmptyCart();
    }
    else{
        showCart();
        quantityChange()
    }

    numberOfItemsInCart();
    function showEmptyCart(){
        let html =
            `<div class="row">
            <div class="col-lg-7 col-md-8 col-12 text-center mx-auto">
            <img src="assets/images/empty.png" alt="Cart is empty." class="empty"/>
            <div>
            <h3 class="text-danger">Cart is empty.</h3>
            </div>
            </div>
            </div>`;
        $("#shopping-cart").html(html);
    }


    
    function showCart(){
        let allProducts = getItemFromLS("allProducts");
        let productsInCart = getItemFromLS("cart");

        let productsToShow = allProducts.filter(x => {
            for(let wCart of productsInCart){
                if(x.id == wCart.id){
                    x.quantity = wCart.quantity;
                    return true;
                }
                }
                return false;
            })
            loadCart(productsToShow);
    }

    function loadCart(products){
        let html=`
        <div class="table-responsive shopping-cart">
        <table class="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Price Per Product</th>
                    <th class="text-center">Sum</th>
                    <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#" id="clear-cart">Clear Cart</a></th>
                </tr>
            </thead>
            <tbody>`;
            for(let p of products){
                html+= generateTr(p);
            }
            html += `</tbody>
            </table>
            </div>`;
               
           
    let html2 = `<div class="shopping-cart-footer">
        <div class="column text-lg">Total: <span class="text-medium" id="total-sum">${sumPrices(products)}</span></div>
    </div>
    <div class="shopping-cart-footer">
        <div class="column"><a class="btn btn-outline-secondary" href="shop.html"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
        <div class="column"><a class="btn btn-primary" id="finish" href="#" data-toast="" data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Your cart" data-toast-message="is updated successfully!">Order</a></div>
    </div>` ;

    $("#shopping-cart").html(html+html2);
    $("#finish").click(purchase);
        function generateTr(p){
            return `<tr>
            <td>
                <div class="product-item">
                    <a class="product-thumb" href="#"><img src="assets/images/${p.image.src}.jpg" alt="${p.image.alt}"></a>
                    <div class="product-info">
                        <h4 class="product-title"></h4><span><em>${p.name}</em></span>
                    </div>
                </div>
            </td>
            <td class="text-center">
            <input type="number" class="product-quantity" name="tentacles"
            min="1" max="50" value="${p.quantity}">
                </div>

            </td>
            <td class="text-center text-lg text-medium"><p class="price-per-product">${p.price.new}</p></td>
            <td class="text-center text-lg text-medium"><P class="sum-per-product">${p.price.new * p.quantity}</p></td>
            <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>

        </tr>`;
        
       
        }
        $("#clear-cart").click(removeAll);
        
    }             
    
    function removeAll(){
        localStorage.removeItem("cart");
        showEmptyCart();
        numberOfItemsInCart();
    }
      
    // function removeFromCart(id) {
    //     let products = getItemFromLS("cart");
    //     let filteredProducts = products.filter(x => x.id != id);
    //     setItemToLS("cart", filteredProducts);
    //     showCart();
    
    // }
    function sumPrices(products){
        let sum = 0;
        products.forEach(s =>{
        sum += s.price.new * s.quantity;
        })
        return "€" + sum;
    }

    function update(){
        let productSum = document.querySelectorAll(".sum-per-product");
        let price = document.querySelectorAll(".price-per-product");
        let quantity = document.querySelectorAll(".product-quantity");
        let totalSum = document.querySelector("#total-sum");
        let sumPerProduct = 0;
        for(let i=0; i < price.length; i++){
            let priceFormat = price[i].innerHTML.replace("€", "");
            productSum[i].innerHTML = (priceFormat)*(quantity[i].value) + "€";
            sumPerProduct += (priceFormat) * (quantity[i].value);
        }
        totalSum.innerHTML = "Total Sum is " + sumPerProduct + "€";
    }

    function quantityChange(){
        $(".product-quantity").change(function(){
            if(this.value > 0){
                update();
            }
            else{
                this.value = 1;
            }
        });
    }

    function purchase(){
        alert("Your purchase is successful." + "\n" + "Order number: " +
        Math.floor(Math.random() * 100000) + 1);
        removeAll();
    }
    function numberOfItemsInCart() {
        
        let products = getItemFromLS("cart");
        let cartNumberSpan = $('.number');
        let cartNumberText = "";
        if(products){
        let productsNumber = products.length;
        if(productsNumber == 0){
            productsNumber = "";
        }
        cartNumberText = productsNumber;
        }
        cartNumberSpan.html(cartNumberText);
    }
    numberOfItemsInCart();


    var navbarBtn = document.querySelector(".navbar-toggler");

    navbarBtn.addEventListener("click", function(){
        let navbar = document.querySelector(".navbar");
        navbar.style.background = "rgb(102, 81, 50)";
    })

    fetchData("menu", showMenu);

    function showMenu(data){
        let html = "";
        let card = document.getElementById("menu");
        data.forEach(menu => {
            html += `<li class="nav-item">
            <a class="nav-link" href="${menu.link}">${menu.page}</a>
            </li>`;
        });
        menus = data;
        card.innerHTML = html;

    }
    function fetchData(file, callback){
    $.ajax({
       url:"assets/data/" + file + ".json",
       method:"get",
       dataType:"json",
       success:function(response){
          callback(response);
       },
       error:function(err){
          console.log(err);
       }
    });
}
}
