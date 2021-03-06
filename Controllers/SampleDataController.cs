using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Threading;
using Newtonsoft.Json.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;


namespace Mam_Configuration_Demo.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        [HttpPost("[action]")]

        public JsonResult submitDBdata([FromBody] dynamic data)
        {

            dynamic jsonObject = new JObject(data);
            setConnectionstring(data);

            var json = (string)JsonConvert.SerializeObject(jsonObject);
            var url = $"CheckIfDbExist";



            return Json(url.MakeRequestNamanApi(json));

            // return Json(ServiceRequest.MakeRequest("1011", data, DB.CheckIfDbExist));
            // var customerid = objUser.RoleID == "2" ? objUser.UID : objUser.CreatedBy;
            // jsonObject.user = customerid.ToString();
            // jsonObject.SSHIP = Program.SSHIP;
            // jsonObject.SSHPort = Program.SSHPort;
            // jsonObject.SSHUsername = Program.SSHUsername;
            // jsonObject.SSHPassword = Program.SSHPassword;            


            // return Json(Program.runcommand(Command));

            //  var json = (string)JsonConvert.SerializeObject(data);
            // var url = $"getrealtimedata/";
            // return Json(ServiceRequest.MakeRequest(url));
        }


        public static void setConnectionstring(dynamic ConnectionString)
        {
            try
            {
                dynamic jsonObject = new JObject(ConnectionString);

                string json = System.IO.File.ReadAllText("appsettings.json");
                dynamic jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
                jsonObj["Data"]["DBHostIP"] = jsonObject.IP;
                jsonObj["Data"]["DBName"] = jsonObject.DBname;
                jsonObj["Data"]["DBPass"] = jsonObject.Password;
                jsonObj["Data"]["DBPort"] = jsonObject.Port;
                jsonObj["Data"]["MAMDBuser"] = jsonObject.MAMDBuser;
                jsonObj["Data"]["MAMDBPassword"] = jsonObject.MAMDBpassword;
                jsonObj["Data"]["ConnectionString"] = "server=192.168.24.144;user id=" + jsonObject.MAMDBuser + ";password=" + jsonObject.MAMDBpassword + ";persistsecurityinfo=True;port=" + jsonObject.Port + ";database=" + jsonObject.DBname + ";SslMode=none;";

                Program.ConnectionString = "server=192.168.24.144;user id=" + jsonObject.MAMDBuser + ";password=" + jsonObject.MAMDBpassword + ";persistsecurityinfo=True;port=" + jsonObject.Port + ";database=" + jsonObject.DBname + ";SslMode=none;";


                string output = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented);
                System.IO.File.WriteAllText("appsettings.json", output);
            }
            catch
            {

            }

        }



        [HttpGet("[action]")]
        public JsonResult checkdb()
        {

            string Command = "SELECT IFNULL( (SELECT SCHEMA_NAME  FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" + Program.DbName + "') ,'not found') as response;";
            // string url = "CheckComponents";
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            return Json(response);
            // components.ResultData.count.Value.ToString();


        }


        [HttpPost("[action]")]

        public JsonResult CreateDB([FromBody] dynamic data)
        {

            dynamic jsonObject = new JObject(data);
            setConnectionstring(data);

            var json = (string)JsonConvert.SerializeObject(jsonObject);
            var url = $"CreateDb";



            return Json(url.MakeRequestNamanApi(json));


        }



        [HttpGet("[action]")]
        public JsonResult checkpackage()
        {
            string Command = "";
            string url = "CheckComponents";
            return Json(ServiceRequest.MakeRequest("1011", Command, url, DB.GetData));
        }

        [HttpGet("[action]")]
        public JsonResult fetchinspectordata()
        {
            string Command = "select UID,Name,BinaryName,SystemIP,PortRx,PortTx,status,Version,IsActive,OSType,Remark from inspectormaster";
            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            response = JsonConvert.DeserializeObject(response);
            return Json(response);
        }

         [HttpGet("[action]")]
        public JsonResult fetchTeamdata()
        {
            string Command = "select Identifier,Name,LogoURI,TeamStatus from Team";
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            response = JsonConvert.DeserializeObject(response);
            return Json(response);
        }
        [HttpGet("[action]")]
        public JsonResult fetchStructureTeamdata()
        {
            string Command = "select Stm.Identifier,Stm.FirstName,Stm.LastName,Stm.JersyNumer,Stm.PLayerTotmat,Stm.PlayerTotrun,Stm.Playerhighscore,Stm.Playerfifty,Stm.Playerhundred,Tm.Name from Team Tm inner join StructureofPlayers Stm on Stm.TeamId=Tm.TeamId";
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            response = JsonConvert.DeserializeObject(response);
            return Json(response);
        }
        [HttpGet("[action]")]
        public JsonResult fetchEventdata()
        {
            string Command = "select e.*, c.name,p.Name,d.DeviceName  from eventmaster e left join devices d on e.sourcedevice = d.UID left join componentmaster c on e.Component = c.UID  left join profilemanagement p on e.Profile = p.UID";
            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            response = JsonConvert.DeserializeObject(response);
            return Json(response);
        }

        [HttpGet("[action]")]
        public JsonResult fetchComponentdata()
        {
            string Command = "select c.*, count(f.ComponentUID) as ref,fm.Name as fname from componentmaster c left join flowdetail f on f.ComponentUID=c.UID left join flowmanagement fm on f.FlowUID = fm.UID group by c.name;";
            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            response = JsonConvert.DeserializeObject(response);
            return Json(response);

        }




        [HttpGet("[action]")]

        public JsonResult ResetTransaction(string status, string UID)
        {
            string Command = "";
            dynamic response;
            ConnectionClass obj = new ConnectionClass();

            if (status.ToLower() == "deleted" || status.ToLower() == "delete")
            {
                string commandinsert = "insert into transactionic_archive(InspectorUid, ComponentUid,profiletype, JobStarttime, JobEndtime, Transflag, Clipid, DirectoryPath, Jobstatus, Remarks, Progress, Priority, ProfileUID)select InspectorUid, ComponentUid,profiletype, JobStarttime, JobEndtime, Transflag, Clipid, DirectoryPath, Jobstatus, Remarks, Progress, Priority, ProfileUID FROM transactionic WHERE Uid='" + UID + "'";
                response = obj.Connect(commandinsert, "Insert");

                dynamic components = JsonConvert.DeserializeObject(response);

                if (components.ResultData.Value == 1)
                {
                    string commanddelete = "delete from transactionic where UID='" + UID + "';";
                    response = obj.Connect(commanddelete, "Insert");

                }
            }
            else
            {

                Command = "Update transactionic set Jobstatus = '" + status + "',Transflag=0 where UID ='" + UID + "'";
                response = obj.Connect(Command, "Insert");
            }

            return Json(response);



        }

        [HttpGet("[action]")]

        public JsonResult Singlepriorityupdate(string Priority, string UID)
        {

            string Command = "Update transactionic set Priority = '" + Priority + "' where UID ='" + UID + "'";
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            return Json(response);

        }

        [HttpGet("[action]")]
        public JsonResult fetchtransactiondata(string pagesize, string curpage, string searchtext)
        {
            string Command = "";
            int offset = (int.Parse(curpage) == 1) ? 0 : ((int.Parse(curpage) - 1) * int.Parse(pagesize));
            if (searchtext != "" && searchtext != null && searchtext != "undefined")
            {
                Command = "select (select Count(*) from transactionic t left join inspectormaster i on t.InspectorUid=i.UID left join componentmaster c on t.ComponentUid=c.UID where c.name ='" + searchtext + "' ) as tlength,t.*,i.Name as inspector,c.name as component from transactionic t left join inspectormaster i on t.InspectorUid=i.UID left join componentmaster c on t.ComponentUid=c.UID WHERE MATCH(t.profiletype) AGAINST('" + searchtext + "' IN NATURAL LANGUAGE MODE) || MATCH(c.name) AGAINST('" + searchtext + "' IN NATURAL LANGUAGE MODE) || MATCH(i.Name) AGAINST('" + searchtext + "' IN NATURAL LANGUAGE MODE) || MATCH(t.Jobstatus) AGAINST('" + searchtext + "' IN NATURAL LANGUAGE MODE) order by JobEndTime desc limit " + offset + "," + pagesize + "";

            }
            else
            {
                Command = "select (select Count(*) from transactionic t left join inspectormaster i on t.InspectorUid=i.UID left join componentmaster c on t.ComponentUid=c.UID) as tlength,t.*,i.Name as inspector,c.name as component from transactionic t left join inspectormaster i on t.InspectorUid=i.UID left join componentmaster c on t.ComponentUid=c.UID order by JobEndTime desc limit " + offset + "," + pagesize + "";

            }

            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetData));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);

        }



        [HttpGet("[action]")]
        public JsonResult fetchmediadata(string pagesize, string curpage, string searchtext)
        {
            string Command = "";
            int offset = (int.Parse(curpage) == 1) ? 0 : ((int.Parse(curpage) - 1) * int.Parse(pagesize));
            if (searchtext != "" && searchtext != null && searchtext != "undefined")
            {
                Command = "select (select count(UID) from mamdatalist) as tlength,  UID,ClipId,IsGrowing,DeviceUID,ClipSize,DateCreated,SOM,Duration from mamdatalist limit " + offset + "," + pagesize + "";

            }
            else
            {
                Command = "select (select count(UID) from mamdatalist) as tlength, UID,ClipId,IsGrowing,DeviceUID,ClipSize,DateCreated,SOM,Duration from mamdatalist limit " + offset + "," + pagesize + "";

            }

            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetData));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);

        }

        [HttpGet("[action]")]
        public JsonResult loginservice(string user, string password)
        {

            string Command = "select u.Name,GroupId,timezone,g.* from users u left join groupmanagement g on u.GroupId = g.Name where Username ='" + user + "' and Password = '" + password + "';";
            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetData));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);

        }

        [HttpGet("[action]")]



        public JsonResult savetimezone(string user, string timezone)
        {

            string Command = "update users set timezone='" + timezone.Replace(' ', '+') + "' where Username ='" + user + "'";
            //    string url="select * from inspectormaster";
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetData));
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);

        }



        [HttpGet("[action]")]
        public JsonResult fetchflowdata()
        {
            string Command = "select f.*,i.Name as inspectorname from flowmanagement f left join inspectormaster i on f.InspectorUID= i.UID;";
            //dynamic response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync).Result;
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);
        }
        [HttpGet("[action]")]
        public JsonResult fetchGroupdata(string pagesize, string curpage)
        {
            string Command = "";
            if (pagesize != "x" && curpage != "x")
            {
                int offset = (int.Parse(curpage) == 1) ? 0 : ((int.Parse(curpage) - 1) * int.Parse(pagesize));
                Command = "select f.* ,(select count(*) from groupmanagement) as tlength from groupmanagement f order by Name desc limit " + offset + "," + pagesize + ";";

            }
            else
            {
                Command = "select f.* from groupmanagement f order by Name desc;";
            }
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            //dynamic response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync).Result;
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);
        }
        [HttpGet("[action]")]
        public JsonResult fetchprofiledata(string pagesize, string curpage, string searchtext)
        {
            string Command = "";
            if (pagesize != "x" && curpage != "x" && searchtext == "" || searchtext == null || searchtext == "undefined")
            {
                int offset = (int.Parse(curpage) == 1) ? 0 : ((int.Parse(curpage) - 1) * int.Parse(pagesize));
                Command = "select f.*,(select count(*) from profilemanagement) as tlength from profilemanagement f limit " + offset + "," + pagesize + ";";
            }
            else if (searchtext != "" && searchtext != "x" && searchtext != null && searchtext != "undefined")
            {
                int offset = (int.Parse(curpage) == 1) ? 0 : ((int.Parse(curpage) - 1) * int.Parse(pagesize));
                Command = "select f.*,(select count(*) from profilemanagement p where p.Name = '" + searchtext + "' ) as tlength from profilemanagement f WHERE MATCH(Name) AGAINST('" + searchtext + "' IN NATURAL LANGUAGE MODE) limit " + offset + "," + pagesize + ";";

            }
            else
            {
                Command = "select f.* from profilemanagement f";
            }
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            //dynamic response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync).Result;
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);
        }



        [HttpGet("[action]")]
        public JsonResult fetchUserdata(string pagesize, string curpage)
        {
            string Command = "";

            int offset = (int.Parse(curpage) == 1) ? 0 : ((int.Parse(curpage) - 1) * int.Parse(pagesize));
            Command = "select *,(select count(Name) from users where isdeleted=0 ) as tlength from users f where isdeleted=0 limit " + offset + "," + pagesize + ";";

            //string Command = "select f.* from users f where isdeleted=0 and GroupId in(select distinct Name from groupmanagement);";
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            //dynamic response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync).Result;
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);
        }

        [HttpGet("[action]")]
        public JsonResult fetchflowdetails(string uid)
        {
            string Command = "SELECT FlowUID,ComponentUID AS Component,OnFail,OnSuccess,OnFail_FileAction,OnSuccess_FileAction,OnFail_Rename,OnSuccess_Rename,OnSuccess_MovePath,OnFail_MovePath,SeqNo AS Sequence,inputpath,outputpath,ProfileUID AS Profile,STATUS AS PartialActive FROM flowdetail WHERE FlowUID='" + uid + "' order by Sequence";
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Select");
            //dynamic response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync).Result;
            dynamic deviceResponse = JsonConvert.DeserializeObject(response);
            return Json(deviceResponse);
        }

        [HttpGet("[action]")]
        public JsonResult fetchinspectorname()
        {
            string Command = "select UID,Name from inspectormaster";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }

        [HttpGet("[action]")]
        public JsonResult fetchComponents(string binary)
        {
            string Command = "select * from components where binaryname='" + binary + "'";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }

        [HttpGet("[action]")]
        public JsonResult fetchflowcomp(string id)
        {
            string Command = "select Component,SeqNo,c.name,f.UID from flowtableexample f left join componentmaster c on f.Component=c.UID where f.Name='" + id + "'";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }


        [HttpGet("[action]")]
        public JsonResult fetchcomponentname()
        {
            string Command = "select UID,BinaryName,Name from componentmaster";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }


        [HttpGet("[action]")]
        public JsonResult fetchUID(string id)
        {
            string Command = "select UID from flowtableexample where Name = '" + id + "'";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }

        [HttpGet("[action]")]
        public JsonResult deleteinspectordata(string id)
        {
            var response = "";
            string Command = "select count(f.InspectorUID) as count from flowmanagement f left join inspectormaster c on  f.InspectorUID =c.UID where c.UID='" + id + "'";
            // response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync).Result;
            ConnectionClass obj = new ConnectionClass();
            response = obj.Connect(Command, "Select");
            dynamic components = JsonConvert.DeserializeObject(response);

            if (components.ResultData == null || components.ResultData[0].count.Value.ToString() == "0")
            {
                string Command1 = "delete from inspectormaster where UID='" + id + "'";
                // response = ServiceRequest.MakeRequestLocal("1011", Command1, DB.GetDataAsync).Result;
                response = obj.Connect(Command1, "Delete");
                return Json(components.ResultData[0].count.Value.ToString());
            }
            else
            {
                //    string url="select * from inspectormaster";
                return Json("Remove Mapping First");
            }
        }


        [HttpGet("[action]")]
        public JsonResult deleteflowdata(string id)
        {
            string Command = "delete from flowtableexample where Name='" + id + "'";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }

        [HttpGet("[action]")]
        public JsonResult deletecomponent(string id)
        {
            string Command = "delete from components where UID='" + id + "'";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }

        [HttpGet("[action]")]
        public JsonResult deleteflowrow(string id)
        {
            string Command = "delete from flowtableexample where UID='" + id + "'";
            //    string url="select * from inspectormaster";
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.GetDataAsync));

        }


        [HttpGet("[action]")]
        public JsonResult deletecomponentdata(string id)
        {
            var response = "";
            string Command = "select count(f.ComponentUID) as count from flowdetail f left join componentmaster c on  f.ComponentUID =c.UID where c.UID='" + id + "'";
            // response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetData).Result;
            ConnectionClass obj = new ConnectionClass();
            response = obj.Connect(Command, "Select");
            dynamic components = JsonConvert.DeserializeObject(response);

            if (components.ResultData == null || components.ResultData[0].count.Value.ToString() == "0")
            {

                string Command1 = "delete from componentmaster where UID='" + id + "'";
                response = obj.Connect(Command1, "Delete");

                // response = ServiceRequest.MakeRequestLocal("1011", Command1, DB.GetDataAsync).Result;
                return Json(components.ResultData[0].count.Value.ToString());

            }
            else
            {
                return Json("Remove Mapping First");
            }
            return Json(response);
            //    string url="select * from inspectormaster";

        }


        [HttpGet("[action]")]
        public JsonResult deleteEventdata(string id)
        {
            var response = "";
            string Command = "delete from eventmaster where UID= '" + id + "'";
            // response = ServiceRequest.MakeRequestLocal("1011", Command, DB.GetData).Result;
            ConnectionClass obj = new ConnectionClass();
            response = obj.Connect(Command, "Delete");
            dynamic components = JsonConvert.DeserializeObject(response);
            DeleteEventApi(id);
            return Json(response);

            //    string url="select * from inspectormaster";

        }

        [HttpGet("[action]")]
        public JsonResult DeleteEventApi(string id)

        {
            string Command = "";
            string[] data;
            string url = "deleteevent/" + id;
            return Json(ServiceRequest.MakeRequest("1011", Command, url, DB.GetData));

        }


        [HttpGet("[action]")]
        public IActionResult GetAllChannels()
        {

            var url = "";
            string Command = "SELECT distinct c.UID as ChannelUID,c.Name,c.Abbreviation,c.IsActive,c.IsDeleted,c.DateCreated,c.LastUpdated,c.CreatedBy,c.UpdatedBy,c.IngestType" +
            ",c.PlaylistStartTime,c.asrunminfwd,c.EnablePlaylistTime" +
            ",c.ChannelType,c.EnableAsrunHour,c.AsRunStartTime" +
            ",c.AsRunHour,c.BusFileFormat" +
            ",c.channelno" +

            ",c.subtitletype" +
            ",c.AudioBitRate,priDevId,c.secDevId,c.subDevId,c.PublishUid,c.ConvertRule" +
            ",c.subtitle,c.zabbix_key_hostid,c.zabbix_key_ram,c.zabbix_key_cpu,c.zabbix_key_hdd,c.PlaylistForm,c.playlistnameconvention" +
            ",c.gfxinputformat,c.subinputfiletype,c.MulticastIP,c.MulticastPort,c.TimeZone,c.offcomhour" +
            ",c.CachingAgentIP,case when c.`tagging`='1' then true ELSE false end as IsViewTagging,subtitle_ignore,audiotracks,audiotracks_ignore,c.`tagging`,1 IsUpdate FROM channels c WHERE  c.IsDeleted=0";
           ConnectionClass obj = new ConnectionClass();
            dynamic Response = obj.Connect(Command, "Select");
            Response = JsonConvert.DeserializeObject(Response);
            return Json(Response);
        }


        [HttpGet("[action]")]
        public JsonResult updateinspectordata(string inspecdata)
        {
            string[] data;
            string Command = "";
            data = inspecdata.Split('$');
            if (data[0] == "refresh")
            {
                Command = "update inspectormaster set status='" + data[1] + "'";

            }
            else
            {
                if (data[9] == "nouid")
                {
                    Command = "insert into inspectormaster (Name,BinaryName,SystemIP,PortRx,PortTx,OSType,IsActive,Version,LastScan) values('" + data[0] + "','" + data[1] + "','" + data[2] + "','" + data[3] + "','" + data[4] + "','" + data[5] + "','" + data[6] + "','" + data[7] + "','" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "')";

                }
                else
                {
                    Command = "update inspectormaster set Name='" + data[0] + "',BinaryName='" + data[1] + "',SystemIP='" + data[2] + "',PortRx='" + data[3] + "',PortTx='" + data[4] + "',OSType='" + data[5] + "',IsActive='" + data[6] + "',Version='" + data[7] + "',status='" + data[8] + "' where UID='" + data[9] + "'";
                    //    string url="select * from inspectormaster";
                }
            }
            ConnectionClass obj = new ConnectionClass();
            dynamic Response = obj.Connect(Command, "Insert");
            Response = JsonConvert.DeserializeObject(Response);
            return Json(Response);
            // return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteScalar));







        }

        [HttpPost("[action]")]

        public JsonResult updatecomponentdata([FromBody] dynamic data)

        {
            string binaryname = "";
            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                if (data1.UID.ToString() == "nouid")
                {
                    sb.Append("insert into componentmaster (Name,BinaryName,path,Type,OSType,IsActive,version,status,Reference) values (");
                    sb.Append("'" + data1.Name + "'");
                    sb.Append(",'" + data1.BinaryName + "'");
                    sb.Append(",'" + data1.Path + "'");
                    sb.Append(",'" + data1.Type + "'");
                    sb.Append(",'" + data1.OSType + "'");
                    sb.Append(",'" + data1.EDStatus + "'");
                    sb.Append(",'" + data1.version + "'");
                    sb.Append(",'" + data1.Status + "'");
                    sb.Append(",'" + data1.Reference + "')");
                }
                else
                {
                    binaryname = data1.BinaryName;
                    sb.Append("Update componentmaster set Name =");
                    sb.Append("'" + data1.Name + "'");
                    sb.Append(",BinaryName=");
                    sb.Append("'" + data1.BinaryName + "'");
                    sb.Append(",path=");
                    sb.Append("'" + data1.Path + "'");
                    sb.Append(",Type=");
                    sb.Append("'" + data1.Type + "'");
                    sb.Append(",OSType=");
                    sb.Append("'" + data1.OSType + "'");
                    sb.Append(",IsActive=");
                    sb.Append("'" + data1.EDStatus + "'");
                    sb.Append(",version=");
                    sb.Append("'" + data1.version + "'");
                    sb.Append(",status=");
                    sb.Append("'" + data1.Status + "'");
                    sb.Append(",Reference=");
                    sb.Append("'" + data1.Reference + "' where UID =");
                    sb.Append("'" + data1.UID + "'");

                }
            }

            {
                // var response = ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.ExecuteQuery);
                ConnectionClass obj = new ConnectionClass();
                dynamic response = obj.Connect(sb.ToString(), "Insert");
                response = JsonConvert.DeserializeObject(response);
                return Json(response);





            }

        }


        [HttpPost("[action]")]

        public JsonResult updateflowcomp([FromBody] dynamic data)

        {
            string binaryname = "";
            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                binaryname = data1.Name;
                sb.Append("Update flowtableexample set Name =");
                sb.Append("'" + data1.Name + "'");
                sb.Append(",Inspector=");
                sb.Append("'" + data1.Inspector + "'");
                sb.Append(",Component=");
                sb.Append("'" + data1.Component + "'");
                sb.Append(",SeqNo=");
                sb.Append("'" + data1.SeqNo + "'");
                sb.Append(",System=");
                sb.Append("'" + data1.System + "'");
                sb.Append(",Version=");
                sb.Append("'" + data1.Version + "'");
                sb.Append(",Status=");
                sb.Append("'" + data1.Status + "' where UID =");
                sb.Append("'" + data1.UID + "'");
                var response = ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.GetDataAsync);
                sb = new StringBuilder("");


            }

            {
                return Json(binaryname);




            }

        }


        [HttpGet("[action]")]
        public JsonResult updateflowdata(string inspecdata)
        {
            string[] data;
            string Command = "";
            data = inspecdata.Split('$');

            if (data[5] == "nouid")
            {
                Command = "insert into flowmaster (Name,Inspector,System,version,status) values('" + data[0] + "','" + data[1] + "','" + data[2] + "','" + data[3] + "','" + data[4] + "')";
            }
            else
            {
                Command = "update flowmaster set Name='" + data[0] + "',Inspector='" + data[1] + "',System='" + data[2] + "',version='" + data[3] + "',status='" + data[4] + "' where UID='" + data[5] + "'";
                //    string url="select * from inspectormaster";
            }
            return Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteScalar));



        }



        [HttpGet("[action]")]
        public JsonResult checkinspectorstatus(string inspecdata)

        {
            string Command = "";
            string[] data;
            data = inspecdata.Split('$');
            string url = "Checkinspectorstatus/" + data[0] + "/" + data[1];
            return Json(ServiceRequest.MakeRequest("1011", Command, url, DB.GetData));

        }


        [HttpGet("[action]")]
        public JsonResult DisableInspector(string inspecdata)

        {
            string Command = "";
            string[] data;
            data = inspecdata.Split('$');
            string url = "InspectorControl/" + data[0] + "/" + data[1] + "/" + data[2];
            return Json(ServiceRequest.MakeRequest("1011", Command, url, DB.GetData));

        }

        [HttpGet("[action]")]
        public JsonResult updateisactive(string inspecdata)

        {

            string[] data;
            data = inspecdata.Split('$');
            string Command = "update inspectormaster set isActive ='" + data[1] + "' where UID ='" + data[0] + "'";

            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect(Command, "Insert");
            return Json(response);

        }



        [HttpPost("[action]")]

        public JsonResult Insertinspectordata([FromBody] dynamic data)

        {
            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                sb.Append("insert into inspectormaster (Name,BinaryName,SystemIP,PortRx,PortTx,status,IsActive,OSType,Version,LastScan,Comments,Tags) values (");
                sb.Append("'" + data1.inspector + "'");
                sb.Append(",'" + data1.binary + "'");
                sb.Append(",'" + data1.systemip + "'");
                sb.Append(",'" + data1.rport + "'");
                sb.Append(",'" + data1.tport + "'");
                sb.Append(",'" + data1.status + "'");
                sb.Append(",'" + data1.active + "'");
                sb.Append(",'" + data1.ostype + "'");
                sb.Append(",'" + data1.version + "'");
                sb.Append(",'" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "'");
                sb.Append(",'" + data1.comments + "'");
                sb.Append(",'" + data1.tags + "')");

            }

            {

                string url = "GetDataAsync/";

                // var Response = (ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.GetDataAsync));
                ConnectionClass obj = new ConnectionClass();
                dynamic Response = obj.Connect(sb.ToString(), "Insert");
                Response = JsonConvert.DeserializeObject(Response);
                return Json(Response);


            }

        }


        [HttpPost("[action]")]
        public JsonResult Insertflowdata([FromBody] dynamic data)
        {
            string Command = "";
            int pc = 0;
            dynamic respo1 = null;
            dynamic jsonObject = new JObject(data);
            string GUID = Guid.NewGuid().ToString();
            dynamic json = jsonObject.ComponentArray;
            dynamic deviceResponse = null;
            if (jsonObject.OperationName == "Save")
            {
                Command = "insert into flowmanagement (Name,Version,UID,SystemIP,InspectorUID,SystemName,status,IsActive) values('" + jsonObject.Name + "','" + jsonObject.Version + "','" + GUID + "','" + jsonObject.SystemIP + "','" + jsonObject.Inspector + "','" + jsonObject.SystemName + "','" + jsonObject.Status + "','" + jsonObject.IsActive + "')";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Insert");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
                if (deviceResponse == "1")
                {
                    for (int i = 0; i < json.Count; i++)
                    {
                        var FlowUID = GUID;
                        var ComponentUID = json[i]["Component"];
                        var ProfileUID = json[i]["Profile"];
                        var SeqNo = json[i]["Sequence"];
                        var Folder = json[i]["Folder"];
                        var outputpath = json[i]["outputpath"];
                        var Status = json[i]["PartialActive"];
                        Command = "insert into flowdetail (FlowUID,ComponentUID,ProfileUID,SeqNo,inputpath,outputpath,Status) values('" + FlowUID + "','" + ComponentUID + "','" + ProfileUID + "','" + SeqNo + "','" + Folder + "','" + outputpath + "','" + Status + "')";
                        obj = new ConnectionClass();
                        dynamic respo = obj.Connect(Command, "Insert");
                        //dynamic respo = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                        deviceResponse = JsonConvert.DeserializeObject(respo).ResultData;
                        if (deviceResponse == "1")
                        {
                            pc++;
                        }
                    }
                }

            }
            else if (jsonObject.OperationName == "Update")
            {
                Command = "delete from flowdetail where FlowUID='" + jsonObject.UID + "'";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Delete");
                //respo1 = Json(ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery));
                for (int i = 0; i < json.Count; i++)
                {
                    var ComponentUID = json[i]["Component"];
                    var ProfileUID = json[i]["Profile"];
                    var SeqNo = json[i]["Sequence"];
                    var Folder = json[i]["Folder"];
                    var outputpath = json[i]["outputpath"];
                    var Status = json[i]["PartialActive"];
                    var OnFail = json[i]["OnFail"];
                    var OnSuccess = json[i]["OnSuccess"];
                    var OnFail_FileAction = json[i]["OnFailFileAction"];
                    var OnSuccess_FileAction = json[i]["OnSuccessFileAction"];
                    var OnFailmovepath = json[i]["OnFailPath"];
                    var OnSuccessmovepath = json[i]["OnSuccessPath"];
                    var OnSuccessrename = json[i]["SuccessRename"];
                    var OnFailrename = json[i]["FailRename"];


                    Command = "insert into flowdetail (FlowUID,ComponentUID,ProfileUID,SeqNo,inputpath,outputpath,OnFail,OnSuccess,OnFail_MovePath,OnSuccess_MovePath,OnFail_Rename,OnSuccess_Rename,OnFail_FileAction,OnSuccess_FileAction,Status) values('" + jsonObject.UID + "','" + ComponentUID + "','" + ProfileUID + "','" + SeqNo + "','" + Folder + "','" + outputpath + "','" + OnFail + "','" + OnSuccess + "','" + OnFailmovepath + "','" + OnSuccessmovepath + "','" + OnFailrename + "','" + OnSuccessrename + "','" + OnFail_FileAction + "','" + OnSuccess_FileAction + "','" + Status + "')";
                    obj = new ConnectionClass();
                    dynamic respo = obj.Connect(Command, "Insert");
                    //dynamic respo = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                    deviceResponse = JsonConvert.DeserializeObject(respo).ResultData;
                    if (deviceResponse == "1")
                    {
                        pc++;
                    }
                    //uid = deviceResponse.ResultData[0]["uid"].ToString();
                }
                Command = "update flowmanagement set Name='" + jsonObject.Name + "',Version='" + jsonObject.Version + "',SystemIP='" + jsonObject.SystemIP + "',InspectorUID='" + jsonObject.Inspector + "',SystemName='" + jsonObject.SystemName + "',status='" + jsonObject.Status + "',IsActive='" + jsonObject.IsActive + "' where UID='" + jsonObject.UID + "'";
                obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Update");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            else if (jsonObject.OperationName == "Delete")
            {
                Command = "delete from flowdetail where FlowUID='" + jsonObject.UID + "';";
                Command += "delete from flowmanagement where UID='" + jsonObject.UID + "'";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Delete");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            if (deviceResponse == "1" && pc == json.Count && jsonObject.OperationName != "Delete")
                return Json("Success");
            else if (deviceResponse != "0" && jsonObject.OperationName == "Delete")
                return Json("Success");
            else return Json("Fail");
        }

        [HttpPost("[action]")]
        public JsonResult InsertGroupdata([FromBody] dynamic data)
        {
            string Command = "";
            dynamic respo1 = null;
            dynamic jsonObject = new JObject(data);
            dynamic json = jsonObject.data;
            dynamic deviceResponse = null;
            for (int i = 0; i < json.Count; i++)
            {
                if (json[i]["OperationName"] == "Save")
                {
                    //string GUID = Guid.NewGuid().ToString();
                    if (json[i]["hidden"] == false)
                    {
                        Command = "insert into Groupmanagement (`Name`,Menu,`Read`,`Write`,`Delete`,GroupActive,IsActive) values('" + json[i]["Name"].ToString() + "','" + json[i]["Menu"].ToString() + "','" + json[i]["Read"].ToString() + "','" + json[i]["Write"].ToString() + "','" + json[i]["Delete"].ToString() + "','" + json[i]["GroupActive"].ToString() + "','" + json[i]["IsActive"].ToString() + "')";
                        ConnectionClass obj = new ConnectionClass();
                        respo1 = obj.Connect(Command, "Insert");
                        //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                        deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
                    }
                }
                else if (json[i]["OperationName"] == "Update")
                {
                    Command = "update Groupmanagement set `Name`='" + json[i]["Name"].ToString() + "',Menu='" + json[i]["Menu"].ToString() + "',`Read`='" + json[i]["Read"].ToString() + "',`Write`='" + json[i]["Write"].ToString() + "',`Delete`='" + json[i]["Delete"].ToString() + "',GroupActive='" + json[i]["GroupActive"].ToString() + "',IsActive='" + json[i]["IsActive"].ToString() + "' where UID='" + json[i]["UID"].ToString() + "'";
                    ConnectionClass obj = new ConnectionClass();
                    respo1 = obj.Connect(Command, "Update");
                    //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                    deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
                }
                else if (json[i]["OperationName"] == "Delete")
                {
                    Command += "delete from Groupmanagement where UID='" + json[i]["UID"].ToString() + "'";
                    ConnectionClass obj = new ConnectionClass();
                    respo1 = obj.Connect(Command, "Delete");
                    //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                    deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
                }
            }
            if (deviceResponse == "1" || deviceResponse == "[]")
                return Json("Success");
            else return Json("Fail");
        }


        [HttpGet("[action]")]
        public IActionResult Devices()
        {
            try
            {

                string Command = $"select uid,devicename,devicetype from devices where createdby=1;";
                ConnectionClass obj = new ConnectionClass();
                dynamic response = obj.Connect(Command, "Select");
                dynamic deviceResponse = JsonConvert.DeserializeObject(response);
                return Json(deviceResponse);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Json(ex.Message);
            }
        }

        [HttpPost("[action]")]

        public JsonResult AddArchive([FromBody] dynamic archive)
        {
            var json = (string)JsonConvert.SerializeObject(archive);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            dynamic Response = "";
            string Command = "";
            ConnectionClass obj = new ConnectionClass();

            try
            {
                foreach (var data1 in components)
                {
                    //string UID =Guid.NewGuid();
                    string UID = data1.UID;
                    string Operation = data1.Operation;
                    string EventType = data1.EventType;
                    string EventName =data1.EventName;
                    string Source = data1.Source;
                    string Destination = data1.Destination;
                    string Playlist = data1.Playlist;
                    string PlaylistDays = data1.PlaylistDays == null ? "null" : data1.PlaylistDays;
                    string Transfer = data1.Transfer;
                    string Extension = data1.Extension == null ? "null" : data1.Extension.ToString();
                    string Asrun = data1.Asrun;
                    string AsrunDays = data1.AsrunDays == null ? "null" : data1.AsrunDays; ;
                    string HoursDate = data1.Hours;
                    string Preview = data1.Preview;
                    string ExecutionTime = data1.jobtime;
                    string ExecutionStandard = data1.jobexecutionstandard;
                    string Size = data1.Size;
                    string datecreatedtime = data1.datecreatedtime;
                    string datecreatedstandard = data1.datecreatedstandard;
                    string deeparchive = data1.deeparchive;
                    string IngestHours = data1.IngestHours;
                    string deletemedia = data1.deletemedia;
                    string Event = data1.Event;
                    string Component = data1.Component;
                    string Profile = data1.Profile;
                    string DeviceCategory = data1.DeviceCategory;
                    string MissingHours = data1.MissingHours;
                    string OnAir = data1.OnAir;
                    string Email = data1.Email;
                    string Channel = data1.Channel;
                    string Active = data1.Status;
                    string createdby = data1.createdby;
                    string Updatedby = createdby;
                    string Datecreated = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    string lastupdated = Datecreated;

                    if (Operation == "Insert")
                    {

                        Command = $"insert into eventmaster(uid,EventType,EventName,Event,DeviceCategory,sourcedevice,destinationdevice,Component,Profile,Size,OnAir,Email,Channel,checkplaylist,checkplaylistdays,transferprofileid,validextension,checkasrun,checkasrundays," +
                        $"checkdatecreatedhours,MissingHours,DateCreatedStandard,DateCreatedTime,IngestHours,checkpreview,DeleteMedia,DeepArchive,jobexecutiontime,jobexecutionstandard,isactive,isdeleted,createdby,updatedby,datecreated,lastupdated) values ( '{Guid.NewGuid()}','{EventType}','{EventName}','{Event}','{DeviceCategory}','{Source}'," +
                        $"'{Destination}','{Component}','{Profile}','{Size}','{OnAir}','{Email}','{Channel}','{Playlist}',{PlaylistDays},'{Transfer}','{Extension}','{Asrun}',{AsrunDays},'{HoursDate}','{MissingHours}','{datecreatedstandard}','{datecreatedtime}','{IngestHours}','{Preview}','{deletemedia}','{deeparchive}','{ExecutionTime}'" +
                        $",'{ExecutionStandard}','{Active}',0,'{createdby}','{Updatedby}','{Datecreated}','{lastupdated}')";
                        //dynamic AddEvent=CreateEvent("ar","Archive",DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss"),ExecutionTime,ExecutionStandard);
                    }
                    else if (Operation == "Update")
                    {
                        Command = "Delete from eventmaster where UID ='" + UID + "'";
                        Response = obj.Connect(Command, "Insert");
                        Response = JsonConvert.DeserializeObject(Response);

                        Command = $"insert into eventmaster(uid,EventType,EventName,Event,DeviceCategory,sourcedevice,destinationdevice,Component,Profile,Size,OnAir,Email,Channel,checkplaylist,checkplaylistdays,transferprofileid,validextension,checkasrun,checkasrundays," +
                        $"checkdatecreatedhours,MissingHours,DateCreatedStandard,DateCreatedTime,IngestHours,checkpreview,DeleteMedia,DeepArchive,jobexecutiontime,jobexecutionstandard,isactive,isdeleted,createdby,updatedby,datecreated,lastupdated) values ( '{Guid.NewGuid()}','{EventType}','{EventName}','{Event}','{DeviceCategory}','{Source}'," +
                        $"'{Destination}','{Component}','{Profile}','{Size}','{OnAir}','{Email}','{Channel}','{Playlist}',{PlaylistDays},'{Transfer}','{Extension}','{Asrun}',{AsrunDays},'{HoursDate}','{MissingHours}','{datecreatedstandard}','{datecreatedtime}','{IngestHours}','{Preview}','{deletemedia}','{deeparchive}','{ExecutionTime}'" +
                        $",'{ExecutionStandard}','{Active}',0,'{createdby}','{Updatedby}','{Datecreated}','{lastupdated}')";
                    }
                    dynamic response = obj.Connect(Command, "Insert");
                    Response = JsonConvert.DeserializeObject(response);
                }
                return Json(Response);

                //}

            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }

        }

        [HttpGet("[action]")]
        public IActionResult GetTransfers()
        {
            try
            {

                string Command = $"SELECT tp.checkfilemodification,tp.checksum, tp.verifychecksum, tp.UID,tp.profilename,tp.validprefix,tp.validExtension,tp.waitaftertransfer,tp.transferfail,tp.transferfailvalue,tp.overwrite,u.name,tp.transferprotocol AS transferprotocol,us.name AS updatedby,tp.IsDeleted,tp.IsActive,tp.creationtime,tp.lastupdated,tp.remarks,tp.operationtype,tp.actionaftertransferok,tp.actionaftertransferfail,tp.deviceUidAfterTransOK,tp.deviceUidAfterTransFail,tp.deleteafterfailure,tp.downloadspeed,tp.uploadspeed" +
            $" FROM transferprofile tp,users u,users us WHERE tp.createdby='6' AND tp.IsDeleted =0 AND tp.createdby=u.UID AND tp.updatedby=us.UID";

                ConnectionClass obj = new ConnectionClass();
                dynamic response = obj.Connect(Command, "Select");
                dynamic deviceResponse = JsonConvert.DeserializeObject(response);
                return Json(deviceResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Json("timeout");
            }
        }

        [HttpPost("[action]")]
        public JsonResult DeleteGroupdata([FromBody] dynamic data)
        {
            string Command = "";
            dynamic respo1 = null;
            dynamic jsonObject = new JObject(data);
            dynamic deviceResponse = null;
            ConnectionClass obj = new ConnectionClass();
            dynamic response = obj.Connect("select Count(*) as C from users where GroupId='" + jsonObject.Name + "'", "Select");
            deviceResponse = JsonConvert.DeserializeObject(response).ResultData[0].C;
            if (deviceResponse == 0)
            {
                Command = "delete from Groupmanagement where UID='" + jsonObject.UID + "'";
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Delete");
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            else
            {
                deviceResponse = "2";
            }
            if (deviceResponse == "1" || deviceResponse == "[]")
                return Json("Success");
            if (deviceResponse == "2")
                return Json("Duplicate");
            else return Json("Fail");
        }

        [HttpPost("[action]")]
        public JsonResult InsertUserdata([FromBody] dynamic data)
        {
            string Command = "";
            int pc = 0;
            dynamic respo1 = null;
            dynamic jsonObject = new JObject(data);
            string GUID = Guid.NewGuid().ToString();
            dynamic json = jsonObject.ComponentArray;
            dynamic deviceResponse = null;
            if (jsonObject.OperationName == "Save")
            {
                Command = "insert into users (DateCreated,LastUpdated,Name,Username,UID,Password,Remarks,IsActive,CreatedBy,UpdatedBy,emailid,primarymobile,secondarymobile,GroupId) values(Now(),Now(),'" + jsonObject.Name + "','" + jsonObject.Username + "','" + GUID + "','" + jsonObject.Password + "','" + jsonObject.Remarks + "','" + jsonObject.IsActive + "','1','1','" + jsonObject.emailid + "','" + jsonObject.primarymobile + "','" + jsonObject.secondarymobile + "','" + jsonObject.GroupId + "')";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Insert");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            else if (jsonObject.OperationName == "Update")
            {
                Command = "update users set LastUpdated=Now(),Name='" + jsonObject.Name + "',Username='" + jsonObject.Username + "',Password='" + jsonObject.Password + "',Remarks='" + jsonObject.Remarks + "',emailid='" + jsonObject.emailid + "',IsActive='" + jsonObject.IsActive + "',IsActive='" + jsonObject.IsActive + "',primarymobile='" + jsonObject.primarymobile + "',secondarymobile='" + jsonObject.secondarymobile + "',GroupId='" + jsonObject.GroupId + "' where UID='" + jsonObject.UID + "'";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Update");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            else if (jsonObject.OperationName == "Delete")
            {
                Command += "update users set LastUpdated=Now(),IsDeleted='1',GroupId='' where UID='" + jsonObject.UID + "'";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Delete");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            if (deviceResponse == "1")
                return Json("Success");
            else if (deviceResponse == "2")
                return Json("Duplicate");
            else return Json("Fail");
        }

        [HttpPost("[action]")]
        public JsonResult Insertprofiledata([FromBody] dynamic data)
        {
            string Command = "";
            int pc = 0;
            dynamic respo1 = null;
            dynamic jsonObject = new JObject(data);
            string GUID = Guid.NewGuid().ToString();
            dynamic json = jsonObject.ComponentArray;
            dynamic deviceResponse = null;
            if (jsonObject.OperationName == "Save")
            {
                Command = "insert into profilemanagement (Name,ProfileType,UID,Inputfile,Outputfile,Parameters,IsActive) values('" + jsonObject.Name + "','" + jsonObject.ProfileType + "','" + GUID + "','" + jsonObject.Inputfile + "','" + jsonObject.Outputfile + "','" + jsonObject.Parameters + "','" + jsonObject.IsActive + "')";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Insert");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            else if (jsonObject.OperationName == "Update")
            {
                Command = "update profilemanagement set Name='" + jsonObject.Name + "',ProfileType='" + jsonObject.ProfileType + "',Inputfile='" + jsonObject.Inputfile + "',Outputfile='" + jsonObject.Outputfile + "',Parameters='" + jsonObject.Parameters + "',IsActive='" + jsonObject.IsActive + "' where UID='" + jsonObject.UID + "'";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Update");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            else if (jsonObject.OperationName == "Delete")
            {
                Command += "delete from profilemanagement where UID='" + jsonObject.UID + "'";
                ConnectionClass obj = new ConnectionClass();
                respo1 = obj.Connect(Command, "Delete");
                //respo1 = ServiceRequest.MakeRequestLocal("1011", Command, DB.ExecuteQuery).Result;
                deviceResponse = JsonConvert.DeserializeObject(respo1).ResultData;
            }
            if (deviceResponse == "1")
                return Json("Success");
            else return Json("Fail");
        }

        [HttpPost("[action]")]

        public JsonResult Insertflowcomp([FromBody] dynamic data)

        {
            var response = "";
            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                sb.Append("insert into flowtableexample (Name,Inspector,Component,SeqNo,System,Version,Status) values (");
                sb.Append("'" + data1.Name + "'");
                sb.Append(",'" + data1.Inspector + "'");
                sb.Append(",'" + data1.Component + "'");
                sb.Append(",'" + data1.SeqNo + "'");
                sb.Append(",'" + data1.System + "'");
                sb.Append(",'" + data1.Version + "'");
                sb.Append(",'" + data1.Status + "')");
                response = ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.ExecuteQuery).Result;
                sb = new StringBuilder("");

            }

            return Json(response);

        }

        [HttpPost("[action]")]

        public JsonResult InsertComponentdata([FromBody] dynamic data)

        {
            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                sb.Append("insert into componentmaster (Name,BinaryName,path,Type,OSType,IsActive,version,status,Reference) values (");
                sb.Append("'" + data1.Name + "'");
                sb.Append(",'" + data1.BinaryName + "'");
                sb.Append(",'" + data1.Path + "'");
                sb.Append(",'" + data1.Type + "'");
                sb.Append(",'" + data1.OSType + "'");
                sb.Append(",'" + data1.EDStatus + "'");
                sb.Append(",'" + data1.version + "'");
                sb.Append(",'" + data1.Status + "'");
                sb.Append(",'" + data1.Reference + "')");

            }

            {


                string url = "GetDataAsync/";

                // var Response = (ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.GetDataAsync));
                ConnectionClass obj = new ConnectionClass();
                dynamic response = obj.Connect(sb.ToString(), "Insert");
                response = JsonConvert.DeserializeObject(response);
                return Json(response);



            }

        }



        [HttpPost("[action]")]

        public JsonResult Inserttransactiondata([FromBody] dynamic data)

        {
            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                sb.Append("insert into transactionic (Name,BinaryName,path,Type,OSType,IsActive,version,status,Reference) values (");
                sb.Append("'" + data1.Name + "'");
                sb.Append(",'" + data1.BinaryName + "'");
                sb.Append(",'" + data1.Path + "'");
                sb.Append(",'" + data1.Type + "'");
                sb.Append(",'" + data1.OSType + "'");
                sb.Append(",'" + data1.EDStatus + "'");
                sb.Append(",'" + data1.version + "'");
                sb.Append(",'" + data1.Status + "'");
                sb.Append(",'" + data1.Reference + "')");

            }

            {


                string url = "GetDataAsync/";

                var Response = (ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.GetDataAsync));
                return Json(Response);


            }

        }

        [HttpPost("[action]")]
        public JsonResult Insertcomponents([FromBody] dynamic data)
        {


            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {
                sb.Append("insert into components (BinaryName,NameParameter,ArgumentValue,Detail) values (");
                sb.Append("'" + data1.BinaryName + "'");
                sb.Append(",'" + data1.ArgumentValue + "'");
                sb.Append(",'" + data1.NameParameter + "'");
                sb.Append(",'" + data1.Detail + "')");


                var Response = ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.GetDataAsync);
                sb = new StringBuilder("");


            }

            return null;



        }


        [HttpPost("[action]")]
        public JsonResult Updatecomponents([FromBody] dynamic data)
        {


            StringBuilder sb = new StringBuilder("");
            var json = (string)JsonConvert.SerializeObject(data);
            //dynamic x = JsonConvert.DeserializeObject(json);
            dynamic components = JsonConvert.DeserializeObject<List<dynamic>>(json);
            //x.Count()

            foreach (var data1 in components)
            {

                sb.Append("Update components set BinaryName =");
                sb.Append("'" + data1.BinaryName + "'");
                sb.Append(",NameParameter=");
                sb.Append("'" + data1.NameParameter + "'");
                sb.Append(",ArgumentValue=");
                sb.Append("'" + data1.ArgumentValue + "'");
                sb.Append(",Detail=");
                sb.Append("'" + data1.Detail + "' where UID =");
                sb.Append("'" + data1.UID + "'");



                var Response = ServiceRequest.MakeRequestLocal("1011", sb.ToString(), DB.GetDataAsync);
                sb = new StringBuilder("");


            }

            return null;



        }

    }
}

