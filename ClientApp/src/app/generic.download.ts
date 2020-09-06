//import 'jspdf-autotable';
//import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import $ from 'jquery';
import { escape } from 'querystring';
declare let jsPDF;
declare let shield;
export class genericDownloads {
    demoFromHTML(fileName, type) {
        html2canvas(document.querySelector(type)).then(canvas => {
            var pdf = new jsPDF('p', 'pt', 'a4');
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 20, 20, 530, 400);
            pdf.save(fileName + '.pdf');
        });
    }


    download_csv(csv, filename) {
        var csvFile;
        var downloadLink;
        // CSV FILE
        csvFile = new Blob([csv], { type: "text/csv" });
        // Download link
        downloadLink = document.createElement("a");
        // File name
        downloadLink.download = filename + ".csv";
        // We have to create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
        // Make sure that the link is not displayed
        downloadLink.style.display = "none";
        // Add the link to your DOM
        document.body.appendChild(downloadLink);
        // Lanzamos
        downloadLink.click();
    }
    export_table_to_csv(filename) {
        var csv = [];
        csv.push(filename + "\r\n");
        var rows = document.querySelectorAll("#printtable tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerHTML);
            csv.push(row.join(","));
        }
        // Download CSV
        this.download_csv(csv.join("\n"), filename);
    }

    export_table_to_csvwithid(filename, id) {
        var csv = [];
        csv.push(filename + "\r\n");
        var rows = document.querySelectorAll("#" + id + " tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerHTML);
            csv.push(row.join(","));
        }
        // Download CSV
        this.download_csv(csv.join("\n"), filename);
    }
    // dd() {
    //     var doc = new jsPDF();
    //     // Empty square
    //     doc.rect(20, 20, 10, 10);

    //     // Filled square
    //     //doc.rect(40, 20, 10, 10, 'F');
    //     doc.rect(34, 20, 111, 8);
    //     var splitdesc = doc.splitTextToSize("Test", 100);
    //     doc.text(splitdesc, 35, 25);


    //     // Empty red square
    //     doc.setDrawColor(255, 0, 0);
    //     doc.rect(60, 20, 10, 10);

    //     // Filled square with red borders
    //     doc.setDrawColor(255, 0, 0);
    //     doc.rect(80, 20, 10, 10, 'FD');

    //     // Filled red square
    //     doc.setDrawColor(0);
    //     doc.setFillColor(255, 0, 0);
    //     doc.rect(100, 20, 10, 10, 'F');

    //     // Filled red square with black borders
    //     doc.setDrawColor(0);
    //     doc.setFillColor(255, 0, 0);
    //     doc.rect(120, 20, 10, 10, 'FD');
    //     doc.save("Test1.pdf");
    // }
    tableToJson(table) {
        var data = [];
        // first row needs to be headers
        var headers = [];
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
        }
        // go through cells
        for (var i = 1; i < table.rows.length; i++) {
            var tableRow = table.rows[i];
            var rowData = {};
            for (var j = 0; j < tableRow.cells.length; j++) {
                rowData[headers[j]] = tableRow.cells[j].innerHTML;
            }
            data.push(rowData);
        }
        return data;
    }
    getReportPlaylistSubtitle(tblid: any, title: any, colArrayStyle: any) {
        var flag = 0;
        var len = 17;
        var doc = new jsPDF('p', 'pt', 'a3');
        var res = doc.autoTableHtmlToJson(document.getElementById(tblid));
        var date = this.js_yyyy_mm_dd_hh_mm_ss();
        var header = function (data) {
            doc.setFontSize(10);
            doc.setFontStyle("normal");
            doc.setFont("helvetica");
            doc.text("Report of " + title + "\t\t\t\t\t\t\t\t\t\t\tDate : " + date + "\t\t\t\t\t\t\t\t\t\t\t Total Records : " + res.data.length, 10, 15);
            doc.line(10, 20, 825, 20);
        };
        var pageContent = function (data) {
            // HEADER
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');

            // FOOTER
            var str = "Page No " + data.pageCount;
            doc.setFontSize(10);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 7);
        };
        // var options =
        // {
        //     afterPageContent: pageContent,
        //     beforePageContent: header,
        //     tableLineColor: [189, 195, 199],
        //     tableLineWidth: 0.75,
        //     theme: "grid",
        //     styles: { overflow: 'linebreak', fontSize: 9 },
        //     columnStyles: colArrayStyle,
        //     margin: { top: 25, left: 5, right: 5, bottom: 5 },
        //     bodyStyles: { valign: 'top' }
        // };
        len = res.columns.length;
        if (len == 10)
            for (var i = 0; i < res.data.length; i++) {
                var r = res.data[i];
                console.log(r);
                if (this.ReplaceUndefined(r[9]) == "")
                    flag = 1;
                else flag = 0;
            }
        if (flag == 1) {
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].pop();
            }
            res.columns.pop();
            len = 9;
        }
        if (len == 18) {
            colArrayStyle = {
                0: { columnWidth: 35 },
                1: { columnWidth: 90 },
                2: { columnWidth: 35 },
                3: { columnWidth: 80 },
                4: { columnWidth: 30 },
                5: { columnWidth: 80 },
                6: { columnWidth: 69 },
                7: { columnWidth: 69 },
                8: { columnWidth: 36 },
                9: { columnWidth: 34 },
                10: { columnWidth: 34 },
                11: { columnWidth: 34 },
                12: { columnWidth: 34 },
                13: { columnWidth: 34 },
                14: { columnWidth: 34 },
                15: { columnWidth: 34 },
                16: { columnWidth: 34 },
                17: { columnWidth: 34 }
            }
        }
        if (len == 17) {
            colArrayStyle = {
                0: { columnWidth: 35 },
                1: { columnWidth: 90 },
                2: { columnWidth: 35 },
                3: { columnWidth: 80 },
                4: { columnWidth: 30 },
                5: { columnWidth: 80 },
                6: { columnWidth: 69 },
                7: { columnWidth: 69 },
                8: { columnWidth: 38 },
                9: { columnWidth: 38 },
                10: { columnWidth: 38 },
                11: { columnWidth: 38 },
                12: { columnWidth: 38 },
                13: { columnWidth: 38 },
                14: { columnWidth: 38 },
                15: { columnWidth: 38 },
                16: { columnWidth: 38 }
            }
        }
        else if (len == 16) {
            colArrayStyle = {
                0: { columnWidth: 35 },
                1: { columnWidth: 90 },
                2: { columnWidth: 39 },
                3: { columnWidth: 80 },
                4: { columnWidth: 30 },
                5: { columnWidth: 80 },
                6: { columnWidth: 70 },
                7: { columnWidth: 70 },
                8: { columnWidth: 38 },
                9: { columnWidth: 54 },
                10: { columnWidth: 54 },
                11: { columnWidth: 54 },
                12: { columnWidth: 54 },
                13: { columnWidth: 54 },
                14: { columnWidth: 54 },
                15: { columnWidth: 54 }
            }
        }
        else if (len == 15) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 90 },
                2: { columnWidth: 40 },
                3: { columnWidth: 80 },
                4: { columnWidth: 34 },
                5: { columnWidth: 80 },
                6: { columnWidth: 70 },
                7: { columnWidth: 70 },
                8: { columnWidth: 50 },
                9: { columnWidth: 46 },
                10: { columnWidth: 46 },
                11: { columnWidth: 46 },
                12: { columnWidth: 46 },
                13: { columnWidth: 46 },
                14: { columnWidth: 46 }
            }
        }
        else if (len == 14) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 90 },
                2: { columnWidth: 40 },
                3: { columnWidth: 80 },
                4: { columnWidth: 34 },
                5: { columnWidth: 80 },
                6: { columnWidth: 70 },
                7: { columnWidth: 70 },
                8: { columnWidth: 50 },
                9: { columnWidth: 55.2 },
                10: { columnWidth: 55.2 },
                11: { columnWidth: 55.2 },
                12: { columnWidth: 55.2 },
                13: { columnWidth: 55.2 }
            }
        }
        else if (len == 13) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 90 },
                2: { columnWidth: 40 },
                3: { columnWidth: 80 },
                4: { columnWidth: 34 },
                5: { columnWidth: 80 },
                6: { columnWidth: 70 },
                7: { columnWidth: 70 },
                8: { columnWidth: 50 },
                9: { columnWidth: 69 },
                10: { columnWidth: 69 },
                11: { columnWidth: 69 },
                12: { columnWidth: 69 }
            }
        }
        else if (len == 12) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 100 },
                2: { columnWidth: 40 },
                3: { columnWidth: 80 },
                4: { columnWidth: 40 },
                5: { columnWidth: 80 },
                6: { columnWidth: 90 },
                7: { columnWidth: 70 },
                8: { columnWidth: 70 },
                9: { columnWidth: 73 },
                10: { columnWidth: 73 },
                11: { columnWidth: 73 }
            }
        }
        else if (len == 11) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 100 },
                2: { columnWidth: 100 },
                3: { columnWidth: 100 },
                4: { columnWidth: 100 },
                5: { columnWidth: 100 },
                6: { columnWidth: 100 },
                7: { columnWidth: 40 },
                8: { columnWidth: 70 },
                9: { columnWidth: 40 },
                10: { columnWidth: 40 }
            }
        }
        else if (len == 10) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 100 },
                2: { columnWidth: 100 },
                3: { columnWidth: 100 },
                4: { columnWidth: 100 },
                5: { columnWidth: 100 },
                6: { columnWidth: 100 },
                7: { columnWidth: 100 },
                8: { columnWidth: 50 },
                9: { columnWidth: 40 }
            }
        }
        else if (len == 9) {
            colArrayStyle = {
                0: { columnWidth: 40 },
                1: { columnWidth: 100 },
                2: { columnWidth: 100 },
                3: { columnWidth: 100 },
                4: { columnWidth: 100 },
                5: { columnWidth: 100 },
                6: { columnWidth: 100 },
                7: { columnWidth: 100 },
                8: { columnWidth: 90 }
            }
        }
        doc.autoTable(res.columns, res.data, {
            afterPageContent: pageContent,
            beforePageContent: header,
            tableLineColor: [189, 195, 199],
            tableLineWidth: 0.75,
            theme: "grid",
            columnStyles: colArrayStyle,
            styles: { overflow: 'linebreak' },
            margin: { top: 25, left: 5, right: 5, bottom: 5 },
            bodyStyles: { valign: 'top' },
            createdCell: function (cell, data) {
                if (data.column.dataKey >= 9) {
                    //doc.setFillColor(239, 154, 154);
                    //doc.roundedRect(cell.textPos.x + 3, cell.textPos.y + 3, cell.width, cell.height, 5, 5, 'FD');
                    //cell.styles.fillColor = "#ffffff";
                    var tdElement = cell.text.trim();
                    if (data.column.dataKey == 9)
                        cell.text = "SIM";
                    else if (data.column.dataKey == 10)
                        cell.text = "TRD";
                    else if (data.column.dataKey == 11)
                        cell.text = "MYS";
                    else if (data.column.dataKey == 12)
                        cell.text = "IDN";
                    else if (data.column.dataKey == 13)
                        cell.text = "VNM";
                    else if (data.column.dataKey == 14)
                        cell.text = "KOR";
                    else if (data.column.dataKey == 15)
                        cell.text = "MYM";
                    else if (data.column.dataKey == 16)
                        cell.text = "THA";
                    else if (data.column.dataKey == 17)
                        cell.text = "ENG";
                    if (tdElement == "green") {
                        cell.styles.fillColor = [144, 238, 144];
                        cell.styles.textColor = [255, 72, 72];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "orange") {
                        cell.styles.fillColor = [255, 165, 0];
                        cell.styles.textColor = [255, 72, 72];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "red") {
                        cell.styles.fillColor = [255, 0, 0];
                        cell.styles.textColor = [255, 255, 255];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "gray") {
                        cell.styles.fillColor = [211, 211, 211];
                        cell.styles.textColor = [0, 0, 0];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "Not Applicable") {
                        cell.text = "N/A";
                        //Green
                        //cell.styles.fillColor = [0, 128, 0];
                        ////////////////////
                        //cell.styles.fillColor = "gray";
                        //cell.styles.textColor = [58, 121, 152];
                        //cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "") {
                        cell.text = "-";
                    }
                }
            }
        });
        var de = this.js_yyyy_mm_dd_hh_mm_ss1();
        de = title + "_" + de;
        doc.save(de + ".pdf");
    }
    // getCellText(subtitlearray) {
    //     var label = ""
    //     for (let index = 0; index < subtitlearray.length; index++) {
    //         if (subtitlearray[index].hide == false) {
    //             label = subtitlearray[index].label;
    //             break;
    //         }
    //     }
    //     return label;
    // }
    getReportSubtitle(tblid: any, title: any, colArrayStyle: any, subtitlearray: any) {
        var doc = new jsPDF('p', 'pt', 'a3');
        var res = doc.autoTableHtmlToJson(document.getElementById(tblid));
        var date = this.js_yyyy_mm_dd_hh_mm_ss();
        var header = function (data) {
            doc.setFontSize(10);
            doc.setFontStyle("normal");
            doc.setFont("helvetica");
            doc.text("Report of " + title + "\t\t\t\t\t\t\t\t\t\t\tDate : " + date + "\t\t\t\t\t\t\t\t\t\t\t Total Records : " + res.data.length, 10, 15);
            doc.line(10, 20, 825, 20);
        };
        var pageContent = function (data) {
            // HEADER
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            // if (base64Img) {
            //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
            // }
            //doc.text("Report", data.settings.margin.left + 15, 22);

            // FOOTER
            var str = "Page No " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            // if (typeof doc.putTotalPages === 'function') {
            //     str = str + " of " + pageCount;
            // }
            doc.setFontSize(10);
            //doc.line(10, doc.internal.pageSize.height - 20, 825, doc.internal.pageSize.height - 20);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 7);
        };
        var genericcols = Object.assign({}, res.columns);
        console.log(genericcols);
        for (let index = 0; index < subtitlearray.length; index++) {
            if (subtitlearray[index].hide == true) {
                var rt = res.columns.indexOf(subtitlearray[index].label);
                if (rt > -1) {
                    res.columns.splice(rt, 1);
                }
                for (var i = 0; i < res.data.length; i++) {
                    res.data.splice(rt, 1);
                }
            }
        }
        genericcols = Object.assign({}, res.columns);
        console.log(genericcols);
        for (let index = 0; index < res.columns.length; index++) {
            if (index == 6)
                res.columns[index] = "Status";
            else if (index >= 7)
                res.columns[index] = "";
        }
        var len = res.columns.length;
        console.log(genericcols);

        if (len == 15) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 80 },
                2: { columnWidth: 80 },
                3: { columnWidth: 80 },
                4: { columnWidth: 80 },
                5: { columnWidth: 100 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 },
                9: { columnWidth: 40 },
                10: { columnWidth: 40 },
                11: { columnWidth: 40 },
                12: { columnWidth: 40 },
                13: { columnWidth: 40 },
                14: { columnWidth: 40 }
            }
        }
        else if (len == 14) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 85 },
                2: { columnWidth: 85 },
                3: { columnWidth: 85 },
                4: { columnWidth: 85 },
                5: { columnWidth: 120 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 },
                9: { columnWidth: 40 },
                10: { columnWidth: 40 },
                11: { columnWidth: 40 },
                12: { columnWidth: 40 },
                13: { columnWidth: 40 }
            }
        }
        else if (len == 13) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 120 },
                2: { columnWidth: 90 },
                3: { columnWidth: 85 },
                4: { columnWidth: 85 },
                5: { columnWidth: 120 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 },
                9: { columnWidth: 40 },
                10: { columnWidth: 40 },
                11: { columnWidth: 40 },
                12: { columnWidth: 40 }
            }
        }
        else if (len == 12) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 140 },
                2: { columnWidth: 90 },
                3: { columnWidth: 100 },
                4: { columnWidth: 80 },
                5: { columnWidth: 120 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 },
                9: { columnWidth: 40 },
                10: { columnWidth: 40 },
                11: { columnWidth: 40 }
            }
        }
        else if (len == 11) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 150 },
                2: { columnWidth: 100 },
                3: { columnWidth: 100 },
                4: { columnWidth: 100 },
                5: { columnWidth: 120 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 },
                9: { columnWidth: 40 },
                10: { columnWidth: 40 }
            }
        }
        else if (len == 10) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 150 },
                2: { columnWidth: 120 },
                3: { columnWidth: 100 },
                4: { columnWidth: 100 },
                5: { columnWidth: 140 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 },
                9: { columnWidth: 40 }
            }
        }
        else if (len == 9) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 190 },
                2: { columnWidth: 120 },
                3: { columnWidth: 100 },
                4: { columnWidth: 100 },
                5: { columnWidth: 140 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 },
                8: { columnWidth: 40 }
            }
        }
        else if (len == 8) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 190 },
                2: { columnWidth: 120 },
                3: { columnWidth: 100 },
                4: { columnWidth: 140 },
                5: { columnWidth: 140 },
                6: { columnWidth: 40 },
                7: { columnWidth: 40 }
            }
        }
        else if (len == 7) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 190 },
                2: { columnWidth: 120 },
                3: { columnWidth: 140 },
                4: { columnWidth: 140 },
                5: { columnWidth: 140 },
                6: { columnWidth: 40 }
            }
        }
        else if (len == 6) {
            colArrayStyle = {
                0: { columnWidth: 50 },
                1: { columnWidth: 210 },
                2: { columnWidth: 140 },
                3: { columnWidth: 140 },
                4: { columnWidth: 140 },
                5: { columnWidth: 140 }
            }
        }
        var options =
        {
            afterPageContent: pageContent,
            beforePageContent: header,
            tableLineColor: [189, 195, 199],
            tableLineWidth: 0.75,
            theme: "grid",
            styles: { overflow: 'linebreak', fontSize: 9 },
            columnStyles: colArrayStyle,
            margin: { top: 25, left: 5, right: 5, bottom: 5 },
            //startY: 35
            //startY: doc.autoTableEndPosY() + 60
            bodyStyles: { valign: 'top' }
        };
        doc.autoTable(res.columns, res.data, {
            afterPageContent: pageContent,
            beforePageContent: header,
            tableLineColor: [189, 195, 199],
            tableLineWidth: 0.75,
            theme: "grid",
            columnStyles: colArrayStyle,
            styles: { overflow: 'linebreak' },
            margin: { top: 25, left: 5, right: 5, bottom: 5 },
            bodyStyles: { valign: 'top' },
            createdCell: function (cell, data) {
                if (data.column.dataKey >= 6) {
                    //doc.setFillColor(239, 154, 154);
                    //doc.roundedRect(cell.textPos.x + 3, cell.textPos.y + 3, cell.width, cell.height, 5, 5, 'FD');
                    //cell.styles.fillColor = "#ffffff";
                    var tdElement = cell.text.trim();
                    if (data.column.dataKey == 6)
                        cell.text = genericcols[6];
                    else if (data.column.dataKey == 7)
                        cell.text = genericcols[7];
                    else if (data.column.dataKey == 8)
                        cell.text = genericcols[8];
                    else if (data.column.dataKey == 9)
                        cell.text = genericcols[9];
                    else if (data.column.dataKey == 10)
                        cell.text = genericcols[10];
                    else if (data.column.dataKey == 11)
                        cell.text = genericcols[11];
                    else if (data.column.dataKey == 12)
                        cell.text = genericcols[12];
                    else if (data.column.dataKey == 13)
                        cell.text = genericcols[13];
                    else if (data.column.dataKey == 14)
                        cell.text = genericcols[14];
                    //cell.styles.margin = 3;
                    if (tdElement == "green") {
                        cell.styles.fillColor = [144, 238, 144];
                        cell.styles.textColor = [255, 72, 72];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "orange") {
                        cell.styles.fillColor = [255, 165, 0];
                        cell.styles.textColor = [255, 72, 72];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "red") {
                        cell.styles.fillColor = [255, 0, 0];
                        cell.styles.textColor = [255, 255, 255];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "gray") {
                        cell.styles.fillColor = [211, 211, 211];
                        cell.styles.textColor = [0, 0, 0];
                        cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "Not Applicable") {
                        cell.text = "N/A";
                        //Green
                        //cell.styles.fillColor = [0, 128, 0];
                        ////////////////////
                        //cell.styles.fillColor = "gray";
                        //cell.styles.textColor = [58, 121, 152];
                        //cell.styles.fontStyle = 'bold';
                    }
                    else if (tdElement == "") {
                        cell.text = "-";
                    }
                }
            }
        });
        var de = this.js_yyyy_mm_dd_hh_mm_ss1();
        de = title + "_" + de;
        doc.save(de + ".pdf");
    }
    getReport(tblid: any, title: any, colArrayStyle: any) {
        var doc = new jsPDF('p', 'pt', 'a3');
        var res = doc.autoTableHtmlToJson(document.getElementById(tblid));
        var date = this.js_yyyy_mm_dd_hh_mm_ss();
        var header = function (data) {
            doc.setFontSize(10);
            doc.setFontStyle("normal");
            doc.setFont("helvetica");
            doc.text("Report of " + title + "\t\t\t\t\t\t\t\t\t\t\tDate : " + date + "\t\t\t\t\t\t\t\t\t\t\t Total Records : " + res.data.length, 10, 15);
            doc.line(10, 20, 825, 20);
        };
        var pageContent = function (data) {
            // HEADER
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            // if (base64Img) {
            //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
            // }
            //doc.text("Report", data.settings.margin.left + 15, 22);

            // FOOTER
            var str = "Page No " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            // if (typeof doc.putTotalPages === 'function') {
            //     str = str + " of " + pageCount;
            // }
            doc.setFontSize(10);
            //doc.line(10, doc.internal.pageSize.height - 20, 825, doc.internal.pageSize.height - 20);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 7);
        };
        var options =
        {
            afterPageContent: pageContent,
            beforePageContent: header,
            tableLineColor: [189, 195, 199],
            tableLineWidth: 0.75,
            theme: "grid",
            styles: { overflow: 'linebreak', fontSize: 9 },
            columnStyles: colArrayStyle,
            margin: { top: 25, left: 5, right: 5, bottom: 5 },
            //startY: 35
            //startY: doc.autoTableEndPosY() + 60
            bodyStyles: { valign: 'top' }
        };
        //doc.autoTable(col, rowD, options);

        doc.autoTable(res.columns, res.data, options);
        var de = this.js_yyyy_mm_dd_hh_mm_ss1();
        de = title + "_" + de;
        doc.save(de + ".pdf");
    }
    DownloadData(data, title, showLabel, type = "csv") {
        var arrData = typeof data != "object" ? JSON.parse(data) : data;
        var ReportTitle = title;
        var ShowLabel = showLabel;
        const ignoreIndices = ["$$hashkey", "orderid", "ordermapid", 'uid', 'operationid', 'pickstatus', 'completestatus', 'priority', "processuid", 'sourcedeviceid', 'destinationdeviceid', 'logfilename', 'overwrite',
            'groupid', 'isactive', 'isdeleted', 'ftpdetails', 'createdby', 'updatedby', 'socialmediatext', 'profileuid', 'channelid', 'appid', 'channeluid'];
        const datetimeIndices = ["datecreated", "starttime", "endtime", 'lastupdated', 'ingestdate', 'onairdatetime', 'playlistdate'];
        const newline = "\r\n";
        var CSV = "";
        CSV += ReportTitle + newline;
        if (ShowLabel) {
            var row = "#,";
            for (var index in arrData[0]) {
                if (ignoreIndices.findIndex(d => d == index.toLocaleLowerCase()) == -1) {
                        row += index + ",";
                }
            }
            row = row.slice(0, -1);
            CSV += row + newline;
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = (i + 1) + ",";
            for (var index in arrData[i]) {
                if (index == "SUB") {
                    var f = this.ReplaceUndefined(arrData[i][index]);
                    if (f != "") {
                        if (f.substring(0, 1) == '0' && this.ReplaceUndefined(f.split(',')[1]) != '') {
                            row += '"' + 'Missing ( ' + (f.split(',')[1]).replace(/\|/g, ' , ') + ' ) ' + '",';
                        }
                        else if (f.substring(0, 1) == '1')
                            row += '"Available",';
                        else row += '"",';
                    }
                    else row += '"",';
                }
                else if (index == "QC") {
                    var f = this.ReplaceUndefined(arrData[i][index]);
                    if (f != "") {
                        if (f == '0')
                            row += '"Pending",';
                        else if (f == '1')
                            row += '"Ok",';
                        else if (f == '2')
                            row += '"Failed",';
                        else if (f == '3')
                            row += '"Warning",';
                        else row += '"",';
                    }
                    else row += '"",';
                }
                else if (index == "Preview") {
                    var f = this.ReplaceUndefined(arrData[i][index]);
                    if (f != "" && f != "[object Object]") {
                        if (f == 'P')
                            row += '"Pending",';
                        else if (f == 'O')
                            row += '"OK",';
                        else if (f == 'F')
                            row += '"Failed",';
                        else if (f == 'I')
                            row += '"Informational",';
                        else if (f == 'W')
                            row += '"Warning",';
                        else row += f + ',';
                    }
                    else row += '"",';
                }
                else {
                    if (arrData[i][index] == "[object Object]") {
                        row += '"' + "" + '",';
                    }
                    else if (ignoreIndices.findIndex(d => d == index.toLocaleLowerCase()) == -1) {
                        if (datetimeIndices.findIndex(d => d == index.toLocaleLowerCase()) == -1) {
                            row += '"' + this.ReplaceUndefined(arrData[i][index]) + '",';
                        }
                        else {
                            row += '"' + arrData[i][index].toString().replace('T', ' ') + '",';
                        }
                    }
                }
            }
            row.slice(0, row.length - 1);
            CSV += row + newline;
        }
        if (CSV == "") {
            alert("No data to download.");
            return;
        }
        if (type == "pdf") {
            var blob = new Blob([CSV], { type: 'application/pdf' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = ReportTitle + ".pdf";
        }
        else {
            var blob = new Blob([CSV], { type: 'text/csv;charset=utf-8;' });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.setAttribute("href", url);
            link.download = ReportTitle + ".csv";
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, type) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
        var CSV = "";
        var CSV1 = "";
        //Set Report title in first row or line
        CSV += ReportTitle + "\r\n\n";
        CSV1 = CSV;
        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "#,";
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                //if (index != "$$hashKey" && index.toLowerCase() != "uid" && index.toLowerCase() != "range" && index.toLowerCase() != "slot" && index.toLowerCase() != "duration" && index.toLowerCase() != "mdluid" && index != "Ext" && index != "IsPlayer") {
                if (index == "Status" || index == "Remarks" || index == "User")
                    row += index + ",";
                else if (index == "ClipId")
                    row += "Clip Id,";
                else if (index == "AssignTo")
                    row += "Assign To,";
                else if (index == "House_Id")
                    row += "Media Id,";
                else if (index == "EpisodeNo")
                    row += "Episode,";
                else if (index == "SeriesTitle")
                    row += "Series Title,";
                else if (index == "EpisodeTitle")
                    row += "Episode Title,";
                else if (index == "NOS")
                    row += "Total Segments,";
                else if (index == "CreatedDate")
                    row += "Job Created Time,";
                else if (index == "UpdatedDate")
                    row += "Job Finish Time,";
            }
            row = row.slice(0, -1);
            CSV1 += row + "\r\n";
            //append Label row with line break
            CSV += row + "\r\n";
        }
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = (i + 1) + ".,";
            var row1 = (i + 1) + ".,";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                if (index != "$$hashKey" && index.toLowerCase() != "uid" && index.toLowerCase() != "range" && index.toLowerCase() != "duration" && index.toLowerCase() != "slot" && index.toLowerCase() != "mdluid" && index != "Ext" && index != "IsPlayer")
                    if (index == "CreatedDate" || index == "UpdatedDate") {
                        row += '"' + this.ReplaceUndefined(arrData[i][index]).replace('T', ' ') + '",';
                        row1 += this.ReplaceUndefined(arrData[i][index]).replace('T', ' ') + ',';
                    }
                    else {
                        row += '"' + this.ReplaceUndefined(arrData[i][index]) + '",';
                        row1 += this.ReplaceUndefined(arrData[i][index]) + ',';
                    }
            }
            row.slice(0, row.length - 1);
            row1.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + "\r\n";
            CSV1 += row1 + "\r\n";

        }
        if (CSV == "") {
            alert("Invalid data");
            return;
        }
        var fileName = ReportTitle.replace(/ /g, "_");
        if (type == "pdf") {
            //this.convert(CSV1);
            // var blob = new Blob([CSV], { type: 'application/pdf' });
            // var link = document.createElement('a');
            // link.href = window.URL.createObjectURL(blob);
            // link.download = ReportTitle + ".pdf";
        }
        else {
            var uri = "data:text/csv;charset=utf-8," + escape(CSV);
            var link = document.createElement("a");
            link.href = uri;
            link.download = fileName + ".csv";
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    js_yyyy_mm_dd_hh_mm_ss1() {
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
    }

    js_yyyy_mm_dd_hh_mm_ss() {
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second;
    }

    ReplaceUndefined(val) {
        if (val == undefined || val == null || val == '[object Object]' || val == '@') return '';
        else return val;
    }


    JSONToCSVConvertor_FMD(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = [];
        const obj = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
        Object.keys(obj).forEach(key => {
            if (obj[key] == '[object Object]')
                arrData.push(`${key} : ""`);
            else arrData.push(`${key} : ${obj[key]}`);
        });
        var CSV = "";
        //Set Report title in first row or line
        CSV += ReportTitle + "\r\n\n";
        //This condition will generate the Label/Header
        if (ShowLabel) {
            //append Label row with line break
            CSV += "#,Property,Value\r\n";
        }
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var s = arrData[i].split(':');
            if (s[0].trim() != "clipsize") {
                var row = "";
                if (s[0].trim() == "rev")
                    row = (i + 1) + ".,Revision No," + s[1].trim();
                if (s[0].trim() == "title")
                    row = (i + 1) + ".,Title," + s[1].trim();
                if (s[0].trim() == "QC")
                    row = (i + 1) + ".,QC," + s[1].trim();
                if (s[0].trim() == "Preview")
                    row = (i + 1) + ".,Preview," + s[1].trim();
                if (s[0].trim() == "ClipId")
                    row = (i + 1) + ".,Clip Id," + s[1].trim();
                if (s[0].trim() == "devicename")
                    row = (i + 1) + ".,Device," + s[1].trim();
                if (s[0].trim() == "SOM")
                    row = (i + 1) + ".,SOM," + s[1].trim();
                if (s[0].trim() == "duration")
                    row = (i + 1) + ".,Duration," + s[1].trim();
                if (s[0].trim() == "region")
                    row = (i + 1) + ".,Region," + s[1].trim();
                if (s[0].trim() == "ext")
                    row = (i + 1) + ".,Extension," + s[1].trim();
                if (s[0].trim() == "isgrowing") {
                    var t = (s[1].trim() == false) ? "Incomplete" : "Complete";
                    row = (i + 1) + ".,Growing Status," + t;
                }
                if (s[0].trim() == "islto")
                    row = (i + 1) + ".,Lto Status," + s[1].trim();
                if (s[0].trim() == "lastupdated")
                    row = (i + 1) + ".,Last Updated," + s[1].trim() + ":" + s[2].trim() + ":" + s[3].trim();
                if (s[0].trim() == "issubtitle")
                    row = (i + 1) + ".,Subtitle," + s[1].trim();
                if (s[0].trim() == "devicetype")
                    row = (i + 1) + ".,Device Type," + s[1].trim();
                if (s[0].trim() == "snp") {
                    var t = (s[1].trim() == "2") ? "Failed" : (s[1].trim() == "1") ? "Ok" : (s[1].trim() == "1") ? "Pending" : "";
                    row = (i + 1) + ".,S&P," + t;
                }
                if (s[0].trim() == "aspectratio")
                    row = (i + 1) + ".,Aspect Ratio," + s[1].trim();
                if (s[0].trim() == "videocodec")
                    row = (i + 1) + ".,Video Codec," + s[1].trim();
                if (s[0].trim() == "encoder")
                    row = (i + 1) + ".,Encoder," + s[1].trim();
                if (s[0].trim() == "longvideocodec")
                    row = (i + 1) + ".,Long Video Codec," + s[1].trim();
                if (s[0].trim() == "resolution")
                    row = (i + 1) + ".,Resolution," + s[1].trim();
                if (s[0].trim() == "videobitrate")
                    row = (i + 1) + ".,Video Bitrate," + s[1].trim();
                if (s[0].trim() == "pixelformat")
                    row = (i + 1) + ".,Pixel Format," + s[1].trim();
                if (s[0].trim() == "audiocodec")
                    row = (i + 1) + ".,Audio Codec," + s[1].trim();
                if (s[0].trim() == "longaudiocodec")
                    row = (i + 1) + ".,Long Audio Codec," + s[1].trim();
                if (s[0].trim() == "audiobitrate")
                    row = (i + 1) + ".,Audio Bitrate," + s[1].trim();
                if (s[0].trim() == "audioprofile")
                    row = (i + 1) + ".,Audio Profile," + s[1].trim();

                row.slice(0, row.length - 1);
                //add a line break after each row
                CSV += row + "\r\n";
            }
        }
        if (CSV == "") {
            alert("Invalid data");
            return;
        }
        //Generate a file name
        var fileName = ReportTitle.replace(/ /g, "_");
        //fileName += ReportTitle.replace(/ /g, "_");
        var uri = "data:text/csv;charset=utf-8," + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    download_as_Txt(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }



    DownloadFormattedData(JSONData, ReportTitle, ShowLabel) {
        var vPlaylistFormatArray = [
            "EventType",
            "OnAirTime",
            "ClipId",
            "Title",
            "Segment",
            "Auto",
            "ReconKey",
            "SOM",
            "Duration",
            "ServerDuration",
            "Status",
            "",
            "",
            "",
            "PlayListDate",
            "",
            "",
            "",
            "",
            "TemplateName",
            ""
        ];
        var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
        var CSV = "";
        if (ShowLabel) {
            var row = "";
            for (var index in vPlaylistFormatArray) {
                row += vPlaylistFormatArray[index] + ",";
            }
            row = row.slice(0, -1);
            CSV += row + "\r\n";
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in vPlaylistFormatArray) {
                if (vPlaylistFormatArray[index] == "Auto") {
                    row += "Auto,";
                } else if (vPlaylistFormatArray[index] == "ServerDuration") {
                    row += "00:00:00:00,";
                } else if (vPlaylistFormatArray[index] == "ServerDuration") {
                    row += "00:00:00:00,";
                } else if (vPlaylistFormatArray[index] == "Title") {
                    var vTitle = this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]);
                    vTitle = vTitle.replace(",", "");
                    vTitle = vTitle.replace('"', "");
                    vTitle = vTitle.replace(/\t/g, "");
                    if (
                        ReportTitle.includes("COLORS_TAM") ||
                        ReportTitle.includes("COLORS_MAL")
                    ) {
                        if (arrData[i][vPlaylistFormatArray[0]] == "SEC") {
                            if (arrData[i][vPlaylistFormatArray[2]].includes("BACKIN")) {
                                row += "BACKIN" + ";" + vTitle + ",";
                            } else {
                                row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[2]]) + ";" + vTitle + ",";
                            }
                        } else {
                            row += vTitle + ",";
                        }
                    } else {
                        row += vTitle + ",";
                    }
                } else if (vPlaylistFormatArray[index] == "PlayListDate") {
                    if (this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]) != "") {
                        var vPlayListDate = new Date(this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]));
                        row +=
                            ("0" + (vPlayListDate.getMonth() + 1)).slice(-2) +
                            "/" +
                            ("0" + vPlayListDate.getDate()).slice(-2) +
                            "/" +
                            vPlayListDate.getFullYear() +
                            ",";
                    }
                    else row += ",";
                } else if (vPlaylistFormatArray[index] == "Status") {
                    row += "N.A,";
                } else if (vPlaylistFormatArray[index] == "TemplateName") {
                    row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]);
                } else {
                    if (arrData[i][vPlaylistFormatArray[index]] == undefined) {
                        if (
                            ReportTitle.includes("COLORS_TAM") ||
                            ReportTitle.includes("COLORS_MAL")
                        ) {
                            if (index == "19" && arrData[i][vPlaylistFormatArray[0]] == "SEC") {
                                if (arrData[i][vPlaylistFormatArray[2]].includes("asasasas")) {
                                    row += "BACKIN" + ",";
                                } else {
                                    row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[2]]) + ",";
                                }
                            } else {
                                row += ",";
                            }
                        } else {
                            row += ",";
                        }
                    } else {
                        if (
                            ReportTitle.includes("COLORS_TAM") ||
                            ReportTitle.includes("COLORS_MAL")
                        ) {
                            if (vPlaylistFormatArray[index] == "EventType") {
                                if (arrData[i][vPlaylistFormatArray[index]] == "SEC") {
                                    row += arrData[i][vPlaylistFormatArray[index]] + ",";
                                    if (index == "18") {
                                        row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[2]]) + ",";
                                    }
                                } else {
                                    row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]) + ",";
                                }
                                if (index == "2") {
                                    if (
                                        arrData[i][vPlaylistFormatArray[index]].includes("BACKIN")
                                    ) {
                                        row += "BACKIN" + ",";
                                    } else if (
                                        arrData[i][vPlaylistFormatArray[index]].includes("DTMF")
                                    ) {
                                        row += "CUETONE" + ",";
                                    } else {
                                        row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]) + ",";
                                    }
                                }
                            }
                            if (arrData[i][vPlaylistFormatArray[0]] == "SEC") {
                                if (index == "18") {
                                    row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[2]]) + ",";
                                }
                                if (index == "2") {
                                    if (
                                        arrData[i][vPlaylistFormatArray[index]].includes("BACKIN")
                                    ) {
                                        row += "BACKIN" + ",";
                                    }
                                    if (arrData[i][vPlaylistFormatArray[index]].includes("DTMF")) {
                                        row += "CUETONE" + ",";
                                    }
                                } else if (index != "0") {
                                    row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]) + ",";
                                }
                            } else if (index != "0") {
                                row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]) + ",";
                            }
                        } else {
                            row += this.ReplaceUndefined(arrData[i][vPlaylistFormatArray[index]]) + ",";
                        }
                    }
                }
            }
            row.slice(0, row.length - 1);
            CSV += row + "\r\n";
        }
        if (CSV == "") {
            alert("Invalid data");
            return;
        }
        var blob = new Blob([CSV], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.download = ReportTitle.replace(/ /g, "_") + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    DownlaodPdf() {

    }
    export_table_to_csv_upload(filename) {
        var csv = [];
        var count = 1;
        csv.push(filename + "\r\n");
        var rows = $('#printtablecsv').find('tr:not([style*="display: none"])');
        //var rows = document.querySelectorAll('#printtablecsv tr');
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                if (j == 0) {
                    row.push(count);
                    count++;
                }
                else {
                    if (j==3 && i==0 && cols.length==10) {
                        row.push("Clip Id");
                    }
                    else if (j==8 && i==0 && cols.length==10) {
                        row.push("PlayList Date");
                    }
                    else if (j==9 && i==0 && cols.length==10) {
                        row.push("Template");
                    }
                    else if (j==4 && i==0 && cols.length!=10) {
                        row.push("Clip Id");
                    }
                    else if (j==9 && i==0 && cols.length!=10) {
                        row.push("PlayList Date");
                    }
                    else if (j==10 && i==0 && cols.length!=10) {
                        row.push("Template");
                    }
                    else {
                        row.push(cols[j].innerHTML);
                    }
                }

            csv.push(row.join(","));
        }
        // Download CSV
        this.download_csv(csv.join("\n"), filename);
    }
    //     DownloadReport(JSONData: any) {
    //         var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
    //         let row: any[] = []
    //         let rowD: any[] = []
    //         let col = ['Segment', 'Title', 'Total', 'Description']; // initialization for headers
    //         let title = "Sample Report" // title of report
    //         for (let a = 0; a < arrData.length; a++) {
    //             row.push(arrData[a].segment)
    //             row.push(arrData[a].title)
    //             row.push(arrData[a].total)
    //             row.push(arrData[a].description)
    //             rowD.push(row);
    //             row = [];
    //         }
    //         this.getReport(col, rowD, title);
    //     }

    //     getReport(col: any[], rowD: any[], title: any) {
    //         const totalPagesExp = "{total_pages_count_string}";
    //         let pdf = new jsPDF('l', 'pt', 'legal');
    //         pdf.setTextColor(51, 156, 255);
    //         pdf.text("Sample1", 450, 40);
    //         pdf.text("Email:", 450, 60); // 450 here is x-axis and 80 is y-axis
    //         pdf.text("Phone:", 450, 80); // 450 here is x-axis and 80 is y-axis
    //         pdf.text("" + title, 435, 100);  //
    //         pdf.setLineWidth(1.5);
    //         pdf.line(5, 107, 995, 107)
    //         var pageContent = function (data) {
    //             // HEADER

    //             // FOOTER
    //             var str = "Page " + data.pageCount;
    //             // Total page number plugin only available in jspdf v1.0+
    //             if (typeof pdf.putTotalPages === 'function') {
    //                 str = str + " of " + totalPagesExp;
    //             }
    //             pdf.setFontSize(10);
    //             var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    //             pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
    //         };
    //         pdf.autoTable(col, rowD,
    //             {
    //                 addPageContent: pageContent,
    //                 margin: { top: 110 },
    //             });

    //         //for adding total number of pages // i.e 10 etc
    //         if (typeof pdf.putTotalPages === 'function') {
    //             pdf.putTotalPages(totalPagesExp);
    //         }

    //         pdf.save(title + '.pdf');
    //     }
}