import * as moment from 'moment';

export namespace DateParser {
  'use strict';

  const validFormats = [
    'YYYY-MM-DDTHH:mm:ssZ',
    'YYYY-MM-DDTHH:mm:SSSZ',
    'YYYY/MM/DD HH:mm:ss ZZ'
  ];

  /**
   * Takes date strings from the API and converts them to proper date objects
   */
  export function processDateStrings(object: any) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!object.hasOwnProperty(k)) { continue; }

      const value = object[k];
      if (!value) { continue; }

      if (isString(value)) {
        object[k] = attemptStringToDateConversion(value);
        continue;
      }

      if (Array.isArray(value)) {
        object[k] = value.map((v: any) => {
          if (isString(v)) {
            return attemptStringToDateConversion(v);
          }

          return processDateStrings(v);
        });
        continue;
      }

      if (typeof (value) === 'string') { continue; }

      object[k] = processDateStrings(object[k]);
    }

    return object;
  }

  /**
   * Takes native Date objects and formats them into strings
   */
  export function processDates(object: any) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!object.hasOwnProperty(k)) { continue; }

      const value = object[k];
      if (!value || isString(value)) { continue; }
      if (isString(value)) { continue; }

      if (isDate(value)) {
        attemptDateToStringConversion(value);
        continue;
      }

      if (Array.isArray(value)) {
        object[k] = value.map((v: any) => {
          return isDate(v) ? attemptDateToStringConversion(v) : processDates(v);
        });
        continue;
      }

      if (value instanceof Object) {
        object[k] = processDates(object[k]);
      }
    }

    return object;
  }

  function attemptStringToDateConversion(value: string): string | Date {
    const parsedMoment = moment(value.trim(), validFormats, true);
    return parsedMoment.isValid() ? parsedMoment.toDate() : value;
  }

  function attemptDateToStringConversion(value: Date): string {
    return moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
  }

  function isString(value: any) {
    return typeof (value) === 'string';
  }

  function isDate(value: any) {
    return value instanceof Date;
  }
}
