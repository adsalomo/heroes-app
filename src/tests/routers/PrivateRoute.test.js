import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';

describe('Prueba PrivateRoute', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();

    test('Debe de mostrar el componente si esta autenticado y guardar localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuth={true}
                    component={() => <span>Listo</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
    });

    test('Debe de bloquear el componente sino esta autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuth={false}
                    component={() => <span>Listo</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.html()).toBe('');
        expect(wrapper.find('span').exists()).toBe(false);
    });

});
