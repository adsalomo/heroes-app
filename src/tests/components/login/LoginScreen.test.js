import React from 'react';
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from '../../../auth/AuthContext';

describe('Prueba LoginScreen', () => {

    const history = {
        replace: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Elena'
        },
    };

    const wrapper = mount(
        <AuthContext.Provider
            value={contextValue}
        >
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe realizar el dispatch y la navegación', () => {
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalled();
        expect(history.replace).toHaveBeenCalled();
    });


});
