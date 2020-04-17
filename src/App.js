import React, { useState } from 'react';
import useClipboard from "react-use-clipboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Row from 'react-bootstrap/Row'

export function App({ initialData }) {
  const [characters, setCharacters] = useState("");
  const [charNumber, setCharNumber] = useState("");
  const [isCheckedNum, setIsCheckedNum] = useState(true);
  const [isCheckedAlpha, setIsCheckedAlpha] = useState(true);
  const [isCheckedSym, setIsCheckedSym] = useState(true);
  const [isCopied, setCopied] = useClipboard(`${characters}`);

  const checkedTrueFalseNum = () => setIsCheckedNum(!isCheckedNum);
  const checkedTrueFalseAlpha = () => setIsCheckedAlpha(!isCheckedAlpha);
  const checkedTrueFalseSym = () => setIsCheckedSym(!isCheckedSym);

  const s1 = "1234567890";
  const s2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const s3 = "#$%&()+,-./:;<=>?@^_~";

  function randomizer(l, s1, s2, s3) {
    let text = "";
    if (!isCheckedAlpha && !isCheckedSym) {
      for (var i = 0; i < l; i++) {
        text += s1.charAt(Math.floor(Math.random() * s1.length));
      }
    }
    else if (!isCheckedNum && !isCheckedSym) {
      for (var i = 0; i < l; i++) {
        text += s2.charAt(Math.floor(Math.random() * s2.length));
      }
    }
    else if (!isCheckedNum && !isCheckedAlpha) {
      for (var i = 0; i < l; i++) {
        text += s3.charAt(Math.floor(Math.random() * s3.length));
      }
    }
    else if (!isCheckedNum) {
      const doubleString1 = s2.concat(s3);
      for (var i = 0; i < l; i++) {
        text += doubleString1.charAt(Math.floor(Math.random() * doubleString1.length));
      }
    }
    else if (!isCheckedAlpha) {
      const doubleString2 = s1.concat(s3);
      for (var i = 0; i < l; i++) {
        console.log(doubleString2)
        text += doubleString2.charAt(Math.floor(Math.random() * doubleString2.length));
      }
    }
    else if (!isCheckedSym) {
      const doubleString3 = s1.concat(s2);
      for (var i = 0; i < l; i++) {
        text += doubleString3.charAt(Math.floor(Math.random() * doubleString3.length));
      }
    }
    else {
      const tripleString = s1.concat(s2, s3);
      for (var i = 0; i < l; i++) {
        text += tripleString.charAt(Math.floor(Math.random() * tripleString.length));
      }
    }
    return text;
  }

  return (
    <>
      <Container className="pt-3">
        <Col>
          <Card>
            <Card.Header>
              <Col className="text-center">
                <Card.Title><h3><strong>Password Generator</strong></h3></Card.Title>
              </Col>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Col sm={4}>
                    <Form.Label>Password Length:</Form.Label>
                  </Col>
                  <Col column sm="8">
                    <Form.Control
                      type="text"
                      value={charNumber}
                      onChange={e => setCharNumber(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Form>
              <br></br>
              <Form inline>
                <Form.Row className="mx-auto">
                  <Form.Group id="passwordChoices">
                    <Col className="mx-auto">
                      <Form.Check
                        type="checkbox"
                        label=" Numbers"
                        onClick={checkedTrueFalseNum}
                        checked={isCheckedNum}
                      />
                    </Col>
                    <Col className="mx-auto">
                      <Form.Check
                        type="checkbox"
                        label=" Letters"
                        onClick={checkedTrueFalseAlpha}
                        checked={isCheckedAlpha}
                      />
                    </Col>
                    <Col className="mx-auto">
                      <Form.Check
                        type="checkbox"
                        label=" Symbols"
                        onClick={checkedTrueFalseSym}
                        checked={isCheckedSym}
                      />
                    </Col>
                  </Form.Group>
                </Form.Row>
              </Form>
              <br></br>
              <Container>
                <Form.Row>
                  <ButtonToolbar className="mx-auto">
                    <ButtonGroup className="pr-2">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => setCharacters(randomizer(charNumber, s1, s2, s3))}>Create Password
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={"tooltip-right"}>
                            Copy
                          </Tooltip>
                        }>
                        <Button
                          variant="secondary"
                          type="submit"
                          onClick={setCopied}>
                          <FontAwesomeIcon icon={faCopy} size="1x" />
                        </Button>
                      </OverlayTrigger > {' '}
                    </ButtonGroup>
                  </ButtonToolbar>
                </Form.Row>
              </Container>
              <br></br>
              <h4><strong>Password: </strong>{characters}</h4>
              <br></br>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default App;
