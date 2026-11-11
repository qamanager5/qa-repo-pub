// Stub. There is no database: query() only records the text and returns no rows.
const db = {
  last: "",
  query(sql, done) {
    this.last = String(sql);
    if (done) done(null, []);
    return [];
  },
};
module.exports = db;
