import { SVG_SCALE_FACTOR } from '@/config/constants';

export const standardizeIconSize = (value: number) =>
  (Math.trunc(value) * SVG_SCALE_FACTOR).toString();
