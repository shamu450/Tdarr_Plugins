"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
var fileUtils_1 = require("../../../../FlowHelpers/1.0.0/fileUtils");
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Set Faststart Flag',
    description: `Set faststart flag if needed. Only for MOV family MP4, M4V, MOV. Can be placed anywhere
    in the flow; non valid containers will ignore the flag and valid containers with the flag will be skipped.
    You can set the flag with the custom argument plugin but it will do a second pass to add the flag to
    valid containers even if the file already has the flag enabled. This plugin will save the time of the
    second pass on files that alreay have the flag and set the flag on those that need it. "What is faststart
    flag? MP4 videos contain a flag that tells the player when it can start, called the moov atom. When this
    flag is set at the end of a file, some players will wait until the entire video is downloaded before they
    start playing. To speed up this process, always look for a checkbox called fast start or web optimized
    or streaming enabled and enable it when exporting a video." source: https://code.pixplicity.com/ffmpeg/faststart/`,
    style: {
        borderColor: '#6efefc',
    },
    tags: 'video',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.11.01',
    sidebarPosition: -1,
    icon: '',
    inputs: [],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    var container = fileUtils_1.getContainer(args.originalLibraryFile._id).toLowerCase();
    var hasFlag = false;

    if (container === 'mp4' || container === 'm4v' || container === 'mov') { // verify container type before continuing
        for (var i = 0; i < args.inputFileObj.mediaInfo.track.length; i++) { // loop mediaInfo track objects so we can find track/key 0
            var tracks = args.inputFileObj.mediaInfo.track[i]; // set tracks to the current key # 
            if (i === 0 && tracks.IsStreamable.toLowerCase() === 'yes') { // if i is track/key 0 and IsStreamable is yes, already has flag, skip
                args.jobLog(`\u2714 File is ${container} and already has faststart flag`); // jobLog message file already has flag
                args.jobLog(`\u2714 Skipping setting faststart`); // jobLog message
                hasFlag = true; // set hasFlag to true 
                break; // break the loop
            } else if (i === 0 && tracks.IsStreamable.toLowerCase() === 'no') { // if i is track 0 and IsStreamable is no set flag
                args.jobLog(`\u2716 File is ${container} and does not have the faststart flag`); // jobLog message file does not have flag
                args.jobLog(`\u2714 Setting faststart flag`); // jobLog message setting flag on file
                args.variables.ffmpegCommand.overallOuputArguments.push('-movflags', 'faststart'); // set new codec tag with ffmpeg output variables
                hasFlag= true; // set hasFlag to true
                break; // break the loop
            }
        }
    } else { // if container is not mp4,m4v,mov now,  it may be remuxed later so we set flag and non valid containers will ignore it and remuxed mp4 will have the flag set
        args.jobLog(`\u2714 Setting faststart flag`); // jobLog message setting flag on file
        args.variables.ffmpegCommand.overallOuputArguments.push('-movflags', 'faststart'); // set new codec tag with ffmpeg output variables
        hasFlag= true; // set hasFlag to true
    }
    
    if (hasFlag === false) { // if hasFlag is still false and wrong conatiner is false means track 0 wasn't found
        args.jobLog(`\u2716\u2716\u2716 No track 0 found !? Might want to get that checked out ASAP ☒☒☒`); // jobLog message no track 0 found
        args.jobLog(`\u2716\u2716\u2716 Flag can't be set, skipping plugin ☒☒☒`); // jobLog message
    }

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };
};
exports.plugin = plugin;