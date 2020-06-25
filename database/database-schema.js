const db = require("./"); // database/index.js

module.exports = () => {
  let sql = getQueryCreateTable("accounts");

  db.query(sql, null);
}

function getQueryCreateTable(type) {
  switch (type) {
    case "accounts": {
      return "CREATE TABLE IF NOT EXISTS `accounts` (\
        `ID` int(11) NOT NULL,\
        `Username` varchar(24) COLLATE utf8_unicode_ci NOT NULL,\
        `Email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,\
        `PassHash` varchar(64) COLLATE utf8_unicode_ci NOT NULL,\
        `PassSalt` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,\
        `RegisterDate` int(11) NOT NULL,\
        `LoginDate` int(11) NOT NULL,\
        `IGLoginDate` int(11) DEFAULT NULL,\
        `IP` varchar(16) COLLATE utf8_unicode_ci NOT NULL,\
        `IGIP` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,\
        `PlayerGroup` int(11) NOT NULL DEFAULT '0',\
        `ALevel` int(11) NOT NULL DEFAULT '0',\
        `PLevel` int(11) NOT NULL DEFAULT '0', PRIMARY KEY(`ID`)\
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;"
    }
    default: return null;
  }
}
