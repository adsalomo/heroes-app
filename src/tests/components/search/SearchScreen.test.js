import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Prueba SearchScreen', () => {

    test('Debe mostrarse correctamente', () => {
        const wrapper = mount(
            <MemoryRouter
                initialEntries={['/search']}
            >
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('Debe mostrarse a batman y el input con el valor de queryString', () => {
        const wrapper = mount(
            <MemoryRouter
                initialEntries={['/search?q=batman']}
            >
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');

    });

    test('Debe mostrar un error sino encuentra un Hero', () => {
        const wrapper = mount(
            <MemoryRouter
                initialEntries={['/search?q=batman123']}
            >
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').exists()).toBe(true);

    });

    test('Debe de llamar el push del history', () => {
        const history = {
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter
                initialEntries={['/search?q=batman']}
            >
                <Route
                    path="/search"
                    component={() => <SearchScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'search',
                value: 'batman',
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault() { } });

        expect(history.push).toHaveBeenCalledWith(`?q=batman`);
    });

});
