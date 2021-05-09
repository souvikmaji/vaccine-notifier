const getDate = function (i) {
    var today = new Date();
    today.setDate(today.getDate() + i);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return dd + "-" + mm + "-" + yyyy;
};

module.exports = getDate;