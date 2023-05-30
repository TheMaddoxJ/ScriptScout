module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date ? date.toLocaleDateString() : date;
    },
    format_time: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleTimeString();
        },
};

