"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataFromPath = void 0;
const jsonpath_1 = __importDefault(require("jsonpath"));
function extractDataFromPath(obj, path) {
    return jsonpath_1.default.nodes(obj, path);
}
exports.extractDataFromPath = extractDataFromPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9mdW5jdGlvbnMvT2JqZWN0VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQTBCO0FBRTFCLFNBQWdCLG1CQUFtQixDQUFDLEdBQVksRUFBRSxJQUFZO0lBQzVELE9BQU8sa0JBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCxrREFFQyJ9