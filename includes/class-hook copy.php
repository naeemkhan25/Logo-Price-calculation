<?php

if ( ! class_exists('LPC_Frontend_Hook') ) {
    class LPC_Frontend_Hook {
        public function __construct() {
            add_filter( 'woocommerce_get_stock_html', [ $this, 'woocommerce_get_availability_class' ], 9999, 2 );
            add_action('wp_ajax_lpc_woocommerce_ajax_add_to_cart', [ $this,'woocommerce_ajax_add_to_cart']);
            add_action('wp_ajax_nopriv_lpc_woocommerce_ajax_add_to_cart', [$this,'woocommerce_ajax_add_to_cart']);
            add_action( 'woocommerce_before_calculate_totals', [$this,'lpc__custom_price_refresh'] );
        }
        public function logo_select_array($product_category) {
            return [
                'logo_1' => [
                    'name'  => 'Logo 1:',
                    'value' => [
                        'none' => [
                            'name' => "-- I don't want a logo --",
                            'value' => 'none',
                        ],
                        'color_1' => [
                            'name' => 'None',
                            'value' => [
                                'day1'=> [
                                    'name' => 'Day1',
                                    'value'=> '24',
                                ]
                            ]
                        ],
                        'color_2' => [
                            'name' => 'None',
                            'value' => [
                                'cday1'=> [
                                    'name' => 'CDay1',
                                    'value'=> '23',
                                ],
                                'cday1'=> [
                                    'name' => 'CDay1',
                                    'value'=> '31',
                                ],
                                'cday1'=> [
                                    'name' => 'CDay1',
                                    'value'=> '88',
                                ]
                            ]
                        ],
                    ] 

                ],
                'logo_2' => [
                    'name'  => 'Logo 1:',
                    'value' => [
                        'none' => [
                            'name' => 'None',
                            'value' => 'none',
                        ],
                        'color_1' => [
                            'name' => 'None',
                            'value' => [
                                'day1'=> [
                                    'name' => 'Day1',
                                    'value'=> '30',
                                ]
                            ]
                        ],
                        'color_2' => [
                            'name' => 'None',
                            'value' => [
                                'cday1'=> [
                                    'name' => 'CDay1',
                                    'value'=> '70',
                                ],
                                'cday1'=> [
                                    'name' => 'CDay1',
                                    'value'=> '40',
                                ],
                                'cday1'=> [
                                    'name' => 'CDay1',
                                    'value'=> '50',
                                ]
                            ]
                        ],
                    ] 
                ]
            ];
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
            print_r($product_category);
             $category_name = [];
             if( is_array($category_ids) ) {
                foreach ( $category_ids as $key =>$id ) {
                    $category_name[$key] = $this->get_product_category_by_id( $id );
                }
             }
             $repetar_field_value = get_field('logo_one_settings','option');
             print_r($repetar_field_value);

            //  print_r($category_ids);
            //  $codition = false;
            //  if ( in_array('liikelahjat',$category_name) ) {
            //     $codition = true;
            //  } else if ( in_array('vaatteet',$category_name)) {
            //     $codition = true;
            //  }
            //  if ( $codition == false ) {
            //     return $html;
            //  }

            $sale_price = $product->get_price();
            $quantity = $product->get_stock_quantity();
            $logo_select_array = $this->logo_select_array($product_category);

            
            if ( is_product() ) {
                ob_start();
                    ?>
                    <div class="extra_calculation_button_wrap">
                        <button type="button" class="lpc_calculate_price_button button"><?php _e("Calculate The Price",'logo-price-calculation');?></button>
                        <input type="hidden" name="lpc_product_price" value="<?php echo esc_attr( $sale_price ); ?>" class="lpc_product_price">
                        <input type="hidden" name="lpc_total_logo_price" value="0" class="lpc_total_logo_price" />
                        <div class="lpc_select_option" style="display:none">
                            <table class="lpc_variations lpc_table_on_of" cellspacing="0" role="presentation">
                                <tbody>
                                        <tr>
                                            <th class="label"><label for="size"><?php _e("Logo 1:","logo-price-calculation")?></label></th>
                                            <td class="value">
                                                <select id="size" class="lpc_logo_main_select" name="lpc_attribute_size" >
                                                    <option value="none" selected="selected">-- I don't want a logo --</option>
                                                    <option value="lpc_laser_engraving" class="lpc_laser_engraving attached enabled">Laser engraving D1</option>
                                                    <option value="lpc_up_Printing" class="lpc_up_Printing attached enabled">UV printing UV7</option>
                                                </select>						
                                            </td>
                                            <td class="lpc_laser_engraving_select" style="display:none">
                                                <select id="size" class="lpc_logo_chiled_select" name="lpc_attribute_size1" >
                                                    <option value="55" class="attached enabled">D1 Penes</option>
                                                </select>						
                                            </td>
                                            <td class="lpc_up_Printing_select" style="display:none">
                                                <select id="size" class="lpc_logo_chiled_select2" name="lpc_attribute_size2">
                                                    <option value="15" class="lpc_laser_CMYK_UV7 attached enabled">CMYK UV7</option>
                                                    <option value="20" class="lpc_laser_CMYK_Gloss_UV7 attached enabled">CMYK+Gloss UV7</option>
                                                    <option value="25" class="lpc_laser_CMYK_white_UV7 attached enabled">CMYK+white UV7</option>
                                                    <option value="26" class="lpc_CMYK_White_Gloss_UV7 attached enabled">CMYK+White+Gloss UV7</option>
                                                </select>					
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="label"><label for="color"><?php _e("Logo 2:","logo-price-calculation")?></label></th>
                                            <td class="value">
                                                <select id="color" class="lpc_logo_main_select2" name="lpc_attribute_size4" >
                                                    <option value="none" selected="selected">-- I don't want a logo --</option>
                                                    <option value="lpc_laser_engraving" class="lpc_laser_engraving attached enabled">Laser engraving D1</option>
                                                    <option value="lpc_up_Printing" class="lpc_up_Printing attached enabled">UV printing UV7</option>
                                                </select>
                                            </td>
                                            <td class="lpc_laser_engraving_select2" style="display:none">
                                                <select id="size" class="lpc_logo2_chiled_select" name="lpc_attribute_size5" >
                                                    <option value="51" class="attached enabled">D1 Penes</option>
                                                </select>						
                                            </td>
                                            <td class="lpc_up_Printing_select2" style="display:none">
                                                <select id="size" class="lpc_logo2_chiled_select2" name="lpc_attribute_size6" >
                                                    <option value="43" class="lpc_laser_CMYK_UV7 attached enabled">CMYK UV7</option>
                                                    <option value="20" class="lpc_laser_CMYK_Gloss_UV7 attached enabled">CMYK+Gloss UV7</option>
                                                    <option value="25" class="lpc_laser_CMYK_white_UV7 attached enabled">CMYK+white UV7</option>
                                                    <option value="26" class="lpc_CMYK_White_Gloss_UV7 attached enabled">CMYK+White+Gloss UV7</option>
                                                </select>					
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                            <div class="lpc_product_price_calculating_table">
                                <table class="lpc_border-none">
                                    <tr>
                                        <th><?php _e('The price of the product','logo-price-calculation');?></th>
                                        <th><?php _e('Number','logo-price-calculation');?></th>
                                        <th><?php _e('Logo printing','logo-price-calculation');?></th>
                                        <th><?php _e('In total','logo-price-calculation');?></th>
                                        <th><?php _e('Delivery','logo-price-calculation');?></th>
                                    </tr>
                                    <tr>
                                        <td class="lpc_price_of_product"><?php echo '€'.esc_attr( $sale_price );?></td>
                                        <td class="lpc_total_quantity"><?php echo esc_attr( '1' );?></td>
                                        <td class="lpc_logo_printing">1</td>
                                        <td class="lpc_inTotal">1</td>
                                        <td class="lpc_delivery_" ><?php _e('14 days','logo-price-calculation'); ?></td>
                                    </tr>
                                </table>
                            </div>
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
            $lpc_show_logo_price = $lpc_total_logo_price * $quantity;
            $array_value = array(
                'lpc_total_logo_price' => $lpc_total_logo_price,
                'lpc_product_price'    => $lpc_product_price,
                'lpc_show_logo_price'  => $lpc_show_logo_price
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
                    $item['data']->set_price($total);
                }
            }
        }

        public function get_product_category_by_id( $category_id ) {
            $term = get_term_by( 'id', $category_id, 'product_cat', 'ARRAY_A' );
            return $term['name'];
        }
    }
    new LPC_Frontend_Hook();
}