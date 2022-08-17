import scrapy


class ExampleSpider(scrapy.Spider):
    name = 'example'
    page_number = 2
    start_urls = ['https://www.tripadvisor.com.vn/Hotels-g293925-Ho_Chi_Minh_City-Hotels.html']
    

    def parse(self, response):
        
        for hotel in response.css('div.listing'):
            detail_page =  hotel.css('a.property_title::attr(href)').get()
            skip_page = response.urljoin(detail_page)
            yield response.follow(skip_page, callback=self.start_scraping)

        next_page =  response.css('a.next::attr(href)').get()
        if ExampleSpider.page_number <= 1:
            ExampleSpider.page_number += 1
            yield response.follow(next_page, callback=self.parse)

    def start_scraping(self, response):
        for comment in response.css('q.XllAv span::text').getall():
            yield {
                'hotel_name': response.css('h1.fkWsC::text').get(),
                'comment': comment,
                'source_name': 'Tripadvisor.com'
            }

        next_page =  response.css('a.next::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.start_scraping)
