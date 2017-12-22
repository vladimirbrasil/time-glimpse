// https://www.polymer-project.org/2.0/docs/devguide/custom-elements#mixins

/* @polymerMixin */
mixinStyle = (superClass) => class extends superClass {
  constructor() {
    super();
    this.addEventListener('calendar-height-changed', e => alert(e.detail.height));
  }

  static get properties() {
    return {
      hostWidth: {
        type: Number,
      },
      resizeDebounceTime: {
        type: Number,
        value: 600,
      },
      chartMainStyles: {
        type: Object,
        computed: 'computeChartMainStyles(hostWidth)',
        notify: true,
      },
      calendarHeight: {
        type: Number,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // console.log(window.innerWidth);
    window.addEventListener('resize', this.resized.bind(this));
    this.resized();
  }

  resized() {
    setTimeout(() => {
      this.set('hostWidth', this.offsetWidth);
      console.log(`hostWidth: ${this.hostWidth}`);
      // Run code here, resizing has "stopped"
    }, this.resizeDebounceTime);
  }

  observeCalendarHeight(calendarHeight) {
    console.log(calendarHeight);
    this.updateStyles({'--time-glimpse-height': `${calendarHeight}px`});
  }

  computeChartMainStyles(hostWidth) {
    // dimensions
    const chartWidth = (hostWidth > 1200) ? 1200 : Math.round(hostWidth) - 15;

    // colors
    let mainColor, lightMainColor, mainColorDataVariation;
    if (ShadyCSS) {
      mainColor = ShadyCSS.getComputedStyleValue(this, '--time-glimpse-main-color');
      mainColorDataVariation = ShadyCSS.getComputedStyleValue(this, '--time-glimpse-main-color-data-variation');
      lightMainColor = ShadyCSS.getComputedStyleValue(this, '--time-glimpse-light-color');
    } else {
      mainColor = getComputedStyle(this).getPropertyValue('--time-glimpse-main-color');
      mainColorDataVariation = getComputedStyle(this).getPropertyValue('--time-glimpse-main-color-data-variation');
      lightMainColor = getComputedStyle(this).getPropertyValue('--time-glimpse-light-color');
    }
    const dataColor = mainColor; // '#4286f4';
    const dataColorMax = mainColorDataVariation; // '#4286f4';
    const lightColor = lightMainColor; // '#d6e5ff';
    return {chartWidth, dataColor, dataColorMax, lightColor};
  }

};
