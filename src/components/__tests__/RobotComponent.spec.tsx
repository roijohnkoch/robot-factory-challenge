import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react/pure';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { RobotComponent } from '../../components';
import { postExtinguishApi } from '../../redux/api';
import { IRobot } from '../types';

jest.mock('../../redux/api');

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
    statuses: ['on fire']
  },
  onClickForShipment: jest.fn(),
}

const renderComponent = (props: IRobotComponent) => {
  return render(
    <Provider store={store}>
      <RobotComponent {...props} />
    </Provider>
  );
};

describe("Test RobotComponent", () => {
  it("should render RobotComponent", ()=> {
    renderComponent(initialProps);
    expect(screen.getByTestId("robot-component")).toBeInTheDocument();
    cleanup();
  });

  describe("test robot for extinguish", () => {
    beforeAll(() => {
      renderComponent(initialProps);
    });
  
    afterAll(() => {
      cleanup();
    });
    it("should display robot details for extinguish", () => {
      expect(screen.getByText('Robot-001')).toBeInTheDocument();
      expect(screen.getByText('Id: 1')).toBeInTheDocument();
      expect(screen.getByText('Sentience')).toBeInTheDocument();
      expect(screen.getByText('on fire')).toBeInTheDocument();
    });
    it("should render a button for extinguish", () => {
      const extinguishButton = screen.getByRole('button', { name: /extinguish/i });
      expect(extinguishButton).toBeVisible();
    });
    it("should trigger a post request when extinguish button is clicked", () => {
      const extinguishButton = screen.getByRole('button', { name: /extinguish/i });
      expect(extinguishButton).toBeVisible();
      fireEvent.click(extinguishButton);
      expect(postExtinguishApi).toHaveBeenCalledTimes(1);
    });
  });

  describe("test robot for factory second", () => {
    const newProps = {
      robot: {
        id: 4,
        name: 'Robot-004',
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: false,
          numberOfRotors: 5,
          Colour: 'red'
        },
        statuses: ["paint scratched"],
        factorySecond: true,
        readyToShip: false,
      },
      onClickForShipment: jest.fn(),
    }
    beforeAll(() => {
      renderComponent(newProps);
    });
  
    afterAll(() => {
      cleanup();
    });

    it("should display robot details for factory second", () => {
      expect(screen.getByText('Robot-004')).toBeInTheDocument();
      expect(screen.getByText('Id: 4')).toBeInTheDocument();
      expect(screen.getByText('5 Rotor/s')).toBeInTheDocument();
      expect(screen.getByText('Colour red')).toBeInTheDocument();
    });
    it("should render a button for add to shipment", () => {
      const addToShipmentButton = screen.getByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButton).toBeVisible();
    });
    it("should trigger a function from props for adding to shipment", () => {
      const addToShipmentButton = screen.getByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButton).toBeVisible();
      fireEvent.click(addToShipmentButton);
      expect(newProps.onClickForShipment).toHaveBeenCalledTimes(1);
    });
  });

  describe("test robot for passed QA", () => {
    const newProps = {
      robot: {
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
      onClickForShipment: jest.fn(),
    }
    beforeAll(() => {
      renderComponent(newProps);
    });
  
    afterAll(() => {
      cleanup();
    });

    it("should display robot details for passed QA", () => {
      expect(screen.getByText('Robot-006')).toBeInTheDocument();
      expect(screen.getByText('Id: 6')).toBeInTheDocument();
      expect(screen.getByText('Colour red')).toBeInTheDocument();
    });
    it("should render a button for add to shipment", () => {
      const addToShipmentButton = screen.getByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButton).toBeVisible();
    });
    it("should trigger a function from props for adding to shipment", () => {
      const addToShipmentButton = screen.getByRole('button', { name: /add to shipment/i });
      expect(addToShipmentButton).toBeVisible();
      fireEvent.click(addToShipmentButton);
      expect(newProps.onClickForShipment).toHaveBeenCalledTimes(1);
    });
  });

  describe("test robot for ready to ship", () => {
    const newProps = {
      robot: {
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
      onClickForShipment: jest.fn(),
    }
    beforeAll(() => {
      renderComponent(newProps);
    });
  
    afterAll(() => {
      cleanup();
    });

    it("should display robot details for ready to ship", () => {
      expect(screen.getByText('Robot-006')).toBeInTheDocument();
      expect(screen.getByText('Id: 6')).toBeInTheDocument();
      expect(screen.getByText('Colour red')).toBeInTheDocument();
    });
    it("should render a button for ready to ship", () => {
      const removeFromShipmentButton = screen.getByRole('button', { name: /remove from shipment/i });
      expect(removeFromShipmentButton).toBeVisible();
    });
    it("should trigger a function from props for removing from shipment", () => {
      const removeFromShipmentButton = screen.getByRole('button', { name: /remove from shipment/i });
      expect(removeFromShipmentButton).toBeVisible();
      fireEvent.click(removeFromShipmentButton);
      expect(newProps.onClickForShipment).toHaveBeenCalledTimes(1);
    });
  });
});