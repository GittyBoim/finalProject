enum TargetAge {
    Child = 'child',
    Baby = 'baby',
    Teenager ='teenager',
    Adult = 'adult',
  }

interface Ride {
    id: number,
    rideName: string,
    image?: Buffer,
    description: string,
    numberSeats: number,
    duringUse: number,
    ageUser: number,
    targetAge:TargetAge,
    actTimes:ActTime[],
}