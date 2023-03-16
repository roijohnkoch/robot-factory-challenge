import { render, screen } from '@testing-library/react';
import { RobotsListComponent } from '../../components';
import { IRobot } from '../types';

interface IRobotsListComponent {
  listRobots: IRobot[]
}

const initialProps = {
  listRobots: [
    {
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
  ]
}

const renderComponent = (props: IRobotsListComponent) => {
  return render(<RobotsListComponent {...props} />);
};

describe("Test RobotsListComponent", () => {
  renderComponent(initialProps)
  it("should render RobotList component", ()=> {
    expect(screen.getByTestId("robot-list-component")).toBeInTheDocument();
  });
});