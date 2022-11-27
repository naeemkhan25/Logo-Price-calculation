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
            // add_filter( 'woocommerce_is_sold_individually', [$this,'hide_woocommerce_quantity_input'], 10, 2 );
            // add_filter( 'woocommerce_quantity_input_max', [$this,'hide_woocommerce_quantity_input'], 10, 2 );
           
        }
        
        public function lpc_euro_currence($amount) {
            $formatter = new NumberFormatter('de_DE',  NumberFormatter::CURRENCY);
            return $formatter->formatCurrency($amount, 'EUR') . PHP_EOL;
        }

        public function hide_woocommerce_quantity_input( $quantity, $product ) {
            // only on the product page
            if ( ! is_product() ) {
                return $quantity;
            }
            // print_r($product);
            // $product_id = $product->id;
            // echo $product_id;

            $product_category = $product->get_categories();
            $parent_id = $product->get_parent_id();
            if ( $parent_id > 0 ) {
                $_product = wc_get_product( $parent_id );
                $category_ids = $_product->get_category_ids();
            } else {
                $category_ids = $product->get_category_ids();
            }
          
             $category_name = [];
             if( is_array($category_ids) ) {
                foreach ( $category_ids as $key =>$id ) {
                    $category_name[$key] = $this->get_product_category_by_id( $id );
                }
             }
            //  print_r($category_name);
            if (in_array('liikelahjat',$category_name)) {
                return true;
            }
            return false;
        }

        public function size_section_all() {
            $size_array = [
               'xs' => [
                'Label'         => 'XS',
                'default_value' => '0',
               ],
               's' => [
                'Label'         => 'S',
                'default_value' => '0',
               ],
               'm' => [
                'Label'         => 'M',
                'default_value' => '0',
               ],
               'l' => [
                'Label'         => 'L',
                'default_value' => '0',
               ],
               'xl' => [
                'Label'         => 'XL',
                'default_value' => '0',
               ],
               '2xl' => [
                'Label'         => '2XL',
                'default_value' => '0',
               ],
               '3xl' => [
                'Label'         => '3XL',
                'default_value' => '0',
               ],

            ];
            return $size_array;
        }


        function change_product_name( $title, $cart_item, $cart_item_key ) {
            
            $newTitle = $title;
            if ( array_key_exists('lpc_show_logo_price',$cart_item) ) {
                if ( $cart_item['lpc_show_logo_price'] > 0 ) {
                    $logo_price = $this->lpc_euro_currence($cart_item['lpc_show_logo_price']);
                    $newTitle .= "<br/>"."Logo Price : $logo_price";
                }
            }
            // print_r($cart_item);

            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->XS > 0 ) {
                    $xs =  $cart_item['size_name']->XS;
                    $newTitle .= "<br/>"."Koko XS : $xs";
                }
            }
            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->S > 0 ) {
                    $s =  $cart_item['size_name']->S;
                    $newTitle .= "<br/>"."Koko S : $s";
                }
            }
            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->M > 0 ) {
                    $xs =  $cart_item['size_name']->M;
                    $newTitle .= "<br/>"."Koko M : $xs";
                }
            }
            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->L > 0 ) {
                    $xs =  $cart_item['size_name']->L;
                    $newTitle .= "<br/>"."Koko L : $xs";
                }
            }
            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->XL > 0 ) {
                    $xs =  $cart_item['size_name']->XL;
                    $newTitle .= "<br/>"."Koko XL : $xs";
                }
            }
            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->XXL > 0 ) {
                    $xs =  $cart_item['size_name']->XXL;
                    $newTitle .= "<br/>"."Koko 2XL : $xs";
                }
            }
            if ( array_key_exists('size_name',$cart_item ) ) {
                if ( $cart_item['size_name']->XXXL > 0 ) {
                    $xs =  $cart_item['size_name']->XXXL;
                    $newTitle .= "<br/>"."Koko 3XL : $xs";
                }
            }
            if ( array_key_exists('lpc_extra_category',$cart_item ) ) {
               if ( $cart_item['lpc_extra_category'] == '1' ) {

                    $saving = $this->logo_price_saving($cart_item['lpc_quantity']);
                    
                    $saving_value = str_replace('€', '',$this->lpc_euro_currence($saving));
                    $saving_value = trim($saving_value);
                    $newTitle .= "<br/>"."Saving : $saving_value%";
               }
            }
            return $newTitle;
            
        }


        public function logo_price_saving($quantity) {
            if ( $quantity >= 1000 ) {
                return '14.59';
            } else if( $quantity >= 300 && $quantity < 1000 ) {
                return '12.79';
            } else if ( $quantity >= 150 && $quantity < 300 ) {
                return '10.39';
            } else if ( $quantity >= 75 && $quantity < 150 ) {
                return '7.87';
            }else {
                return '0';
            }
        }
        
        public function woocommerce_get_availability_class( $html, $product ) {
            $product_category = $product->get_categories();
            $parent_id = $product->get_parent_id();
            if ( $parent_id > 0 ) {
                $_product = wc_get_product( $parent_id );
                $category_ids = $_product->get_category_ids();
            } else {
                $category_ids = $product->get_category_ids();
            }
          
             $category_name = [];
             if( is_array($category_ids) ) {
                foreach ( $category_ids as $key =>$id ) {
                    $category_name[$key] = $this->get_product_category_by_id( $id );
                }
             }
             $repetar_field_value = get_field('logo_options_settings','option');
          
            // if (!in_array('liikelahjat',$category_name)) {
            //     return;
            // }
            $sale_price = $product->get_price();
            $quantity = $product->get_stock_quantity();
            // $logo_select_array = $this->logo_select_array($product_category);
            $size_select = $this->size_section_all();
           
            
            if ( is_product() ) {
                ob_start();
                    ?>
                    <div class="extra_calculation_button_wrap">
                        <div class="quontity_option_logo_price">
                            <div class="quontity_update_option">
                                <table id="lpc_quontity_size_total">
                                    <tbody>    
                                        <tr>

                                            <?php  
                                            foreach( $size_select as $key => $value ) {
                                                printf('<td><input type="text" name="lpc_size_%s" class="lpc_size_%s" value="%s" /></td>',$key,$key,$value['default_value'] );
                                            }
                                            ?>
                                            </tr>
                                            <tr>
                                            <?php  
                                                foreach( $size_select as $key => $value ) {
                                                    printf('<td>%s</td>',$value['Label'] );
                                                }
                                            ?>
                                            </tr>
                                        <tbody>    
                                </table>
                            </div>
                        <div>
                        <button type="button" class="lpc_calculate_price_button button"><?php _e("Calculate The Price",'logo-price-calculation');?></button>
                        <input type="hidden" name="lpc_product_price" value="<?php echo esc_attr( $sale_price ); ?>" class="lpc_product_price">
                        <input type="hidden" name="lpc_total_logo_price" value="0" class="lpc_total_logo_price" />
                        <div class="lpc_select_option" style="display:none">
                            <table class="lpc_variations lpc_table_on_of" cellspacing="0" role="presentation">
                               <?php
                                $this->category_option1($repetar_field_value);
                                // $this->category_option2($repetar_field_value);
                                // $this->category_option3($repetar_field_value);
                               ?>
                            </table>
                            <div class="lpc_product_price_calculating_table">
                                <table class="lpc_border-none">
                                    <tr>
                                        <th><?php _e('The price of the product','logo-price-calculation');?></th>
                                        <th><?php _e('Number','logo-price-calculation');?></th>
                                        <th><?php _e('Logo printing','logo-price-calculation');?></th>
                                        <th><?php _e('In total','logo-price-calculation');?></th>
                                        <th><?php _e('Saving','logo-price-calculation');?></th>
                                        <th><?php _e('Delivery','logo-price-calculation');?></th>
                                    </tr>
                                    <tr>
                                        <td class="lpc_price_of_product"><?php echo '€'.esc_attr( $sale_price );?></td>
                                        <td class="lpc_total_quantity"><?php echo esc_attr( '1' );?></td>
                                        <td class="lpc_logo_printing">1</td>
                                        <td class="lpc_inTotal">1</td>
                                        <td class="lpc_saving">0%</td>
                                        <td class="lpc_delivery_" ><?php _e('14 days','logo-price-calculation'); ?></td>
                                    </tr>
                                </table>
                            </div>
                         </div>
                         <div class="percentance_table">
                                <table id="lpc_percentance_table_total">
                                    <tbody>    
                                        <tr>
                                            <th><?php _e('Qty','logo-price-calculation');?></th>  
                                            <th><?php _e('Saving','logo-price-calculation');?></th>  
                                        </tr>
                                        <tr>
                                            <td>24</td>
                                            <td>0%</td>
                                        </tr>
                                        <tr>
                                            <td>75</td>
                                            <td>7,87%</td>
                                        </tr>
                                        <tr>
                                            <td>150</td>
                                            <td>10,39%</td>
                                        </tr>
                                        <tr>
                                            <td>300</td>
                                            <td>12,79%</td>
                                        </tr>
                                        <tr>
                                            <td>1000</td>
                                            <td>14,59%</td>
                                        </tr>
                                    <tbody>    
                            </table>
                        </div>
                    </div>
                <?php
                $html = ob_get_clean();
            }
            return $html;
        }

        public function woocommerce_ajax_add_to_cart() {
            $product_id        = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $_POST['product_id'] ) );
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
            // print_r($variations);
            $lpc_product_price = $_POST['lpc_product_price'];
            $lpc_total_logo_price = $_POST['lpc_total_logo_price'];
            $lpc_show_logo_price = $lpc_total_logo_price * $quantity;
            $array_value = array(
                'lpc_total_logo_price' => $lpc_total_logo_price,
                'lpc_product_price'    => $lpc_product_price,
                'lpc_show_logo_price'  => $lpc_show_logo_price,
                'size_name'            => $json_sizetotal,
                'lpc_quantity'         => $quantity,
                'lpc_extra_category'   => $extra_category,
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
            wp_die();
        }
        public function lpc__custom_price_refresh($cart_object) {
            foreach ( $cart_object->get_cart() as $item ) {
                if( array_key_exists( 'lpc_total_logo_price', $item ) ) {
                    $get_price = $item[ 'data' ]->get_price();
                    $total = $get_price + $item['lpc_total_logo_price'] ;
                    if ( $item['lpc_extra_category'] == '1' ) {
                        $total = $this->parcentange_condition($item['lpc_quantity'],$total);
                    }
                    $item['data']->set_price($total);
                }
            }
        }

        public function parcentange_condition( $quantity, $get_price ) {
            if ( $quantity >= 1000 ) {
                return $this->percentance_calculation('14.59', $get_price );
            } else if( $quantity >= 300 && $quantity < 1000 ) {
                return $this->percentance_calculation('12.79', $get_price );
            } else if ( $quantity >= 150 && $quantity < 300 ) {
                return $this->percentance_calculation('10.39', $get_price );
            } else if ( $quantity >= 75 && $quantity < 150 ) {
                return $this->percentance_calculation('7.87', $get_price );
            }else {
                return $get_price;
            }
        }

        public function percentance_calculation( $percentage, $get_price ) {
			$new_width     = ( $get_price * $percentage ) / 100;
			$final_price   = $get_price -  $new_width;
			return $final_price;
        }
        

        public function get_product_category_by_id( $category_id ) {
            $term = get_term_by( 'id', $category_id, 'product_cat', 'ARRAY_A' );
            return $term['name'];
        }


        public function category_option1($repetar_field_value) {
        ?>
            <tbody>
                <tr>
                    <th class="label"><label for="size"><?php _e("Logo 1:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="size" class="lpc_logo_main_select" name="lpc_attribute_size" >
                            <option value="none" selected="selected" >-- I don't want a logo --</option>
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
                                        printf('<option value="%s" class="attached enabled">%s</option>',$values['option_value'],$values['option_name']); 
                                    }
                                ?>
                            </select>						
                        </td>
                        <?php
                            $ij++;
                        }
                    ?>
                </tr>
                <tr>
                    <th class="label"><label for="color"><?php _e("Logo 2:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="color" class="lpc_logo_main_select2" name="lpc_attribute_size4" >
                            <option value="none" selected="selected">-- I don't want a logo --</option>
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
                                        printf('<option value="%s" class="attached enabled">%s</option>',$values['option_value'],$values['option_name']); 
                                    }
                                ?>
                            </select>						
                        </td>
                        <?php
                            $ji++;
                        }
                    ?>
                </tr>
            </tbody>
        <?php
        }
        public function category_option2($repetar_field_value) {
        ?>
            <tbody>
                <tr>
                    <th class="label"><label for="size"><?php _e("Logo 1:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="size" class="lpc_logo_main_select" name="lpc_attribute_size" >
                            <option value="none" selected="selected">-- I don't want a logo --</option>
                            <?php
                                $i = 0;
                                foreach ( $repetar_field_value['common_category_options']['logo_1']['logo_options_repeater'] as $logoName ) {
                                    printf('<option value="%s" class="%s">%s</option>',"lpc_logo1_parents_$i","lpc_logo1_parentss_$i", $logoName['logo_name_repeater_1']);
                                $i++;
                                }
                            ?>
                        </select>						
                    </td>
                    <?php
                        $ij = 0;
                        foreach ( $repetar_field_value['common_category_options']['logo_1']['logo_options_repeater'] as $logowrap ) {  
                        ?>
                        <td class="<?php echo "lpc_logo1_parents_$ij" ?>">
                            <select id="size" class="<?php echo "lpc_logo1_parentss_$ij" ?>" name="<?php echo "lpc_logo1_parents_$ij" ?>" >
                                <?php
                                    foreach($logowrap['other_option_repeater'] as $values ) {
                                        printf('<option value="%s" class="attached enabled">%s</option>',$values['option_value_repeater_1'],$values['option_name_repeater_1']); 
                                    }
                                ?>
                            </select>						
                        </td>
                        <?php
                            $ij++;
                        }
                    ?>
                </tr>
                <tr>
                    <th class="label"><label for="color"><?php _e("Logo 2:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="color" class="lpc_logo_main_select2" name="lpc_attribute_size4" >
                            <option value="none" selected="selected">-- I don't want a logo --</option>
                            <?php
                                $j = 0;
                                foreach ( $repetar_field_value['common_category_options']['logo_2']['logo_options'] as $logoName ) {
                                    printf('<option value="%s" class="%s">%s</option>',"lpc_logo2_parents_$j","lpc_logo2_parentss_$j", $logoName['logo_name']);
                                $j++;
                                }
                            ?>
                        </select>
                    </td>
                    <?php
                        $ji = 0;
                        foreach ( $repetar_field_value['common_category_options']['logo_2']['logo_options'] as $logowrap ) {  
                        ?>
                        <td class="<?php echo "lpc_logo2_parents_$ji" ?>">
                            <select id="size" class="<?php echo "lpc_logo2_parentss_$ji" ?>" name="<?php echo "lpc_logo2_parents_$ji" ?>" >
                                <?php
                                    foreach($logowrap['other_option'] as $values ) {
                                        printf('<option value="%s" class="attached enabled">%s</option>',$values['option_value'],$values['option_name']); 
                                    }
                                ?>
                            </select>						
                        </td>
                        <?php
                            $ji++;
                        }
                    ?>
                </tr>
            </tbody>
            <?php
        }
        public function category_option3($repetar_field_value) {
            ?>
            <tbody>
                <tr>
                    <th class="label"><label for="size"><?php _e("Logo 1:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="size" class="lpc_logo_main_select" name="lpc_attribute_size" >
                            <option value="none" selected="selected">-- I don't want a logo --</option>
                            <?php
                                $i = 0;
                                foreach ( $repetar_field_value['common_category_options_two']['logo_1_common_tow']['logo_options_repeater_common_tow'] as $logoName ) {
                                    printf('<option value="%s" class="%s">%s</option>',"lpc_logo1_parents_$i","lpc_logo1_parentss_$i", $logoName['logo_name_repeater_1_common_tow']);
                                $i++;
                                }
                            ?>
                        </select>						
                    </td>
                    <?php
                        $ij = 0;
                        foreach ( $repetar_field_value['common_category_options_two']['logo_1_common_tow']['logo_options_repeater_common_tow'] as $logowrap ) {  
                        ?>
                        <td class="<?php echo "lpc_logo1_parents_$ij" ?>">
                            <select id="size" class="<?php echo "lpc_logo1_parentss_$ij" ?>" name="<?php echo "lpc_logo1_parents_$ij" ?>" >
                                <?php
                                    foreach($logowrap['other_option_repeater_common_tow'] as $values ) {
                                        printf('<option value="%s" class="attached enabled">%s</option>',$values['option_value_repeater_1_two_common'],$values['option_name_repeater_1_common_two']); 
                                    }
                                ?>
                            </select>						
                        </td>
                        <?php
                            $ij++;
                        }
                    ?>
                </tr>
                <tr>
                    <th class="label"><label for="color"><?php _e("Logo 2:","logo-price-calculation")?></label></th>
                    <td class="value">
                        <select id="color" class="lpc_logo_main_select2" name="lpc_attribute_size4" >
                            <option value="none" selected="selected">-- I don't want a logo --</option>
                            <?php
                                $j = 0;
                                foreach ( $repetar_field_value['common_category_options_two']['logo_2_two_common']['logo_options_repeater_common_two'] as $logoName ) {
                                    printf('<option value="%s" class="%s">%s</option>',"lpc_logo2_parents_$j","lpc_logo2_parentss_$j", $logoName['logo_name_reapeater_two_2']);
                                $j++;
                                }
                            ?>
                        </select>
                    </td>
                    <?php
                        $ji = 0;
                        foreach ( $repetar_field_value['common_category_options_two']['logo_2_two_common']['logo_options_repeater_common_two'] as $logowrap ) {  
                        ?>
                        <td class="<?php echo "lpc_logo2_parents_$ji" ?>">
                            <select id="size" class="<?php echo "lpc_logo2_parentss_$ji" ?>" name="<?php echo "lpc_logo2_parents_$ji" ?>" >
                                <?php
                                    foreach($logowrap['other_option_reapeater_common_two'] as $values ) {
                                        printf('<option value="%s" class="attached enabled">%s</option>',$values['option_value_repeater_fields'],$values['option_name_repeater_field']); 
                                    }
                                ?>
                            </select>						
                        </td>
                        <?php
                            $ji++;
                        }
                    ?>
                </tr>
            </tbody>
            <?php
        }
    }
    new LPC_Frontend_Hook();
}