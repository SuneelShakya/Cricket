import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WizardService {
    data = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    UISpaceConversion(x: any) {
        const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        x = x * 1024;
        let l = 0,
            n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l) n = n / 1024;
        return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + " " + units[l];
    }
    SourceDevice = ""; DestinationDevice = ""; Operation = ""; Profile = "";
    Wizard = {
        Channel: {
            ChannelName: "",
            ChannelAbbreviation: "",
            IngestType: "",
            PlaylistFormat: "",
            OutputType: "",
            AsrunFormat: "",
            PlaylistNameConvention: ""
        },
        User: {
            CreatedBy: "replacecreatedby",
            UserID: "",
            CustomerUID: "",
            Name: "",
            Username: "",
            Password: "",
            Email: "",
            PrimaryMobile: "",
            TotalAvailableSpace: 0,
            AssignedSpace: 0,
            InternalSpeed: 0,
            ExternalSpeed: 0,
            Bricks: 0
        },
        WizardSystem: {
            UID: "",
            SystemUID: "",
            ResourceType: "",
            SystemName: "",
            SystemType: "",
            SystemOSFlavor: "",
            SystemIP: "",
            SystemUser: "",
            SystemPort: 0,
            SystemPassword: "",
            AccessKey: "",
            Passphrase: "",
            RootDirectory: "",
            Space: 0,
            Region: "",
            Offline: "",
            AccessMethod: "",
            StorageResourceId: "",
            UpdateMode: ""
        },
        WizardDevice: {
            UID: "",
            DeviceName: "",
            SystemUID: "",
            AccessMethod: "",
            ContentCategory: "",
            LocalDirectory: "",
            ChecksumExtraction: "",
            ChecksumType: "",
            Offline: "",
            FtpDirectory: "",
            FtpUser: "",
            FtpPassword: "",
            FtpIP: "",
            FtpPort: 0,
            RootDirectory: "",
            SystemIP: "",
            SystemRegion: "",
            IngestResourceId: "",
            IsIngest: true,
            SystemPort: "",
            SystemUser: "",
            SystemPassword: "",
            AccessKey: "",
            Passphrase: "",
            Region: ""
        },
        WizardWorkflow: [],
        WizardOutput: {
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            MBIIIIP: "",
            MBIIIPort: 0,
            CloudXIP: "",
            CloudXPort: 0,
            OutputResourceId: "",
            VSProfilePath: "",
            MBIIIProfile: "",
            NDIStreamName: "",
            OutputType: "",
            CardNo: "",
            PortNo: ""
        },
        WizardQC: {
            SystemUID: "",
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            QCDirectory: "",
            QCResourceId: ""
        },
        WizardProxy: {
            SystemUID: "",
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            ProxyDirectory: "",
            ProxyResourceId: ""
        },
        WizardTC: {
            SystemUID: "",
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            TCDirectory: "",
            TCResourceId: ""
        },
        WizardGraphics: {
            SystemUID: "",
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            GraphicsDirectory: "",
            GraphicsResourceId: ""
        },
        WizardPlayoutStorage: {
            SystemUID: "",
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            PlayoutStorageDirectory: "",
            PlayoutStorageResourceId: "",
            Mirroring: "",
            MirroringDestination: "",
            MirroringSource: '',
            SystemUser: "",
            AccessKey: "",
            MirroringDestinationIP: "",
            Passphrase: ""
        },
        WizardEncoding: {
            SystemUID: "",
            SystemIP: "",
            SystemPort: 0,
            SystemUsername: "",
            SystemPassword: "",
            SystemAccesskey: "",
            SystemPassphrase: "",
            EncoderResourceId: "",
            Source: "",
            Destination: "",
            Profile: ""
        },
        WizardMx: {
            ServerIP: '',
            ServerPort: 0,
            PlayerType: "",
            ContentLocation: "",
            SubClipMode: "",
            PlayWithSom: "",
            PlayNAClip: "",
            CreateIDXFile: "",
            DatabaseVerification: "",
            UpdateDurationFromServer: "",
            UpdateSOMFromServer: "",
            DoneRowLength: 0,
            ContentFileType: "",
            PrimaryContentLocation: "",
            ChannelName: "",
            LTCPort: 0,
            FixStartMode: '',
            FixStartTime: '',
            PlaylistPath: "",
            PartialPlaylistPath: "",
            AudioProfileState: '',
            ManagementIP: '',
            ManagementPort: 0,
            AutoRecoverMode: '',
            TimeZone: '',
            MasterOutputFormat: '',
            DefaultOutputFormat: '',
            UDPMasterOut: '',
            UDPStreamURL: '',
            UDPVideoFormat: '',
            UDPVideoCodec: '',
            UDPAudioCodec: '',
            NDIMasterOut: '',
            NDIMasterOutName: '',
            SDIMasterOut: '',
            SDIMasterOutName: '',
            SDIMasterOutPort: 0,
            VirtualOut: '',
            PSTMasterOut: '',
            PSTMasterOutName: '',
            PSTOutType: '',
            PSTOutPort: 0,
            NDIMasterOutScalingQuality: 0,
            CueOffsetFrames: 0,
            SystemIP: "",
            SystemPort: 0,
            SystemUser: "",
            SystemPassword: "",
            Accesskey: "",
            Passphrase: ""
        }
    }
    GetPresentCustomers(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetPresentCustomers';
        return http.get(url).pipe();
    }

    CommonService(data: any, seriveurl: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + seriveurl;//'Shared/ConnectionStatus';
        return http.post(url, data).pipe();
    }
    GetWorkflowDevices(): Observable<any> {
        const http = this.http;
        //const url = this.AppUrl + 'Shared/GetUserDevices';
        const url = this.AppUrl + 'Shared/GetNewGuid';
        return http.get(url).pipe();
    }
    GetWorkflowOperations(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetWorkflowOperations';
        return http.get(url).pipe();
    }

    GetOperationProfiles(query: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetOperationProfiles';
        return http
            .get(url, {
                params: {
                    ProfileQuery: query
                }
            })
            .pipe();
    }
    SaveWizardData(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/WizardPlayoutcreation';
        return http.post(url, data).pipe();
    }
    InsertResource(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertResource';
        return http.post(url, data).pipe();
    }



    UpdateResource(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateResource';
        return http.post(url, data).pipe();
    }
    DeleteResource(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteResource';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    GetResources(region: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetResources';
        return http
            .get(url, {
                params: {
                    Region: (region == "") ? "all" : region
                }
            })
            .pipe();
    }
}
