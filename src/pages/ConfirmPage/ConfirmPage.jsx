import { useState } from 'react';
import AuthPage from "../AuthPage/AuthPage";
import { set } from 'mongoose';

export default function ConfirmPage({ setUser }) {
    const [confirmPage, setConfirmPage] = useState(true);

    return (
        <AuthPage setUser={setUser} confirmPage={confirmPage}/>
    );
}