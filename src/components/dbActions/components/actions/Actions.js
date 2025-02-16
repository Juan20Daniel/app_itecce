import { useState, useContext } from 'react';
import axiosInstance from '../../../../data/remote/axios.instance';
import Button from '../../../button/Button';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './actions.css';

const Actions = () => {
    const [ deletingSudents, setDeletingSudents ] = useState(false);
    const [ deletingTeachers, setDeletingTeachers ] = useState(false);
    const [ deletingCollaborators, setDeletingCollaborators ] = useState(false);
    const [ deletingAll, setDeletingAll ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const activeLoader = (type) => {
        switch (type) {
            case 1:
                return setDeletingSudents(prev => !prev);
            case 2:
                return setDeletingTeachers(prev => !prev);
            case 3:
                return setDeletingCollaborators(prev => !prev);
            default:
                return setDeletingAll(prev => !prev);
        }
    }
    const fetch = async (type, name) => {
        try {
            activeLoader(type);
            const url = type ? `/clients/${type}` : '/clients';
            await axiosInstance.delete(url);
            openCentralAlert('Eliminación de registros',`Se eliminaron los ${name} de forma correcta`, 'success');
        } catch (error) {
            openCentralAlert('Eliminación de registros',error.message, 'error');
        } finally {
            activeLoader(type);
        }
    }
    const remove = async (type, name) => {
        openCentralAlert(
            'Eliminación de registros',
            `¿Seguro que quieres eliminar todos los ${name}?`, 
            'confirm',
            () => fetch(type, name)
        );
    }
    return (
        <div className="actions">
            <Button 
                value='Eliminar alumnos'
                btnStyle='db-action-btn'
                type='button'
                action={() => remove(1, 'alumnos')}
                isLoading={deletingSudents}
                colorSpinner='#1A66AC'
            />
            <Button 
                value='Eliminar maestros'
                btnStyle='db-action-btn'
                type='button'
                action={() => remove(2, 'maestros')}
                isLoading={deletingTeachers}
                colorSpinner='#1A66AC'
            />
            <Button 
                value='Eliminar colaboradores'
                btnStyle='db-action-btn'
                type='button'
                action={() => remove(3, 'colaboradores')}
                isLoading={deletingCollaborators}
                colorSpinner='#1A66AC'
            />
            <Button 
                value='Borrar todo'
                btnStyle='db-action-btn btn-remove-all'
                type='button'
                action={() => remove(0, 'registros')}
                isLoading={deletingAll}
            />
        </div>
    )
}

export default Actions;