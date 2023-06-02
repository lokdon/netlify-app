import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class AppResources
{
    
    static apikey :string='85c35453b2cb0fd18c0d27286e5b5cac2fde7b9d95f9fc16928e2bb3a755ae25971f7818526b79c5161511488da9e71588ebc40ce1fec380c37d8c99a586e4e420e7b5b104277867239b14e73ac2547a684700d6d26c744601d944a795cced7a5cb5083ba33486c716b56db04e0bf13df35bba980e1b62199b6065ee95b233d3';
   
    static questionDatabaseId :string='64674ffce28abc62bc25';

   

    static categoryCollectionId :string='646754bd925f547688ad';

    static userFilesCollectionId :string='646eff898d200f90a461'; 

    static bucketId : string = '646f276fb81d2f0cc7f1';
    
    static eventManagerDatabaseId :string='647445e1467647207406';
    
    static eventCollectionId ='647445f07376548c86ee';

    static contactsCollectionId = '647448b830be7119259e';   

    static addressCollectionId = '6476ddc53512069053b4' ;

    static groupCollectionId = '64744a4ead47ec934c5e' ; 
}