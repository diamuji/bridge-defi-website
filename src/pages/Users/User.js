import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams, withRouter } from 'react-router';
import LoggedPage from '../../partials/LoggedPage';
import { http } from '../../utils/utils';
import Portfolio from '../Dashboard/Portfolio';

function User() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [toggleAdminDisabled, setToggleAdminDisabled] = useState(false);
    const [verifyDisabled, setVerifyDisabled] = useState(false);
    const [profilePicVisible, setProfilePicVisible] = useState(false);
    const [documentFrontVisible, setDocumentFrontVisible] = useState(false);
    const [documentRetroVisible, setDocumentRetroVisible] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setUser();
        setToggleAdminDisabled(false);
        const fetchUser = async () => {
            const user = await http({ url: `/admin/users/${id}` });
            setUser(user);
        };
        fetchUser();
    }, [id]);

    if (!user) {
        return (
            <LoggedPage admin>
                <div className="m-5">Loading...</div>
            </LoggedPage>
        );
    }

    const back = e => {
        e.preventDefault();
        history.push('/users');
    };
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

    const { personalInfo, residenceAddress, settlementAddress, document } = {
        personalInfo: {},
        residenceAddress: {},
        settlementAddress: {},
        document: {},
        ...(user.verification || {})
    };

    return (
        <LoggedPage admin>
            <div>
                <div className="flex flex-row items-start mb-8">
                    <a onClick={back} className="block cursor-pointer mr-3 mt-2" href="#0">
                        <svg height="24" width="24" viewBox="0 0 24 24" fill="#000000">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    </a>
                    <div className="leading-3">
                        <h1 className="text-2xl text-gray-800 font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                    <Portfolio userId={id} showConvertLink className="mx-auto" />

                    <div className="col-span-3 bg-white shadow-lg rounded border border-gray-200 text-gray-600 p-5">
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
                </div>
            </div>
        </LoggedPage>
    );
}

export default withRouter(User);