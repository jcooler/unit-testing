const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

//*Unit test example
test('This should output both the name of the user, and their age', () => {
const text = generateText('Jon', 31)
expect(text).toBe('Jon (31 years old)');
const text2 = generateText('Nikki', 28)
expect(text2).toBe('Nikki (28 years old)');
});

//*Integration test example
test('Should generate a valid text output', () => {
const text = checkAndGenerate('Jon', 31);
expect(text).toBe('Jon (31 years old)');
});


//*e2e
test('Should create an element with proper text and class', async () =>  {

const browser = await puppeteer.launch({
headless: true,
// slowMo: 80,
// args: ['--window-size=1920,1080']
});
const page = await browser.newPage();
await page.goto('file:///Users/jon/Dev/unit%20testing/example/index.html');
await page.click('input#name');
await page.type('input#name', 'Jon');
await page.click('input#age');
await page.type('input#age', '31');
await page.click('#btnAddUser');
const final = await page.$eval('.user-item', el => el.textContent); 
expect(final).toBe('Jon (31 years old)');
}, 10000);

