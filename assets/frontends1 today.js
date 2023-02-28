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
                console.log($this);
                // $(".single_variation_wrap").css("display", "none");
                var new_value = $(this).parents('.variations_form');
                console.log(new_value);
                var new2 = $(new_value).find('#lpc_quontity_size_total');
                // console.log(new2);
                var find_value = $(new2).find('#lpc_quontity_size_total');
                var all_inputs = $(find_value).find('input');
                
                lpc_local.removeItem('lpc_logo_price1');
                lpc_local.removeItem('lpc_logo_price2');
                lpc_local.removeItem('lpc_additional_price1');
                lpc_local.removeItem('lpc_additional_price2');
                lpc_local.removeItem('lpc_total_additional');
            });
        });
    });
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
    $(document).on('keyup','[name="quantity"]', function(e) {
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
        let self = $(this).parents('.extra_calculation_button_wrap');
        self.find('.lpc_select_option').css("display",'none');
        self.find('.lpc_select_option').css("display",'block');
        var quantity_value1 = self.find('.lpc_size_xs').val();
        var quantity_value2 = self.find('.lpc_size_s').val();
        var quantity_value3 = self.find('.lpc_size_m').val();
        var quantity_value4 = self.find('.lpc_size_l').val();
        var quantity_value5 = self.find('.lpc_size_xl').val();
        var quantity_value6 = self.find('.lpc_size_2xl').val();
        var quantity_value7 = self.find('.lpc_size_3xl').val();
        var quantity_value8 = self.find('.lpc_size_4xl').val();
        var quantity_value9 = self.find('.lpc_size_5xl').val();
        var product_qty     =  lpc_local.getItem('lpc_product_quontity');
        if ( product_qty == null || isNaN(product_qty)) {
            var $thisbuttons = $(this).parents(),
            $form = $thisbuttons.find('form.cart');
            product_qty = $form.find('input[name=quantity]').val() || 1;
        }
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7,quantity_value8,quantity_value9,product_qty);
    });
    //new setup

    $(document).on('keyup','.lpc_size_4xl',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
            $this = 0;
        }
        lpc_local.setItem('tc_select_size_4xl',$this);
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7,$this,quantity_value9);
    });


    $(document).on('keyup','.lpc_size_5xl',function(){
        var $this = $(this).val();
        if ($this < 0 ) {
            $(this).val(0);
            $this = 0;
        }
        lpc_local.setItem('tc_select_size_5xl',$this);
        var quantity_value1 = lpc_local.getItem('tc_select_size_xs');
        var quantity_value2 = lpc_local.getItem('tc_select_size_s');
        var quantity_value3 = lpc_local.getItem('tc_select_size_m');
        var quantity_value4 = lpc_local.getItem('tc_select_size_l');
        var quantity_value5 = lpc_local.getItem('tc_select_size_xl');
        var quantity_value6 = lpc_local.getItem('tc_select_size_2xl');
        var quantity_value7 = lpc_local.getItem('tc_select_size_3xl');
        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7,quantity_value8,$this);
    });


    //new setup
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

        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');

        quantity_calculation($this,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7,quantity_value8,quantity_value9);
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

        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,$this,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7,quantity_value8,quantity_value9);
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

        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,quantity_value2,$this,quantity_value4,quantity_value5,quantity_value6,quantity_value7,quantity_value8,quantity_value9);
        

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

        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,$this,quantity_value5,quantity_value6,quantity_value7,quantity_value8,quantity_value9);

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
        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,$this,quantity_value6,quantity_value7,quantity_value8,quantity_value9);
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
        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,$this,quantity_value7,quantity_value8,quantity_value9);
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
        var quantity_value8 = lpc_local.getItem('tc_select_size_4xl');
        var quantity_value9 = lpc_local.getItem('tc_select_size_5xl');
        quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,$this,quantity_value8,quantity_value9);

    });

    function quantity_calculation(quantity_value1,quantity_value2,quantity_value3,quantity_value4,quantity_value5,quantity_value6,quantity_value7,quantity_value8,quantity_value9,product_qty = 0 ) {
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
        if (quantity_value8 == null || quantity_value8 == '' ) {
            quantity_value8 = 0;
        }
        if (quantity_value9 == null || quantity_value9 == '' ) {
            quantity_value9 = 0;
        }

        var quontity_total = parseInt(quantity_value1) + parseInt(quantity_value2) + parseInt(quantity_value3) + parseInt(quantity_value4) + parseInt(quantity_value5) + parseInt(quantity_value6) + parseInt(quantity_value7) + parseInt(quantity_value8) + parseInt(quantity_value9);
        if ( quontity_total == 0 ) {
            quontity_total = parseInt(quontity_total) + parseInt(product_qty);
        }
        if ( quontity_total == 0 ) {
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
        // console.log(select_value);
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
                    lpc_local.removeItem('lpc_additional_price1');
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
                        // var attr_value = $(element).attr('data-value');
                        var option = $('option:selected', element).attr('data-value');
                        lpc_local.setItem('lpc_additional_price1',option);
                        // console.log(element);
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
                            var option1 = $('option:selected', this).attr('data-value');
                            lpc_local.setItem('lpc_additional_price1',option1);
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
                    lpc_local.removeItem('lpc_additional_price2');
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
                var exits_class2 = self.find('input[name=lpc_exits_condition]');
                var self_error = self.find('.lpc_show_any_error');
                let quantity_total = 1;
                if (exits_class2.length == 1 ) {
                    var quantity_value1 = self.find('.lpc_size_xs').val();
                    var quantity_value2 = self.find('.lpc_size_s').val();
                    var quantity_value3 = self.find('.lpc_size_m').val();
                    var quantity_value4 = self.find('.lpc_size_l').val();
                    var quantity_value5 = self.find('.lpc_size_xl').val();
                    var quantity_value6 = self.find('.lpc_size_2xl').val();
                    var quantity_value7 = self.find('.lpc_size_3xl').val();

                    var quantity_value8 = self.find('.lpc_size_4xl').val();
                    var quantity_value9 = self.find('.lpc_size_5xl').val();

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
                    if (quantity_value8 == null || quantity_value8 == '' ) {
                        quantity_value8 = 0;
                    }
                    if (quantity_value9 == null || quantity_value9 == '' ) {
                        quantity_value9 = 0;
                    }
                    var condition_set = 'attribute_pa_new' in select_option_value;
                    if (!condition_set) {
                        select_option_value.attribute_pa_new = "xl";
                    }  
                     quantity_total = parseInt(quantity_value1) + parseInt(quantity_value2) + parseInt(quantity_value3) + parseInt(quantity_value4) + parseInt(quantity_value5) + parseInt(quantity_value6) + parseInt(quantity_value7) + parseInt(quantity_value8) + parseInt(quantity_value9);
                        if (quantity_total< 50) {
                            $(self_error).html('Tuotteen minimitilausmäärä on 50');
                            setTimeout(function(){
                                $(self_error).html('');
                            }, 5000);
                            return false;
                        }
                    } else {
                    quantity_total = product_qty;
                    if (exits_class.length == '1' ) {
                        if (quantity_total< 50) {
                            $(self_error).html('Tuotteen minimitilausmäärä on 50');
                            setTimeout(function(){
                                $(self_error).html('');
                            }, 5000);
                            return false;
                        }
                    }
                }
                var lpc_product_price  = self.find('.lpc_product_price').val() || 0;
                let quantity_values1 = self.find('.lpc_size_xs').val();
                let quantity_values2 = self.find('.lpc_size_s').val();
                let quantity_values3 = self.find('.lpc_size_m').val();
                let quantity_values4 = self.find('.lpc_size_l').val();
                let quantity_values5 = self.find('.lpc_size_xl').val();
                let quantity_values6 = self.find('.lpc_size_2xl').val();
                let quantity_values7 = self.find('.lpc_size_3xl').val();
                let quantity_values8 = self.find('.lpc_size_4xl').val();
                let quantity_values9 = self.find('.lpc_size_5xl').val();
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
                if ( 'undefined' == typeof quantity_values8) {
                    quantity_values8 = 0;
                }
                if ( 'undefined' == typeof quantity_values9) {
                    quantity_values9 = 0;
                }
                var sizeTotals = {
                    'XS':quantity_values1,
                    'S':quantity_values2,
                    'M':quantity_values3,
                    'L':quantity_values4,
                    'XL':quantity_values5,
                    'XXL':quantity_values6,
                    'XXXL':quantity_values7,
                    'XXXXL':quantity_values8,
                    'XXXXXL':quantity_values9,
                };

                //
                // var additional_price
                var lpc_add_total = lpc_local.getItem('lpc_total_additional');

                if (lpc_add_total == null ) {
                    lpc_add_total = 0;
                }
                var option_value = JSON.stringify(select_option_value);
                
                //
                var data = {
                    action: 'lpc_woocommerce_ajax_add_to_cart',
                    product_id: product_id,
                    product_sku: '',
                    quantity: quantity_total,
                    lpc_product_price:lpc_product_price,
                    lpc_total_logo_price:lpc_total_logo_price,
                    variation_values:option_value,
                    extra_category:extra_category,
                    lpc_add_total:lpc_add_total,
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
window.sessionStorage.removeItem('tc_select_size_4xl');
window.sessionStorage.removeItem('tc_select_size_5xl');
window.sessionStorage.removeItem('lpc_total_quontity');
window.sessionStorage.removeItem('lpc_product_quontity');
window.sessionStorage.removeItem('lpc_additional_price2');
window.sessionStorage.removeItem('lpc_additional_price1');
window.sessionStorage.removeItem('lpc_total_additional');
