"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Set Video Codec Tag To Apple HLS Recommendation',
    description: "Replace video codec tag with one based on Apple HLS recommendations for Apple devices. Per Apple: \"You SHOULD use video formats in which the parameter sets are stored in the sample descriptions, rather than the samples. (That is, use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.)\" source: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices  #1.10",
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
    var _a, _b;
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    // variable setup for loops
    var streamsLength = args.variables.ffmpegCommand.streams.length, // speed up loops by declaring this outside the loop
    mediaInfoTrackLength = args.inputFileObj.mediaInfo.track.length, // speed up loops by declaring this outside the loop
    streamsLength2 = args.inputFileObj.ffProbeData.streams.length; // speed up loops by declaring this outside the loop
    var changedCodecTag = false, isDv = false, isHdr = false, streamCodecName = '', streamCodecTagString = '';
    //
    // find file codec and codec tag
    // setup vairables
    //
    for (var i = 0; i < streamsLength; i += 1) {
        var stream = args.variables.ffmpegCommand.streams[i];
        if (stream.codec_type === 'video' && stream.codec_name.toLowerCase() === 'h264') { // find 264 codec
            streamCodecName = 'h264';
            streamCodecTagString = stream.codec_tag_string.toLowerCase();
            break;
        }
        else if (stream.codec_type === 'video' && stream.codec_name.toLowerCase() === 'hevc') { // find 265 codec
            streamCodecName = 'hevc';
            streamCodecTagString = stream.codec_tag_string.toLowerCase();
            break;
        }
    }
    //
    // check for HDR
    // taken from checkHdr 1.0.0, thank you
    //
    args.jobLog("\u2714 File is ".concat(streamCodecName, ", checking for Dolby Vision ...")); // dev check
    if (Array.isArray((_b = (_a = args === null || args === void 0 ? void 0 : args.inputFileObj) === null || _a === void 0 ? void 0 : _a.ffProbeData) === null || _b === void 0 ? void 0 : _b.streams)) {
        for (var i = 0; i < streamsLength2; i += 1) {
            var stream = args.inputFileObj.ffProbeData.streams[i];
            if (stream.codec_type === 'video'
                && stream.color_transfer === 'smpte2084'
                && stream.color_primaries === 'bt2020'
                && stream.color_range === 'tv') {
                isHdr = true;
            }
            else {
                args.jobLog("File is not HDR, skipping Dobly Vision check ...");
            }
        }
    }
    else {
        throw new Error('File has no stream data');
    }
    //
    // if HDR, check for Dolby Vision
    //
    if (isHdr === true) {
        for (var i = 0; i < mediaInfoTrackLength; i++) { // loop mediaInfo track objects so we can find track/key 0
            var tracks = args.inputFileObj.mediaInfo.track[i]; // set tracks to the current key # 
            if (i === 1 && tracks.HDR_Format.toLowerCase().includes('dolby vision')) { // if i is track/key 1 and HDR_Format includes dolby vision
                args.jobLog("\u2714 File has dolby vision, checking codec tag ...");
                isDv = true;
                break;
            }
        }
    }
    //
    // replace codec tags, no DV
    //
    if (streamCodecName === 'h264' && isDv === false) { // 264 codec no DV
        if (streamCodecTagString !== 'avc1') { // replace codec tag with avc1
            args.jobLog("\u2716 File has ".concat(streamCodecTagString, " as codec tag ...")); // show current codec tag
            args.jobLog("\u2714 Setting codec tag to avc1");
            //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'avc1');
            changedCodecTag = true;
        }
        else if (streamCodecTagString === 'avc1') {
            args.jobLog("\u2714 File already has avc1 codec tag");
        }
    }
    else if (streamCodecName === 'hevc' && isDv === false) { // 265 codec no DV
        if (streamCodecTagString !== 'hvc1') {
            args.jobLog("\u2716 File has ".concat(streamCodecTagString, " as codec tag ..."));
            args.jobLog("\u2714 Setting codec tag to hvc1");
            //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1');
            changedCodecTag = true;
        }
        else if (streamCodecTagString === 'hvc1') {
            args.jobLog("\u2714 File already has hvc1 codec tag");
        }
    }
    //
    // replace codec tags, has DV
    //
    if (streamCodecName === 'hevc' && isDv === true) { // 265 codec has DV
        if (streamCodecTagString !== 'dvh1') {
            args.jobLog("\u2716 File has ".concat(streamCodecTagString, " as codec tag ..."));
            args.jobLog("\u2714 Setting codec tag to dvh1");
            //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dvh1');
            changedCodecTag = true;
        }
        else { // if (streamCodecTagString === 'dvh1')
            args.jobLog("\u2714 File already has dvh1 codec tag");
        }
    }
    else if (streamCodecName === 'h264' && isDv === true) { // 264 codec has DV
        if (streamCodecTagString !== 'dva1') { // replace codec tag with dva1
            args.jobLog("\u2716 File has ".concat(streamCodecTagString, " as codec tag ..."));
            args.jobLog("\u2714 Setting codec tag to dva1");
            //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dva1');
            changedCodecTag = true;
        }
        else if (streamCodecTagString === 'dva1') {
            args.jobLog("\u2714 File already has dva1 codec tag");
        }
    }
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: 1,
        variables: args.variables,
    };
};
exports.plugin = plugin;
