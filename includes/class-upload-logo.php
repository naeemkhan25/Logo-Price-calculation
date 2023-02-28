<?php


if ( ! class_exists('LPC_Logo_Upload')) {
    class LPC_Logo_Upload {
        public function __construct() {
            add_action( 'woocommerce_before_cart', [ $this, 'logo_upload'] );
            add_action('init', [ $this, 'logo_uploadss'] );
        }
        function logo_uploadss() {
            print_r($_POST);
            
        }

        public function logo_upload() {
            ?>
              <div class="lpc_logo_upload_container">
                <div class="lpc_upload_logo">
                    <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">
                        <tr class="woocommerce-cart-form__cart-item">
                            <td class="product-remove">
                                <label for="logo_upload1">Logo Upload 1</label><br>
                            </td>
                            <td class="product-remove">
                                <div id="upload">
                                    <input id="file" name="file" type="file">
                                </div>
                            </td>
                        </tr>
                        <tr class="woocommerce-cart-form__cart-item">
                            <td class="product-remove">
                                <label for="logo_upload1">Logo Upload 2</label><br>
                            </td>
                            <td class="product-remove">
                                <div id="upload">
                                    <input id="file" name="file" type="file">
                                </div>
                            </td>
                        </tr>
                        <tr class="woocommerce-cart-form__cart-item">
                            <td class="product-remove">
                                <label for="logo_upload1">Label Here</label><br>
                            </td>
                            <td class="product-remove">
                                <div id="upload">
                                <textarea id="lpc_text_area" name="lpc_text_area" rows="4" cols="auto" placeholder="Describe yourself here...">
                                </textarea>
                                </div>
                            </td>
                         
                        </tr>
                        <tr class="woocommerce-cart-form__cart-item">
                            <td class="product-remove">
                                <label for="logo_upload1"></label><br>
                            </td>
                            <td class="product-remove">
                                <input id="submit" name="submit" type="submit" value="Submit">
                            </td>
                        </tr>
                        
                    </table>
                    <div id="detail">
                        <div id="preview" style="height:100px;width:100px; display:none">
                        <img id="previewimg" src="" style="height:100px;width:100px;">
                    </div>
                    <div id="message">
                    </div>
                </div>
            </div>

        <?php
        }
    }
    new LPC_Logo_Upload();
}