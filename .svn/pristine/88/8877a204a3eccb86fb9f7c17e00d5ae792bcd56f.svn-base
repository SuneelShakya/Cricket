import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: Array<any>, searchText: string): any {
    {
      if (!items)
        return [];
      if (!searchText) return items;
      if (items == null)
        return null;
      return items.filter(item =>
        Object.keys(item).some(k => item[k] != null &&
          item[k].toString().toLowerCase()
            .includes(searchText.toLowerCase()))
      );
    }
  }

}

@Pipe({ name: 'NullValues' })
export class NullValues implements PipeTransform {
  transform(value: any): any {
    if (value === '[object Object]' || value === undefined || value === '{}' || typeof value === 'object') {
      return '';
    } else {
      return value;
    }
  }
}

@Pipe({ name: 'ReplaceComma' })
export class ReplaceCommaPipe implements PipeTransform {
  transform(value: any): any {
    return value.split(',').join(' ');
  }
}

@Pipe({ name: 'splitComma' })
export class SplitCommaPipe implements PipeTransform {
  transform(value: any) {
    return value.split(',')[0];
  }
}

@Pipe({ name: 'BitRate' })
export class BitratePipe implements PipeTransform {
  transform(value: any): any {
    if (
      value !== '' &&
      value !== undefined &&
      value !== null &&
      value !== '[object Object]' &&
      value !== 'N/A' &&
      typeof value !== 'object'
    ) {
      try {
        let result: any;
        if (value !== 0) {
          result = value / (1024 * 1024 * 1024);
          if (result.toFixed(2) === 0.0 || result < 1) {
            result = value / (1024 * 1024);
            result =
              result < 1
                ? (value / 1024).toFixed(2) + ' KBps'
                : (value / (1024 * 1024)).toFixed(2) + ' MBps';
            return result;
          } else if (value > 1099511627776) {
            result = value / (1024 * 1024 * 1024 * 1024);
            return result.toFixed(2) + ' TBps';
          } else {
            return result.toFixed(2) + ' GBps';
          }
        } else {
          result = value;
          return result.toFixed(2) + ' KBps';
        }
      } catch (error) {
        return '';
      }
    }
  }
}

@Pipe({ name: 'DefaultSize' })
export class SizePipe implements PipeTransform {
  transform(value: any): any {
    if (
      value !== '' &&
      value !== undefined &&
      value !== null &&
      value !== '[object Object]'
    ) {
      let result: any;
      if (value !== 0) {
        result = value / (1024 * 1024 * 1024);
        if (result.toFixed(2) === 0.0 || result < 1) {
          result = value / (1024 * 1024);
          result =
            result < 1
              ? (value / 1024).toFixed(2) + ' KB'
              : (value / (1024 * 1024)).toFixed(2) + ' MB';
          return result;
        } else if (value > 1099511627776) {
          result = value / (1024 * 1024 * 1024 * 1024);
          return result.toFixed(2) + ' TB';
        } else {
          return result.toFixed(2) + ' GB';
        }
      } else {
        result = value;
        return result.toFixed(2) + ' KB';
      }
    }
  }
}

