$(function () {

	// Đường dẫn đến trang Index
	var urlToIndex = '../';

	// Các danh mục sách
	var bookCategory = {
		'Khác': 'khac.html',
		'Kinh Tế': 'kinhte.html',
		'Ngoại Ngữ': 'ngoaingu.html',
		'Thiếu Nhi': 'thieunhi.html',
		'Văn Học': 'vanhoc.html',
	}

	// Tìm quyển sách hiện tại trong book.js
	var curBook;
	$.each(item, function (i) {
		if(item[i].html === proName)
		{
			curBook = item[i];
			return false;
		}
	});

	/*=============================================================================================================================================

	1. LOAD CÁC THUỘC TÍNH CẦN THIẾT CHO TRANG

	=============================================================================================================================================*/



	// =============== THÊM VÀO .CSS CHO TRANG PRODUCT-PAGE ===============
	var htmlStyle = `
	<style>
						.product.product-details .col-md-4 {
							text-align: center;
						}
						.product.product-details .col-md-4 img{
							width: 320px;
							height: auto;
						}
						.product.product-single .product-thumb a img {
							width: 100%;
							height: 240px;
						}
						.product.product-single .product-thumb:after {
							position: static;
						}
						.product.product-single .product-body {
							padding: 8px;
						}
						.product .product-old-price {
						  	font-size: 60%;
						}
						.col-md-2.col-sm-6.col-xs-6 h3.product-price{
						  font-size: 120%;
						}
						.product.product-single h2.product-name a {
							font-size: 90%;
						}
						#section1 {
							padding-bottom: 5px;
						}
						#section2 {
							padding-top: 5px;
						}
						.product.product-widget .product-thumb>img {
							max-height: 60px;
							width: auto;
						}
						.product.product-widget .product-thumb {
							text-align: center;
						}
					</style>
					`;
	$('head').append(htmlStyle);
	// ====================================================================



	// =============== THÊM BREADCRUMB VÀO TRANG PRODUCT-PAGE ===============
	var htmlBreadcrumb = `	<div class="container">
								<ul class="breadcrumb">
									<li>
										<a href="` + urlToIndex + `index.html">Home</a>
									</li>
									<li>
										<a href="` + urlToIndex + `products/` + bookCategory[curBook.category] + `">` + curBook.category + `</a>
									</li>

									<li class="active">` + curBook.name + `</li>
								</ul>
							</div>`;
	$('#breadcrumb').append(htmlBreadcrumb);



	// =============== THÊM SÁCH CHÍNH VÀO TRANG PRODUCT-PAGE ===============
	var str1 = "", 
		str2 = "", 
		str3 = "";

	// Thêm vào tình trạng nếu có
	if (curBook.status !== "") {
		str1 += "<span>"+ curBook.status + "</span>";
	}

	// Thêm vào sale nếu có
	if (curBook.sale !== 0) {
		str1 += "<span class='sale'>-"+ curBook.sale + "%</span>";
	}


	// Nếu có giảm giá thì hiển thị giá mới và giá cũ, không giảm giá thì chỉ hiển thị giá
	var oldPrice = curBook.price.toLocaleString('de-DE');
	var newPrice = (curBook.price * (100 - curBook.sale) / 100).toLocaleString('de-DE');
	if (curBook.sale !== 0) {
		str2 += "<h3 class='product-price'>"+ newPrice + "đ <del class='product-old-price'>" + oldPrice + "đ</del></h3>";
	} else {
		str2 += "<h3 class='product-price'>"+ curBook.price + "đ</h3>";
	}

	// Chạy vòng lặp tạo sao
	var i;
	for (i = 0; i < 5; i++) {
		if (i < curBook.star) {
			str3 += "<i class='fa fa-star'></i>";
		} else {
			str3 += "<i class='fa fa-star-o empty'></i>";
		}
	}

	var htmlMainSection = `	<div class="container">
								<!-- row -->
								<div class="row">
									<!--  Product Details -->
									<div class="product product-details clearfix">
										<div class="col-md-4">
											<img src="`+urlToIndex + `../assets/img/books/` + curBook.url + `" alt="">
										</div>
										<div class="col-md-8">
											<div class="product-body">
												<div class="product-label">`
													+ str1 +
												`</div>
												<h2 class="product-name">` + curBook.name + `</h2>`
													+ str2 +
												`<div>
													<div class="product-rating">`
														+ str3 +
													`</div>
													<a>` + curBook.view + ` Lượt Xem</a>
												</div>
												<p><strong>Số Lượng:</strong> ` + curBook.stock + ` cuốn</p>
												<p><strong>Loại:</strong> ` + curBook.category + `</p>
												<p><strong>Xuất Xứ:</strong> ` + curBook.origin + `</p>
												<p><strong>Nhà Xuất Bản:</strong> ` + curBook.nxb + `</p>
												<p>`+ curBook.description + `</p>
												<hr>

												<div class="product-btns">
													<button class="primary-btn add-to-cart" id="` + curBook.id + `">
														<i class="fa fa-shopping-cart"></i> Add to Cart</button>
												</div>
											</div>
										</div>
									</div>
									<!-- /Product Details -->
								</div>
								<!-- /row -->
							</div>`;
	$('#main-section').append(htmlMainSection);
	// ======================================================================



	// =============== TÌM 6 QUYỂN SÁCH CÙNG LOẠI VỚI SÁCH HIỆN TẠI ===============
	var sameCatBooks = [];
	var sixSameCatBooks = [];
	var sixSameCatBooksIndex = [];
	$.each(item, function (i) {
		if(curBook.category === item[i].category)
		{
			sameCatBooks.push(item[i]);
		}
	});
	while (sixSameCatBooks.length < 6)
	{
		if (sixSameCatBooks.length >= sameCatBooks.length)
			break;
		var indexChoose = Math.floor((Math.random() * parseInt(sameCatBooks.length)));
		var exist = false;
		for (var i=0; i<sixSameCatBooks.length; i++)
		{
			if (sixSameCatBooksIndex[i]===indexChoose)
			{
				exist = true;
			}
		}
		if (exist === false)
		{
			sixSameCatBooksIndex.push(indexChoose);
			sixSameCatBooks.push(sameCatBooks[indexChoose]);
		}
	}
	// ============================================================================



	// =============== TÌM 6 QUYỂN SÁCH CÙNG NHÀ XUẤT BẢN VỚI SÁCH HIỆN TẠI ===============
	var sameNxbBooks = [];
	var sixSameNxbBooks = [];
	var sixSameNxbBooksIndex = [];
	$.each(item, function (i) {
		if(curBook.nxb === item[i].nxb)
		{
			sameNxbBooks.push(item[i]);
		}
	});
	while (sixSameNxbBooks.length < 6)
	{
		if (sixSameNxbBooks.length >= sameNxbBooks.length)
			break;
		var indexChoose = Math.floor((Math.random() * parseInt(sameNxbBooks.length)));
		var exist = false;
		for (var i=0; i<sixSameNxbBooks.length; i++)
		{
			if (sixSameNxbBooksIndex[i]===indexChoose)
			{
				exist = true;
			}
		}
		if (exist === false)
		{
			sixSameNxbBooksIndex.push(indexChoose);
			sixSameNxbBooks.push(sameNxbBooks[indexChoose]);
		}
	}
	// =====================================================================================



	// =============== THÊM 6 QUYỂN SÁCH VÀO SECTION1 ===============
	var htmlSixSameCatBooks = "";
	for (var i=0; i<sixSameCatBooks.length; i++)
	{
		var str1 = "", 
			str2 = "", 
			str3 = "";

		// Thêm vào tình trạng nếu có
		if (sixSameCatBooks[i].status !== "") {
			str1 += "<span>"+ sixSameCatBooks[i].status + "</span>";
		}

		// Thêm vào sale nếu có
		if (sixSameCatBooks[i].sale !== 0) {
			str1 += "<span class='sale'>-"+ sixSameCatBooks[i].sale + "%</span>";
		}


		// Nếu có giảm giá thì hiển thị giá mới và giá cũ, không giảm giá thì chỉ hiển thị giá
		var oldPrice = (sixSameCatBooks[i].price).toLocaleString('de-DE');
		var newPrice = (sixSameCatBooks[i].price * (100 - sixSameCatBooks[i].sale) / 100).toLocaleString('de-DE');
		if (sixSameCatBooks[i].sale !== 0) {
			str2 += "<h3 class='product-price'>"+ newPrice + "đ <del class='product-old-price'>" + oldPrice + "đ</del></h3>";
		} else {
			str2 += "<h3 class='product-price'>"+ oldPrice + "đ</h3>";
		}

		htmlSixSameCatBooks += `<div class="col-md-2 col-sm-6 col-xs-6">
									<div class="product product-single">
										<div class="product-thumb">
											<div class="product-label">`
												+ str1 +
											`</div>
											<a href="`+ urlToIndex + `product-page/` + sixSameCatBooks[i].html +`"><img src="`+ urlToIndex + `../assets/img/books/` + sixSameCatBooks[i].url +`" alt=""></a>
										</div>
										<div class="product-body">`
												+ str2 +
											`<h2 class="product-name">
												<a href="`+ urlToIndex + `product-page/` + sixSameCatBooks[i].html +`">` + sixSameCatBooks[i].name + `</a>
											</h2>
											<div class="product-btns">
												<button class="primary-btn add-to-cart" id="` + sixSameCatBooks[i].id + `">
													<i class="fa fa-shopping-cart"></i> Add to Cart</button>
											</div>
										</div>
									</div>
								</div>`;

	}

	var htmlSection1 = `<div class="container">
							<!-- row -->
							<div class="row">
								<!-- section title -->
								<div class="col-md-12">
									<div class="section-title">
										<h2 class="title">SẢN PHẨM CÙNG LOẠI</h2>
									</div>
								</div>
								<!-- section title -->

								<!-- Product Single -->`
									+ htmlSixSameCatBooks +
								`<!-- /Product Single -->
							</div>
							<!-- /row -->
						</div>`;
	$('#section1').append(htmlSection1);
	// ================================================================



	// =============== THÊM 6 QUYỂN SÁCH VÀO SECTION2 ===============
	var htmlSixSameNxbBooks = "";
	for (var i=0; i<sixSameNxbBooks.length; i++)
	{
		var str1 = "", 
			str2 = "", 
			str3 = "";

		// Thêm vào tình trạng nếu có
		if (sixSameNxbBooks[i].status !== "") {
			str1 += "<span>"+ sixSameNxbBooks[i].status + "</span>";
		}

		// Thêm vào sale nếu có
		if (sixSameNxbBooks[i].sale !== 0) {
			str1 += "<span class='sale'>-"+ sixSameNxbBooks[i].sale + "%</span>";
		}


		// Nếu có giảm giá thì hiển thị giá mới và giá cũ, không giảm giá thì chỉ hiển thị giá
		var oldPrice = (sixSameNxbBooks[i].price).toLocaleString('de-DE');
		var newPrice = (sixSameNxbBooks[i].price * (100 - sixSameNxbBooks[i].sale) / 100).toLocaleString('de-DE');
		if (sixSameNxbBooks[i].sale !== 0) {
			str2 += "<h3 class='product-price'>"+ newPrice + "đ <del class='product-old-price'>" + oldPrice + "đ</del></h3>";
		} else {
			str2 += "<h3 class='product-price'>"+ oldPrice + "đ</h3>";
		}

		htmlSixSameNxbBooks += `<div class="col-md-2 col-sm-6 col-xs-6">
									<div class="product product-single">
										<div class="product-thumb">
											<div class="product-label">`
												+ str1 +
											`</div>
											<a href="`+ urlToIndex + `product-page/` + sixSameNxbBooks[i].html +`"><img src="`+ urlToIndex + `../assets/img/books/` + sixSameNxbBooks[i].url +`" alt=""></a>
										</div>
										<div class="product-body">`
												+ str2 +
											`<h2 class="product-name">
												<a href="`+ urlToIndex + `product-page/` + sixSameNxbBooks[i].html +`">` + sixSameNxbBooks[i].name + `</a>
											</h2>
											<div class="product-btns">
												<button class="primary-btn add-to-cart" id="` + sixSameNxbBooks[i].id + `">
													<i class="fa fa-shopping-cart"></i> Add to Cart</button>
											</div>
										</div>
									</div>
								</div>`;

	}

	var htmlSection2 = `<div class="container">
							<!-- row -->
							<div class="row">
								<!-- section title -->
								<div class="col-md-12">
									<div class="section-title">
										<h2 class="title">SẢN PHẨM CÙNG NHÀ XUẤT BẢN</h2>
									</div>
								</div>
								<!-- section title -->

								<!-- Product Single -->`
									+ htmlSixSameNxbBooks +
								`<!-- /Product Single -->
							</div>
							<!-- /row -->
						</div>`;
	$('#section1').append(htmlSection2);
	// ================================================================



	// // =============== THÊM VÀO DROPDOWN CHO MENU DANH MỤC =================
	// var responsiveNav = $('#responsive-nav'),
 //    catToggle = $('#responsive-nav .category-nav .category-header'),
 //    catList = $('#responsive-nav .category-nav .category-list'),
 //    menuToggle = $('#responsive-nav .menu-nav .menu-header'),
 //    menuList = $('#responsive-nav .menu-nav .menu-list');

	// $('.dropdown.side-dropdown').hover(function(){
	//     $(this).toggleClass('open');},
	//     function(){
	//     $(this).removeClass('open');
	// })

	// $('.dropdown.mega-dropdown').hover(function(){
	//     $(this).toggleClass('open');},
	//     function(){
	//     $(this).removeClass('open');
	// })

	// catToggle.on('click', function() {
	//     menuList.removeClass('open');
	//     catList.toggleClass('open');
	// });

	// menuToggle.on('click', function() {
	//     catList.removeClass('open');
	//     menuList.toggleClass('open');
	// });
	// // ====================================================================



	// =============== HÀM THÊM SÁCH VÀO GIỎ HÀNG ===============
	function addToCart(book){
		var newPrice = (book.price * (100 - book.sale) / 100).toLocaleString('de-DE');
		var htmlProductWidget = `	<div class="product product-widget" id="` + book.id + `">
										<div class="product-thumb">
											<img src="`+ urlToIndex + `../assets/img/books/`+ book.url + `" alt="">
										</div>
										<div class="product-body">
											<h3 class="product-price">` + newPrice +`đ <span class="qty">x1</span></h3>
											<h2 class="product-name"><a href="` + urlToIndex + `product-page/` + book.html + `">` + book.name + `</a></h2>
										</div>
										<button class="cancel-btn" id="` + book.id + `"><i class="fa fa-trash"></i></button>
									</div>`;
		$('.shopping-cart-list').append(htmlProductWidget);
		RefreshSomeEventListener();
	} // function addToCart
	// ==========================================================



	// =============== HÀM CẬP NHẬT GIỎ HÀNG (KHI KHÁCH CHỌN THÊM SẢN PHẨM CÓ SẴN TRONG GIỎ HÀNG) ===============
	function updateCart(book, quantity){
		var path = "#"+ book.id + " .product-body .product-price .qty";
		$(path).empty();
		$(path).append("x" + quantity);
	}
	// ==========================================================================================================



	// =============== HÀM CẬP NHẬT LẠI NÚT TRÒN PHÍA TRÊN GIỎ HÀNG GHI CÓ SẢN PHẨM ĐƯỢC THÊM VÀO GIỎ HÀNG ===============
	function updateHeaderQty(){
		if (parseInt(cartBooks.length) < 1){
			$('.header-cart .dropdown-toggle .header-btns-icon .qty').remove();
			$('#total-price').empty();
			$('#total-price').append('0đ');
		} else {
			$('.header-cart .dropdown-toggle .header-btns-icon .qty').remove();
			$('.header-cart .dropdown-toggle .header-btns-icon').append(`<span class="qty">`+ cartBooks.length + `</span>`);
			$('#total-price').empty();
			var sum = 0;
			$.each(cartBooks, function(i){
				sum += (cartBooks[i].price * (100 - cartBooks[i].sale) / 100)*cartBooksAmount[i];
			});
			$('#total-price').append(sum.toLocaleString('de-DE') + 'đ');
		}
	}
	// ===================================================================================================================


	// =============== BẮT SỰ KIỆN ADD TO CART ===============
	var cartBooks = [];
	var cartBooksAmount = [];
	$('.primary-btn.add-to-cart').on('click',function(){
		var curID = $(this).attr('id');
		$.each(item,function(i){
			if (item[i].id === curID)
			{	
				if ($.inArray(item[i], cartBooks) == -1)
				{
				  cartBooks.push(item[i]);
				  cartBooksAmount.push(1);
				  addToCart(item[i]);
				} else {
					cartBooksAmount[$.inArray(item[i], cartBooks)] += 1;
					updateCart(item[i],cartBooksAmount[$.inArray(item[i],cartBooks)]);
				}
				updateHeaderQty();
				return false;
			}
		});
	});
	// =======================================================



	// =============== BẮT CỰ KIỆN XÓA SÁCH KHỎI GIỎ HÀNG ===============
	$('.product.product-widget').on('click','.cancel-btn',function(){
	    	var thisID = $(this).attr('id');
			var path = "#"+ thisID + ".product.product-widget";
			$(path).remove();

			var removeIndex;
			var newCartBooks = [];
			var newCartBooksAmount = [];
			$.each(cartBooks, function(i){
				if (cartBooks[i].id === thisID)
				{
					removeIndex = i;
				} else {
					newCartBooks.push(cartBooks[i]);
					newCartBooksAmount.push(cartBooksAmount[i]);
				}
			});
			
			cartBooks = newCartBooks;
			cartBooksAmount = newCartBooksAmount;
			updateHeaderQty();
		});
	// ==================================================================




	// =============== REFRESH MỘT SỐ EVENT BẮT SỰ KIỆN ===============
	function RefreshSomeEventListener() {
	    $('.product.product-widget').off();
	    $('.product.product-widget').on('click','.cancel-btn',function(){
	    	var thisID = $(this).attr('id');
			var path = "#"+ thisID + ".product.product-widget";
			$(path).remove();

			var removeIndex;
			var newCartBooks = [];
			var newCartBooksAmount = [];
			$.each(cartBooks, function(i){
				if (cartBooks[i].id === thisID)
				{
					removeIndex = i;
				} else {
					newCartBooks.push(cartBooks[i]);
					newCartBooksAmount.push(cartBooksAmount[i]);
				}
			});
			
			cartBooks = newCartBooks;
			cartBooksAmount = newCartBooksAmount;
			updateHeaderQty();
		});

	    $('.primary-btn.add-to-cart').off();
		$('.primary-btn.add-to-cart').on('click',function(){
			var curID = $(this).attr('id');
			$.each(item,function(i){
				if (item[i].id === curID)
				{	
					if ($.inArray(item[i], cartBooks) == -1)
					{
					  cartBooks.push(item[i]);
					  cartBooksAmount.push(1);
					  addToCart(item[i]);
					  RefreshSomeEventListener();
					} else {
						cartBooksAmount[$.inArray(item[i], cartBooks)] += 1;
						updateCart(item[i],cartBooksAmount[$.inArray(item[i],cartBooks)]);
					}
					updateHeaderQty();
					return false;
				}
			});
		});
	}
	// ================================================================
});
