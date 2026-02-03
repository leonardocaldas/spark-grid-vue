import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { resolve } from 'path'

const url = process.env.PLAYGROUND_URL ?? 'http://127.0.0.1:4173'
const outDir = resolve(process.cwd(), 'playground', 'screenshots')

const rows = [
    {
        id: 1,
        name: 'Brazil',
        iso3: 'BRA',
        iso2: 'BR',
        numeric_code: '076',
        phone_code: '+55',
        capital: 'Brasilia',
        currency: 'BRL'
    },
    {
        id: 2,
        name: 'United States',
        iso3: 'USA',
        iso2: 'US',
        numeric_code: '840',
        phone_code: '+1',
        capital: 'Washington',
        currency: 'USD'
    },
    {
        id: 3,
        name: 'Japan',
        iso3: 'JPN',
        iso2: 'JP',
        numeric_code: '392',
        phone_code: '+81',
        capital: 'Tokyo',
        currency: 'JPY'
    },
    {
        id: 4,
        name: 'Germany',
        iso3: 'DEU',
        iso2: 'DE',
        numeric_code: '276',
        phone_code: '+49',
        capital: 'Berlin',
        currency: 'EUR'
    },
    {
        id: 5,
        name: 'Australia',
        iso3: 'AUS',
        iso2: 'AU',
        numeric_code: '036',
        phone_code: '+61',
        capital: 'Canberra',
        currency: 'AUD'
    }
]

const responseBody = JSON.stringify({
    rows,
    total: rows.length,
    page: 1
})

const takeScreenshots = async () => {
    await mkdir(outDir, { recursive: true })

    const browser = await chromium.launch()

    const setupRoutes = async (page) => {
        await page.route('**/countries.json*', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: responseBody
            })
        })
    }

    const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    await setupRoutes(desktopPage)
    await desktopPage.goto(url, { waitUntil: 'networkidle' })
    await desktopPage.waitForSelector('.arcana-datatable')
    await desktopPage.waitForTimeout(800)
    await desktopPage.screenshot({ path: resolve(outDir, 'desktop.png'), fullPage: true })
    await desktopPage.close()

    const mobilePage = await browser.newPage({
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true
    })
    await setupRoutes(mobilePage)
    await mobilePage.goto(url, { waitUntil: 'networkidle' })
    await mobilePage.waitForSelector('.arcana-datatable')
    await mobilePage.waitForTimeout(800)
    await mobilePage.screenshot({ path: resolve(outDir, 'mobile.png'), fullPage: true })
    await mobilePage.close()

    await browser.close()
}

takeScreenshots().catch((error) => {
    console.error(error)
    process.exit(1)
})
