import { getFileName } from '../../../../FlowHelpers/1.0.0/fileUtils';
import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
  } from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';  
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = (): IpluginDetails => ({
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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = async (args: IpluginInputArgs): Promise<IpluginOutputArgs> => {
    const lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    //
    // set variables
    //
    const currentFileName = args.inputFileObj?._id.toLowerCase() ?? '', // from notifyRadarrOrSonarr/2.0.0 // getFileName(args.inputFileObj._id).toLowerCase(),
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
    let arr = '', arrCapped = '', arrEnabled = false, arrHost = '', apiKey = '',  apiEnabled = false, gotHeaderReply = false,
     headers, headersReady = false, host = '', itemId = '', itemIdsType = '', itemTitle= '', keywordFound = false, 
     refreshedArr = false, refreshName = '', fileType, keyword;
    //
    // check file name for keyword, no keyword means no need to do anything else in script
    // set generic variables for arr name and jobLog messages
    //
    if (currentFileName.includes(radarr_keyword)) {  
        keywordFound = true;
        arr = 'radarr';
        arrCapped = 'Radarr';
        fileType = 'movie';
        keyword = radarr_keyword;
    } else if (currentFileName.includes(sonarr_keyword)) {
        keywordFound = true;
        arr = 'sonarr';
        arrCapped = 'Sonarr';
        fileType = 'episode';
        keyword = sonarr_keyword;
    } else {
        args.jobLog(`\u2716\u2716\u2716 The keywords "${radarr_keyword}" or "${sonarr_keyword}" were not found in the file name ...`);
        args.jobLog(`\u2716 Radarr and Sonarr will cannot be refreshed ...`);
    }
    //
    //
    //
    if (keywordFound === true) {  
        args.jobLog(`\u2714 Found keyword "${keyword}" in the file name ...`);
        args.jobLog(`Treating file as a ${fileType}, continuing with ${arrCapped}`);
    }
    //
    // check if arr is enabled for file content type
    // set arrEnabled generic variable
    //
    if (keywordFound === true) {
        if (arr === 'radarr') {
            if (radarr_enabled === true) {
                arrEnabled = true;
                args.jobLog(`\u2714 Radarr notification is enabled`);
            } else {
                args.jobLog(`\u2716\u2716\u2716 Radarr notification is not enabled`);
                args.jobLog(`Check your configuration`);
            }
        } else if (arr === 'sonarr') {
            if (sonarr_enabled === true) {
                arrEnabled = true;
                args.jobLog(`\u2714 Sonarr notification is enabled`);
            } else {
                args.jobLog(`\u2716\u2716\u2716 Sonarr notification is not enabled`);
                args.jobLog(`Check your configuration`);
            }
        }        
    }
    //
    // check if api key has a value for enabled arr
    // set rest of generic variables
    //
    if (arrEnabled == true) {
        if (arr === 'radarr') {
            if (radarr_api_key !== '') { // api key has a value
                apiEnabled = true; // generic api enabled variable
                apiKey = radarr_api_key; // generic api key variable to use in request header
                host = radarr_host; // generic host variable to use in request header
                itemIdsType = 'movieIds'; // generic variable to use in POST reuqest
                refreshName = 'RefreshMovie'; // generic variable to use in POST reuqest
                args.jobLog(`\u2714 Radarr api key is not empty, continuing with plugin ...`);
            } else { // api key input is empty
                args.jobLog(`\u2716\u2716\u2716 Radarr api key is empty`);
                args.jobLog(`Check your configuration`);
            }
        } else if (arr === 'sonarr') {
            if (sonarr_api_key !== '') { // api key has a value
                apiEnabled = true; // generic api enabled variable
                apiKey = sonarr_api_key; // generic api key variable to use in request header
                host = sonarr_host; // generic host variable to use in request header
                itemIdsType = 'seriesIds'; // generic variable to use in POST reuqest
                refreshName = 'RefreshSeries'; // generic variable to use in POST reuqest
                args.jobLog(`\u2714 Sonarr api key is not empty, continuing with plugin ...`);
            } else { // api key input is empty
                args.jobLog(`\u2716\u2716\u2716 Sonarr api key is empty`);
                args.jobLog(`Check your configuration`);
            }
        }
    }
    //
    // build headers
    // remove trailing slash on host url if needed
    //
    if (apiEnabled === true) {
        args.jobLog(`Preparing request headers ...`);
        headers = {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey,
            Accept: 'application/json',
        };
        arrHost = host.endsWith('/') ? host.slice(0, -1) : host;
        headersReady = true;
    }
    //
    // send GET request for file arr ID using original file name
    //
    if (headersReady === true) {
        args.jobLog(`Retreiving file ID from ${arrCapped} ...`);
        const originalFileName = args.originalLibraryFile?.meta?.FileName || '';
        const requestConfig = {
            method: 'get',
            url: `${arrHost}/api/v3/parse?title=${encodeURIComponent(originalFileName)}`, // can I search by tmdbid or tvdbid? Why are API docs crap? 
            headers,
        };
        try {
            const res = await args.deps.axios(requestConfig); // send GET request and store reply as res
            args.jobLog(`\u2714 Web request succeeded. Status Code: ${res.status}`); // displays status code of the successful web request
            if (arr === 'radarr') { // get movie ID and title from GET response and setup generic variables for next request
                itemId = res.data.movie.movieFile.movieId;
                itemTitle = res.data.movie.title;
            } else { // get series ID and title from GET response and setup generic variables for next request
                itemId = res.data.series.id;
                itemTitle = res.data.series.title;
            }
            args.jobLog(`\u2714 The ID of ${itemTitle} is ${itemId}`);
            gotHeaderReply = true;
        } catch (err) { // error report for failed web requests
            args.jobLog('\u2716\u2716\u2716 Web Request Failed');
            args.jobLog(JSON.stringify(err));
            throw new Error('Web Request Failed');
        }
    }
    //
    // send POST request to tell arr to refresh movie/series
    //
    if (gotHeaderReply === true) {
        args.jobLog(`Preparing to send refresh request to ${arrCapped} ...`);
        const requestConfig2 = {
            method: 'post',
            url: `${arrHost}/api/v3/command`,
            headers,
            data: JSON.stringify({
                name: refreshName,
                [itemIdsType]: [itemId],
            }),
        };     
        try {
            const res2 = await args.deps.axios(requestConfig2); // send POST request and store reply as res2
            args.jobLog(`\u2714 Web request succeeded. Status Code: ${res2.status}`); // displays status code of the successful web request
            args.jobLog(`\u2714 Refreshed ${itemTitle} with ID ${itemId} in ${arrCapped}`);
            refreshedArr = true;
        } catch (err) { // error report for failed web requests
            args.jobLog('\u2716\u2716\u2716 Web Request Failed');
            args.jobLog(JSON.stringify(err));
            throw new Error('Web Request Failed');
        }
    }
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: refreshedArr ? 1 : 2,
        variables: args.variables,
    };
};
export {
    details,
    plugin,
};