'use strict';
var request = require('request');
// [START dns_list_zones]
exports.updateRecord = async function () {
  // Imports the Google Cloud client library
  const {DNS} = require('@google-cloud/dns');

  // Your Google Cloud Platform project ID
  const projectId = 'flowing-sign-123213';
  const KeyFilename = 'keyfile.json';
  const zoneName = 'valenzuelafernandez'
  const dnsRecordName = 'tw.valenzuelafernandez.cl.';
  const dnsRecordtype = 'A';


  // Creates a client
  const dns = new DNS({
    projectId: projectId,
    keyFilename: KeyFilename,
  });

  const zone = dns.zone(zoneName);

  const query = {
    name: dnsRecordName,
    type: dnsRecordtype
  };

  zone.getRecords(query).then(data => {
    const recordData = JSON.parse(JSON.stringify(data[0][0]));
    console.log(recordData);
    const record = zone.record(recordData.type,{
      name: recordData.name,
      ttl: recordData.ttl,
      rrdatas: recordData.rrdatas
    });

    record.delete((err, change, apiResponse) => {
      if (!err) {
        //Delete change modification was created.
        console.log(apiResponse);
        request('http://ipinfo.io', function(error,response,body){
          if(!err){
            let data = JSON.parse(body);
            console.log("IPINFO:",data);
            let hostIP = [data.ip];
            console.log("NewIP:",hostIP);
            const recordNew = zone.record(recordData.type,{
              name: recordData.name,
              ttl: recordData.ttl,
              rrdata: hostIP
            });
            zone.addRecords(recordNew)
            .then((data)=>{
              console.log(data[1]);
              process.exit();
            });
          }
        });

      }
    });
    
  });
}
