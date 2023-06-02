import { Injectable } from '@angular/core';
import { Client } from "appwrite";

@Injectable({
  providedIn: 'root'
})

export class AppWriteHttpClientService {

   //private client:Client;
  // constructor(client:Client) { 
  //   this.client =client;
  // }

  getClient():Client
  {
    //console.log(this.client);
    var client = new Client();
    client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6463ad29c249f2b410b7') // Your project ID
    return client;
    
  }

}
