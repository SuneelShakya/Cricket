import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaylistService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public AppUrl: string
  ) { }

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  SendAsrunMail(channel) {
    return this.http.get(this.AppUrl + 'Playlist/AsrunEmail', {
      params: {
        ChannelUID: channel
      }
    }).pipe();
  }

  SendMissingMail(channel) {
    return this.http.get(this.AppUrl + 'Playlist/MissingEmail', {
      params: {
        ChannelUID: channel
      }
    }).pipe();
  }

  SendZipMail(channel) {
    return this.http.get(this.AppUrl + 'Playlist/MissingZip', {
      params: {
        ChannelUID: channel
      }
    }).pipe();
  }

  createContent(channel, content, name) {
    return this.http.post('/Playlist/CreateContent', content, {
      params: {
        channel: channel,
        name: name
      }
    }).pipe();
  }
  GetflFPCName(selectPlaylistDate, selectChannel, selectPlaylistType) {
    const http = this.http;
    const url = this.AppUrl + 'Playlist/GetflFPCName';
    return http.get(url, {
      params: {
        dateToday: selectPlaylistDate,
        channelId: selectChannel,
        type: selectPlaylistType
      }
    });
  };
  GetflFPCDate() {
    const http = this.http;
    const url = this.AppUrl + 'Playlist/GetflFPCDate';
    return http.get(url);
  };
  CallReconcileService(url1: any, channelId: any, deviceid: any, eventtype: any) {
    const http = this.http;
    const url2 = this.AppUrl + 'Playlist/CallReconcile';
    return http.get(url2, {
      params: {
        url: url1,
        channelId: channelId,
        eventtype: eventtype,
        deviceid: deviceid
      }
    })
    //return http.get(url1);
  };
  PlaylistReconcile(channelId: any, eventtype: any) {
    const http = this.http;
    const url = this.AppUrl + 'Playlist/PlaylistReconcile';
    return http.get(url, {
      params: {
        channelId: channelId,
        eventtype: eventtype
      }
    });
  };

  GetPriorityContentData(selectChannel, selectPlaylistDate, selectPlName, selectPlaylistType) {
    return this.http.get(this.AppUrl + 'Playlist/GetPriorityContentData', {
      params: {
        ChannelUID: selectChannel ? selectChannel : '@',
        Date: selectPlaylistDate ? selectPlaylistDate : "@",
        name: selectPlName,
        type: selectPlaylistType
      },
    })
  }
  GetPlaylistMissing(consolidatetype: any, missing_channel: any, dateMissing: any) {
    return this.http.get(this.AppUrl + 'Playlist/GetPlaylistMissing', {
      params: {
        ConsolidateStatus: consolidatetype,
        PlaylistDate: dateMissing,
        ChannelName: missing_channel,
      },
    })
  }

  GetPlaylistDate() {
    const http = this.http;
    const url = this.AppUrl + 'Playlist/GetPlaylistDate';
    return http.get(url);
  }
  GetPlaylistName(filterDate, filterChannel) {
    const http = this.http;
    const url = this.AppUrl + 'Playlist/GetPlaylistName';
    return http
      .get(url, {
        params: {
          dateToday: filterDate ? filterDate : '@',
          channelId: filterChannel ? filterChannel : '@'
        }
      })
      .pipe();
  }
  GetPlaylistData(vChannelUID, vPlaylistDate, vUnique, vPlaylistType, vPlaylistName, QcStatus, PreviewStatus, status, eventtype, SubTitleStatus, Segments) {
    const http = this.http;
    const url = this.AppUrl + 'Playlist/GetPlaylistData';
    return http
      .get(url, {
        params: {
          ChannelUID: vChannelUID,
          Date: vPlaylistDate ? vPlaylistDate : '@',
          PreviewStatus: PreviewStatus ? PreviewStatus : '@',
          MissingStatus: status ? status : '@',
          EventType: eventtype ? eventtype : '@',
          SearchText: '@',
          PlaylistStatus: vPlaylistType,
          QcStatus: QcStatus ? QcStatus : '@',
          PlaylistName: vPlaylistName ? vPlaylistName : '@',
          Unique: vUnique,
          SubTitleStatus: SubTitleStatus ? SubTitleStatus : '@',
          Segments: Segments ? Segments : '@'
        }
      })
      .pipe();
  }
  GetAllAsrunData(ChannelUID, Time, asrunMin, eventtype) {
    return this.http.get(this.AppUrl + "Playlist/GetAllAsrunData", {
      params: {
        ChannelUID: ChannelUID, Time: Time, asrunMin: (asrunMin ? asrunMin : 0), eventtype: eventtype ? eventtype : '@'
      }
    })
  }
  uploadPlaylist(files, selectChannelsModal, selectDate, selectOverwrite, convertRule) {
    let fileToUpload;
    const formData: FormData = new FormData();
    if (convertRule == 'mnx' || convertRule == 'moviesnow' || convertRule == 'moviesnowhd'
      || convertRule == 'moviesnowplus' || convertRule == 'romedynow'
      || convertRule == 'romedynowhd' || convertRule == 'mnxsd' || convertRule == 'mnxhd' || convertRule == 'zoom') {
      Array.prototype.forEach.call(files, function (file) {
        formData.append('file', file, file.name);
      });
    }
    else {
      fileToUpload = <File>files[0];
      formData.append('file', fileToUpload, fileToUpload.name);
    }
    return this.http.post('/Playlist/UploadPlaylistAsync', formData, {
      params: {
        selectChannelsModal: selectChannelsModal, selectDate: selectDate,
        selectOverwrite: selectOverwrite, convertRule: convertRule
      }
    }).pipe();
  }


  uploadExtraSheet(files, selectChannelsModal, selectDate, selectOverwrite, convertRule) {
    let fileToUpload;
    const formData: FormData = new FormData();
    if (convertRule == 'zoom') {
      Array.prototype.forEach.call(files, function (file) {
        formData.append('file', file, file.name);
      });
    }
    return this.http.post('/Playlist/UploadExtraSheetPlaylistAsync', formData, {
      params: {
        selectChannelsModal: selectChannelsModal, selectDate: selectDate,
        selectOverwrite: selectOverwrite, convertRule: convertRule
      }
    }).pipe();
  }

  uploadCuesheet(files) {
    const formData: FormData = new FormData();
    Array.prototype.forEach.call(files, function (file) {
      formData.append('file', file, file.name);
    });
    return this.http.post('/Playlist/UploadFiles', formData).pipe();
  }

  uploadPriorityContent(files, channel) {
    const fileToUpload = <File>files[0];
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post('/Playlist/UploadFixList', formData, {
      params: {
        channel: channel
      }
    }).pipe();
  }

  uploadFixPointContent(files, channel, type, convertRule) {
    const fileToUpload = <File>files[0];
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post('/Playlist/uploadFixPointContent', formData, {
      params: {
        channel: channel,
        type: type,
        convertRule: convertRule ? convertRule : '@'
      }
    }).pipe();
  }

  GetScheduledPlaylistForReconcile(data) {
    const channel = data.dataKey.split('|')[0];
    const date = data.dataKey.split('|')[2];
    const playlist = data.dataKey.split('|')[3];
    const asrun = data.dataKey.split('|')[4];
    return this.http.get('Playlist/GetScheduledPlaylistForReconcile', {
      params: {
        channel: channel,
        playlist: playlist,
        date: date,
        asrun: asrun
      }
    })
  }
  GetLivePlaylistForReconcile(data) {
    const channel = data.dataKey.split('|')[0];
    const date = data.dataKey.split('|')[2];
    const playlist = data.dataKey.split('|')[3];
    const asrun = data.dataKey.split('|')[4];
    return this.http.get('Playlist/GetLivePlaylistForReconcile', {
      params: {
        channel: channel,
        playlist: playlist,
        date: date,
        asrun: asrun
      }
    })
  }
  GetOfcomData(channel) {
    return this.http.get('Playlist/GetOfcomData', {
      params: {
        channel: channel
      }
    }).pipe();
  }

  GetAllOffComData(channel) {
    return this.http.get('Playlist/GetAllOfComData', {
      params: {
        channel: channel
      }
    }).pipe();
  }
  GetPlaylistDataOfcom(channel, date, slot) {
    return this.http.get('Playlist/GetPlaylistDataByOfcom', {
      params: {
        channel: channel,
        date: date,
        slot: slot
      }
    }).pipe();
  }
  GetSegments(Totalpgs, Curpg, SearchKeyword, _Date, Preview, QCStatus, EType, SegmentNot) {
    return this.http.get('Playlist/getsegclipsdetails', {
      params: {
        NoOfRecordsPerPage: Totalpgs,
        page: Curpg,
        searchkeyword: SearchKeyword,
        daterange: _Date,
        status: Preview,
        _QCStatus: QCStatus,
        _EType: EType,
        _segmentnot: SegmentNot
      }
    }).pipe()
  }
  GetSegmentsPagination(totalpgs, preview, date, clip) {
    return this.http.get('Playlist/GetSegmentPagination', {
      params: {
        NoOfRecordsPerPage: totalpgs,
        preview: preview ? preview : '@',
        date: date ? date.replace(' - ', '@') : '@',
        clip: clip ? clip : '@'
      }
    }).pipe()
  }



  publishfile(channel, fileName) {
    const tagParams = {
      channel: channel,
      fileName: fileName
    };
    const url = this.AppUrl + 'Playlist/publishfileupload';
    return this.http.post(url, tagParams).pipe();
  }
}


