(function ($) {

    let lpc_local = sessionStorage;

        $(document).on('change','[name="quantity"]', function(e) {
            var $thisbuttons = $(this),
            $form = $thisbuttons.closest('form.cart'),
            product_qty = $form.find('input[name=quantity]').val() || 1;
            products__price  = $('.lpc_product_price').val() || 0;
            var logo_price1 = lpc_local.getItem('lpc_logo_price1');
            var logo_price2 = lpc_local.getItem('lpc_logo_price2');
            lpc_local.setItem('lpc_product_quontity',product_qty);
            lpc_price_calculation(product_qty,products__price,logo_price1,logo_price2);
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
        var pproduct_qtys = lpc_local.getItem('lpc_product_quontity') || 1;
        var logo_price1 = lpc_local.removeItem('lpc_logo_price1');
        var logo_price2 = lpc_local.removeItem('lpc_logo_price2');
        lpc_price_calculation( pproduct_qtys, products__price, logo_price1 = 0,logo_price2 = 0 );
    });

    $(document).on('change','.lpc_logo_main_select',function(e) {
        var select_value = this.value;
        if ( select_value == 'lpc_laser_engraving' ) {
            $('.lpc_laser_engraving_select').css('display','block');
            $('.lpc_up_Printing_select').css('display','none');
            var products__price  = $('.lpc_product_price').val() || 0;
            var logo_price = $('.lpc_logo_chiled_select').val();
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            lpc_local.setItem('lpc_logo_price1',logo_price);
            var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
            lpc_price_calculation(product_qty,products__price,logo_price,Snd_local_storage );
        } else if ( select_value == 'lpc_up_Printing' ) {
            $('.lpc_laser_engraving_select').css('display','none');
            $('.lpc_up_Printing_select').css('display','block');
            var logo_price = $('.lpc_logo_chiled_select2').val();
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1
            lpc_local.setItem('lpc_logo_price1',logo_price);
            var products__price  = $('.lpc_product_price').val() || 0;
            var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
            lpc_price_calculation(product_qty,products__price,logo_price,Snd_local_storage );
        } else if ( select_value == 'none' ) {
            $('.lpc_laser_engraving_select').css('display','none');
            $('.lpc_up_Printing_select').css('display','none');
            var products__price  = $('.lpc_product_price').val() || 0;
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1
            lpc_local.removeItem('lpc_logo_price1');
            var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
            lpc_price_calculation(product_qty,products__price,0,Snd_local_storage );
        }
    });

    $(document).on('change','.lpc_logo_main_select2', function(e) {
        var select_value = this.value;
        if ( select_value == 'lpc_laser_engraving' ) {
            $('.lpc_laser_engraving_select2').css('display','block');
            $('.lpc_up_Printing_select2').css('display','none');
            var products__price  = $('.lpc_product_price').val() || 0;
            var logo_price = $('.lpc_logo2_chiled_select').val();
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1
            lpc_local.setItem('lpc_logo_price2',logo_price);
            var first_local_storage = lpc_local.getItem('lpc_logo_price1');
            lpc_price_calculation(product_qty,products__price,logo_price,first_local_storage );

        } else if ( select_value == 'lpc_up_Printing' ) {
            $('.lpc_laser_engraving_select2').css('display','none');
            $('.lpc_up_Printing_select2').css('display','block');
            var logo_price = $('.lpc_logo2_chiled_select2').val();
            var products__price  = $('.lpc_product_price').val() || 0;
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            lpc_local.setItem('lpc_logo_price2',logo_price);
            var first_local_storage = lpc_local.getItem('lpc_logo_price1');
            lpc_price_calculation(product_qty,products__price,logo_price,first_local_storage );

        } else if ( select_value == 'none' ) {
            $('.lpc_laser_engraving_select2').css('display','none');
            $('.lpc_up_Printing_select2').css('display','none');
            var products__price  = $('.lpc_product_price').val() || 0;
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1
            lpc_local.removeItem('lpc_logo_price2');
            var first_local_storage = lpc_local.getItem('lpc_logo_price1');
            lpc_price_calculation(product_qty,products__price,first_local_storage,0 );
        }
    });
        $(document).on('change','.lpc_logo_chiled_select2',function(){
            var select_value = this.value;
            var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
            lpc_local.setItem('lpc_logo_price1',select_value);
            var products__price  = $('.lpc_product_price').val() || 0;
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            lpc_price_calculation(product_qty,products__price,select_value,Snd_local_storage );
        });
        
        $(document).on('change','.lpc_logo2_chiled_select2',function(){
            var select_value = this.value;
            var first_local_storage = lpc_local.getItem('lpc_logo_price1');
            lpc_local.setItem('lpc_logo_price2',select_value);
            var products__price  = $('.lpc_product_price').val() || 0;
            var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
            lpc_price_calculation(product_qty,products__price,select_value,first_local_storage );
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
                product_qty = $form.find('input[name=quantity]').val() || 1,
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
                console.log(response);
                $thisbutton.addClass('added').removeClass('loading');
                lpc_local.removeItem('lpc_logo_price2')
                lpc_local.removeItem('lpc_logo_price1')
                self.find('.lpc_select_option').css('display','none');
            },
            success: function (response) {
                console.log(response);
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
window.sessionStorage.removeItem('lpc_product_quontity');