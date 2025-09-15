// import i18n from '@/i18n';
import {
  type DataResponseType,
  type ApiSauceResponseType,
} from '../types/api/apiDefaultTypes';

export const getSuccessResponse = <T>({
  response,
}: {
  response: ApiSauceResponseType<T>;
}) => {
  const { data } = response;
  if (!data) {
    return { message: '', code: 400 };
  }

  return {
    result: data,
    code: response?.status,
    message: data?.message ?? '',
    info: data?.info || undefined,
  };
};

export const getFailureResponse = <T>({
  response,
}: {
  response: ApiSauceResponseType<T>;
}) => {
  const { data } = response;

  if (response?.status === 500) {
    return {
      code: response?.status,
      // message: i18n.t('error.serviceError'),
      message: 'Internal Server Error',
    };
    // other error codes to be added, as required, for generic handling
  }
  if (response?.status) {
    return {
      code: response?.status,
      message: data?.errors ? data?.errors : data?.message,
    };
  }
  return {
    code: 500,
    // message: i18n.t('error.apiError'),
    message: 'API Error',
  };
};

export const getResponseData = <T>({
  response,
}: {
  response: ApiSauceResponseType<T>;
}): DataResponseType<T> => {
  try {
    const { data, problem, status } = response;
    if (data) {
      if (status === 200 || status === 201) {
        return getSuccessResponse<T>({ response });
      } else {
        const failureResponse = getFailureResponse<T>({ response });
        return failureResponse;
      }
    } else if (problem === 'CANCEL_ERROR') {
      return { result: undefined, code: 999, message: '' };
    } else {
      const failureResponse = getFailureResponse({ response });
      return failureResponse;
    }
  } catch {
    return {
      result: undefined,
      code: 500,
      // message: i18n.t('error.apiError'),
      message: 'API Error',
    };
  }
};
