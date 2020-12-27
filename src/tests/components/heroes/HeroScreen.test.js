import { mount, shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe('Prueba HeroScreen', () => {

    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    };

    test('Debe de mostrar el componente Redirect sino hay arg en el url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('Debe de mostrar un hero si el parametro existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Debe de regresar a la pantalla anterior con PUSH', () => {
        const history = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={
                        (props) => <HeroScreen history={history} />
                    }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();

    });

    test('Debe de regresar a la pantalla anterior con GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={
                        (props) => <HeroScreen history={history} />
                    }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).not.toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalled();

    });

    test('Debe de llamar el REDIRECT si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spidersssss']}>
                <Route
                    path="/hero/:heroeId"
                    component={
                        (props) => <HeroScreen history={history} />
                    }
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');

    });

});
