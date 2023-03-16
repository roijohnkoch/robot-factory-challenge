import React from 'react';
import { useDispatch } from 'react-redux';
import RobotComponent from './RobotComponent';
import { IRobot } from './types';
import { putSendShipment } from '../redux/actions';
import './RobotListComponent.scss';

interface IRobotsListComponent {
  listRobots: IRobot[],
  title?: string;
  onClickForShipment?: (robotId: number, readyToShip: boolean) => void;
}

const RobotsListComponent: React.FC<IRobotsListComponent> = ({
  listRobots,
  title = 'Robots List',
  onClickForShipment,
 }) => {
  const dispatch = useDispatch();
  const onClickSendShipment = () => {
    const robotIds = listRobots.map((robot) => robot.id);
    dispatch(putSendShipment(robotIds));
  }

  return (
    <div data-testid='robot-list-component' className='robot-list-component-container'>
      <div className='robot-list-component-container_title'>
        {title}
        {
          title === 'Ready to Ship' && listRobots.length !== 0 && 
          <button className='robot-list-component-container_button' onClick={onClickSendShipment}>Send shipment</button>
        }
      </div>
      {listRobots.map((item) => {
        return (
          <RobotComponent
            key={item.id}
            robot={item}
            onClickForShipment={onClickForShipment}
          />
        );
      })}
    </div>
  );
}

export default RobotsListComponent;