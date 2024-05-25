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
            defaultValue: '', // leave default value of user editable filed blank inorder to be able to verify if !=='' later, other wise default value will always be used, even if user erases it from ui. value will remain and be used in code.
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
var plugin = function (args) {
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    var codec = String(args.inputs.codec); // store user input for codec user input
    var codecTag = String(args.inputs.codecTag).trim().toLowerCase(); // store user input for codec tag user input, trim whitespace on both side and make lowercase

    if (codecTag !== '') { // verify user entered a value for codecTag, if not skip plugin
        for (var i = 0; i < args.variables.ffmpegCommand.streams.length; i += 1) {
            var stream = args.variables.ffmpegCommand.streams[i];
            if (stream.codec_type === 'video') { // if video stream
                args.jobLog(`☑ Found video stream, checking for ${codec}...`);
                if (stream.codec_name === codec) { // if choosen codec
                    args.jobLog(`☑ Is ${stream.codec_name}`);
                    if (stream.codec_tag_string !== codecTag) { // if the codec tag is not already keyword input, set tag
                        args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', codecTag); // set new codec tag with ffmpeg output variables
                        args.jobLog(`☑ Setting codec tag to ${codecTag}`);
                        break; // break the for loop stop loooping stream to see if they are video
                    } else { // codec tag already keyword input
                        args.jobLog(`☑ File already has ${stream.codec_tag_string} codec tag`);
                        break; // break the for loop
                    }
                } else { // file codec does not match user input
                    args.jobLog(`☒ File codec not ${codec}, it is ${stream.codec_name}`);
                    args.jobLog(`☒ Skipping file`);
                    break; // break the for loop
                }
            }
        }
    } else { // codecTag is blank send joblog message about it
        args.jobLog(`☒☒☒ There is no codec tag configured ☒☒☒`);
        args.jobLog(`☒☒☒ Skipping plugin ☒☒☒`);
    }

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };
};
exports.plugin = plugin;