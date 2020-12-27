import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas authReducer', () => {

    const initialState = {
        logged: false,
    }

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test('debe de autenticar y colocar el name del usuario', () => {
        const state = authReducer(initialState, {
            type: types.login,
            payload: { name: 'Elena' },
        });

        expect(state.name).toBe('Elena');
        expect(state.logged).toBe(true);
    });

    test('debe de borrar el nombre del usuario y logged en false', () => {
        const state = authReducer(initialState, {
            type: types.logout,
        });

        expect(state.name).toBe(undefined);
        expect(state.logged).toBe(false);
    });

});
