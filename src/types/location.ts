export type Shelter = {
    name: string;
    address: string;
    lat: number;
    lon: number;
};
type Location = {
    center:{
        lat:number,
        lon:number,
        radius:number
    },
    shelters:Shelter[]
};
export default Location;