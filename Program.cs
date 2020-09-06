using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace Mam_Configuration_Demo
{
    public static class Program
    {
        public static string MyUrl = string.Empty;
        public static string DBServiceUrl = string.Empty;

        public static string DbName = string.Empty;


        public static string UploadRecords = string.Empty;

        public static string RealtimeInterval = string.Empty;
        public static string ServiceUrl { get; set; }

        public static string DbHostIP { get; set; }

        public static string DbUser { get; set; }


        public static string DbPort { get; set; }

        public static string DbPassword { get; set; }
        public static string CoreIP { get; set; }

        public static string CorePort { get; set; }

        public static string ConnectionString { get; set; }

        public static string staticconnectionstring { get; set; }
        public static string publicquery { get; set; }

        public static string ServerUrl = string.Empty;

        public static string basepath;

        public static string logcode { get; set; } = "";
        static ILogger _logger { get; set; }


        public static ConcurrentQueue<Tuple<string, string, string, string, string>> LogQueue { get; set; } = new ConcurrentQueue<Tuple<string, string, string, string, string>>();
        public static void Main(string[] args)
        {

            Task.Run(() => Log.Writer());
            logcode = Log.GenerateLogCode();
            ILoggerFactory loggerFactory = new LoggerFactory().AddConsole((_, __) => true);
            _logger = loggerFactory.CreateLogger("Program");
            CheckArguments(args);

            bool isWindows = System.Runtime.InteropServices.RuntimeInformation.OSDescription.Contains("Windows");
            // var p = Directory.GetCurrentDirectory();
            if (isWindows)
            {
                basepath = Directory.GetCurrentDirectory();
            }
            else
            {
                basepath = "/usr/local/etc/mam.c/";
            }
            var config = new ConfigurationBuilder()
                            .SetBasePath(basepath)
                           .AddJsonFile("mam.gui.conf", optional: true, reloadOnChange: true)
                           .AddEnvironmentVariables().Build();
            MyUrl = $"http://{config["Data:GUIIP"]}:{config["Data:GUIPort"]}";
            DBServiceUrl = $"http://{config["Data:CoreIP"]}:{config["Data:CorePort"]}";
            DbName = $"{config["Data:DbName"]}";
            DbPort = $"{config["Data:DbPort"]}";
            DbHostIP = $"{config["Data:DbHostIP"]}";
            DbUser = $"{config["Data:DbUser"]}";
            DbPassword = $"{config["Data:DbPassword"]}";



            // ConnectionString = $"{config["Data:ConnectionString"]}";
            ConnectionString = $"server="+DbHostIP+";user id="+DbUser+";password="+DbPassword+";persistsecurityinfo=True;port="+DbPort+";database="+DbName+";SslMode=none;";

            staticconnectionstring = ConnectionString;
            var host = new WebHostBuilder()
                      .UseKestrel()
                      .UseUrls(MyUrl)
                       .UseContentRoot(Directory.GetCurrentDirectory())
                       .UseIISIntegration()
                       .UseStartup<Startup>()
                       .UseConfiguration(config)
                       .Build();
            host.Run();
        }

        public static string PaddedZeroFormat(this Version ver)
        {
            return string.Format("{0:00}.{1:00}.{2:00}.{3:00}", ver.Major, ver.Minor, ver.Build, ver.Revision);
        }
        public static void CheckArguments(string[] args)
        {
            if (args.Length > 0)
            {

                if (args[0] == "--version" || args[0] == "-v")
                {
                    DateTime buildTime = File.GetLastWriteTime(System.Reflection.Assembly.GetExecutingAssembly().Location);
                    Console.WriteLine($"Version: {System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.PaddedZeroFormat()}");
                    Log.Write(LogType.Info, Program.logcode, $"Version: {System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.PaddedZeroFormat()}");
                    Console.WriteLine($"Build Date: {buildTime.ToString("dd-MM-yyyy HH:mm:ss")}");
                    Log.Write(LogType.Info, Program.logcode, $"Build Date: {buildTime.ToString("dd-MM-yyyy HH:mm:ss")}");
                    Console.WriteLine("Copyright@Planetcast Media Services Limited (https://www.planetc.net)");

                    Environment.Exit(Environment.ExitCode);
                }
                if (args[0] == "-h" || args[0] == "--help")
                {
                  Log.Write(LogType.Info, logcode, $"Starting Application with -h ");
                    Console.WriteLine($"usage: {System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}"+"  [-h] [-v]");
                    Console.WriteLine(Environment.NewLine+$"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name} Application");
                    Console.WriteLine(Environment.NewLine+"Optional Parameters");
                    Console.WriteLine($"-h  --help                         argument to display command line help.");
                    Console.WriteLine($"-v  --version                      argument to display version,buildate,copyright information and then exit the application");
                    Log.Write(LogType.Info, logcode, $"-h  --help                         argument to display command line help.");
                    Log.Write(LogType.Info, logcode, $"-v  --version                      argument to display version,buildate,copyright information and then exit the application");
                    Environment.Exit(0);
                }
            }

        }

    }
    public class ConnectionClass
    {
        private static ILoggerFactory loggerFactory = new LoggerFactory().AddConsole((_, __) => true);
        private static ILogger _logger = loggerFactory.CreateLogger("ConnectionClass");
        DataTable ds = new DataTable();
        public string Connect(string sql, string CmdType)
        {
            int flag = 0;
            try
            {
                Log.Write(LogType.Info, Program.logcode, sql);
                _logger.LogInformation(sql);
                using (MySqlConnection nwindConn = new MySqlConnection(Program.ConnectionString))
                {
                    if (nwindConn.State == ConnectionState.Closed)
                        nwindConn.Open();
                    using (MySqlCommand sqlCmd = new MySqlCommand(sql, nwindConn))
                    {
                        using (MySqlDataAdapter adapter = new MySqlDataAdapter(sql, nwindConn))
                        {
                            adapter.Fill(ds);
                            adapter.Dispose();
                            sqlCmd.Dispose();
                            flag = 1;
                            if (nwindConn.State == ConnectionState.Open)
                                nwindConn.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                flag = -1;
                Log.Write(LogType.Error, Program.logcode, ex.ToString());
                _logger.LogCritical(ex.ToString());
            }
            finally { }
            return (flag == -1) ? "{ResultData:2}" : DataTableToJSONWithJSONNet(ds, CmdType);
        }
        public string DataTableToJSONWithJSONNet(DataTable table, string Cmd)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table);
            StringBuilder sb = new StringBuilder();
            sb.Append("{ResultData:");
            if (Cmd == "Select")
                sb.Append(JSONString);
            else sb.Append("1");
            sb.Append("}");
            return sb.ToString();
        }
    }
}
