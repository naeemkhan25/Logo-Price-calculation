<?php
/**
 * Variable product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/variable.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 6.1.0
 */

defined( 'ABSPATH' ) || exit; 

global $product;

$attribute_keys  = array_keys( $attributes );

do_action( 'woocommerce_logo_price_condition',$product, $attribute_keys );
$category_ids = $product->get_category_ids();
$parent_id = $product->get_id();
$i = 0;
$category_acf = [];
$condition = [];
if( is_array($category_ids) ) {
	foreach ( $category_ids as $key =>$id ) {
		$acf_value = get_fields("term_$id");
		if ( $acf_value != null && array_key_exists('logo_options_settings',$acf_value)){
			$logovalue1 = $acf_value['logo_options_settings']['vaatteet_category_options']['logo_1']['logo_options'];
			$logovalue2 = $acf_value['logo_options_settings']['vaatteet_category_options']['logo_2']['logo_options'];
			if (!empty($logovalue1) && !empty($logovalue2) ) {
				$category_acf[$i] = $acf_value['logo_options_settings'];
				$condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
				$i++;
			} else if(!empty($logovalue1)) {
				$category_acf[$i] = $acf_value['logo_options_settings'];
				$condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
				$i++;
			} else if (!empty($logovalue2)) {
				$category_acf[$i] = $acf_value['logo_options_settings'];
				$condition[$i] = array_key_exists('would_you_like_to_display_quantity_fields',$acf_value)? $acf_value['would_you_like_to_display_quantity_fields']: 'no';
				$i++;
			}
		}
	}
}
// print_r($attribute_keys);
// if (in_array('yes',$condition ) ) {
// 	if (isset($attributes['pa_koko'])) {
// 		unset( $attributes["pa_koko"] );
// 	}
// }

$variations_json = wp_json_encode( $available_variations );
$variations_attr = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );

do_action( 'woocommerce_before_add_to_cart_form' ); ?>

<form class="variations_form cart" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data' data-product_id="<?php echo absint( $product->get_id() ); ?>" data-product_variations="<?php echo $variations_attr; // WPCS: XSS ok. ?>">
	<?php do_action( 'woocommerce_before_variations_form' ); ?>

	<?php if ( empty( $available_variations ) && false !== $available_variations ) : ?>
		<p class="stock out-of-stock"><?php echo esc_html( apply_filters( 'woocommerce_out_of_stock_message', __( 'This product is currently out of stock and unavailable.', 'woocommerce' ) ) ); ?></p>
	<?php else : ?>
		<table class="variations" cellspacing="0" role="presentation">
			<tbody>
				<?php foreach ( $attributes as $attribute_name => $options ) : 
					?>
					<tr>
						<th class="label"><label for="<?php echo esc_attr( sanitize_title( $attribute_name ) ); ?>"><?php echo wc_attribute_label( $attribute_name ); // WPCS: XSS ok. ?></label></th>
						<td class="value">
							<?php
								wc_dropdown_variation_attribute_options(
									array(
										'options'   => $options,
										'attribute' => $attribute_name,
										'product'   => $product,
									)
								);
								echo end( $attribute_keys ) === $attribute_name ? wp_kses_post( apply_filters( 'woocommerce_reset_variations_link', '<a class="reset_variations" href="#">' . esc_html__( 'Clear', 'woocommerce' ) . '</a>' ) ) : '';
							?>
						</td>
					</tr>
				<?php 
			endforeach; ?>
			</tbody>
		</table>
		<?php
		if (in_array('yes',$condition )) {
					$found_product = [];
					$i = 0; 
					if ($parent_id > 0 ) {
					   $_product = wc_get_product( $parent_id );
					   $variations = $_product->get_children();
					   foreach( $variations as $child ) {
						   $variation_product = new WC_Product_Variation( $child );

						   $attribuites = $variation_product->get_attributes();
						   $product_avail  = $variation_product->get_availability();
						   $availability   = $product_avail['availability'];
						   $avail_class    = $product_avail['class'];
							if (array_key_exists('pa_vari',$attribuites) && array_key_exists('pa_koko',$attribuites)) {
								if (!empty($attribuites['pa_vari']) && !empty($attribuites['pa_koko']) ) {
									$color = $attribuites['pa_vari'];
									$found_product[$i][$color]['size'] = $attribuites['pa_koko'];
									$found_product[$i][$color]['product_id'] = $child;
									$found_product[$i][$color]['availability'] = $availability; 
									$found_product[$i][$color]['class'] = $availability;
									$i++;
								}
							}
					   }
					}
					?>
					<div class="quontity_update_option">
						<table id="lpc_quontity_size_total">
							<tbody>    
								<tr>
									<?php  
									foreach( $found_product as $key => $value ) {
										foreach($value as $key => $sizes) {
											printf('<td style="display:none"><input type="text" name="lpc_size_q" class="lpc_size_%s_%s lpc_size_%s" value="%s" id="lpc_option_hide_width-%s" /><label style="display:block;margin-top:5px">%s</label><input type="hidden" name="lpc_size_product_id" class="lpc_size_product_id" id="lpc_size_product_id-%s" value="%s" /> <p class="stock %s">%s</p></td>',$sizes['size'],$key,$sizes['size'],0,$key,strtoupper($sizes['size']),$sizes['size'],$sizes['product_id'],$sizes['class'],$sizes['availability']);	
										}
									}
									?>
									</tr>
								<tbody>    
						</table>
                    </div>
				<?php
				}
				?>
		<?php do_action( 'woocommerce_after_variations_table' ); ?>

		<div class="single_variation_wrap">
			<?php
				/**
				 * Hook: woocommerce_before_single_variation.
				 */
				do_action( 'woocommerce_before_single_variation' );

				/**
				 * Hook: woocommerce_single_variation. Used to output the cart button and placeholder for variation data.
				 *
				 * @since 2.4.0
				 * @hooked woocommerce_single_variation - 10 Empty div for variation data.
				 * @hooked woocommerce_single_variation_add_to_cart_button - 20 Qty and cart button.
				 */
				do_action( 'woocommerce_single_variation' );

				/**
				 * Hook: woocommerce_after_single_variation.
				 */
				do_action( 'woocommerce_after_single_variation' );
			?>
		</div>
	<?php endif; ?>

	<?php do_action( 'woocommerce_after_variations_form' ); ?>
</form>

<?php
do_action( 'woocommerce_after_add_to_cart_form' );
