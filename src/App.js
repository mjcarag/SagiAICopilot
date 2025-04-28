import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import {ProgressBar, Button } from 'react-bootstrap';
import PDFv from './pdfviewer/pdfviewer'
import './pdfworker'

function App() {
  const [showContainer3Content, setShowContainer3Content] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startLoading, setStartLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ADD THIS
  const [progress4, setProgress4] = useState(0);
  const [startLoading4, setStartLoading4] = useState(false);
  const [showPopup4, setShowPopup4] = useState(false);

  useEffect(() => {
    let timer;
    if (startLoading && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(timer);
            setShowPopup(true);  // ✅ fixed trigger here
            return 100;
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [startLoading, progress]);


  useEffect(() => {
    let timer4;
    if (startLoading4 && progress4 < 100) {
      timer4 = setInterval(() => {
        setProgress4((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(timer4);
            setShowPopup4(true);
            return 100;
          }
          return next;
        });
      }, 40);
    }
    return () => clearInterval(timer4);
  }, [startLoading4, progress4]);


  const handleStartProgress = () => {
    setProgress(0);
    setStartLoading(true);
    setShowPopup(false); // reset popup when starting again
  };

  const handleProceed = (answer) => {
    setShowPopup(false);
    if (answer) {
      setProgress4(0);
      setStartLoading4(true);
      setShowContainer3Content(true);
      setShowPopup4(false); // just to be safe
    } else {
      alert("Action cancelled.");
    }
  };

  const loadingSteps = [
    "",
    "Initializing...",
    "Analyzing Input...",
    "Validating Parameters...",
    "Checking Database...",
    "Fetching Data...",
    "Running Computations...",
    "Verifying Integrity...",
    "Compiling Results...",
    "Finalizing Output...",
    "Complete!"
  ];
  
  const resultSteps = [
    { text: "Condition matched with Facets back-end data", bold: true},
    {parts: ["• The claim is being adjusted per a request from Legal. - ",
        { word: "No Legal Notes", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• The claim was prepriced by LifeSOURCE. - ",
        { word: "No Related Notes", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• The claim is for Medicaid Reimbursement. - ",
        { word: "Checkbox or message: None", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],},  
    {parts: ["• Provider and Facility Selection. - ",
        { word: "Rendering Provider No Data Macthed. Billing Provider Non IFP Provider OON", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Review Claim Processing checklist. - ",
        { word: "Review Claim Processing checklist", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if provider is INN or OON. - ",
        { word: "Provider is OON", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Cigna is Secondary. - ",
        { word: "Cigna is Secondary (prepay timely guidelines does not apply)", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Medicaid Reclamation claim. - ",
        { word: "no notes in warning message", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Veteran Administration Claim. - ",
        { word: "No VA in provider name", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if Adjusted or Corrected Claim. - ",
        { word: "No adjusted or Corrected claim", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• IFP account is in North Carolina (Determine if claim was received within 18 months of the DOS). - ",
        { word: "IFP-Florida", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],}, 
    {parts: ["• IFP account is NOT North Carolina (Determine if the claim was received within 15 months of the date of service). - ",
        { word: "DOS - 9/12/2024, Received Date - 4/21/2025, Less than 15 months, (Override timely filing by accessing the Claim Override screen, check Bypass Claim Accept Months with Explanation Code (EXCD) OCA)", highlight: true, color: "#377855", fontColor: "white", bold: true},],}, 
    {parts: ["• Determine if the claim has previously been sent for OON savings and/or Maximum Reimbursable Charge (MRC) pricing review. - ",
        { word: "No OON saving", highlight: true, color: "#C52E59", fontColor: "white", bold: true},],},  
    { text: " "},
    { text: "15 months Period :  DOS - 9/12/2024, Received Date - 4/21/2025, Meets the timely filing period", bold: true },
    /*{ text: "• State exceptions" },
    { text: "• Provider/Facility contract exception" },
    { text: "• Client Account level exception" },
    { text: "• Client-Specific Network (CSN) level" },
    { text: "• The claim is being adjusted per a request from Legal." },
    { text: "• The claim was prepriced by LifeSOURCE." },
    { text: "• The claim has a LifeSOURCE contracted / negotiated rate." },
    { text: "• The claim is for Medicaid reimbursement." },
    { text: "• This edit does not apply. Follow standard processing guidelines." },
    { text: "• Document the T4 Notes field with 'network prov'." },
    { text: "• Cigna is secondary, including Medicare" },
    { text: "• Medicaid Reclamation claim" },
    { text: "• Veteran Administration (VA) claim" },
    { text: "• Adjustment" },
    { text: "• Corrected claim" },
    { text: "• The timely filing starts on the last consecutive day of the confinement for inpatient admission facility charges. " },
    { text: "• The timely filing period begins with the DOS of the last visit for global maternity services." },
    { text: "• If multiple dates of service are billed, review and process per each DOS submitted." },
    { text: "• State exceptions" }, 
    { text: " "},
    
    { text: " "},
    
    /*{ text: "Claims Data Verification", bold: true },
    { text: "Patient demographic – (Match)" },
    { text: "Billed services and amounts (Match)" },
    { text: "COB" },
    { text: "Sagility AI copilot Actions", bold: true },
    { text: "Provider and Facility Selection for Prepay Edits", link: "https://example.com/auth-check" },
    { text: "Duplicates", bold: true },
    { text: "Warning messages", bold: true },
    { text: "Authorization verification", bold: true  }*/
  ];

  const visibleLinesCount = Math.floor(progress / (100 / resultSteps.length));
  const visibleResultSteps = resultSteps.slice(0, visibleLinesCount);
  const currentStepIndex = Math.min(Math.floor(progress / 10), loadingSteps.length - 1);
  const loadingMessage = loadingSteps[currentStepIndex];



  const loadingSteps2 = [
    "",
    "Initializing...",
    "Analyzing Input...",
    "Validating Parameters...",
    "Checking Date Verification...",
    "Finalizing Output...",
    "Complete!"
  ];
  
  const resultSteps2 = [
    { text: "Claims Data Verification", bold: true },
    {parts: ["Patient demographic – ",
      { word: " Matched ", highlight: true, color: "#377855", fontColor: "white", bold: true},],},
    {parts: ["Billed services and amounts – ",
      { word: " Matched ", highlight: true, color: "#377855", fontColor: "white", bold: true},],},  
    { text: "COB"},
    { text: " "},
    { text: "Sagility AI copilot Actions", bold: true },
    { text: "Provider and Facility Selection for Prepay Edits", 
      link: "#", 
      onClick: () => setShowContainer3Content(true)  },
    { text: " "},
    { text: "Duplicates", bold: true },
    { text: " "},
    { text: "Warning messages", bold: true },
    { text: "Out of Network Service Provider"},
    { text: "Possible Evicore service. Review Evicore portal for authorization"},
    { text: "Review for possible Network/Benefit Enhancement"},
    { text: " "},
  ];

  const visibleLinesCount2 = Math.floor(progress4 / (100 / resultSteps2.length));
  const visibleResultSteps2 = resultSteps2.slice(0, visibleLinesCount2);
  const currentStepIndex2 = Math.min(Math.floor(progress4 / 20), loadingSteps2.length - 1);
  const loadingMessage2 = loadingSteps2[currentStepIndex2];

  return (
    
    
    <div className="App">
 
      {/* Responsive Dark Header */}
      <header
  className="navbar navbar-expand-lg"
  style={{
    background: 'linear-gradient(to right, #003057, #009CA6)',
    padding: '12px 30px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff'
  }}
>
  <div className="container-fluid">
    

    {/* Logo */}
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt="Sagility Logo"
      style={{ height: '40px', marginLeft: '0px' }}
    />

<span className="navbar-brand mb-0 h1" style={{ color: 'white', fontWeight: '600', fontSize: '20px', fontFamily: 'Lexend', marginLeft: '620px' }}>
       AI-Powered Claim Examiner
    </span>

    <div className="d-flex ms-auto gap-3">
      <span className="nav-link text-white" style={{ cursor: 'pointer', fontWeight: 500 }}>Home</span>
      <span className="nav-link text-white" style={{ cursor: 'pointer', fontWeight: 500 }}>Settings</span>
      <span className="nav-link text-white" style={{ cursor: 'pointer', fontWeight: 500 }}>User</span>
      <span className="nav-link text-white" style={{ cursor: 'pointer', fontWeight: 500 }}>Logout</span>
    </div>
  </div>
</header>

{/* <div
  style={{
    padding: '20px 40px',
    backgroundColor: '#f4f6f9',
    borderBottom: '1px solid #ccc',
    fontFamily: 'Lexend',
    
  }}
  className="container-fluid"
>
  <Form className="d-flex align-items-center gap-3" style={{ marginBottom: '-10px', marginTop: '-10px' }}>
    <Form.Label style={{ marginBottom: '0', fontWeight: '500', fontSize: '15px' }}>
      Select Article
    </Form.Label>
    <Form.Select
      aria-label="Select Option"
      style={{
        width: '480px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '14px',
        boxShadow: 'none',
        outline: 'none',
        backgroundColor: 'white',
        fontFamily: 'Lexend',
        transition: 'border 0.3s ease-in-out'
      }}
    >
      <option value="0"></option>
      <option value="1">000017760 - Claim Processing Checklist Facets</option>
      <option value="2">000026223 - Timely Filing Deny Incorr Facets Prepay Edit</option>
      <option value="3">000049486 - Timely Filing IFP Facets Prepay Edit</option>
    </Form.Select>
  </Form>
</div> */}

      
      <Container className="mt-4" style={{ /*backgroundColor: '#f4f4f4',*/ maxWidth: '1800px' }}>
        <Row>
          <Col>
          <div className="container1" >
                


            <div className="scrollable-rounded-inner"
                style={{
                  backgroundColor: '#ffffff',
    padding: '30px',
    border: '1px solid #009CA6',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    maxHeight: '400px',
    overflowY: 'auto',
    fontFamily: 'Lexend',
    fontSize: '14px',
    lineHeight: '1.6'
                }}
              >
                {/* Title Section */}
                <div className="header-box" style={{ background: '#f1f1f1', padding: '15px 30px', fontSize: '18px', fontWeight: 'bold', border: '1px solid #54698d' }}>
                  <b>Timely Filing IFP Facets Prepay Edit</b>
                </div>

                {/* Article Information Table */}
                <div className="box">
                  <table className="table table-bordered" style={{ fontSize: '14px', width: '100%', marginTop: '20px' }}>
                    <tbody>
                      <tr>
                        <td>Article Number</td>
                        <td><a href="https://cignaknowledge.my.salesforce.com/lightning/r/Knowledge__kav/ka0Vo000000LqlBIAS/view" target="_blank" rel="noopener noreferrer">000049486</a></td>
                      </tr>
                      <tr>
                        <td>Knowledge Domain Ownership</td>
                        <td>AAPS Prepay Postpay Solutions</td>
                      </tr>
                      <tr>
                        <td>Validation Status</td>
                        <td>Verified</td>
                      </tr>
                      <tr>
                        <td>Views</td>
                        <td>1850</td>
                      </tr>
                      <tr>
                        <td>Last Modified Date</td>
                        <td>03/06/2025 01:00 AM</td>
                      </tr>
                      <tr>
                        <td>Created Date</td>
                        <td>11/10/2021 04:36 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                
                {/* Section Title */}
                <div className="article-section-title" style={{ padding: '10px 20px', background: '#f1f1f1', width: '100%', fontSize: '18px', fontWeight: 'bold', borderRadius: '5px' }}>
                  Article
                </div>
                <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '0px', textAlign: 'left' }}>Title</p>
                <p style={{ fontSize: '14px', textAlign: 'left' }}>Timely Filing IFP Facets Prepay Edit </p>

                <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0px', textAlign: 'left' }}>Summary</p>
                <p style={{ fontSize: '14px', textAlign: 'left' }}>
                The purpose of this Prepay edit is to ensure timely filing is applied correctly for Individual Family Plans (IFP).
                </p>

                <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '0px', textAlign: 'left' }}>Details - Internal</p>
                <p style={{ fontSize: '14px', textAlign: 'left', color: '#c0392b' }}>
                <i><b>Important!</b></i> The information outlined in this article should be followed in addition to standard processes and account specifics.
                </p>

                <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0px', textAlign: 'left' }}>Edit Notes:</p>
                <ul style={{ fontSize: '14px', textAlign: 'left' }}>
                    <li>This article is for Prepay use only; F344</li>
                    <li>This is a Total Quality (TQ)/Underpayment edit.</li>
                    <li>When the claim date of service (DOS) is prior to July 11, 2023, refer to the <a href="https://cignaknowledge.my.salesforce.com/articles/Knowledge/Prepay-Timely-Filing-Pre-COVID-and-COVID-Calculation" target="_blank" rel="noopener noreferrer">Prepay Timely Filing Pre-COVID and COVID Calculation</a> article to determine if the claim was received within the applicable IFP timely filing period.</li>
                    <li>•	Cigna standard will apply whichever of the following allows the maximum number of days: </li>
                      <ul style={{ fontSize: '14px', textAlign: 'left' }}>
                        <li>State exceptions</li>
                        <li>Provider/Facility contract exception</li>
                        <li>Client Account level exception</li>
                        <li>Client-Specific Network (CSN) level</li>
                      </ul>
                </ul>

                <ol style={{ fontSize: '14px', textAlign: 'left' }}>
                  <li>After viewing the claim submission, determine if any of the following exclusions apply:</li>
                  <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>The claim is being adjusted per a request from Legal.</li>
                        <li>The claim was prepriced by LifeSOURCE.</li>
                        <li>The claim has a LifeSOURCE contracted / negotiated rate.</li>
                        <li>The claim is for Medicaid reimbursement.</li>
                </ul>

                <p style={{marginBottom: '0px'}}><b>No:</b> Go to the next step. </p>
                <p><b>Yes:</b> This edit does not apply.  Follow standard processing guidelines.</p>

                <li>Verify provider selection on the claim is correct by referring to the <a href="https://cignaknowledge.my.salesforce.com/articles/Knowledge/Review-Provider-Selection" target="_blank" rel="noopener noreferrer">Provider and Facility Selection for Prepay Edits</a> article.</li>
                  <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>Make any necessary corrections and return to this edit.</li>
                        <li>Go to the next step.</li>
                </ul>

                <li style={{marginBottom: '15px'}}>Determine if the provider is In-Network (INN) or Out-of-Network (OON) with Cigna. </li>
                  
                <p style={{marginBottom: '0px'}}><b>OON:</b> Go to the next step. </p>
                <p><b>INN:</b> </p>
                  
                  <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>This edit does not apply. Follow standard processing guidelines.</li>
                        <li>Document the T4 Notes field with "network prov”.</li>
                </ul>

                <li>Determine if any of the following apply to the claim. </li>
                  <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>Cigna is secondary, including Medicare</li>
                        <li>Medicaid Reclamation claim</li>
                        <li>Veteran Administration (VA) claim</li>
                        <li>Adjustment</li>
                        <li>Corrected claim</li>
                </ul>

                <p style={{marginBottom: '0px'}}><b>No:</b> Go to the next step. </p>
                <p><b>Yes:</b> This edit does not apply.  Follow standard processing guidelines.</p>


                <li style={{marginBottom: '15px'}}>Use the following to process the claim.</li>  
                <p style={{marginBottom: '0px'}}><b>Notes:</b></p>
                <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>The timely filing starts on the last consecutive day of the confinement for inpatient admission facility charges.  </li>
                        <li>The timely filing period begins with the DOS of the last visit for global maternity services.</li>
                        <li>If multiple dates of service are billed, review and process per each DOS submitted.</li>
                </ul>
                <p style={{marginBottom: '15px'}}><b>IFP Account is North Carolina:</b> Determine if the claim was received within 18 months of the date of service. </p>
                <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '25px' }}>
                        <li><b>No:</b>Go to the next step.</li>
                        <li><b>Yes:</b></li>

                        <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>Override timely filing by accessing the <b>Claim Override</b> screen, check <b>Bypass Claim Accept Months</b> with Explanation Code (EXCD) OCA.</li>
                        <li>Follow standard processing guidelines.</li>
                        <li>Go to the Out-of-network (OON) savings step.</li>
                </ul>
                </ul>

                <p style={{marginBottom: '15px'}}><b>IFP Account is NOT North Carolina:</b> Determine if the claim was received within 15 months of the date of service. </p>
                <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li><b>No:</b>Go to the next step.</li>
                        <li><b>Yes:</b></li>

                        <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '25px' }}>
                        <li>Override timely filing by accessing the <b>Claim Override</b> screen, check <b>Bypass Claim Accept Months</b> with Explanation Code (EXCD) OCA.</li>
                        <li>Follow standard processing guidelines.</li>
                        <li>Go to the OON savings step.</li>
                </ul>
                </ul>
                


                <li style={{marginBottom: '15px'}}>Determine if any of the following apply to the claim. </li>
                <p style={{marginBottom: '15px'}}><b>Notes:</b> Ensure that timely filing is reviewed using all current timely filing rules in the <b>Summary Notes.</b></p>
                <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '25px' }}>
                        <li><b>No:</b>This edit does not apply. Follow standard processing guidelines. </li>
                        <li><b>Yes:</b></li>

                        <ul style={{ fontSize: '14px', textAlign: 'left', marginBottom: '15px' }}>
                        <li>Override timely filing by accessing the <b>Claim Override</b> screen, check <b>Bypass Claim Accept Months</b> with Explanation Code (EXCD) OCA.</li>
                        <li>Follow standard processing guidelines.</li>
                        <li>Go to the next step.</li>
                </ul>
                </ul>
                </ol>
                


              </div>
              

              <div 
              style={{
                backgroundColor: '#ffffff',
                padding: '40px',
                border: '1px solid #009CA6',
                borderRadius: '10px',
                boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)',
                textAlign: 'left',
                maxHeight: '350px', // Set max height here
                overflowY: 'auto'   // Enable vertical scrolling when content exceeds max height
              }}
            >
              
              <div style={{ margin: '-30px 0' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}></label>
                <textarea
                  rows="14"
                  cols="50"
                  placeholder=""
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>


            </div>

           </div>
            
          </Col>

          {/* Placeholder for additional columns */}
          <Col>
            <div style={{}}>
            
                <div className="scrollable-rounded-inner" style={{
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  border: '1px solid #009CA6',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  textAlign: 'left',
                  fontFamily: 'Lexend',
                  fontSize: '14px',
                  maxHeight: '380px',
                  marginBottom: '20px',
                  overflowY: 'auto'
                }}>
              
              <div style={{ marginBottom: '5px', fontStyle: 'italic', color: '#444' }}>{loadingMessage}</div>
  <ProgressBar
    now={progress}
    variant="info"
    style={{ height: '18px', borderRadius: '5px' }}
  />

                  {visibleResultSteps.length > 0 && (
                      <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '14px' }}>
                        {visibleResultSteps.map((line, index) => (
                          <p key={index} style={{ marginBottom: '3px' }}>
                            {line.link ? (
                                        <a
                                          href={line.link}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            if (line.onClick) line.onClick();
                                          }}
                                          style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}
                                        >
                                          {line.parts ? (
                                            line.parts.map((part, idx) =>
                                              typeof part === "string" ? part : (
                                                <span
                                                      key={idx}
                                                      style={{
                                                        backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
                                                        color: part.fontColor || 'inherit',
                                                        fontWeight: part.bold ? 'bold' : 'normal'
                                                      }}
                                                    >
                                                      {part.word}
                                                    </span>
                                                                                                  )
                                                                                                )
                                                                                              ) : line.bold ? <b>{line.text}</b> : line.text}
                                                                                            </a>
                                                                                          ) : line.parts ? (
                                                                                            line.parts.map((part, idx) =>
                                                                                              typeof part === "string" ? part : (
                                                                                                <span
                                                      key={idx}
                                                      style={{
                                                        backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
                                                        color: part.fontColor || 'inherit',
                                                        fontWeight: part.bold ? 'bold' : 'normal'
                                                      }}
                                                    >
                                                      {part.word}
                                                    </span>
                                          )
                                        )
                                      ) : line.bold ? <b>{line.text}</b> : line.text}
                          </p>
                        ))}
                      </div>
                    )}
                </div>
                
                <div className="scrollable-rounded-inner" style={{
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  border: '1px solid #009CA6',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  textAlign: 'left',
                  fontFamily: 'Lexend',
                  fontSize: '14px',
                  maxHeight: '370px',
                  overflowY: 'auto'
                }}>
              
              <div style={{ marginBottom: '5px', fontStyle: 'italic', color: '#444' }}>{loadingMessage2}</div>
  <ProgressBar
    now={progress4}
    variant="info"
    style={{ height: '18px', borderRadius: '5px' }}
  />
                
                    {visibleResultSteps2.length > 0 && (
                      <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '14px' }}>
                        {visibleResultSteps2.map((line, index) => (
                          <p key={index} style={{ marginBottom: '3px' }}>
                          {line.link ? (
                                      <a
                                        href={line.link}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (line.onClick) line.onClick();
                                        }}
                                        style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}
                                      >
                                        {line.parts ? (
                                          line.parts.map((part, idx) =>
                                            typeof part === "string" ? part : (
                                              <span
key={idx}
style={{
  backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
  color: part.fontColor || 'inherit',
  fontWeight: part.bold ? 'bold' : 'normal'
}}
>
{part.word}
</span>
                                            )
                                          )
                                        ) : line.bold ? <b>{line.text}</b> : line.text}
                                      </a>
                                    ) : line.parts ? (
                                      line.parts.map((part, idx) =>
                                        typeof part === "string" ? part : (
                                          <span
key={idx}
style={{
  backgroundColor: part.highlight ? (part.color || 'yellow') : 'transparent',
  color: part.fontColor || 'inherit',
  fontWeight: part.bold ? 'bold' : 'normal'
}}
>
{part.word}
</span>
                                        )
                                      )
                                    ) : line.bold ? <b>{line.text}</b> : line.text}
                        </p>
                      ))}
                      </div>
                    )}

                </div>    
              
            </div>
          </Col>

          
          <Col>
          <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #009CA6', textAlign: 'left', borderRadius: '10px', boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)', }}>
                  {showContainer3Content ? (
                    <div className="box">
                              
                            
                      <PDFv/>


                    </div>
                  ) : (
                    <p style={{ fontStyle: 'italic', color: '#555' }}></p>
                  )}
                </div>
          </Col>
        </Row>
      </Container>

      
      <div style={{ marginTop: '10px', textAlign: 'left' }} className="container-fluid">

      <button
          onClick={handleStartProgress}
          className="btn btn-primary"
          style={{ width: '200px', paddingTop: '5px', height: '40px', marginLeft: '60px' }}
        >
          Summarize Article
        </button>
             
        </div>

                      {/* POPUP Modal after 100% */}
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: '0', left: '0',
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: '400px'
          }}>
            <h5>Condition match complete!</h5>
            <p>Would you like to proceed to Claims Data Verification?</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button style={{width: '80px'}} className="btn btn-success" onClick={() => handleProceed(true)}>Yes</button>
              <button style={{width: '80px'}} className="btn btn-secondary" onClick={() => handleProceed(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );
}

export default App;
