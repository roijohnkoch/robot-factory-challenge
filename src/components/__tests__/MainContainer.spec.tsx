import { render, screen } from '@testing-library/react';
import { MainContainer } from '../../components';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

describe("Unit test for MainContainer component", () => {
  renderComponent();
  it("should render MainContainer component", () => {
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });
})