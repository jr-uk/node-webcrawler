import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main(){
    const websiteURL = process.argv[2];

    if (process.argv.length > 3 || !process.argv[2]) {
        console.log('Usage: node index.js <URL>');
        process.exit(1);
    }
    try {
        console.log(`websiteURL: ${websiteURL}`);
        new URL(websiteURL);
    } catch (error) {
        console.log(`Invalid URL ${websiteURL}`);
        process.exit(1);
    }

    try {
        let pages = {};
        const result = await crawlPage(websiteURL, websiteURL, pages);

        printReport(result);
    } catch (error) {
        console.log(`error: ${error}`);
        process.exit(1);
    }
}

main().catch(err => console.error(err));