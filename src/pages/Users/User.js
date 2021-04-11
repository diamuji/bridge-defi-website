import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { http } from '../../utils/utils';

export default function User(props) {
    const { id } = props;
    const [user, setUser] = useState();
    const [makeAdminDisabled, setMakeAdminDisabled] = useState(false);
    
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

    if (!user) {
        return (
            <div className="m-5">Loading...</div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-400">{user.email}</p>

            <div className="mt-5">
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
        </div>
    );
}