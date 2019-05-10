import json
import requests,os,time,datetime,sys
import xml.etree.ElementTree as ET
import logging
import base64
import hashlib
from Crypto.Cipher import AES
from Crypto import Random

def handle_rest_response(response,context=None):
	"""
	This method is used to log the rest response
	"""
	logging.info('Inside handle_rest_response method to check the rest response')
	if not isinstance(response,requests.Response):
		logging.error("The response object sent in handle_rest_response is not a requests.Response object")
		sys.exit(1)
	if response.ok:
		logging.info("Rest response is successfully executed fetching expected result. ")
		return True
	else:
		logging.error("Rest response is not successfully executed raising an exception")
		logging.error("Raising a REST exception")
		logging.error("=" * 100)
		logging.error("STATUS CODE :" + str(response.status_code))
		logging.error("REASON : "+ str(response.reason))
		logging.error("CONTEXT : "+ str(context))
		logging.error("=" * 100)
		logging.error("Failed to process the request !!!")
		logging.info("---Log Completed---")

unpad = lambda s: s[:-ord(s[len(s) - 1:])]
def decrypt_property(data_str_to_decrypt):
	"""
	This method decrypts the credentials
	"""
	key_string = "cNl2jy9XReM="
	private_key = hashlib.sha256(key_string.encode("utf-8")).digest()
	data_str_to_decrypt = base64.b64decode(data_str_to_decrypt)
	iv = data_str_to_decrypt[:16]
	cipher = AES.new(private_key, AES.MODE_CBC, iv)
	return unpad(cipher.decrypt(data_str_to_decrypt[16:])) 

