<?php

if ( ! class_exists('LPC_Frontend_Hook') ) {
    class LPC_Frontend_Hook {
        public function __construct() {
            add_filter( 'woocommerce_get_stock_html', [ $this, 'woocommerce_get_availability_class' ], 9999, 2 );
            add_action('wp_ajax_lpc_woocommerce_ajax_add_to_cart', [ $this,'woocommerce_ajax_add_to_cart']);
            add_action('wp_ajax_nopriv_lpc_woocommerce_ajax_add_to_cart', [$this,'woocommerce_ajax_add_to_cart']);
            add_action( 'woocommerce_before_calculate_totals', [$this,'lpc__custom_price_refresh'] );
            // add_filter( 'wc_epo_add_cart_item_original_price', [$this,'lpc_price'],10,2);
            add_filter( 'woocommerce_cart_item_name', [$this,'change_product_name'],20, 3 );
            add_action('woocommerce_checkout_create_order_line_item', [ $this, 'save_file_type_as_order_item_meta'], 20, 4);
        }
        public function save_file_type_as_order_item_meta($item, $cart_item_key, $values, $order) {
            if($values['logo1_option'] != 'Logo 1 is not selected' ) {
                $item->update_meta_data( 'Valittu  Printti', $values['logo1_option'] );
            }
            if($values['logo1_color'] != 'Logo 1 color is not selected' ) {
                $item->update_meta_data( 'Printin  tyyli', $values['logo1_color'] );
            }
            if($values['logo2_option'] != 'Logo 2 is not selected' ) {
                $item->update_meta_data( 'Valittu 2 Printti', $values['logo2_option'] );
            }
            if ( $values['logo2_color'] != 'Logo 2 color is not selected' ) {
                $item->update_meta_data( 'Printin 2 tyyli', $values['logo2_color'] );
            }
            // if ( array_key_exists('lpc_total_logo_price',$values) ) {
            //     $logo_price = wc_price($values['lpc_total_logo_price']);
            //     $item->update_meta_data( 'Set Up Charge Per Quontity', $logo_price );
            // }
            // if ( array_key_exists('lpc_add_total',$values ) ) {
            //     $saving = $values['lpc_quantity'] * $values['lpc_add_total'];
            //     $saving = wc_price($saving);
            //     $item->update_meta_data( 'Additional Charge', $saving );
            // }
        }
        public function change_product_name( $title, $cart_item, $cart_item_key ) {
            $newTitle = $title;
            if ( array_key_exists('lpc_total_logo_price',$cart_item) ) {
                $logo_price = wc_price($cart_item['lpc_total_logo_price']);
                $newTitle .= "<br/>".__("Setup Charge per Quantity","logo-price-calculation").':'. $logo_price;
            }
            if ( array_key_exists('lpc_add_total',$cart_item ) ) {
               
                $saving = $cart_item['lpc_quantity'] * $cart_item['lpc_add_total'];
                $saving = wc_price($saving);
                $newTitle .= "<br/>".__("Additional Price","logo-price-calculation"). ":". $saving;
            }
            return $newTitle;
            
        }


        public function woocommerce_get_availability_class( $html, $product ) {

            // print_r($product);
            $parent_id = $product->get_parent_id();
            $new_size = [];
            $valuess = 0;
            if ( $parent_id > 0 ) {
                $_product = wc_get_product( $parent_id );
                $valuess = wc_get_product_terms( $parent_id, 'pa_koko' );
               
                $category_ids = $_product->get_category_ids();
            } else {
                $category_ids = $product->get_category_ids();
            }
            // print_r($valuess."nbaee");
             $category_acf = [];
             $condition = [];
             $set_quantity = [];
             $i = 0;
             if( is_array($category_ids) ) {
                foreach ( $category_ids as $key =>$id ) {
                    $acf_value = get_fields("term_$id");
                    if ( $acf_value != null && array_key_exists('logo_options_settings',$acf_value)){
                        $logovalue1 = $acf_value['logo_options_settings']['vaatteet_category_options']['logo_1']['logo_options'];
                        $logovalue2 = $acf_value['logo_options_settings']['vaatteet_category_options']['logo_2']['logo_options'];
                        if (!empty($logovalue1) && !empty($logovalue2) ) {
                            $category_acf[$i] = $acf_value['logo_options_settings'];
                            $condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
                            $set_quantity[$i] = array_key_exists('minimum_order_quantity',$acf_value)? $acf_value['minimum_order_quantity']: 0;
                            $i++;
                        } else if(!empty($logovalue1)) {
                            $category_acf[$i] = $acf_value['logo_options_settings'];
                            $condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
                            $set_quantity[$i] = array_key_exists('minimum_order_quantity',$acf_value)? $acf_value['minimum_order_quantity']: 0;
                            $i++;
                        } else if (!empty($logovalue2)) {
                            $category_acf[$i] = $acf_value['logo_options_settings'];
                            $condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
                            $set_quantity[$i] = array_key_exists('minimum_order_quantity',$acf_value)? $acf_value['minimum_order_quantity']: 0;
                            $i++;
                        }
                    }
                }
             }
            $sale_price = $product->get_price();
            $quantity = $product->get_stock_quantity();
                ob_start();
                    
                    ?>
                    <div class="low_price_show">
                        <?php
                            $product_avail  = $product->get_availability();
                            $availability   = $product_avail['availability'];
                            $avail_class    = $product_avail['class'];
                            if(!in_array('yes',$condition)) { 
                        ?>
                        <p class="stock <?php echo esc_attr( $avail_class ); ?>"><?php echo wp_kses_post( $availability ); ?></p>
                        <?php } ?>
                        <p>
                        <input type="hidden" name="lpc_product_price1" value="<?php echo esc_attr( $sale_price ); ?>" class="lpc_product_price1">
                    </div>
                    <?php if(!empty($category_acf)){ ?>
                    <div class="extra_calculation_button_wrap">
                        <p class="lpc_show_any_error" style="color:red;margin-top:10px"></p>
                            
                        <div class="quontity_option_logo_price">
                            <?php if(in_array('yes',$condition) &&( is_array($valuess) || is_object($valuess)) && !empty($valuess)){ ?>
                                 <input type="hidden" name="lpc_exits_condition" value="1"/>
                            <?php 
                            if(empty($set_quantity)) {
                                printf('<input type="hidden" name="lpc_quontity_set" class="lpc_quontity_set" value="1"/>');
                            } else {
                                printf('<input type="hidden" name="lpc_quontity_set" class="lpc_quontity_set" value="%s"/>',max($set_quantity));
                            }
                        }?> 
                        <div>
                        <button type="button" class="lpc_calculate_price_button button"><?php _e("Calculate The Price",'logo-price-calculation');?></button>
                        <input type="hidden" name="lpc_product_price" value="<?php echo esc_attr( $sale_price ); ?>" class="lpc_product_price">
                        <input type="hidden" name="lpc_total_logo_price" value="0" class="lpc_total_logo_price" />
                        <div class="lpc_select_option" style="display:none">
                            <table class="lpc_variations lpc_table_on_of" cellspacing="0" role="presentation">
                               <?php
                                $this->category_option1($category_acf);
                               ?>
                            </table>
                            <div class="lpc_product_price_calculating_table">
                                <table class="lpc_border-none">
                                    <tr class="class_th_left">
                                        <th class="clas_c_th"><?php _e('The price of the product','logo-price-calculation');?></th>
                                        <th class="clas_c_th"><?php _e('Number','logo-price-calculation');?></th>
                                        <th class="clas_c_th"><?php _e('Setup Charge','logo-price-calculation');?></th>
                                        <th class="clas_c_th"><?php _e('In total','logo-price-calculation');?></th>
                                        <th class="clas_c_th"><?php _e('Additional Price','logo-price-calculation');?></th>
                                        <th class="clas_c_th"><?php _e('Arvioitu toimitus','logo-price-calculation');?></th>
                                    </tr>
                                    <tr class="class_th_right">
                                        <td class="lpc_price_of_product"><?php echo '€'.esc_attr( $sale_price );?></td>
                                        <td class="lpc_total_quantity"><?php echo esc_attr( '1' );?></td>
                                        <td class="lpc_logo_printing">1</td>
                                        <td class="lpc_inTotal">1</td>
                                        <td class="lpc_saving">0</td>
                                        <td class="lpc_delivery_" ><?php _e('14 days','logo-price-calculation'); ?></td>
                                    </tr>
                                </table>
                            </div>
                         </div>
                         <div class="percentance_table">
                                <table id="lpc_percentance_table_total">
                               
                            </table>
                        </div>
                    </div>
                <?php
                    }
                $html = ob_get_clean();
            return $html;
        }

        

        public function woocommerce_ajax_add_to_cart() {
            $check_size_condition = isset($_POST['lpc_size_active']) ? sanitize_text_field($_POST['lpc_size_active']) : 0;
            
            $logo1_option = stripslashes($_POST['logo1_option_select']);
            $logo1_color = stripslashes($_POST['logo1_option_color_select']);
            $logo2_option = stripslashes($_POST['logo2_option_select']);
            $logo2_color = stripslashes($_POST['logo2_option_color_select']);

            if ( $check_size_condition ) {
                $product_id = apply_filters( 'woocommerce_add_to_cart_product_id',$_POST['product_id']);
                $strip_les_id = stripslashes($product_id);
                $products_ids = json_decode($strip_les_id);

                if( (is_array($products_ids) || is_object($products_ids))&& !empty($products_ids)  ) {
                    // $truee = false;
                    foreach($products_ids as $key => $product_ids){
                        $product          = wc_get_product( $product_ids );
                        $sizetotal        = stripslashes($_POST['sizeTotal']);
                        $json_sizetotal   = json_decode($sizetotal);
                        $product_status   = get_post_status( $product_ids );
                        $strip_les        = stripslashes($_POST['variation_values']);
                        $json_data        = json_decode($strip_les);
                        $variations       = array();
                        $extra_category   = $_POST['extra_category'];
                        foreach( $json_data as $keys => $value ) {
                            $variations[$keys] = trim($value);
                        }
                        $variations['attribute_pa_koko'] = $key;
                        $product_id   = $product->get_parent_id();
                        $quantity111 = 0;
                        foreach($json_sizetotal as $key11 => $quantity11 ) {
                            if( strtolower($key11) == $key ) {
                                $quantity111 = $quantity11;
                            }
                        }
                        $lpc_product_price    = $_POST['lpc_product_price'];
                        $lpc_total_logo_price = $_POST['lpc_total_logo_price'];
                        $lpc_show_logo_price  = $lpc_total_logo_price;
                        $quantity             = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( wp_unslash( $_POST['quantity'] ) );
                        if ($lpc_total_logo_price > 0 ) {
                            $lpc_total_logo_price = $lpc_total_logo_price / $quantity;
                        }
                        $lpc_additionan_price = $_POST['lpc_add_total'];
                        $array_value = array(
                            'lpc_total_logo_price' => $lpc_total_logo_price,
                            'lpc_product_price'    => $lpc_product_price,
                            'lpc_show_logo_price'  => $lpc_show_logo_price,
                            'size_name'            => $json_sizetotal,
                            'lpc_quantity'         => $quantity111,
                            'lpc_extra_category'   => $extra_category,
                            'lpc_add_total'        => $lpc_additionan_price,
                            'logo1_option'         => $logo1_option,
                            'logo1_color'          => $logo1_color,
                            'logo2_option'         => $logo2_option,
                            'logo2_color'          => $logo2_color,

                        );
                        $passed_validation = apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity111, $product_ids, $variations );
                        
                        if ( $passed_validation && WC()->cart->add_to_cart($product_id, $quantity111, $product_ids,$variations,$array_value) && 'publish' === $product_status) {
                            do_action('woocommerce_ajax_added_to_cart', $product_id);
                            // $truee = true;
                            // if ('yes' === get_option('woocommerce_cart_redirect_after_add')) {
                            //     wc_add_to_cart_message(array($product_id => $quantity111), true);
                            // }
                            
                           
                        } else {
                            $data = array(
                                'error' => true,
                                'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id));
        
                            echo wp_send_json($data);
                        }
                    }
                    // if($truee) {
                        WC_AJAX :: get_refreshed_fragments(); 
                    // }
                    
                }
            } else {
                $product_id = apply_filters( 'woocommerce_add_to_cart_product_id',absint($_POST['product_id']));
                $product           = wc_get_product( $product_id );
                $quantity          = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( wp_unslash( $_POST['quantity'] ) );
                
                $sizetotal        = stripslashes($_POST['sizeTotal']);
                $json_sizetotal   = json_decode($sizetotal);
                $extra_category   = $_POST['extra_category'];
                $product_status    = get_post_status( $product_id );
                $variation_id      = 0;
                $variations        = array();
                if ( $product && 'variation' === $product->get_type() ) {
                    $variation_id = $product_id;
                    $product_id   = $product->get_parent_id();
                    $strip_les    = stripslashes($_POST['variation_values']);
                    $json_data    = json_decode($strip_les);
                    foreach( $json_data as $key => $value ) {
                        $variations[$key] = trim($value);
                    }
                }
                $lpc_product_price = $_POST['lpc_product_price'];
                $lpc_total_logo_price = $_POST['lpc_total_logo_price'];
                $lpc_show_logo_price = $lpc_total_logo_price;
                if ($lpc_total_logo_price > 0 ) {
                    $lpc_total_logo_price = $lpc_total_logo_price / $quantity;
                }
                $lpc_additionan_price = $_POST['lpc_add_total'];
                $array_value = array(
                    'lpc_total_logo_price' => $lpc_total_logo_price,
                    'lpc_product_price'    => $lpc_product_price,
                    'lpc_show_logo_price'  => $lpc_show_logo_price,
                    'size_name'            => $json_sizetotal,
                    'lpc_quantity'         => $quantity,
                    'lpc_extra_category'   => $extra_category,
                    'lpc_add_total'        => $lpc_additionan_price,
                    'logo1_option'         => $logo1_option,
                    'logo1_color'          => $logo1_color,
                    'logo2_option'         => $logo2_option,
                    'logo2_color'          => $logo2_color,
                );
                $passed_validation = apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity, $variation_id, $variations );
                
                if ( $passed_validation && WC()->cart->add_to_cart($product_id, $quantity, $variation_id,$variations,$array_value) && 'publish' === $product_status) {
                    do_action('woocommerce_ajax_added_to_cart', $product_id);

                    if ('yes' === get_option('woocommerce_cart_redirect_after_add')) {
                        wc_add_to_cart_message(array($product_id => $quantity), true);
                    }

                    WC_AJAX :: get_refreshed_fragments();
                } else {

                    $data = array(
                        'error' => true,
                        'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id));

                    echo wp_send_json($data);
                }
            }
            wp_die();
        }
        public function lpc__custom_price_refresh($cart_object) {
            foreach ( $cart_object->get_cart() as $item ) {
                if( array_key_exists( 'lpc_total_logo_price', $item ) ) {
                    $get_price = $item[ 'data' ]->get_price();
                    $total = $get_price + $item['lpc_total_logo_price'];
                    if ( array_key_exists( 'lpc_add_total', $item ) ) {
                        $total = $total + $item['lpc_add_total'];
                    }
                    $item['data']->set_price($total);
                }
            }
        }

        public function category_option1($repetar_field_values) {
            $repetar_field_value = $repetar_field_values[0];
            $logovalue1 = $repetar_field_value['vaatteet_category_options']['logo_1']['logo_options'];
            // print_r($logovalue1);

            $logovalue2 = $repetar_field_value['vaatteet_category_options']['logo_2']['logo_options'];

        ?>
            <tbody>
                <?php
                if (!empty($logovalue1)) { ?>
                <tr>
                    <th class="label"><label for="size"><?php _e("Logo 1:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="size" class="lpc_logo_main_select" name="lpc_attribute_size" >
                            <option value="none" selected="selected" ><?php _e("En halua logoa",'logo-price-calculation');?></option>
                            <?php
                                $i = 0;
                                foreach ( $repetar_field_value['vaatteet_category_options']['logo_1']['logo_options'] as $logoName ) {
                                   
                                    printf('<option value="%s" class="%s">%s</option>',"lpc_logo1_parents-$i","lpc_logo1_parentssf-$i", $logoName['logo_name']);
                                $i++;
                                }
                            ?>
                        </select>						
                    </td>
                    <?php
                        $ij = 0;
                        foreach ( $repetar_field_value['vaatteet_category_options']['logo_1']['logo_options'] as $logowrap ) {  
                       ?>
                        <td class="<?php echo "lpc_logo1_parents-$ij" ?>" style="display:none">
                            <select id="size" class="<?php echo "lpc_logo1_parentss-$ij" ?>" name="<?php echo "lpc_logo1_parents-$ij" ?>" >
                                <?php
                                    foreach($logowrap['other_option'] as $values ) {
                                        $newdata = [];
                                        $new_data = $values['additional_quantity_charges_']['additional_quantity_charges__repeater'];
                                        $i = 0;
                                        foreach( $new_data as $key=>$value ) {
                                            $newdata[$value['add_quantity']] = $value['add_additional_price'];
                                        }
                                        $output = implode(',', array_map(
                                            function ($v, $k) { return sprintf("%s='%s'", $k, $v); },
                                            $newdata,
                                            array_keys($newdata)
                                        ));
                                        printf('<option value="%s" class="attached enabled" data-value="%s">%s</option>',$values['option_value'],$output,$values['option_name']); 
                                    }
                                ?>
                            </select>
                        </td>
                        <?php
                            $ij++;
                        }
                    ?>
                </tr>
                <?php
                }
                if (!empty($logovalue2)) { ?>
                <tr>
                    <th class="label"><label for="color"><?php _e("Logo 2:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="color" class="lpc_logo_main_select2" name="lpc_attribute_size4" >
                            <option value="none" selected="selected">En halua logoa</option>
                            <?php
                                $j = 0;
                                foreach ( $repetar_field_value['vaatteet_category_options']['logo_2']['logo_options'] as $logoName ) {
                                    printf('<option value="%s" class="%s">%s</option>',"lpc_logo2_parents-$j","lpc_logo2_parentssf-$j", $logoName['logo_name']);
                                $j++;
                                }
                            ?>
                        </select>
                    </td>
                    <?php
                        $ji = 0;
                        foreach ( $repetar_field_value['vaatteet_category_options']['logo_2']['logo_options'] as $logowrap ) {  
                        ?>
                        <td class="<?php echo "lpc_logo2_parents-$ji" ?>" style="display:none">
                            <select id="size" class="<?php echo "lpc_logo2_parentss-$ji" ?>" name="<?php echo "lpc_logo2_parents-$ji" ?>" >
                                <?php
                                    foreach($logowrap['other_option'] as $values ) {
                                        $newdata = [];
                                        $new_data = $values['additional_quantity_charges_']['additional_quantity_charges__repeater'];
                                        $i = 0;
                                        foreach( $new_data as $key=>$value ) {
                                            $newdata[$value['add_quantity']] = $value['add_additional_price'];
                                        }
                                        $output = implode(',', array_map(
                                            function ($v, $k) { return sprintf("%s='%s'", $k, $v); },
                                            $newdata,
                                            array_keys($newdata)
                                        ));

                                        printf('<option value="%s" class="attached enabled" data-value="%s">%s</option>',$values['option_value'],$output,$values['option_name']); 
                                    }
                                ?>
                            </select>
                            <div class="lpc_logo2_test">
                                <?php 
                                    foreach($logowrap['other_option'] as $values) {
                                        $option_name = strtolower($values['option_name']);
                                        $additional_value = $values['additional_quantity_charges_']['additional_quantity_charges__repeater'];
                                        if(!empty($additional_value)) {
                                            foreach($additional_value as $new ) {
                                                $news = $new['add_quantity'];
                                                $news2 = $new['add_additional_price'];
                                                printf('<input type="hidden" class="logo_price2_%s_%s" value="%s"/>',$option_name,$news,$news2 );
                                            }
                                        }
                                    }
                                ?>
                            </div>
                        </td>
                        <?php
                            $ji++;
                        }
                    ?>
                </tr>
                <?php }?>
            </tbody>
        <?php
        }
    }
    new LPC_Frontend_Hook();
}