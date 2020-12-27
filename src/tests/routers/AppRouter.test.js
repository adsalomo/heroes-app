import React from 'react';
import { mount } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en AppRouter', () => {

    const contextValue = {
        user: {
            logged: false
        },
        dispatch: jest.fn(),
    };

    test('Debe de mostrar login sino esta autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider
                value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de mostrar el componente marvel si esta autenticado', () => {
        const contextValue = {
            user: {
                logged: true
            },
            dispatch: jest.fn(),
        };

        const wrapper = mount(
            <AuthContext.Provider
                value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        //console.log(wrapper.html());

        expect(wrapper.find('.navbar').exists()).toBe(true);
    });

});
