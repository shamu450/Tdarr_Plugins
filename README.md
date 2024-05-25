# Tdarr_Plugins
Plugins I have created for Tdarr while learning JavaScript and TypeScript

## ffmpegCommands
### Set Codec Tag on video codec by keyword
  - Dropdown to select the video codec and enter the codec tag name you would like to apply to the video codec

### Set Codec Tag on HEVC to hvc1
  - Will skip all non HEVC files and HEVC files that already have the hvc1 codec tag
  - Why change tag to hvc1?*
    - It seems not every platform/decoder supports both tags
    - Apple QuickTime player on Mac only supports hvc1
    - Apple prefers hvc1 for HLS on Apple devices
  - What is the difference between hvc1 and hev1 codec tags?*
    - HEVC video can be muxed into fMP4 using different codec tags. According to 8.4.1 HEVC video stream definition 
    of ISO/IEC FDIS 14496-15:2019(E) there are hvc1 and hev1.
    - It’s related to the placement of parameter sets (SPS, PPS, VPS) in the fMP4 file.
    - Section 8.3.2 of ISO/IEC FDIS 14496-15:2019(E) states:
    Parameter sets: A parameter set to be used in a picture must be sent prior to the sample containing that picture 
    or in the sample for that picture. For a video stream that a particular sample entry applies to, the video 
    parameter set, sequence parameter sets, and picture parameter sets, shall be stored only in the sample entry when 
    the sample entry name is ‘hvc1’, and may be stored in the sample entry and the samples when the sample entry name 
    is ‘hev1’.
    
    Conclusively:
    - hvc1 parameter sets are stored out-of-band in the sample entry (i.e. below the Sample Description Box ( stsd ) box)
    - hev1 parameter sets are stored out-of-band in the sample entry and/or in-band in the samples 
    (i.e. SPS/PPS/VPS NAL units in the bitstream/ mdat box)
    *answer source: https://community.bitmovin.com/t/whats-the-difference-between-hvc1-and-hev1-hevc-codec-tags-for-fmp4/101

### Set Faststart Flag on MOV family containers
  - Set the faststart flag on MP4, M4V or MOV; This will move the moov atom to the front of the file
  - Moving the moov atom is done during a second ffmpeg pass that will start once the first set of commands is done
  - Checks if the file already has the flag enabled and will skip setting the flag to avoid using the time and 
  resources of a second ffmpeg pass
  - If the file is not the correct container, the plugin will set the flag in case the file will be remuxed to the 
  correct container at the end of the ffmpeg command, the flag will be ignored on incompatible containers and no second
  pass will be done
  - WTF is a "moov atom"?
    - "MP4 videos contain a flag that tells the player when it can start, called the moov atom. When this flag is set at the end of a file, some players will wait until the entire video is downloaded before they start playing. To speed up this process, always look for a checkbox called ‘fast start’ or ‘web optimized’ or ‘streaming enabled’ and enable it when exporting a video." 
    source: https://code.pixplicity.com/ffmpeg/faststart/

## tools
### Notify Radarr or Sonarr to refresh by keyword
  - Choose a keyword to let Radarr and Sonarr know if the file is a movie or episode, default keywords: tmdbid tvdbid
  - Plugin will find the keyword in the file name and try to contact the correct arr to refresh the item
