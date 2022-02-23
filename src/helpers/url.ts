// 希望把项目中的一些工具函数、辅助方法独立管理，
//于是我们创建一个 helpers 目录

//处理 url 相关的工具函数

import { isDate, isPlainObject} from './util';

function encode(val: string): string{

  return encodeURIComponent(val)
        .replace('/%40/g', '@')
        .replace('/%3A/gi', ':')
        .replace('/%20/g', '$')
        .replace('/%2C/gi', ',')
        .replace('/%20/g', '+')
        .replace('/%5B/g', '[')
        .replace('/%5D/g', ']')
}


// 1、参数值为数组
// 2、参数值为对象
// 3、参数值为 Date 类型
// 4、特殊字符支持
// 5、空值忽略
// 6、丢弃 url 中的哈希标记
// 7、保留 url 中已存在的参数
export function buildUrl(
  url: string, 
  params?: any

): string{

  if(!params){
    return url;
  }

  let serilizedParams;
  
  const  parts: string[] = [];

  Object.keys(params).forEach(key => {

    const val = params[key];

    if(val === null || typeof val === 'undefined'){
      return; //只会跳出forEach循环
    }

    let values = [];
    
    if(Array.isArray(val)){
      values = val;
      key += '[]';
    }else{
      values = [val];
    }

    //对params 中的value类型进行判断并处理

    values.forEach(val =>{

      if(isDate(val)){

        val = val.toISOString;

      }else if(isPlainObject(val)){
        //转换成 json字符串
        val = JSON.stringify(val);
      }
    })

    parts.push(`${encode(key)}=${encode(val)}`);
    
  })

  serilizedParams = parts.join('&');

  if(serilizedParams){
    // 去掉原url中的hash
    const markIndex = url.indexOf('#');
    if(markIndex !== -1){
      url = url.slice(0, markIndex);
    }

    //保留原url中？后的参数
    url += url.indexOf('?')?'&':'?' + serilizedParams;
  }

  return url;
}