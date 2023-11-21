import Spinner from 'react-bootstrap/Spinner';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const axiosHeader = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "4395f6b5f7644ae8b98528673dea181d",
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
})

const AudioRecorder = ({ newAudioData }) => {
    const recorder = useRef(null);
    const audioPlayer = useRef(null);
    const [blobURL, setBlobUrl] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [isRecording, setIsRecording] = useState(null);

    useEffect(() => {
        recorder.current = new MicRecorder({ bitRate: 128 })
    }, [])

    const startRecording = () => {
        recorder.current.start().then(() => {
            setIsRecording(true)
        })
    }

    const stopRecording = () => {
        recorder.current
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, "audio.mp3", {
                    type: blob.type,
                    lastModified: Date.now(),
                })
                const newBlobUrl = URL.createObjectURL(blob)
                setBlobUrl(newBlobUrl)
                setIsRecording(false)
                setAudioFile(file)
            })
            .catch((e) => console.log(e))
    }

    // AssemblyAI API

    const [uploadURL, setUploadURL] = useState("")
    const [transcriptID, setTranscriptID] = useState("")
    const [transcriptData, setTranscriptData] = useState("")
    const [transcript, setTranscript] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (audioFile) {
            axiosHeader
                .post("/upload", audioFile)
                .then((res) => setUploadURL(res.data.upload_url))
                .catch((err) => console.error(err))
        }
    }, [audioFile])

    const submitTranscriptionHandler = () => {

        alert('Voice memo sent for transcription! 😎 Please wait.');

        axiosHeader
            .post("/transcript", {
                audio_url: uploadURL,
            })
            .then((res) => {
                setTranscriptID(res.data.id)

                checkStatusHandler()
            })
            .catch((err) => console.error(err))
    }

    const checkStatusHandler = async () => {
        setIsLoading(true)
        try {
            await axiosHeader.get(`/transcript/${transcriptID}`).then((res) => {
                setTranscriptData(res.data)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (transcriptData.status !== "completed" && isLoading) {
                checkStatusHandler()
            } else {
                setIsLoading(false)
                setTranscript(transcriptData.text)
                newAudioData(transcriptData.text)
                clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)
    },)

    return (
        <div className="audio-recorder">
            <h3 className="tool-tip">Voice Memo
                <div className="tool-tip-text">Press start to record, and stop when finished. Then hit submit to send as a message.</div>
            </h3>
            <audio ref={audioPlayer} src={blobURL} controls='controls' />
            <div>
                <button
                    disabled={isRecording}
                    style={isRecording ? { backgroundColor: 'gray' } : {}}
                    onClick={startRecording}
                >
                    Start
                </button>
                <button
                    disabled={!isRecording}
                    style={!isRecording ? { backgroundColor: 'gray' } : {}}
                    onClick={stopRecording}
                >
                    Stop
                </button>
                <button onClick={submitTranscriptionHandler}>Submit</button>
            </div>
            {transcriptData.status === "completed" ? null : (
                <div>
                    <p>{transcriptData.status}</p>
                    <Spinner animation="border" />
                </div>
            )}
        </div>
    )
}

export default AudioRecorder;