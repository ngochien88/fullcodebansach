$(function () {

	/*=============================================================================================================================================

	1. LOAD CÁC THUỘC TÍNH CẦN THIẾT CHO TRANG

	=============================================================================================================================================*/


	// =============== THÊM VÀO .CSS CHO TRANG PRODUCTS ===============
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



	// =============== THÊM SECTION VÀO TRANG PRODUCTS ===============
	var htmlSectionMain = `	<!-- MAIN -->
						<div id="main" class="col-md-9">
							<form id="checkout-form" class="clearfix">
								<div class="col-md-6">
									<div class="billing-details">
										<div class="section-title">
											<h3 class="title">THÔNG TIN TÀI KHOẢN</h3>
										</div>
										<div class="form-group">
											<input class="input" type="text" name="first-name" placeholder="Tên*">
										</div>
										<div class="form-group">
											<input class="input" type="text" name="last-name" placeholder="Họ*">
										</div>
										<div class="form-group">
											<input class="input" type="email" name="email" placeholder="Email">
										</div>
										<div class="form-group">
											<input style="width: 32%" class="input" type="text" name="day" placeholder="dd">
											<input style="width: 32%" class="input" type="text" name="month" placeholder="MM">
											<input style="width: 34%" class="input" type="text" name="year" placeholder="yyyy">
										</div>
										<div class="form-group">
											<select id="select-gender" name="cars">
											  <option value="male">Nam</option>
											  <option value="female">Nữ</option>
											</select>
										</div>
										<div style="text-align: right">
											<button id="save-info-btn" class="primary-btn">SAVE</button>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="billing-details">
										<div class="section-title">
											<h3 class="title">ĐỔI MẬT KHẨU</h3>
										</div>
										<div class="form-group">
											<input class="input" type="password" name="curent-password" placeholder="Nhập mật khẩu hiện tại">
										</div>
										<div class="form-group">
											<input class="input" type="password" name="new-password" placeholder="Nhập mật khẩu mới">
										</div>
										<div class="form-group">
											<input class="input" type="password" name="new-password2" placeholder="Nhập lại mật khẩu mới">
										</div>
										<div style="text-align: right">
											<button id="save-password-btn" class="primary-btn">SAVE</button>
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="section-title"></div>
									<div style="color: red; text-align: right">(*): bắt buộc</div>
								</div>
							</form>
						</div>
						<!-- /MAIN -->`;
	$('#section .container .row').append(htmlSectionMain);
	// ===============================================================





});