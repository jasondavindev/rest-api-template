"use strict";
exports.__esModule = true;
var Offer_1 = require("~/models/Offer");
test('Offer model', function () {
    var offer = new Offer_1.Offer();
    offer.seats = 10;
    expect(offer.decrement()).toBe(9);
    offer.seats = 0;
    expect(offer.decrement).toThrowError();
});
