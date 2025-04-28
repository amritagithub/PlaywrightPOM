class LoginPage{
constructor(page)
{
    this.signInButton= page.locator("#userEmail");
     page.locator("#userPassword").fill("Iamking@000");
     page.locator("[value='Login']").click();
}



}