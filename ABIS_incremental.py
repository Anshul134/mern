from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time,os
import datetime
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import re

driver = webdriver.Chrome()
driver.maximize_window()
save_path='E:\\DataSource\\PKM\\ABIS'
cockpit_name=''
date_obj=re.compile(r'\d\d/\d\d/\d\d\d\d')
date_FMT='%m-%d-%Y'
final_index=[]

urls=['https://nb.headlinespot.com/news_search/#results/query/brief=lillyinflam&category=Approvals,Biomarkers,Clinical%20Trials%20%26%20Research,Company%20News,Drug%20Spotlight,Government,Legal,Mergers%20%26%20Acquisitions,Partnerships%20%26%20Alliances,Submissions,Technology,Trends&index=priority&region=~any&n_days=365&limit=100&dedupe=deep',
      'https://nb.headlinespot.com/news_search/#results/query/brief=lillymanagedcare&category=Congress%2FFederal%20Legislation,Health%20Care%20Costs,Health%20Care%20Policy%2FReform,Health%20Insurers,Legal,Medicaid,Medicare,Mergers%20%26%20Acquisitions,Partnerships%20%26%20Alliances,Pricing%20and%20Reimbursement,Providers&index=priority&region=~any&n_days=365&limit=100&dedupe=deep',
      'https://nb.headlinespot.com/news_search/#results/query/brief=lillydisruptivetech&index=priority&region=~any&n_days=365&limit=100&dedupe=deep',
      'https://nb.headlinespot.com/news_search/#results/query/brief=onc&category=Approvals,Biomarkers,Clinical%20Trials%20%26%20Research,Company%20News,Drug%20Spotlight,Hospitals%20%26%20Cancer%20Centers,Immunotherapy,Legal,Partnerships%20%26%20Alliances,Technology,Trends&index=priority&region=~any&n_days=365&limit=100&dedupe=deep',
      'https://nb.headlinespot.com/news_search/#results/query/brief=lillypain&category=Approvals,Clinical%20Trials%20%26%20Research,Company%20News,Drug%20Spotlight,FDA,Government,Legal,Mergers%20%26%20Acquisitions,Migraine,Partnerships%20%26%20Alliances,Submissions,Technology,Trends&index=priority&region=~any&n_days=365&limit=100&dedupe=deep']

def get_content(cockpit_name,n):
	print "inside get content"
	number_of_docs=len(driver.find_elements_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode']"))
	for i in n:
		i=str(i)
		#print i,type(i)
		c="//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='abstract']".format(num=i)
		#print c
		abstract=driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='abstract']".format(num=i)).text
		title=driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/h2[@class='headline']/div[@class='headline-txt']".format(num=i)).text.strip()
		#print title
		detail_a_text=driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='detail']/a".format(num=i)).text.strip()
		#a_text=detail_a.text.strip()
		#print detail_a_text
		detail_a_url=driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='detail']/a".format(num=i)).get_attribute("href")
		#print detail_a_url
		#detail_date=result.find_element_by_xpath("//div[@class='detail']/span")
		detail_category=driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='detail']/span[@class='category-date']/span[@class='category']".format(num=i)).text.strip()
		#print detail_category
		detailed_date=driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='detail']/span[@class='category-date']/span[@class='nb-date']".format(num=i)).text.strip()
		#print detailed_date
		source_a=[]
		source_text=[]
		respective_date=[]
		#driver.find_elements_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='sources']/a".format(num=i)).text.split(",")
		if driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='sources']/a".format(num=i)):
			sources=driver.find_elements_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='sources']/a".format(num=i))
			#print len(sources)
			if len(sources)>=1:
				for each_a in sources:
					source_a.append(str(each_a.get_attribute("href")))
					source_text.append(each_a.text.strip())
					respective_date=date_obj.findall(driver.find_element_by_xpath("//div[@id='results']/div[@class='story-result select-story-mode'][{num}]/div[@class='story-content']/div[@class='sources']".format(num=i)).text)
		generate_xml(cockpit_name,title,abstract,detail_a_text,detail_a_url,detail_category,detailed_date,source_a,source_text,respective_date)

def pagination():
	#print "inside pagination"
	print "count -->"
	next_button=driver.find_element_by_xpath("//div[@id='paginate']/div/ul/li/a[contains(text(),'Next')]")
	next_button.click()

def generate_xml(cockpit_name,title,abstract,detail_a_text,detail_a_url,detail_category,detailed_date,sources_a,source_text,respective_date):
	print "inside generate xml"
	#count+=1
	r=ET.Element("ABIS")
	ET.SubElement(r,"title").text=title
	ET.SubElement(r,"snippet").text=abstract
	#ET.SubElement(r,"detail_a",attrib={"a":detail_a_url}).text=detail_a_text
	ET.SubElement(r,"category").text=detail_category
	ET.SubElement(r,"abis_pub_date").text=detailed_date
	ET.SubElement(r,"cockpit_name").text=cockpit_name
	#print len(sources_a)
	if len(sources_a)>0:
		for i in range(len(respective_date)):
			ET.SubElement(r,"news_source"+str(i+1),attrib={"a":sources_a[i]}).text=source_text[i]
			#print respective_date[i]
			ET.SubElement(r,"news_source_date"+str(i+1)).text=date_obj.search(respective_date[i]).group()
	tree=ET.ElementTree(r)
	r1=tree.getroot()
	f_res=ET.tostring(r1)
	for i in ['/','\\',':','*','?','"','<','>','|']:
		if i in title:
			title=title.replace(i," ")

	#title=title.replace(i," ") for i in ['/','\\',':','*','?','"','<','>','|'] if i in title
	#print title
	folder_name=os.path.join(save_path,cockpit_name)
	if not os.path.exists(folder_name):
		os.mkdir(folder_name)
	file_title=os.path.join(save_path,cockpit_name,title)
	print file_title
	with open(file_title+'.xml','w') as main:
		main.write(f_res)
try:
	for url in urls:
		print url
		driver.get(url)
		driver.refresh()
		time.sleep(5)
		select_options=driver.find_element_by_id("result-limit-options")
		options=select_options.find_elements_by_tag_name('option')
		number_of_docs=int(options[-1].text.strip())
		print "number-f-d"+str(number_of_docs)
		options[-1].click()
		#print "after 250"
		time.sleep(3)
		
		cockpit_name=driver.find_element_by_xpath("//span[@id='related-bics-menu']/div[@class='tool-title']/a").text.strip()
		print cockpit_name
		today=datetime.date.today()
		#print today
		#while driver.find_elements_by_xpath("//div[@id='paginate']/div/ul/li/a[contains(text(),'Next')]"):
		#print "inside while"
		time.sleep(3)
		Load_index=[]
		dates=driver.find_elements_by_xpath("//span[@class='nb-date']")
		for i,single_date in enumerate(dates):
			check_date_ele=single_date.text.strip()
			single_date=datetime.datetime.strptime(check_date_ele,date_FMT).date()
			
			if today-single_date==datetime.timedelta(days=1):
				print i+1
				print single_date
				Load_index.append(i+1)
		update_docs=len(Load_index)
		if update_docs>0:
			last_doc_index=Load_index[-1]
		
			print update_docs
			print "grabbing content"
			
			get_content(cockpit_name,Load_index)
			time.sleep(1)
			if update_docs!=last_doc_index or update_docs==0:
				break
	driver.close()
	driver.quit()
except Exception as e:
	driver.close()
	driver.quit()

	
