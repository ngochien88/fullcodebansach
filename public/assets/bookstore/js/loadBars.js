$(function () {


	/*=============================================================================================================================================

	1. LOAD CÁC THUỘC TÍNH CẦN THIẾT CHO TRANG

	=============================================================================================================================================*/


	// =============== THÊM VÀO .CSS CHO TRANG PRODUCTS ===============
	var htmlStyle = `<style>
						.product.product-single .product-thumb a img {
							width: 100%;
							height: 360px;
						}
						.product.product-single .product-thumb:after {
							position: static;
						}
						.product.product-single .product-body {
							padding: 8px;
						}
						.col-md-4.col-sm-6.col-xs-6 {
							height: 544px;
						}
						.product.product-widget .product-thumb>img {
							max-height: 60px;
							width: auto;
						}
						.product.product-widget .product-thumb {
							text-align: center;
						}
					</style>`;
	$('head').append(htmlStyle);
	// ================================================================



	// =============== THÊM HEADER VÀO TRANG PRODUCTS =================
	var htmlHeader = `	<!-- header -->
						<div id="header">
							<div class="container">
								<div class="pull-left">
									<!-- Logo -->
									<div class="header-logo">
										<a class="logo" href="`+ urlToIndex + `index.html">
											<img src="`+ urlToIndex + `../assets/img/logo.png" alt="">
										</a>
									</div>
									<!-- /Logo -->

									<!-- Search -->
									<div class="header-search">
										<form action="` + urlToIndex + `search.html">
											<input class="input search-input" type="text" name="searchWord" placeholder="Search entire store here...">
											<button class="search-btn" type="submit"><i class="fa fa-search"></i></button>
										</form>
									</div>
									<!-- /Search -->
								</div>
								<div class="pull-right">
									<ul class="header-btns">
										<!-- Account -->
										<li class="header-account dropdown default-dropdown">
											<div class="dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="true">
												<div class="header-btns-icon">
													<i class="fa fa-user-o"></i>
												</div>
												<strong class="text-uppercase">My Account <i class="fa fa-caret-down"></i></strong>
											</div>
											<a href="` + urlToIndex + `login.html" class="text-uppercase">Login</a> / <a href="`+ urlToIndex +`register.html" class="text-uppercase">Join</a>
											<ul class="custom-menu">
												<li><a href="`+ urlToIndex + `account/info.html"><i style="width: 14px" class="fa fa-user-o"></i>THÔNG TIN</a></li>
												<li><a href="`+ urlToIndex + `checkout.html"><i style="width: 14px" class="fa fa-shopping-cart"></i>QUẢN LÝ GIỎ HÀNG</a></li>
												<li><a href="`+ urlToIndex + `checkout.html"><i style="width: 14px" class="fa fa-check"></i>THANH TOÁN</a></li>
												<li><a href="`+ urlToIndex + `account/history.html"><i style="width: 14px" class="fa fa-history"></i>LỊCH SỬ MUA HÀNG</a></li>
											</ul>
										</li>
										<!-- /Account -->

										<!-- Cart -->
										<li class="header-cart dropdown default-dropdown">
											<a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
												<div class="header-btns-icon">
													<i class="fa fa-shopping-cart"></i>
												</div>
												<strong class="text-uppercase">My Cart:</strong>
												<br>
												<span id="total-price">0đ</span>
											</a>
											<div class="custom-menu">
												<div id="shopping-cart">
													<div class="shopping-cart-list">
													</div>
													<div class="shopping-cart-btns">
														<button class="main-btn" onclick="location.href='` + urlToIndex + `checkout.html` + `'">View Cart</button>
														<button class="primary-btn" onclick="location.href='` + urlToIndex + `checkout.html` + `'">Checkout <i class="fa fa-arrow-circle-right"></i></button>
													</div>
												</div>
											</div>
										</li>
										<!-- /Cart -->

										<!-- Mobile nav toggle-->
										<li class="nav-toggle">
											<button class="nav-toggle-btn main-btn icon-btn"><i class="fa fa-bars"></i></button>
										</li>
										<!-- / Mobile nav toggle -->
									</ul>
								</div>
							</div>
							<!-- header -->
						</div>
						<!-- container -->`;
	$('header').prepend(htmlHeader);
	// ================================================================



	// =============== THÊM NAVIGATION BAR VÀO TRANG PRODUCTS ===============
	var htmlNav = `	<!-- container -->
						<div class="container">
							<div id="responsive-nav">
								<!-- category nav -->
								<div class="category-nav show-on-click">
									<span class="category-header">DANH MỤC<i class="fa fa-list"></i></span>
									<ul class="category-list">
										<li class="dropdown side-dropdown">
											<a href="` + urlToIndex + `products/thieunhi.html" class="dropdown-toggle" aria-expanded="true">THIẾU NHI</a>
										</li>
										<li class="dropdown side-dropdown">
											<a href="` + urlToIndex + `products/ngoaingu.html" class="dropdown-toggle" aria-expanded="true">NGOẠI NGỮ</a>
										</li>
										<li class="dropdown side-dropdown">
											<a href="` + urlToIndex + `products/vanhoc.html" class="dropdown-toggle" aria-expanded="true">VĂN HỌC</a>
										</li>
										<li class="dropdown side-dropdown">
											<a href="` + urlToIndex + `products/kinhte.html" class="dropdown-toggle" aria-expanded="true">KINH TẾ</a>
										</li>
										<li class="dropdown side-dropdown">
											<a href="` + urlToIndex + `products/khac.html" class="dropdown-toggle" aria-expanded="true">KHÁC</a>
										</li>
									</ul>
								</div>
								<!-- /category nav -->

								<!-- menu nav -->
								<div class="menu-nav">
									<span class="menu-header">Menu <i class="fa fa-bars"></i></span>
									<ul class="menu-list">
										<li class="dropdown mega-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">NHÀ XUẤT BẢN</a>
											<div class="custom-menu">
												<div class="row">
													<div class="col-md-3">
														<ul class="list-links">
															<li><a href="` + urlToIndex + `products/nhanam.html` + `">Nhã Nam</a></li>
															<li><a href="` + urlToIndex + `products/bachviet.html` + `">Bách Việt</a></li>
															<li><a href="` + urlToIndex + `products/kimdong.html` + `">Kim Đồng</a></li>
														</ul>
														<hr class="hidden-md hidden-lg">
													</div>
													<div class="col-md-3">
														<ul class="list-links">
															<li><a href="` + urlToIndex + `products/nxbtre.html` + `">Trẻ</a></li>
															<li><a href="#">Đinh Tị</a></li>
															<li><a href="#">Minh Long</a></li>
														</ul>
														<hr class="hidden-md hidden-lg">
													</div>
													<div class="col-md-3">
														<ul class="list-links">
															<li><a href="#">Parragon</a></li>
															<li><a href="#">Sterling</a></li>
															<li><a href="#">Usborne</a></li>
														</ul>
														<hr class="hidden-md hidden-lg">
													</div>
													<div class="col-md-3">
														<ul class="list-links">
															<li><a href="#">Quảng Văn</a></li>
															<li><a href="#">IPM</a></li>
															<li><a href="#">LimBooks</a></li>
														</ul>
														<hr class="hidden-md hidden-lg">
													</div>
												</div>
											</div>
									</ul>
								</div>
								<!-- menu nav -->
							</div>
						</div>
						<!-- /container -->`;
	$('#navigation').append(htmlNav);
	// ======================================================================



	// =============== THÊM FOOTER VÀO TRANG PRODUCTS ===============
	var htmlFooter = `	<div class="container">
							<!-- row -->
							<div class="row">
								<!-- footer widget -->
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="footer">
										<!-- footer logo -->
										<div class="footer-logo">
											<a class="logo" href="#">
												<img src="` + urlToIndex + `../assets/img/logo.png" alt="">
											</a>
										</div>
										<!-- /footer logo -->

										<p>Tòa nhà I Town, 227 Nguyễn Văn Cừ Quận 5 TP HCM</p>
									</div>
								</div>
								<!-- /footer widget -->

								<!-- footer widget -->
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="footer">
										<h3 class="footer-header">dịch vụ</h3>
										<ul class="list-links">
											<li>
												<a href="#">Điều khoản sử dụng</a>
											</li>
											<li>
												<a href="#">chính sách bảo mật</a>
											</li>
											<li>
												<a href="#">Giới thiệu BookStore</a>
											</li>
											<li>
												<a href="#">Hệ thống trung tâm - nhà sách</a>
											</li>
										</ul>
									</div>
								</div>
								<!-- /footer widget -->

								<div class="clearfix visible-sm visible-xs"></div>

								<!-- footer widget -->
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="footer">
										<h3 class="footer-header">Hỗ trợ</h3>
										<ul class="list-links">
											<li>
												<a href="#">Chính sách đổi - trả</a>
											</li>
											<li>
												<a href="#">Chính sách khách sỉ</a>
											</li>
											<li>
												<a href="#">Phương thức vận chuyển</a>
											</li>
											<li>
												<a href="#">Phương thức thanh toán</a>
											</li>
										</ul>
									</div>
								</div>
								<!-- /footer widget -->

								<!-- footer subscribe -->
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="footer">
										<h3 class="footer-header">liên hệ</h3>
										<ul class="list-links">
											<li>
												<a href="javascript:;">
													<i class="fa fa-map-marker">&nbsp;&nbsp;&nbsp;</i>227 Nguyễn Văn Cừ Quận 5 TP HCM
												</a>
											</li>
											<li>
												<a href="javascript:;">
													<i class="fa fa-envelope">&nbsp;&nbsp;</i>bookstore@gmail.com
												</a>
											</li>
											<li>
												<a href="javascript:;">
													<i class="fa fa-facebook-square">&nbsp;&nbsp;</i>facebook.com/bookstore
												</a>
											</li>
											<li>
												<a href="javascript:;">
													<i class="fa fa-phone-square">&nbsp;&nbsp;</i>19001000
												</a>
											</li>
										</ul>
									</div>
								</div>
								<!-- /footer subscribe -->
							</div>
							<!-- /row -->
							<hr>
							<!-- row -->
							<div class="row">
								<div class="col-md-8 col-md-offset-2 text-center">
									<!-- footer copyright -->
									<div class="footer-copyright">
										THE BEST ONLINE BOOK STORE FOR YOU - BOOKSTORE WITH LOVE
									</div>
									<!-- /footer copyright -->
								</div>
							</div>
							<!-- /row -->
						</div>`;
	$('#footer').append(htmlFooter);
	// ==========================================================================



	// =============== THÊM VÀO DROPDOWN CHO MENU DANH MỤC =================
	var responsiveNav = $('#responsive-nav'),
    catToggle = $('#responsive-nav .category-nav .category-header'),
    catList = $('#responsive-nav .category-nav .category-list'),
    menuToggle = $('#responsive-nav .menu-nav .menu-header'),
    menuList = $('#responsive-nav .menu-nav .menu-list');

	$('.dropdown.side-dropdown').hover(function(){
	    $(this).toggleClass('open');},
	    function(){
	    $(this).removeClass('open');
	})

	$('.dropdown.mega-dropdown').hover(function(){
	    $(this).toggleClass('open');},
	    function(){
	    $(this).removeClass('open');
	})

	catToggle.on('click', function() {
	    menuList.removeClass('open');
	    catList.toggleClass('open');
	});

	menuToggle.on('click', function() {
	    catList.removeClass('open');
	    menuList.toggleClass('open');
	});
	// ====================================================================


	$('#view-cart-btn').on('click',function(){

	})

});