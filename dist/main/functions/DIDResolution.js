"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDidDocument = exports.getResolver = void 0;
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const Errors_1 = __importDefault(require("../types/Errors"));
const DidJWT_1 = require("./DidJWT");
function getResolver(opts) {
    if (opts && opts.resolver) {
        return opts.resolver;
    }
    if (!opts || !opts.didMethods) {
        throw new Error(Errors_1.default.BAD_PARAMS);
    }
    const uniResolvers = [];
    for (const didMethod of opts.didMethods) {
        const uniResolver = (0, did_uni_client_1.getUniResolver)((0, DidJWT_1.getMethodFromDid)(didMethod), { resolveUrl: opts.resolveUrl });
        uniResolvers.push(uniResolver);
    }
    return new did_resolver_1.Resolver(...uniResolvers);
}
exports.getResolver = getResolver;
function resolveDidDocument(did, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield getResolver(opts).resolve(did)).didDocument;
    });
}
exports.resolveDidDocument = resolveDidDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEUmVzb2x1dGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL2Z1bmN0aW9ucy9ESURSZXNvbHV0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUEwRDtBQUMxRCwrQ0FBMEc7QUFFMUcsNkRBQXlDO0FBR3pDLHFDQUE0QztBQUU1QyxTQUFnQixXQUFXLENBQUMsSUFBaUI7SUFDM0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7SUFDRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEM7SUFFRCxNQUFNLFlBQVksR0FFWixFQUFFLENBQUM7SUFDVCxLQUFLLE1BQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDdkMsTUFBTSxXQUFXLEdBQUcsSUFBQSwrQkFBYyxFQUFDLElBQUEseUJBQWdCLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDakcsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sSUFBSSx1QkFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQWhCRCxrQ0FnQkM7QUFFRCxTQUFzQixrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsSUFBa0I7O1FBQ3RFLE9BQU8sQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDNUQsQ0FBQztDQUFBO0FBRkQsZ0RBRUMifQ==