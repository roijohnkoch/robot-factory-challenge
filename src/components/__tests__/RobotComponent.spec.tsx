import { render, screen } from '@testing-library/react';
import { RobotComponent } from '../../components';
import { IRobot } from '../types';

interface IRobotComponent {
  robot: IRobot
}

const initialProps = {
  robot: {
    id: 1,
    name: 'Robot-001',
    configuration: {
      hasSentience: true,
      hasWheels: true,
      hasTracks: true,
      numberOfRotors: 5,
      Colour: 'red'
    },
    statuses: [
      'on fire',
      'rusty',
      'loose screws',
      'paint scratched'
    ]
  }
}

const renderComponent = (props: IRobotComponent) => {
  return render(<RobotComponent {...props} />);
};

describe("Test RobotComponent", () => {
  renderComponent(initialProps)
  it("should render RobotComponent", ()=> {
    expect(screen.getByTestId("robot-component")).toBeInTheDocument();
  });
});