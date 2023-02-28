<?php
// Add custom Theme Functions here


/*
*Parcentage Discount
*ON Sales products
*/
// function reg_add_percentage_to_sale_badge( $html, $post, $product ) {

//   if( $product->is_type('variable')){
//       $percentages = array();

//       // Get all variation prices
//       $prices = $product->get_variation_prices();

//       // Loop through variation prices
//       foreach( $prices['price'] as $key => $price ){
//           // Only on sale variations
//           if( $prices['regular_price'][$key] !== $price ){
//               // Calculate and set in the array the percentage for each variation on sale
//               $percentages[] = round( 100 - ( floatval($prices['sale_price'][$key]) / floatval($prices['regular_price'][$key]) * 100 ) );
//           }
//       }
//       // We keep the highest value
//       $percentage = max($percentages) . '%';

//   } elseif( $product->is_type('grouped') ){
//       $percentages = array();

//       // Get all variation prices
//       $children_ids = $product->get_children();

//       // Loop through variation prices
//       foreach( $children_ids as $child_id ){
//           $child_product = wc_get_product($child_id);

//           $regular_price = (float) $child_product->get_regular_price();
//           $sale_price    = (float) $child_product->get_sale_price();

//           if ( $sale_price != 0 || ! empty($sale_price) ) {
//               // Calculate and set in the array the percentage for each child on sale
//               $percentages[] = round(100 - ($sale_price / $regular_price * 100));
//           }
//       }
//       // We keep the highest value
//       $percentage = max($percentages) . '%';

//   } else {
//       $regular_price = (float) $product->get_regular_price();
//       $sale_price    = (float) $product->get_sale_price();

//       if ( $sale_price != 0 || ! empty($sale_price) ) {
//           $percentage    = round(100 - ($sale_price / $regular_price * 100)) . '%';
//       } else {
//           return $html;
//       }
//   }
//   // return '<span class="onsale">' . esc_html__( '-', 'woocommerce' ) . ' ' . $percentage . '</span>';

//   return '<div class="callout badge badge-circle"><div class="badge-inner secondary on-sale"><span class="onsale">'  . esc_html__( '-', 'woocommerce' ) . ' ' . $percentage . '</span></div></div>';
// }
// add_filter( 'woocommerce_sale_flash', 'reg_add_percentage_to_sale_badge', 20, 3 );


add_action('wp_head', 'rengaskirppis_get_custom_javascript_init');
function rengaskirppis_get_custom_javascript_init() {
    ?>		
	<script>
		jQuery(document).ready(function() {
             if (jQuery( "body" ).hasClass('woocommerce-shop')) {
				 
				 jQuery( "#main .category-page-row .large-3" ).remove();
				 jQuery( "#main .category-page-row div" ).removeClass( 'large-9');
				jQuery( "#main .category-page-row div" ).addClass( 'large-12');
			} else {
			  jQuery( "#foo" ).addClass( 'className');
			}
		 });
	</script>
	<?php
}

function rengaskirppis_sidebar_register(){
    register_sidebar(
        array(
        'name'          => __('Top Sidebar','rengaskirppis'),
        'id'            => 'top-sidebar-1',
        'description'=>__("Top sidebar"),
        'before_widget' => '<div>',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="rounded">',
        'after_title'   => '</h2>',
    ) );
}
add_action("widgets_init","rengaskirppis_sidebar_register");

// function ced_quantity_wp_head() {
//     global $wp_query;
//     // get the query object
//     $cat_obj = $wp_query->get_queried_object();
//     print_r($cat_obj);
//     // die();
// }
// add_action( 'wp_head', 'ced_quantity_wp_head' );




