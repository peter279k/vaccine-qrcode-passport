import React, { useState } from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

const Home = () => <span></span>;

const AddPatient = () => <h2 className="text-info">病患資料登錄</h2>;

const QueryPatient = () => <h2>病患資料查詢</h2>;

const QueryOrganization = () => <h2>查詢醫事單位</h2>;

const AddOrganization = () => <h2>新增醫事單位</h2>;

const AddImmunization = () => <h2>新增疫苗接種資料</h2>;

const QueryImmunization = () => <h2>查詢疫苗接種資料</h2>;

const AddObservation = () => <h2>新增篩檢資料</h2>;

const QueryObservation = () => <h2>查詢篩檢資料</h2>;

const FHIRServerSetting = () => <h2>FHIRServer設定</h2>;

const App = () => {

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [labelText, setLabelText] = useState('請輸入病患id');
  const [buttonText, setSearchButtonText] = useState('進階搜尋');
  const [createdDate, setCreatedDateText] = useState('');
  const [dateVisibleText, setDateVisibleText] = useState('invisible');

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    console.log('Done for filling form!');
  };

  const renderSearchTemplate = e => {
    e.preventDefault();
    if (e.currentTarget.textContent === '基本搜尋') {
      setLabelText('請輸入病患id(Patient Resource id)');
      setSearchButtonText('進階搜尋');
      setCreatedDateText('');
      setDateVisibleText('invisible');
    }
    if (e.currentTarget.textContent === '進階搜尋') {
      setLabelText('請輸入病患中文姓名');
      setSearchButtonText('基本搜尋');
      setCreatedDateText('請選擇建立資料之日期');
      setDateVisibleText('visible');
    }
  };

  const checkIdNumber = (idNumber) => {
    if (idNumber.length !== 10) {
      return '身份證字號應為10碼！';
    }
    let mappedAlphabetsNumbers = {
      'A': 10,
      'B': 11,
      'C': 12,
      'D': 13,
      'E': 14,
      'F': 15,
      'G': 16,
      'H': 17,
      'I': 34,
      'J': 18,
      'K': 19,
      'L': 20,
      'M': 21,
      'N': 22,
      'O': 35,
      'P': 23,
      'Q': 24,
      'R': 25,
      'S': 26,
      'T': 27,
      'U': 28,
      'V': 29,
      'W': 32,
      'X': 30,
      'Y': 31,
      'Z': 33,
    };
    let digits = '0123456789';
    let errorMessage = '身份證字號格式錯誤！';
    if (!Object.keys(mappedAlphabetsNumbers).includes(idNumber[0])) {
      return '身份證字號第一碼應為英文大寫數字！';
    }
    if (idNumber[1] !== '1' && idNumber[1] !== '2') {
      return '身份證字號第二碼應為1或2！';
    }
    if (!idNumber.substring(1).includes(digits)) {
      return errorMessage;
    }
    let alphabetNumStr = String(mappedAlphabetsNumbers[idNumber[0]]);
    let checkNumber = 1 * Number(alphabetNumStr[0]) +
        9 * Number(alphabetNumStr[1]) +
        8 * Number(idNumber[1]) +
        7 * Number(idNumber[2]) +
        6 * Number(idNumber[3]) +
        5 * Number(idNumber[4]) +
        4 * Number(idNumber[5]) +
        3 * Number(idNumber[6]) +
        2 * Number(idNumber[7]) +
        1 * Number(idNumber[8]) +
        1 * Number(idNumber[9]);
    console.log(checkNumber);

    return (checkNumber % 10 === 0) ? '' : errorMessage;
  };

  const findFormErrors = () => {
    const {
      idNumber,
      passportNumber,
      patientName,
      patientEnName,
      patientSex,
      patientBirthDate,
      patientHomeAddress,
      patientPhoneNumber,
    } = form;
    const newErrors = {};
    if (!idNumber || idNumber === '') {
      newErrors.idNumber = '身份證字號請勿空白！';
    }
    let validateIdNumberRes = checkIdNumber(idNumber);
    if (validateIdNumberRes !== '') {
      newErrors.idNumber = validateIdNumberRes;
    }
    if (!!passportNumber) {
      if (passportNumber.length !== 9) {
        newErrors.passportNumber = '護照號碼長度應為9！';
      }
      let pattern = /(\d+)/g;
      let validationRes = passportNumber.match(pattern);
      if (validationRes === null || validationRes.length !== 1 || validationRes[0] !== passportNumber) {
        newErrors.passportNumber = '護照號碼應只有數字！';
      }
    }
    if (!patientName || patientName === '') {
      newErrors.patientName = '病患姓名請勿空白！';
    }
    if (!patientEnName || patientEnName === '') {
      newErrors.patientEnName = '病患英文姓名請勿空白！';
    }
    if (!patientSex || patientSex === '') {
      newErrors.patientSex = '請選擇病患性別！';
    }
    if (!!patientSex) {
      if (patientSex !== 'male' && patientSex !== 'female') {
        newErrors.patientSex = '請選擇病患男性或女性！';
      }
    }
    if (!patientBirthDate || patientBirthDate === '') {
      newErrors.patientBirthDate = '請選擇病患出生日期！';
    }
    if (!patientHomeAddress || patientHomeAddress === '') {
      newErrors.patientHomeAddress = '病患住家地址不可空白！';
    }
    if (!patientPhoneNumber || patientPhoneNumber === '') {
      newErrors.patientPhoneNumber = '病患手機號碼不可空白！';
    }

    return newErrors;
  }

  return (
  <MemoryRouter>
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">歡迎來到醫院院內系統</h1>
        <h2>{' '}</h2>
          <ButtonToolbar className="custom-btn-toolbar">
            <LinkContainer to="/">
              <Button>首頁</Button>
            </LinkContainer>
            <LinkContainer to="/add_patient">
              <Button>病患資料登錄</Button>
            </LinkContainer>
            <LinkContainer to="/query_patient">
              <Button>病患資料查詢</Button>
            </LinkContainer>
            <DropdownButton className="custom-btn-toolbar" as="ButtonGroup" title="醫事單位管理" variant="secondary">
                <LinkContainer to="/add_organization">
                  <Dropdown.Item eventKey="1">新增醫事單位</Dropdown.Item>
                </LinkContainer>
                <LinkContainer to="/query_organization">
                  <Dropdown.Item eventKey="2">查詢醫事單位</Dropdown.Item>
                </LinkContainer>
            </DropdownButton>
            <DropdownButton className="custom-btn-toolbar" as="ButtonGroup" title="疫苗曁篩檢資料管理" variant="info">
              <LinkContainer to="/add_immunization">
                <Dropdown.Item eventKey="1">新增疫苗接種資料</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/query_immunization">
                <Dropdown.Item eventKey="2">查詢疫苗接種資料</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/add_observation">
                <Dropdown.Item eventKey="2">新增篩檢資料</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/query_observation">
                <Dropdown.Item eventkey="3">查詢篩檢資料</Dropdown.Item>
              </LinkContainer>
            </DropdownButton>
            <LinkContainer to="/fhir_server_setting">
              <Button variant="info">FHIRServer設定</Button>
            </LinkContainer>
          </ButtonToolbar>
      </Jumbotron>
    </Container>
    <Container className="p-3">
      <h2>{' '}</h2>
          <Switch>
            <Route path="/add_patient">
            <AddPatient />
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>請輸入病患身份證字號<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control onChange={ e => setField('idNumber', e.target.value) } type="text" placeholder="輸入身份證字號" isInvalid={ !!errors.idNumber }/>
                <Form.Control.Feedback type='invalid'>{ errors.idNumber }</Form.Control.Feedback>
                <Form.Text className="text-info">
                 此為醫事人員專用系統， 請勿任意分享身份證字號給他人
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請輸入病患護照號碼</Form.Label>
                <Form.Control onChange={ e => setField('passportNumber', e.target.value) } type="text" placeholder="輸入護照號碼" isInvalid={ !!errors.passportNumber }/>
                <Form.Control.Feedback type='invalid'>{ errors.passportNumber }</Form.Control.Feedback>
                <Form.Text className="text-info">
                 此為醫事人員專用系統， 請勿任意分享護照號碼給他人
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請輸入病患姓名<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control onChange={ e => setField('patientName', e.target.value) } type="text" placeholder="請輸入病患姓名" isInvalid={ !!errors.patientName }/>
                <Form.Control.Feedback type='invalid'>{ errors.patientName }</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請輸入病患英文姓名</Form.Label>
                <Form.Control onChange={ e => setField('patientEnName', e.target.value) } type="text" placeholder="請輸入病患英文姓名" isInvalid={ !!errors.patientEnName }/>
                <Form.Control.Feedback type='invalid'>{ errors.patientEnName }</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請輸入病患性別<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control onChange={ e => setField('patientSex', e.target.value) } as="select" custom isInvalid={ !!errors.patientSex }>
                  <option>請選擇病患性別</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{ errors.patientSex }</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請選擇病患出生日期<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control onChange={ e => setField('patientBirthDate', e.target.value) } type="date" placeholder="請選擇病患出生日期" isInvalid={ !!errors.patientBirthDate }/>
                <Form.Control.Feedback type='invalid'>{ errors.patientBirthDate }</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請輸入病患住家地址<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control onChange={ e => setField('patientHomeAddress', e.target.value) } type="text" placeholder="請輸入病患住家地址" isInvalid={ !!errors.patientHomeAddress } />
                <Form.Control.Feedback type='invalid'>{ errors.patientHomeAddress }</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>請輸入病患聯絡手機<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control onChange={ e => setField('patientPhoneNumber', e.target.value) } type="text" placeholder="請輸入病患聯絡手機" isInvalid= { !!errors.patientPhoneNumber }/>
                <Form.Control.Feedback type='invalid'>{ errors.patientPhoneNumber }</Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={ handleSubmit }>
                送出
              </Button>
            </Form>
            </Route>
            <Route path="/query_patient">
              <QueryPatient />
              <Form>
                <Form.Group className="mb-3">
                  <Button variant="info" type="button" onClick={ renderSearchTemplate }>
                    {buttonText}
                  </Button>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{labelText}<Form.Label className="text-danger">*</Form.Label></Form.Label>
                  <Form.Control type="text" placeholder={labelText}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{createdDate}</Form.Label>
                  <Form.Control type="date" className={dateVisibleText} placeholder={labelText}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={ handleSubmit }>
                  送出
                </Button>
              </Form>
            </Route>
            <Route path="/query_organization">
              <QueryOrganization />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>請輸入Organization id<Form.Label className="text-danger">*</Form.Label></Form.Label>
                  <Form.Control type="text" placeholder="請輸入Organization id"/>
                </Form.Group>
              </Form>

              <Button variant="primary" type="submit" onClick={ handleSubmit }>
                  送出
              </Button>
            </Route>
            <Route path="/add_organization">
              <AddOrganization />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>請輸入醫事代碼<Form.Label className="text-danger">*</Form.Label></Form.Label>
                  <Form.Control type="text" placeholder="請輸入醫事代碼"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>請輸入醫事單位名稱<Form.Label className="text-danger">*</Form.Label></Form.Label>
                  <Form.Control type="text" placeholder="請輸入醫事單位名稱"/>
                </Form.Group>
              </Form>

              <Button variant="primary" type="submit" onClick={ handleSubmit }>
                  送出
              </Button>
            </Route>
            <Route path="/add_immunization">
              <AddImmunization />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>請輸入醫事代碼<Form.Label className="text-danger">*</Form.Label></Form.Label>
                  <Form.Control type="text" placeholder="請輸入醫事代碼"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>請輸入醫事單位名稱<Form.Label className="text-danger">*</Form.Label></Form.Label>
                  <Form.Control type="text" placeholder="請輸入醫事單位名稱"/>
                </Form.Group>
              </Form>

              <Button variant="primary" type="submit" onClick={ handleSubmit }>
                  送出
              </Button>
            </Route>
            <Route path="/query_immunization">
              <QueryImmunization />
            </Route>
            <Route path="/add_observation">
              <AddObservation />
            </Route>
            <Route path="/query_observation">
              <QueryObservation />
            </Route>
            <Route path="/fhir_server_setting">
              <FHIRServerSetting />
              <Form.Group className="mb-3">
                <Form.Label>請輸入FIHR Server API Endpoint<Form.Label className="text-danger">*</Form.Label></Form.Label>
                <Form.Control type="text" placeholder="請輸入FIHR Server API Endpoint"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={ handleSubmit }>
                  送出
              </Button>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
    </Container>
  </MemoryRouter>
  );
};

export default App;
