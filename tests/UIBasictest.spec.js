const {test,expect}=require('@playwright/test');

                                                 

test('second Playwright Test', async ({page})=>
{
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products =  page.locator(".card-body");
    const cartPageProductName=page.locator(".cartSection h3");
    const bool="false";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
   const count=await products.count();
   for(let i=0; i<count; i++)
   {
    if(await products.nth(i).locator('b').textContent()===productName)
    {

       await  products.nth(i).locator('button').nth(1).click();  
       
        break;
    }

   }
    
await page.locator("[routerlink*='cart']").click();
const cartItemsCount=await cartPageProductName.count();
for(let k=0;k<cartItemsCount;k++)
{
    if(await cartPageProductName.nth(k).textContent()==="terer")
    {
     bool ="true";
    }
}
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially("ind");
await page.locator("//*[@class='ta-results list-group ng-star-inserted']/button").nth(1).waitFor();
const options=await page.locator("//*[@class='ta-results list-group ng-star-inserted']/button").count();
for(let l=0; l<options; l++)
{
    if( await page.locator("//*[@class='ta-results list-group ng-star-inserted']/button").nth(l).locator('span').textContent()===" India")
    {
         await page.locator("//*[@class='ta-results list-group ng-star-inserted']/button").nth(l).locator('span').click();
         break;
    }
}
await page.locator("text=Place Order ").click();
expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log("here is the "+orderId)
const modOrderId=orderId.replaceAll("|","");
console.log(modOrderId)
await page.locator("[routerlink='/dashboard/myorders']").nth(1).click();
await page.locator("tbody").waitFor();
const orders=await page.locator("//*[@scope='row']");
const orderCount=await orders.count();
console.log(orderCount)
for(let i=0; i<orderCount; i++)
{
   const orderIdText=await orders.nth(i).textContent();
    if(modOrderId.includes(orderIdText))
    {
        console.log("Order found")
        break;
    }
}
});                                                      
                                                