(function ($) {

    let lpc_local = sessionStorage;
    $(document).ready(function(){
        var extra_rand_vals = document.querySelectorAll(
                "form.variations_form"
        );
        var all_select_option = $(extra_rand_vals).find('select');
        all_select_option.each((index,element)=>{
            $(element).on('change',function(){
                var $this = $(this).val();
                lpc_local.setItem('lpc_logo_select_option',$this);
                var new_value = $(this).parents('.variations_form');
                var new2 = $(new_value).find('#lpc_quontity_size_total');
                var all_inputs = $(new2).find('input:text');
                var new23 = $(new_value).find('.lpc_label_show_hides');
                all_inputs.each((index,element)=>{
                    var get_value = $(element).attr('id').split('-');
                    if( get_value[1] == $this ) {
                        $(element).parent('td').show();
                    } else {
                        $(element).parent('td').hide();
                    }
                });
                lpc_local.removeItem('lpc_logo_price1');
                lpc_local.removeItem('lpc_logo_price2');
                lpc_local.removeItem('lpc_additional_price1');
                lpc_local.removeItem('lpc_additional_price2');
                lpc_local.removeItem('lpc_total_additional');
                //new 
                lpc_local.removeItem('lpc_logo_price1_option');
                lpc_local.removeItem('lpc_logo_price1_color');
                lpc_local.removeItem('lpc_logo_price2_option');
                lpc_local.removeItem('lpc_logo_price2_color');
            });
        });
    });
     $(document).on('change','[name="quantity"]', function(e) {
            var $thisbuttons = $(this),
            $form = $thisbuttons.closest('form.cart'),
            product_qty = $form.find('input[name=quantity]').val() || 1;
             products__price  = $('.lpc_product_price').val() || 0;
            lpc_local.setItem('lpc_product_quontity',product_qty);
            quantity_calculation();
    });
    $(document).on('keyup','[name="quantity"]', function(e) {
        var $thisbuttons = $(this),
        $form = $thisbuttons.closest('form.cart'),
        product_qty = $form.find('input[name=quantity]').val() || 1;
        products__price  = $('.lpc_product_price').val() || 0;
        lpc_local.setItem('lpc_product_quontity',product_qty);
        quantity_calculation();
    });
    
    $(document).on('click','.lpc_calculate_price_button', function(e) {
        e.preventDefault();
        // console.log('hi');
        var self = $(this).parents('form.cart');
        if ( self.length == 0 ) {
            self = $(this).parents('.extra_calculation_button_wrap');
        }
        self.find('.lpc_select_option').css("display",'none');
        self.find('.lpc_select_option').css("display",'block');
        quantity_calculation();
    });

    $(document).ready(function(){
        var quontity_table_value = document.querySelectorAll(
            "#lpc_quontity_size_total"
         );
         var all_input_option = $(quontity_table_value).find('input[name=lpc_size_q]');
         all_input_option.each((index,element)=>{
            $(element).on('keyup',function(){
                quantity_calculation();
            });
         });
    });
    function quantity_calculation() {
        var select_value = lpc_local.getItem('lpc_logo_select_option');
        var quontity_table_value = document.querySelectorAll(
            "#lpc_quontity_size_total"
         );
         var all_input_option = $(quontity_table_value).find('input[name=lpc_size_q]');
            var sum = 0;
            all_input_option.each((index,element)=>{
                var attr_value = $(element).attr('id').split('-');
                if(attr_value[1] == select_value) {
                    var element_value = $(element).val();
                    if(isNaN(element_value) || element_value == null || element_value == '') {
                        element_value = 0;
                    }
                    sum = sum + parseInt(element_value);
                }
            })
        var product_qty = lpc_local.getItem('lpc_product_quontity');
        if( product_qty == null || isNaN(product_qty) || product_qty == 'undefined' ){
            product_qty = 0;
        }
        var quontity_total = 0; 
        if ( sum == 0 ) {
            quontity_total = parseInt(sum) + parseInt(product_qty);
        }else {
            quontity_total = parseInt(sum); 
        }
        if ( quontity_total == 0 ) {
            quontity_total = 1;
        }
        var logo_price1 = lpc_local.getItem('lpc_logo_price2');
        lpc_local.setItem('lpc_total_quontity',quontity_total);
        var logo_price2 = lpc_local.getItem('lpc_logo_price1');
        var products__price  = $('.lpc_product_price1').val() || 0;
        lpc_price_calculation(quontity_total,products__price,logo_price1,logo_price2);
    }

    $(document).on('change','.lpc_logo_main_select', function(e) {
        var select_value = this.value;
        if ( select_value == 'none' ) {
            select_value = 'lpc_logo1_parents-none';
        }
        var selected_option = $('option:selected', this).text();
        // console.log(selected_option);
        lpc_local.setItem('lpc_logo_price1_option',selected_option);

        var replace_value = select_value.split('-');
        var value_of_first = replace_value[0];
        var $this = $(this);
        var parents_info = $this.parents().closest('.lpc_select_option');
        var select_values = parents_info.find('select');
        select_values.each((index,element)=>{    
           var classAttr = $(element).parent().attr('class');
        //    console.log(classAttr);

           var replace_valuew = classAttr.split('-');
           var value_of_firstw = replace_valuew[0];
            if (value_of_first == value_of_firstw ) {
                if ( replace_value[1] == 'none' ) {
                    $(element).parent().css('display','none');
                    lpc_local.removeItem('lpc_logo_price1');
                    lpc_local.removeItem('lpc_additional_price1');

                    lpc_local.removeItem('lpc_logo_price1_option');
                    lpc_local.removeItem('lpc_logo_price1_color');

                    var elementParents   = $(element).parents().find('form.cart');
                    var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                    var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
                    var products__price  = $('.lpc_product_price').val() || 0;
                    lpc_price_calculation(pproduct_qtys,products__price,0,Snd_local_storage );
                } else {
                    if ( classAttr == select_value) {
                        
                        var logo_price_1 = $(element).val();
                        var option = $('option:selected', element).attr('data-value');

                        var selected_option_color = $('option:selected', element).text();

                        lpc_local.setItem('lpc_logo_price1_color',selected_option_color);
                        
                        lpc_local.setItem('lpc_additional_price1',option);
                        lpc_local.setItem('lpc_logo_price1',logo_price_1);

                        var elementParents   = $(element).parents().find('form.cart');
                        var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                        var Snd_local_storage = lpc_local.getItem('lpc_logo_price2');
                        var products__price  = $('.lpc_product_price').val() || 0;
                        lpc_price_calculation(pproduct_qtys,products__price,logo_price_1,Snd_local_storage );
                        $(element).on('change',function() {
                            var current_value = this.value;
                            var option1 = $('option:selected', this).attr('data-value');

                            var selected_option_color1 = $('option:selected', this).text();

                            lpc_local.setItem('lpc_logo_price1_color',selected_option_color1);

                            lpc_local.setItem('lpc_additional_price1',option1);
                            //call
                            lpc_local.setItem('lpc_logo_price1',current_value);
                            var elementParents   = $(element).parents().find('form.cart');
                            // var product_qty = $(elementParents).find('input[name=quantity]').val();
                            var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                            // console.log(pproduct_qtys);
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
        var selected_option2 = $('option:selected', this).text();

        lpc_local.setItem('lpc_logo_price2_option',selected_option2);

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
                    lpc_local.removeItem('lpc_additional_price2');

                    lpc_local.removeItem('lpc_logo_price2_option');
                    lpc_local.removeItem('lpc_logo_price2_color');

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
                        var option = $('option:selected', element).attr('data-value');
                        lpc_local.setItem('lpc_additional_price2',option);
                        var elementParents   = $(element).parents().find('form.cart');
                        // var product_qty = $(elementParents).find('input[name=quantity]').val();
                        var selected_option_color2 = $('option:selected', element).text();

                         lpc_local.setItem('lpc_logo_price2_color',selected_option_color2);

                        var pproduct_qtys = lpc_local.getItem('lpc_total_quontity') || 1;
                        //call
                        lpc_local.setItem('lpc_logo_price2',logo_price_1);
                        var first_local_storage = lpc_local.getItem('lpc_logo_price1');
                        var products__price  = $('.lpc_product_price').val() || 0;
                        lpc_price_calculation(pproduct_qtys,products__price,first_local_storage,logo_price_1 );
                        $(element).on('change',function() {
                            var current_value = this.value;
                            var option1 = $('option:selected', this).attr('data-value');
                            lpc_local.setItem('lpc_additional_price2',option1);
                            var elementParents   = $(element).parents().find('form.cart');
                            // var product_qty = $(elementParents).find('input[name=quantity]').val();
                            //call
                            var selected_option_color2 = $('option:selected', this).text();

                            lpc_local.setItem('lpc_logo_price2_color',selected_option_color2);

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
        // console.log(logo_price1);
        // var logo_price = (parseFloat(logo_price1) + parseFloat(logo_price2)) * product_qty ;
        var logo_price = (parseFloat(logo_price1) + parseFloat(logo_price2));
        var additional_price = logo_additional_price(product_qty);
        var price_with_additional = parseFloat(products__price) + parseFloat(additional_price);

        var total_price = (parseInt(product_qty) * parseFloat(price_with_additional))  + parseFloat(logo_price);
        // var total_price = percentance_condition(product_qty, total_price );
        var total_prices = eur_format(total_price);
        var log_price = parseFloat(logo_price1) + parseFloat(logo_price2);
        var log_prices = eur_format(logo_price);
        var add_price = 0;
        if (additional_price > 0 ) {
            add_price = parseFloat(additional_price) * parseInt(product_qty);
        }
        var saving_format = eur_format(add_price);
        update_table(product_qty,log_price,total_prices,log_prices,saving_format);
    }

    function logo_additional_price(quantity) {
        var quantity = parseInt(quantity);
        var add_price  = lpc_local.getItem('lpc_additional_price1');
        var add_price2 = lpc_local.getItem('lpc_additional_price2');
        var lpx_price1 = 0;
        var lpx_price2 = 0;
        if (add_price != null) {
            var newarray = add_price.split(",");
            var new_arrays = [];
           newarray.forEach((value,index)=>{
                var values = value.split("=");
                var keys = parseInt(values[0]);
                new_arrays[keys] = parseFloat(values[1].replace(/"|'/g, ''));
           });
           if ( quantity >= 20000 ) {
                lpx_price1 = new_arrays[20000];
            } else if( quantity >= 10000 && quantity < 20000 ) {
                lpx_price1 = new_arrays[10000];
             } else if ( quantity >= 5000 && quantity < 10000 ) {
                lpx_price1 = new_arrays[5000];
            } else if ( quantity >= 2500 && quantity < 5000 ) {
                lpx_price1 = new_arrays[2500];
             }else if ( quantity >= 1000 && quantity < 2500 ) {
                lpx_price1 = new_arrays[1000];
             }else if ( quantity >= 500 && quantity < 1000 ) {
                lpx_price1 = new_arrays[250];
             } else if ( quantity >= 250 && quantity < 500 ) {
                lpx_price1 = new_arrays[250];
             } else if ( quantity >= 100 && quantity < 250 ) {
                lpx_price1 = new_arrays[100];
             } else if ( quantity >= 50 && quantity < 100 ) {
                lpx_price1 = new_arrays[50];
             }
        }
        if (add_price2 != null) {
            var newarray2 = add_price2.split(",");
            var new_arrays2 = [];
            newarray2.forEach((value,index)=>{
                var values = value.split("=");
                var keys = parseInt(values[0]);
                new_arrays2[keys] = parseFloat(values[1].replace(/"|'/g, ''));
           });
        
           if ( quantity >= 20000 ) {
                lpx_price2 = new_arrays[20000];
            } else if( quantity >= 10000 && quantity < 20000 ) {
                lpx_price2 = new_arrays[10000];
            } else if ( quantity >= 5000 && quantity < 10000 ) {
                lpx_price2 = new_arrays[5000];
            } else if ( quantity >= 2500 && quantity < 5000 ) {
                lpx_price2 = new_arrays[2500];
            }else if ( quantity >= 1000 && quantity < 2500 ) {
                lpx_price2 = new_arrays[1000];
            }else if ( quantity >= 500 && quantity < 1000 ) {
                lpx_price2 = new_arrays[250];
            } else if ( quantity >= 250 && quantity < 500 ) {
                lpx_price2 = new_arrays[250];
            } else if ( quantity >= 100 && quantity < 250 ) {
                lpx_price2 = new_arrays[100];
            } else if ( quantity >= 50 && quantity < 100 ) {
                lpx_price2 = new_arrays[50];
            }
        }
        var total_add = parseFloat(lpx_price1 + lpx_price2);
        lpc_local.setItem('lpc_total_additional',total_add);
        return total_add;
    }
    function eur_format(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }

    function update_table(quantity,logo_price,total_price,log_prices,saving) {
        $(".lpc_total_quantity").html( quantity);
        $(".lpc_logo_printing").html(log_prices );
        $(".lpc_inTotal").html(total_price);
        $('.lpc_total_logo_price').val(logo_price);
        $('.lpc_saving').html(saving);
        $('.cart .woocommerce-Price-amount').html(total_price);
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
                var exits_class = self.find('input[name=lpc_total_logo_price]');
                let extra_category = 0;
                if (exits_class.length == 1) {
                    extra_category = 1;
                }
                var active_select = lpc_local.getItem('lpc_logo_select_option');
                var exits_class2 = self.find('input[name=lpc_exits_condition]');
                var self_error = self.find('.lpc_show_any_error');
                let quantity_total = 0;

                var product_id_collection = {};
                var sizeTotals = {};
                var lpc_size_active = 0;
                if (exits_class2.length == 1 ) {
                    lpc_size_active = 1;  
                    var quontity_table_value = self.find("#lpc_quontity_size_total");
                    var all_input_option = $(quontity_table_value).find('input[name=lpc_size_q]');
                     all_input_option.each((index,element)=>{
                        var attr_value = $(element).attr('id').split('-');
                        if(attr_value[1] == active_select) {
                            var quantity_value1_size = self.find(element).siblings('input');
                            var find_size = $(quantity_value1_size).attr('id').split('-');
                            var find_product_id = $(quantity_value1_size).val();
                            var element_value = $(element).val();
                            if(element_value != 0) {
                                product_id_collection[find_size[1]] = find_product_id;
                                sizeTotals[find_size[1]] = element_value;
                                quantity_total = quantity_total + parseInt(element_value);
                            }
                        }
                    }); 
                    if (quantity_total<= 0 ) {
                        $(self_error).html('ole hyvä ja valitse koko');
                            setTimeout(function(){
                                $(self_error).html('');
                            }, 5000);
                        return false;
                    }
                    product_id = JSON.stringify(product_id_collection);
                } else {
                    quantity_total = product_qty;
                }
                var lpc_add_total = lpc_local.getItem('lpc_total_additional');
                var lpc_product_price  = self.find('.lpc_product_price').val() || 0;
                if (lpc_add_total == null ) {
                    lpc_add_total = 0;
                }
                var quantity_condition_value = self.find('.lpc_quontity_set').val();
                if (quantity_total< quantity_condition_value ) {
                    $(self_error).html('Tuotteen minimitilausmäärä on '+quantity_condition_value);
                    setTimeout(function(){
                        $(self_error).html('');
                    }, 5000);
                    return false;
                }
                var option_value = JSON.stringify(select_option_value);
                var logo1_option = lpc_local.getItem('lpc_logo_price1_option');
                var logo1_color  = lpc_local.getItem('lpc_logo_price1_color');
                var logo2_option = lpc_local.getItem('lpc_logo_price2_option');
                var logo2_color  = lpc_local.getItem('lpc_logo_price2_color');
                if (logo1_option == null ) {
                    logo1_option = 'Logo 1 is not selected'
                }
                if (logo1_color == null ) {
                    logo1_color = 'Logo 1 color is not selected'
                }
                if (logo2_option == null ) {
                    logo2_option = 'Logo 2 is not selected'
                }
                if (logo2_color == null ) {
                    logo2_color = 'Logo 2 color is not selected'
                }


                var data = {
                    action: 'lpc_woocommerce_ajax_add_to_cart',
                    product_id: product_id,
                    lpc_size_active:lpc_size_active,
                    product_sku: '',
                    quantity: quantity_total,
                    lpc_product_price:lpc_product_price,
                    lpc_total_logo_price:lpc_total_logo_price,
                    variation_values:option_value,
                    extra_category:extra_category,
                    lpc_add_total:lpc_add_total,
                    sizeTotal:JSON.stringify(sizeTotals),
                    logo1_option_select:logo1_option,
                    logo1_option_color_select:logo1_color,
                    logo2_option_select:logo2_option,
                    logo2_option_color_select:logo2_color,

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
window.sessionStorage.removeItem('lpc_logo_select_option');
window.sessionStorage.removeItem('lpc_logo_price1');
window.sessionStorage.removeItem('lpc_total_quontity');
window.sessionStorage.removeItem('lpc_product_quontity');
window.sessionStorage.removeItem('lpc_additional_price2');
window.sessionStorage.removeItem('lpc_additional_price1');
window.sessionStorage.removeItem('lpc_total_additional');
//new
window.sessionStorage.removeItem('lpc_logo_price1_option');
window.sessionStorage.removeItem('lpc_logo_price1_color');
window.sessionStorage.removeItem('lpc_logo_price2_option');
window.sessionStorage.removeItem('lpc_logo_price2_color');
