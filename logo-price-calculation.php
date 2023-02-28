<?php
/**
 * Plugin Name: Product Logo Price Calculation
 * Plugin URI: 
 * Description: Calculation logo price
 * Version: 1.0.0
 * Author: Pilar
 * Author URI: 
 * Text Domain: logo-price-calculation
 * Domain Path: /languages
 * WC requires at least: 3.0.0
 * WC tested up to: 3.6.0
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
// define constants.
if ( ! defined( 'LPC_VERSION' ) ) {
	define( 'LPC_VERSION', '1.0.0' );
	define( 'LPC_PATH', plugin_dir_path( __FILE__ ) );
	define( 'LPC_INCLUDES', LPC_PATH . 'includes' );
	define( 'LPC_URL', plugin_dir_url( __FILE__ ) );
	define( 'LPC_ASSETS', LPC_URL . '/assets');
	define( 'LPC_FILE', __FILE__ );
}
register_activation_hook( LPC_FILE, 'lpc_active' );

/**
 * Insert plugin default inforamtion in database
 * 
 * @return void
 * @version 1.0.0
 */
function lpc_active() {
	lpc_insert_default_data();
	low_price_create_tables();
}
/**
 * Use for create datebase table
 *
 * @return void
 *
 * @version 1.0.0
 */
function low_price_create_tables() {
	global $wpdb;
	$wpdb->hide_errors();
	$table_name = $wpdb->prefix . 'low_price';
	$sql = "CREATE TABLE if not exists $table_name(
	id INT(11) NOT NULL AUTO_INCREMENT, product_id VARCHAR(1000), price VARCHAR(255),
	create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
	)";
	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta( $sql );
}
/**
 * Update plugin default data
 * 
 * @return void
 * @version 1.0.0
 */
 function lpc_insert_default_data() {
	$version         = get_option( 'lpc_version', '0' );
	$install_time    = get_option( 'lpc_install_time', '' );
	if ( empty( $version ) ) {
		update_option( 'lpc_version', LPC_VERSION );
	}
	if ( ! empty( $install_time ) ) {
		$date_format = get_option( 'date_format' );
		$time_format = get_option( 'time_format' );
		update_option( 'lpc_install_time', date( $date_format . ' ' . $time_format ) );
	}
	update_option( 'lpc_active', 1 );
}
function lpc_plugin_load() {

	// Load plugin file
	require_once( __DIR__ . '/includes/plugins.php' );
 
	// Run the plugin
	\LPC_CREATE\Plugin::instance();

}
add_action( 'plugins_loaded', 'lpc_plugin_load' );