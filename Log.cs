using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Collections.Concurrent;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Linq;
using Mam_Configuration_Demo;



#region Log Writer
public enum LogType { Error, Info }

public static class Log
{
    //
    // Summary:
    //     URL matching with that of LogWriter's, to which logs will be send for documentation
    public static string WriterURL { get; set; }

    //
    // Summary:
    //     Service name of this application with respective to the one mentioned in LogWriter's config
    public static string ServiceName { get; set; }

    public static void Write(LogType LogType, string LogCode, string Message, [CallerMemberName] string Method = "")
    {
       try
       {
            var logdata = new Tuple<string, string, string, string, string>( LogType.ToString(), LogCode, Message, Method,DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            Program.LogQueue.Enqueue(logdata);
       }
       catch (System.Exception)
       {
           
          
       }
    }
    public static async void Writer()
    {
        while (true)
        {
            try
            {
                await Task.Delay(5);
                Tuple<string, string, string, string,string> log = null;
                Program.LogQueue.TryDequeue(out log);
                if (log == null) continue;
                string logType=log.Item1;
                string LogCode=log.Item2;
                string Message=log.Item3;
                string Method=log.Item4;
                string time=log.Item5;
                
                string strLogHeader = $" ************ Log file created on {DateTime.Now.ToString("dd.MMM.yyyy HH:mm:ss.fff")} ************ \n\n";
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "Logs"));
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "Logs", "accesslog"));
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "Logs", "errorlog"));

                string LogTypePath = "";
                if (logType == nameof(LogType.Info))
                {
                    LogTypePath = Path.Combine(Directory.GetCurrentDirectory(), "Logs", "accesslog", "events.log");
                }
                else
                {
                    LogTypePath = Path.Combine(Directory.GetCurrentDirectory(), "Logs", "errorlog", "errors.log");
                }
                if (!File.Exists(LogTypePath)) File.WriteAllText(LogTypePath, strLogHeader);
                if (((new FileInfo(LogTypePath)).Length / 1024) >= 2000)    // 2000KB [2MB]
                {
                    string destpath = Path.Combine(Path.GetDirectoryName(LogTypePath),
                                                   Path.GetFileNameWithoutExtension(LogTypePath) + "_" + DateTime.Now.ToString("yyyy.MM.dd_HH.mm.ss.fff") + ".log");
                    File.Move(LogTypePath, destpath);
                    File.WriteAllText(LogTypePath, strLogHeader);
                }
                string msg = $"{time} ||| {LogCode} ||| {Method} ||| {Message.Trim().Replace("\n", "/n")}";
                //strTemp = dirPath + "\n" + msg;
                using (FileStream stream = new FileStream(LogTypePath, FileMode.Append, FileAccess.Write, FileShare.None, 4096, true))
                using (StreamWriter sw = new StreamWriter(stream))
                {
                    await sw.WriteLineAsync(msg);
                    sw.Close();
                }

                Directory.GetFiles(Path.GetDirectoryName(LogTypePath), ".log")
                                                   .Select(x => new FileInfo(x))
                                                   .Where(x => x.CreationTime < DateTime.Now.AddDays(-20))
                                                   .ToList()
                                                   .ForEach(x => x.Delete());
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.ToString());
            }
        }
    }

    public static string ExtractError(this Exception ex)
    {
        string str = "\nError: " + ex.Message.ToString() +
                     "\nStackTrace: " + ex.StackTrace + Environment.NewLine;
        return str;
    }

    public static string GenerateLogCode()
    {
        return (new Random().Next(10000000, 99999999).ToString());
    }
}
#endregion