def create_xml(row):
	"""
	This method is used to create the xml tree and create a xml file.
	"""
	r=ET.Element("Row")
	ids=row.find('id').text
	ET.SubElement(r,"id").text=ids
	doc_number=row.find('document_number__v').text
	ET.SubElement(r,"document_number").text=doc_number
	ET.SubElement(r,"format").text=row.find('format__v').text if row.find('format__v').text is not None else ""
	req=ET.SubElement(r,"requester_type")					  
	if row.find('requester_type__c').find('value') is not None:
		requesters_names=row.find('requester_type__c').findall('value')
		for name in requesters_names:
			ET.SubElement(req,"requester_type__c").text=name.text
	else:
		ET.SubElement(req,"requester_type__c").text="null"
	ET.SubElement(r,"name").text=row.find('name__v').text
	ET.SubElement(r,"title").text=row.find('title__v').text
	ET.SubElement(r,"status").text=row.find('status__v').text
	ET.SubElement(r,"classification").text=row.find('classification__v').text if row.find('classification__v').text is not None else ""
	ET.SubElement(r,"type").text=row.find('type__v').text
	ET.SubElement(r,"subtype").text=row.find('subtype__v').text if row.find('subtype__v').text is not None else ""
	if row.find('on_label_off_label__c').find('value') is not None:
		on_off_values=row.find('on_label_off_label__c').findall('value')
		for all_vals in on_off_values:
			ET.SubElement(r,"on_label_off_label").text=all_vals.text
	else:
		ET.SubElement(r,"on_label_off_label").text=""
	ET.SubElement(r,"filename").text=row.find('filename__v').text
	ET.SubElement(r,"ext").text=row.find('filename__v').text.split(".")[-1]
	ET.SubElement(r,"document_creation_date").text=row.find('document_creation_date__v').text
	ET.SubElement(r,"version_modified_date").text=row.find('version_modified_date__v').text
	ET.SubElement(r,"country__v").text=row.find('country__v').text
	ET.SubElement(r,"latest_version").text=row.find('latest_version__v').text
	if row.find('language__v').find('value') is not None:
		for langs in row.find('language__v').findall('value'):
			ET.SubElement(r,"language").text=langs.text
	else:
		ET.SubElement(r,"language").text=""
	doc_prod=ET.SubElement(r,"doc_products")
	if row.find('document_product__vr').find('data').findall('row') is not None:
		prod_vals=row.find('document_product__vr').find('data').findall('row')
		for prods in prod_vals:
			ET.SubElement(doc_prod,"product_val").text=prods.find('name__v').text
			if prods.find('therapeutic_area__vs').findall("value"):
				for ther in prods.find('therapeutic_area__vs').findall("value"):
					ET.SubElement(docs_prod,"therapeutic_area").text=ther.text
	ET.SubElement(r,"owner_id").text=row.find('owner__v').text if row.find('owner__v').text is not None else ""
	doc_con=ET.SubElement(r,"doc_country")
	if row.find('document_country__vr').find('data').findall('row') is not None:
		for counts in row.find('document_country__vr').find('data').findall('row'):
			ET.SubElement(doc_con,"country__v").text=counts.find('name__v').text
	maj_no=row.find('major_version_number__v').text
	ET.SubElement(r,"major_version_number__v").text=maj_no
	min_no=row.find('minor_version_number__v').text
	ET.SubElement(r,"minor_version_number__v").text=min_no
	ET.SubElement(r,"pangaea_id").text=row.find('pangaea_id__c').text if row.find('pangaea_id__c').text is not None else "null"
	ET.SubElement(r,"type_1").text=row.find('type_of_document__c').text if row.find('type_of_document__c').text is not None else "null"
	ET.SubElement(r,"type_2").text=row.find('type__c').text if row.find('type__c').text is not None else "null"
	ET.SubElement(r,"type_4").text=row.find('type_of_data_asset_document__c').text if row.find('type_of_data_asset_document__c').text is not None else "null"
	ET.SubElement(r,"type_6").text=row.find('type_of_operational_document__c').text if row.find('type_of_operational_document__c').text is not None else "null"
	ET.SubElement(r,"type_7").text=row.find('type_of_learning_and_development__c').text if row.find('type_of_learning_and_development__c').text is not None else "null"
	tree=ET.ElementTree(r)
	r1=tree.getroot()
	f_res=ET.tostring(r1)
	f_res=f_res.replace('None','')
	file_title=os.path.join(xml_path,doc_number)
	with open(file_title+'.xml','w') as main:
		main.write('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
		main.write(f_res)
	logging.info("The metadata has been created for the document:[%s]"%doc_number)
	return ids,doc_number,maj_no,min_no

def intermidate_method(query_url,veeva_headers):
	"""
	The intermediate method helps to loop over all the data and store it on a variable
	"""
	list_of_responses=[]
	res_text,next_hit,next_url=hit_api(query_url,veeva_headers)
	if res_text is not None:
		list_of_responses.append(res_text)
	while next_hit:
		next_url='https://lilly-medcomms.veevavault.com'+next_url
		data,next_hit,next_url=hit_api(next_url,veeva_headers)
		if data is not None:
			list_of_responses.append(data)
	return list_of_responses
 
 

def hit_api(query_url,veeva_headers):
	"""
	This method is used to get the metadata via api
	"""

	res=requests.get(url=query_url,proxies=proxy,headers=veeva_headers)
	logging.info('Hitting the query url:%s'%query_url)
	#print res.status_code
	check=handle_rest_response(res,'hit_api method')
	if check:
		tree=ET.fromstring(res.text.encode('ascii','ignore'))
		if tree.find('responseStatus').text=='SUCCESS':
			if int(tree.find('responseDetails').find('total').text)>0:
				print 'data is present'
				next_hit=False
				next_url=''
				if tree.find('responseDetails').find('next_page') is not None:
					next_hit=True
					next_url=tree.find('responseDetails').find('next_page').text
					tree.clear()
				return res.text.encode('ascii','ignore'),next_hit,next_url
			else:
				logging.info('No data present after API hit')
				tree.clear()
				return None,False,None
		else:
			logging.error('Resonse status was unsuccessful')
			logging.error('response staus is [%s]'%tree.find('responseStatus').text)
			if tree.find('responseStatus').text.lower()=='failure':
				for ers in tree.find('errors').findall('error'):
					logging.error('The response error is [%s]'%tree.find('type').text)
					logging.error('The response message is [%s]'%tree.find('message').text)
					if ers.find('type').text=='INVALID_SESSION_ID':
						veeva_headers['Authorization']=session()
						hit_api(query_url,veeva_headers)
			return None,False,None

def session():
	"""
	This method is used to create a session
	"""
	with open(enc_path,'r') as f:
		data=f.read().split('\n')
	param=dict(username=decrypt_property(data[0]),password=decrypt_property(data[1]))																																						
	sess_url=base_url+'auth'
	sess_headers={'Accept':'application/json','Content-Type':'application/x-www-form-urlencoded'}
	sess_res=requests.post(url=sess_url,headers=sess_headers,data=param,proxies=proxy)
	logging.info('A request for sessionID is sent')
	check=handle_rest_response(sess_res,'session Method')
	if check:
		y=sess_res.json()
		if y['responseStatus'].encode('utf-8')=='SUCCESS':
			logging.info('The response status in the response xml was a success')
			return y['sessionId'].encode('utf-8')
		else:
			logging.error('The response status for creating a session was a failure')
			if 'responseMessage' in y:
				logging.error('The response message is %s'%y['responseMessage'].encode('utf-8'))
			if 'errors' in y:
				logging.error('The error messages are:')
				errors=y['errors']
				for k,v in errors:
					logging.error('%s : %s'%(str(k),str(v)))
			if 'errorType' in y:
				logging.error('The error type is %s'%y['errorType'].encode('utf-8'))
			logging.info('--------Log completed------')
			sys.exit(1)


def makedirec(path):
	"""
	This method is used to create the folders if they are not existing
	"""
	if isinstance(path,list):
		for path in path:
			if not os.path.exists(path):
				os.makedirs(path)
	else:
		if not os.path.exists(path):
			os.makedirs(path)


base_url='https://lilly-medcomms.veevavault.com/api/v18.2/'
query="query?q=SELECT format__v, country__v, type_of_document__c, type_of_data_asset_document__c, type__c, type_of_learning_and_development__c, type_of_operational_document__c, name__v, pangaea_id__c,title__v, status__v, type__v , subtype__v, document_creation_date__v, version_modified_date__v, requester_type__c, latest_version__v, (SELECT name__v FROM document_country__vr), language__v, classification__v, on_label_off_label__c, id, document_number__v, filename__v, (SELECT name__v, therapeutic_area__vs FROM document_product__vr), owner__v, major_version_number__v, minor_version_number__v FROM documents WHERE status__v = 'Published' AND (type__v CONTAINS ('RWE') OR (type__v CONTAINS ('Medical','Field Medical')))"
FMT='%d%m%YT%H%M%S'
log_location=r'\\ix1buitwxdev\V2S\VVMC\log'
xml_path=r"\\ix1buitwxdev\V2S\VVMC\xml"
doc_path=r"\\ix1buitwxdev\V2S\VVMC\docs"
enc_path=r"\\ix1buitwxdev\V2S\VVMC\MCPRD.enc"
makedirec([log_location,xml_path,doc_path])
today=datetime.datetime.now().strftime(FMT)
log_name='VVMC{'+today+'}'
logging.basicConfig(level=logging.INFO,filename=os.path.join(log_location,log_name+'.log'),format='%(asctime)s %(name)s %(levelname)s %(message)s')
logging.info('-------------VVMC PROD IDL Started------------------')
												
proxy={'https':'https://proxy.gtm.lilly.com:9000'}
veeva_headers={'Accept':'application/xml','Content-Type':'application/x-www-form-urlencoded'}
list_of_doc_ids={}
total_no_of_xml_docs=0
total_no_of_downloaded_docs=0
list_of_vid_ids={}
no_of_video_files=0
list_of_responses=[]



try:
	veeva_headers['Authorization']=session()
	query_url=base_url+query
	list_of_responses= intermidate_method(query_url,veeva_headers)
	if len(list_of_responses)>0:
		for resp in list_of_responses:
			tree=ET.fromstring(resp)
			all_rows=tree.find('data').findall('row')
			for row in all_rows:
				if (row.find('format__v').text is not None) or ('video' not in row.find('format__v').text):
					ids,doc_number,maj_no,min_no=create_xml(row)
					list_of_doc_ids[ids]=[doc_number,maj_no,min_no]
					total_no_of_xml_docs+=1
				elif row.find('format__v').text is None:
					logging.error('The format of the file[%s] is none'%row.find('document_number__v').text)
				else:
					ids,doc_number,maj_no,min_no=create_xml(row)
					list_of_vid_ids[ids]=doc_number
					no_of_video_files+=1
		print total_no_of_xml_docs
	else:
		logging.info('No data found')
	logging.info("A total of %s xmls are created"%str(total_no_of_xml_docs))
	if len(list_of_doc_ids)>0:
		for k,v in list_of_doc_ids.iteritems():
			doc_url=base_url+'objects/documents/{id}/versions/{maj}/{min}/file'.format(id=k,maj=v[1],min=v[2])
			logging.info('Trying to download {ids}/{maj}.{min}'.format(ids=k,maj=v[1],min=v[2]))
			res=requests.get(url=doc_url,proxies=proxy,headers=veeva_headers,stream=True)
			check=handle_rest_response(res,'while downloading file')
			if check:
				api_burst_limit=res.headers['X-VaultAPI-BurstLimitRemaining']
			#print res.headers.keys()
				if 'Content-Disposition' in res.headers:
					print k
					extn=res.headers['Content-Disposition'].split(".")[-1]
					g=v[0]+"."+extn
					file_path=os.path.join(doc_path,g)
					print file_path
					with open(file_path,'wb') as f:
						for chunk in res.iter_content(512*1024):
							f.write(chunk)
					logging.info("The document: [%s] is downloaded"%g)
					time.sleep(0.5)
					total_no_of_downloaded_docs+=1
				else:
					doc_number=str(v[0])
					logging.error("The document with id:[%s] and document number:[%s] cannot be dowloaded"%(k,doc_number))
			if int(api_burst_limit)<1550:
				logging.info('Reached API burst limit so waiting for 300 seconds')
				time.sleep(300)
		#clear_expired_docs()
		logging.info("A total of %s docs are downloaded"%str(total_no_of_downloaded_docs))
	else:
		logging.info('No files were downloaded')
	logging.info("A total of %s videos were not downloaded"%str(no_of_video_files))
	if no_of_video_files>0:
		for k,v in list_of_vid_ids.iteritems():
			doc_number=str(v)
			logging.info('The content of id:[%s] with document number:[%s] was exempted from the source as it was a video'%(k,doc_number))
	logging.info('---------Log completed----------')
except (Exception,KeyboardInterrupt,IndexError,SystemExit,OSError,IOError) as exception_object:
	logging.error("An EXCEPTION has been raised !!!")
	logging.error("=" * 100)
	logging.error("EXCEPTION NAME :  " + str(exception_object.__class__.__name__))
	logging.error("REASON :  " + str(exception_object.message))
	logging.error("TRACEBACK :  ")
	logging.exception(exception_object)
	logging.error("=" * 100)
	logging.error("---Log Completed---")


