import { Injectable } from '@angular/core';
import moment = require('moment');

@Injectable()
export class CalculateDateService {

  constructor() { }

  getTimeDiff(date): number {
    date = moment(date, 'YYYYMMDD');
    const today = moment(moment(), 'YYYYMMDD');

    const timeDiff = today.diff(date, 'days');

    return timeDiff;
  }

  getTimeFutur(): any {

    // const timeFutur = moment().endOf('day').fromNow();
    return moment().endOf('day').fromNow();

    // return timeFutur;
  }

}
