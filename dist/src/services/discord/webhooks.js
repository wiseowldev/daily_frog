function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { API_BASE_URL } from "./constants.js";
var WebhookService = /*#__PURE__*/ function() {
    "use strict";
    function WebhookService() {
        _class_call_check(this, WebhookService);
        _define_property(this, "__token", void 0);
        _define_property(this, "__webhookId", void 0);
    }
    _create_class(WebhookService, [
        {
            key: "init",
            value: function init(webhook) {
                var _this = this;
                return _async_to_generator(function() {
                    var response, message, data;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    fetch(webhook)
                                ];
                            case 1:
                                response = _state.sent();
                                if (!!response.ok) return [
                                    3,
                                    3
                                ];
                                return [
                                    4,
                                    response.text()
                                ];
                            case 2:
                                message = _state.sent();
                                throw new Error("Unable to retrieve webhook details [".concat(response.status, " - ").concat(response.statusText, "]"));
                            case 3:
                                return [
                                    4,
                                    response.json()
                                ];
                            case 4:
                                data = _state.sent();
                                _this.__token = data["token"];
                                _this.__webhookId = data["id"];
                                return [
                                    2,
                                    _this
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getWebhookUrl",
            value: function getWebhookUrl() {
                return "".concat(API_BASE_URL, "/webhooks/").concat(this.__webhookId, "/").concat(this.__token);
            }
        },
        {
            key: "send_embeds",
            value: function send_embeds(embeds, attachments) {
                var _this = this;
                return _async_to_generator(function() {
                    var i, headers, _attachments_length, data, res, message;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (embeds.length == 0) throw new Error("Expected at least 1, and at max 10 embeds.");
                                if (embeds.length > 10) throw new Error("Can only send a maximum of 10 embeds via discord webhooks.");
                                for(i = 0; i < embeds.length; ++i)embeds[i].type = "rich";
                                headers = {
                                    "Content-Type": "application/json"
                                };
                                data = _object_spread({
                                    embeds: embeds
                                }, ((_attachments_length = attachments === null || attachments === void 0 ? void 0 : attachments.length) !== null && _attachments_length !== void 0 ? _attachments_length : 0) > 0 && {
                                    attachments: attachments
                                } || {});
                                return [
                                    4,
                                    fetch(_this.getWebhookUrl(), {
                                        method: "POST",
                                        headers: headers,
                                        body: JSON.stringify(data)
                                    })
                                ];
                            case 1:
                                res = _state.sent();
                                if (!!res.ok) return [
                                    3,
                                    3
                                ];
                                return [
                                    4,
                                    res.text()
                                ];
                            case 2:
                                message = _state.sent();
                                throw new Error("Failed to send the embeds [".concat(res.status, " - ").concat(res.statusText, "]\n").concat(message));
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return WebhookService;
}();
export { WebhookService as default };
