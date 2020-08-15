import request from '@/utils/request';

export async function qcLogin(params) {
  return request('/server/api/qcLogin', {
    params,
  });
}
export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}