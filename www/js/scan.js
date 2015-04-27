/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function fail(result) {

    try {
        alert("fail" + result);
    }
    catch (e) {

    }
}
function success(result) {
    debugger;
    var htmlData = '';
    var response = JSON.parse(result.toString());
    if (response.requestState) {
        var assetsData = JSON.parse(response.result.toString());
        window.location = "assetsDetails.html?ID=" + assetsData[0].ID + "&AssetsName=" + assetsData[0].AssetsName +
                       "&AssetGroup=" + assetsData[0].ID + "&AssetPurchaseDate=" + assetsData[0].AssetPurchaseDate + "&AssetPurchaseValue=" + assetsData[0].AssetPurchaseValue
                   + "&AssetSerialNumber=" + assetsData[0].AssetSerialNumber;
    }
    else {
        alert(response.result.toString());
    }
}
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        //document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    scan: function () {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(function (result) {
            window.location.href = "assetsDetails.html";
            //alert("We got a barcode\n" +
            //"Result: " + result.text + "\n" +
            //"Format: " + result.format + "\n" +
            //"Cancelled: " + result.cancelled);

            //if (args.format == "QR_CODE") {
            //    window.location = "assetsDetails.html";//test
            //    //var svc = new AssetsTackService();
            //    //svc.GetAssetsByQRCode('harish', 'hari@4321', result.text, success, fail);
            //    //window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            //}
        }, function (error) {
            console.log("Scanning failed: ", error);
        });
    }

};
