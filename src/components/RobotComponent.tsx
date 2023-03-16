import React from 'react';
import { IRobot, IReduxState } from './types';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postExtinguish, actionReadyToShip } from '../redux/actions';
import './RobotComponent.scss'

interface IRobotComponent {
  robot: IRobot,
  robotsReducer: IReduxState,
  onClickForShipment?: (robotId: number, readyToShip: boolean) => void;
}

const RobotComponent: React.FC<IRobotComponent> = ({
  robot,
  robotsReducer,
  onClickForShipment = () => {},
}) => {
  const {
    id,
    name,
    configuration,
    statuses,
    factorySecond,
    passedQA,
    readyToShip,
  } = robot;
  const dispatch = useDispatch();
  const { robots } = robotsReducer;
  const renderConfigurations = (configuration: string, value: boolean | string | number) => {
    switch (configuration) {
      case 'hasSentience':
        return value && <div key={configuration} className='robot_details_configurations'>Sentience</div>
      case 'hasWheels':
        return value && <div key={configuration} className='robot_details_configurations'>Wheels</div>
      case 'hasTracks':
        return value && <div key={configuration} className='robot_details_configurations'>Tracks</div>
      case 'numberOfRotors':
        return value > 0 && <div key={configuration} className='robot_details_configurations'>{value} Rotor/s</div>
      case 'Colour':
        return <div key={configuration} className='robot_details_configurations'>Colour {value}</div>
      default:
        return;
    }
  }

  const onClickExtinguish = () => {
    dispatch(postExtinguish(id));
  };

  const handleOnClickReadyToShip = () => {
    onClickForShipment(id, true);
  }

  const handleOnClickRemoveFromShipment = () => {
    onClickForShipment(id, false);
  }

  return (
    <div data-testid='robot-component' className='robot-component_container'>
      <div className='robot-component_details_wrapper'>
        <div className='robot_name'>
          {name}
        </div>
        <div className='robot_details'>
          <div className='robot_details_configuration_container'>
            <div>Id: {id}</div>
            Configurations:
            {Object.entries(configuration).map(([key, value]) => {
              return renderConfigurations(key, value)
            })}
          </div>
          {statuses.length !== 0 && (
            <div>
              Status:
              {statuses.map((robotStatus, index) => {
                return <div key={index} className='robot_details_configurations'>{robotStatus}</div>
              })}
            </div>
          )}
        </div>
      </div>
      <div className='robot-component_buttons_wrapper'>
        {configuration.hasSentience && statuses.includes('on fire') && (
          <button className='robot-component_buttons--extinguish' onClick={onClickExtinguish}>Extinguish</button>
        )}
        {(factorySecond || passedQA) ?
          (!readyToShip) ? (
            <button className='robot-component_buttons--add_shipment' onClick={handleOnClickReadyToShip}>Add to shipment</button>
          ): (
            <button className='robot-component_buttons--remove_shipment' onClick={handleOnClickRemoveFromShipment}>Remove from shipment</button>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    robotsReducer: state.robotsReducer
  }
}

export default connect(mapStateToProps)(RobotComponent);