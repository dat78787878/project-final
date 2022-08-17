import scrapy
from tripadvisor.items import HotelItem

class SingleHotelSpider(scrapy.Spider):
    name = 'single_hotel'
    
    start_urls = ['https://www.tripadvisor.com.vn/Hotel_Review-g293924-d17627438-Reviews-La_Sinfonia_del_Rey_Hotel_Spa-Hanoi.html']
    

    def parse(self, response):
        item = HotelItem()

        item['hotel_name'] =  response.css('h1.fkWsC::text').get()
        item['hotel_addr'] = response.css('span.ceIOZ::text').get()
        item['hotel_price'] = response.css('div.cBLdK div.fzleB::text').get() 
        item['hotel_imagelink'] = response.css('img.bMGfJ::attr(src)').get()
        item['hotel_orderlink'] = response.request.url
        yield item
        
        yield {
            'hotel_name':  response.css('h1.fkWsC::text').get(),
            'comment' : response.css('q.XllAv span::text').getall()
        }
        next_page =  response.css('a.next::attr(href)').get()
        yield response.follow(next_page, callback=self.start_scraping)

    def start_scraping(self, response):
        yield {
            'hotel_name':  response.css('h1.fkWsC::text').get(),
            'comment' : response.css('q.XllAv span::text').getall()
        }

        next_page =  response.css('a.next::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.start_scraping)
