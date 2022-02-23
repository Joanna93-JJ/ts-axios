
import { buildUrl } from './helpers/url';
import {AxiosRequestConfig} from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void{
  processConfig(config);//先对config进行处理
  xhr(config);//再执行xhr

}

//对config中的数据做处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromUrl(config);
}

//处理config中的url
function transfromUrl(config: AxiosRequestConfig):string{

  const {url, params} = config;//对象解构
  return buildUrl(url, params);
}

export default axios