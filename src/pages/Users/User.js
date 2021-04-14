import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { http } from '../../utils/utils';

export default function User(props) {
    const { id } = props;
    const [user, setUser] = useState();
    const [toggleAdminDisabled, setToggleAdminDisabled] = useState(false);
    const [verifyDisabled, setVerifyDisabled] = useState(false);
    const [profilePicVisible, setProfilePicVisible] = useState(false);
    const [documentFrontVisible, setDocumentFrontVisible] = useState(false);
    const [documentRetroVisible, setDocumentRetroVisible] = useState(false);

    useEffect(() => {
        setUser();
        setToggleAdminDisabled(false);
        const fetchUser = async () => {
            const user = await http({ url: `/admin/users/${id}` });
            setUser(user);
        };
        fetchUser();
    }, [id]);

    const toggleAdmin = async () => {
        setToggleAdminDisabled(true);
        try {
            const newUserData = await http({
                method: 'PATCH',
                url: `/admin/make-admin/${id}`,
                form: {
                    isAdmin: !user.isAdmin
                }
            });
            setUser({ ...user, ...newUserData });
        } catch (e) {
            console.error(e);
            toast.error(e?.reason || `${e}`);
        }
        setToggleAdminDisabled(false);
    };

    const verify = async () => {
        setVerifyDisabled(true);
        try {
            const newUserData = await http({
                method: 'PATCH',
                url: `/admin/enable-user/${id}`,
                form: {
                    enabled: !user.enabled
                }
            });
            setUser({ ...user, ...newUserData });
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

    const { personalInfo, residenceAddress, settlementAddress, document } = {
        personalInfo: {},
        residenceAddress: {},
        settlementAddress: {},
        document: {},
        ...(user.verification || {})
    };

    return (
        <div>
            <h1 className="text-2xl">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-400 mb-5">{user.email}</p>

            <div className="grid grid-cols-4 gap-4">
                <div>
                    <label className="block text-gray-500 text-sm">E-mail confirmed</label>
                    <span className={!user.confirmed ? 'text-red-500' : ''}>{user.confirmed ? 'true' : 'false'}</span>
                </div>
                <div>
                    <label className="block text-gray-500 text-sm">Admin rights</label>
                    {user.isAdmin ? 'true' : 'false'}
                    <span
                        className={`cursor-pointer text-sm text-teal-500 hover:text-teal-400 font-bold ml-4 ${toggleAdminDisabled && 'opacity-50'}`}
                        onClick={() => !toggleAdminDisabled && toggleAdmin()}
                    >
                        {user.isAdmin ? 'Remove' : 'Grant'}
                        
                    </span>
                </div>
                <div>
                    <label className="block text-gray-500 text-sm">Enabled</label>
                    <span className={!user.enabled ? 'text-red-500' : ''}>{user.enabled ? 'true' : 'false'}</span>
                    <span
                        className={`cursor-pointer text-sm text-teal-500 hover:text-teal-400 font-bold ml-4 ${verifyDisabled && 'opacity-50'}`}
                        onClick={() => !verifyDisabled && verify()}
                    >
                        {user.enabled ? 'Disable' : 'Enable'}
                    </span>
                </div>
                <div></div>
                <div>
                    <label className="block text-gray-500 text-sm">Gender</label>
                    {personalInfo.gender || '-'}
                </div>
                <div>
                    <label className="block text-gray-500 text-sm">Birth date</label>
                    {personalInfo.birthday ? moment(personalInfo.birthday).format('LL') : '-'}
                </div>
                <div>
                    <label className="block text-gray-500 text-sm">Birth place</label>
                    {personalInfo.townOfBirth || '-'}
                </div>
                <div>
                    <label className="block text-gray-500 text-sm">Purpose of use</label>
                    {personalInfo.purposeOfUse || '-'}
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-500 text-sm">Residence address</label>
                    {[residenceAddress.street, residenceAddress.houseNumber].filter(v => v).join(',') || '-'}<br />
                    {[residenceAddress.postcode, residenceAddress.country].filter(v => v).join(' ') || '-'}
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-500 text-sm">Settlement address</label>
                    {[settlementAddress.street, settlementAddress.houseNumber].filter(v => v).join(',') || '-'}<br />
                    {[settlementAddress.postcode, settlementAddress.country].filter(v => v).join(' ') || '-'}
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-500 text-sm">Document type</label>
                    {document.documentType || '-'}
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-500 text-sm">Profile picture</label>
                    {!profilePicVisible
                        ? (
                            <div className="cursor-pointer text-teal-500" onClick={() => setProfilePicVisible(!profilePicVisible)}>
                                Show
                            </div>
                        )
                        : (
                            <div>
                                <div className="cursor-pointer text-teal-500" onClick={() => setProfilePicVisible(!profilePicVisible)}>
                                    Hide
                                </div>
                                {/* eslint-disable-next-line */}
                                {document.profilePic ? <img src={`data:image;base64,${document.profilePic}`} alt="Profile picture" /> : '-'}
                            </div>
                        )
                    }
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-500 text-sm">Document front</label>
                    {!documentFrontVisible
                        ? (
                            <div className="cursor-pointer text-teal-500" onClick={() => setDocumentFrontVisible(!documentFrontVisible)}>
                                Show
                            </div>
                        )
                        : (
                            <div>
                                <div className="cursor-pointer text-teal-500" onClick={() => setDocumentFrontVisible(!documentFrontVisible)}>
                                    Hide
                                </div>
                                {document.front ? <img src={`data:image;base64,${document.front}`} alt="Document front" /> : '-'}
                            </div>
                        )
                    }
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-500 text-sm">Document Retro</label>
                    {!documentRetroVisible
                        ? (
                            <div className="cursor-pointer text-teal-500" onClick={() => setDocumentRetroVisible(!documentRetroVisible)}>
                                Show
                            </div>
                        )
                        : (
                            <div>
                                <div className="cursor-pointer text-teal-500" onClick={() => setDocumentRetroVisible(!documentRetroVisible)}>
                                    Hide
                                </div>
                                {document.retro ? <img src={`data:image;base64,${document.retro}`} alt="Document back" /> : '-'}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}