import { Injectable, Inject, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import { Title } from '@angular/platform-browser';
// import SimpleCrypto from "simple-crypto-js";
// import * as XLSX from "xlsx";
@Injectable()
export class SharedService {
  openedurl: any = "";
  RedirectType: any = "";
  VODdata: any;
  alertdata: any;
  isHideShowControls = false;
  ispanel = false;
  UID = '';
  TcProfile: any;
  rootarray: any[];
  userMapping: any;
  objDragComponent: any = [];
  modelObj: any = [];
  TimeZones: any = [{ value: 'Etc/GMT+12', label: '(GMT-12:00) International Date Line West' }
    , { value: 'Pacific/Midway', label: '(GMT-11:00) Midway Island, Samoa' }
    , { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii' }
    , { value: 'US/Alaska', label: '(GMT-09:00) Alaska' }
    , { value: 'America/Los_Angeles', label: '(GMT-08:00) Pacific Time (US & Canada)' }
    , { value: 'America/Tijuana', label: '(GMT-08:00) Tijuana, Baja California' }
    , { value: 'US/Arizona', label: '(GMT-07:00) Arizona' }
    , { value: 'America/Chihuahua', label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan' }
    , { value: 'US/Mountain', label: '(GMT-07:00) Mountain Time (US & Canada)' }
    , { value: 'America/Managua', label: '(GMT-06:00) Central America' }
    , { value: 'US/Central', label: '(GMT-06:00) Central Time (US & Canada)' }
    , { value: 'America/Mexico_City', label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey' }
    , { value: 'Canada/Saskatchewan', label: '(GMT-06:00) Saskatchewan' }
    , { value: 'America/Bogota', label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco' }
    , { value: 'US/Eastern', label: '(GMT-05:00) Eastern Time (US & Canada)' }
    , { value: 'US/East-Indiana', label: '(GMT-05:00) Indiana (East)' }
    , { value: 'Canada/Atlantic', label: '(GMT-04:00) Atlantic Time (Canada)' }
    , { value: 'America/Caracas', label: '(GMT-04:00) Caracas, La Paz' }
    , { value: 'America/Manaus', label: '(GMT-04:00) Manaus' }
    , { value: 'America/Santiago', label: '(GMT-04:00) Santiago' }
    , { value: 'Canada/Newfoundland', label: '(GMT-03:30) Newfoundland' }
    , { value: 'America/Sao_Paulo', label: '(GMT-03:00) Brasilia' }
    , { value: 'America/Argentina/Buenos_Aires', label: '(GMT-03:00) Buenos Aires, Georgetown' }
    , { value: 'America/Godthab', label: '(GMT-03:00) Greenland' }
    , { value: 'America/Montevideo', label: '(GMT-03:00) Montevideo' }
    , { value: 'America/Noronha', label: '(GMT-02:00) Mid-Atlantic' }
    , { value: 'Atlantic/Cape_Verde', label: '(GMT-01:00) Cape Verde Is.' }
    , { value: 'Atlantic/Azores', label: '(GMT-01:00) Azores' }
    , { value: 'Africa/Casablanca', label: '(GMT+00:00) Casablanca, Monrovia, Reykjavik' }
    , { value: 'Etc/Greenwich', label: '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London' }
    , { value: 'Europe/Amsterdam', label: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna' }
    , { value: 'Europe/Belgrade', label: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague' }
    , { value: 'Europe/Brussels', label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris' }
    , { value: 'Europe/Sarajevo', label: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb' }
    , { value: 'Africa/Lagos', label: '(GMT+01:00) West Central Africa' }
    , { value: 'Asia/Amman', label: '(GMT+02:00) Amman' }
    , { value: 'Europe/Athens', label: '(GMT+02:00) Athens, Bucharest, Istanbul' }
    , { value: 'Asia/Beirut', label: '(GMT+02:00) Beirut' }
    , { value: 'Africa/Cairo', label: '(GMT+02:00) Cairo' }
    , { value: 'Africa/Harare', label: '(GMT+02:00) Harare, Pretoria' }
    , { value: 'Europe/Helsinki', label: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius' }
    , { value: 'Asia/Jerusalem', label: '(GMT+02:00) Jerusalem' }
    , { value: 'Europe/Minsk', label: '(GMT+02:00) Minsk' }
    , { value: 'Africa/Windhoek', label: '(GMT+02:00) Windhoek' }
    , { value: 'Asia/Kuwait', label: '(GMT+03:00) Kuwait, Riyadh, Baghdad' }
    , { value: 'Europe/Moscow', label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd' }
    , { value: 'Africa/Nairobi', label: '(GMT+03:00) Nairobi' }
    , { value: 'Asia/Tbilisi', label: '(GMT+03:00) Tbilisi' }
    , { value: 'Asia/Tehran', label: '(GMT+03:30) Tehran' }
    , { value: 'Asia/Muscat', label: '(GMT+04:00) Abu Dhabi, Muscat' }
    , { value: 'Asia/Baku', label: '(GMT+04:00) Baku' }
    , { value: 'Asia/Yerevan', label: '(GMT+04:00) Yerevan' }
    , { value: 'Asia/Kabul', label: '(GMT+04:30) Kabul' }
    , { value: 'Asia/Yekaterinburg', label: '(GMT+05:00) Yekaterinburg' }
    , { value: 'Asia/Karachi', label: '(GMT+05:00) Islamabad, Karachi, Tashkent' }
    , { value: 'Asia/Calcutta', label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi' }
    , { value: 'Asia/Calcutta', label: '(GMT+05:30) Sri Jayawardenapura' }
    , { value: 'Asia/Katmandu', label: '(GMT+05:45) Kathmandu' }
    , { value: 'Asia/Almaty', label: '(GMT+06:00) Almaty, Novosibirsk' }
    , { value: 'Asia/Dhaka', label: '(GMT+06:00) Astana, Dhaka' }
    , { value: 'Asia/Rangoon', label: '(GMT+06:30) Yangon (Rangoon)' }
    , { value: 'Asia/Bangkok', label: '(GMT+07:00) Bangkok, Hanoi, Jakarta' }
    , { value: 'Asia/Krasnoyarsk', label: '(GMT+07:00) Krasnoyarsk' }
    , { value: 'Asia/Hong_Kong', label: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi' }
    , { value: 'Asia/Kuala_Lumpur', label: '(GMT+08:00) Kuala Lumpur, Singapore' }
    , { value: 'Asia/Irkutsk', label: '(GMT+08:00) Irkutsk, Ulaan Bataar' }
    , { value: 'Australia/Perth', label: '(GMT+08:00) Perth' }
    , { value: 'Asia/Taipei', label: '(GMT+08:00) Taipei' }
    , { value: 'Asia/Tokyo', label: '(GMT+09:00) Osaka, Sapporo, Tokyo' }
    , { value: 'Asia/Seoul', label: '(GMT+09:00) Seoul' }
    , { value: 'Asia/Yakutsk', label: '(GMT+09:00) Yakutsk' }
    , { value: 'Australia/Adelaide', label: '(GMT+09:30) Adelaide' }
    , { value: 'Australia/Darwin', label: '(GMT+09:30) Darwin' }
    , { value: 'Australia/Brisbane', label: '(GMT+10:00) Brisbane' }
    , { value: 'Australia/Canberra', label: '(GMT+10:00) Canberra, Melbourne, Sydney' }
    , { value: 'Australia/Hobart', label: '(GMT+10:00) Hobart' }
    , { value: 'Pacific/Guam', label: '(GMT+10:00) Guam, Port Moresby' }
    , { value: 'Asia/Vladivostok', label: '(GMT+10:00) Vladivostok' }
    , { value: 'Asia/Magadan', label: '(GMT+11:00) Magadan, Solomon Is., New Caledonia' }
    , { value: 'Pacific/Auckland', label: '(GMT+12:00) Auckland, Wellington' }
    , { value: 'Pacific/Fiji', label: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.' }
    , { value: 'Pacific/Tongatapu', label: '(GMT+13:00) Nuku\'alofa' }];

  priExtentions: any = [
    { label: 'mxf', value: '.mxf' },
    { label: 'mov', value: '.mov' },
    { label: 'avi', value: '.avi' },
    { label: 'mp4', value: '.mp4' }
  ];
  daysList: any = [
    { label: '7 Days', value: '7' },
    { label: '15 Days', value: '15' },
    { label: '1 Month', value: '30' },
    { label: '2 Months', value: '60' },
    { label: '3 Months', value: '90' },
    { label: '6 Months', value: '180' }
  ];
  hrsList: any = [
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '7' }
  ];
  secExtentions: any = [
    { label: 'jpg', value: '.jpg' },
    { label: 'mov', value: '.mov' },
    { label: 'mp4', value: '.mp4' }
  ];
  subExtentions: any = [
    { label: 'srt', value: '.srt' },
    { label: 'pac', value: '.pac' },
    { label: 'stl', value: '.stl' }
  ];
  public appName: any;
  totalFilePart: any;
  HouseIdRquestMsg: any;
  SchedulerUid: any;
  SchedulerRoleId: any;
  SchdulerCk: any;
  CallEpicForPalyer: boolean;
  constructor(private http: HttpClient, @Inject('BASE_URL') public AppUrl: string, public titleService: Title) { }
  private initialAuth: any[] = [
    {
      'Media': true, 'Transfer_Media': true, 'Delete_Media': true, 'Rename_Media': true, 'Playout': true, 'Playlist': true, 'Upload_Playlist': true, 'Download_Playlist': true, 'Configuration': true, 'Logs': true,
      'Event_Manager': true, 'Global_Search': true, 'Recreate_Proxy': true, 'Update_Preview_Status': true, 'Tagging': true, 'Bulk_Operations': true, 'Create_User': true, 'Storage': true, 'VNAS': true,
      'Cue_Sheet': true, 'Reconcile': true, 'Scheduler': true, 'Post_Production': true, 'Work_Order': true, 'Library': true, 'email': true, 'Ofcom': true, 'Metadata': true, 'Social_Share': true, 'Transcoding': true,
      'Subtitle_Conversion': true, 'QC': true, 'Subtitles_Reset': true, "VoD(read-only)": true, "VoD": true, "Help": true, "Transactions": true, 'MediaQC': true, 'MediaProxy': true, 'TransactionDR': true,
      "Post_Production_Movie": true, "Post_Production_Program": true,
      "S&P": true, "Operation": true, "Programming": true, "AddPriorityContent": true, "PlaylistReconcile": true, "MediaUpload": true, "Media Operation": true
    }
    
  ];
  private groupSource = localStorage.getItem('group') ? new BehaviorSubject<any>(JSON.parse(localStorage.getItem('group'))) : new BehaviorSubject<any>(this.initialAuth); //
  currentGroup = this.groupSource.asObservable();
  public compactView = localStorage.getItem('compact') ? new BehaviorSubject<any>((localStorage.getItem('compact'))) : new BehaviorSubject<any>('false');
  ViewState = this.compactView.asObservable();
  public chatBadge = localStorage.getItem('chatBadge') ? new BehaviorSubject<any>((localStorage.getItem('chatBadge'))) : new BehaviorSubject<any>('0');
  ChatBadge = this.chatBadge.asObservable();
  changeGroup(jData: any, plan) {
    localStorage.setItem('group', '');
    let Mappings = ($.isEmptyObject(jData) || jData.length == 0 || (jData && (Object.keys(jData).length === 0)) || jData == '{}') ? '' : jData.split(',');
    for (let k in this.groupSource.value[0]) {
      if (Mappings) {
        Mappings.indexOf(k) > -1 ? (this.groupSource.value[0][k] = (true)) : (this.groupSource.value[0][k] = (false));
      } else {
        this.groupSource.value[0][k] = (true);
      }
    }
    if (plan == 'standard') {
      this.groupSource.value[0]['Transcoding'] = (false);
      this.groupSource.value[0]['Subtitle_Conversion'] = (false);
    } else if (plan == 'prime') {
      this.groupSource.value[0]['Subtitle_Conversion'] = (false);
    }
    let r = localStorage.getItem("EpicRedirectUrl");
    this.RedirectType = r;
    if (r == "PPM") {
      this.groupSource.value[0]['Post_Production_Program'] = false;
      this.groupSource.value[0]['Post_Production_Movie'] = false;
      this.groupSource.value[0]['Programming'] = false;
      this.groupSource.value[0]['Operation'] = false;
      if (this.groupSource.value[0]['Post_Production'] == true)
        this.groupSource.value[0]['Post_Production'] = true;
      else if (this.groupSource.value[0]['Post_Production'] == false)
        this.groupSource.value[0]['Post_Production'] = false;
      //this.groupSource.value[0]["Media Operation"] = true;
    }
    else if (r == "PP") {
      if (this.groupSource.value[0]['Post_Production_Program'] == true)
        this.groupSource.value[0]['Post_Production_Program'] = true;
      if (this.groupSource.value[0]['Post_Production_Movie'] == true)
        this.groupSource.value[0]['Post_Production_Movie'] = true;
      if (this.groupSource.value[0]['Programming'] == true)
        this.groupSource.value[0]['Programming'] = true;
      if (this.groupSource.value[0]['Operation'] == true)
        this.groupSource.value[0]['Operation'] = true;
      this.groupSource.value[0]['Post_Production'] = false;
    }
    const updatedArray: any = this.groupSource;
    this.groupSource.next(updatedArray.value);
    localStorage.setItem('group', JSON.stringify(updatedArray.value));
  }
  public isAdmin = new BehaviorSubject<boolean>(false);
  AdminStatus = this.isAdmin.asObservable();
  EnableAdmin(b) {
    this.isAdmin.next(b);
  }
  // fireEvent(table: any, downloadsheetname: any) {
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, downloadsheetname + '.xlsx');

  // }
  changeUserID(uid) {
    const http = this.http;
    const url = this.AppUrl + 'Shared/changeUserID';
    return http.get(url, {
      params: {
        uid
      }
    });
  }
  globalSearch(key) {
    const http = this.http;
    const url = this.AppUrl + 'Shared/globalSearch';
    return http.get(url, {
      params: {
        key
      }
    });
  }
  checkUserExists(user) {
    const http = this.http;
    const url = this.AppUrl + 'Shared/checkUserExists';
    return http.get(url, {
      params: {
        user
      }
    });
  }
  DeleteCustomer(uid) {
    const http = this.http;
    const url = this.AppUrl + 'Shared/DeleteCustomer';
    return http.get(url, {
      params: {
        uid
      }
    });
  }

  GetChannelList() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetAllChannels';
    return http.get(url);
  }
  GetChannelPlayList() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetChannelPlayList';
    return http.get(url);
  }
  MediaData(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/MediaData';
    return http.get(url);
  }

  Login(Username: any, Password: any, isLocal: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Login/LoginUser';
    return http
      .get(url, {
        params: {
          UserName: Username,
          Password: Password,
          domain: isLocal
        }
      })
      .pipe();
  }

  GetADdns() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetADdns';
    return http.get(url).pipe();
  }

  Customers(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/Customers';
    return http.get(url).pipe();
  }

  TaasStatus(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/TaasStatus';
    return http
      .get(url, {
        params: {
          OperationUID: data.OperationUID ? data.OperationUID : '@',
          StatusUID: data.StatusUID ? data.StatusUID : '@',
          RecordPerPage: data.RecordPerPage,
          PageNumber: data.PageNumber,
          DateRange: data.DateRange ? data.DateRange.replace(' - ', '@') : '@',
          SourceUID: data.SourceUID ? data.SourceUID : '@',
          DestinationUID: data.DestinationUID ? data.DestinationUID : '@',
          SearchKeyword: data.SearchKeyword ? data.SearchKeyword : '@',
          Channel: data.Channel ? data.Channel : '@',
          DeviceType: data.DeviceType ? data.DeviceType : '@',
          SystemID: data.SystemID ? data.SystemID : '@',
          Region: data.Region ? data.Region : '@',
          user: data.user ? data.user : '@'
        }
      })
      .pipe();
  }

  BulkUpdate(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BulkUpdate';
    return http.post(url, data).pipe();
  }

  TCProfiles(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/Profiles';
    return http.get(url).pipe();
  }

  TCBulkFilePath(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/TCBulkFilePath';
    return http.get(url).pipe();
  }

  DeleteTcProfile(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/DeleteProfile';
    return http
      .get(url, {
        params: {
          UID: data
        }
      })
      .pipe();
  }

  GetTcProfileData(): Observable<any> {
    return this.http.get(this.AppUrl + 'Shared/GetTCProfile');
  }

  SingleTCProcess(ClipId: any, ProfileId: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/SingleTCProcess';
    return http
      .get(url, {
        params: {
          ClipId: ClipId,
          ProfileId: ProfileId
        }
      })
      .pipe();
  }

  Signup(value: any): Observable<any> {
    const url = 'Login/Signup';
    return this.http.post(url, value).pipe();
  }

  LogOut() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/Logout';
    return http.get(url).pipe();
  }
  LogoutTimer() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/LogoutTimer';
    return http.get(url).pipe();
  }

  GetUsername() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetUsername';
    return http.get(url).pipe();
  }

  GetSession() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetSession';
    return http.get(url).pipe();
  }

  GetPlan() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetPlan';
    return http.get(url).pipe();
  }

  // MoveAfterComplete
  MoveAfterComplete(source: any, destination: any, postData: any) {
    const url = this.AppUrl + 'Shared/MoveAfterComplete';
    return this.http
      .get(url, {
        params: {
          SourcePath: source,
          DestinationPath: destination,
          PostedData: postData
        }
      })
      .pipe();
  }

  UpdateUser(data: any, uid: any) {
    const url = this.AppUrl + 'Shared/UpdateUser';
    return this.http
      .get(url, {
        params: {
          Status: data,
          UID: uid
        }
      })
      .pipe();
  }

  SaveMetadata(xmlstring: any) {
    const url = this.AppUrl + 'Shared/SaveMetadata';
    return this.http
      .get(url, {
        params: {
          xmlstring: xmlstring
        }
      })
      .pipe();
  }

  uploadMetadatalist(files) {

    const formData: FormData = new FormData();

    formData.append('file', files, files.name);
    const url = this.AppUrl + 'Shared/UploadMetaXmllistAsync';
    return this.http.post(url, formData).pipe();
  }



  SaveMetadata1(xmlstring: any) {
    const url = this.AppUrl + 'Shared/SaveMetadata1';
    return this.http.post(url, xmlstring).pipe();
  }

  SendConfirmation(uid: any) {
    const url = this.AppUrl + 'Shared/SendConfirmation';
    return this.http
      .get(url, {
        params: {
          UID: uid
        }
      })
      .pipe();
  }

  MultiSendToTransfer(destdev: any, transprofile: any, seletedIDs: any, operationid: any) {
    const http = this.http;
    const url = this.AppUrl + 'Media/BulkOperation';

    let oprData: any = {};
    oprData.destdev = destdev;
    oprData.transprofile = transprofile;
    oprData.operationid = operationid;
    oprData.selection = seletedIDs;
    return http.post(url, oprData).pipe();
  }
  reconclip(clip: any, deviceUID: any) {
    const http = this.http;
    const url = this.AppUrl + 'Media/reconclip';

    let oprData: any = {};
    oprData.clipid = clip;
    oprData.deviceuid = deviceUID;

    return http.post(url, oprData).pipe();
  }
  SendToProcess(clipid: any, operationid: any, sourcedev: any, profileid: any, ext: any, destdev: any, destname: any) {
    const url = this.AppUrl + 'Shared/SendToProcess';
    return this.http
      .get(url, {
        params: {
          Clipid: clipid,
          Operation: operationid,
          Profile: profileid,
          SourceDevice: sourcedev,
          Ext: ext,
          DestDev: destdev,
          DestName: destname
        }
      })
      .pipe();
  }

  SendToTagging(clip: any, op: any, ext: any, lang) {
    const tagParams = {
      clipid: clip,
      clipextension: ext,
      operation: op,
      language: lang
    };
    const url = this.AppUrl + 'Shared/SendToTagging';
    return this.http.post(url, tagParams).pipe();
  }

  MediaData1(mediadata): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/MediaData';
    return http.post(url, mediadata);
  }
  GetPrimaryProxyPath(postProduction?: boolean, name?: any, type?: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetPrimaryProxyPath';
    return http.get(url, {
      params: {
        postProduction: postProduction ? postProduction.toString() : 'false',
        devicename: name
      }
    });
  }
  GetPrimaryProxyPathImg(postProduction?: boolean, name?: any, clipid?: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetPrimaryProxyPathImg';
    return http.get(url, {
      params: {
        postProduction: postProduction ? postProduction.toString() : 'false',
        devicename: name,
        ClipId: clipid
      }
    });
  }

  GetTransferProfile(): any {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetTransferProfile';
    return http.get(url).pipe();
  }
  GetCustomerDetail(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetCustomerDetail';
    return http.get(url);
  }

  GetDevices(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/Devices';
    return http.get(url);
  }

  GetoperationMaster(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetoperationMaster';
    return http.get(url);
  }

  GetStatusMaster(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetStatusMaster';
    return http.get(url);
  }

  GetDistinctUsersFromLoginHistory(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetDistinctUsersFromLoginHistory';
    return http.get(url);
  }

  GetUserId(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetUserId';
    return http.get(url);
  }

  UpdateColumns(columns: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/UpdateUserColumns';
    return http
      .get(url, {
        params: {
          UpdatedColumns: columns.toString()
        }
      })
      .pipe();
  }

  ChangeBMSPassword(old: any, newp: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/ChangeBMSPassword';
    return http
      .get(url, {
        params: {
          Old: old.toString(),
          New: newp.toString(),
          Confirm: newp.toString()
        }
      })
      .pipe();
  }

  ResetMailBMSPassword(newpwd: any, user: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/ResetMailBMSPassword';
    return http
      .get(url, {
        params: {
          New: newpwd,
          User: user
        }
      })
      .pipe();
  }


  GetUserDevices(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetUserDevices';
    return http
      .get(url, {
        params: {
          Channel: '@',
          AllData: '0',
          status: '@',
          system: '@'
        }
      })
      .pipe();
  }

  GetMappingandPlan(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetMappingandPlan';
    return http.get(url).pipe();
  }
  GetTCProfile(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetTCProfile';
    return http.get(url).pipe();
  }
  GetTCProfileID(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetTCProfileID';
    return http.get(url).pipe();
  }
  GetOperationPageCount(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetOperationPageCount';
    return http
      .get(url, {
        params: {
          OperationUID: data.OperationUID ? data.OperationUID : '@',
          StatusUID: data.StatusUID ? data.StatusUID : '@',
          RecordPerPage: data.RecordPerPage,
          PageNumber: data.PageNumber,
          DateRange: data.DateRange ? data.DateRange.replace(' - ', '@') : '@',
          SourceUID: data.SourceUID ? data.SourceUID : '@',
          DestinationUID: data.DestinationUID ? data.DestinationUID : '@',
          SearchKeyword: data.SearchKeyword ? data.SearchKeyword : '@',
          Channel: data.Channel ? data.Channel : '@',
          DeviceType: data.DeviceType ? data.DeviceType : '@',
          SystemID: data.SystemID ? data.SystemID : '@',
          Region: data.Region ? data.Region : '@',
          user: data.user ? data.user : '@'
        }
      })
      .pipe();
  }

  SetAppName(): void {
    if (window.location.host.startsWith('cloud')) {
      this.appName = 'CLOUD.X';
      this.titleService.setTitle(this.appName);
    } else if (window.location.host.startsWith('mam')) {
      this.appName = 'MAM.C';
      this.titleService.setTitle(this.appName);
    } else {
      this.GetAppName().subscribe(a => {
        this.appName = a;
        this.titleService.setTitle(this.appName);
      });
    }
  }

  GetAppName() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetAppName';
    return http.get(url).pipe();
  }

  GetUserProfile() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetUserProfile';
    return http.get(url).pipe();
  }

  UpdateUserProfile(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/UpdateUserProfileData';
    return http.post(url, data).pipe();
  }

  GetPlayoutUrl() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetPlayoutUrl';
    return http.get(url).pipe();
  }

  SendWhatsappActivation(contactno): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/SendWhatsappActivation';
    return http.get(url, {
      params: {
        ContactNo: contactno
      }
    }).pipe();
  }

  LoginToExternal(username: any, password: any) {
    let externalUrl;
    this.GetExternalUrl().subscribe(a => {
      externalUrl = a.toString().split('Scheduler');
      externalUrl = externalUrl[0] + 'Login/ExternalLogin';
      const http = this.http;
      const url = externalUrl;
      http.get(url.toString(), {
        params: {
          Username: username,
          Password: password
        }
      }).subscribe((b: any) => {
        var r = JSON.parse(b);
        localStorage.setItem("SchedulerUid", r[0].UID);
        localStorage.setItem("SchedulerRoleId", r[0].RoleID);
        localStorage.setItem("SchdulerCk", r[0].ConsumerKey);
        //this.SchedulerUid = r[0].UID;
        //this.SchedulerRoleId = r[0].RoleID;
        //this.SchdulerCk = r[0].ConsumerKey;
        console.log('after external login ' + b);
      });
    });
  }

  GetExternalUrl() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetExternalUrl';
    return http.get(url).pipe();
  }

  GetExternalDashboard() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetExternalDashboard';
    return http.get(url).pipe();
  }
  //# Region Suneel 20191210//
  _BindSubtitleDetails(): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindSubtitleDetails';
    return http.get(url).pipe();
  }

  //# Region Manu 2020-01-13//
  _BindVODDetails(Clipid: any, status: any, JobStartDateDate: any, Name: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindVODDetails';
    return http
      .get(url, {
        params: {
          Clipid: this.ReplaceUndefined(Clipid), Status: this.ReplaceUndefined(status), Date: this.ReplaceUndefined(JobStartDateDate), Name: this.ReplaceUndefined(Name)
        }
      })
      .pipe();
  }

  _BindftpDetails(transfertype: any, filename: any, status: any, SDate: any, EDate: any, deviceid: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindftpdashboardDetails';
    return http
      .get(url, {
        params: {
          transfertype: this.ReplaceUndefined(transfertype), filename: this.ReplaceUndefined(filename), Status: this.ReplaceUndefined(status), SDate: this.ReplaceUndefined(SDate), EDate: this.ReplaceUndefined(EDate), deviceid: this.ReplaceUndefined(deviceid)
        }
      })
      .pipe();
  }

  _BindProxyDetails(Clipid: any, status: any, JobStartDateDate: any, Name: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindProxyDetails';
    return http
      .get(url, {
        params: {
          Clipid: this.ReplaceUndefined(Clipid), Status: this.ReplaceUndefined(status), Date: this.ReplaceUndefined(JobStartDateDate), Name: this.ReplaceUndefined(Name)
        }
      })
      .pipe();
  }

  _BindProxyarchiveDetails(jobid: any, tbl: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindProxyarchiveDetails';
    return http
      .get(url, {
        params: {
          jobid: this.ReplaceUndefined(jobid),
          tbl: tbl
        }
      })
      .pipe();
  }

  GetBindVODHrs(type: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetBindVODHrs';
    return http
      .get(url, {
        params: {
          type: this.ReplaceUndefined(type)
        }
      })
      .pipe();
  }

  _BindVODarchiveDetails(jobid: any, tbl: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindVODarchiveDetails';
    return http
      .get(url, {
        params: {
          jobid: this.ReplaceUndefined(jobid),
          tbl: tbl
        }
      })
      .pipe();
  }
  ResetProxy(clip: any) {
    const tagParams = {
      clipid: clip
    };
    const url = this.AppUrl + 'Shared/ResetProxy';
    return this.http.post(url, tagParams).pipe();
  }
  SingleProxyPriortyreset(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/SingleProxyPriortyreset';
    return this.http.post(url, tagParams).pipe();
  }

  singleupdateProxyjobstaus(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/singleupdateProxyjobstaus';
    return this.http.post(url, tagParams).pipe();
  }

  singleupdateVODjobstaus(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/singleupdateVODjobstaus';
    return this.http.post(url, tagParams).pipe();
  }

  singleupdateQCjobstaus(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/singleupdateQCjobstaus';
    return this.http.post(url, tagParams).pipe();
  }

  singleupdateDRjobstaus(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/singleupdateDRjobstaus';
    return this.http.post(url, tagParams).pipe();
  }

  bulkupdateProxyPriority(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateProxyPriority';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  bulkupdateProxyjobstatus(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateProxyjobstatus';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  bulkupdateVODjobstatus(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateVODjobstatus';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  bulkupdateQCjobstatus(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateQCjobstatus';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }
  bulkupdateDRjobstatus(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateDRjobstatus';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  ReplaceUndefined(val) {
    if (val == undefined || val == null || val == '[object Object]' || val == '@' || val == '') { return '@'; } else { return val; }
  }
  GetBindSubtitleDetails(Clipid: any, filterDVB: any, filterSRT: any, filterTS: any, filterAUX: any,
    JobStartDateDate: any, ChannelName: any, ChannelDate: any, ChannelPlaylist: any, filterAlert: any, filterLanguage: any, filterStatus: any): Observable<any> {
    const http = this.http;
    //const url = this.AppUrl + 'Shared/GetWorkOrderClips';
    const url = this.AppUrl + 'Shared/GetBindSubtitleDetails';

    return http
      .get(url, {
        params: {
          Clipid: this.ReplaceUndefined(Clipid), filterDVB: this.ReplaceUndefined(filterDVB), filterSRT: this.ReplaceUndefined(filterSRT),
          filterTS: this.ReplaceUndefined(filterTS), filterAUX: this.ReplaceUndefined(filterAUX),
          Date: this.ReplaceUndefined(JobStartDateDate),
          ChannelName: this.ReplaceUndefined(ChannelName),
          ChannelDate: this.ReplaceUndefined(ChannelDate),
          ChannelPlaylist: this.ReplaceUndefined(ChannelPlaylist),
          filterAlert: this.ReplaceUndefined(filterAlert),
          filterLanguage: this.ReplaceUndefined(filterLanguage),
          filterStatus: this.ReplaceUndefined(filterStatus),
        }
      })
      .pipe();
  }
  GetBindSubtitleStatusDetails(Clipid: any, JobStartDateDate: any, ChannelName: any, ChannelDate: any, ChannelPlaylist: any): Observable<any> {
    const http = this.http;
    //const url = this.AppUrl + 'Shared/GetBindSubtitleDetails';
    const url = this.AppUrl + 'Shared/GetBindSubtitleStatusDetails';

    return http
      .get(url, {
        params: {
          Clipid: this.ReplaceUndefined(Clipid),
          Date: this.ReplaceUndefined(JobStartDateDate),
          ChannelName: this.ReplaceUndefined(ChannelName),
          ChannelDate: this.ReplaceUndefined(ChannelDate),
          ChannelPlaylist: this.ReplaceUndefined(ChannelPlaylist),
        }
      })
      .pipe();
  }

  ResetSubtitle(clip: any, tslang: any) {
    const tagParams = {
      clipid: clip,
      tslang: tslang,
    };
    //const url = this.AppUrl + 'Shared/SendToTagging';
    const url = this.AppUrl + 'Shared/ResetSubtitle';
    return this.http.post(url, tagParams).pipe();
  }
  ResetVOD(clip: any) {
    const tagParams = {
      clipid: clip
    };
    const url = this.AppUrl + 'Shared/ResetVOD';
    return this.http.post(url, tagParams).pipe();
  }
  ResetSubtitlePriorty(clip: any, tslang: any) {
    const tagParams = {
      Priorty: null,
      clipid: clip,
      tslang: tslang,
    };
    //const url = this.AppUrl + 'Shared/SendToTagging';
    const url = this.AppUrl + 'Shared/ResetSubtitlePriorty';
    return this.http.post(url, tagParams).pipe();
  }
  SubtitlePriortyreset(Priorty: any, clip: any, tslang: any) {
    const tagParams = {
      Priorty: Priorty,
      clipid: clip,
      tslang: tslang,
    };
    //const url = this.AppUrl + 'Shared/SendToTagging';
    const url = this.AppUrl + 'Shared/ResetSubtitlePriorty';
    return this.http.post(url, tagParams).pipe();
  }

  SubtitleJobstatus(Priorty: any, clip: any, tslang: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: clip,
    };
    //const url = this.AppUrl + 'Shared/SendToTagging';
    const url = this.AppUrl + 'Shared/SingleupdateSubtitlejobstaus';
    return this.http.post(url, tagParams).pipe();
  }

  SingleVODPriortyreset(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/SingleVODPriortyreset';
    return this.http.post(url, tagParams).pipe();
  }

  bulkupdateVODPriority(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateVODPriority';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  bulkupdatePriority(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/BulkResetSubtitlePriorty';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Prio = priority;

    return this.http.post(url, oprData).pipe();
  }

  SubtitleJobstatusAll(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/BulkupdateSubtitlejobstatus';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Prio = priority;

    return this.http.post(url, oprData).pipe();
  }
  updatedSubtitleDetails(clip: any, tslang: any): Observable<any> {

    const http = this.http;
    const url = this.AppUrl + 'Shared/updatedSubtitleDetails';
    return http
      .get(url, { params: { Clipid: this.ReplaceUndefined(clip), tslang: this.ReplaceUndefined(tslang), } }).pipe();
  }
  updatedSubtitleMoreDetails(clip: any, tslang: any): Observable<any> {

    const http = this.http;
    const url = this.AppUrl + 'Shared/updatedSubtitleMoreDetails';
    return http
      .get(url, { params: { Clipid: this.ReplaceUndefined(clip), tslang: this.ReplaceUndefined(tslang), } }).pipe();
  }

  _BindSubtitleStatusDetails(): any {
    const http = this.http;
    //const url = this.AppUrl + 'Shared/BindSubtitleDetails';
    const url = this.AppUrl + 'Shared/BindSubtitleStatusDetails';
    return http.get(url).pipe();
  }

  GetVendorProfileData(): Observable<any> {
    return this.http.get(this.AppUrl + 'Shared/GetVendorProfile');
  }

  Operate(servicename: any, value: any) {
    value = JSON.stringify(value);
    const http = this.http;
    const url = this.AppUrl + 'Shared/Operate';
    return http.get(url, {
      params: {
        servicename: servicename,
        value: value
      }
    });
  }



  ResetQC(clip: any) {
    const tagParams = {
      clipid: clip
    };
    const url = this.AppUrl + 'Shared/ResetQC';
    return this.http.post(url, tagParams).pipe();
  }
  ResetDR(clip: any) {
    const tagParams = {
      clipid: clip
    };
    const url = this.AppUrl + 'Shared/ResetDR';
    return this.http.post(url, tagParams).pipe();
  }
  SingleQCPriortyreset(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/SingleQCPriortyreset';
    return this.http.post(url, tagParams).pipe();
  }

  SingleDRPriortyreset(Priorty: any, data: any) {
    const tagParams = {
      Priorty: Priorty,
      jobid: data
    };
    const url = this.AppUrl + 'Shared/SingleDRPriortyreset';
    return this.http.post(url, tagParams).pipe();
  }

  bulkupdateQCPriority(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateQCPriority';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  bulkupdateDRPriority(seletedIDs: any, priority: any) {
    const url = this.AppUrl + 'Shared/bulkupdateDRPriority';
    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    oprData.Priorty = priority;
    return this.http.post(url, oprData).pipe();
  }

  _BindQCDetails(Clipid: any, status: any, JobStartDateDate: any, Name: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindQCDetails';
    return http
      .get(url, {
        params: {
          Clipid: this.ReplaceUndefined(Clipid), Status: this.ReplaceUndefined(status), Date: this.ReplaceUndefined(JobStartDateDate), Name: this.ReplaceUndefined(Name)
        }
      })
      .pipe();
  }


  _BindDRDetails(Clipid: any, status: any, JobStartDateDate: any, Name: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindDRDetails';
    return http
      .get(url, {
        params: {
          Clipid: this.ReplaceUndefined(Clipid), Status: this.ReplaceUndefined(status), Date: this.ReplaceUndefined(JobStartDateDate), Name: this.ReplaceUndefined(Name)
        }
      })
      .pipe();
  }

  _BindQCarchiveDetails(jobid: any, tbl: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindQCarchiveDetails';
    return http
      .get(url, {
        params: {
          jobid: this.ReplaceUndefined(jobid),
          tbl: tbl
        }
      })
      .pipe();
  }

  _BindDRarchiveDetails(jobid: any, tbl: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Shared/BindDRarchiveDetails';
    return http
      .get(url, {
        params: {
          jobid: this.ReplaceUndefined(jobid),
          tbl: tbl
        }
      })
      .pipe();
  }
  forget(data: any, otp1: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Login/Email';
    return http.get(url, {
      params: {
        data: data,
        notp: otp1
      }
    }).pipe();
  }

  EmailSend(data: any, encotp: any, otp1: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Login/EmailSend';
    return http.get(url, {
      params: {
        emailid: data,
        otp: encotp,
        notp: otp1,
        referlink: this.AppUrl + "otp/?otp="
      }
    }).pipe();
  }

  GetLoginType(otp1: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Login/GetLoginType';
    return http.get(url).pipe();
  }

  GetRedirectType(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Login/GetRedirectType';
    return http.get(url).pipe();
  }


  encrypt_decrypt_string(val: any, type: any) {
    var _secretKey = "7c606d287b6d6b7a6d7c287b7c7a61666f";
    var simpleCrypto: any = new simpleCrypto(_secretKey);
    var chiperText: any;
    var plainText: any = val;
    if (type == "encrypt")
      chiperText = simpleCrypto.encrypt(plainText);
    else if (type == "decrypt")
      chiperText = simpleCrypto.decrypt(plainText);
    return chiperText;
  }
  savefft(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/savefft';
    return http.post(url, data).pipe();
  }

  GetdeviceID(UserId: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetdeviceID';
    return http.get(url, { params: { UserId: this.ReplaceUndefined(UserId) } }).pipe();
  }
  GetCustomerUser(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetCustomerUser';
    return http.get(url).pipe();

  }

  GetDirectoryFile(date, channel): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetDirectoryFile';
    return http
      .get(url, {
        params: {
          date: this.ReplaceUndefined(date),
          channel: this.ReplaceUndefined(channel)
        }
      })
      .pipe();
    //return this.http.get(this.AppUrl + 'Shared/GetDirectoryFile');
  }

  GetChanneluserByList() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetChanneluserByList';
    return http.get(url);
  }

  PlayListArchive(PlaylistName: any, Archive: any) {
    const tagParams = {
      PlaylistName: PlaylistName.PlaylistName,
      PlaylistUID: PlaylistName.UID,
      Archive: Archive,
      Abbreviation: PlaylistName.Abbreviation
    };
    //const url = this.AppUrl + 'Shared/SendToTagging';
    const url = this.AppUrl + 'Shared/PlayListArchive';
    return this.http.post(url, tagParams).pipe();
  }

  alertsyslogdetails(): any {
    const http = this.http;
    //const url = this.AppUrl + 'Shared/BindSubtitleDetails';
    const url = this.AppUrl + 'Shared/Alertsyslogdetails';
    return http.get(url).pipe();
  }
  alertsyslogcount(): any {
    const http = this.http;
    //const url = this.AppUrl + 'Shared/BindSubtitleDetails';
    const url = this.AppUrl + 'Shared/alertsyslogcount';
    return http.get(url).pipe();
  }

  alertsyslogreadcountupdate(latestdate: any) {
    const tagParams = {
      sno: latestdate,
    };
    //const url = this.AppUrl + 'Shared/PlayListArchive';
    const url = this.AppUrl + 'Shared/alertsyslogreadcountupdate';

    return this.http.post(url, tagParams).pipe();
  }

  Getalertsyslogdetails(JobStartDateDate: any, filterHFM: any, filterLevel: any, filterAcknowledge: any): Observable<any> {
    const http = this.http;
    //const url = this.AppUrl + 'Shared/GetBindSubtitleStatusDetails';
    const url = this.AppUrl + 'Shared/Getalertsyslogdetails';
    return http
      .get(url, {
        params: {
          filterHFM: this.ReplaceUndefined(filterHFM),
          filterLevel: this.ReplaceUndefined(filterLevel),
          filterAcknowledge: this.ReplaceUndefined(filterAcknowledge),
          Date: this.ReplaceUndefined(JobStartDateDate),
        }
      })
      .pipe();
  }


  alertsyslogupdate(sno: any) {
    const tagParams = {
      sno: sno,
    };
    //const url = this.AppUrl + 'Shared/alertsyslogreadcountupdate';
    const url = this.AppUrl + 'Shared/alertsyslogupdate';

    return this.http.post(url, tagParams).pipe();
  }

  forceSearch(ForceParameters) {
    return this.http.post('/Shared/ForceSearch', ForceParameters);
  }
}

export class TableUtil {
  static exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "Review Excel";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    // let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    // XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}