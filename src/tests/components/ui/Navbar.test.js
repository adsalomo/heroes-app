import React from 'react';
import { mount } from "enzyme";
import { Navbar } from "../../../components/ui/NavBar";
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';

describe('Prueba Navbar', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    };

    const contextValue = {
        user: {
            logged: true,
            name: 'Elena'
        },
        dispatch: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider
            value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Elena');
    });

    test('Debe de realizar logout y ejecutar el history', () => {
        wrapper.find('button').prop('onClick')();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    })



});
