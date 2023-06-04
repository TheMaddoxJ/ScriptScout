const handlebars = require('handlebars');

module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date ? date.toLocaleDateString() : date;
    },
    format_time: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleTimeString();
    },
    post_tease: str => {
      const first250 =  str.slice(0, 250);
      return first250;
    },
  };
