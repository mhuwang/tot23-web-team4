/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:10:50
 */
import request from '@/utils/request'
let baseUrl = require("./api").baseurl;

export function changeResourceByYaml(data) {
  return request({
    url: baseUrl + '/common/changeResourceByYaml',
    method: 'post',
    data: {
      yaml: data,
    }
  })
}
export function changeServicesByYaml(data) {
  return request({
    url: baseUrl + '/common/changeServicesByYaml',
    method: 'post',
    data: {
      service: data,
    }
  })
}
export function changeIngressesByYaml(data) {
  return request({
    url: baseUrl + '/common/changeIngressesByYaml',
    method: 'post',
    data: {
      ingress: data,
    }
  })
}
export function changeCrdByYaml(data) {
  console.log("yaml", data);
  return request({
    url: baseUrl + '/common/changeResourceByYaml_v1beta',
    method: 'post',
    data: {
      yaml: data,
    }
  })
}
//changeCrdObjectByYaml
export function changeCrdObjectByYaml(data) {
  console.log("yaml", data);

  const params = new URLSearchParams();
  params.append("yaml", data.codeyaml);
  params.append("crdName", data.crdname);

  return request({
    url: baseUrl + '/common/changeCrdObjectByYaml',
    method: 'post',
    data: params
  })
}