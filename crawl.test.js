const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js');

test('normalizeURL', () => {
    expect(normalizeURL('https://www.example.com')).toBe('https://www.example.com');
    expect(normalizeURL('https://www.example.com/')).toBe('https://www.example.com');
    expect(normalizeURL('http://www.example.com')).toBe('https://www.example.com');
    expect(normalizeURL('http://www.example.com/')).toBe('https://www.example.com');

    expect(normalizeURL('https://www.example.com/foo')).toBe('https://www.example.com/foo');
    expect(normalizeURL('https://www.example.com/foo/')).toBe('https://www.example.com/foo');
    expect(normalizeURL('https://www.example.com/foo/bar')).toBe('https://www.example.com/foo/bar');
    expect(normalizeURL('https://www.example.com/foo/bar/')).toBe('https://www.example.com/foo/bar');

    expect(normalizeURL('https://www.example.com?')).toBe('https://www.example.com');
    expect(normalizeURL('https://www.example.com/?')).toBe('https://www.example.com');

    expect(normalizeURL('https://www.example.com?foo=bar')).toBe('https://www.example.com/?foo=bar');
    expect(normalizeURL('https://www.example.com/?foo=bar')).toBe('https://www.example.com/?foo=bar');
});

test('getURLsFromHTML', () => {
    expect(getURLsFromHTML('<a href="https://www.example.com">', "https://www.example.com")).toEqual(['https://www.example.com/']);

    expect(getURLsFromHTML('<a href="https://www.example.com/foo">', "https://www.example.com")).toEqual(['https://www.example.com/foo']);
    expect(getURLsFromHTML('<a href="/foo">', "https://www.example.com")).toEqual(['https://www.example.com/foo']);

    expect(getURLsFromHTML('<a href="https://www.example.com"> <a href="/foo">', "https://www.example.com")).toEqual(['https://www.example.com/', 'https://www.example.com/foo']);
})

test('crawlPage', () => {
    // Write tests for a function that takes a URL as an input and crawls that URL and gets a list of links from a refs (urls) and outputs them in a normalised format in an array
})