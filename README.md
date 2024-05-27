# Tdarr_Plugins
Plugins for Tdarr, made while I learn JavaScript and TypeScript

## ffmpegCommands
### Set Video Codec Tag to Apple HLS recommended
Sets the codec tag on 264/265 codec files to the Apple HTTPS Live Streaming (HLS) recommended for better Apple device 
compatibility.

| Codec | Codec Tag Changed To | Description |
|:---:|:---:|:---:|:---|
| 264 | avc1 | no Dolby Vision |
| 265 | hvc1 | no Dolby Vision |
| 264 HDR DV | dva1 | has Dolby Vision |
| 265 HDR DV | dvh1 | has Dolby Vision |

<!-- DV 264 codec tag information taken from DolbyVisionProfilsLevels.pdf sectionn 2.1.2 Dolby Vision profile strings-->
<!-- https://dolby.my.salesforce.com/sfc/p/700000009YuG/a/4u000000l6G4/4R18riPaaW3gxpVx7XwyQLdEITLFjB.w.Si0LoQR5j8 -->
    
For better Apple device compatiblity. Apple says:
> 1.10. You SHOULD use video formats in which the parameter sets are stored in the sample descriptions, rather than the samples. (That is, use 'avc1', 'hvc1', or 'dvh1' rather than 'avc3', 'hev1', or 'dvhe'.) [^1]

> Example: [^2]
> - hvc1 parameter sets are stored out-of-band in the sample entry (i.e. below the Sample Description Box ( stsd ) box)
> - hev1 parameter sets are stored out-of-band in the sample entry and/or in-band in the samples (i.e. SPS/PPS/VPS NAL units in the bitstream/ mdat box)

### Set Faststart Flag on MOV family containers
* Set the faststart flag on MP4, M4V or MOV; This will move the moov atom to the front of the file
* Moving the moov atom is done during a second ffmpeg pass that will start once the first set of commands is done
* Files that already have the flag enabled will be skipped to avoid using the time and resources of a second ffmpeg pass
* If the file is not the correct container, the plugin will set the flag in case the file will be remuxed to the 
  correct container at the end of the ffmpeg command, the flag will be ignored on incompatible containers and no second
  pass will be done
  
 WTF is a "moov atom"?
 > "MP4 videos contain a flag that tells the player when it can start, called the moov atom. When this flag is set at the end of a file, some players will wait until the entire video is downloaded before they start playing. To speed up this process, always look for a checkbox called ‘fast start’ or ‘web optimized’ or ‘streaming enabled’ and enable it when exporting a video." [^3]

## tools
### Notify Radarr or Sonarr to refresh by keyword
  - Let Radarr or Sonarr know if the file is a movie or episode by keywords, default keywords: tmdbid tvdbid
  - arr to be used will be choosen based on the keyword
  - Works similar to the original notify script, will contact the arr for the file ID and then send a request to 
  refresh the item

### Apply Radarr or Sonarr naming policy by keyword
  - Let Radarr or Sonarr know if the file is a movie or episode by keywords, default keywords: tmdbid tvdbid
  - arr to be used will be choosen based on the keyword
  - Works similar to the original rename script, will contact the arr for the file ID and then send a request to rename 
  the item

### Notify Jellyfin to refresh library by keyword until I figure out how to update the item only
  - Choose a keyword to let Jellyfin know if the file is a movie or episode, default keywords: tmdbid tvdbid
  - Refresh movie, series or other libraries
  - Enter multiple library ID's to update all libraries of the same content type
  - Other content type libraries will be refreshed (if enabled) when no keyword is found in the file name

#### Why create keyword arr plugins?
I liked the original arr notify and naming plugins, but didn't like that I needed to put one for each arr. So I decided
to try and make keyword based plugins modeled after the originals that would allow one plugin for both arrs. Since I 
already have the arrs add the tmdbid and tvdbid keyword and ID number to the file names on import, choosing which arr 
to use to refresh or rename is pretty easy. As long as your keywords are unique then you should not have any issues 
with the wrong arr finding a keyword in the file name.

Here is an example of how my arrs name a file, this happens before the files reach Tdarr:
 - i.am.movie.(2024).[tmdbid-967847].mp4
 - i.am.episode.title.s01e04.[tvdbid-447119].mp4

<!-- source links -->

[^1]: https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices#2969487

[^2]: https://community.bitmovin.com/t/whats-the-difference-between-hvc1-and-hev1-hevc-codec-tags-for-fmp4/101

[^3]: https://code.pixplicity.com/ffmpeg/faststart/