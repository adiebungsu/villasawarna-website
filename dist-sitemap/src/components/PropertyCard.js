"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
const price_1 = require("@/utils/price");
const OptimizedImage_1 = __importDefault(require("./OptimizedImage"));
const PropertyCard = ({ id, name, type, image, price, rating, location, capacity, reviews, bedrooms, bathrooms, amenities }) => {
    const displayPrice = (0, price_1.getLowestRoomPrice)(id, price);
    return (react_1.default.createElement("div", { className: "overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white h-full flex flex-col" },
        react_1.default.createElement("div", { className: "relative aspect-[4/3] overflow-hidden" },
            react_1.default.createElement(react_router_dom_1.Link, { to: `/${type}s/${id}` },
                react_1.default.createElement(OptimizedImage_1.default, { src: image, alt: name, className: "w-full h-full object-cover transition-transform hover:scale-110 duration-300", quality: 85, sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw", width: 400, height: 300 }),
                react_1.default.createElement("div", { className: "absolute top-2 left-2 bg-ocean text-white text-[10px] md:text-xs font-medium px-2 py-0.5 rounded" }, type === 'villa' ? 'Villa' : 'Homestay'))),
        react_1.default.createElement("div", { className: "p-2.5 md:p-3 flex flex-col flex-grow bg-white" },
            react_1.default.createElement("div", { className: "flex justify-between items-start gap-2 mb-1.5" },
                react_1.default.createElement("h3", { className: "font-bold text-sm md:text-base text-ocean line-clamp-2 flex-grow" }, name),
                react_1.default.createElement("div", { className: "flex items-center flex-shrink-0" },
                    react_1.default.createElement(lucide_react_1.Star, { size: 14, className: "text-yellow-400 fill-yellow-400" }),
                    react_1.default.createElement("span", { className: "ml-0.5 text-xs md:text-sm font-medium text-gray-700" }, rating.toFixed(1)),
                    react_1.default.createElement("span", { className: "ml-0.5 text-gray-500 text-[10px] md:text-xs" },
                        "(",
                        reviews,
                        ")"))),
            react_1.default.createElement("div", { className: "border-b border-gray-200 mb-2" }),
            react_1.default.createElement("div", { className: "flex items-center text-gray-600 mb-1.5" },
                react_1.default.createElement(lucide_react_1.MapPin, { size: 14, className: "mr-1 flex-shrink-0 text-coral" }),
                react_1.default.createElement("span", { className: "text-xs md:text-sm line-clamp-1" }, location)),
            react_1.default.createElement("div", { className: "flex items-center text-gray-600 mb-2" },
                react_1.default.createElement(lucide_react_1.Users, { size: 14, className: "mr-1 flex-shrink-0 text-coral" }),
                react_1.default.createElement("span", { className: "text-xs md:text-sm" },
                    capacity,
                    " ",
                    capacity === 1 ? 'Tamu' : 'Tamu')),
            react_1.default.createElement("div", { className: "flex items-center gap-2 md:gap-3 mb-2" },
                react_1.default.createElement("div", { className: "flex items-center text-ocean" },
                    react_1.default.createElement(lucide_react_1.Snowflake, { size: 14, className: "mr-1 flex-shrink-0" }),
                    react_1.default.createElement("span", { className: "text-[10px] md:text-xs" }, "AC")),
                react_1.default.createElement("div", { className: "flex items-center text-ocean" },
                    react_1.default.createElement(lucide_react_1.Fan, { size: 14, className: "mr-1 flex-shrink-0" }),
                    react_1.default.createElement("span", { className: "text-[10px] md:text-xs" }, "Kipas")),
                react_1.default.createElement("div", { className: "flex items-center text-ocean" },
                    react_1.default.createElement(lucide_react_1.Bath, { size: 14, className: "mr-1 flex-shrink-0" }),
                    react_1.default.createElement("span", { className: "text-[10px] md:text-xs line-clamp-1" }, "Kamar Mandi"))),
            react_1.default.createElement("div", { className: "border-b border-gray-200 mb-2" }),
            react_1.default.createElement("div", { className: "flex justify-between items-end mt-auto" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", { className: "text-base md:text-lg font-bold text-coral" },
                        "Rp ",
                        displayPrice.toLocaleString('id-ID')),
                    react_1.default.createElement("p", { className: "text-[10px] md:text-xs text-gray-500" }, "per malam")),
                react_1.default.createElement(react_router_dom_1.Link, { to: `/${type}s/${id}`, className: "text-xs md:text-sm font-medium text-ocean hover:text-ocean-dark hover:underline" }, "Lihat detail")))));
};
exports.default = PropertyCard;
