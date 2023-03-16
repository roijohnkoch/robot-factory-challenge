export interface IRobotsConfiguration {
  hasSentience: boolean,
  hasWheels: boolean,
  hasTracks: boolean,
  numberOfRotors: number,
  Colour: string
}

export interface IRobot extends IRobotModifiedList {
  id: number,
  name: string,
  configuration: IRobotsConfiguration,
  statuses: string[]
}

export interface IRobotModifiedList {
  failedRobot?: boolean,
  forRecycleRobot?: boolean,
  factorySecond?: boolean,
  passedQA?: boolean,
  readyToShip?: boolean,
}

export interface IReduxState {
  robots: IRobot[],
  loading: boolean,
  error: Error | null
}