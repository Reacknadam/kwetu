from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    try:
        page.goto("http://localhost:5173/", timeout=15000)
        # Wait for 3 seconds to allow the page to render or show an error
        time.sleep(3)
        page.screenshot(path="jules-scratch/verification/homepage_debug.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
