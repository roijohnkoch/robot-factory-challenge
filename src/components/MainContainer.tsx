import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRobots, postRecycle, actionReadyToShip } from '../redux/actions';
import { IRobot, IReduxState } from './types';
import RobotsListComponent from './RobotsListComponent';
import './MainContainer.scss';

const MainContainer: React.FC<{ robotsReducer: IReduxState }> = ({ robotsReducer }) => {
  const dispatch = useDispatch();
  const { robots, loading } = robotsReducer;
  useEffect(() => {
    dispatch(getRobots());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newRobotList: IRobot[] = robots.map((robot: IRobot) => {
    const { statuses, configuration } = robot;
    const { hasSentience, numberOfRotors, hasWheels, hasTracks, Colour } = configuration;
    const secondCondition = {
      rotorNumbers: numberOfRotors < 3 || numberOfRotors > 8,
      rotorNumbersWithColor: numberOfRotors > 0 && Colour === 'blue',
      wheelsAndTracks: hasWheels && hasTracks,
      wheelsAndRusty: hasWheels && statuses.includes('rusty'),
      sentientAndScrewLoose: hasSentience && statuses.includes('loose screws'),
      isOnFire: statuses.includes('on fire'),
    }
    const firstConditionFailed = (secondCondition.isOnFire && hasSentience);
    const secondConditionFailed = Object.entries(secondCondition).some(([key, value]) => value);
    const filterStatus = statuses.filter((item: any) => item !== 'on fire');
    return {
      ...robot,
      failedRobot: firstConditionFailed || secondConditionFailed,
      forRecycleRobot: secondConditionFailed,
      factorySecond: (!firstConditionFailed && !secondConditionFailed) && filterStatus.length !== 0,
      passedQA: (!firstConditionFailed && !secondConditionFailed) && filterStatus.length === 0,
    }
  });

  const robotsFailed = newRobotList.filter((robot) => robot.failedRobot);
  const forRecycleRobots = newRobotList.filter((robot) => (robot.forRecycleRobot)).map((item) => item.id);
  const factorySecondRobots = newRobotList.filter((robot) => !robot.failedRobot && robot.factorySecond && !robot.readyToShip);
  const passedQARobots = newRobotList.filter((robot) => !robot.failedRobot && robot.passedQA && !robot.readyToShip);
  const readyToShipRobots = newRobotList.filter((robot) => robot.readyToShip);

  const onClickRecycleButton = () => {
    dispatch(postRecycle(forRecycleRobots));
  }

  const onClickForShipment = (robotId: number, readyToShip: boolean) => {
    const robotIndex = newRobotList.findIndex((robot) => robot.id === robotId);
    newRobotList[robotIndex].readyToShip = readyToShip;
    console.log(newRobotList);
    dispatch(actionReadyToShip(newRobotList));
  }

  return (
    <div className='main-container' data-testid='main-container'>
      <div className='main-container_title'>Robot Factory Application</div>
      <div className='main-container_robot-list-container'>
      {!loading && (
        <>
          <div className='main-container_robot-list-wrapper'>
            <RobotsListComponent listRobots={robotsFailed} />
            {/** for Factory second */}
            <RobotsListComponent
              title='Factory Second'
              listRobots={factorySecondRobots}
              onClickForShipment={onClickForShipment}
            />
            {/** for Passed QA */}
            <RobotsListComponent
              title='Passed QA'
              listRobots={passedQARobots}
              onClickForShipment={onClickForShipment}
            />
            {/** for Passed QA */}
            <RobotsListComponent
              title='Ready to Ship'
              listRobots={readyToShipRobots}
              onClickForShipment={onClickForShipment}
            />
          </div>
          {forRecycleRobots.length !== 0 && (
            <div className='main-contianer_robot-button-wrapper'>
              <button className='recycle_button' onClick={onClickRecycleButton}>Recycle Robot</button>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    robotsReducer: state.robotsReducer
  }
}

export default connect(mapStateToProps)(MainContainer);