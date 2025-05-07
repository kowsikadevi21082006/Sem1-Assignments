import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '../components/CommonModal';
import { clientGQL } from '../utils';
import PDFViewer from 'pdf-viewer-reactjs'

function Home() {
    const refNumber = useRef('');
    const [modal, showModal] = useState(false);
    const [response, setResponse] = useState({});
    const [aadhaar, setAadhaar] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [signedFile, setSignedFile] = useState(null);

    useEffect(() => {
        let refNumberNew = uuidv4()
        refNumber.current = refNumberNew;
    }, [])

    window.addEventListener('submit', (e) => {
        showModal(true);
        // Start Polling DB for response

        let pollInterval = setInterval(async () => {
            let dbRes = await clientGQL(`query MyQuery {
                esign_poc(where: {ref_number: {_eq: "${refNumber.current}"}}) {
                  created_at
                  error_message
                  id
                  ref_number
                  signed_data
                  status
                  transaction_number
                  updated_at
                }
              }
              `, {});
            console.log("DATA -->", dbRes.data)
            if (dbRes?.data?.data?.esign_poc?.length) {
                if (dbRes?.data?.data?.esign_poc?.[0].status != 'Failure') {

                    // Checking if signed using correct Aadhaar
                    let signData = await axios.get(`https://demosignergateway.emsigner.com/api/GetCertificatedata?Authtoken=fb896a7b-1b4f-42b3-b9e5-22943cc5972e&Transactionnumber=${dbRes?.data?.data?.esign_poc?.[0].transaction_number}&Referencenumber=${dbRes?.data?.data?.esign_poc?.[0].ref_number}`)
                    console.log("SIGN DATA --->", signData?.data?.Value)

                    // Comparing last 4 digits of aadhaar
                    if (aadhaar.slice(8) == signData?.data?.Value?.LastFourDigitsofAadhar) {
                        setResponse(dbRes?.data?.data?.esign_poc?.[0]);
                        showModal(false);
                        let fileBlob = converBase64toBlob(dbRes?.data?.data?.esign_poc?.[0].signed_data, 'application/pdf');
                        var blobURL = URL.createObjectURL(fileBlob);
                        setSignedFile(blobURL);
                        clearInterval(pollInterval);
                    } else {
                        // If Document is signed using some other Adhaar
                        setResponse({
                            status: 'Failure',
                            error_message: 'Please sign the document using your Aadhaar only',
                            ref_number: dbRes?.data?.data?.esign_poc?.[0].ref_number,
                            transaction_number: dbRes?.data?.data?.esign_poc?.[0].transaction_number
                        })
                        showModal(false);
                        clearInterval(pollInterval);
                    }
                } else {
                    setResponse(dbRes?.data?.data?.esign_poc?.[0]);
                    showModal(false);
                    clearInterval(pollInterval);
                }
            }
        }, 5000)

    })


    const handleFileUpload = (e) => {
        console.log(e.target.files[0])
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFile(reader.result.slice(28))
        };
        reader.onerror = function (error) {
            alert('Unable to read file!')
            setName('')
            setFile(null);
        };
    }

    function converBase64toBlob(content, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        var byteCharacters = window.atob(content); //method which converts base64 to binary
        var byteArrays = [
        ];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {
            type: contentType
        }); //statement which creates the blob
        return blob;
    }

    return (
        <div className="App">
            <div className='title'>E-Sign POC</div>
            {Object.keys(response)?.length == 0 && <div className='formInput'>
                <div>Aadhaar <input type={"text"} placeholder="Aadhaar Number" onChange={e => setAadhaar(e.target.value)} value={aadhaar} /></div>
                <div>Name <input type={"text"} placeholder="Your Name" onChange={e => setName(e.target.value)} value={name} /></div>
                <div>Document <input type={"file"} accept="application/pdf" onChange={handleFileUpload} /></div>
                {aadhaar?.length == 12 && name && file && <form action={`${process.env.REACT_APP_ESIGN_GATEWAY_URL}`} target='_blank' id="frmdata" method="post" >
                    <input id="Name" name="Name" type="hidden" value={name} />
                    <input id="FileType" name="FileType" type="hidden" value="PDF" />
                    <input id="File" name="File" type="hidden" value={file} />
                    <input id="ReferenceNumber" name="ReferenceNumber" type="hidden" value={refNumber.current} />
                    <input id="SelectPage" name="SelectPage" type="hidden" value="FIRST" />
                    <input id="SignatureType" name="SignatureType" type="hidden" value="0" />
                    <input id="SignaturePosition" name="SignaturePosition" type="hidden" value="Bottom-Right" />
                    <input id="SignatureMode" name="SignatureMode" type="hidden" value="12" />
                    <input id="AuthToken" name="AuthToken" type="hidden" value={`${process.env.REACT_APP_ESIGN_AUTH_TOKEN}`} />
                    <input id="AuthenticationMode" name="AuthenticationMode" type="hidden" value="1" />
                    <input id="PageNumber" name="PageNumber" type="hidden" value="" />
                    <input id="SUrl" name="SUrl" type="hidden" value={`${process.env.REACT_APP_ESIGN_CALLBACK_URL}/success`} />
                    <input id="FUrl" name="FUrl" type="hidden" value={`${process.env.REACT_APP_ESIGN_CALLBACK_URL}/failure`} />
                    <input id="CUrl" name="CUrl" type="hidden" value={`${process.env.REACT_APP_ESIGN_CALLBACK_URL}/failure`} />
                    <input id="eSign_SignerID" name="eSign_SignerID" type="hidden" value="" />
                    <button class="btn btn-primary" type="submit" name="formAction2" id="btnEsignKYC" value="EsignWithASP">Start Signing</button>
                </form>}
            </div>}
            {Object.keys(response)?.length > 0 && response.status == "Success" &&
                <>
                    <div className='esign-text'>Your document is signed successfully ✅ </div>
                    <div style={{ color: '#fff', marginTop: 10 }}>Transaction ID: {response.transaction_number}</div>
                    <div style={{ color: '#fff', marginTop: 5 }}>Reference No: {response.ref_number}</div>
                    <div style={{ padding: "0.5rem 2rem", borderRadius: 5, cursor: 'pointer', background: '#ffc119', color: '#000', marginTop: 30 }} onClick={() => window.open(signedFile)}>Download Signed Document</div>
                </>
            }
            {Object.keys(response)?.length > 0 && response.status == "Failure" &&
                <>
                    <div className='esign-text'>Unable to E-Sign your document 😕</div>
                    <div style={{ color: 'red' }}>{response.error_message}</div>
                    <div style={{ color: '#fff', marginTop: 20 }}>Transaction ID: {response.transaction_number}</div>
                    <div style={{ color: '#fff', marginTop: 5 }}>Reference No: {response.ref_number}</div>
                </>
            }
            {modal && <CommonModal>
                <div className='loading-section'>
                    <div class="loader"></div>
                    <p style={{ marginTop: 30 }}> Please complete E-Sign process on E-Mudhra portal</p>
                </div>
            </CommonModal>}
        </div>
    );
}

export default Home;

