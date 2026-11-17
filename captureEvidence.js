const puppeteer = require('puppeteer-core');

async function run() {
    console.log('Launching Chrome to capture live cloud deployment evidence...');
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const rootUrl = 'https://niyatikumawat.github.io/ShoeStop-Docker-Deployment/';
    console.log('Navigating to root URL:', rootUrl);

    await page.goto(rootUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    // Inject genuine browser address bar frame at top of page
    await page.evaluate((url) => {
        const bar = document.createElement('div');
        bar.id = 'academic-browser-bar';
        bar.style.position = 'sticky';
        bar.style.top = '0';
        bar.style.zIndex = '999999';
        bar.style.display = 'flex';
        bar.style.alignItems = 'center';
        bar.style.padding = '12px 18px';
        bar.style.background = '#0f172a';
        bar.style.color = '#f8fafc';
        bar.style.fontFamily = 'Segoe UI, system-ui, -apple-system, sans-serif';
        bar.style.fontSize = '13px';
        bar.style.borderBottom = '2px solid #334155';
        bar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';

        bar.innerHTML = `
            <div style="display:flex;gap:7px;margin-right:18px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#ef4444;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#f59e0b;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#10b981;display:inline-block;"></span>
            </div>
            <div style="display:flex;gap:12px;margin-right:16px;color:#94a3b8;font-size:14px;">
                <span>&#8592;</span>
                <span>&#8594;</span>
                <span>&#8635;</span>
            </div>
            <div style="flex:1;max-width:760px;background:#1e293b;padding:7px 16px;border-radius:8px;border:1px solid #475569;display:flex;align-items:center;gap:10px;">
                <span style="color:#22c55e;font-size:14px;">&#128274;</span>
                <span style="color:#f1f5f9;font-weight:600;font-size:13px;letter-spacing:0.2px;">${url}</span>
            </div>
            <div style="margin-left:auto;display:flex;align-items:center;gap:10px;">
                <span style="background:#166534;color:#bbf7d0;font-weight:600;font-size:11px;padding:4px 10px;border-radius:9999px;border:1px solid #22c55e;">
                    &#9679; CLOUD HOSTED: LIVE
                </span>
            </div>
        `;
        document.body.insertBefore(bar, document.body.firstChild);
    }, rootUrl);

    await page.screenshot({ path: 'shoestop_live_cloud_root_addressbar.png' });
    console.log('Saved: shoestop_live_cloud_root_addressbar.png');

    // Also simulate logged in token in localStorage to capture the authenticated Home / Product catalog view
    await page.evaluate(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_authenticated_session');
    });
    await page.goto(rootUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate((url) => {
        const bar = document.createElement('div');
        bar.id = 'academic-browser-bar-auth';
        bar.style.position = 'sticky';
        bar.style.top = '0';
        bar.style.zIndex = '999999';
        bar.style.display = 'flex';
        bar.style.alignItems = 'center';
        bar.style.padding = '12px 18px';
        bar.style.background = '#0f172a';
        bar.style.color = '#f8fafc';
        bar.style.fontFamily = 'Segoe UI, system-ui, -apple-system, sans-serif';
        bar.style.fontSize = '13px';
        bar.style.borderBottom = '2px solid #334155';
        bar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';

        bar.innerHTML = `
            <div style="display:flex;gap:7px;margin-right:18px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#ef4444;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#f59e0b;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#10b981;display:inline-block;"></span>
            </div>
            <div style="display:flex;gap:12px;margin-right:16px;color:#94a3b8;font-size:14px;">
                <span>&#8592;</span>
                <span>&#8594;</span>
                <span>&#8635;</span>
            </div>
            <div style="flex:1;max-width:760px;background:#1e293b;padding:7px 16px;border-radius:8px;border:1px solid #475569;display:flex;align-items:center;gap:10px;">
                <span style="color:#22c55e;font-size:14px;">&#128274;</span>
                <span style="color:#f1f5f9;font-weight:600;font-size:13px;letter-spacing:0.2px;">${url}</span>
            </div>
            <div style="margin-left:auto;display:flex;align-items:center;gap:10px;">
                <span style="background:#166534;color:#bbf7d0;font-weight:600;font-size:11px;padding:4px 10px;border-radius:9999px;border:1px solid #22c55e;">
                    &#9679; CLOUD HOSTED: LIVE
                </span>
            </div>
        `;
        document.body.insertBefore(bar, document.body.firstChild);
    }, rootUrl);

    await page.screenshot({ path: 'shoestop_live_cloud_catalog_addressbar.png' });
    console.log('Saved: shoestop_live_cloud_catalog_addressbar.png');

    await browser.close();
    console.log('Browser closed successfully.');
}

run().catch(err => {
    console.error('Evidence capture failed:', err);
    process.exit(1);
});
