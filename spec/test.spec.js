import {Builder, By, Key, until} from 'selenium-webdriver'
import 'chromedriver';
import 'assert';


let page = {
        login : {
            username : 'username',
            password : 'password',
            loginButton : '/html/body/div/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button'
        },
        adminName : 'Admin',
        input: {
            nameInput : 'Admin',
            passwordInput: 'admin123',
            workShiftsInput: 'WorkShifts',
            timeFromInput: '06:00 AM',
            timeToInput: '06:00 PM',
            odisInput: 'Odis Adalwin',
    },
        admin : {
            topNavigationBar : {
                jobNavigationButton : '/html/body/div/div[1]/div[1]/header/div[2]/nav/ul/li[2]',
                workshiftName : 'Work Shifts'
            },
            workshift : {
                addButton : '/html/body/div/div[1]/div[2]/div[2]/div/div/div[1]/div/button',
                table : '.oxd-table-cell>div',
                deleteButton : '/html/body/div/div[1]/div[2]/div[2]/div/div/div[2]/div/div/button',
                confirmButton : '/html/body/div/div[3]/div/div/div/div[3]/button[2]'
            },
            addNewWorkshift: {
                name: '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/input',
                fromInput : '/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/div/div/input',
                toInput : '/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/div/div[1]/input',
                assInput : '/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div/div/div[2]/div/div[1]/input',
                prop : 'oxd-autocomplete-dropdown',
                saveButton : '/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[4]/button[2]'
                }
            }
}

const timeWait = 20000;
const yourBrowser = 'chrome';
const expectedFlagResult = 1;


async function scenarioOfTest(){
    let driver = await new Builder().forBrowser(yourBrowser).build()
    let flags = {
        authorisation : 0,
        workshiftPage : 0,
        addingForm : 0,
        check: 0,
        deletingForm: 1
    }
  
        await driver.get('https://opensource-demo.orangehrmlive.com/')
        await driver.wait(until.elementLocated(By.name(page.login.username)), timeWait).sendKeys(page.input.nameInput)
        await driver.wait(until.elementLocated(By.name(page.login.password)), timeWait).sendKeys(page.input.passwordInput)
        await driver.wait(until.elementLocated(By.xpath(page.login.loginButton)), timeWait).click()
        flags.authorisation = 1

        await driver.wait(until.elementLocated(By.partialLinkText(page.adminName)), timeWait).click()
        await driver.wait(until.elementLocated(By.xpath(page.admin.topNavigationBar.jobNavigationButton)), timeWait).click()
        await driver.wait(until.elementLocated(By.partialLinkText(page.admin.topNavigationBar.workshiftName)), timeWait).click()
        await driver.wait(until.elementLocated(By.xpath(page.admin.workshift.addButton)), timeWait).click()
        flags.workshiftPage = 1

        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.name)), timeWait).sendKeys(page.input.workShiftsInput);
        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.fromInput)), timeWait).clear();
        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.fromInput)), timeWait).sendKeys(page.input.timeFromInput);
        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.toInput)), timeWait).clear();
        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.toInput)), timeWait).sendKeys(page.input.timeToInput);
        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.assInput)), timeWait).sendKeys(page.input.odisInput);
        await driver.wait(until.elementLocated(By.className(page.admin.addNewWorkshift.prop)), timeWait).click()
        await driver.wait(until.elementLocated(By.xpath(page.admin.addNewWorkshift.saveButton)), timeWait).click()
        flags.addingForm = 1
        
        let list = await driver.wait(until.elementsLocated(By.css(page.admin.workshift.table), timeWait))
        for(let i = 0; i < list.length; i++){
            let checkWS = await list[i].getText()
            let checkFromTime = await list[i + 1].getText()
            let checkToTime = await list[i + 2].getText()
            if (checkWS === 'WorkShifts' && checkFromTime === '06:00' && checkToTime === '18:00' ){
                   flags.check = 1
                   await list[i-1].click()
                   break
                    }
                }

        await driver.wait(until.elementLocated(By.xpath(page.admin.workshift.deleteButton))).click()
        await driver.wait(until.elementLocated(By.xpath(page.admin.workshift.confirmButton))).click()
        list = await driver.wait(until.elementsLocated(By.css(page.admin.workshift.table), timeWait))
        for(let i = 0; i < list.length; i++){
            let text1 = await list[i].getText()
            if (text1 === 'WorkShifts'){
                flags.deletingForm = 0
            }
        }

        driver.quit()
        return flags   
}

let flags = await scenarioOfTest()



describe('Steps: ', () => {
    it('Step 1: Loggin', ()=>{
        expect(flags.authorisation).toBe(expectedFlagResult)
    })
    it('Step 2: Going to the page for adding a work shift', ()=>{
        expect(flags.workshiftPage).toBe(expectedFlagResult)
    })
    it('Step 3: Adding a new work shift', ()=>{
        expect(flags.addingForm).toBe(expectedFlagResult)
    })
    it('Step 4: Checking data entry', ()=>{
        expect(flags.check).toBe(expectedFlagResult)
    })
    it('Step 5: Deletion of entered data and check of deletion', ()=>{
        expect(flags.deletingForm).toBe(expectedFlagResult)
    })
})




