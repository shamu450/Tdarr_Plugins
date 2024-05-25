import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
  } from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';
  
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  const details = ():IpluginDetails => ({
    name: 'Set Codec Tag To Apple HLS Recommendation',
    description: `Replace codec tag on 264 and HEVC files, with new one based on Apple HLS recommendations for Apple devices. Per Apple: "You SHOULD use video formats in which the parameter sets are stored in the sample descriptions, rather than the samples. (That is, use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.)" source: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices #1.10`,
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
    const streamsLength = args.variables.ffmpegCommand.streams.length;
    let changedCodecTag = false;
    for (let i = 0; i < streamsLength; i += 1) {
        let stream = args.variables.ffmpegCommand.streams[i];
        if (stream.codec_type.toLowerCase() === 'video') {
            if (stream.codec_name.toLowerCase() === 'h264') {
                args.jobLog(`\u2714 File is ${stream.codec_name}, checking current codec tag ...`);
                if (stream.codec_tag_string.toLowerCase() !== 'avc1') {
                    args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'avc1');
                    args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag ...`);
                    args.jobLog(`\u2714 Setting codec tag to avc1`);
                    changedCodecTag = true;
                    break;
                } else {
                    args.jobLog(`\u2714 File already has avc1 codec tag`);
                    break;
                }
            } else if (stream.codec_name.toLowerCase() === 'hevc') {
                args.jobLog(`File is ${stream.codec_name}, checking current codec tag ...`);
                if (stream.codec_tag_string.toLowerCase() !== 'hvc1') {
                    args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag ...`);
                    args.jobLog(`\u2714 Setting codec tag to hvc1`);
                    args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1');
                    changedCodecTag = true;
                    break;
                } else {
                    args.jobLog(`\u2714 File already has hvc1 codec tag`);
                    break;
                }

            } // else if (dolby vision) {}
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