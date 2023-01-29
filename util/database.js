import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');


export function InsertPlace(place){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((transaction)=>{
            transaction.executeSql(`
                INSERT INTO places (title, imageUri, address, lat, lng)
                VALUES (?,?,?,?,?)
            `, [place.name, place.imageUri, place.address, place.location.lat, place.location.lng],
            (_,result)=>{
                console.log(result)
                resolve(result);
            },
            (_,error)=>{
                reject(error)
            })
        })
    })

    return promise;
}

export function init(){

    const promise = new Promise((resolve, reject)=>{
        database.transaction((transaction)=>{//this was a callback but want promise
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
            [],
            ()=>{
                resolve();
            },
            (_,error)=>{
                reject(error);
            }
            );
        });
    })

    return promise;

   
}


export function fetchPlaces(){
    const promise = new Promise((reslove, reject)=>{
        database.transaction((transaction)=>{
            transaction.executeSql(`
                SELECT * FROM places
            `, [], (_,result)=>{
                console.log(result);
                const places = [];

                for(const dp of result.rows._array){
                    places.push(new Place(dp.title, dp.imageUri, {address: dp.address, lat: dp.lat, lng: dp.lng},dp.id))
                }

                reslove(places);
            },(_,error)=>{
                reject(error);
            })
        })
    })

    return promise;
}


export function fetchPlaceDetails(id){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((transaction)=>{
            transaction.executeSql(`SELECT * FROM places WHERE id = ?`,[id],
        (_,result)=>{
            console.log(result);
            const dp = result.rows._array[0]
            const place = new Place(dp.title, dp.imageUri, {address: dp.address, lat: dp.lat, lng: dp.lng},dp.id)
            resolve(place);
        },
        (_,error)=>{
            reject(error);
        });
        })
    })
    return promise;
}