import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { RobotsListComponent } from '../../components';
import { IRobot } from '../types';

interface IRobotsListComponent {
  listRobots: IRobot[],
  title?: string;
  onClickForShipment?: (robotId: number, readyToShip: boolean) => void;
}

const initialProps: IRobotsListComponent = {
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
  ],
  title: 'Robots List',
  onClickForShipment: jest.fn(),
}

const renderComponent = (props: IRobotsListComponent) => {
  return render(
    <Provider store={store}>
      <RobotsListComponent {...props} />
    </Provider>
  );
};

describe("Test RobotsListComponent", () => {
  it("should render RobotList component", ()=> {
    renderComponent(initialProps)
    expect(screen.getByTestId("robot-list-component")).toBeInTheDocument();
    cleanup();
  });

  describe("Test Robot List", () => {
    const newProps = {
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
            "rusty",
            "loose screws",
            "paint scratched"
          ]
        },
        {
          id: 2,
          name: 'Robot-002',
          configuration: {
            hasSentience: true,
            hasWheels: true,
            hasTracks: true,
            numberOfRotors: 5,
            Colour: 'red'
          },
          statuses: [
            "on fire",
            "rusty",
            "loose screws",
            "paint scratched"
          ]
        },
      ],
      title: 'Robots List',
      onClickForShipment: jest.fn(),
    }

    beforeEach(() => {
      renderComponent(newProps);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render title of list", () => {
      expect(screen.getByText('Robots List')).toBeInTheDocument();
    });

    it("should render list of robots", () => {
      const elements = screen.getAllByTestId('robot-component');
      expect(elements.length).toBe(2);
    });

    it("should render robots for extinguish", () => {
      const extinguishButtons = screen.getAllByRole('button', { name: /extinguish/i });
      expect(extinguishButtons.length).toBe(1);
    });
  });

  describe("Test Factory Second list", () => {
    const newProps = {
      listRobots: [
        {
          id: 4,
          name: 'Robot-004',
          configuration: {
            hasSentience: true,
            hasWheels: false,
            hasTracks: false,
            numberOfRotors: 5,
            Colour: 'red'
          },
          statuses: ['paint scratched'],
          factorySecond: true,
          readyToShip: false,
        },
        {
          id: 5,
          name: 'Robot-005',
          configuration: {
            hasSentience: false,
            hasWheels: false,
            hasTracks: false,
            numberOfRotors: 5,
            Colour: 'red'
          },
          statuses: ['paint scratched'],
          factorySecond: true,
          readyToShip: false,
        },
        {
          id: 7,
          name: 'Robot-007',
          configuration: {
            hasSentience: false,
            hasWheels: false,
            hasTracks: true,
            numberOfRotors: 5,
            Colour: 'green'
          },
          statuses: [
            'rusty',
            'loose screws',
            'paint scratched'
          ],
          factorySecond: true,
          readyToShip: false,
        },
      ],
      title: 'Factory Second',
      onClickForShipment: jest.fn(),
    }

    beforeEach(() => {
      renderComponent(newProps);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render title of list", () => {
      expect(screen.getByText('Factory Second')).toBeInTheDocument();
    });

    it("should render list of factory second robots", () => {
      const elements = screen.getAllByTestId('robot-component');
      expect(elements.length).toBe(3);
    });

    it("should render robots for adding to shipment", () => {
      const addToShipmentButtons = screen.getAllByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButtons.length).toBe(3);
    });

    it("should remove robot for adding to shipment", () => {
      const addToShipmentButtons = screen.getAllByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButtons.length).toBe(3);
      fireEvent.click(addToShipmentButtons[0]);
      expect(newProps.onClickForShipment).toHaveBeenCalledTimes(1);
    });
  });

  describe("Test Passed QA list", () => {
    const newProps = {
      listRobots: [
        {
          id: 6,
          name: 'Robot-006',
          configuration: {
            hasSentience: false,
            hasWheels: false,
            hasTracks: false,
            numberOfRotors: 5,
            Colour: 'red'
          },
          statuses: [],
          passedQA: true,
          readyToShip: false,
        },
      ],
      title: 'Passed QA',
      onClickForShipment: jest.fn(),
    }

    beforeEach(() => {
      renderComponent(newProps);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render title of list", () => {
      expect(screen.getByText('Passed QA')).toBeInTheDocument();
    });

    it("should render list of passed qa robots", () => {
      const elements = screen.getAllByTestId('robot-component');
      expect(elements.length).toBe(1);
    });

    it("should render robots for adding to shipment", () => {
      const addToShipmentButtons = screen.getAllByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButtons.length).toBe(1);
    });

    it("should remove robot for adding to shipment", () => {
      const addToShipmentButtons = screen.getAllByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButtons.length).toBe(1);
      fireEvent.click(addToShipmentButtons[0]);
      expect(newProps.onClickForShipment).toHaveBeenCalledTimes(1);
    });
  });

  describe("Test Ready to Ship list", () => {
    const newProps = {
      listRobots: [
        {
          id: 6,
          name: 'Robot-006',
          configuration: {
            hasSentience: false,
            hasWheels: false,
            hasTracks: false,
            numberOfRotors: 5,
            Colour: 'red'
          },
          statuses: [],
          passedQA: true,
          readyToShip: true,
        },
      ],
      title: 'Ready to Ship',
      onClickForShipment: jest.fn(),
    }

    beforeEach(() => {
      renderComponent(newProps);
    });

    afterEach(() => {
      cleanup();
    });

    it("should render title of list", () => {
      expect(screen.getByText('Ready to Ship')).toBeInTheDocument();
    });

    it("should render list of ready to ship robots", () => {
      const elements = screen.getAllByTestId('robot-component');
      expect(elements.length).toBe(1);
    });

    it("should render robots for removing to shipment", () => {
      const removeToShipmenButtons = screen.getAllByRole('button', { name: /remove from shipment/i });
      expect(removeToShipmenButtons.length).toBe(1);
    });
    
    it("should remove robot that is ready for shipment", () => {
      const removeToShipmenButtons = screen.getAllByRole('button', { name: /remove from shipment/i });
      expect(removeToShipmenButtons.length).toBe(1);
      fireEvent.click(removeToShipmenButtons[0]);
      expect(newProps.onClickForShipment).toHaveBeenCalledTimes(1);
    });
  });
});