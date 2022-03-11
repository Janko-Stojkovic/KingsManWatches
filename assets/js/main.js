
$(document).ready(function(){
    let url = window.location.pathname;
    fetchData("menu", function(result){
    showMenu(result);
    });

    if(url == "/shop.html"){
        fetchData("brands", function(result){
        showBrands(result);
        });
        $("#sort").change(filterChange);
        $("#search").keyup(filterChange);
      
    }
});
 
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

        
  
    function showBrands(data){
        let html = "";
        let card = document.getElementById("brands");
        data.forEach(brand => {
            html+=`<li class="list-group-item d-flex justify-content-between align-items-center">
            <input type="checkbox" value="${brand.id}" class="brand" name="brands"/> ${brand.name}
        </li>`
        });
        brands = data;
        card.innerHTML = html;
        $('.brand').change(filterChange);
        fetchData("discounts", function(result){
            showDiscountList(result);
            });
            

    }
    
    
    
    
   

    
    function showDiscountList(data){
        let html = "";
        let card = document.getElementById("discounts");
        data.forEach(discount => {
            html+=`<li class="list-group-item d-flex justify-content-between align-items-center">
            <input type="checkbox" value="${discount.id}" class="discount" name="discounts"/> ${discount.value}
        </li>`
        });
        discounts = data;
        $(card).html(html);
        $('.discount').change(filterChange);
        fetchData("products", function(response){
            setItemToLS("allProducts", response);
            showProducts(response);
        });
        // fetchData("products", showMoreInfo);
    }

    function showProducts(data){
        data = searchProduct(data);
        data = filterByDiscount(data);
        data = sort(data);
        data = filterBrands(data);
        let html = "";
        let card = document.getElementById("products");
        data.forEach(product => {
            html+=`<div class="col-xl-3 col-lg-4 col-md-4 col-6 product-incfhny mb-4">
            <div class="product-grid2 transmitv">
                <div class="product-image2">
                    
                        <img class="pic-1 img-fluid" src="assets/images/${product.image.src}.jpg" alt="${product.image.alt}">
                        <img class="pic-2 img-fluid" src="assets/images/${product.imageHover.src}.jpg" alt="${product.imageHover.alt}">
                    
                    
                    <ul class="social">
                        <li>
                        <button type="button" data-toggle="modal" data-target="#One">
                            <span class="fa fa-eye"></span>
                        </button>
                        </li>
                    </ul>
                    <div class="transmitv single-item">
                            <input type="hidden" name="cmd" value="_cart">
                            <input type="hidden" name="add" value="${product.itemValue}">
                            <input type="hidden" name="transmitv_item" value="${product.nameValue}">
                            <input type="hidden" name="amount" value="${product.priceValue}">
                            <button ="add" class="transmitv-cart ptransmitv-cart add-cart" data-id="${product.id}">
                                Add to Cart
                            </button>
                    </div>
                </div>
                <div class="product-content">
                    <h3 class="title">${fetchBrand(product.brand)}
                    </h3>
                    <p>
                    ${product.name}
                  </p>

                    <h3 class="price"><del>${product.price.old ? "$" + product.price.old  : ""}</del></h3>
                    <h3 class="price"> $${product.price.new}
                   ${fetchDiscount(product.discount) ? "(" + fetchDiscount(product.discount) + " Off)" : ""}</h3>
                </div>
            </div>
        </div>`
        });
        products = data;
        $(card).html(html);
       
        $(".add-cart").click(addToCart);

        
    }
    
    

   
    // function showMoreInfo(array) {
    //     let html = "";
    //     for (let info of array) {
    //       html += `
    //       <div class="modal fade" id="One" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //   <div class="modal-dialog modal-dialog modal-dialog-scrollable">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title font-weight-bold" id="exampleModalLabel"></h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div class="modal-body">
            
    //         <p>asdasd</p>
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn im-btn" data-dismiss="modal">Close</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //             `;
    //     }
    //     $("#modals").html(html);
    //     moreInfo = array;
    //     fetchData("products", showProducts);
    //   }
      

    function fetchDiscount(id){
        for(let discount of discounts){
            if(discount.id === id){
                return discount.value;
            }
        }
    }
    
    function fetchBrand(id){
        for(let brand of brands){
            if(brand.id === id){
                return brand.name;
            }
        }
    }
    


    
    function filterBrands(data){
		let selectedBrands = [];
		$('.brand:checked').each(function(el){
			selectedBrands.push(parseInt($(this).val()));
		});
		if(selectedBrands.length != 0){
			return data.filter(x => selectedBrands.includes(x.brand));	
		}
		return data;
	}
   
    function filterByDiscount(data){
        let selectedDiscount = [];
        $('.discount:checked').each(function(el){
            selectedDiscount.push(parseInt($(this).val()));
        });
        if(selectedDiscount.length != 0){
            return data.filter(x => selectedDiscount.includes(x.discount));	
        }
        return data;
    }
   

    function sort(data){
		const sortType = document.getElementById('sort').value;
        
		if(sortType == 'asc'){
			return data.sort((a,b) => a.price.new > b.price.new ? 1 : -1);
		}
        if(sortType == 'desc'){
		return data.sort((a,b) => a.price.new < b.price.new ? 1 : -1);
        }
        else return data;
	}

    function searchProduct(data){
		let searchValue = $("#search").val().toLowerCase();
		if(searchValue){
			return data.filter(function(el){
				return el.name.toLowerCase().indexOf(searchValue) !== -1;
			})
		}
		return data;
	}
    
    


    function filterChange(){
		fetchData("products", showProducts);
	}

