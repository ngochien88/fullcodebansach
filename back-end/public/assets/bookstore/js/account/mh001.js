$(function () {

		// =============== THÊM THÔNG TIN SẢN PHẨM VÀO TRANG ĐƠN HÀNG ===============
	var htmlSectionMain = `	<!-- MAIN -->
						<div id="main" class="col-md-9">
							<form id="checkout-form" class="clearfix">
								<div class="col-md-6">
									<div class="shiping-methods">
										<div class="section-title">
											<h4 class="title">ĐỊA CHỈ NGƯỜI NHẬN</h4>
										</div>
										<div>227 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh.</div>
									</div>
									<div class="shiping-methods">
										<div class="section-title">
											<h4 class="title">TÌNH TRẠNG ĐƠN HÀNG</h4>
										</div>
										<div>Giao hàng thành công.</div>
									</div>
								</div>

								<div class="col-md-6">
									<div class="shiping-methods">
										<div class="section-title">
											<h4 class="title">PHƯƠNG THỨC VẬN CHUYỂN</h4>
										</div>
										<div>Vận chuyển thường - Miễn phí</div>
									</div>

									<div class="payments-methods">
										<div class="section-title">
											<h4 class="title">PHƯƠNG THỨC THANH TOÁN</h4>
										</div>
										<div>Thanh toán bằng tiền mặt khi nhận hàng</div>
									</div>
								</div>
								
								<br>

								<div class="col-md-12">
									<div class="order-summary clearfix">
										<div class="section-title">
											<h4 class="title">DANH SÁCH SẢN PHẨM</h4>
										</div>
										<table class="shopping-cart-table table">
											<thead>
												<tr>
													<th>Hình ảnh</th>
													<th>Tên sản phẩm</th>
													<th class="text-center">Giá</th>
													<th class="text-center">Số Lượng</th>
													<th class="text-center">Thành Tiền</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
											<tfoot>
												<tr>
													<th class="empty" colspan="2"></th>
													<th colspan="2">THÀNH TIỀN</th>
													<th id="sub-total" colspan="1" class="sub-total">0đ</th>
												</tr>
												<tr>
													<th class="empty" colspan="2"></th>
													<th colspan="2">PHÍ VẬN CHUYỂN</th>
													<td id="shipping-fee" colspan="1">Free Shipping</td>
												</tr>
												<tr>
													<th class="empty" colspan="2"></th>
													<th colspan="2">TỔNG SỐ TIỀN</th>
													<th id="final-total" colspan="1" class="total">0đ</th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</form>
						</div>
						<!-- /MAIN -->`;
	$('#section .container .row').append(htmlSectionMain);
	// ==========================================================================



	// =============== LOAD SÁCH TRONG GIỎ HÀNG NGƯỜI DÙNG ===============
	var checkoutBooks = [];
	var checkoutBooksAmount = [];

	for (var i=0; i<1; i++) {
		var randomIndex;
		$.each(item, function(cIndex){
			if (item[cIndex].id === "01") {
				randomIndex = cIndex;
				checkoutBooks.push(item[cIndex]);
				checkoutBooksAmount.push(1);
			}
		});


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
								</td>
								` + str1 + `
								<td id="` + item[randomIndex].id + `" class="qty text-center"><a value="1">1</td>
								<td id="` + item[randomIndex].id + `" class="total text-center"><strong id="total-price" class="primary-color">` + newPrice.toLocaleString('de-DE') + `</strong><b class="primary-color">đ</b></td>
							
							</tr>`;
		$('.shopping-cart-table.table tbody').append(htmlAddItem);
	}
	// ===================================================================




	// =============== HÀM CẬP NHẬT LẠI TỔNG THÀNH TIỀN CỦA GIỎ HÀNG ===============
	function updateFinalTotal(){
		var sum = 0;
		$.each(checkoutBooks, function(i){
			sum += (checkoutBooks[i].price * (100 - checkoutBooks[i].sale) / 100) * checkoutBooksAmount[i];
		})
		$('#sub-total.sub-total').empty();
		$('#sub-total.sub-total').append(sum.toLocaleString('de-DE') + 'đ');

		$('#final-total.total').empty();
		$('#final-total.total').append(sum.toLocaleString('de-DE') + 'đ');
	}
	updateFinalTotal();

});