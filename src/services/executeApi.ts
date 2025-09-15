import {
  type APIObject,
  type DataResponseType,
  type ServerResponse,
} from '@/types/api/apiDefaultTypes';
import { api } from './apiDefaults';
import { getResponseData } from './apiResponseHandler';
import { ApiResponse } from 'apisauce';

export const executeApi = async <T>({
  apiObj,
}: {
  apiObj: APIObject;
}): Promise<DataResponseType<T>> => {
  const { url, params = {}, api: apiEntity = api, headers } = apiObj;
  let response: ApiResponse<ServerResponse<T>, ServerResponse<T>>;
  switch (apiObj.type) {
    case 'get':
      response = await apiEntity.get(url, params, { headers });
      break;
    case 'post':
      response = await apiEntity.post(url, params, { headers } );
      break;
    case 'patch':
      response = await apiEntity.patch(url, params, { headers });
      break;
    case 'put':
      response = await apiEntity.put(url, params, { headers });
      break;
    case 'delete':
      response = await apiEntity.delete(url, params, { headers });
      break;
    default:
      throw new Error(`Unsupported API type" ${apiObj.type}`);
  }

  if (!response) {
    return { code: 500, result: undefined, message: '' };
  }

  const finalResponse = getResponseData<T>({ response });
  return finalResponse;
};
