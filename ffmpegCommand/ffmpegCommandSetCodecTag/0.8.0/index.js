"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Set Codec Tag',
    description: 'Set codec tag on various video codecs. Does not verify compibility of tags with codecs.',
    style: {
        borderColor: '#6efefc',
    },
    tags: 'video',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.11.01',
    sidebarPosition: -1,
    icon: '',
    inputs: [
        {
            label: 'Codec',
            name: 'codec',
            type: 'string',
            defaultValue: 'hevc',
            inputUI: {
                type: 'dropdown',
                options: [
                    'hevc',
                    'av1',
                    'vp9',
                    'h264',
                    'vp8',
                    'wmv2',
                    'wmv3',
                    'mpeg4',
                    'mpeg2video',
                    'mjpeg',
                    'flv',
                    'theora',
                ],
            },
            tooltip: 'Specify the video codec to set the tag on.',
        },
        {
            label: 'Codec Tag',
            name: 'codecTag',
            type: 'string',
            // eslint-disable-next-line no-template-curly-in-string
            defaultValue: 'hvc1',
            inputUI: {
                type: 'text',
            },
            // eslint-disable-next-line no-template-curly-in-string
            tooltip: 'Specify the codec tag you want to apply to the video codec. Ex. hvc1 codec tag for hevc codec',
        },
    ],
    outputs: [
        {
            number: 1,
            tooltip: 'Continue to next plugin.',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = function (args) {
    const lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    const codec = String(args.inputs.codec).trim().toLowerCase();
    const codecTag = String(args.inputs.codecTag).trim().toLowerCase();
    const streamsLength = args.variables.ffmpegCommand.streams.length;
    let changedCodecTag = false;
    for (let i = 0; i < streamsLength; i += 1) {
        let stream = args.variables.ffmpegCommand.streams[i];
        if (stream.codec_type === 'video') { // add .toLowerCase() to stream.codec_type?
            args.jobLog(`\u2714 Found video stream, checking for ${codec} ...`);
            if (stream.codec_name === codec) { // add .toLowerCase() to stream.codec_name?
                args.jobLog(`\u2714 File is ${stream.codec_name}`);
                if (stream.codec_tag_string !== codecTag) { // add .toLowerCase() to stream.codec_string?
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