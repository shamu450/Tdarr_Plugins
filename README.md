# Tdarr_Plugins
Plugins I have created for Tdarr while learning JavaScript and TypeScript

## ffmpegCommands
* Set Codec Tag on video codec by keyword
  - Dropdown to select the video codec and enter the codec tag name you would like to apply to the video codec 
* Set Codec Tag on HEVC to hvc1
  - Sets the codec tag on HEVC file to hvc1
* Set Faststart Flag on MOV family containers
  - Set the faststart flag on MP4, M4V or MOV; This will move the moov atom to the front of the file
  - Moving the moov atom is done during a second ffmpeg pass that will start once the first set of commands is done
  - Plugin checks if the file already has the flag enabled, if it does it will skip setting the flag to avoid 
  using the time and resources of doing a second ffmpeg pass
  - If the file is not the correct container, the plugin will set the flag in case the file will be remuxed to the 
  correct container at the end of the ffmpeg command, the flag will be ignored on incompatible containers and no second
  pass will be done
  - WTF is a "moov atom"?
    - "MP4 videos contain a flag that tells the player when it can start, called the moov atom. When this flag is set at the end of a file, some players will wait until the entire video is downloaded before they start playing. To speed up this process, always look for a checkbox called ‘fast start’ or ‘web optimized’ or ‘streaming enabled’ and enable it when exporting a video." 
    source: https://code.pixplicity.com/ffmpeg/faststart/

## tools
* Notify Radarr or Sonarr to refresh by keyword
  - Choose a keyword to let Radarr and Sonarr know if the file is a movie or episode, default keywords: tmdbid tvdbid
  - Plugin will find the keyword in the file name and try to contact the correct arr to refresh the item
