import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <App />
        </Provider>
    );
};

describe('Test App component', () => {
    renderComponent();
    it('Should render Robot Factory application', () => {
        expect(screen.getByText('Robot Factory Application')).toBeInTheDocument();
    })
})