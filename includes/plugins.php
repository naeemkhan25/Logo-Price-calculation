<?php
namespace LPC_CREATE;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Plugin class.
 *
 * The main class that initiates and runs the addon.
 *
 * @since 1.0.0
 */
final class Plugin {
	/**
	 * Minimum PHP Version
	 *
	 * @since 1.0.0
	 * @var string Minimum PHP version required to run the addon.
	 */
	const MINIMUM_PHP_VERSION = '5.6.0';

	/**
	 * Instance
	 *
	 * @since 1.0.0
	 * @access private
	 * @static
	 * @var \LPC_CREATE\Plugin The single instance of the class.
	 */
	private static $_instance = null;

	/**
	 * Instance
	 *
	 * Ensures only one instance of the class is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 * @return \LPC_CREATE\Plugin An instance of the class.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;

	}

	/**
	 * Constructor
	 *
	 * Perform some compatibility checks to make sure basic requirements are meet.
	 * If all compatibility checks pass, initialize the functionality.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		if ( $this->is_compatible()) {
            $this->includes_files();
            $this->load_plugin_textdomain();
            add_action( 'wp_enqueue_scripts', [ $this, 'frontend_scripts' ] );
			
		}

	}

    public function frontend_scripts() {
        wp_enqueue_style( 'lpc_frontend_css', LPC_URL . 'assets/frontend.css', [],time(),false );

        if (function_exists('is_product') && is_product()) {
            wp_enqueue_script( 'lpc_frontends_js', LPC_URL . 'assets/frontends11.js', [ 'jquery' ], time(), false );
        }
      
    }
	/**
	 * Register screen ids This is to indicate that Stock Notifier is a wooComerce page.
	 *
	 * @param array $screen_ids stock notifier ids.
	 *
	 * @return mixed
	 */
	public function screen_ids_to_woocommerce( $screen_ids ) {
		// echo $screen_ids
		$screen_ids[] = 'toplevel_page_cq_quotation';

		return $screen_ids;
	}
    /**
     * Loaded plugin text domain for translation
     *
     * @return bool
     */
    public function load_plugin_textdomain() {
        $domain = 'logo-price-calculation';
        $dir    = untrailingslashit( WP_LANG_DIR );
        $locale = apply_filters( 'plugin_locale', get_locale(), $domain );
        $exists = load_textdomain( $domain, $dir . '/plugins/' . $domain . '-' . $locale . '.mo' );
        if ( $exists ) {
            return $exists;
        } else {
            load_plugin_textdomain( $domain, false, basename( dirname( __FILE__ ) ) . '/languages/' );
        }
    }

    public function includes_files() {
		require_once LPC_INCLUDES . '/functions.php';
		require_once LPC_INCLUDES . '/class-hook.php';
		// require_once LPC_INCLUDES . '/class-upload-logo.php';

    }
	/**
	 * Compatibility Checks
	 *
	 * Checks whether the site meets the addon requirement.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function is_compatible() {
		// Check for required PHP version
		if ( version_compare( PHP_VERSION, self::MINIMUM_PHP_VERSION, '<' ) ) {
			add_action( 'admin_notices', [ $this, 'admin_notice_minimum_php_version' ] );
			return false;
		}

		return true;

	}

	/**
	 * Admin notice
	 *
	 * Warning when the site doesn't have a minimum required PHP version.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_notice_minimum_php_version() {

		if ( isset( $_GET['activate'] ) ) unset( $_GET['activate'] );

		$message = sprintf(
			/* translators: 1: Plugin name 2: PHP 3: Required PHP version */
			esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'logo-price-calculation' ),
			'<strong>' . esc_html__( 'Logo Price Calculation', 'logo-price-calculation' ) . '</strong>',
			'<strong>' . esc_html__( 'PHP', 'logo-price-calculation' ) . '</strong>',
			 self::MINIMUM_PHP_VERSION
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

	}


	/**
	 * Check wooCommerce active or not.
	 *
	 * @return bool
	 */
	private static function is_woocommerce_activated() {
		$active_value = true;
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
			$active_value = true;
		} elseif ( is_plugin_active_for_network( 'woocommerce/woocommerce.php' ) ) {
			$active_value = true;
		} else {
			$active_value = false;
			$in_active_notice = sprintf( __('%sLogo Price Calculation is inactive.%s The %sWooCommerce plugin%s must be active for the %sLogo Price Calulcation %s to work . Please %sinstall & activate WooCommerce%s', 'logo-price-calculation' ), '<strong>', '</strong>', '<a target="_blank" href="http://wordpress.org/extend/plugins/woocommerce/">', '</a>', '<strong>', '</strong>', '<a href="' . admin_url( 'plugin-install.php?tab=search&s=woocommerce' ) . '">', '&nbsp;&raquo;</a>' );
		}

		/** Add notice and deactivate the plugin if woocommerce inactive */
		if ( ! $active_value ) {
			add_action( 'admin_notices', function () use ( $in_active_notice ) {
				?>
				<div class="notice notice-warning is-dismissible">
					<p><?php printf( $in_active_notice ); ?></p>
				</div>
				<?php
			});
				return $active_value;
		} else {
			return $active_value;
		}
	}
}