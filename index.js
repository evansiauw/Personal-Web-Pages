
        function openPage(pageName, elmnt, color) {

        if(pageName == 'assignment3') { 
            getLocation();
        }

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
           tablinks[i].style.backgroundColor = "gray";
        }

        document.getElementById(pageName).style.display = "block";

        elmnt.style.backgroundColor = color;
        }

        function connect(){

            if (document.getElementById("radio1").checked == true){
                document.getElementById("form1").action = "http://venus.cs.qc.cuny.edu/~lteitelman/cs355/connected.php"
            }
            else {
                document.getElementById("form1").action = "http://venus.cs.qc.cuny.edu/~siiw1541/connected.php"
            }

            document.getElementById("form1").submit();

        }

   
        function urlParsing(){

            var inputText = document.getElementById("urlInput").value;

            var dot = /([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}/igm;

             if(inputText == "" || !(dot.test(inputText))){
                alert("Please Enter the correct URL!!!");
            } else {

            var patt = /^https?:\/\/|^\/\//i;
            if(!patt.test(inputText)) {
                inputText = "http://" + inputText;
            }

            var url = document.createElement("a");
            url.href = inputText;
    
            var proEntry = url.protocol;
            var proInfo = proEntry != "https:" ? "Hyper Text Transfer Protocol" : "Hyper Text Transfer Protocol Secured";
            var proSource = proEntry != "http" ? "Provided" : "Not Provided";
            var portEntry = (proSource == "Provided" && url.protocol == "https:") ? 443 : 80;
            var addrEntry = url.host;
      
            var host = addrEntry.split(".");
            var topEntry = host.length > 0 ? host[host.length-1] : "";
            var topSource = topEntry != "" ? "Provided" : "Not Provided";
            var domEntry = host.length > 1 ? (host[host.length-2] + "." + host[host.length-1]) : "";
            var domSource = topEntry != "" ? "Provided" : "Not Provided";
            var subEntry = "";

            var form = document.createElement("form");
            var input = document.createElement("input");
            form.method= "post"
            form.action= "http://venus.cs.qc.cuny.edu/~siiw1541/index.php";
            form.target= "_blank";
            input.value= domEntry;
            input.name= "url";
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();  
            var addrInfo = "";

            if(host.length > 2){
                for (var i=0; i < host.length-2; i++){

                    if(i==0){   
                        if(host.length-2 == 0){
                            break;
                        } else {
                            subEntry += host[i];
                        } 
                    } else {
                     subEntry+= ".";
                     subEntry += host[i];
                    }
                } subSource = "Provided";
            } else {
                subSource = "Not Provided";
            }

            var pathEntry = url.pathname == "/" ? "" : url.pathname;
            var pathSource = pathEntry != "" ? "Provided": "Not Provided";
            var body = document.getElementById("assignment2");
            var tbl = document.createElement('table');

            var table = [
                ["Description", "Entry", "Additional Information", "Source"],
                ["Protocol", proEntry, proInfo, proSource],
                ["Port", portEntry,"", "Default"],
                ["Full Address", addrEntry, addrInfo, "Lookup"],
                ["Top-Level Domain", topEntry,"", topSource],
                ["Domain Name", domEntry, "", domSource],
                ["SubDomain Name", subEntry, "", subSource],
                ["Path", pathEntry, "", pathSource]
                ];

            for (var i = 0; i < 8; i++){
                var tr = tbl.insertRow(i);
                if(i == 0){
                    tr.style.backgroundColor = "white";
                    tr.style.color = "black";
                    tr.style.textAlign = "center";
                }
                for(var j = 0; j < 4; j++){
                    var td = tr.insertCell(j);
                    td.appendChild(document.createTextNode(table[i][j]));
                }  
            }

            var urlParams = new URLSearchParams(url.search);
            var i = 8;
            var counter = 1;
            for(var param of urlParams.entries()){
                var tr = tbl.insertRow(i);
                for(var j = 0; j < 4; j++){
                    var td = tr.insertCell(j);
                    if (j == 0){
                        td.appendChild(document.createTextNode("Parameter #" + counter));
                    } else if (j == 3){
                        td.appendChild(document.createTextNode("Provided"));
                    } else{
                        td.appendChild(document.createTextNode(param[j-1]));
                    }
                } 
                counter++;
                i++;
            }
            body.appendChild(tbl);
        }
    }


    var lat=0;
    var long=0;
    var geoAvailability = true;
    var zipcode = 11365;

    function getLocation(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,error);
        }
        else {
            alert('Geolocation is not supported');
            refresh();
        }
    }


    function error() {

        geoAvailability = false;

        zipcode = prompt("GeoLocation API is not available on non-secured connections\nPlease Enter Your ZipCode", "11365");

        if(zipcode == "" ||zipcode == null){
            zipcode = 11365;
        }

        refresh();
    }

    function success(position){

        lat = position.coords.latitude;
        long = position.coords.longitude;
        refresh();

    }

    function weather() {
  
      var key = '84a4808e318a8a1b067adb686075bcc6';
      var Weather;

      if(geoAvailability){
        Weather = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + long + "&units=imperial&appid=" + key;
      } else {
        Weather = "http://api.openweathermap.org/data/2.5/weather?zip="+ zipcode + ",us" + "&units=imperial&appid=" + key;
      }

      $("#weatherUrl").text(Weather);


      $.ajax({
      url : Weather,
      dataType : "jsonp",
      success : function(data) {

        var temp = Math.round(data.main.temp);

        console.log(data)

        $("#currentTemp").text(temp +"F");
        $("#weatherCity").text(data.name)
        $("#weatherDetails").text("Temp_Min: " + data.main.temp_min + "F " + " || Temp_Max: " +  data.main.temp_max +
            "F " +  " || Wind Speed: " + data.wind.speed+ "mph " + " || Humidity: " + data.main.humidity + "%");

        }
        });

    }

    function debt(){

        var Url = "http://www.treasurydirect.gov/NP_WS/debt/current"
        $("#debtUrl").text(Url);

        $.ajax({
            url: Url,
            dataType: "jsonp",
            success : function(data) {

                console.log(data)

                $("#usDebt").text("USD " + data.totalDebt);
                $("#debtDetails").text("As of " + data.effectiveDate)

            }
        })
    }


    function stock(){

        var company = ["aapl","googl","msft","amzn","fb","baba","intc","orcl"];

        var companyName = company[Math.floor(Math.random() * 7)];

        var Url = "https://api.iextrading.com/1.0/stock/" +companyName+"/batch?types=company,chart&range=1d";
        $("#stockUrl").text(Url)

        $.ajax({
            url: Url,
            dataType: "jsonp",
            success : function(data) {

                console.log(data)

                var file = data.chart[data.chart.length-1];
                $("#stockTime").text("Last Updated At " + file.label);
                $("#companyName").text(data.company.companyName);
                $("#stockDetails").text("Open: " + file.open + " || Low: " + file.low + " || Average: " + file.average + " || High: "
                 + file.high + " || Close: " + file.close);
            }

        })
    }

    function getCurrentTime(){

        var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes();

        if (minutes < 10) {
         minutes = "0" + minutes;
        }

        var suffix = "AM";
        if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
        }
        if (hours == 0) {
        hours = 12;
        }

        $(".right").text("Last Updated At " + hours + ":" + minutes + " " + suffix)
    }

    function population(){

        var Url = "http://api.population.io:80/1.0/population/World/today-and-tomorrow"
        $("#populationUrl").text(Url);

        $.ajax({
            url: Url,
            dataType: "json",
            success : function(data) {

                console.log(data)
               
               $("#population").text(data.total_population[0].population);
               $("#popDetails").text("As of " + data.total_population[0].date);
            }

        })
    }

    function news(){

        var Url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=bb8f275491f44ee38e3cfef33a5ca4fb"
        $("#newsUrl").text(Url);

        $.ajax({
            url: Url,
            dataType: "json",
            success : function(data) {

                console.log(data)
               
               $("#newsSource").text(data.articles[0].source.name);
               $("#newsTitle").text(data.articles[0].title);
               $("#newsDesc").text(data.articles[0].description);
               $("#newsSource").attr("href", data.articles[0].url)
            }

        })
    }

    function refresh(){

        news();
        debt();
        stock();
        population();
        getCurrentTime();
        weather();
        setTimeout(refresh,30000);
    }





















