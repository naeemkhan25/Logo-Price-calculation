(function ($) {

    let lpc_local = sessionStorage;

        // $(document).on('change','[name="quantity"]', function(e) {
        //     var $thisbuttons = $(this),
        //     $form = $thisbuttons.closest('form.cart'),
        //     product_qty = $form.find('input[name=quantity]').val() || 1;
        //     products__price  = $('.lpc_product_price').val() || 0;
        //     var logo_price1 = lpc_local.getItem('lpc_logo_price1');
        //     var logo_price2 = lpc_local.getItem('lpc_logo_price2');
        //     lpc_local.setItem('lpc_product_quontity',product_qty);
        //     lpc_price_calculation(product_qty,products__price,logo_price1,logo_price2);
        // });
        $(document).on('change','[name="quantity"]', function(e) {
            var $thisbuttons = $(this),
            $form = $thisbuttons.closest('form.cart'),
            product_qty = $form.find('input[name=quantity]').val() || 1;
            products__price  = $('.lpc_product_price').val() || 0;
            var logo_price1 = lpc_local.getItem('lpc_logo_price1');
            var logo_price2 = lpc_local.getItem('lpc_logo_price2');
            lpc_local.setItem('lpc_product_quontity',product_qty);
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');
            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // lpc_price_calculation(product_qty,products__price,logo_price1,logo_price2);
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
        });
    
       
    $(document).on('click','.lpc_calculate_price_button', function(e) {
        e.preventDefault();
        let self = $(this).parent();
        self.find('.lpc_select_option').css("display",'none');
        self.find('.lpc_select_option').css("display",'block');
        self.find('.lpc_logo_main_select').val('none');
        self.find('.lpc_logo_main_select2').val('none');
        var $thisbuttons = $(this),
        $form = $thisbuttons.closest('form.cart'),
        id = $thisbuttons.val(),
        product_qty = $form.find('input[name=quantity]').val() || 1,
        product_id = $form.find('input[name=product_id]').val() || id,
        variation_id = $form.find('input[name=variation_id]').val() || 0;
        products__price  = $('.lpc_product_price').val() || 0;
        // var pproduct_qtys = lpc_local.getItem('lpc_product_quontity') || 1;
        var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;

        var logo_price1 = lpc_local.removeItem('lpc_logo_price1');
        var logo_price2 = lpc_local.removeItem('lpc_logo_price2');
        
        lpc_price_calculation( pproduct_qtys, products__price, logo_price1 = 0,logo_price2 = 0 );
    });

    $(document).ready(function(){
        var extra_rand_vals = document.querySelectorAll(
            ".tm-extra-product-options-field"
          );
          extra_rand_vals.forEach((e)=>{
            console.log(e);
          })
         
    });

    $(document).on('click','[name="tmcp_checkbox_0_0"]',function(){
       var parents = $(this).parents('.tmcp-field-wrap').attr('class');
       var parents_splite = parents.split(' ');
        var arr_length = parents_splite.length;
        if ( arr_length == 1 ) {
           var check_box_parent = $(this).parents('.tc-section-inner-wrap');
           var all_inputs = $(check_box_parent).find('input');
           var input_value = all_inputs[1];
           var quantity_value1 = $(input_value).val();
           lpc_local.setItem('tc_select_size_xs',quantity_value1);
           var quantity_value2 = lpc_local.getItem('tc_select_size_s');
           var quantity_value3 = lpc_local.getItem('tc_select_size_m');
           var quantity_value4 = lpc_local.getItem('tc_select_size_l');
           var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
           var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
           var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        //    var product_qty = lpc_local.getItem('lpc_product_quontity');
             var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
           quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
           $(input_value).on('change',function(){
                var thisValue = $(this).val();
                lpc_local.setItem('tc_select_size_xs',thisValue);
                var quantity_value2 = lpc_local.getItem('tc_select_size_s');
                var quantity_value3 = lpc_local.getItem('tc_select_size_m');
                var quantity_value4 = lpc_local.getItem('tc_select_size_l');
                var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
                var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
                var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
                // var product_qty = lpc_local.getItem('lpc_product_quontity');
                var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                quantity_calculation(product_qty,thisValue,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
           })
        } else {
            lpc_local.removeItem('tc_select_size_xs');
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');
            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,0,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
        }
    });

    $(document).on('click','[name="tmcp_checkbox_2_0"]',function(){
        var parents = $(this).parents('.tmcp-field-wrap').attr('class');
        var parents_splite = parents.split(' ');
         var arr_length = parents_splite.length;
         if ( arr_length == 1 ) {
            var check_box_parent = $(this).parents('.tc-section-inner-wrap');
            var all_inputs = $(check_box_parent).find('input');
            var input_value = all_inputs[1];
            var quantity_value2 = $(input_value).val();
            
            lpc_local.setItem('tc_select_size_s',quantity_value2);
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');
            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            $(input_value).on('change',function(){
                 var thisValue = $(this).val();
                 lpc_local.setItem('tc_select_size_s',thisValue);
                 var quantity_value2 = lpc_local.getItem('tc_select_size_xs');
                 var quantity_value3 = lpc_local.getItem('tc_select_size_m');
                 var quantity_value4 = lpc_local.getItem('tc_select_size_l');
                 var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
                 var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
                 var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
                //  var product_qty = lpc_local.getItem('lpc_product_quontity');
                 var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                 quantity_calculation(product_qty,quantity_value2,thisValue,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            })
         } else {
             lpc_local.removeItem('tc_select_size_s');
             var quantity_value2 = lpc_local.getItem('tc_select_size_xs');
             var quantity_value3 = lpc_local.getItem('tc_select_size_m');
             var quantity_value4 = lpc_local.getItem('tc_select_size_l');
             var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
             var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
             var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            //  var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
             quantity_calculation(product_qty,quantity_value2,0,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
         }
     });



     $(document).on('click','[name="tmcp_checkbox_4_0"]',function(){
        var parents = $(this).parents('.tmcp-field-wrap').attr('class');
        var parents_splite = parents.split(' ');
         var arr_length = parents_splite.length;
         if ( arr_length == 1 ) {
            var check_box_parent = $(this).parents('.tc-section-inner-wrap');
            var all_inputs = $(check_box_parent).find('input');
            var input_value = all_inputs[1];
            var quantity_value3 = $(input_value).val();
            lpc_local.setItem('tc_select_size_m',quantity_value3);
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');
            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            $(input_value).on('change',function(){
                 var thisValue = $(this).val();
                 lpc_local.setItem('tc_select_size_m',thisValue);
                 var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
                 var quantity_value2 = lpc_local.getItem('tc_select_size_s');
                 var quantity_value4 = lpc_local.getItem('tc_select_size_l');
                 var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
                 var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
                 var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
                //  var product_qty = lpc_local.getItem('lpc_product_quontity');
                 var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                 quantity_calculation(product_qty,quantity_value1,quantity_value2,thisValue,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
                
            })
         } else {
             lpc_local.removeItem('tc_select_size_m');
             var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
             var quantity_value2 = lpc_local.getItem('tc_select_size_s');
             var quantity_value4 = lpc_local.getItem('tc_select_size_l');
             var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
             var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
             var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            //  var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
             quantity_calculation(product_qty,quantity_value1,quantity_value2,0,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
         }
     });


     $(document).on('click','[name="tmcp_checkbox_6_0"]',function(){
        var parents = $(this).parents('.tmcp-field-wrap').attr('class');
        var parents_splite = parents.split(' ');
         var arr_length = parents_splite.length;
         if ( arr_length == 1 ) {
            var check_box_parent = $(this).parents('.tc-section-inner-wrap');
            var all_inputs = $(check_box_parent).find('input');
            var input_value = all_inputs[1];
            var quantity_value4 = $(input_value).val();
            lpc_local.setItem('tc_select_size_l',quantity_value4);
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');

            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            $(input_value).on('change',function(){
                 var thisValue = $(this).val();
                 lpc_local.setItem('tc_select_size_l',thisValue);
                 var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
                 var quantity_value2 = lpc_local.getItem('tc_select_size_s');
                 var quantity_value3 = lpc_local.getItem('tc_select_size_m');
                 var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
                 var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
                 var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
                //  var product_qty = lpc_local.getItem('lpc_product_quontity');
                var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                 quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,thisValue,quantity_value5,quantity_value6,quantity_value7);
            })
         } else {
             lpc_local.removeItem('tc_select_size_l');
             var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
             var quantity_value2 = lpc_local.getItem('tc_select_size_s');
             var quantity_value3 = lpc_local.getItem('tc_select_size_m');
             var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
             var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
             var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            //  var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
             quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,0,quantity_value5,quantity_value6,quantity_value7);
         }
     });

     $(document).on('click','[name="tmcp_checkbox_8_0"]',function(){
        var parents = $(this).parents('.tmcp-field-wrap').attr('class');
        var parents_splite = parents.split(' ');
         var arr_length = parents_splite.length;
         if ( arr_length == 1 ) {
            var check_box_parent = $(this).parents('.tc-section-inner-wrap');
            var all_inputs = $(check_box_parent).find('input');
            var input_value = all_inputs[1];
            var quantity_value5 = $(input_value).val();
            lpc_local.setItem('tc_select_size_xl',quantity_value5);
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');

            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            $(input_value).on('change',function(){
                 var thisValue = $(this).val();
                 lpc_local.setItem('tc_select_size_xl',thisValue);
                 var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
                 var quantity_value2 = lpc_local.getItem('tc_select_size_s');
                 var quantity_value3 = lpc_local.getItem('tc_select_size_m');
                 var quantity_value4 = lpc_local.getItem('tc_select_size_l');
              
                 var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
                 var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
                //  var product_qty = lpc_local.getItem('lpc_product_quontity');
                 var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                 quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,thisValue,quantity_value6,quantity_value7);
            })
         } else {
             lpc_local.removeItem('tc_select_size_xl');
             var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
             var quantity_value2 = lpc_local.getItem('tc_select_size_s');
             var quantity_value3 = lpc_local.getItem('tc_select_size_m');
             var quantity_value4 = lpc_local.getItem('tc_select_size_l');

             var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
             var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            //  var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
             quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,0,quantity_value6,quantity_value7);
         }
     });

     $(document).on('click','[name="tmcp_checkbox_10_0"]',function(){
        var parents = $(this).parents('.tmcp-field-wrap').attr('class');
        var parents_splite = parents.split(' ');
         var arr_length = parents_splite.length;
         if ( arr_length == 1 ) {
            var check_box_parent = $(this).parents('.tc-section-inner-wrap');
            var all_inputs = $(check_box_parent).find('input');
            var input_value = all_inputs[1];
            var quantity_value6 = $(input_value).val();
            lpc_local.setItem('tc_select_size_xxl',quantity_value6);
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');
            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            $(input_value).on('change',function(){
                 var thisValue = $(this).val();
                 lpc_local.setItem('tc_select_size_xxl',thisValue);
                 var quantity_value2 = lpc_local.getItem('tc_select_size_s');
                 var quantity_value3 = lpc_local.getItem('tc_select_size_m');
                 var quantity_value4 = lpc_local.getItem('tc_select_size_l');
                 var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
                 var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
                 var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
                //  var product_qty = lpc_local.getItem('lpc_product_quontity');
                 var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                 quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,thisValue,quantity_value7);
                
            })
         } else {
             lpc_local.removeItem('tc_select_size_xxl');
             var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
             var quantity_value2 = lpc_local.getItem('tc_select_size_s');
             var quantity_value3 = lpc_local.getItem('tc_select_size_m');
             var quantity_value4 = lpc_local.getItem('tc_select_size_l');
             var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
             var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
            //  var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
             quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,0,quantity_value7);
         }
     });

     $(document).on('click','[name="tmcp_checkbox_12_0"]',function(){
        var parents = $(this).parents('.tmcp-field-wrap').attr('class');
        var parents_splite = parents.split(' ');
         var arr_length = parents_splite.length;
         if ( arr_length == 1 ) {
            var check_box_parent = $(this).parents('.tc-section-inner-wrap');
            var all_inputs = $(check_box_parent).find('input');
            var input_value = all_inputs[1];
            var quantity_value7 = $(input_value).val();
            lpc_local.setItem('tc_select_size_3xl',quantity_value7);
            var quantity_value2 = lpc_local.getItem('tc_select_size_s');
            var quantity_value3 = lpc_local.getItem('tc_select_size_m');
            var quantity_value4 = lpc_local.getItem('tc_select_size_l');
            var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
            var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
            var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            // var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
            $(input_value).on('change',function(){
                 var thisValue = $(this).val();
                 lpc_local.setItem('tc_select_size_3xl',thisValue);
                 var quantity_value2 = lpc_local.getItem('tc_select_size_s');
                 var quantity_value3 = lpc_local.getItem('tc_select_size_m');
                 var quantity_value4 = lpc_local.getItem('tc_select_size_l');
                 var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
                 var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
                 var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
                //  var product_qty = lpc_local.getItem('lpc_product_quontity');
                var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
                 quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,thisValue);
                
            });
         } else {
             lpc_local.removeItem('tc_select_size_3xl');
             var quantity_value2 = lpc_local.getItem('tc_select_size_s');
             var quantity_value3 = lpc_local.getItem('tc_select_size_m');
             var quantity_value4 = lpc_local.getItem('tc_select_size_l');
             var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
             var quantity_value6 = lpc_local.getItem('tc_select_size_xxl');
             var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
            //  var product_qty = lpc_local.getItem('lpc_product_quontity');
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
             quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,0);
         }
     });
    function quantity_calculation(product_qty,quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7 ) {
       if (product_qty == null ) {
            product_qty = 0;
       }
        if (quantity_value1 == null ) {
            quantity_value1 = 0;
        }
        if (quantity_value2 == null ) {
            quantity_value2 = 0;
        }
        if (quantity_value3 == null ) {
            quantity_value3 = 0;
        }
        if (quantity_value4 == null ) {
            quantity_value4 = 0;
        }
        if (quantity_value5 == null ) {
            quantity_value5 = 0;
        }
        if (quantity_value6 == null ) {
            quantity_value6 = 0;
        }
        if (quantity_value7 == null ) {
            quantity_value7 = 0;
        }
        var quontity_total = parseInt(product_qty) + parseInt(quantity_value1) + parseInt(quantity_value2) + parseInt(quantity_value3) + parseInt(quantity_value4) + parseInt(quantity_value5) + parseInt(quantity_value6) + parseInt(quantity_value7);
        var logo_price1 = lpc_local.getItem('lpc_logo_price2');
        lpc_local.setItem('lpc_total_quontity',quontity_total);
        var logo_price2 = lpc_local.getItem('lpc_logo_price1');
        var products__price  = $('.lpc_product_price').val() || 0;
        lpc_price_calculation(quontity_total,products__price,logo_price1,logo_price2);
    }

    $(document).on('change','.lpc_logo_main_select', function(e) {
        var select_value = this.value;
        if ( select_value == 'none' ) {
            select_value = 'lpc_logo1_parents-none';
        }
        var replace_value = select_value.split('-');
        var value_of_first = replace_value[0];
        var $this = $(this);
        var parents_info = $this.parents().closest('.lpc_select_option');
        var select_values = parents_info.find('select');
        select_values.each((index,element)=>{
           var classAttr = $(element).parent().attr('class');
           var replace_valuew = classAttr.split('-');
           var value_of_firstw = replace_valuew[0];
            if (value_of_first == value_of_firstw ) {
                if ( replace_value[1] == 'none' ) {
                    $(element).parent().css('display','none');
                    lpc_local.removeItem('lpc_logo_price1');
                    var elementParents   = $(element).parents().find('form.cart');
                    // var product_qty = $(elementParents).find('input[name=quantity]').val();
                    var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                    var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
                    var products__price  = $('.lpc_product_price').val() || 0;
                    lpc_price_calculation(pproduct_qtys,products__price,0,Snd_local_storage );
                    //call
                } else {
                    if ( classAttr == select_value) {
                        var logo_price_1 = $(element).val();
                        //call
                        lpc_local.setItem('lpc_logo_price1',logo_price_1);
                        var elementParents   = $(element).parents().find('form.cart');
                        // var product_qty = $(elementParents).find('input[name=quantity]').val();
                        var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                        var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
                        var products__price  = $('.lpc_product_price').val() || 0;
                        lpc_price_calculation(pproduct_qtys,products__price,logo_price_1,Snd_local_storage );
                        $(element).on('change',function() {
                            var current_value = this.value;
                            //call
                            lpc_local.setItem('lpc_logo_price1',current_value);
                            var elementParents   = $(element).parents().find('form.cart');
                            // var product_qty = $(elementParents).find('input[name=quantity]').val();
                            var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                            var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
                            var products__price  = $('.lpc_product_price').val() || 0;
                            lpc_price_calculation(pproduct_qtys,products__price,current_value,Snd_local_storage );
                        });
                        $(element).parent().css('display','block');
    
                    } else {
                        $(element).parent().css('display','none');
                    }
                }
            } 
        })
    });

    $(document).on('change','.lpc_logo_main_select2', function(e) {
        var select_value = this.value;
        if ( select_value == 'none' ) {
            select_value = 'lpc_logo2_parents-none';
        }
        var replace_value = select_value.split('-');
        var value_of_first = replace_value[0];
        var $this = $(this);
        var parents_info = $this.parents().closest('.lpc_select_option');
        var select_values = parents_info.find('select');
        select_values.each((index,element)=>{
           var classAttr = $(element).parent().attr('class');
           var replace_valuew = classAttr.split('-');
           var value_of_firstw = replace_valuew[0];
            if (value_of_first == value_of_firstw ) {
                if ( replace_value[1] == 'none' ) {
                    $(element).parent().css('display','none');
                    lpc_local.removeItem('lpc_logo_price2');
                    var elementParents   = $(element).parents().find('form.cart');
                    // var product_qty = $(elementParents).find('input[name=quantity]').val();
                    var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                    var first_local_storage = lpc_local.getItem('lpc_logo_price1');
                    var products__price  = $('.lpc_product_price').val() || 0;
                    lpc_price_calculation(pproduct_qtys,products__price,first_local_storage,0 );
                    //call
                } else {
                    if ( classAttr == select_value) {
                        var logo_price_1 = $(element).val();
                        var elementParents   = $(element).parents().find('form.cart');
                        // var product_qty = $(elementParents).find('input[name=quantity]').val();
                        var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                        //call
                        lpc_local.setItem('lpc_logo_price2',logo_price_1);
                        var first_local_storage = lpc_local.getItem('lpc_logo_price1');
                        var products__price  = $('.lpc_product_price').val() || 0;
                        lpc_price_calculation(pproduct_qtys,products__price,first_local_storage,logo_price_1 );
                        $(element).on('change',function() {
                            var current_value = this.value;
                            var elementParents   = $(element).parents().find('form.cart');
                            // var product_qty = $(elementParents).find('input[name=quantity]').val();
                            //call
                            var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                            lpc_local.setItem('lpc_logo_price2',current_value);
                            var first_local_storage = lpc_local.getItem('lpc_logo_price1');
                            var products__price  = $('.lpc_product_price').val() || 0;
                            lpc_price_calculation(pproduct_qtys,products__price,first_local_storage,current_value );
                        });
                        $(element).parent().css('display','block');
    
                    } else {
                        $(element).parent().css('display','none');
                    }
                }
            } 
        })
    });
     
    function lpc_price_calculation(product_qty, products__price, logo_price1,logo_price2) {
        if ( logo_price1 == null ) {
            var logo_price1 = 0;
        }
        if ( logo_price2 == null ) {
            logo_price2 = 0;
        }
        var logo_price = (parseFloat(logo_price1) + parseFloat(logo_price2)) * product_qty ;

        var total_price = product_qty * products__price + logo_price;
        var log_price = parseFloat(logo_price1) + parseFloat(logo_price2);
        update_table(product_qty,logo_price,total_price,log_price);
    }
    

    function update_table(quantity,logo_price,total_price,log_price) {
        $(".lpc_total_quantity").html( quantity);
        $(".lpc_logo_printing").html('€' + logo_price );
        $(".lpc_inTotal").html('€' + total_price);
        $('.lpc_total_logo_price').val(log_price);

    }

    $(document).on('click', '.single_add_to_cart_button', function (e) {
        e.preventDefault();
        var self = $(this).parents();

        var variation_from  = self.closest('form.variations_form');
        var all_sect_option = variation_from.find('select');
        var variation_key   = [];
        var variation_value = [];
        var i = 0;
        all_sect_option.each((index,element) => {
           var attr_name = $(element).attr('name');
            var divide_string = attr_name.split('_');
            if (divide_string[0] == 'attribute') {
               var value = $(element).find(":selected").val();
               var attr_name = $(element).attr('name');
               variation_key[i]= attr_name;
               variation_value[i]= value;
               i++;
            }
        });

        if (variation_key.length > 0 ) {
            var variation_filter = variation_value.filter(function (el) {
                return el != null && el != "";
              });
            if (variation_key.length != variation_filter.length ) {
               return;
            }
        }
        var $thisbutton = $(this),
                $form = $thisbutton.closest('form.cart'),
                id = $thisbutton.val(),
                product_id = $form.find('input[name=product_id]').val() || id,
                variation_id = $form.find('input[name=variation_id]').val() || 0,
                lpc_total_logo_price1  = $form.find('input[name=lpc_total_logo_price]').val() || 0;
                var lpc_total_logo_price2  = self.find('input[name=lpc_total_logo_price]').val() || 0;
                var lpc_total_logo_price = 0;
                var select_option_value = {};
                if ( variation_id > 0 ) {
                    product_id = variation_id;
                    lpc_total_logo_price = lpc_total_logo_price1;
                    for (let index = 0; index < variation_key.length; ++index) {
                        select_option_value[variation_key[index]] = variation_value[index];
                    }
                } else {
                    lpc_total_logo_price = lpc_total_logo_price2
                }
                var option_value = JSON.stringify(select_option_value);
                var product_qty = lpc_local.getItem('lpc_total_quontity') || 1;
                
                var lpc_product_price  = self.find('.lpc_product_price').val() || 0;
                var data = {
                    action: 'lpc_woocommerce_ajax_add_to_cart',
                    product_id: product_id,
                    product_sku: '',
                    quantity: product_qty,
                    lpc_product_price:lpc_product_price,
                    lpc_total_logo_price:lpc_total_logo_price,
                    variation_values:option_value
                };
             
        $(document.body).trigger('adding_to_cart', [$thisbutton, data]);
        $.ajax({
            type: 'post',
            url: wc_add_to_cart_params.ajax_url,
            data: data,
            beforeSend: function (response) {
                $thisbutton.removeClass('added').addClass('loading');
            },
            complete: function (response) {
                $thisbutton.addClass('added').removeClass('loading');
                lpc_local.removeItem('lpc_logo_price2')
                lpc_local.removeItem('lpc_logo_price1')
                self.find('.lpc_select_option').css('display','none');
            },
            success: function (response) {

                lpc_local.removeItem('lpc_logo_price2')
                lpc_local.removeItem('lpc_logo_price1')
                self.find('.lpc_select_option').css('display','none');
                if (response.error && response.product_url) {
                    window.location = response.product_url;
                    return;
                } else {
                    $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);
                }
            },
        });

        return false;
    });
})(jQuery);
window.sessionStorage.removeItem('lpc_logo_price2');
window.sessionStorage.removeItem('lpc_logo_price1');
window.sessionStorage.removeItem('tc_select_size_s');
window.sessionStorage.removeItem('tc_select_size_xs');
window.sessionStorage.removeItem('tc_select_size_m');
window.sessionStorage.removeItem('tc_select_size_l');
window.sessionStorage.removeItem('tc_select_size_xl');
window.sessionStorage.removeItem('tc_select_size_xxl');
window.sessionStorage.removeItem('tc_select_size_3xl');
window.sessionStorage.removeItem('lpc_total_quontity');
window.sessionStorage.removeItem('lpc_product_quontity');


