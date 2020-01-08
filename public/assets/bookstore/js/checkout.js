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
									<li class="active">Checkout</li>
								</ul>
							</div>`;
	$('#breadcrumb').append(htmlBreadcrumb);
	// ==================================================================



		// =============== THÊM SECTION VÀO TRANG PRODUCTS ===============
	var htmlSectionAside = `<!-- container -->
								<div class="container">
									<!-- row -->
									<div class="row">
										<form id="checkout-form" class="clearfix">
											<div class="col-md-6">
												<div class="billing-details">
													<div class="section-title">
														<h3 class="title">Billing Details</h3>
													</div>
													<div class="form-group">
														<input class="input" type="text" name="first-name" placeholder="First Name*">
													</div>
													<div class="form-group">
														<input class="input" type="text" name="last-name" placeholder="Last Name*">
													</div>
													<div class="form-group">
														<input class="input" type="email" name="email" placeholder="Email*">
													</div>
													<div class="form-group">
														<input class="input" type="text" name="address" placeholder="Address*">
													</div>
													<div class="form-group">
														<input class="input" type="text" name="city" placeholder="City*">
													</div>
													<div class="form-group">
														<input class="input" type="text" name="country" placeholder="Country*">
													</div>
													<div class="form-group">
														<input class="input" type="text" name="zip-code" placeholder="ZIP Code">
													</div>
													<div class="form-group">
														<input class="input" type="tel" name="tel" placeholder="Telephone*">
													</div>
												</div>
											</div>

											<div class="col-md-6">
												<div class="shiping-methods">
													<div class="section-title">
														<h4 class="title">PHƯƠNG THỨC VẬN CHUYỂN</h4>
													</div>
													<div class="input-checkbox">
														<input type="radio" name="shipping" id="shipping-1" checked>
														<label for="shipping-1">Vận chuyển thường - Miễn phí</label>
														<div class="caption">
														</div>
													</div>
													<div class="input-checkbox">
														<input type="radio" name="shipping" id="shipping-2">
														<label for="shipping-2">Vận chuyển nhanh - 10.000đ</label>
														<div class="caption">
														</div>
													</div>
												</div>

												<div class="payments-methods">
													<div class="section-title">
														<h4 class="title">PHƯƠNG THỨC THANH TOÁN</h4>
													</div>
													<div class="input-checkbox">
														<input type="radio" name="payments" id="payments-1" checked>
														<label for="payments-1">Chuyển khoản ngân hàng</label>
														<div class="caption">
														</div>
													</div>
													<div class="input-checkbox">
														<input type="radio" name="payments" id="payments-2">
														<label for="payments-2">Thẻ quốc tế Visa/Master/JCB</label>
														<div class="caption">
														</div>
													</div>
													<div class="input-checkbox">
														<input type="radio" name="payments" id="payments-3">
														<label for="payments-3">Thanh toán bằng tiền mặt khi nhận hàng</label>
														<div class="caption">
														</div>
													</div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="order-summary clearfix">
													<div class="section-title">
														<h3 class="title">KIỂM TRA LẠI GIỎ HÀNG</h3>
													</div>
													<table class="shopping-cart-table table">
														<thead>
															<tr>
																<th>Hình ảnh</th>
																<th>Tên sản phẩm</th>
																<th class="text-center">Giá</th>
																<th class="text-center">Số Lượng</th>
																<th class="text-center">Thành Tiền</th>
																<th class="text-right"></th>
															</tr>
														</thead>
														<tbody>
														</tbody>
														<tfoot>
															<tr>
																<th class="empty" colspan="3"></th>
																<th>THÀNH TIỀN</th>
																<th id="sub-total" colspan="2" class="sub-total">$97.50</th>
															</tr>
															<tr>
																<th class="empty" colspan="3"></th>
																<th>PHÍ VẬN CHUYỂN</th>
																<td id="shipping-fee" colspan="2">Free Shipping</td>
															</tr>
															<tr>
																<th class="empty" colspan="3"></th>
																<th>TỔNG SỐ TIỀN</th>
																<th id="final-total" colspan="2" class="total">$97.50</th>
															</tr>
														</tfoot>
													</table>
													<div class="pull-right">
														<button class="primary-btn">THANH TOÁN</button>
													</div>
												</div>

											</div>
										</form>
									</div>
									<!-- /row -->
								</div>
								<!-- /container -->`;
	$('#section').append(htmlSectionAside);
	// ===============================================================



	// =============== CẬP NHẬT PHÍ SHIP PHÍA DƯỚI PHẦN THANH TOÁN ===============
	updateShippingPrice();

	function updateShippingPrice(){
		var shippingType = $("input[name='shipping']:checked").attr('id');
		if (shippingType === 'shipping-1'){
			$('#shipping-fee').empty();
			$('#shipping-fee').append('0đ');
		}
		if (shippingType === 'shipping-2'){
			$('#shipping-fee').empty();
			$('#shipping-fee').append('10.000đ');
			updateFinalTotal();
		}
	}
	// ===========================================================================
	


	// =============== BẮT SỰ KIỆN THAY ĐỔI RADIO BUTTON ===============
	$("input[type='radio'").on('change',function(){
		updateShippingPrice();
		updateFinalTotal();
	});
	// =================================================================



	// TẠM THỜI LOAD RANDOM 3 QUYỂN SÁCH
	// =============== LOAD SÁCH TRONG GIỎ HÀNG NGƯỜI DÙNG ===============
	var checkoutBooks = [];
	var checkoutBooksAmount = [];

	for (var i=0; i<3; i++) {
		var randomIndex = Math.floor((Math.random() * parseInt(item.length-1)));
		while (true) {
			var isExist = false;
			$.each(checkoutBooks, function(cIndex){
				if (checkoutBooks[cIndex].id === item[randomIndex].id) {
					isExist = true;
				}
			});
			if (isExist === true)
			{
				randomIndex = Math.floor((Math.random() * parseInt(item.length-1)));
			} else {
				break;
			}
		}
		
		checkoutBooks.push(item[randomIndex]);
		checkoutBooksAmount.push(1);

		var str1 = "";
		var newPrice = 0;
		if (item[randomIndex].sale === 0){
			newPrice = item[randomIndex].price;
			str1 = `<td class="price text-center"><strong>` + newPrice.toLocaleString('de-DE') + `</strong><b>đ</b><br><del class="font-weak"><small></small></del></td>`;
		} else {
			newPrice = (item[randomIndex].price * (100 - item[randomIndex].sale) / 100);
			str1 = `<td class="price text-center"><strong>` + newPrice.toLocaleString('de-DE') + `</strong><b>đ</b><br><del class="font-weak"><small>` + item[randomIndex].price.toLocaleString('de-DE') + `đ</small></del></td>`;
		}
		var htmlAddItem = `	<tr id="` + item[randomIndex].id + `">
								<td style="width: 10%" class="thumb"><img src="`+ urlToIndex + `../assets/img/books/` + item[randomIndex].url + `" alt=""></td>
								<td style="width: 50%" class="details">
									<a href="` + urlToIndex + `product-page/` + item[randomIndex].html + `">` + item[randomIndex].name + `</a>
									<ul>
										<li><span>` + item[randomIndex].description + `</span></li>
									</ul>
								</td>
								` + str1 + `
								<td id="` + item[randomIndex].id + `" class="qty text-center"><input id="` + item[randomIndex].id + `" class="input" type="number" value="1"></td>
								<td id="` + item[randomIndex].id + `" class="total text-center"><strong id="total-price" class="primary-color">` + newPrice.toLocaleString('de-DE') + `</strong><b class="primary-color">đ</b></td>
								<td id="` + item[randomIndex].id + `" class="text-right"><button id="` + item[randomIndex].id + `" class="main-btn icon-btn delete-item"><i class="fa fa-close"></i></button></td>
							</tr>`;
		$('.shopping-cart-table.table tbody').append(htmlAddItem);
	}
	// ===================================================================
	


	// =============== BẮT SỰ KIỆN THAY ĐỔI SỐ LƯỢNG CỦA MỘT SẢN PHẨM ===============
	$(":input").bind('keyup mouseup', function () {         
	    var thisID = $(this).attr('id');
	    var thisQty = $(this).val();
	    var thisBook;
	    var thisIndex;
	    $.each(checkoutBooks, function(i){
	    	if (checkoutBooks[i].id == thisID) {
	    		thisBook = checkoutBooks[i];
	    		checkoutBooksAmount[i] = thisQty;
	    	}
	    });

	    var path = '#' + thisID + ' .total .primary-color#total-price';
	    var newTotal = (thisBook.price * ((100 - thisBook.sale) / 100)) * thisQty;
	    $(path).empty();
	    $(path).append(newTotal.toLocaleString('de-DE'));

	    updateFinalTotal();
	});
	// ==============================================================================

	

	// =============== HÀM CẬP NHẬT LẠI TỔNG THÀNH TIỀN CỦA GIỎ HÀNG ===============
	function updateFinalTotal(){
		var sum = 0;
		$.each(checkoutBooks, function(i){
			sum += (checkoutBooks[i].price * (100 - checkoutBooks[i].sale) / 100) * checkoutBooksAmount[i];
		})
		var shippingType = $("input[name='shipping']:checked").attr('id');
		$('#sub-total.sub-total').empty();
		$('#sub-total.sub-total').append(sum.toLocaleString('de-DE') + 'đ');

		if (shippingType == 'shipping-2'){
			sum += 10000;
		}
		$('#final-total.total').empty();
		$('#final-total.total').append(sum.toLocaleString('de-DE') + 'đ');
	}
	updateFinalTotal();
	// =============================================================================



	// =============== XỬ LÝ SỰ KIỆN CLICK NÚT DELETE SẢN PHẨM TRONG GIỎ HÀNG ===============
	$('.main-btn.icon-btn.delete-item').on('click',function(){
		event.preventDefault();
		var thisID = $(this).attr('id');

		var path = 'tr#' + thisID;
		$(path).remove();

		var newCheckoutBooks = [];
		var newCheckoutBooksAmount = [];
		$.each(checkoutBooks, function(i){
			if (checkoutBooks[i].id !== thisID){
				newCheckoutBooks.push(checkoutBooks[i]);
				newCheckoutBooksAmount.push(checkoutBooksAmount[i]);
			}
		})
		checkoutBooks = newCheckoutBooks;
		checkoutBooksAmount = newCheckoutBooksAmount;
	})
	// ======================================================================================

});