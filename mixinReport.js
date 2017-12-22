// https://www.polymer-project.org/2.0/docs/devguide/custom-elements#mixins

/* @polymerMixin */
mixinReport = (superClass) => class extends superClass {
  constructor() {
    super();
    // this.addEventListener('keypress', e => this.handlePress(e));
  }

  static get properties() {
    return {
      timelineData: {
        type: Array,
        value: [],
      },
      report: {
        type: Object,
        computed: 'createReport(timelineData)',
        notify: true,
      },
    };
  }

  createReport(timelineData) {
    if (!timelineData || !timelineData[0]) return {};
    return {
      allData: {
        time: {
          min: null,
          max: null,
          avg: null,
        },
        date: {
          min: null,
          max: null,
          avg: null,
        },
        interval: {
          min: null,
          max: null,
          avg: null,
        },
        weekday: {
          frequent: [],
          rare: [],
        },
      },
      commonData: {
        time: {
          min: null,
          max: null,
          avg: null,
        },
        date: {
          min: null,
          max: null,
          avg: null,
        },
        interval: {
          min: null,
          max: null,
          avg: null,
        },
        weekday: {
          frequent: [],
          rare: [],
        },
      },
    };
  }

  _sortDates(a, b) {
    return new Date(a) - new Date(b);
  }

  jsonStringify(obj) {
    return JSON.stringify(obj, null, 2);
  }

};
