import { useContext, useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from 'utils/apiRequest';
import { UserRoutes } from 'utils/types';
import { StyledContainerLogReg } from 'utils/logRegStyles';
import { Context } from 'App';
import styled from 'styled-components';

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '527px !important',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'initial',
      },
      '&:hover fieldset': {
        borderColor: '#EF2C1A', // Boja obruba prilikom hover-a
      },
      '&.Mui-focused fieldset': {
        borderColor: '#EF2C1A', // Boja obruba prilikom fokusa
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent', // Boja obruba prilikom fokusa
    },
    },
    '& .MuiInputLabel-root': {
      color: 'initial',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#EF2C1A', // Boja label-e prilikom fokusa
    },
  }));

const StyledTitle = styled(Typography)`
    padding: 30px 0px;
    color: red;
`
const LeftAlignedBox = styled(Box)`
  text-align: left !important;
  width: 100%;
  margin-left: 2px !important; 
`;

const FlexBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Ensure left alignment
  width: 100%;
  padding-left: 2px; // Adjust as needed
`;

const validateEmail = (email: string) => {
    // Simple email validation pattern
    return /\S+@\S+\.\S+/.test(email);
};

const RegistrationPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [eightChar, setEightchar] = useState(false);
    const [capitalLetter, setCapitalLetter] = useState(false);
    const [lowerLetter, setLowerLetter] = useState(false);
    const [twoNumbers, setTwoNumbers] = useState(false);
    const [specChar, setSpecChar] = useState(false);

    const [userData, setUserData] = useState({
        email: '',
        telefon: '',
        brojRacuna: '',
        aktivacioniKod: '',
        lozinka: '',
        ponovljenaLozinka: '',
    });
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();
    const ctx = useContext(Context);
    // Add validation and step change logic here
    const handleNextStep = () => {
        if (currentStep === 1 && validateFieldsStepOne()) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2 && validateFieldsStepTwo()) {
            setCurrentStep(currentStep + 1);
        }
        // You can add more else if blocks for further steps if needed
    };

    const handleGenerateCode = async () => {
        try {
            await makeApiRequest(UserRoutes.user_generate_login, "POST", { email: userData.email.toLowerCase() }, true, true, ctx)
        }
        catch (e) {
        }
    };

    const validateFieldsStepOne = () => {
        let newErrors = {};
        // Email validation
        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors = { ...newErrors, email: 'Neispravna email adresa.' };
        }
        // Phone validation
        if (!/^\+?\d+$/.test(userData.telefon)) {
            newErrors = { ...newErrors, telefon: 'Telefon može sadržati samo brojeve i opcionalno + na početku.' };
        }
        // Account number validation
        if (userData.brojRacuna.length !== 18 || !/^\d+$/.test(userData.brojRacuna)) {
            newErrors = { ...newErrors, brojRacuna: 'Broj računa mora imati 18 cifara.' };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateFieldsStepTwo = () => {
        let newErrors = {};
        // Activation code validation
        if (!userData.aktivacioniKod || userData.aktivacioniKod.length === 0) {
            newErrors = { ...newErrors, aktivacioniKod: 'Aktivacioni kod je obavezan.' };
        }
        // In a real application, you might also want to verify the code's correctness here by calling the backend

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            setEightchar(false)
        } else{
            setEightchar(true)
        }
        if (!/^(?=.*[A-Z]).+$/.test(password)) {
            setCapitalLetter(false)
        }else{
            setCapitalLetter(true)
        }
        if (!/^(?=.*[a-z]).+$/.test(password)) {
            setLowerLetter(false)
        }else{
            setLowerLetter(true)
        }
        if (!/(?=.*\d.*\d)/.test(password)) {
            setTwoNumbers(false)
        }else{
            setTwoNumbers(true)
        }
        if (!/(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(password)) {
            setSpecChar(false)
        }else{
            setSpecChar(true)
        }
    };

    const validateFieldsStepThree = () => {
        let newErrors = {};
        // Password validation
        if (!userData.lozinka || userData.lozinka.length < 8) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati najmanje 8 karaktera.' };
        }
        if (userData.lozinka.length > 32) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati najmanje 6 karaktera.' };
        }
        if (!/^(?=.*[A-Z]).+$/.test(userData.lozinka)) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati bar jedno veliko slovo.' };
        }
        if (!/^(?=.*[a-z]).+$/.test(userData.lozinka)) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati bar jedno malo slovo.' };
        }
        if (!/(?=.*\d.*\d)/.test(userData.lozinka)) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati bar dva broja.' };
        }
        if (!/(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(userData.lozinka)) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati bar jedan specijalni karakter.' };
        }
        if (userData.lozinka !== userData.ponovljenaLozinka) {
            newErrors = { ...newErrors, ponovljenaLozinka: 'Lozinke se ne poklapaju.' };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistration = async () => {
        // This would be a good place to validate all fields across all steps
        if (validateFieldsStepOne() && validateFieldsStepTwo() && validateFieldsStepThree()) {
            try {
                await makeApiRequest(UserRoutes.user_register, "POST", { email: userData.email, brojTelefona: userData.telefon, brojRacuna: userData.brojRacuna, password: userData.lozinka, code: userData.aktivacioniKod }, true, false, ctx)
                alert("Uspeh");
                navigate('/login')
            } catch (e) {
                alert("Navigacija");
            }
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        if(field === 'lozinka'){
            validatePassword(value)
        }
        // Apply transformations like capitalization for names here if necessary
        if (field === 'email' && !validateEmail(value)) {
            setErrors({ ...errors, email: 'Email adresa nije validna.' });
        } else {
            let newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }

        setUserData({ ...userData, [field]: value });
        // Add field-specific validation logic here, updating the `errors` state as needed
    };


    if (currentStep === 1) {
        return (
            <StyledContainerLogReg component="main" maxWidth="sm">
            <style type="text/css">
                {`
                   body {
                         background-image: url("backgground.jpg");
                          background-size: cover;
                    }
                `}
            </style>
                <Typography component="h1" variant="h5" sx={{color:'red'}}>Registracija korisnika - Korak 1</Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <StyledTextField
                        required
                        fullWidth
                        id="email"
                        label="Email adresa"
                        name="email"
                        autoComplete="email"
                        value={userData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 2, color:'red' }}
                    />
                    <StyledTextField
                        required
                        fullWidth
                        id="telefon"
                        label="Broj telefona"
                        name="telefon"
                        autoComplete="tel"
                        value={userData.telefon}
                        onChange={(e) => handleFieldChange('telefon', e.target.value)}
                        error={!!errors.telefon}
                        helperText={errors.telefon}
                        sx={{ mb: 2, color:'red' }}
                    />
                    <StyledTextField
                        required
                        fullWidth
                        id="brojRacuna"
                        label="Broj računa"
                        name="brojRacuna"
                        autoComplete="bank-account"
                        value={userData.brojRacuna}
                        onChange={(e) => handleFieldChange('brojRacuna', e.target.value)}
                        error={!!errors.brojRacuna}
                        helperText={errors.brojRacuna}
                        sx={{ mb: 2, color:'red' }}
                    />

                    <Button variant="contained" onClick={handleNextStep} fullWidth sx={{ mt: 3, mb: 2, color:'white', backgroundColor:'#AC190C',
                        '&:hover': {
                            backgroundColor: '#EF2C1A', 
                          },
                     }}>
                        Nastavi
                    </Button>
                </Box>
            </StyledContainerLogReg>
        );
    } else if (currentStep === 2) {
        return (
            <StyledContainerLogReg component="main" maxWidth="sm">
            <style type="text/css">
                {`
                   body {
                         background-image: url("backgground.jpg");
                          background-size: cover;
                    }
                `}
            </style>
                <Typography component="h1" variant="h5" sx={{color:'red'}}>Registracija korisnika - Korak 2</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <StyledTextField
                        required
                        fullWidth
                        id="aktivacioniKod"
                        label="Aktivacioni kod"
                        name="aktivacioniKod"
                        value={userData.aktivacioniKod}
                        onChange={(e) => handleFieldChange('aktivacioniKod', e.target.value)}
                        error={!!errors.aktivacioniKod}
                        helperText={errors.aktivacioniKod || "Unesite kod koji ste dobili."}
                        sx={{ mb: 1 }}
                    />
                    <Button variant="contained" onClick={handleGenerateCode} sx={{ mt: 1, mb: 2, color:'white', backgroundColor:'#AC190C',
                        '&:hover': {
                            backgroundColor: '#EF2C1A', 
                          },
                     }}>
                        Generiši kod
                    </Button>
                    <Button variant="contained" onClick={handleNextStep} fullWidth sx={{ mt: 3, mb: 2, color:'white', backgroundColor:'#AC190C',
                        '&:hover': {
                            backgroundColor: '#EF2C1A', 
                          },
                     }}>
                        Nastavi
                    </Button>
                </Box>
            </StyledContainerLogReg>
        );
    } else if (currentStep === 3) {
        return (
            <StyledContainerLogReg component="main" maxWidth="sm">
            <style type="text/css">
                {`
                   body {
                         background-image: url("backgground.jpg");
                          background-size: cover;
                    }
                `}
            </style>
                <StyledTitle variant="h5" sx={{color:'red'}}>Registracija korisnika - Korak 3</StyledTitle>
                <FlexBox>
                    <Typography fontWeight={'bold'} color={eightChar?'green':'red'} variant="body2">• Lozinka mora imati bar 8 karaktera</Typography>
                    <Typography fontWeight={'bold'} color={capitalLetter?'green':'red'} variant="body2">• Lozinka mora imati bar jedno veliko slovo</Typography>
                    <Typography fontWeight={'bold'} color={lowerLetter?'green':'red'} variant="body2">• Lozinka mora imati bar jedno malo slovo</Typography>
                    <Typography fontWeight={'bold'} color={twoNumbers?'green':'red'} variant="body2">• Lozinka mora imati bar dva broja</Typography>
                    <Typography fontWeight={'bold'} color={specChar?'green':'red'} variant="body2">• Lozinka mora imati bar jedan specijalni karakter</Typography>
                </FlexBox>

                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <StyledTextField
                        required
                        fullWidth
                        id="lozinka"
                        label="Lozinka"
                        name="lozinka"
                        type="password"
                        value={userData.lozinka}
                        onChange={(e) => handleFieldChange('lozinka', e.target.value)}
                        error={!!errors.lozinka}
                        helperText={errors.lozinka}
                        sx={{ mb: 2 }}
                    />
                    <StyledTextField
                        required
                        fullWidth
                        id="ponovljenaLozinka"
                        label="Ponovi lozinku"
                        name="ponovljenaLozinka"
                        type="password"
                        value={userData.ponovljenaLozinka}
                        onChange={(e) => handleFieldChange('ponovljenaLozinka', e.target.value)}
                        error={!!errors.ponovljenaLozinka}
                        helperText={errors.ponovljenaLozinka}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleRegistration} fullWidth sx={{ mt: 3, mb: 2, color:'white', backgroundColor:'#AC190C',
                        '&:hover': {
                            backgroundColor: '#EF2C1A', 
                          },
                     }}>
                        Registruj se
                    </Button>
                </Box>
            </StyledContainerLogReg>
        );
    }

    return <div></div>

};


export default RegistrationPage;