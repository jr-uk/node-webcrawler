import { JSDOM } from 'jsdom';

export function normalizeURL(url) {
    const myURL = new URL(url);
    myURL.protocol = 'https';
    myURL.hash = '';
    
    // Remove trailing slash if it exists
    let newPathname = myURL.pathname.replace(/\/$/, '');

    // Add a trailing slash when there's a search query but no pathname
    if (myURL.search && !newPathname) {
        newPathname = '/';
    }
  
    // Manually construct the URL
    let normalizedURL = `${myURL.protocol}//${myURL.hostname}${newPathname}${myURL.search}`;
  
    //console.log(`input: ${url} output: ${normalizedURL}`);
    return normalizedURL;
}
  
export function getURLsFromHTML (htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    const urls = [];
    for (let link of links) {
        let newURL = new URL(link.href, baseURL);
        urls.push(normalizeURL(newURL.toString()));
       
    }
    return urls;
}

// Recursive function
export async function crawlPage (baseURL, currentURL, pages) {
    if (!currentURL.includes(baseURL)) {
        return pages;
    }
    console.log(`crawling ${currentURL}`);
    
    if (pages[currentURL] !== undefined) {
        pages[currentURL].count++;
    } else {
        pages[currentURL] = { count: 1, state: "unvisited" };
    }
    try {
        const response = await fetch(currentURL);
        const responseBody = await response.text();

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(!response.headers.get('content-type').startsWith('text/html')) {
            throw new Error(`Expected HTML, got ${response.headers.get('content-type')}`);
        }
        const pageURLs = getURLsFromHTML(responseBody, currentURL);

        for (let url of pageURLs) {
            if (pages[url] === undefined) {
                pages[url] = { count: 0, state: "unvisited" }; // Initialize if not present
            }
            
            if (pages[url].state === "unvisited") {
                pages[url].count++;
                pages[url].state = "visiting"; // Mark as "being visited"
                
                await crawlPage(baseURL, url, pages);
                
                pages[url].state = "visited"; // Mark as "done visiting"
            } else if (pages[url].state === "visiting") {
                console.log(`Cycle detected at ${url}`);
                pages[url].state = "visited"; // Mark the cycle node as visited
                continue;
            }            
        }
        
    } catch (error) {
        console.log(error);
    }

    return pages;
    
}

