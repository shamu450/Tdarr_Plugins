"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
var fileUtils_1 = require("../../../../FlowHelpers/1.0.0/fileUtils");
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Set Faststart Flag - MP4 M4V MOV',
    description: `Set the faststart flag if not already set. Only for the MOV family MP4, M4V, MOV.
    Everything else is skipped so place after you have already remuxed to mp4. MKV with IsStreamable = Yes remuxed
    to MP4 = MP4 with IsStreamable = No. What is faststart flag? MP4 videos contain a flag
    that tells the player when it can start, called the moov atom. When this flag is set at the end of a file,
    some players will wait until the entire video is downloaded before they start playing. To speed up this process,
    always look for a checkbox called fast start or web optimized or streaming enabled and enable it when exporting a video.
    Faststart has historically been referred to as "web optimised" or "streaming enabled" `,
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
            tooltip: 'File already has faststart flag or is not part of MOV family.',
        },
        {
            number: 2,
            tooltip: 'Faststart flag will be added to the file.',
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
    var wrongContainer = false;

    if (container === 'mp4' || container === 'm4v' || container === 'mov') { // verify container type before continuing
        for (var i = 0; i < args.inputFileObj.mediaInfo.track.length; i++) { // loop mediaInfo track objects so we can find track/key 0
            var tracks = args.inputFileObj.mediaInfo.track[i]; // set tracks to the current key # 
            if (i === 0 && tracks.IsStreamable.toLowerCase() === 'yes') { // if i is track/key 0 and IsStreamable is yes, already has flag, skip
                args.jobLog(`☑ File already has faststart flag`); // jobLog message file already has flag
                hasFlag = true; // set hasFlag to true 
                break; // break the loop
            } else if (i === 0 && tracks.IsStreamable.toLowerCase() === 'no') { // if i is track 0 and IsStreamable is no set flag
                args.jobLog(`☒ File does not have the faststart flag`); // jobLog message file does not have flag
                args.jobLog(`☑ Setting faststart flag`); // jobLog message setting flag on file
                args.variables.ffmpegCommand.overallOuputArguments.push('-movflags', 'faststart'); // set new codec tag with ffmpeg output variables
                hasFlag= true; // set hasFlag to true
                break; // break the loop
            }
        }
    } else { // wrong container for setting faststart flag
        args.jobLog(`☒☒☒ Container is ${container} - faststart flag requires MP4, M4V or MOV ☒☒☒ `); // jobLog message wrong container
        args.jobLog(`☒☒☒ Flag can't be set, skipping plugin ☒☒☒ `); // jobLog message skipping pluggin
        wrongContainer = true; // set wrongContainer to true 
    }
    
    if (hasFlag === false && wrongContainer === false) { // if hasFlag is still false and wrong conatiner is false means track 0 wasn't found
        args.jobLog(`☒☒☒ No track 0 found !? Might want to get that checked out ASAP ☒☒☒ `); // jobLog message no track 0 found
        args.jobLog(`☒☒☒ Flag can't be set, skipping plugin ☒☒☒ `); // jobLog message
    }
    
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: hasFlag ? 1 : 2,
        variables: args.variables,
    };
};
exports.plugin = plugin;