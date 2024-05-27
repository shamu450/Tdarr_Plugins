import {
    IpluginDetails,
    IpluginInputArgs,
    IpluginOutputArgs,
  } from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';
  
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  const details = ():IpluginDetails => ({
    name: 'Set Video Codec Tag To Apple HLS Recommendation',
    description: `Replace video codec tag with one based on Apple HLS recommendations for Apple devices. Per Apple: "You SHOULD use video formats in which the parameter sets are stored in the sample descriptions, rather than the samples. (That is, use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.)" source: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices  #1.10`,
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
    let changedCodecTag = false, hasDv = false;
  
  
            //use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.)
            // wrong tags avc3', 'hev1', or 'dvhe'
            // correct tags avc1, hvc1, dvh1
  
            // 264 wrong tags avc3
            // 264 correct tags avc1
  
            // 265 wrong tags hev1
            // 265 correct tags hvc1
  
            // dv wrong tags dvav(264), dvhe (265)
            // dv correct tags dva1(264), dvh1 (265)
            // section 2.1.2 in pdf 
  
  
    //
    // check if file is Dolby Vision
    //
    const mediaInfoTrackLength = args.inputFileObj.mediaInfo.track.length;
    args.jobLog(`Checking if file has Dolby Vision ...`);
    for (let i = 0; i < mediaInfoTrackLength; i++) { // loop mediaInfo track objects so we can find track/key 0
        let tracks = args.inputFileObj.mediaInfo.track[i]; // set tracks to the current key # 
        if (i === 1 && tracks.HDR_Format.toLowerCase().includes('dolby vision')) { // if i is track/key 1 and HDR_Format includes dolby vision
            args.jobLog("\u2714 File is has dolby vision, checking codec tag ...");
            hasDv = true;
        } else if (i === 1 && !(tracks.HDR_Format.toLowerCase().includes('dolby vision'))) { // if i is track/key 1 and HDR_Format does not include dolby vision
          args.jobLog("File does not have dolby vision, continuing file check ...");
          break; // break the loop
        }
    }
    //
    // Find and replace avc3, dvav, dvhe, hvc1 or [0][0][0][0] codec tags
    // with avc1, dva1, dvh1 or hvc1 
    //  
    for (let i = 0; i < streamsLength; i += 1) {
      let stream = args.variables.ffmpegCommand.streams[i];
      if (stream.codec_type.toLowerCase() === 'video') {
        // check for 264 or 265 codec
        if (stream.codec_name.toLowerCase() === 'h264') { // 264
          if (hasDv === true){ // 264 file with DV, check for dvav and [0][0][0][0] tags and replace with dva1
            if (stream.codec_tag_string.toLowerCase() === 'dvav' || stream.codec_tag_string === '[0][0][0][0]') {
              args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag ...`);
              args.jobLog(`\u2714 Setting codec tag to dva1`);
              //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dva1');
              changedCodecTag = true;
              break;
            }
            else if (stream.codec_tag_string.toLowerCase() === 'dva1') {
                args.jobLog("\u2714 File already has dva1 codec tag");
                break;
            }
          } else { // 264 file without DV, check for avc3 and [0][0][0][0] tags and replace with avc1
            args.jobLog(`\u2714 File is ${stream.codec_name}, checking for avc3 codec tag ...`);
            // check for avc3 tag
            if (stream.codec_tag_string.toLowerCase() === 'avc3' || stream.codec_tag_string === '[0][0][0][0]') {
              args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag ...`);
              args.jobLog(`\u2714 Setting codec tag to avc1`);
              //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'avc1');
              changedCodecTag = true;
              break;
            } else if (stream.codec_tag_string.toLowerCase() === 'avc1') {
              args.jobLog(`\u2714 File already has avc1 codec tag`);
              break;
            }
          }
        } else if (stream.codec_name.toLowerCase() === 'hevc') {// 265
          if (hasDv === true){ // 265 file with DV, check for dvhe and [0][0][0][0] tags and replace with dvh1
            if (stream.codec_tag_string.toLowerCase() === 'dvhe' || stream.codec_tag_string === '[0][0][0][0]') {
              args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag ...`);
              args.jobLog(`\u2714 Setting codec tag to dvh1`);
              //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'dvh1');
              changedCodecTag = true;
              break;
            }
            else if (stream.codec_tag_string.toLowerCase() === 'dvh1') {
              args.jobLog("\u2714 File already has dvh1 codec tag");
              break;
            }
          } else { // 265 file without DV, check for hev1 and [0][0][0][0] tags and replace with hvc1
            if (stream.codec_tag_string.toLowerCase() === 'hev1' || stream.codec_tag_string === '[0][0][0][0]') {
              args.jobLog(`\u2716 File has ${stream.codec_tag_string.toLowerCase()} as codec tag ...`);
              args.jobLog(`\u2714 Setting codec tag to hvc1`);
              //args.variables.ffmpegCommand.overallOuputArguments.push('-tag:v', 'hvc1');
              changedCodecTag = true;
              break;
            } else if (stream.codec_tag_string.toLowerCase() === 'hvc1') {
              args.jobLog(`\u2714 File already has hvc1 codec tag`);
              break;
            }
          }
        }
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