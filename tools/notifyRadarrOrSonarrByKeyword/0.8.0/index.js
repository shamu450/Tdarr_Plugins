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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Notify Radarr Or Sonarr By Keyword',
    description: "Search the file name for a keyword. If found the correct arr will be notified to refresh the item",
    style: {
        borderColor: 'green',
    },
    tags: '',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.11.01',
    sidebarPosition: -1,
    icon: 'faBell',
    inputs: [
        {
            label: 'Enable Radarr Keyword Search',
            name: 'radarr_enabled',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Enable Radarr keyword search',
        },
        {
            label: 'Specify A Keyword For Radarr',
            name: 'radarr_keyword',
            type: 'string',
            defaultValue: 'tmdbid',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Specify one keyword to look for in the file name, default value of "tmdbid" will be used if left blank. If found Radarr will be notified to refresh the item.'
                + '\\nAn example using the default keyword "tmdbid", example file: i.am.movie.hear.me.roar.(2024).[tmdbid-967847].mkv, plugin found keyword "tmdbid" and Radarr will be\\n'
                + '\\nnotified to refresh the movie, another example: i.am.movie.hear.me.roar.(2024).[967847].mkv does not have "tmdbid" keyword so Radarr will not be notified to refresh',
        },
        {
            label: 'Enter Your Radarr API Key',
            name: 'radarr_api_key',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Your Radarr api key goes here, open Radarr > settings > general > Security section. Copy and paste the value',
        },
        {
            label: 'Enter Your Radarr Host Address',
            name: 'radarr_host',
            type: 'string',
            defaultValue: 'http://192.168.1.1:7878',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Your Radarr host address goes here, default value of http://192.168.1.1:7878 will be used if left blank'
                + '\\nExample:\\n'
                + 'http://192.168.1.1:7878\\n'
                + 'https://radarr.domain.com\\n',
        },
        {
            label: 'Enable Sonarr Keyword Search',
            name: 'sonarr_enabled',
            type: 'boolean',
            defaultValue: 'false',
            inputUI: {
                type: 'switch',
            },
            tooltip: 'Enable Sonarr keyword search',
        },
        {
            label: 'Specify A Keyword For Sonarr',
            name: 'sonarr_keyword',
            type: 'string',
            defaultValue: 'tvdbid',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Specify one keyword to look for in the file name, default value of "tvdbid" will be used if left blank. If found Sonarr will be notified to refresh the item.'
                + '\\nAn example using the default keyword "tvdbid", example file: i.am.episode.title.s01e04.[tvdbid-447119].mkv, plugin found keyword "tvdbid" and Sonarr will be\\n'
                + '\\nnotified to refresh the series, another example: i.am.episode.title.s01e04.[447119].mkv does not have "tvdbid" keyword so Sonarr will not be notified to refresh',
        },
        {
            label: 'Enter Your Sonarr API Key',
            name: 'sonarr_api_key',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Your Sonarr api key goes here, open Sonarr > settings > general > Security section. Copy and paste the value',
        },
        {
            label: 'Enter Your Sonarr Host Address',
            name: 'sonarr_host',
            type: 'string',
            defaultValue: 'http://192.168.1.1:8989',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Your Sonarr host address goes here, default value of http://192.168.1.1:8989 will be used if left blank'
                + '\\nExample:\\n'
                + 'http://192.168.1.1:8989\\n'
                + 'https://sonarr.domain.com\\n',
        },
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Radarr or Sonarr notified to refresh',
        },
        {
            number: 2,
            tooltip: 'Radarr or Sonarr do not know this file',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var lib, currentFileName, 
    // radarr inputs
    radarr_enabled, radarr_keyword, radarr_api_key, radarr_host, 
    // sonarr inputs
    sonarr_enabled, sonarr_keyword, sonarr_api_key, sonarr_host, arr, arrCapped, arrEnabled, arrHost, apiKey, apiEnabled, gotHeaderReply, headers, headersReady, host, itemId, itemIdsType, itemTitle, keywordFound, refreshedArr, refreshName, movieId, movieTitle, seriesId, seriesTitle, originalFileName, requestConfig, res, err_1, requestConfig2, res2, err_2;
    var _a;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                lib = require('../../../../../methods/lib')();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
                args.inputs = lib.loadDefaultValues(args.inputs, details);
                currentFileName = (_c = (_b = args.inputFileObj) === null || _b === void 0 ? void 0 : _b._id.toLowerCase()) !== null && _c !== void 0 ? _c : '', radarr_enabled = args.inputs.radarr_enabled, radarr_keyword = String(args.inputs.radarr_keyword).toLowerCase().trim(), radarr_api_key = String(args.inputs.radarr_api_key).trim(), radarr_host = String(args.inputs.radarr_host).toLowerCase().trim(), sonarr_enabled = args.inputs.sonarr_enabled, sonarr_keyword = String(args.inputs.sonarr_keyword).toLowerCase().trim(), sonarr_api_key = String(args.inputs.sonarr_api_key).trim(), sonarr_host = String(args.inputs.sonarr_host).toLowerCase().trim();
                arr = '', arrCapped = '', arrEnabled = false, arrHost = '', apiKey = '', apiEnabled = false, gotHeaderReply = false, headersReady = false, host = '', itemId = '', itemIdsType = '', itemTitle = '', keywordFound = false, refreshedArr = false, refreshName = '';
                //
                // check file name for keyword, no keyword means no need to do anything else in script
                // set generic variables for arr name
                //
                if (currentFileName.includes(radarr_keyword)) {
                    keywordFound = true;
                    arr = 'radarr';
                    args.jobLog("\u2714 Found keyword \"".concat(radarr_keyword, "\" in the file name, treating file as a movie"));
                }
                else if (currentFileName.includes(sonarr_keyword)) {
                    keywordFound = true;
                    arr = 'sonarr';
                    args.jobLog("\u2714 Found keyword \"".concat(sonarr_keyword, "\" in the file name, treating file as an episode"));
                }
                else {
                    args.jobLog("\u2716\u2716\u2716 The keywords \"".concat(radarr_keyword, "\" and \"").concat(sonarr_keyword, "\" were not found in the file name"));
                    args.jobLog("\u2716 Radarr or Sonarr will not be refreshed");
                }
                //
                // check if arr is enabled for file content type
                // set arrEnabled generic variable
                //
                if (keywordFound === true) {
                    if (arr === 'radarr') {
                        if (radarr_enabled === true) {
                            arrEnabled = true;
                            args.jobLog("\u2714 Radarr notification is enabled");
                        }
                        else {
                            args.jobLog("\u2716\u2716\u2716 Radarr notification is not enabled");
                            args.jobLog("Check your configuration");
                        }
                    }
                    else if (arr === 'sonarr') {
                        if (sonarr_enabled === true) {
                            arrEnabled = true;
                            args.jobLog("\u2714 Sonarr notification is enabled");
                        }
                        else {
                            args.jobLog("\u2716\u2716\u2716 Sonarr notification is not enabled");
                            args.jobLog("Check your configuration");
                        }
                    }
                }
                //
                // check if api key has a value for enabled arr
                // set generic variables for apikey and host
                //
                if (arrEnabled == true) {
                    if (arr === 'radarr') {
                        if (radarr_api_key !== '') {
                            arrCapped = 'Radarr';
                            apiEnabled = true;
                            apiKey = radarr_api_key;
                            host = radarr_host;
                            args.jobLog("\u2714 Radarr api key is not empty");
                        }
                        else {
                            args.jobLog("\u2716\u2716\u2716 Radarr api key is empty");
                            args.jobLog("Check your configuration");
                        }
                    }
                    else if (arr === 'sonarr') {
                        if (sonarr_api_key !== '') {
                            arrCapped = 'Sonarr';
                            apiEnabled = true;
                            apiKey = sonarr_api_key;
                            host = sonarr_host;
                            args.jobLog("\u2714 Sonarr api key is not empty");
                        }
                        else {
                            args.jobLog("\u2716\u2716\u2716 Sonarr api key is empty");
                            args.jobLog("Check your configuration");
                        }
                    }
                }
                //
                // build headers
                // remove trailing slash on host url if needed
                //
                if (apiEnabled === true) {
                    args.jobLog("Preparing request headers ...");
                    headers = {
                        'Content-Type': 'application/json',
                        'X-Api-Key': apiKey,
                        Accept: 'application/json',
                    };
                    arrHost = host.endsWith('/') ? host.slice(0, -1) : host;
                    headersReady = true;
                }
                if (!(headersReady === true)) return [3 /*break*/, 4];
                args.jobLog("Retreiving file ID from ".concat(arrCapped, " ..."));
                originalFileName = (_e = (_d = args.originalLibraryFile) === null || _d === void 0 ? void 0 : _d._id) !== null && _e !== void 0 ? _e : '';
                requestConfig = {
                    method: 'get',
                    url: "".concat(arrHost, "/api/v3/parse?title=").concat(encodeURIComponent(originalFileName)), // can I search by tmdbid or tvdbid? Why are API docs crap? 
                    headers: headers,
                };
                _f.label = 1;
            case 1:
                _f.trys.push([1, 3, , 4]);
                return [4 /*yield*/, args.deps.axios(requestConfig)];
            case 2:
                res = _f.sent();
                args.jobLog("\u2714 Web request succeeded. Status Code: ".concat(res.status)); // displays status code of the successful web request
                if (arr === 'radarr') { // get movie ID and title from GET response and setup generic variables for next request
                    itemId = res.data.movie.movieFile.movieId;
                    itemIdsType = 'movieIds';
                    itemTitle = res.data.movie.title;
                    refreshName = 'RefreshMovie';
                }
                else { // get series ID and title from GET response and setup generic variables for next request
                    itemId = res.data.series.id;
                    itemIdsType = 'seriesIds';
                    itemTitle = res.data.series.title;
                    refreshName = 'RefreshSeries';
                }
                args.jobLog("\u2714 The ID of ".concat(itemTitle, " is ").concat(itemId));
                gotHeaderReply = true;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _f.sent();
                args.jobLog('\u2716\u2716\u2716 Web Request Failed');
                args.jobLog(JSON.stringify(err_1));
                throw new Error('Web Request Failed');
            case 4:
                if (!(gotHeaderReply === true)) return [3 /*break*/, 8];
                args.jobLog("Preparing to send refresh request to ".concat(arrCapped, " ..."));
                requestConfig2 = {
                    method: 'post',
                    url: "".concat(arrHost, "/api/v3/command"),
                    headers: headers,
                    data: JSON.stringify((_a = {
                            name: refreshName
                        },
                        _a[itemIdsType] = [itemId],
                        _a)),
                };
                _f.label = 5;
            case 5:
                _f.trys.push([5, 7, , 8]);
                return [4 /*yield*/, args.deps.axios(requestConfig2)];
            case 6:
                res2 = _f.sent();
                args.jobLog("\u2714 Web request succeeded. Status Code: ".concat(res2.status)); // displays status code of the successful web request
                args.jobLog("\u2714 Refreshed ".concat(itemTitle, " with ID ").concat(itemId, " in ").concat(arrCapped));
                refreshedArr = true;
                return [3 /*break*/, 8];
            case 7:
                err_2 = _f.sent();
                args.jobLog('\u2716\u2716\u2716 Web Request Failed');
                args.jobLog(JSON.stringify(err_2));
                throw new Error('Web Request Failed');
            case 8: return [2 /*return*/, {
                    outputFileObj: args.inputFileObj,
                    outputNumber: refreshedArr ? 1 : 2,
                    variables: args.variables,
                }];
        }
    });
}); };
exports.plugin = plugin;
