export function printReport (pages) {
    const report = sortPages(pages);

    console.log(`\n${report.length} unique pages found:\n`);
    report.forEach(page => {
        console.log(`${page.count} ${page.url}`);
    });

    return report;
}

function sortPages(pages) {
    // Convert the object to an array of its values
    const pagesArray = Object.keys(pages).map(url => {
      return {
        url,
        count: pages[url].count
      };
    });
  
    // Sort the array based on the count property
    pagesArray.sort((a, b) => b.count - a.count);
  
    return pagesArray;
  }
  