// https://www.polymer-project.org/2.0/docs/devguide/custom-elements#mixins

/* @polymerMixin */
mixinTimeline = (superClass) => class extends superClass {
  constructor() {
    super();
    // this.addEventListener('keypress', e => this.handlePress(e));
  }

  static get properties() {
    return {
      /**
      * Array of datetimes to be plotted.
      */
      datetimes: {
        type: Array,
        value: null,
      },
      timelineData: {
        type: Array,
        computed: 'computeTimelineData(datetimes)',
        notify: true,
      },
      report: {
        type: Object,
        notify: true,
      },
      noOutliers: {
        type: Boolean,
        notify: true,
      },
    };
  }

  // static get observers() {
  //   return [ '_barChanged(bar.*)' ];
  // }

  // _barChanged(bar) { ... }

  // handlePress(e) { console.log('key pressed: ' + e.charCode); }


  // helper function

  computeTimelineData(datetimes) {
    if (!datetimes || !datetimes[0]) return;
    const timelineData = datetimes
      .filter((dt) => !!dt)
      .map((dt) => this._toDateTime(dt))
      .map((dt, index) => {
        // console.log(dt)
        const time = this._getTime(dt);
        const date = this._getDate(dt);
        return {
          datetime: dt,
          weekday: this._getWeekDay(dt),
          time: {
            str: time,
            val: this._timeToNumberScale(time),
          },
          date: {
            str: date,
            val: this._dateToNumberScale(date),
          },
          formattedDate: this._formattedDate(dt),
        };
      });

    // console.log(timelineData)
    return timelineData;
  }

  _timeToNumberScale(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    // return parseFloat(`${hours}.${minutes}`);
    return hours + minutes / 60;
  }

  _dateToNumberScale(strDate) {
    var date = new Date(strDate);
    var days = date.getDate();
    var months = date.getMonth() + 1;
    var years = date.getFullYear();
    // console.log(strDate, date, days, months, years)
    return days / 12 + months + years * 12;
  }

  _toDateTime(date) {
    return new Date(date);
  }

  _getDate(date) {
    if (!date) return;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    const dateFormat = new Intl.DateTimeFormat(window.navigator.language, options);
    return dateFormat.format(date);
  }

  _getTime(date) {
    return date.toLocaleString('pt-BR').substring(11, 16).trim();
  }

  _getWeekDay(date) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
    const weekdayFormat = new Intl.DateTimeFormat(window.navigator.language, {
      weekday: 'short',
    });
    return weekdayFormat.format(date).toLocaleLowerCase();
  }

  _formattedDate(date) {
    if (!date) return;
    const lang = window.Intl || 'en';
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
    const textDateFormat = new Intl.DateTimeFormat(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return textDateFormat.format(date);
  }

  jsonStringify(obj) {
    return JSON.stringify(obj, null, 2);
  }

};
