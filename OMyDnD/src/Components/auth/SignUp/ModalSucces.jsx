import React from 'react'
import {
    Modal,
    ModalHeader,
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

function ModalSucces() {
    const [state, dispatch] = React.useReducer(Reducer, {
        open: true,
        dimmer: 'blurring',
    })
    const { open, dimmer } = state

    return (
        <div>
            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                className="modalCustom"
            >
                <ModalHeader className='text-center'>Bravo !! Enregistrement réussi</ModalHeader>
            </Modal>
        </div>
    )
}

export { ModalSucces, Reducer }

