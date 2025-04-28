const { test, expect } = require('@playwright/test');
const ClientPage = require('../pageobjects/ClientPage');

test('second Playwright Test', async ({ page }) => {
    const email = "anshika@gmail.com";
    const password = "Iamking@000";
    const productName = 'ZARA COAT 3';
    const country = "India";

    const clientPage = new ClientPage(page);

    // Login
    await clientPage.login(email, password);

    // Add product to cart
    await clientPage.addProductToCart(productName);

    // Verify product in cart
    const isProductInCart = await clientPage.verifyProductInCart(productName);
    expect(isProductInCart).toBeTruthy();

    // Checkout
    await clientPage.checkout(country);

    // Verify order confirmation
    const confirmationText = await clientPage.getOrderConfirmation();
    expect(confirmationText).toContain("Thankyou for the order.");

    // Get order ID
    const orderId = await clientPage.getOrderId();
    console.log("Order ID:", orderId);

    // Verify order in My Orders
    const isOrderInMyOrders = await clientPage.verifyOrderInMyOrders(orderId);
    expect(isOrderInMyOrders).toBeTruthy();
});