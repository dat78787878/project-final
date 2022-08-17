# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class HotelItem(scrapy.Item):
    # define the fields for your item here like:
    hotel_name = scrapy.Field()
    hotel_addr = scrapy.Field()
    hotel_imagelink = scrapy.Field()
    source = scrapy.Field()
