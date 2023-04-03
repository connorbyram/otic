import { useState, useRef } from "react";

export default function AddTracksForm() {
    const fileInputRef = useRef();
    return (
        <>
            <form action="">
                <label>Add a Track:</label>
                <input 
                    type="file"
                    name="track"
                    ref={fileInputRef}
                    accept=".wav, .mp3"
                />
            </form>
        </>
    );
}