enum Role{
    User='user',
    Admin='admin',
}

interface User {
    id:number,
    userName:string,
    idNumber:string,
    phone:string,
    age:number,
    actTimes: ActTime[],
    parent?:User,
}