$(function () {

	/*=============================================================================================================================================

	1. LOAD CÁC THUỘC TÍNH CẦN THIẾT CHO TRANG

	=============================================================================================================================================*/


	// =============== THÊM VÀO .CSS CHO TRANG PRODUCTS ===============
	// var htmlStyle = `<style>	
	// 				</style>`;
	// $('head').append(htmlStyle);
	// ================================================================



	// =============== THÊM BREADCRUMB VÀO TRANG PRODUCTS ===============
	var htmlBreadcrumb = `	<div class="container">
								<ul class="breadcrumb">
									<li><a href="` + urlToIndex + `index.html">Home</a></li>
									<li><a >Account</a></li>
									<li class='active'>` + accMenu + `</li>
								</ul>
							</div>`;
	$('#breadcrumb').append(htmlBreadcrumb);
	// ==================================================================



		// =============== THÊM SECTION VÀO TRANG PRODUCTS ===============
	var htmlSectionAside = `<!-- container -->
								<div class="container">
									<!-- row -->
									<div class="row">
										<!-- ASIDE -->
										<div id="aside" class="col-md-3">
											<!-- aside widget -->
											<div class="aside">
												<h3 class="aside-title">TÀI KHOẢN</h3>
												<ul class="list-links">
													<li><a href="` + urlToIndex + `account/info.html">Thông tin tài khoản</a></li>
													<li><a href="` + urlToIndex + `checkout.html">Quản lý giỏ hàng</a></li>
													<li><a href="` + urlToIndex + `checkout.html">Thanh toán</a></li>
													<li><a href="` + urlToIndex + `account/history.html">Lịch sử mua hàng</a></li>
												</ul>
											</div>
											<!-- /aside widget -->
											<!-- aside widget -->
											<div class="aside">
												<img style="max-width: 100%" class="img-a" src="` + urlToIndex + `../assets/img/aside/01.jpg" alt="">
											</div>
											<div class="aside">
												<img style="max-width: 100%" class="img-a" src="` + urlToIndex + `../assets/img/aside/02.jpg" alt="">
											</div>
										</div>
										<!-- /ASIDE -->

										<!-- MAIN -->
									</div>
									<!-- /row -->
								</div>
								<!-- /container -->`;
	$('#section').append(htmlSectionAside);
	// ===============================================================
});