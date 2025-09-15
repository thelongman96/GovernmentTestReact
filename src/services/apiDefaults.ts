import apisauce from 'apisauce';
import {
  API_SCHEME,
  API_BASE_URL,
} from '@/config/constants';
import { eventBus } from './eventBus';

const apiScheme = (API_SCHEME as string) || '';
const apiBaseUrl = (API_BASE_URL as string) || '';

export const apiWaitTimer = 300;

export const api = apisauce.create({
  baseURL: `${apiScheme}${apiBaseUrl}`,
  timeout: 10000,
});

export const getBaseUrl = () => {
  return `${apiScheme}.${apiBaseUrl}`;
};

api.addMonitor((response) => {
  if (response.status === 401) {
    console.warn('Unauthorized request detected, emitting event');
    eventBus.emit('unauthorized', {
      url: response.config?.url,
      method: response.config?.method,
    });
  }
});
