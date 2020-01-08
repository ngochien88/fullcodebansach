$(function () {

	/*=============================================================================================================================================

	1. LOAD CÁC THUỘC TÍNH CẦN THIẾT CHO TRANG

	=============================================================================================================================================*/


	// =============== THÊM VÀO .CSS CHO TRANG ĐƠN HÀNG ===============
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
	// =================================================================

});