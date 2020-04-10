import moment from 'moment';

moment.updateLocale('en', {
  calendar: {
    lastDay: 'YYYY-MM-DD ([Yesterday])',
    sameDay: 'YYYY-MM-DD ([Today])',
    nextDay: 'YYYY-MM-DD ([Tomorrow])',
    lastWeek: 'YYYY-MM-DD ([last] dddd)',
    nextWeek: 'YYYY-MM-DD ([next] dddd)',
    sameElse: 'YYYY-MM-DD',
  },
});

export const formatLabel = date => date.calendar();
