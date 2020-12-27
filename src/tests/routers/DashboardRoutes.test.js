import React from 'react';
import { mount } from "enzyme";
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('Prueba DashboardRoutes', () => {

    const contextValue = {
        user: {
            logged: true
        },
        dispatch: jest.fn(),
    };

    test('Debe mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider
                value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

});
