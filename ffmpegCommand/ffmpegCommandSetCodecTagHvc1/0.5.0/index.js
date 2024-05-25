"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Set Codec Tag On HEVC To Hvc1',
    description: 'Set codec tag to hvc1 for HEVC files. For better Apple device compatibility. Already hvc1 and other codecs will be skipped.',
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

    for (var i = 0; i < args.variables.ffmpegCommand.streams.length; i += 1) {
        var stream = args.variables.ffmpegCommand.streams[i];
        if (stream.codec_type === 'video') { // if video stream
            args.jobLog(`☑ Found video stream, checking for HEVC...`);
            if (stream.codec_name === 'hevc') { // if hevc
                args.jobLog(`☑ Is HEVC`);
                if (stream.codec_tag_string !== 'hvc1') { // if the codec tag is not already hvc1, set tags
                    args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1'); // set new codec tag with ffmpeg output variables
                    args.jobLog(`☑ Setting codec tag to hvc1.`);
                    break; // break the for loop
                } else { // the file already has the hvc1 codec tag
                    args.jobLog(`☑ File already has hvc1 codec tag.`);
                    break;
                }
            } else { // the file is not HEVC
                args.jobLog(`☒ Not HEVC. Codec tag hvc1 is only for HEVC.`);
                args.jobLog(`☒ Skipping file`);
                break;
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