<?php


function my_attribute_hider( $attributes ) {
    if ( isset( $attributes['pa_koko'] ) ){
        unset( $attributes['pa_koko'] );
    }
    return $attributes;
    }
add_filter( 'woocommerce_get_product_attributes', 'my_attribute_hider' );

function ced_quantity_wp_head() {
    global $wp_query;
    // get the query object
    $cat_obj = $wp_query->get_queried_object();
    if( is_object($cat_obj)&& $cat_obj->post_type == 'product' ) {
        $_product = wc_get_product( $cat_obj->ID );
        $category_ids = $_product->get_category_ids();
        $condition = [];
        $i = 0;
        if( is_array($category_ids) ) {
        foreach ( $category_ids as $key =>$id ) {
            $acf_value = get_fields("term_$id");
            if ( $acf_value != null && array_key_exists('logo_options_settings',$acf_value)){
                $logovalue1 = $acf_value['logo_options_settings']['vaatteet_category_options']['logo_1']['logo_options'];
                $logovalue2 = $acf_value['logo_options_settings']['vaatteet_category_options']['logo_2']['logo_options'];
                if (!empty($logovalue1) && !empty($logovalue2) ) {
                    $condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
                    $i++;
                } else if(!empty($logovalue1)) {
                    $condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
                    $i++;
                } else if (!empty($logovalue2)) {
                    $condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
                    $i++;
                }
            }
        }
        if ( in_array( 'yes', $condition ) ) {
            ?>
            <style type="text/css">.quantity, .buttons_added { width:0; height:0; display: none; visibility: hidden; }</style>
            <?php
        }
    }
  }
}
add_action( 'wp_head', 'ced_quantity_wp_head' );
