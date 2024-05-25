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
var fileUtils_1 = require("../../../../FlowHelpers/1.0.0/fileUtils");
var details = function () { return ({
    name: 'Notify Radarr or Sonarr by Keyword',
    description: 'Notify Radarr and Sonarr to refresh file based on a keyword in the file name. Searches file name for a keyword to let the plugin know to update Radarr or Sonarr. Default will look for "tvdbid" for Sonarr, so a file name should look like this secrets.of.the.hells.angels.s01e04.[tvdbid-447119].mkv, this file has "tvdbid", this file name secrets.of.the.hells.angels.s01e04.[447119].mkv does not have the "tvdbid" keyword so Sonarr will not be updated. ',
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
            label: 'Radarr keyword',
            name: 'radarr_keyword',
            type: 'string',
            defaultValue: 'tmdbid',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Specify what keyword to look for in the file name to know if the file is a movie',
        },
        {
            label: 'Radarr API Key',
            name: 'radarr_api_key',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Input your Radarr api key here',
        },
        {
            label: 'Radarr Host',
            name: 'radarr_host',
            type: 'string',
            defaultValue: 'http://192.168.1.1:7878',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Input your Radarr host here.'
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
            label: 'Sonarr keyword',
            name: 'sonarr_keyword',
            type: 'string',
            defaultValue: 'tvdbid',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Specify what keyword to look for in the file name to know if the file is a series',
        },
        {
            label: 'Sonarr API Key',
            name: 'sonarr_api_key',
            type: 'string',
            defaultValue: '',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Input your Sonarr api key here',
        },
        {
            label: 'Sonarr Host',
            name: 'sonarr_host',
            type: 'string',
            defaultValue: 'http://192.168.1.1:8989',
            inputUI: {
                type: 'text',
            },
            tooltip: 'Input your arr host here.'
                + '\\nExample:\\n'
                + 'http://192.168.1.1:8989\\n'
                + 'https://sonarr.domain.com\\n',
        },
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Radarr or Sonarr notified',
        },
        {
            number: 2,
            tooltip: 'Radarr or Sonarr do not know this file',
        },
    ],
}); };
exports.details = details;
var plugin = function (args) { 
    lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);

    var lib, _a, arr_host, fileName, arrHost, headers, requestConfig, res, movieId, requestConfig2, requestConfig, res, seriesId, requestConfig2;
    var _b, _c;

    const fileNameCheck = fileUtils_1.getFileName(args.inputFileObj._id).toLowerCase(); // set the file name so we can check if it includes keyword

    //radarr - input variables
    const radarr_enabled = args.inputs.radarr_enabled; // get/set if radarr enabled input
    const radarr_keyword = String(args.inputs.radarr_keyword).toLowerCase().trim(); // get/set the radarr keyword input
    const radarr_api_key = String(args.inputs.radarr_api_key).trim(); // get/set the radarr api key
    const radarr_host = String(args.inputs.radarr_host).toLowerCase().trim(); // get/set the radarr host url
    //sonarr - input variables
    const sonarr_enabled = args.inputs.sonarr_enabled; // get/set if sonarr enabled input
    const sonarr_keyword = String(args.inputs.sonarr_keyword).toLowerCase().trim(); // get/set the sonarr keyword input
    const sonarr_api_key = String(args.inputs.sonarr_api_key).trim(); // get/set the sonarr api key
    const sonarr_host = String(args.inputs.sonarr_host).toLowerCase().trim(); // get/set the sonarr host url
      
    let arrFound = 'none'; // set arrFound to none and change to arr name if keyword is found
    let refreshedArr = false; // return output, true output 1 false output 2
    let seriesTitle = ''; // series name blank so we set it later for jobLog
    let movieTitle = ''; // movie name blank so we set it later for jobLog

    // check if any arrs are disabled
    //args.jobLog(`radarr_enabled = ${radarr_enabled} and sonarr_enabled = ${sonarr_enabled}`); // dev check
    if (radarr_enabled === false || sonarr_enabled === false) {
        if (radarr_enabled === false && sonarr_enabled === false) {
            args.jobLog(`\u2716 \u2716 \u2716 Radarr and Sonarr not enabled`);
            args.jobLog(`Skipping plugin`)
        } else if (radarr_enabled === false) {
            args.jobLog(`\u2716 Radarr not enabled`);
            args.jobLog(`\u2714 Sonarr enabled`);
            args.jobLog(`Checking filename for keyword: ${sonarr_keyword} ...`);
        }else if (sonarr_enabled === false) {
            args.jobLog(`\u2716 Sonarr not enabled`);
            args.jobLog(`\u2714 Radarr enabled`);
            args.jobLog(`Checking filename for keyword: ${radarr_keyword} ...`);
        }
    } else if (radarr_enabled === true && sonarr_enabled === true) {
        args.jobLog(`\u2714 Radarr enabled`);
        args.jobLog(`\u2714 Sonarr enabled`);
        args.jobLog(`Checking filename for keywords: ${radarr_keyword} ${sonarr_keyword} ...`);
    }

    // check what arr the file belongs to base on keyword and set the variable values depending on the arr
    if (radarr_enabled === true && fileNameCheck.includes(radarr_keyword)) { // check for the radarr keyword input
        args.jobLog(`\u2714 File exists in Radarr found keyword: ${radarr_keyword}`); // output 1
        arrFound = 'radarr'; // file is found in radarr set arr to radarr
        arr_host = radarr_host; // set the arr host
        arrHost = arr_host.endsWith('/') ? arr_host.slice(0, -1) : arr_host; // remove any trailing slashes
        headers = { // set header with arr specific api key
            'Content-Type': 'application/json',
            'X-Api-Key': radarr_api_key,
            Accept: 'application/json',
        };
        //args.jobLog(`arr = ${arrFound}`); // dev check
    } else if (sonarr_enabled === true && fileNameCheck.includes(sonarr_keyword)) { // check for the sonarr keyword input
        args.jobLog(`\u2714 File exists in Sonarr found keyword: ${sonarr_keyword}`); // output 1
        arrFound = 'sonarr'; // file is found in sonarr set arr to sonarr
        arr_host = sonarr_host; // set the arr host
        arrHost = arr_host.endsWith('/') ? arr_host.slice(0, -1) : arr_host; // remove any trailing slashes
        headers = { // set header with arr specific api key
            'Content-Type': 'application/json',
            'X-Api-Key': sonarr_api_key,
            Accept: 'application/json',
        };
        //args.jobLog(`arr = ${arrFound}`); // dev check
    } else {
        if (radarr_enabled === true || sonarr_enabled === true && arrFound === 'none') {
            args.jobLog(`\u2716 Keyword(s) not found in file name`); // send to return, outout 2
        }        
    }

    if (arrFound !=='none') {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fileName = ((_c = (_b = args.originalLibraryFile) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.FileName) || '';
                        args.jobLog('Going to force scan');
                        if (!(arrFound === 'radarr')) return [3 /*break*/, 3];
                        args.jobLog('Refreshing Radarr...');
                        requestConfig = {
                            method: 'get',
                            url: "".concat(arrHost, "/api/v3/parse?title=").concat(encodeURIComponent(fileName)),
                            headers: headers,
                        };
                        return [4 /*yield*/, args.deps.axios(requestConfig)];
                    case 1:
                        res = _d.sent();
                        movieId = res.data.movie.movieFile.movieId;
                        movieTitle = res.data.movie.title;
                        requestConfig2 = {
                            method: 'post',
                            url: "".concat(arrHost, "/api/v3/command"),
                            headers: headers,
                            data: JSON.stringify({
                                name: 'RefreshMovie',
                                movieIds: [movieId],
                            }),
                        };
                        return [4 /*yield*/, args.deps.axios(requestConfig2)];
                    case 2:
                        _d.sent();
                        args.jobLog(`\u2714 Refreshed movie `.concat(movieTitle, ` with ID `).concat(movieId, ` in Radarr`));
                        refreshedArr = true;
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(arrFound === 'sonarr')) return [3 /*break*/, 6];
                        args.jobLog('Refreshing Sonarr...');
                        requestConfig = {
                            method: 'get',
                            url: "".concat(arrHost, "/api/v3/parse?title=").concat(encodeURIComponent(fileName)),
                            headers: headers,
                        };
                        return [4 /*yield*/, args.deps.axios(requestConfig)];
                    case 4:
                        res = _d.sent();
                        seriesId = res.data.series.id;
                        seriesTitle = res.data.series.title;
                        requestConfig2 = {
                            method: 'post',
                            url: "".concat(arrHost, "/api/v3/command"),
                            headers: headers,
                            data: JSON.stringify({
                                name: 'RefreshSeries',
                                seriesId: seriesId, 
                            }),
                        };
                        return [4 /*yield*/, args.deps.axios(requestConfig2)];
                    case 5:
                        _d.sent();
                        args.jobLog(`\u2714 Refreshed series `.concat(seriesTitle, ` with ID `).concat(seriesId, ` in Sonarr`));
                        refreshedArr = true;
                        return [3 /*break*/, 7];
                    case 6:
                        
                        args.jobLog(`${arr}`);
                        args.jobLog('\u2716 No arr specified in plugin inputs.');
                        args.jobLog(`\u2716 Skipping plugin`);
                        _d.label = 7;
                    case 7: return [2 /*return*/, {
                            outputFileObj: args.inputFileObj,
                            outputNumber: refreshedArr ? 1 : 2,
                            variables: args.variables,
                        }];
                }
            });
        });
    }
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 2,
        variables: args.variables,
    };
};
exports.plugin = plugin;