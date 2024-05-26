import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
  } from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';
  
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = ():IpluginDetails => ({
  name: 'Set Video Codec Tag To Apple HLS Recommendation',
  description: `Replaces the video codec tag with the one based on Apple HLS recommendations for Apple devices. Per Apple: "1.10 You SHOULD use video formats in which the parameter sets are stored in the sample descriptions, rather than the samples. (That is, use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.)" source: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices`,
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
  const streamsLength = args.variables.ffmpegCommand.streams.length, // same info as 
  streamsLength2 = args.inputFileObj.ffProbeData.streams.length, // this? disadvantage to using both?
  mediaInfoTrackLength = args.inputFileObj.mediaInfo.track.length; // needed to find hdr_format value
  let changedCodecTag = false, isDv = false, isHdr = false, streamCodecName = '', streamCodecTagString = '';
  //
  // find file codec and codec tag
  // setup vairables
  //
  for (let i = 0; i < streamsLength; i += 1) {
    const stream = args.variables.ffmpegCommand.streams[i];
    if (stream.codec_type === 'video' && stream.codec_name.toLowerCase() === 'h264') {
      streamCodecName = 'h264';
      streamCodecTagString = stream.codec_tag_string.toLowerCase();
      break;
    } else if (stream.codec_type === 'video' && stream.codec_name.toLowerCase() === 'hevc') {
      streamCodecName = 'hevc';
      streamCodecTagString = stream.codec_tag_string.toLowerCase();
      break;
    }
  }
  //
  // check for HDR
  // taken from checkHdr 1.0.0, thank you
  //
  if (Array.isArray(args?.inputFileObj?.ffProbeData?.streams)) {
    args.jobLog(`\u2714 File is ${streamCodecName}, checking for HDR ...`); // ++
    for (let i = 0; i < streamsLength2; i += 1) {
      const stream = args.inputFileObj.ffProbeData.streams[i];
      if (stream.codec_type === 'video'
          && stream.color_transfer === 'smpte2084'
          && stream.color_primaries === 'bt2020'
          && stream.color_range === 'tv') {
        isHdr = true;
        break;
      }
    }
  } else {
    throw new Error('File has no stream data');
  }
  //
  // if HDR, check for Dolby Vision
  //
  if (isHdr === true) {
    args.jobLog(`\u2714 File is HDR, checking for Dolby Vision ...`);
    for (let i = 0; i < mediaInfoTrackLength; i++) {
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
    args.jobLog(`\u2714 File is not HDR, skipping Dolby Vision check. Verifying codec tag ...`);
  }
  //
  // replace codec tags, no DV
  //
  if (isDv === false) {
    for (let i = 0; i < streamsLength; i += 1) {
      const stream = args.variables.ffmpegCommand.streams[i];
      if (stream.codec_type === 'video') {
        if (streamCodecName === 'h264' && streamCodecTagString === 'avc1') {
          args.jobLog(`\u2714 File already has avc1 codec tag`);
          break;
        } else if (streamCodecName === 'h264' && streamCodecTagString !== 'avc1') {
          args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
          args.jobLog(`\u2714 Setting codec tag to avc1`);
          args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'avc1');
          changedCodecTag = true;
          break;
        } else if (streamCodecName === 'hevc' && streamCodecTagString === 'hvc1') {
          args.jobLog(`\u2714 File already has hvc1 codec tag`);
          break;
        } else if (streamCodecName === 'hevc' && streamCodecTagString !== 'hvc1') {
          args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
          args.jobLog(`\u2714 Setting codec tag to hvc1`);
          args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1');
          changedCodecTag = true;
          break;
        }
      } // if video
    } // end loop
  } // isDv

  
  //
  // replace codec tags, has DV
  //
  if (isDv === true) {
    for (let i = 0; i < streamsLength; i += 1) {
      const stream = args.variables.ffmpegCommand.streams[i];
      if (stream.codec_type === 'video') {
        if (streamCodecName === 'h264' && streamCodecTagString === 'dva1') {
          args.jobLog(`\u2714 File already has dva1 codec tag`);
          break;
        } else if (streamCodecName === 'h264' && streamCodecTagString !== 'dva1') {
          args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
          args.jobLog(`\u2714 Setting codec tag to dva1`);
          args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dva1');
          changedCodecTag = true;
          break;
        } else if (streamCodecName === 'hevc' && streamCodecTagString === 'dvh1') {
          args.jobLog(`\u2714 File already has dvh1 codec tag`);
          break;
        } else if (streamCodecName === 'hevc' && streamCodecTagString !== 'dvh1') {
          args.jobLog(`\u2716 File has ${streamCodecTagString} as codec tag ...`);
          args.jobLog(`\u2714 Setting codec tag to dvh1`);
          args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dvh1');
          changedCodecTag = true;
          break;
        }
      } // if video
    } // end loop
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