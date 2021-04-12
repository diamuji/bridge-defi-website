import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { http } from '../../utils/utils';

export default function User(props) {
    const { id } = props;
    const [user, setUser] = useState();
    const [makeAdminDisabled, setMakeAdminDisabled] = useState(false);
    const [confirmDisabled, setConfirmDisabled] = useState(false);
    const [verifyDisabled, setVerifyDisabled] = useState(false);
    
    useEffect(() => {
        setUser();
        setMakeAdminDisabled(false);
        const fetchUser = async () => {
            const user = await http({ url: `/admin/users/${id}` });
            setUser(user);
        };
        fetchUser();
    }, [id]);

    const makeAdmin = async () => {
        setMakeAdminDisabled(true);
        try {
            await http({
                method: 'PATCH',
                url: `/admin/make-admin/${id}`
            });
        } catch (e) {
            console.error(e);
            toast.error(e?.reason || `${e}`);
        }
        setMakeAdminDisabled(false);
    };

    const confirm = async () => {
        setConfirmDisabled(true);
        try {
            await http({
                method: 'PUT',
                url: `/users/${id}/confirm`
            });
        } catch (e) {
            console.error(e);
            toast.error(e?.reason || `${e}`);
        }
        setConfirmDisabled(false);
    };

    const verify = async () => {
        setVerifyDisabled(true);
        try {
            await http({
                method: 'PUT',
                url: `/users/${id}/verify`
            });
        } catch (e) {
            console.error(e);
            toast.error(e?.reason || `${e}`);
        }
        setVerifyDisabled(false);
    };

    if (!user) {
        return (
            <div className="m-5">Loading...</div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-400 mb-5">{user.email}</p>

            <div className="mb-5">
                Admin: <b>{user.isAdmin ? <span className="text-purple-600">true</span> : 'false'}</b>
                {!user.isAdmin && (
                    <button
                        className="btn text-white bg-teal-500 hover:bg-teal-400 py-2 px-3 text-xs uppercase ml-4 font-bold"
                        onClick={() => makeAdmin()}
                        disabled={makeAdminDisabled}
                    >
                        Make admin
                    </button>
                )}
            </div>
            <div className="mb-5">
                Confirmed: <b>{user.confirmed ? <span className="text-purple-600">true</span> : 'false'}</b>
                {!user.confirmed && (
                    <button
                        className="btn text-white bg-teal-500 hover:bg-teal-400 py-2 px-3 text-xs uppercase ml-4 font-bold"
                        onClick={() => confirm()}
                        disabled={confirmDisabled}
                    >
                        Confirm
                    </button>
                )}
            </div>
            <div className="mb-5">
                Veridied: <b>{user.verified ? <span className="text-purple-600">true</span> : 'false'}</b>
                {!user.verified && (
                    <button
                        className="btn text-white bg-teal-500 hover:bg-teal-400 py-2 px-3 text-xs uppercase ml-4 font-bold"
                        onClick={() => verify()}
                        disabled={verifyDisabled}
                    >
                        Verify
                    </button>
                )}
            </div>
        </div>
    );
}