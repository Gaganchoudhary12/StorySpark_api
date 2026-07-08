import apicache, { Options } from 'apicache';
import { NextFunction, Request, Response } from 'express';

type ToggleMiddleware = (req: Request, res: Response) => boolean;

const durationUnitMap: Record<string, string> = {
  ms: 'milliseconds',
  millisecond: 'milliseconds',
  milliseconds: 'milliseconds',
  s: 'seconds',
  sec: 'seconds',
  secs: 'seconds',
  second: 'seconds',
  seconds: 'seconds',
  m: 'minutes',
  min: 'minutes',
  mins: 'minutes',
  minute: 'minutes',
  minutes: 'minutes',
  h: 'hours',
  hr: 'hours',
  hrs: 'hours',
  hour: 'hours',
  hours: 'hours',
  d: 'days',
  day: 'days',
  days: 'days',
  w: 'weeks',
  week: 'weeks',
  weeks: 'weeks',
  mon: 'months',
  month: 'months',
  months: 'months'
};

const cacheInstance = apicache.newInstance({
  appendKey: ['method'],
  statusCodes: {
    include: [200]
  }
});

const normalizeCacheDuration = (duration: string | number) => {
  if (typeof duration === 'number') {
    return duration;
  }

  const value = duration.trim().toLowerCase();
  const match = value.match(/^(\d+)\s*([a-z]+)$/);

  if (!match) {
    return value;
  }

  const [, amount, unit] = match;
  const normalizedUnit = durationUnitMap[unit];

  if (!normalizedUnit) {
    return value;
  }

  return `${amount} ${normalizedUnit}`;
};

export const cache = (
  duration: string | number,
  toggleMiddleware?: ToggleMiddleware,
  localOptions?: Options
) => {
  return cacheInstance.middleware(
    normalizeCacheDuration(duration),
    toggleMiddleware,
    localOptions
  ) as (req: Request, res: Response, next: NextFunction) => void;
};

export const clearCache = (target?: string | string[]) => cacheInstance.clear(target);
