"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowestRoomPrice = getLowestRoomPrice;
const roomTypes_1 = require("@/data/roomTypes");
// Fungsi untuk mengambil harga termurah dari roomTypes jika ada
function getLowestRoomPrice(propertyId, fallbackPrice) {
    const roomTypes = roomTypes_1.propertyRoomTypes[propertyId];
    if (roomTypes && roomTypes.length > 0) {
        return Math.min(...roomTypes.map(room => room.price));
    }
    return fallbackPrice;
}
