import { saveConfig } from "@ionic/core";

export const endpoints = {
    Productcategory(): string {
        return 'categories';
    },
    signup(): string {
        return 'sign-up';
    },
    signin(): string {
        return 'sign-in';
    },
    resetpassword(): string {
        return 'forgot-password';
    },
    updatepassword(): string {
        return 'update-password';
    },
    Sub_cat(id): string {
        return 'sub-categories/' + id;
    },
    Add_Address(): string {
        return 'add-delivery-address'
    },
    Prod_list(catid, subcatid): string {
        return 'products/' + catid + '/' + subcatid
    },
    HomeProduct(): string {
        return 'all-products'

    },
    Prod_detail(id): string {
        return 'products-details/' + id
    },
    store(): string {
        return 'store-listing'
    },
    store_detail(storeid): string {
        return 'store-details/' + storeid
    },
    store_product(store_id, cat_title): string {
        return 'product-for-store/' + store_id + '/' + cat_title
    },
    AddtoCart(): string {
        return 'add-to-cart'
    },
    HomeBanner(): string {
        return 'banner'
    },
    GetCart(): string {
        return 'get-all-carts'
    },
    Search(): string {
        return 'autocompleteSearch'
    },
    UpdateCart(): string {
        return 'edit-cart'
    },
    Delcart(cartid): string {
        return 'delete-cart/' + cartid
    },
    Get_Delivery_Address(): string {
        return 'get-delivery-address'
    },
    Delete_address(add_id): string {
        return 'delete-delivery-address/' + add_id
    },
    Price_Detail(): string {
        return 'price-details'
    },
    Edit_Delivery_Address(add_id): string {
        return 'edit-delivery-address/' + add_id
    },
    Place_Order(): string {
        return 'place-order'
    },
    Order_list(): string {
        return 'get-orders'
    },
    Order_details(order_id): string {
        return 'get-order-details/' + order_id
    },
    Log_out(): string {
        return 'sign-out'
    },
    Account_Info(): string {
        return 'account-info'
    },
    Account_Info_Edit(): string {
        return 'account-info-edit'
    },
    Cancel_Order(): string {
        return 'order-cancel'
    },

    About_Us(): string {
        return 'about-us'
    },

    Exclude_Delivery_Charges(pick_up): string {
        return 'exclude-delivery-charge/' + pick_up
    },

    Rating_Review_save(): string {
        return 'save-store-rating'
    },

    Fetch_Rating(store_id): string {
        return 'get-store-review/' + store_id
    },
    Save_Card(): string {
        return 'save-card'
    },

    Get_Card(): string {
        return 'get-cards'
    },

    Del_Card(Card_id): string {
        return 'delete-card/' + Card_id
    },

    Product_Review(): string {
        return 'save-product-review'
    },
    Fetch_prod__Review(prod_id): string {
        return 'get-product-review/' + prod_id
    }




};
