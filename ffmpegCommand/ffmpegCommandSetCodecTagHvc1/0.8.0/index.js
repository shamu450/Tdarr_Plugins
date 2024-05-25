"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Set Codec Tag To Hvc1 For HEVC',
    description: `Set codec tag to hvc1 for HEVC files. For better Apple device compatibility. Already hvc1 and other
     codecs will be skipped.`,
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
            tooltip: 'Continue to next plugin.',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    // const codec = String(args.inputs.codec).trim().toLowerCase();
    // const codecTag = String(args.inputs.codecTag).trim().toLowerCase();
    const streamsLength = args.variables.ffmpegCommand.streams.length;
    let changedCodecTag = false;
    for (let i = 0; i < streamsLength; i += 1) {
        let stream = args.variables.ffmpegCommand.streams[i];
        if (stream.codec_type === 'video') {
            args.jobLog(`\u2714 Found video stream, checking for ${codec} ...`);
            if (stream.codec_name === codec) {
                args.jobLog(`\u2714 File is ${stream.codec_name}`);
                if (stream.codec_tag_string !== codecTag) {
                    args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', codecTag); // set tag to keyword
                    args.jobLog(`\u2714 Setting codec tag to ${codecTag}`);
                    changedCodecTag = true;
                    break; // break loop bc we found the video stream
                } else {
                    args.jobLog(`\u2714 File already has ${stream.codec_tag_string} codec tag`);
                    break; // break loop bc we found the video stream
                }
            } else {
                args.jobLog(`\u2716 File codec not ${codec}, it is ${stream.codec_name}`);
                args.jobLog(`\u2716 Skipping file`);
            }
        }
    }
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };
};
exports.plugin = plugin;