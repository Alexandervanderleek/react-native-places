export class Place{
    constructor(name,imageUri,location, id){
        this.name = name;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = {lat: location.lat, lng: location.lng};
        this.id =id;
    }
}