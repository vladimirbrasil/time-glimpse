// https://www.polymer-project.org/2.0/docs/devguide/custom-elements#mixins

/* @polymerMixin */
mixinOutliers = (superClass) => class extends superClass {
  constructor() {
    super();
    // this.addEventListener('keypress', e => this.handlePress(e));
  }

  static get observers() {
    return [
      'annotateOutliers(timelineData)',
    ];      
  }
  static get properties() {
    return {
      timelineData: {
        type: Array,
        value: [],
        notify: true,
      },
      noOutliers: {
        type: Boolean,
        value: true,
        notify: true,
      },
      minimumSampleSize: {
        type: Number,
        value: 7,
      },
    };
  }

  annotateOutliers(timelineData) {
    if (!timelineData || !timelineData[0]) return;
    this.set('noOutliers', true);
    if (timelineData.length <= this.minimumSampleSize) return; //http://www.mickybullock.com/blog/2013/10/statistical-outliers-impossible-in-small-samples/
    this.annotateTimeOutliers(timelineData);
    this.annotateDateOutliers(timelineData);
    // console.log(timelineData);
  }

  annotateTimeOutliers(timelineData) {
    this.annotateReferenceOutliers(timelineData, 'time');
  }
  annotateDateOutliers(timelineData) {
    this.annotateReferenceOutliers(timelineData, 'date');
  }

  annotateReferenceOutliers(timelineData, timeOrDate ) {
    const referenceArray = timelineData.map((td) => td[ timeOrDate ].val);
    const referenceArrayWithoutOutliers = this.filterOutliers(referenceArray);
    // console.log(referenceArray);
    // console.log(referenceArrayWithoutOutliers);

    // const propertyNameToAnnotate = `${timeOrDate }IsOutlier`

    // https://jsperf.com/for-vs-foreach/75
    // for (let i = 0; i < timelineData.length; i++) {
    //   const td = timelineData[i];
    //   if (referenceArrayWithoutOutliers.indexOf(td[ timeOrDate ].val) === -1) {
    //     td.isOutlier = timeOrDate;
    //     if (this.noOutliers) this.set('noOutliers', false);
    //   }
    // }        
    timelineData.forEach((td) => {
      if (referenceArrayWithoutOutliers.indexOf(td[ timeOrDate ].val) === -1) {
        td.isOutlier = timeOrDate;
        if (this.noOutliers) this.set('noOutliers', false);
      }
    });

    return timelineData;
  }

  getTimesArray(timelineData) {
    return timelineData.map((td) => td.time.val);
  }
  getDatesArray(timelineData) {
    return timelineData.map((td) => td.date.val);
  }

  filterOutliers(someArray) {  
    // https://stackoverflow.com/questions/20811131/javascript-remove-outlier-from-an-array

      // Copy the values, rather than operating on references to existing values
      var values = someArray.concat();

      // Then sort
      values.sort( function(a, b) {
        return a - b;
      });

      /* Then find a generous IQR. This is generous because if (values.length / 4) 
      * is not an int, then really you should average the two elements on either 
      * side to find q1.
      */     
      var q1 = values[Math.floor((values.length / 4))];
      // Likewise for q3. 
      var q3 = values[Math.ceil((values.length * (3 / 4)))];
      var iqr = q3 - q1;

      // Then find min and max values
      var maxValue = q3 + iqr*1.5;
      var minValue = q1 - iqr*1.5;
      // console.log(q1, q3, iqr, maxValue, minValue);

      // Then filter anything beyond or beneath these values.
      var filteredValues = values.filter(function(x) {
        return (x < maxValue) && (x > minValue);
      });

      // Then return
      return filteredValues;
  } 

};
