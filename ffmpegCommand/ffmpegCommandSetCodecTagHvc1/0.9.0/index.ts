import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
  } from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';
  
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  const details = ():IpluginDetails => ({
    name: 'Set Codec Tag To Hvc1 For HEVC',
    description: `Set codec tag to hvc1 for HEVC files. For better Apple device compatibility. Already hvc1 and other codecs will be skipped.`,
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
            args.jobLog(`\u2714 Found video stream, checking for HEVC ...`);
            if (stream.codec_name.toLowerCase() === 'hevc') {
                args.jobLog(`\u2714 File is HEVC`);
                if (stream.codec_tag_string.toLowerCase() !== 'hvc1') {
                    args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1'); // set tag to keyword
                    args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag`);
                    args.jobLog(`\u2714 Setting codec tag to hvc1`);
                    changedCodecTag = true;
                } else {
                    args.jobLog(`\u2714 File already has hvc1 codec tag`);
                }
            } else {
                args.jobLog(`\u2716 File codec not HEVC, it is ${stream.codec_name}`);
                args.jobLog(`\u2716 Skipping file`);
            }
        }
    }
    return {
      outputFileObj: args.inputFileObj,
      outputNumber: changedCodecTag ? 1 : 2,
      variables: args.variables,
    };
  };
  export {
    details,
    plugin,
  };