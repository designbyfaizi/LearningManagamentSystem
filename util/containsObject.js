const mongoose = require('mongoose');

module.exports = containsObject = (value, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
        if (String(list[i].sid) == String(mongoose.Types.ObjectId(value))) {
            return true;
        }
    }
    return false;
}