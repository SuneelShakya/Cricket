import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenericService {
    IsLoginOk = false;
    data: any;
    clockgmt: any;
    time:any;
    TimeZones: any = [
        { name: "(GMT -12:00) Eniwetok, Kwajalein", value: "-12:00", selected: false },
        { name: "(GMT -11:00) Midway Island, Samoa", value: "-11:00", selected: false },
        { name: "(GMT -10:00) Hawaii", value: "-10:00", selected: false },
        { name: "(GMT -9:30) Taiohae", value: "-09:30", selected: false },
        { name: "(GMT -9:00) Alaska", value: "-09:00", selected: false },
        { name: "(GMT -8:00) Pacific Time (US &amp; Canada)", value: "-08:00", selected: false },
        { name: "(GMT -7:00) Mountain Time (US &amp; Canada)", value: "-07:00", selected: false },
        { name: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City", value: "-06:00", selected: false },
        { name: "(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima", value: "-05:00", selected: false },
        { name: "(GMT -4:30) Caracas", value: "-04:30", selected: false },
        { name: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz", value: "-04:00", selected: false },
        { name: "(GMT -3:30) Newfoundland", value: "-03:30", selected: false },
        { name: "(GMT -3:00) Brazil, Buenos Aires, Georgetown", value: "-03:00", selected: false },
        { name: "(GMT -2:00) Mid-Atlantic", value: "-02:00", selected: false },
        { name: "(GMT -1:00) Azores, Cape Verde Islands", value: "-01:00", selected: false },
        { name: "(GMT) Western Europe Time, London, Lisbon, Casablanca", value: "+00:00", selected: false },
        { name: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris", value: "+01:00", selected: false },
        { name: "(GMT +2:00) Kaliningrad, South Africa", value: "+02:00", selected: false },
        { name: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg", value: "+03:00", selected: false },
        { name: "(GMT +3:30) Tehran", value: "+03:30", selected: false },
        { name: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi", value: "+04:00", selected: false },
        { name: "(GMT +4:30) Kabul", value: "+04:30", selected: false },
        { name: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent", value: "+05:00", selected: false },
        { name: "(GMT +5:30) Mumbai, Calcutta, Madras, New Delhi", value: "+05:30", selected: true },
        { name: "(GMT +5:45) Kathmandu, Pokhara", value: "+05:45", selected: false },
        { name: "(GMT +6:00) Almaty, Dhaka, Colombo", value: "+06:00", selected: false },
        { name: "(GMT +6:30) Yangon, Mandalay", value: "+06:30", selected: false },
        { name: "(GMT +7:00) Bangkok, Hanoi, Jakarta", value: "+07:00", selected: false },
        { name: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong", value: "+08:00", selected: false },
        { name: "(GMT +8:45) Eucla", value: "+08:45", selected: false },
        { name: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk", value: "+09:00", selected: false },
        { name: "(GMT +9:30) Adelaide, Darwin", value: "+09:30", selected: false },
        { name: "(GMT +10:00) Eastern Australia, Guam, Vladivostok", value: "+10:00", selected: false },
        { name: "(GMT +10:30) Lord Howe Island", value: "+10:30", selected: false },
        { name: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia", value: "+11:00", selected: false },
        { name: "(GMT +11:30) Norfolk Island", value: "+11:30", selected: false },
        { name: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka", value: "+12:00", selected: false },
        { name: "(GMT +12:45) Chatham Islands", value: "+12:45", selected: false },
        { name: "(GMT +13:00) Apia, Nukualofa", value: "+13:00", selected: false },
        { name: "(GMT +14:00) Line Islands, Tokelau", value: "+14:00", selected: false }
    ];
    timezone: any = "";
    inspectorread:any;
    inspectorwrite:any;
    inspectordelete:any;
    componentread:any;
    componentwrite:any;
    componentdelete:any;
    profileread:any;
    profilewrite:any;
    profiledelete:any;
    workflowread:any;
    workflowwrite:any;
    workflowdelete:any;
    transactionread:any;
    transactionwrite:any;
    transactiondelete:any;

    priExtentions: any = [
        { label: 'mxf', value: '.mxf' },
        { label: 'mov', value: '.mov' },
        { label: 'avi', value: '.avi' },
        { label: 'mp4', value: '.mp4' }
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
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }
    CheckLogin() {
        if (localStorage.getItem('loginsuccess') == "success") {
            this.IsLoginOk = true;
        }
        else {
            this.IsLoginOk = false;
        }
    }
    showTime() {
        var date = new Date();
        var h: any = date.getHours(); // 0 - 23
        var m: any = date.getMinutes(); // 0 - 59
        var s: any = date.getSeconds(); // 0 - 59
        var session = "AM";
        if (h == 0) {
            h = 12;
        }
        if (h > 12) {
            h = h - 12;
            session = "PM";
        }
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("MyClockDisplay").innerText = time;
        document.getElementById("MyClockDisplay").textContent = time;
        setTimeout(this.showTime, 1000);
    }
    saveAsJson(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/saveAsJson';
        return http.post(url, data).pipe();
    }

    getJSON(jsonname: any, jsontype: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/GetJson';
        return http
            .get(url, {
                params: {
                    filetype: jsontype,
                    filename: jsonname
                }
            })
            .pipe();
    }

    GetPresentCustomers(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'SampleData/GetPresentCustomers';
        return http.get(url).pipe();
    }

    GetAppVersion(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/GetAppVersion';
        return http
            .get(url, {
                params: {
                    test: "a"
                }
            })
            .pipe();
    }
    saveexcel(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/InsertExcel';
        return http.post(url, data).pipe();
        //return http.get(url, { params: { month: data } }).pipe();
    }
    GetOperations(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'SampleData/GetOperations';
        return http.get(url).pipe();
    }


    GetUserDevices(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'SampleData/GetUserDevices';
        return http
            .get(url, {
                params: {
                    Channel: "@", AllData: "1", status: "@", system: "@"
                }
            })
            .pipe();
    }

    savefft(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/City';
        return http.get(url, data).pipe();
    }
    fetchdata() {
        const http = this.http;
        const url = this.AppUrl + 'SampleData/fetchdata';
        return http.get(url).pipe();
    }

    uploadfile(fileToUpload: File, filename: any) {
        const formData: FormData = new FormData();
        fileToUpload = <File>fileToUpload;
        formData.append('file', fileToUpload, filename);
        const http = this.http;
        const url = this.AppUrl + 'SampleData/readfile';
        return http.post(url, formData).pipe();
    }
    


    submitDBdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/submitDBdata';
        return http.post(url, data).pipe();
    }

    CreateDB(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/CreateDB';
        return http.post(url, data).pipe();
    }

    checkpackage() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/checkpackage';
        return http.get(url).pipe();
    }
    checkdb() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/checkdb';
        return http.get(url).pipe();
    }

    checkinspectorstatus(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/checkinspectorstatus';
        return http.get(url, { params: { inspecdata: data } }).pipe();
    }

    GetChannelList() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/GetAllChannels';
        return http.get(url);
      }

    DisableInspector(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/DisableInspector';
        return http.get(url, { params: { inspecdata: data } }).pipe();
    }

    

    Insertinspectordata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Insertinspectordata';
        return http.post(url, data).pipe();
    }

    InsertComponentdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/InsertComponentdata';
        return http.post(url, data).pipe();
    }

    ResetTransaction(status:any,UID:any){
        
            const http = this.http;
            const url = this.AppUrl + 'api/SampleData/ResetTransaction';
            return http.get(url,{params:{status:status,UID:UID,} }).pipe();
        
    }

    Singlepriorityupdate(Priority: any, data: any) {
      
        const url = this.AppUrl + 'api/SampleData/Singlepriorityupdate';
        return this.http.get(url,{params:{Priority:Priority,UID:data}} ).pipe();
      }

    Inserttransactiondata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Inserttransactiondata';
        return http.post(url, data).pipe();
    }

    Insertcomponents(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Insertcomponents';
        return http.post(url, data).pipe();
    }

    Updatecomponents(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Updatecomponents';
        return http.post(url, data).pipe();
    }

    // Insertflowdata(data:any) {
    //     const http = this.http;
    //     const url = this.AppUrl + 'api/SampleData/Insertflowdata';
    //     return http.get(url,{ params: { inspecdata: data } }).pipe();
    // }
    Insertflowdata(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Insertflowdata';
        return http.post(url, data).pipe();
    }
    InsertGroupdata(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/InsertGroupdata';
        return http.post(url, data).pipe();
    }
    DeleteGroupdata(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/DeleteGroupdata';
        return http.post(url, data).pipe();
    }
    Insertprofiledata(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Insertprofiledata';
        return http.post(url, data).pipe();
    }

    InsertUserdata(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/InsertUserdata';
        return http.post(url, data).pipe();
    }

    updateinspectordata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/updateinspectordata';
        return http.get(url, { params: { inspecdata: data } }).pipe();
    }

    updateisactive(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/updateisactive';
        return http.get(url, { params: { inspecdata: data } }).pipe();
    }

    updateflowdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/updateflowdata';
        return http.get(url, { params: { inspecdata: data } }).pipe();
    }



    updatecomponentdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/updatecomponentdata';
        return http.post(url, data).pipe();
    }
    fetchTeamdata() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchTeamdata';
        return http.get(url).pipe();
    }
    fetchStructureTeamdata() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchStructureTeamdata';
        return http.get(url).pipe();
    }
    fetchinspectordata() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchinspectordata';
        return http.get(url).pipe();
    }
    fetchGroupdata(data:any,curpage:any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchGroupdata';
        return http.get(url, { params: { pagesize: data,curpage:curpage } }).pipe();
    }


    fetchComponents(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchComponents';
        return http.get(url, { params: { binary: data } }).pipe();
    }

    Insertflowcomp(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/Insertflowcomp';
        return http.post(url, data).pipe();
    }



    updateflowcomp(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/updateflowcomp';
        return http.post(url, data).pipe();
    }



    fetchComponentdata() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchComponentdata';
        return http.get(url).pipe();
    }
    fetchtransactiondata(data:any,curpage:any,searchtext:any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchtransactiondata';
        return http.get(url, { params: { pagesize: data,curpage:curpage, searchtext:searchtext } }).pipe();
    }

    fetchmediadata(data:any,curpage:any,searchtext:any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchmediadata';
        return http.get(url, { params: { pagesize: data,curpage:curpage, searchtext:searchtext } }).pipe();
    }



    loginservice(user:any,password:any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/loginservice';
        return http.get(url, { params: { user: user,password:password } }).pipe();
    }

    fetchflowcomp(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchflowcomp';
        return http.get(url, { params: { id: data } }).pipe();
    }

    fetchUID(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchUID';
        return http.get(url, { params: { id: data } }).pipe();
    }

    fetchflowdata() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchflowdata';
        return http.get(url).pipe();
    }
    fetchprofiledata(data:any,curpage:any,searchtext:any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchprofiledata';
        return http.get(url, { params: { pagesize: data,curpage:curpage,searchtext:searchtext } }).pipe();
    }
    fetchUserdata(data:any,curpage:any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchUserdata';
        return http.get(url, { params: { pagesize: data,curpage:curpage } }).pipe();
    }
    fetchflowdetails(uid: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchflowdetails';
        return http.get(url, { params: { uid: uid } }).pipe();
    }

    fetchinspectorname() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchinspectorname';
        return http.get(url).pipe();
    }

    fetchcomponentname() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchcomponentname';
        return http.get(url).pipe();
    }

    deleteinspectordata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/deleteinspectordata';
        return http.get(url, { params: { id: data } }).pipe();
    }


    deletecomponentdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/deletecomponentdata';
        return http.get(url, { params: { id: data } }).pipe();
    }

    deleteEventdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/deleteEventdata';
        return http.get(url, { params: { id: data } }).pipe();
    }


    deletecomponent(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/deletecomponent';
        return http.get(url, { params: { id: data } }).pipe();
    }

    deleteflowdata(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/deleteflowdata';
        return http.get(url, { params: { id: data } }).pipe();
    }

    deleteflowrow(data: any) {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/deleteflowrow';
        return http.get(url, { params: { id: data } }).pipe();
    }

    savetimezone(user:any,timezone:any){
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/savetimezone';
        return http.get(url, { params: { user: user,timezone:timezone } }).pipe();
    }

    Devices() {
        const http = this.http;
        const url = 'api/SampleData/Devices';
        return http.get(url).pipe();
      }

      GetTransfers(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/GetTransfers';
        return http.get(url).pipe();
    }

    addArchive(archive): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/AddArchive';
        return http.post(url, archive).pipe();
    }

    

    fetchEventdata() {
        const http = this.http;
        const url = this.AppUrl + 'api/SampleData/fetchEventdata';
        return http.get(url).pipe();
    }

}
