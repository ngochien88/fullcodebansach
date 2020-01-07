$(function () {

	/*=============================================================================================================================================

	1. LOAD CÁC THUỘC TÍNH CẦN THIẾT CHO TRANG

	=============================================================================================================================================*/


	// =============== THÊM VÀO .CSS CHO TRANG HISTORY ===============
	var htmlStyle = `<style>	
						#select-gender {
						  width: 100%;
						  height: 40px;
						  padding: 0px 15px;
						  border: none;
						  background-color: transparent;
						  -webkit-box-shadow: 0px 0px 0px 1px #DADADA inset, 0px 0px 0px 5px transparent;
						  box-shadow: 0px 0px 0px 1px #DADADA inset, 0px 0px 0px 5px transparent;
						  -webkit-transition: 0.3s all;
						  transition: 0.3s all;
						};
						#select-gender:focus {
						  -webkit-box-shadow: 0px 0px 0px 1px #F8694A inset, 0px 0px 0px 0px #F8694A;
						  box-shadow: 0px 0px 0px 1px #F8694A inset, 0px 0px 0px 0px #F8694A;
						}
					</style>`;
	$('head').append(htmlStyle);
	// ================================================================



	// =============== THÊM TABLE VÀO TRANG HISTORY ===============
	var htmlSectionMain = `	<!-- MAIN -->
						<div id="main" class="col-md-9">
							<form id="checkout-form" class="clearfix">
								<div class="col-md-12">
									<div class="order-summary clearfix">
										<div class="section-title">
											<h3 class="title">ĐƠN HÀNG CỦA TÔI</h3>
										</div>
										<table class="shopping-cart-table table"  style="font-size: 85%">
											<thead>
												<tr>
													<th>Mã đơn hàng</th>
													<th>Ngày mua</th>
													<th>Sản phẩm</th>
													<th>Tổng tiền</th>
													<th class="text-right">Trạng thái đơn hàng</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>

								</div>
							</form>
						</div>
						<!-- /MAIN -->`;
	$('#section .container .row').append(htmlSectionMain);
	// =============================================================



	// =============== THÊM 2 SẢN PHẨM VÀO TABLE ===============
	var htmlMH001 = `	<tr>
							<td><a href="mh001.html" style="color: #F8694A">MH001</td>
							<td>25/04/2018</td>
							<td>Không Gia Đình (Ấn Bản Kỉ Niệm 60 Năm Thành Lập NXB Kim Đồng)</td>
							<td>74.800đ</td>
							<td class="text-right">Giao hàng thành công</td>
						</tr>`;
	var htmlMH002 = `	<tr>
							<td><a href="mh002.html" style="color: #F8694A">MH002</td>
							<td>26/04/2018</td>
							<td>Truyện Kể Về Danh Nhân Thế Giới... và 02 sản phẩm khác</td>
							<td>77.700đ</td>
							<td class="text-right">Giao hàng thành công</td>
						</tr>`;
	$('.shopping-cart-table.table tbody').append(htmlMH001);
	$('.shopping-cart-table.table tbody').append(htmlMH002);
	// =========================================================

});