if(window.location.pathname == "/cart.html"){
var navbarBtn = document.querySelector(".navbar-toggler");

navbarBtn.addEventListener("click", function(){
    let navbar = document.querySelector(".navbar");
    navbar.style.background = "rgb(102, 81, 50)";
})
}




	
    scrollFunction()

        let moveTop = document.getElementById("movetop");
        moveTop.addEventListener("click",topFunction);
        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("movetop").style.display = "block";
            } else {
                document.getElementById("movetop").style.display = "none";
            }
        }

        function topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        
    
    function navbarBg(){
        let navbar = document.getElementById("navbar");;
        navbar.style.background = "rgb(102, 81, 50)";
    }

    $(".navbar-toggler").click(navbarBg);




    //OWL-CAROUSEL - PLUGIN


    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
                loop:true
            },
            600:{
                items:2,
                nav:false,
                loop:true
            },
            800:{
                items:3,
                nav:false,
                loop:true
            },
            1000:{
                items:4,
                nav:true,
                loop:true
            }
        }
    })



    // SCROLL NAVBAR


    if(window.location.pathname != "/cart.html"){
    function stickyscroll() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.background = "#665132";
            document.getElementById("navbar").style.zIndex = "1000";
            document.getElementById("navbar").style.transition = ".3s";
        } else {
            document.getElementById("navbar").style.background = "transparent";
        }
    }
    window.addEventListener('scroll', stickyscroll);
    }




    // CART 
    
     function setItemToLS(name,data){
            localStorage.setItem(name,JSON.stringify(data));
        }   

     function getItemFromLS(name){
            return JSON.parse(localStorage.getItem(name));
        }
    

    function addToCart(){
        let id = $(this).data("id");
        let products = getItemFromLS("cart");
        if(products){
            if(productsAlreadyInCart(products, id)){
                quantityUpdate(products, id);
            }
            else{
                addNewProduct(products, id);
                numberOfItemsInCart();
            }
        }
        else{
            addFirstProduct(id);
            numberOfItemsInCart();
        }
            alert("Your item has been added to the cart!");
    }
    function productsAlreadyInCart(products, id){
     return products.filter(x => x.id == id).length;
    }
    function addFirstProduct(id){
        let products = [];
        products[0] = {
            id: id,
            quantity: 1
        }
        setItemToLS("cart", products);
    }
    function addNewProduct(products, id){
        products.push({
            id: id,
            quantity: 1
            });
        setItemToLS("cart", products);
    }
    function quantityUpdate(products, id){
        products.forEach(x => {
            if(x.id == id){
            x.quantity++;
            }
            });
        setItemToLS("cart", products);
    
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


