import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
  } from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';  
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = ():IpluginDetails => ({
  name: 'Set Video Codec Tag To Apple HLS Recommended',
  description: `Set the video codec tag on 264/265 codec files to the Apple HLS recommended codec tag for better Apple device compatibility. File is checked for HDR, if found, checked for Dolby Vision, then codec tag will be set based on 264/265 codec to dva1/dvh1 for Dolby Vision files or avc1/hvc1 for files without Dolby Vision. Per Apple: "1.10 You SHOULD use video formats in which the parameter sets are stored in the sample descriptions, rather than the samples. (That is, use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.)" source: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices`,
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
});  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = (args:IpluginInputArgs):IpluginOutputArgs => {
  const lib = require('../../../../../methods/lib')();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
  args.inputs = lib.loadDefaultValues(args.inputs, details);
  const streamsLength = args.variables.ffmpegCommand.streams.length,
  trackLength = args.inputFileObj.mediaInfo.track.length;
  let changedCodecTag = false, isDv = false, isHdr = false, streamCodecName = '', streamCodecTagString = '';
  //
  // HDR check
  // codec and codec tag checks
  //
  if (Array.isArray(args?.variables?.ffmpegCommand?.streams)) {
    for (let i = 0; i < streamsLength; i += 1) {
      const stream = args.variables.ffmpegCommand.streams[i];
      if (stream.codec_type === 'video'
          && stream.color_transfer === 'smpte2084' // taken from checkHdr 1.0.0, thank you
          && stream.color_primaries === 'bt2020'
          && stream.color_range === 'tv') {
        isHdr = true;        
      }
      if (stream.codec_type === 'video' && stream.codec_name.toLowerCase() === 'h264') {
        streamCodecName = 'h264';
        streamCodecTagString = stream.codec_tag_string.trim().toLowerCase();
        break;
      } else if (stream.codec_type === 'video' && stream.codec_name.toLowerCase() === 'hevc') {
        streamCodecName = 'hevc';
        streamCodecTagString = stream.codec_tag_string.trim().toLowerCase();
        break;
      }      
    }
  } else {
    throw new Error('File has no stream data');
  }
  //
  // if HDR, Dolby Vision check
  //
  if (isHdr === true) {
    args.jobLog(`\u2714 File codec is ${streamCodecName} and has HDR, checking for Dolby Vision ...`);
    for (let i = 0; i < trackLength; i++) {
      const tracks = args.inputFileObj.mediaInfo.track[i];
      if (i === 1 && tracks.HDR_Format.toLowerCase().includes('dolby vision')) {
        args.jobLog("\u2714 File has Dolby Vision, verifying codec tag ...");
        isDv = true;
        break;
      } else if (i === 1 && !(tracks.HDR_Format.toLowerCase().includes('dolby vision'))) {
        args.jobLog("\u2714 File does not have Dolby Vision, verifying codec tag ...");
        break;
      }
    }
  } else {
    args.jobLog(`\u2714 File codec is ${streamCodecName} and does not have HDR`);
    args.jobLog(`Skipping Dolby Vision check. Verifying codec tag ...`);
  }
  //
  // no DV, replace codec tags
  //
  if (isDv === false) {
    if (streamCodecName === 'h264' && streamCodecTagString === 'avc1') {
      args.jobLog(`\u2714 File already has avc1 codec tag`);
    } else if (streamCodecName === 'h264' && (streamCodecTagString !== 'avc1')) {
      args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
      args.jobLog(`\u2714 Setting codec tag to avc1`);
      args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'avc1');
      changedCodecTag = true;
    } else if (streamCodecName === 'hevc' && streamCodecTagString === 'hvc1') {
      args.jobLog(`\u2714 File already has hvc1 codec tag`);
    } else if (streamCodecName === 'hevc' && streamCodecTagString !== 'hvc1') {
      args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
      args.jobLog(`\u2714 Setting codec tag to hvc1`);
      args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1');
      changedCodecTag = true;
    }
  }
  //
  // has DV, replace codec tags
  //
  if (isDv === true) {
    if (streamCodecName === 'hevc' && streamCodecTagString === 'dvh1') {
      args.jobLog(`\u2714 File already has dvh1 codec tag`);
    } else if (streamCodecName === 'hevc' && streamCodecTagString !== 'dvh1') {
      args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
      args.jobLog(`\u2714 Setting codec tag to dvh1`);
      args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dvh1');
      changedCodecTag = true;
    } else if (streamCodecName === 'h264' && streamCodecTagString === 'dva1') {
      args.jobLog(`\u2714 File already has dva1 codec tag`);
    } else if (streamCodecName === 'h264' && streamCodecTagString !== 'dva1') {
      args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
      args.jobLog(`\u2714 Setting codec tag to dva1`);
      args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dva1');
      changedCodecTag = true;
    }
  }
  return {
    outputFileObj: args.inputFileObj,
    outputNumber: 1,
    variables: args.variables,
  };
};
export {
  details,
  plugin,
};