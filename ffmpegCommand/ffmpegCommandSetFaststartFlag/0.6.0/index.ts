import { getContainer } from '../../../../FlowHelpers/1.0.0/fileUtils';
import {
  IpluginDetails,
  IpluginInputArgs,
  IpluginOutputArgs,
} from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = (): IpluginDetails => ({
  name: 'Set Faststart Flag - MP4 M4V MOV',
  description: `Only for MOV family: MP4, M4V, MOV. Non valid containers will ignore the flag and valid containers 
   that already have the flag enabled will be skipped to save the time and resources. Alternatively, you can set the 
   flag with the custom argument plugin, but it will still do a second pass to copy and overwrite the moov atom even 
   when it's already in the front, waisting time and resources. "What is faststart flag? MP4 videos contain a flag 
   that tells the player when it can start, called the moov atom. When this flag is set at the end of a file, some 
   players will wait until the entire video is downloaded before they start playing. To speed up this process, always 
   look for a checkbox called fast start or web optimized or streaming enabled and enable it when exporting a video." 
   source: https://code.pixplicity.com/ffmpeg/faststart/`,
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
          tooltip: 'Continue to next plugin',
      },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = (args: IpluginInputArgs): IpluginOutputArgs => {
  const lib = require('../../../../../methods/lib')();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
  args.inputs = lib.loadDefaultValues(args.inputs, details);

  // const extensions = String(args.inputs.extensions);
  const extensions = ['mp4','m4v','mov'];
  const extensionArray = extensions.map((row) => row.toLowerCase());
  //const extensionArray = extensions.trim().split(',').map((row) => row.toLowerCase());
  const extension = getContainer(args.inputFileObj._id).toLowerCase();
  let extensionMatch = false;

  
  var hasFlag = false;
  const mediaInfoTrackLength = args.inputFileObj.mediaInfo.track.length;
  if (extensionArray.includes(extension)) { // verify container type before continuing
      for (let i = 0; i < mediaInfoTrackLength; i++) { // loop mediaInfo track objects so we can find track/key 0
          let tracks = args.inputFileObj.mediaInfo.track[i]; // set tracks to the current key # 
          if (i === 0 && tracks.IsStreamable.toLowerCase() === 'yes') { // if i is track/key 0 and IsStreamable is yes, already has flag, skip
              args.jobLog("\u2714 File is ".concat(extension, " and already has faststart flag")); // jobLog message file already has flag
              args.jobLog("\u2714 Skipping setting faststart"); // jobLog message
              hasFlag = true; // set hasFlag to true 
              break; // break the loop
          }
          else if (i === 0 && tracks.IsStreamable.toLowerCase() === 'no') { // if i is track 0 and IsStreamable is no set flag
              args.jobLog("\u2716File is ".concat(extension, " and does not have the faststart flag")); // jobLog message file does not have flag
              args.jobLog("\u2714 Setting faststart flag"); // jobLog message setting flag on file
              args.variables.ffmpegCommand.overallOuputArguments.push('-movflags', 'faststart'); // set new codec tag with ffmpeg output variables
              hasFlag = true; // set hasFlag to true
              break; // break the loop
          }
      }
  }
  else { // if container is not mp4, it may be remuxed later so we set flag and non valid containers will ignore it and remuxed mp4 will have the flag set
      args.jobLog(`\u2716 Found container: `.concat(extension, `, flag will be ignored unless remuxed to MOV family container`)); // jobLog message setting flag on file
      args.jobLog(`\u2714 Setting faststart flag`); // jobLog message setting flag on file
      args.variables.ffmpegCommand.overallOuputArguments.push('-movflags', 'faststart'); // set new codec tag with ffmpeg output variables
      hasFlag = true; // set hasFlag to true
  }
  if (hasFlag === false) { // if hasFlag is still false and wrong conatiner is false means track 0 wasn't found
      args.jobLog("\u2716\u2716\u2716Track 0 not found!"); // jobLog message no track 0 found
      args.jobLog("\u2716\u2716\u2716Flag can't be set, skipping plugin"); // jobLog message
  }



  return {
    outputFileObj: args.inputFileObj,
    outputNumber: extensionMatch ? 1 : 2,
    variables: args.variables,
  };
};
export {
  details,
  plugin,
};