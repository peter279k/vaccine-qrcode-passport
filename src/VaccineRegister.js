import Axios from 'axios';


var vaccineRegisterUrl = '/api/RegisterVaccine';

export function vaccineRegisterSubmit(requestPayload, setVisibleText, setVisibleProgressBarText, setResponseText, setErrorResponseText) {
    setVisibleProgressBarText('visible');
    setVisibleText('visible');

    Axios.post(process.env.REACT_APP_API_ADDRESS + vaccineRegisterUrl, requestPayload).then((response) => {
        setResponseText(response.data.result);
        setVisibleProgressBarText('invisible');
    }).catch((error) => {
        console.log(error);
        let errResponseMessage = error.response.message;
        setErrorResponseText(errResponseMessage);
        setVisibleText('visible');
        setVisibleProgressBarText('invisible');
    });
};

const VaccineRegister = {
    vaccineRegisterSubmit,
};

export default VaccineRegister;
