import scrapy
from tripadvisor.items import HotelItem


class BookingSpider(scrapy.Spider):
    name = 'list'
    page_number = 2
    allowed_domains = ['www.tripadvisor.com.vn']
    start_urls = ['https://www.tripadvisor.com.vn/Hotels-g293924-Hanoi-Hotels.html']
    

    def parse(self, response):
        # for hotel in response.css('span.listItem').extract():
        #     detail_page =  hotel.css('a.BMQDV::attr(href)::text').get()
        #     skip_page = response.urljoin(detail_page)
        #     yield response.follow(skip_page, callback=self.start_scraping)

        for item_url in response.css("div.jsTLT > a.BMQDV::attr(href)").extract():
            yield scrapy.Request(response.urljoin(item_url), callback=self.start_scraping) # Nếu có sản phẩm thì sẽ gọi tới function parse_macbook
        

        next_page =  response.css('a.next::attr(href)').get()
        if BookingSpider.page_number <= 1:
            BookingSpider.page_number += 1
            yield response.follow(next_page, callback=self.parse)

    def start_scraping(self, response):
        item = HotelItem()
        item['hotel_name'] =  response.css('h1.QdLfr::text').extract_first()
        item['hotel_addr'] = response.css('span.PTrfg::text').extract_first()
        item['hotel_imagelink'] = response.css('img::attr(src)').getall()[5]
        item['hotel_orderlink'] = response.request.url
        yield item

      

