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
    name: 'Notify Radarr Or Sonarr By Keyword',
    description: `Search the file name for a keyword. If found the correct arr will be notified to refresh the item`,
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
            +'\\nnotified to refresh the movie, another example: i.am.movie.hear.me.roar.(2024).[967847].mkv does not have "tmdbid" keyword so Radarr will not be notified to refresh',
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
             +'\\nnotified to refresh the series, another example: i.am.episode.title.s01e04.[447119].mkv does not have "tvdbid" keyword so Sonarr will not be notified to refresh',
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
var plugin = function (args) {
    // plugin lib, load default values for inputs and import details
    const lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    // remaining left over variables from notifyRadarrOrSonarr 1.0.0, I have removed those I have replaced with new entries below
    var fileName = '', arrHost = '', headers = '', res = '', requestConfig = '', requestConfig2 = '', movieId = '',
     seriesId = '';
    var _b = '', _c = '';
    // get file name
    const fileNameCheck = fileUtils_1.getFileName(args.inputFileObj._id).toLowerCase(),
    // radarr inputs
    radarr_enabled = args.inputs.radarr_enabled,
    radarr_keyword = String(args.inputs.radarr_keyword).toLowerCase().trim(),
    radarr_api_key = String(args.inputs.radarr_api_key).trim(),
    radarr_host = String(args.inputs.radarr_host).toLowerCase().trim(),
    // sonarr inputs
    sonarr_enabled = args.inputs.sonarr_enabled,
    sonarr_keyword = String(args.inputs.sonarr_keyword).toLowerCase().trim(),
    sonarr_api_key = String(args.inputs.sonarr_api_key).trim(),
    sonarr_host = String(args.inputs.sonarr_host).toLowerCase().trim();
    // rest of variables
    let arrFound = 'none', arrsEnabled = 0, apiEnabled = 0, refreshedArr = false, seriesTitle = '', movieTitle = ''; 
    // check if any arrs are disabled
    if (radarr_enabled === false || sonarr_enabled === false) {
        if (radarr_enabled === false && sonarr_enabled === false) {
            args.jobLog(`\u2716\u2716\u2716 Radarr and Sonarr not enabled`);
            args.jobLog(`\u2716\u2716\u2716 Check your configuration`);
            args.jobLog(`Skipping plugin`)
            arrsEnabled = 0;
        } else if (radarr_enabled === false) {
            args.jobLog(`\u2716 Radarr not enabled`);
            args.jobLog(`\u2714 Sonarr enabled`);
            arrsEnabled = 1;
        } else {
            args.jobLog(`\u2716 Sonarr not enabled`);
            args.jobLog(`\u2714 Radarr enabled`);
            arrsEnabled = 1;
        }
    } else if (radarr_enabled === true && sonarr_enabled === true) {
        args.jobLog(`\u2714 Radarr enabled`);
        args.jobLog(`\u2714 Sonarr enabled`);
        arrsEnabled = 2;
    }
    // check if api key input is blank if arr is enabled
    if (arrsEnabled > 0 && radarr_api_key === '' || sonarr_api_key === '') {
        if (radarr_api_key === '' && sonarr_api_key === '') {
            args.jobLog(`\u2716\u2716\u2716 Radarr and Sonarr api keys are empty`);
            args.jobLog(`\u2716\u2716\u2716 Check your configuration`);
            apiEnabled = 0;
        } else if (radarr_api_key === '') {
            args.jobLog(`\u2716\u2716\u2716 Radarr api key is empty`);
            args.jobLog(`\u2716\u2716\u2716 Check your configuration`);
            args.jobLog(`\u2714 Sonarr api key is configured`);
            apiEnabled = 1;
        } else if (sonarr_api_key === ''){
            args.jobLog(`\u2714 Radarr api key is configured`);
            args.jobLog(`\u2716\u2716\u2716 Sonarr api key is empty`);
            args.jobLog(`\u2716\u2716\u2716 Check your configuration`);
            apiEnabled = 1;
        }
    } else if (arrsEnabled > 0 && radarr_api_key !== '' && sonarr_api_key !== '')  {
        args.jobLog(`\u2714 Radarr api key is configured`);
        args.jobLog(`\u2714 Sonarr api key is configured`);
        apiEnabled = 2;
    }
    // check if any host inputs are blank would go here if no default input was set
    // when default input is set input will never be blank
    // even if user empties input field and saves the default value is still used when plugin is run

    // checking file name jobLog message, just for funsies
    if (arrsEnabled > 0 && apiEnabled > 0) {
        if (radarr_enabled === true && sonarr_enabled === true) {
            args.jobLog(`Checking filename for keywords: ${radarr_keyword} ${sonarr_keyword} ...`);
        } else if (radarr_enabled === true) {
            args.jobLog(`Checking filename for keyword: ${radarr_keyword} ...`);
        } else {
            args.jobLog(`Checking filename for keyword: ${sonarr_keyword} ...`);
        }
    }
    // if arr enabled and api key not blank, check what arr the file belongs to based on keyword
    // and set variables and header
    if (arrsEnabled > 0 && apiEnabled > 0) {
        if (radarr_enabled === true && radarr_api_key !== '' && fileNameCheck.includes(radarr_keyword)) {
            args.jobLog(`\u2714 File exists in Radarr found keyword: ${radarr_keyword}`);
            arrFound = 'radarr';
            arrHost = radarr_host.endsWith('/') ? radarr_host.slice(0, -1) : radarr_host;
            headers = {
                'Content-Type': 'application/json',
                'X-Api-Key': radarr_api_key,
                Accept: 'application/json',
            };
        } else if (sonarr_enabled === true && sonarr_api_key !== '' && fileNameCheck.includes(sonarr_keyword)) {
            args.jobLog(`\u2714 File exists in Sonarr found keyword: ${sonarr_keyword}`);
            arrFound = 'sonarr';
            arrHost = sonarr_host.endsWith('/') ? sonarr_host.slice(0, -1) : sonarr_host;
            headers = {
                'Content-Type': 'application/json',
                'X-Api-Key': sonarr_api_key,
                Accept: 'application/json',
            };
        } else {
            if (arrFound === 'none') {
                if (radarr_enabled === true && radarr_api_key !== '') {
                    args.jobLog(`\u2716 Radarr did not find the keyword: ${radarr_keyword}`);
                } 
                if (sonarr_enabled === true && sonarr_api_key !== '') {
                    args.jobLog(`\u2716 Sonarr did not find the keyword: ${sonarr_keyword}`);
                }
            }
        }
    }
    // if keyword is found in one of the arrs continue with plugin, else skip to end
    if (arrFound !== 'none') {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        // original file 
                        fileName = ((_c = (_b = args.originalLibraryFile) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.FileName) || '';
                        //current file name, og file name should be used a s this plugin is called after file is replaced and becomes the new og file
                        //fileName = ((_c = (_b = args.inputFileObj) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.FileName) || '';
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
                        
                        args.jobLog(`${arr}`);// dev check
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
    return { // extra return for if no keywords found, send output 2 
        outputFileObj: args.inputFileObj,
        outputNumber: 2,
        variables: args.variables,
    };
};
exports.plugin = plugin;
    
    //else if (arrsEnabled === 1) {
        //if (radarr_api_key === '') {
          //  args.jobLog(`\u2716\u2716\u2716 Radarr api key input is empty`);
            //args.jobLog(`\u2716\u2716\u2716 Check your configuration`);
            //args.jobLog(`\u2714 Sonarr api key input is configured`);
            //apiEnabled = 1;
        //} else if (sonarr_api_key === ''){
            //args.jobLog(`\u2716\u2716\u2716 Sonarr api key input is empty`);
            //args.jobLog(`\u2716\u2716\u2716 Check your configuration`);
            //apiEnabled = 1;
        //}
    //}
