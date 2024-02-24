import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
} from 'semantic-ui-react'



function Reducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default:
            throw new Error()
    }
}

function ModalContact() {
    const [state, dispatch] = React.useReducer(Reducer, {
        open: true,
        dimmer: 'blurring',
    })
    const { open, dimmer } = state
    const navigate = useNavigate();

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                dispatch({ type: 'CLOSE_MODAL' });
                navigate('/');
            }, 5000);
            return () => clearTimeout();
        }
    }, [open, navigate]);

    return (
        <div>

            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                className="modalCustom"
            >
                <ModalHeader className="modalCustom" >Merci de l&apos;intérêt que vous nous portez. </ModalHeader>
                <ModalContent className="modalCustom">
                    Votre missive se trouve entre les main de notre meilleur coursier, nous vous promettons de la traiter dans les meilleurs délais.
                </ModalContent>
                <ModalActions
                    className="modalCustom"
                >
                    Nous vous redirigeons vers la page d&apos;accueil automatiquement d&apos;ici quelques secondes.

                </ModalActions>
            </Modal>
        </div>
    )
}

export { ModalContact, Reducer };
