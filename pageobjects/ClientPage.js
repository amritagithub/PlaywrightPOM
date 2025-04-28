class ClientPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");
        this.products = page.locator(".card-body");
        this.cartLink = page.locator("[routerlink*='cart']");
        this.cartPageProductName = page.locator(".cartSection h3");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryOptions = page.locator("//*[@class='ta-results list-group ng-star-inserted']/button");
        this.placeOrderButton = page.locator("text=Place Order ");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersLink = page.locator("[routerlink='/dashboard/myorders']");
        this.ordersTable = page.locator("tbody");
        this.orderRows = page.locator("//*[@scope='row']");
    }

    async login(email, password) {
        await this.page.goto("https://rahulshettyacademy.com/client");  
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async addProductToCart(productName) {
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('button').nth(1).click();
                break;
            }
        }
    }

    async verifyProductInCart(productName) {
        await this.cartLink.click();
        const cartItemsCount = await this.cartPageProductName.count();
        for (let k = 0; k < cartItemsCount; k++) {
            if (await this.cartPageProductName.nth(k).textContent() === productName) {
                return true;
            }
        }
        return false;
    }

    async checkout(country) {
        await this.checkoutButton.click();
        await this.countryInput.pressSequentially(country);
        await this.countryOptions.nth(1).waitFor();
        const optionsCount = await this.countryOptions.count();
        for (let l = 0; l < optionsCount; l++) {
            if (await this.countryOptions.nth(l).locator('span').textContent() === ` ${country}`) {
                await this.countryOptions.nth(l).locator('span').click();
                break;
            }
        }
        await this.placeOrderButton.click();
    }

    async getOrderConfirmation() {
        return await this.orderConfirmationText.textContent();
    }

    async getOrderId() {
        const orderId = await this.orderId.textContent();
        return orderId.replaceAll("|", "");
    }

    async verifyOrderInMyOrders(orderId) {
        await this.myOrdersLink.nth(1).click();
        await this.ordersTable.waitFor();
        const orderCount = await this.orderRows.count();
        for (let i = 0; i < orderCount; i++) {
            const orderIdText = await this.orderRows.nth(i).textContent();
            if (orderId.includes(orderIdText)) {
                return true;
            }
        }
        return false;
    }
}

module.exports = ClientPage;