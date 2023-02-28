(function ($) {

    let lpc_local = sessionStorage;
    $(document).ready(function(){
        var extra_rand_vals = document.querySelectorAll(
                "form.variations_form"
        );
        var all_select_option = $(extra_rand_vals).find('select');
        all_select_option.each((index,element)=>{
            $(element).on('change',function(){
                lpc_local.removeItem('lpc_logo_price1');
                lpc_local.removeItem('lpc_logo_price2');
            });
        });
    });
    $(document).on('click','.lpc_calculate_price_button', function(e) {
        e.preventDefault();
        let self = $(this).parents('.extra_calculation_button_wrap');
        self.find('.lpc_select_option').css("display",'none');
        self.find('.lpc_select_option').css("display",'block');
        // self.find('.lpc_logo_main_select').val('none');
        // self.find('.lpc_logo_main_select2').val('none');
        var quantity_value1 = self.find('.lpc_size_xs').val();
        var quantity_value2 = self.find('.lpc_size_s').val();
        var quantity_value3 = self.find('.lpc_size_m').val();
        var quantity_value4 = self.find('.lpc_size_l').val();
        var quantity_value5 = self.find('.lpc_size_xl').val();
        var quantity_value6 = self.find('.lpc_size_2xl').val();
        var quantity_value7 = self.find('.lpc_size_3xl').val();

        // lpc_local.removeItem('lpc_logo_price1');
        // lpc_local.removeItem('lpc_logo_price2');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
    });

    // $(document).ready(function(){
    //     var extra_rand_vals = document.querySelectorAll(
    //         "#lpc_quontity_size_total"
    //       );
    //       var all_input_fileds = $(extra_rand_vals).find('input');
    //         var quontity_total = 0;
    //       all_input_fileds.each((index,e)=>{
    //         var values = $(e).val();
    //             quontity_total = quontity_total+ parseInt(values);
    //       });

    //       if ( quontity_total <= 0 ) {
    //         quontity_total = 1;
    //       }  
    //       var logo_price1 = lpc_local.getItem('lpc_logo_price2');
    //       var logo_price2 = lpc_local.getItem('lpc_logo_price1');
    //       var products__price  = $('.lpc_product_price').val() || 0;
    //     //   var product_qty = $('form.cart').find('input[name=quantity]').val() || 1;
         
    //       lpc_price_calculation(quontity_total,products__price,logo_price1,logo_price2);
    // });

    $(document).on('keyup','.lpc_size_xs',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
            $this = 0;
        }
        lpc_local.setItem('tc_select_size_xs',$this);
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        quantity_calculation($this,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
    });
    $(document).on('keyup','.lpc_size_s',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
            $this = 0;
        }
        lpc_local.setItem('tc_select_size_s',$this);
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        quantity_calculation(quantity_value1,$this,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
    });

    $(document).on('keyup','.lpc_size_m',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
           $this = 0;
        }
        lpc_local.setItem('tc_select_size_m',$this);
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        // var product_qty = lpc_local.getItem('lpc_product_quontity');
        quantity_calculation(quantity_value1,quantity_value2,$this,quantity_value4,quantity_value5,quantity_value6,quantity_value7);
        

    });
    $(document).on('keyup','.lpc_size_l',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
            $this = 0;
        }

        lpc_local.setItem('tc_select_size_l',$this);
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');

        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        // var product_qty = lpc_local.getItem('lpc_product_quontity');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,$this,quantity_value5,quantity_value6,quantity_value7);

    });
    $(document).on('keyup','.lpc_size_xl',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
          $this = 0;
            $(this).val(0);
        }

        lpc_local.setItem('tc_select_size_xl',$this);
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');

        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,$this,quantity_value6,quantity_value7);
    });
    $(document).on('keyup','.lpc_size_2xl',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            
            $(this).val(0);
            $this = 0;
        }
        lpc_local.setItem('tc_select_size_2xl',$this);
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,$this,quantity_value7);
    });
    $(document).on('keyup','.lpc_size_3xl',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
            $this = 0;
        }
        lpc_local.setItem('tc_select_size_3xl',$this);
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,$this);

    });

    function quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7 ) {
        if (quantity_value1 == null || quantity_value1 == '' ) {
            quantity_value1 = 0;
        }

        if (quantity_value2 == null  || quantity_value2 == '' ) {
            quantity_value2 = 0;
        }
        if (quantity_value3 == null || quantity_value3 == '' ) {
            quantity_value3 = 0;
        }
        if (quantity_value4 == null || quantity_value4 == '' ) {
            quantity_value4 = 0;
        }
        if (quantity_value5 == null || quantity_value5 == '' ) {
            quantity_value5 = 0;
        }
        if (quantity_value6 == null || quantity_value6 == '' ) {
            quantity_value6 = 0;
        }
        if (quantity_value7 == null || quantity_value7 == '' ) {
            quantity_value7 = 0;
        }

        var quontity_total = parseInt(quantity_value1) + parseInt(quantity_value2) + parseInt(quantity_value3) + parseInt(quantity_value4) + parseInt(quantity_value5) + parseInt(quantity_value6) + parseInt(quantity_value7);
        if ( quontity_total <= 0 ) {
            quontity_total = 1;
        }
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
        if ( logo_price1 == null || logo_price1 == '' ) {
            var logo_price1 = 0;
        }
        if ( logo_price2 == null || logo_price2 == '' ) {
            logo_price2 = 0;
        }
        var logo_price = (parseFloat(logo_price1) + parseFloat(logo_price2)) * product_qty ;

        var total_price = product_qty * products__price + logo_price;

        var total_price = percentance_condition(product_qty, total_price );
        var total_prices = eur_format(total_price);
        var log_price = parseFloat(logo_price1) + parseFloat(logo_price2);
        var log_prices = eur_format(logo_price);
        var saving = logo_price_saving(product_qty);
        var saving_format = eur_format(saving).replace('€', '');
        update_table(product_qty,log_price,total_prices,log_prices,saving_format);
    }
    function logo_price_saving(quantity) {
        if ( quantity >= 1000 ) {
            return '14.59';
        } else if( quantity >= 300 && quantity < 1000 ) {
            return '12.79';
        } else if ( quantity >= 150 && quantity < 300 ) {
            return '10.39';
        } else if ( quantity >= 75 && quantity < 150 ) {
            return '7.87';
        }else {
            return '0';
        }
    }

    function percentance_condition( quantity, total_price ) {
        if ( quantity >= 1000 ) {
            return percentance_calculation(14.59, total_price );
        } else if( quantity >= 300 && quantity < 1000 ) {
            return percentance_calculation(12.79, total_price );
        } else if ( quantity >= 150 && quantity < 300 ) {
            return percentance_calculation(10.39, total_price );
        } else if ( quantity >= 75 && quantity < 150 ) {
            return percentance_calculation(7.87, total_price );
        }else {
            return total_price;
        }
    }

    function percentance_calculation(percentance, total_price ) {
        var regular_price = total_price;
        var new_width     = ( total_price * percentance ) / 100;
        var final_price   = regular_price -  new_width;
        return final_price.toFixed(3);
    }


    function eur_format(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }

    function update_table(quantity,logo_price,total_price,log_prices,saving) {
        $(".lpc_total_quantity").html( quantity);
        $(".lpc_logo_printing").html(log_prices );
        $(".lpc_inTotal").html(total_price);
        $('.lpc_total_logo_price').val(logo_price);
        $('.lpc_saving').html(saving + '%' );
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

                var exits_class = self.find('input[name=lpc_total_logo_price]');
                let quantity_total = 1;
                let extra_category = 0;
                if (exits_class.length == 1 ) {
                    extra_category = 1;
                    var quantity_value1 = self.find('.lpc_size_xs').val();
                    var quantity_value2 = self.find('.lpc_size_s').val();
                    var quantity_value3 = self.find('.lpc_size_m').val();
                    var quantity_value4 = self.find('.lpc_size_l').val();
                    var quantity_value5 = self.find('.lpc_size_xl').val();
                    var quantity_value6 = self.find('.lpc_size_2xl').val();
                    var quantity_value7 = self.find('.lpc_size_3xl').val();
                    if (quantity_value1 == null || quantity_value1 == '' ) {
                        quantity_value1 = 0;
                    }
                    if (quantity_value2 == null  || quantity_value2 == '' ) {
                        quantity_value2 = 0;
                    }
                    if (quantity_value3 == null || quantity_value3 == '' ) {
                        quantity_value3 = 0;
                    }
                    if (quantity_value4 == null || quantity_value4 == '' ) {
                        quantity_value4 = 0;
                    }
                    if (quantity_value5 == null || quantity_value5 == '' ) {
                        quantity_value5 = 0;
                    }
                    if (quantity_value6 == null || quantity_value6 == '' ) {
                        quantity_value6 = 0;
                    }
                    if (quantity_value7 == null || quantity_value7 == '' ) {
                        quantity_value7 = 0;
                    }
                     quantity_total = parseInt(quantity_value1) + parseInt(quantity_value2) + parseInt(quantity_value3) + parseInt(quantity_value4) + parseInt(quantity_value5) + parseInt(quantity_value6) + parseInt(quantity_value7);
                } else {
                    quantity_total = product_qty;
                }
                var lpc_product_price  = self.find('.lpc_product_price').val() || 0;
                let quantity_values1 = self.find('.lpc_size_xs').val();
                let quantity_values2 = self.find('.lpc_size_s').val();
                let quantity_values3 = self.find('.lpc_size_m').val();
                let quantity_values4 = self.find('.lpc_size_l').val();
                let quantity_values5 = self.find('.lpc_size_xl').val();
                let quantity_values6 = self.find('.lpc_size_2xl').val();
                let quantity_values7 = self.find('.lpc_size_3xl').val();
                if ( 'undefined' == typeof quantity_values1) {
                    quantity_values1 = 0;
                }
                if ( 'undefined' == typeof quantity_values2) {
                    quantity_values2 = 0;
                }
                if ( 'undefined' == typeof quantity_values3) {
                    quantity_values3 = 0;
                }
                if ( 'undefined' == typeof quantity_values4) {
                    quantity_values4 = 0;
                }
                if ( 'undefined' == typeof quantity_values5) {
                    quantity_values5 = 0;
                }

                if ( 'undefined' == typeof quantity_values6) {
                    quantity_values6 = 0;
                }
                if ( 'undefined' == typeof quantity_values7) {
                    quantity_values7 = 0;
                }
                var sizeTotals = {
                    'XS':quantity_values1,
                    'S':quantity_values2,
                    'M':quantity_values3,
                    'L':quantity_values4,
                    'XL':quantity_values5,
                    'XXL':quantity_values6,
                    'XXXL':quantity_values7,
                };
           

                var data = {
                    action: 'lpc_woocommerce_ajax_add_to_cart',
                    product_id: product_id,
                    product_sku: '',
                    quantity: quantity_total,
                    lpc_product_price:lpc_product_price,
                    lpc_total_logo_price:lpc_total_logo_price,
                    variation_values:option_value,
                    extra_category:extra_category,
                    sizeTotal:JSON.stringify(sizeTotals)
                };
             
        $(document.body).trigger('adding_to_cart', [$thisbutton, data]);
        $.ajax({
            type: 'post',
            url: wc_add_to_cart_params.ajax_url,
            data: data,
            beforeSend: function (response) {
                $thisbutton.removeClass('added').addClass('loading');
                // console.log(response);
            },
            complete: function (response) {
                $thisbutton.addClass('added').removeClass('loading');
                // console.log(response);
            },
            success: function (response) {
                console.log(response);
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
window.sessionStorage.removeItem('tc_select_size_2xl');
window.sessionStorage.removeItem('tc_select_size_3xl');
window.sessionStorage.removeItem('lpc_total_quontity');
window.sessionStorage.removeItem('lpc_product_quontity');
