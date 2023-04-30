import scrapy
class ExampleSpider(scrapy.Spider):
    name = 'example'
    page_number = 2
    start_urls = ['https://www.tripadvisor.com.vn/Hotels-g293924-Hanoi-Hotels.html']
    

    def parse(self, response):
        
        for item_url in response.css("div.jsTLT > a.BMQDV::attr(href)").extract():
            yield scrapy.Request(response.urljoin(item_url), callback=self.start_scraping) # Nếu có sản phẩm thì sẽ gọi tới function parse_macbook
        
        next_page =  response.css('a.next::attr(href)').get()
        if ExampleSpider.page_number <= 1:
            ExampleSpider.page_number += 1
            yield response.follow(next_page, callback=self.parse)

    def start_scraping(self, response):
       
        for comment in response.css('div.pBbQr'):
            yield {
                'hotel_name': response.css('h1.QdLfr::text').get(),
                'user_name': comment.css('a.uyyBf::text').get(),
                'time_comment': comment.css('span.teHYY::text').get(),
                'comment_detail':  comment.css('q.QewHA span::text').get(),
            }

        next_page =  response.css('a.next::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.start_scraping)
