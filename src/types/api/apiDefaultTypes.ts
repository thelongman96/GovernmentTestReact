import type { ApiResponse, ApisauceInstance } from 'apisauce';

export interface APIObject {
  url: string;
  params?: { [key: string]: unknown };
  type: string;
  api: ApisauceInstance;
}

export type ApiSauceResponseType<ResultTypes> = ApiResponse<
  ServerResponse<ResultTypes>
>;

export type ApiDataInfo = {
  total_pages: number;
  total_count: number;
  page: number;
  page_size: number;
};

export type ServerResponse<ResultTypes> = {
  response: {
    code: number;
  };
  result?: ResultTypes;
  checksums?: { [key in string]: string | boolean };
  message?: { [key in string]: string } | string | object;
  info?: ApiDataInfo;
  errors?: { [key in string]: string } | string | object;
};

export interface DataResponseType<ResultTypes> {
  result?: ResultTypes;
  errors?: object;
  info?: ApiDataInfo;
  message?: { [key in string]: string } | string | object;
  code?: number;
  checksums?: { [key in string]: string | boolean };
}
